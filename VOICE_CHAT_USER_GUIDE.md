# 🎉 음성 통화 기능 사용 가이드

**작성일자**: 2025-12-09  
**상태**: ✅ 구현 완료

---

## 📋 기능 개요

채팅 화면에서 상대방과 WebRTC 기반 1:1 음성 통화를 할 수 있습니다.

### ✨ 주요 기능

1. **실시간 음성 통화** - WebRTC P2P 연결
2. **발신/수신 UI** - 직관적인 통화 인터페이스
3. **음성 변조** - 5가지 효과 (원음/로봇/에코/저음/고음)
4. **통화 제어** - 음소거, 스피커 on/off
5. **통화 기록** - 자동 저장 및 조회
6. **통화 통계** - 채팅방별 통화 시간 통계

---

## 🚀 사용 방법

### 1. 전화 걸기

1. 채팅 화면에서 **상단 전화 아이콘(📞)** 클릭
2. 음성 통화 화면이 표시됩니다
3. 상태: **"전화를 거는 중..."**
4. 상대방이 수락할 때까지 대기

### 2. 전화 받기

1. 상대방이 전화를 걸면 자동으로 화면 표시
2. **전화벨 소리 자동 재생** (2초 간격)
3. 프로필 아바타가 **펄스 애니메이션** 효과
4. 두 가지 옵션:
   - **수락 버튼** (초록색) - 통화 시작
   - **거절 버튼** (빨간색) - 통화 거부

### 3. 통화 중 기능

#### 마이크 음소거

- **마이크 아이콘** 클릭
- 상태 표시: 🎤 (활성) / 🔇 (음소거)
- 상대방에게 음소거 상태 실시간 전송

#### 스피커 제어

- **스피커 아이콘** 클릭
- 상태 표시: 🔊 (켜짐) / 🔇 (꺼짐)
- 상대방 목소리 볼륨 조절

#### 음성 변조

- **음성 변조 아이콘(🎵)** 클릭
- 5가지 효과 선택:
  - **원음** - 변조 없음
  - **로봇** - 로봇 목소리
  - **에코** - 에코 효과
  - **저음** - 낮은 음역대
  - **고음** - 높은 음역대
- 슬라이더 조절:
  - **음높이** (0.5x ~ 2.0x)
  - **속도** (0.5x ~ 2.0x)

### 4. 통화 종료

1. **빨간색 전화 아이콘** 클릭
2. 통화 기록 자동 저장
3. 통화 요약 정보 표시:
   - 통화 시간
   - 종료 시각
4. **닫기 버튼**으로 채팅 화면 복귀

---

## 🎨 화면 상태별 UI

### IDLE (대기)

- 화면 표시 안 됨

### REQUESTING (발신 중)

```
┌─────────────────────┐
│    음성 통화         │
├─────────────────────┤
│                     │
│       👤            │ ← 펄스 애니메이션
│    상대방 이름       │
│  전화를 거는 중...   │
│                     │
│       📞            │ ← 빨간 종료 버튼
└─────────────────────┘
```

### INCOMING (수신)

```
┌─────────────────────┐
│    음성 통화         │
├─────────────────────┤
│                     │
│       👤            │ ← 펄스 애니메이션 + 벨소리
│    상대방 이름       │
│   전화가 왔습니다    │
│                     │
│   📞 수락  ✕ 거절   │ ← 수락/거절 버튼
└─────────────────────┘
```

### CONNECTING (연결 중)

```
┌─────────────────────┐
│    음성 통화         │
├─────────────────────┤
│                     │
│       👤            │
│    상대방 이름       │
│     연결 중...       │
│                     │
│       📞            │ ← 빨간 종료 버튼
└─────────────────────┘
```

### CONNECTED (통화 중)

