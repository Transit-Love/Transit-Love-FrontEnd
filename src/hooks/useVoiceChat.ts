import { useCallback, useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { VoiceCallStatus, VoiceSignalType } from "../types/voiceChat";
import type {
  VoiceModulationSettings,
  VoiceSignalMessage,
} from "../types/voiceChat";
import { voiceChatService } from "../api/voiceChatService";

interface UseVoiceChatProps {
  chatRoomId: number;
  myProfileId: number;
  partnerProfileId: number;
}

export const useVoiceChat = ({
  chatRoomId,
  myProfileId,
  partnerProfileId,
}: UseVoiceChatProps) => {
  const [callStatus, setCallStatus] = useState<VoiceCallStatus>(
    VoiceCallStatus.IDLE
  );
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [modulationSettings, setModulationSettings] =
    useState<VoiceModulationSettings>({
      pitch: 1.0,
      tempo: 1.0,
      rate: 1.0,
      effectType: "none",
    });

  const stompClientRef = useRef<Client | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  // const soundTouchRef = useRef<any | null>(null);
  const callTimerRef = useRef<number | null>(null);
  const callStartTimeRef = useRef<Date | null>(null); // 통화 시작 시각 저장
  const handleSignalMessageRef = useRef<
    ((signal: VoiceSignalMessage) => Promise<void>) | null
  >(null);

  // WebSocket 연결
  const connectWebSocket = useCallback(() => {
    const token = localStorage.getItem("accessToken");
    const socket = new SockJS(`${import.meta.env.VITE_API_BASE_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => {
        console.log("[STOMP Debug]", str);
      },
      onConnect: () => {
        console.log("[WebSocket] 연결됨");
        setIsConnected(true);

        // 개인 큐 구독
        client.subscribe(`/queue/voice.${myProfileId}`, (message) => {
          const signal: VoiceSignalMessage = JSON.parse(message.body);
          console.log("[개인 큐] 메시지 수신:", signal);
          if (handleSignalMessageRef.current) {
            handleSignalMessageRef.current(signal);
          }
        });

        // 채팅방 토픽 구독 (상대방의 메시지를 받기 위해)
        client.subscribe(`/topic/voice.${chatRoomId}`, (message) => {
          const signal: VoiceSignalMessage = JSON.parse(message.body);
          console.log("[채팅방 토픽] 메시지 수신:", signal);
          // 상대방이 보낸 메시지만 처리
          if (signal.senderId !== myProfileId) {
            if (handleSignalMessageRef.current) {
              handleSignalMessageRef.current(signal);
            }
          }
        });
      },
      onStompError: (frame) => {
        console.error("[WebSocket] 오류:", frame);
        setIsConnected(false);
      },
    });

    client.activate();
    stompClientRef.current = client;
  }, [myProfileId, chatRoomId]);

  // 시그널 메시지 전송
  const sendSignal = useCallback(
    (type: VoiceSignalType, extraData?: Partial<VoiceSignalMessage>) => {
      if (!stompClientRef.current?.connected) {
        console.error("[WebSocket] 연결되지 않음");
        return;
      }

      const message: VoiceSignalMessage = {
        type,
        chatRoomId,
        fromProfileId: myProfileId,
        toProfileId: partnerProfileId,
        senderId: myProfileId,
        timestamp: Date.now(),
        ...extraData,
      };

      stompClientRef.current.publish({
        destination: `/app/voice/${chatRoomId}`,
        body: JSON.stringify(message),
      });

      console.log("[Signal] 전송:", type, "to chatRoom:", chatRoomId);
    },
    [chatRoomId, myProfileId, partnerProfileId]
  );

  // 음성 변조 설정
  const applyVoiceModulation = useCallback(
    (stream: MediaStream): MediaStream => {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      const audioContext = audioContextRef.current;
      const source = audioContext.createMediaStreamSource(stream);
      const destination = audioContext.createMediaStreamDestination();

      // Web Audio API를 사용한 pitch/tempo 변조
      // 실제 pitch 변경은 복잡하므로 필터만 적용

      // 효과 적용
      switch (modulationSettings.effectType) {
        case "robot": {
          const filter = audioContext.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.value = 1000;
          filter.Q.value = 10;
          source.connect(filter);
          filter.connect(destination);
          break;
        }
        case "echo": {
          const delay = audioContext.createDelay();
          delay.delayTime.value = 0.3;
          const feedback = audioContext.createGain();
          feedback.gain.value = 0.4;

          source.connect(destination);
          source.connect(delay);
          delay.connect(feedback);
          feedback.connect(delay);
          feedback.connect(destination);
          break;
        }
        case "deep": {
          const filter = audioContext.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.value = 500;
          source.connect(filter);
          filter.connect(destination);
          break;
        }
        case "high": {
          const filter = audioContext.createBiquadFilter();
          filter.type = "highpass";
          filter.frequency.value = 2000;
          source.connect(filter);
          filter.connect(destination);
          break;
        }
        default:
          source.connect(destination);
      }

      return destination.stream;
    },
    [modulationSettings]
  );

  // WebRTC 연결 생성
  const createPeerConnection = useCallback(() => {
    const configuration: RTCConfiguration = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    };

    const pc = new RTCPeerConnection(configuration);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendSignal(VoiceSignalType.ICE_CANDIDATE, {
          candidate: event.candidate.toJSON(),
        });
      }
    };

    pc.ontrack = (event) => {
      console.log("[WebRTC] 원격 스트림 수신");
      remoteStreamRef.current = event.streams[0];
      setCallStatus(VoiceCallStatus.CONNECTED);

      // 통화 시작 시각 기록
      if (!callStartTimeRef.current) {
        callStartTimeRef.current = new Date();
      }

      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
      setCallDuration(0);
      callTimerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000) as unknown as number;
    };

    pc.onconnectionstatechange = () => {
      console.log("[WebRTC] 연결 상태:", pc.connectionState);
      if (
        pc.connectionState === "disconnected" ||
        pc.connectionState === "failed"
      ) {
        // endCall 대신 cleanup 직접 호출
        if (callTimerRef.current) {
          clearInterval(callTimerRef.current);
          callTimerRef.current = null;
        }
        if (localStreamRef.current) {
          localStreamRef.current.getTracks().forEach((track) => track.stop());
          localStreamRef.current = null;
        }
        if (peerConnectionRef.current) {
          peerConnectionRef.current.close();
          peerConnectionRef.current = null;
        }
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        setCallDuration(0);
        setCallStatus(VoiceCallStatus.ENDED);
      }
    };

    peerConnectionRef.current = pc;
    return pc;
  }, [sendSignal]);

  // 마이크 스트림 가져오기
  const getLocalStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStreamRef.current = stream;

      // 음성 변조 적용
      const modulatedStream = applyVoiceModulation(stream);

      return modulatedStream;
    } catch (error) {
      console.error("[마이크] 접근 오류:", error);
      throw error;
    }
  }, [applyVoiceModulation]);

  // 리소스 정리
  const cleanup = useCallback(() => {
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setCallDuration(0);
  }, []);

  // 시그널 메시지 처리
  const handleSignalMessage = useCallback(
    async (signal: VoiceSignalMessage) => {
      console.log("[Signal] 수신:", signal.type);

      switch (signal.type) {
        case VoiceSignalType.VOICE_CALL_REQUEST:
          setCallStatus(VoiceCallStatus.INCOMING);
          break;

        case VoiceSignalType.VOICE_CALL_ACCEPT:
          setCallStatus(VoiceCallStatus.CONNECTING);
          // Offer 생성
          try {
            const pc = createPeerConnection();
            const stream = await getLocalStream();
            stream.getTracks().forEach((track) => {
              pc.addTrack(track, stream);
            });

            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            sendSignal(VoiceSignalType.OFFER, {
              sdp: offer.sdp,
            });
          } catch (error) {
            console.error("[WebRTC] Offer 생성 오류:", error);
          }
          break;

        case VoiceSignalType.VOICE_CALL_REJECT:
          setCallStatus(VoiceCallStatus.ENDED);
          cleanup();
          break;

        case VoiceSignalType.VOICE_CALL_END:
          setCallStatus(VoiceCallStatus.ENDED);
          cleanup();
          break;

        case VoiceSignalType.OFFER:
          try {
            const pc = createPeerConnection();
            const stream = await getLocalStream();
            stream.getTracks().forEach((track) => {
              pc.addTrack(track, stream);
            });

            await pc.setRemoteDescription(
              new RTCSessionDescription({
                type: "offer",
                sdp: signal.sdp,
              })
            );

            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);

            sendSignal(VoiceSignalType.ANSWER, {
              sdp: answer.sdp,
            });
          } catch (error) {
            console.error("[WebRTC] Answer 생성 오류:", error);
          }
          break;

        case VoiceSignalType.ANSWER:
          try {
            if (peerConnectionRef.current) {
              await peerConnectionRef.current.setRemoteDescription(
                new RTCSessionDescription({
                  type: "answer",
                  sdp: signal.sdp,
                })
              );
            }
          } catch (error) {
            console.error("[WebRTC] Answer 설정 오류:", error);
          }
          break;

        case VoiceSignalType.ICE_CANDIDATE:
          try {
            if (peerConnectionRef.current && signal.candidate) {
              await peerConnectionRef.current.addIceCandidate(
                new RTCIceCandidate(signal.candidate)
              );
            }
          } catch (error) {
            console.error("[WebRTC] ICE Candidate 추가 오류:", error);
          }
          break;
      }
    },
    [createPeerConnection, getLocalStream, sendSignal, cleanup]
  );

  // 통화 시작
  const startCall = useCallback(() => {
    setCallStatus(VoiceCallStatus.REQUESTING);
    // 통화 시작 시각은 WebRTC 연결 성공 시(ontrack)에 기록
    sendSignal(VoiceSignalType.VOICE_CALL_REQUEST);
  }, [sendSignal]);

  // 통화 수락
  const acceptCall = useCallback(() => {
    setCallStatus(VoiceCallStatus.CONNECTING);
    // 통화 시작 시각은 WebRTC 연결 성공 시(ontrack)에 기록
    sendSignal(VoiceSignalType.VOICE_CALL_ACCEPT);
  }, [sendSignal]);

  // 통화 거절
  const rejectCall = useCallback(() => {
    setCallStatus(VoiceCallStatus.ENDED);
    sendSignal(VoiceSignalType.VOICE_CALL_REJECT);
    // 거절 시에는 연결되지 않았으므로 통화 기록 저장하지 않음
    cleanup();
  }, [sendSignal, cleanup]);

  // 통화 종료
  const endCall = useCallback(async () => {
    sendSignal(VoiceSignalType.VOICE_CALL_END);
    setCallStatus(VoiceCallStatus.ENDED);

    // 통화 기록 저장
    if (callStartTimeRef.current) {
      try {
        const endTime = new Date();
        const duration = Math.floor(
          (endTime.getTime() - callStartTimeRef.current.getTime()) / 1000
        );

        await voiceChatService.saveCallHistory({
          chatRoomId,
          callerProfileId: myProfileId,
          receiverProfileId: partnerProfileId,
          startTime: callStartTimeRef.current.toISOString(),
          endTime: endTime.toISOString(),
          duration: duration,
          callStatus: "COMPLETED",
          voiceModulationUsed: true, // 항상 음성 변조 사용
        });

        console.log(`[통화 기록] 저장 완료 - ${duration}초`);
      } catch (error) {
        console.error("[통화 기록 저장 실패]", error);
      }
    }

    cleanup();
  }, [
    sendSignal,
    cleanup,
    chatRoomId,
    myProfileId,
    partnerProfileId,
    modulationSettings,
  ]);

  // 음소거 토글
  const toggleMute = useCallback(async () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        const newMutedState = !audioTrack.enabled;
        setIsMuted(newMutedState);

        // 서버에 음소거 상태 전송
        try {
          await voiceChatService.updateMuteStatus(chatRoomId, {
            profileId: myProfileId,
            isMuted: newMutedState,
            timestamp: Date.now(),
          });

          // WebSocket으로 상대방에게 음소거 상태 알림
          sendSignal(VoiceSignalType.MUTE_STATUS_CHANGED, {
            isMuted: newMutedState,
          });
        } catch (error) {
          console.error("[음소거 상태 전송 실패]", error);
        }
      }
    }
  }, [chatRoomId, myProfileId, sendSignal]);

  // 스피커 토글
  const toggleSpeaker = useCallback(() => {
    setIsSpeakerOn((prev) => !prev);
  }, []);

  // 음성 변조 설정 변경
  const updateModulationSettings = useCallback(
    (settings: Partial<VoiceModulationSettings>) => {
      setModulationSettings((prev) => ({ ...prev, ...settings }));

      // 현재 통화 중이면 스트림 재생성
      if (callStatus === VoiceCallStatus.CONNECTED && localStreamRef.current) {
        const modulatedStream = applyVoiceModulation(localStreamRef.current);

        // 기존 트랙 제거 및 새 트랙 추가
        if (peerConnectionRef.current) {
          const senders = peerConnectionRef.current.getSenders();
          senders.forEach((sender) => {
            if (sender.track?.kind === "audio") {
              const newTrack = modulatedStream.getAudioTracks()[0];
              sender.replaceTrack(newTrack);
            }
          });
        }
      }
    },
    [callStatus, applyVoiceModulation]
  );

  // 원격 오디오 재생
  const getRemoteAudio = useCallback(() => {
    if (remoteStreamRef.current) {
      const audio = new Audio();
      audio.srcObject = remoteStreamRef.current;
      audio.volume = isSpeakerOn ? 1.0 : 0;
      audio.play();
      return audio;
    }
    return null;
  }, [isSpeakerOn]);

  // 초기화
  useEffect(() => {
    // handleSignalMessage를 ref에 할당
    handleSignalMessageRef.current = handleSignalMessage;
  }, [handleSignalMessage]);

  useEffect(() => {
    connectWebSocket();

    return () => {
      cleanup();
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [connectWebSocket, cleanup]);

  // 스피커 볼륨 조절
  useEffect(() => {
    const audio = getRemoteAudio();
    return () => {
      if (audio) {
        audio.pause();
        audio.srcObject = null;
      }
    };
  }, [getRemoteAudio]);

  return {
    callStatus,
    isConnected,
    isMuted,
    isSpeakerOn,
    callDuration,
    modulationSettings,
    startCall,
    acceptCall,
    rejectCall,
    endCall,
    toggleMute,
    toggleSpeaker,
    updateModulationSettings,
  };
};
