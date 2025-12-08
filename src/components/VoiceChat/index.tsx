import React from "react";
import styled from "@emotion/styled";
import { VoiceCallStatus } from "../../types/voiceChat";
import type { VoiceModulationSettings } from "../../types/voiceChat";

interface VoiceChatProps {
  isOpen: boolean;
  onClose: () => void;
  callStatus: VoiceCallStatus;
  partnerName: string;
  callDuration: number;
  isMuted: boolean;
  isSpeakerOn: boolean;
  modulationSettings: VoiceModulationSettings;
  onAccept: () => void;
  onReject: () => void;
  onEnd: () => void;
  onToggleMute: () => void;
  onToggleSpeaker: () => void;
  onUpdateModulation: (settings: Partial<VoiceModulationSettings>) => void;
}

export const VoiceChat: React.FC<VoiceChatProps> = ({
  isOpen,
  onClose,
  callStatus,
  partnerName,
  callDuration,
  isMuted,
  isSpeakerOn,
  modulationSettings,
  onAccept,
  onReject,
  onEnd,
  onToggleMute,
  onToggleSpeaker,
  onUpdateModulation,
}) => {
  const [showModulationPanel, setShowModulationPanel] = React.useState(false);

  // 전화벨 소리 재생 (INCOMING 상태일 때)
  React.useEffect(() => {
    if (callStatus === VoiceCallStatus.INCOMING) {
      // 브라우저 기본 비프음 사용
      const playRingtone = () => {
        const context = new AudioContext();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        oscillator.frequency.value = 440; // A4 음
        gainNode.gain.value = 0.3;
        oscillator.type = "sine";

        oscillator.start();
        oscillator.stop(context.currentTime + 0.5);

        setTimeout(() => {
          oscillator.disconnect();
          gainNode.disconnect();
        }, 600);
      };

      // 2초마다 벨소리 반복
      const interval = setInterval(playRingtone, 2000);
      playRingtone(); // 즉시 한번 재생

      return () => clearInterval(interval);
    }
  }, [callStatus]);

  // 통화 시간 포맷팅
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // 상태에 따른 메시지
  const getStatusMessage = (): string => {
    switch (callStatus) {
      case VoiceCallStatus.REQUESTING:
        return "전화를 거는 중...";
      case VoiceCallStatus.INCOMING:
        return `전화가 왔습니다`;
      case VoiceCallStatus.CONNECTING:
        return "연결 중...";
      case VoiceCallStatus.CONNECTED:
        return formatDuration(callDuration);
      case VoiceCallStatus.ENDED:
        return "통화가 종료되었습니다";
      default:
        return "";
    }
  };

  // 음성 변조 효과 이름
  const getEffectName = (effect: string): string => {
    const effects: Record<string, string> = {
      robot: "로봇",
      echo: "에코",
      deep: "저음",
      high: "고음",
    };
    return effects[effect] || "로봇";
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <Container>
        {/* 상단 영역 */}
        <Header>
          <HeaderTitle>음성 통화</HeaderTitle>
          {callStatus === VoiceCallStatus.CONNECTED && (
            <MinimizeButton onClick={onClose}>
              <MinimizeIcon>−</MinimizeIcon>
            </MinimizeButton>
          )}
        </Header>

        {/* 프로필 영역 */}
        <ProfileSection>
          <Avatar
            isIncoming={
              callStatus === VoiceCallStatus.INCOMING ||
              callStatus === VoiceCallStatus.REQUESTING
            }
          >
            <AvatarIcon>👤</AvatarIcon>
          </Avatar>
          <PartnerName>{partnerName}</PartnerName>
          <StatusText status={callStatus}>{getStatusMessage()}</StatusText>

          {/* 통화 종료 시 통화 시간 표시 */}
          {callStatus === VoiceCallStatus.ENDED && callDuration > 0 && (
            <CallSummary>
              <SummaryItem>
                <SummaryLabel>통화 시간</SummaryLabel>
                <SummaryValue>{formatDuration(callDuration)}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>종료 시각</SummaryLabel>
                <SummaryValue>
                  {new Date().toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </SummaryValue>
              </SummaryItem>
            </CallSummary>
          )}
        </ProfileSection>

        {/* 통화 중 컨트롤 */}
        {callStatus === VoiceCallStatus.CONNECTED && (
          <>
            <ControlPanel>
              <ControlButton onClick={onToggleSpeaker} active={isSpeakerOn}>
                <ControlIcon>{isSpeakerOn ? "🔊" : "🔇"}</ControlIcon>
                <ControlLabel>스피커</ControlLabel>
              </ControlButton>

              <ControlButton onClick={onToggleMute} active={!isMuted}>
                <ControlIcon>{isMuted ? "🔇" : "🎤"}</ControlIcon>
                <ControlLabel>{isMuted ? "음소거 중" : "마이크"}</ControlLabel>
              </ControlButton>

              <ControlButton
                onClick={() => setShowModulationPanel(!showModulationPanel)}
                active={true}
              >
                <ControlIcon>🎵</ControlIcon>
                <ControlLabel>음성 변조 (켜짐)</ControlLabel>
              </ControlButton>
            </ControlPanel>

            {/* 음성 변조 패널 */}
            {showModulationPanel && (
              <ModulationPanel>
                <ModulationTitle>음성 변조 설정</ModulationTitle>

                {/* 효과 선택 */}
                <EffectSelector>
                  {(["robot", "echo", "deep", "high"] as const).map(
                    (effect) => (
                      <EffectButton
                        key={effect}
                        active={modulationSettings.effectType === effect}
                        onClick={() =>
                          onUpdateModulation({ effectType: effect })
                        }
                      >
                        {getEffectName(effect)}
                      </EffectButton>
                    )
                  )}
                </EffectSelector>

                {/* Pitch 조절 */}
                <SliderContainer>
                  <SliderLabel>음높이</SliderLabel>
                  <Slider
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={modulationSettings.pitch}
                    onChange={(e) =>
                      onUpdateModulation({ pitch: parseFloat(e.target.value) })
                    }
                  />
                  <SliderValue>
                    {modulationSettings.pitch.toFixed(1)}x
                  </SliderValue>
                </SliderContainer>

                {/* Tempo 조절 */}
                <SliderContainer>
                  <SliderLabel>속도</SliderLabel>
                  <Slider
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={modulationSettings.tempo}
                    onChange={(e) =>
                      onUpdateModulation({ tempo: parseFloat(e.target.value) })
                    }
                  />
                  <SliderValue>
                    {modulationSettings.tempo.toFixed(1)}x
                  </SliderValue>
                </SliderContainer>
              </ModulationPanel>
            )}
          </>
        )}

        {/* 수신 중 버튼 */}
        {callStatus === VoiceCallStatus.INCOMING && (
          <IncomingButtons>
            <AcceptButton onClick={onAccept}>
              <ButtonIcon>📞</ButtonIcon>
              <ButtonLabel>수락</ButtonLabel>
            </AcceptButton>
            <RejectButton onClick={onReject}>
              <ButtonIcon>✕</ButtonIcon>
              <ButtonLabel>거절</ButtonLabel>
            </RejectButton>
          </IncomingButtons>
        )}

        {/* 종료 버튼 */}
        {(callStatus === VoiceCallStatus.REQUESTING ||
          callStatus === VoiceCallStatus.CONNECTING ||
          callStatus === VoiceCallStatus.CONNECTED) && (
          <EndButtonContainer>
            <EndButton onClick={onEnd}>
              <EndButtonIcon>📞</EndButtonIcon>
            </EndButton>
          </EndButtonContainer>
        )}

        {/* 통화 종료 후 */}
        {callStatus === VoiceCallStatus.ENDED && (
          <EndedContainer>
            <CloseButton onClick={onClose}>닫기</CloseButton>
          </EndedContainer>
        )}
      </Container>
    </Overlay>
  );
};

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Container = styled.div`
  width: 90%;
  max-width: 400px;
  background: linear-gradient(135deg, #fab0b8 0%, #ffd4d8 100%);
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(250, 176, 184, 0.4);
  color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const HeaderTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

const MinimizeButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const MinimizeIcon = styled.span`
  font-size: 24px;
  color: white;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const Avatar = styled.div<{ isIncoming?: boolean }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  border: 4px solid rgba(255, 255, 255, 0.3);

  ${({ isIncoming }) =>
    isIncoming &&
    `
    animation: pulse 2s ease-in-out infinite;
    
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
      }
    }
  `}
`;

const AvatarIcon = styled.span`
  font-size: 48px;
`;

const PartnerName = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const StatusText = styled.div<{ status: VoiceCallStatus }>`
  font-size: 16px;
  color: ${({ status }) =>
    status === VoiceCallStatus.CONNECTED
      ? "#ffe5b4"
      : "rgba(255, 255, 255, 0.9)"};
  font-weight: ${({ status }) =>
    status === VoiceCallStatus.CONNECTED ? "600" : "400"};
`;

const ControlPanel = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 24px;
`;

const ControlButton = styled.button<{ active?: boolean }>`
  background: ${({ active }) =>
    active ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)"};
  border: none;
  border-radius: 16px;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 80px;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const ControlIcon = styled.span`
  font-size: 28px;
`;

const ControlLabel = styled.span`
  font-size: 12px;
  color: white;
`;

const ModulationPanel = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
`;

const ModulationTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
`;

const EffectSelector = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const EffectButton = styled.button<{ active: boolean }>`
  background: ${({ active }) =>
    active ? "rgba(255, 229, 180, 0.3)" : "rgba(255, 255, 255, 0.1)"};
  border: ${({ active }) =>
    active ? "2px solid #ffe5b4" : "2px solid transparent"};
  border-radius: 20px;
  padding: 8px 16px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SliderContainer = styled.div`
  margin-bottom: 16px;
`;

const SliderLabel = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Slider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  -webkit-appearance: none;
  appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffe5b4;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffe5b4;
    cursor: pointer;
    border: none;
  }
`;

const SliderValue = styled.span`
  font-size: 14px;
  color: #ffe5b4;
  font-weight: 600;
`;

const IncomingButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

const AcceptButton = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #ffe5b4 0%, #ffd4d8 100%);
  border: none;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: #333;
  font-weight: 600;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 229, 180, 0.5);
  }
`;

const RejectButton = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  border: none;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: white;
  font-weight: 600;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);
  }
`;

const ButtonIcon = styled.span`
  font-size: 32px;
`;

const ButtonLabel = styled.span`
  font-size: 16px;
`;

const EndButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const EndButton = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 12px 30px rgba(255, 107, 107, 0.5);
  }

  &:active {
    transform: translateY(0) scale(0.95);
  }
`;

const EndButtonIcon = styled.span`
  font-size: 28px;
  transform: rotate(135deg);
`;

const EndedContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 12px;
  padding: 16px 48px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const CallSummary = styled.div`
  margin-top: 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 300px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SummaryLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
`;

const SummaryValue = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;