```
┌─────────────────────┐
│    음성 통화      −  │ ← 최소화 버튼
├─────────────────────┤
│                     │
│       👤            │
│    상대방 이름       │
│     00:15           │ ← 통화 시간
│                     │
│  🔊   🎤   🎵       │ ← 제어 버튼
│ 스피커 마이크 음성변조│
│                     │
│       📞            │ ← 빨간 종료 버튼
└─────────────────────┘
```

### ENDED (종료)

```
┌─────────────────────┐
│    음성 통화         │
├─────────────────────┤
│                     │
│       👤            │
│    상대방 이름       │
│ 통화가 종료되었습니다│
│                     │
│ ┌─────────────────┐ │
│ │ 통화 시간: 00:15 │ │
│ │ 종료: 오후 2:30  │ │
│ └─────────────────┘ │
│                     │
│      [닫기]         │
└─────────────────────┘
```

---

## 🔧 기술 사양

### WebRTC 연결

- **STUN 서버**: Google Public STUN
- **시그널링**: WebSocket (STOMP)
- **코덱**: 브라우저 기본 (Opus 권장)
- **네트워크**: P2P 직접 연결

### 음성 변조

- **엔진**: Web Audio API
- **필터**: Biquad Filter (로봇/저음/고음)
- **딜레이**: Delay Node (에코)
- **실시간**: 통화 중 즉시 적용

### 데이터 저장

- **통화 기록**: 백엔드 자동 저장
- **저장 시점**: 통화 종료 시
- **저장 정보**:
  - 통화 시작/종료 시각
  - 통화 시간 (초)
  - 음성 변조 사용 여부
  - 통화 상태 (완료/거절/실패)

---

## 📊 시그널링 플로우

### 발신자 → 수신자

```
1. 발신자: "전화 걸기" 클릭
   → VOICE_CALL_REQUEST 전송

2. 수신자: 전화벨 울림 + UI 표시

3. 수신자: "수락" 클릭
   → VOICE_CALL_ACCEPT 전송

4. 발신자: WebRTC Offer 생성
   → OFFER (SDP) 전송

5. 수신자: WebRTC Answer 생성
   → ANSWER (SDP) 전송

6. 양방향: ICE Candidate 교환
   ↔ ICE_CANDIDATE (여러 번)

7. 🎉 WebRTC 연결 완료 → 통화 시작

8. 통화 중: 음소거 상태 동기화
   ↔ MUTE_STATUS_CHANGED

9. 종료: 어느 쪽이든
   → VOICE_CALL_END 전송

10. 통화 기록 저장
    → POST /api/voice/call/history
```

---

## 🎯 주요 API 엔드포인트

### WebSocket (시그널링)

```typescript
// 연결
ws://localhost:8080/ws

// 구독
/topic/voice.{chatRoomId}

// 발행
/app/voice/{chatRoomId}
```

### REST API

```typescript
// 음소거 상태 업데이트
POST /api/voice/mute
{
  profileId: number,
  isMuted: boolean,
  timestamp: number
}

// 통화 기록 저장
POST /api/voice/call/history
{
  chatRoomId: number,
  callerProfileId: number,
  receiverProfileId: number,
  startTime: string,
  endTime: string,
  duration: number,
  callStatus: "COMPLETED" | "REJECTED" | "FAILED",
  voiceModulationUsed: boolean
}

// 통화 통계 조회
GET /api/voice/call/statistics?chatRoomId={id}
```

---

## 🐛 문제 해결

### 마이크 권한 오류

**증상**: "마이크 접근 오류" 표시

**해결 방법**:

1. 브라우저 설정에서 마이크 권한 확인
2. HTTPS 또는 localhost에서 실행
3. 브라우저 콘솔에서 에러 확인

### 연결 실패

**증상**: "연결 중..." 에서 멈춤

**해결 방법**:

1. WebSocket 연결 상태 확인
2. 방화벽/NAT 설정 확인
3. STUN 서버 연결 확인
4. 네트워크 콘솔 로그 확인

### 소리가 안 들림

**증상**: 통화는 되는데 소리가 안 남

**해결 방법**:

