# 🎤 음성 채팅 기능 구현 가이드

## 📋 개요

Transit Love 프론트엔드에 WebRTC와 WebSocket을 활용한 실시간 음성 채팅 기능이 구현되었습니다.
카카오톡 보이스톡 스타일의 UI와 함께 음성 변조 기능을 제공합니다.

## ✅ 구현된 기능

### 1. 실시간 음성 통화

- WebRTC P2P 연결을 통한 고품질 음성 통신
- WebSocket (STOMP)을 통한 시그널링
- 통화 요청/수락/거절/종료
- 실시간 통화 시간 표시

### 2. 음성 변조

- **Pitch Shifting**: 음높이 조절 (0.5x ~ 2.0x)
- **Tempo Control**: 속도 조절 (0.5x ~ 2.0x)
- **프리셋 효과**:
  - 원음
  - 로봇 음성 (Bandpass Filter)
  - 에코 효과 (Delay + Feedback)
  - 저음 (Lowpass Filter)
  - 고음 (Highpass Filter)

### 3. 카카오톡 스타일 UI

- 그라데이션 배경
- 프로필 아바타
- 통화 상태 표시
- 컨트롤 패널 (스피커, 음소거, 음성 변조)
- 부드러운 애니메이션

### 4. 통화 제어

- 음소거/음소거 해제
- 스피커 On/Off
- 통화 종료
- 최소화 (통화 중)

## 🏗️ 아키텍처

```
src/
├── types/
│   └── voiceChat.ts           # 타입 정의
├── api/
│   └── voiceChatService.ts    # REST API 서비스
├── hooks/
│   └── useVoiceChat.ts        # 음성 채팅 로직 훅
├── components/
│   └── VoiceChat/
│       └── index.tsx          # 음성 채팅 UI 컴포넌트
└── pages/
    └── chat/
        └── index.tsx          # 채팅 페이지 (통합)
```

## 🔧 설치된 라이브러리

```json
{
  "dependencies": {
    "@stomp/stompjs": "^7.0.0", // WebSocket STOMP 클라이언트
    "sockjs-client": "^1.6.1", // SockJS 클라이언트
    "soundtouchjs": "^0.2.1" // 음성 변조 (현재 사용 안함)
  },
  "devDependencies": {
    "@types/sockjs-client": "^1.5.4" // SockJS 타입 정의
  }
}
```

## 🚀 사용 방법

### 1. 채팅 페이지에서 통화 시작

채팅 페이지 상단의 전화 아이콘을 클릭하면 음성 통화가 시작됩니다.

```tsx
// src/pages/chat/index.tsx
import { VoiceChat } from "../../components/VoiceChat";
import { useVoiceChat } from "../../hooks/useVoiceChat";

const ChatPage = () => {
  const [isVoiceChatOpen, setIsVoiceChatOpen] = useState(false);

  const voiceChat = useVoiceChat({
    chatRoomId: chatRoomId || matchId || 0,
    myProfileId: currentUserId || 0,
    partnerProfileId: otherProfileId,
  });

  const handlePhoneClick = () => {
    setIsVoiceChatOpen(true);
    voiceChat.startCall();
  };

  return (
    <>
      {/* 전화 아이콘 */}
      <ActionIcon src={PhoneIcon} alt="통화" onClick={handlePhoneClick} />

      {/* 음성 채팅 UI */}
      <VoiceChat
        isOpen={isVoiceChatOpen}
        onClose={() => setIsVoiceChatOpen(false)}
        callStatus={voiceChat.callStatus}
        partnerName={displayName}
        callDuration={voiceChat.callDuration}
        isMuted={voiceChat.isMuted}
        isSpeakerOn={voiceChat.isSpeakerOn}
        modulationSettings={voiceChat.modulationSettings}
        onAccept={voiceChat.acceptCall}
        onReject={voiceChat.rejectCall}
        onEnd={voiceChat.endCall}
        onToggleMute={voiceChat.toggleMute}
        onToggleSpeaker={voiceChat.toggleSpeaker}
        onUpdateModulation={voiceChat.updateModulationSettings}
      />
    </>
  );
};
```

### 2. useVoiceChat 훅 사용

```tsx
const voiceChat = useVoiceChat({
  chatRoomId: 1, // 채팅방 ID
  myProfileId: 123, // 내 프로필 ID
  partnerProfileId: 456, // 상대방 프로필 ID
});

// 통화 시작
voiceChat.startCall();

// 통화 수락
voiceChat.acceptCall();

// 통화 거절
voiceChat.rejectCall();

// 통화 종료
voiceChat.endCall();

// 음소거 토글
voiceChat.toggleMute();

// 스피커 토글
voiceChat.toggleSpeaker();

// 음성 변조 설정
voiceChat.updateModulationSettings({
  pitch: 1.5, // 음높이 1.5배
  tempo: 1.0, // 속도 1배
  effectType: "robot", // 로봇 효과
});
```

