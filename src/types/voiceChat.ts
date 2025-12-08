export const VoiceSignalType = {
  VOICE_CALL_REQUEST: "VOICE_CALL_REQUEST",
  VOICE_CALL_ACCEPT: "VOICE_CALL_ACCEPT",
  VOICE_CALL_REJECT: "VOICE_CALL_REJECT",
  VOICE_CALL_END: "VOICE_CALL_END",
  OFFER: "OFFER",
  ANSWER: "ANSWER",
  ICE_CANDIDATE: "ICE_CANDIDATE",
  MUTE_STATUS_CHANGED: "MUTE_STATUS_CHANGED",
  SPEAKER_STATUS_CHANGED: "SPEAKER_STATUS_CHANGED",
} as const;

export type VoiceSignalType =
  (typeof VoiceSignalType)[keyof typeof VoiceSignalType];

export interface VoiceSignalMessage {
  type: VoiceSignalType;
  chatRoomId: number;
  fromProfileId: number;
  toProfileId: number;
  senderId?: number; // 메시지 발신자 (자신의 메시지 필터링용)
  sdp?: string;
  candidate?: RTCIceCandidateInit;
  isMuted?: boolean; // 음소거 상태
  timestamp: number;
}

export interface VoiceRoomResponse {
  chatRoomId: number;
  participants: number[];
  isActive: boolean;
}

export const VoiceCallStatus = {
  IDLE: "IDLE",
  REQUESTING: "REQUESTING",
  INCOMING: "INCOMING",
  CONNECTING: "CONNECTING",
  CONNECTED: "CONNECTED",
  ENDED: "ENDED",
} as const;

export type VoiceCallStatus =
  (typeof VoiceCallStatus)[keyof typeof VoiceCallStatus];

export interface VoiceModulationSettings {
  pitch: number; // 0.5 ~ 2.0 (1.0 = 원음)
  tempo: number; // 0.5 ~ 2.0 (1.0 = 원속도)
  rate: number; // 0.5 ~ 2.0 (1.0 = 원속도)
  effectType?: "none" | "robot" | "echo" | "deep" | "high";
}