1. 스피커 버튼 확인 (🔊)
2. 브라우저 음량 확인
3. 시스템 음량 확인
4. 상대방 마이크 음소거 확인

### 음성 변조 안됨

**증상**: 효과를 선택해도 변화 없음

**해결 방법**:

1. 통화 중에만 적용 가능
2. Web Audio API 지원 브라우저 사용
3. 다른 효과로 변경해보기

---

## 🎓 개발자 가이드

### 컴포넌트 구조

```
src/
├── components/
│   └── VoiceChat/
│       └── index.tsx        ← UI 컴포넌트
├── hooks/
│   └── useVoiceChat.ts      ← 비즈니스 로직
├── types/
│   └── voiceChat.ts         ← 타입 정의
└── api/
    └── voiceChatService.ts  ← API 호출
```

### Hook 사용법

```typescript
import { useVoiceChat } from "@/hooks/useVoiceChat";

const voiceChat = useVoiceChat({
  chatRoomId: 1,
  myProfileId: 1,
  partnerProfileId: 2,
});

// 통화 시작
voiceChat.startCall();

// 통화 수락
voiceChat.acceptCall();

// 통화 종료
voiceChat.endCall();
```

### 컴포넌트 사용법

```typescript
<VoiceChat
  isOpen={isVoiceChatOpen}
  onClose={() => setIsVoiceChatOpen(false)}
  callStatus={voiceChat.callStatus}
  partnerName="상대방 이름"
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
```

---

## ✅ 브라우저 호환성

| 브라우저 | 버전 | WebRTC | Web Audio API | 비고          |
| -------- | ---- | ------ | ------------- | ------------- |
| Chrome   | 74+  | ✅     | ✅            | 권장          |
| Firefox  | 66+  | ✅     | ✅            | 권장          |
| Safari   | 14+  | ✅     | ✅            | iOS 지원      |
| Edge     | 79+  | ✅     | ✅            | Chromium 기반 |
| Opera    | 60+  | ✅     | ✅            | -             |

---

## 🔐 보안 기능

### JWT 인증

- WebSocket 연결 시 자동 검증
- 토큰 만료 시 자동 재연결
- 인증 실패 시 연결 거부

### 사용자 검증

- `senderId` 자동 설정 (클라이언트 값 무시)
- 채팅방 참여자만 통화 가능
- 본인 메시지 필터링

---

## 📈 통계 및 기록

### 통화 기록

- 통화 시작/종료 시각
- 통화 시간 (초)
- 발신자/수신자 정보
- 통화 상태
- 음성 변조 사용 여부

### 통화 통계

- 총 통화 횟수
- 완료/거절/실패 횟수
- 총 통화 시간
- 평균 통화 시간
- 최장/최단 통화 시간
- 음성 변조 사용률

---

## 🎉 구현 완료 체크리스트

- ✅ 발신/수신 UI
- ✅ 전화벨 소리 (브라우저 API)
- ✅ 펄스 애니메이션
- ✅ WebRTC 연결
- ✅ 음성 변조 (5가지)
- ✅ 음소거/스피커 제어
- ✅ 통화 시간 타이머
- ✅ 통화 기록 자동 저장
- ✅ 통화 통계 조회
- ✅ WebSocket 시그널링
- ✅ JWT 인증
- ✅ 에러 처리
- ✅ 반응형 UI
- ✅ 사용자 친화적 UX

---

## 📚 참고 문서

- **백엔드 명세서**: `VOICE_CHAT_IMPLEMENTATION_FINAL.md`
- **API 명세서**: `VOICE_CHAT_API_README.md`
- **Postman 가이드**: `VOICE_CHAT_POSTMAN_GUIDE.md`
- **WebRTC 문서**: https://webrtc.org/
- **Web Audio API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

---

**작성일**: 2025-12-09  
**버전**: 1.0.0  
**상태**: ✅ 구현 완료

**감사합니다! 🎉**