### 3. 음성 변조 프리셋

```tsx
const effects = {
  none: { pitch: 1.0, tempo: 1.0, effectType: "none" },
  robot: { pitch: 1.2, tempo: 1.0, effectType: "robot" },
  echo: { pitch: 1.0, tempo: 1.0, effectType: "echo" },
  deep: { pitch: 0.8, tempo: 1.0, effectType: "deep" },
  high: { pitch: 1.5, tempo: 1.0, effectType: "high" },
};

voiceChat.updateModulationSettings(effects.robot);
```

## 🔄 통화 플로우

### 발신자 (Client A)

1. 전화 아이콘 클릭
2. `startCall()` 호출
3. `VOICE_CALL_REQUEST` 시그널 전송
4. 상대방 수락 대기
5. 상대방 수락 시 WebRTC 연결 시작

### 수신자 (Client B)

1. `VOICE_CALL_REQUEST` 수신
2. 수신 UI 표시
3. 수락 버튼 클릭 → `acceptCall()`
4. `VOICE_CALL_ACCEPT` 시그널 전송
5. WebRTC 연결 완료

### WebRTC 시그널링

```
A → Server: VOICE_CALL_REQUEST
Server → B: VOICE_CALL_REQUEST
B → Server: VOICE_CALL_ACCEPT
Server → A: VOICE_CALL_ACCEPT

A → Server: OFFER (SDP)
Server → B: OFFER
B → Server: ANSWER (SDP)
Server → A: ANSWER

A ↔ Server ↔ B: ICE_CANDIDATE (여러 개)

A ═══════ P2P Audio ═══════> B
```

## ⚙️ 환경 설정

### .env.development

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_WS_URL=http://localhost:8080
NODE_ENV=development
```

### 백엔드 요구사항

- Spring Boot WebSocket 설정
- STOMP 엔드포인트: `/ws`
- 음성 시그널 메시지 핸들러: `/app/voice/signal`
- 개인 큐: `/queue/voice.{profileId}`

## 🎨 UI 커스터마이징

### 색상 변경

```tsx
const Container = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  // 다른 그라데이션 예시:
  // background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  // background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
`;
```

### 아바타 커스터마이징

```tsx
<Avatar>
  <AvatarIcon>👤</AvatarIcon>
  {/* 또는 이미지 사용 */}
  {/* <AvatarImage src={partnerAvatar} alt="프로필" /> */}
</Avatar>
```

## 🐛 트러블슈팅

### 1. WebSocket 연결 실패

```typescript
// JWT 토큰이 localStorage에 있는지 확인
const token = localStorage.getItem("accessToken");
if (!token) {
  console.error("No access token");
}
```

### 2. 마이크 권한 거부

```typescript
try {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
} catch (error) {
  console.error("마이크 접근 거부:", error);
  // 사용자에게 권한 요청 안내
}
```

### 3. WebRTC 연결 실패

```typescript
// STUN 서버 설정 확인
const configuration: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};
```

### 4. 음성이 들리지 않음

```typescript
// 스피커가 켜져 있는지 확인
console.log("isSpeakerOn:", voiceChat.isSpeakerOn);

// 원격 스트림이 수신되었는지 확인
pc.ontrack = (event) => {
  console.log("원격 스트림 수신:", event.streams[0]);
};
```

## 🚀 배포 시 고려사항

### 1. HTTPS 필수

WebRTC는 프로덕션 환경에서 HTTPS를 요구합니다.

### 2. TURN 서버 추가

NAT/방화벽을 통과하기 위해 TURN 서버 추가 권장:

```typescript
const configuration: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    {
      urls: "turn:your-turn-server.com:3478",
      username: "username",
      credential: "password",
    },
  ],
};
```

### 3. 환경 변수 설정

```env
# .env.production
VITE_API_BASE_URL=https://api.transitlove.com
VITE_WS_URL=https://api.transitlove.com
NODE_ENV=production
```

## 📱 브라우저 호환성

| 브라우저      | 버전  | 지원 |
| ------------- | ----- | ---- |
| Chrome        | 74+   | ✅   |
| Firefox       | 66+   | ✅   |
| Safari        | 12.1+ | ✅   |
| Edge          | 79+   | ✅   |
| Mobile Safari | 13+   | ✅   |
| Chrome Mobile | 74+   | ✅   |

## 🎯 향후 개선 계획

- [ ] 그룹 음성 채팅 (3명 이상)
- [ ] 음성 녹음 기능
- [ ] 통화 내역 저장
- [ ] 통화 품질 모니터링
- [ ] 배경 소음 제거
- [ ] 더 다양한 음성 변조 프리셋
- [ ] 음성 이퀄라이저

## 📝 라이선스

MIT License

---

**개발 완료일**: 2024-12-08  
**버전**: 1.0.0  
**상태**: ✅ 완료
