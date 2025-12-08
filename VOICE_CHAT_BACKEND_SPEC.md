# 음성 채팅 백엔드 개발 명세서

## 1. WebSocket 시그널링 서버

### 1.1 WebSocket 엔드포인트

```
ws://{host}/ws
```

### 1.2 STOMP 메시지 브로커 설정

#### 구독 경로

- **채팅방 토픽**: `/topic/voice.{chatRoomId}`
  - 같은 채팅방에 있는 모든 사용자가 구독
  - 음성 채팅 시그널링 메시지 브로드캐스트

#### 애플리케이션 목적지

- **음성 시그널 전송**: `/app/voice/{chatRoomId}`
  - 클라이언트가 시그널 메시지를 보내는 경로
  - 서버는 이 메시지를 받아서 `/topic/voice.{chatRoomId}`로 브로드캐스트

### 1.3 시그널 메시지 형식

```typescript
interface VoiceSignalMessage {
  type: VoiceSignalType;
  chatRoomId: number;
  fromProfileId: number; // 발신자 프로필 ID
  toProfileId: number; // 수신자 프로필 ID
  senderId: number; // 메시지 발신자 (필터링용)
  sdp?: string; // WebRTC SDP (OFFER/ANSWER 타입에서 사용)
  candidate?: RTCIceCandidateInit; // ICE Candidate
  timestamp: number; // 메시지 전송 시각
}
```

### 1.4 시그널 타입

```typescript
enum VoiceSignalType {
  VOICE_CALL_REQUEST = "VOICE_CALL_REQUEST", // 통화 요청
  VOICE_CALL_ACCEPT = "VOICE_CALL_ACCEPT", // 통화 수락
  VOICE_CALL_REJECT = "VOICE_CALL_REJECT", // 통화 거절
  VOICE_CALL_END = "VOICE_CALL_END", // 통화 종료
  OFFER = "OFFER", // WebRTC Offer
  ANSWER = "ANSWER", // WebRTC Answer
  ICE_CANDIDATE = "ICE_CANDIDATE", // ICE Candidate
}
```

### 1.5 WebSocket Controller 구현 예시

```java
@Controller
public class VoiceSignalingController {

    @MessageMapping("/voice/{chatRoomId}")
    @SendTo("/topic/voice.{chatRoomId}")
    public VoiceSignalMessage handleSignal(
            @DestinationVariable Long chatRoomId,
            VoiceSignalMessage message,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        // 인증 확인
        String token = headerAccessor.getFirstNativeHeader("Authorization");
        // ... 토큰 검증 로직

        // 메시지 검증
        if (message.getChatRoomId() != chatRoomId) {
            throw new IllegalArgumentException("Chat room ID mismatch");
        }

        // 타임스탬프 설정
        message.setTimestamp(System.currentTimeMillis());

        // 브로드캐스트 (같은 채팅방의 모든 구독자에게 전송)
        return message;
    }
}
```

### 1.6 시그널링 플로우

```
1. 발신자 → 수신자
   - VOICE_CALL_REQUEST 전송
   - 채팅방 토픽으로 브로드캐스트

2. 수신자 → 발신자
   - VOICE_CALL_ACCEPT 또는 VOICE_CALL_REJECT 응답

3. WebRTC 연결 (수락한 경우)
   - 발신자 → OFFER (SDP 포함)
   - 수신자 → ANSWER (SDP 포함)
   - 양방향 → ICE_CANDIDATE (여러 번)

4. 통화 종료
   - 어느 쪽이든 → VOICE_CALL_END
```

---

## 2. 음성 채팅 통계 API

### 2.1 Mute 상태 업데이트

음성 채팅 중 사용자의 마이크 음소거 상태를 서버에 동기화합니다.

**Endpoint**: `POST /api/voice/mute`

**Request Body**:

```json
{
  "chatRoomId": 1,
  "profileId": 123,
  "isMuted": true
}
```

**Response**: `200 OK`

```json
{
  "success": true,
  "message": "Mute status updated"
}
```

**설명**:

- 실시간으로 사용자의 음소거 상태를 추적
- 통화 품질 분석이나 통계에 활용 가능
- 필수 구현은 아니지만, 추후 통화 품질 개선에 유용

---

### 2.2 통화 기록 저장

통화가 종료되면 자동으로 통화 기록을 저장합니다.

**Endpoint**: `POST /api/voice/call/history`

**Request Body**:

```json
{
  "chatRoomId": 1,
  "callerProfileId": 123,
  "receiverProfileId": 456,
  "startTime": "2025-12-09T10:30:00Z",
  "endTime": "2025-12-09T10:45:30Z",
  "duration": 930,
  "callStatus": "COMPLETED",
  "voiceModulationUsed": false
}
```

**Response**: `201 Created`

```json
{
  "callHistoryId": 789,
  "chatRoomId": 1,
  "callerProfileId": 123,
  "receiverProfileId": 456,
  "startTime": "2025-12-09T10:30:00Z",
  "endTime": "2025-12-09T10:45:30Z",
  "duration": 930,
  "callStatus": "COMPLETED",
  "voiceModulationUsed": false
}
```

**CallStatus 값**:

- `COMPLETED`: 정상 완료된 통화
- `REJECTED`: 수신자가 거절한 통화 (저장되지 않음)
- `MISSED`: 수신자가 응답하지 않은 통화 (저장되지 않음)
- `CANCELLED`: 발신자가 취소한 통화

**중요**:

- **실제로 연결된 통화만 저장** (WebRTC 연결 성공 후)
- REJECTED나 MISSED 상태는 저장하지 않음
- `startTime`은 WebRTC 연결이 성공한 시각 (통화 요청 시각이 아님)

---

### 2.3 통화 기록 조회

특정 채팅방의 최근 통화 기록을 조회합니다.

**Endpoint**: `GET /api/voice/call/history?chatRoomId={chatRoomId}&page={page}&size={size}`

**Query Parameters**:

- `chatRoomId` (required): 채팅방 ID
- `page` (optional, default: 0): 페이지 번호
- `size` (optional, default: 20): 페이지 크기

**Response**: `200 OK`

```json
{
  "content": [
    {
      "callHistoryId": 789,
      "chatRoomId": 1,
      "callerProfileId": 123,
      "receiverProfileId": 456,
      "startTime": "2025-12-09T10:30:00Z",
      "endTime": "2025-12-09T10:45:30Z",
      "duration": 930,
      "callStatus": "COMPLETED",
      "voiceModulationUsed": false
    }
  ],
  "totalElements": 15,
  "totalPages": 1,
  "size": 20,
  "number": 0
}
```

**설명**:

- 최신 통화부터 내림차순으로 정렬
- 페이지네이션 지원

---

### 2.4 통화 통계 조회

특정 채팅방의 전체 통화 통계를 조회합니다.

**Endpoint**: `GET /api/voice/call/statistics?chatRoomId={chatRoomId}`

**Query Parameters**:

- `chatRoomId` (required): 채팅방 ID

**Response**: `200 OK`

```json
{
  "chatRoomId": 1,
  "totalCalls": 15,
  "totalDuration": 12450,
  "averageDuration": 830,
  "lastCallTime": "2025-12-09T10:45:30Z",
  "statistics": {
    "completedCalls": 15,
    "totalMinutes": 207,
    "formattedTotalDuration": "3시간 27분"
  }
}
```

**설명**:

- `totalCalls`: 전체 통화 횟수
- `totalDuration`: 전체 통화 시간 (초)
- `averageDuration`: 평균 통화 시간 (초)
- `lastCallTime`: 마지막 통화 종료 시각
- `formattedTotalDuration`: 사용자 친화적 형식

---

## 3. 데이터베이스 스키마

### 3.1 VoiceCallHistory 테이블

```sql
CREATE TABLE voice_call_history (
    call_history_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    chat_room_id BIGINT NOT NULL,
    caller_profile_id BIGINT NOT NULL,
    receiver_profile_id BIGINT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    duration INT NOT NULL,  -- 초 단위
    call_status VARCHAR(20) NOT NULL,  -- COMPLETED, REJECTED, MISSED, CANCELLED
    voice_modulation_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_chat_room_id (chat_room_id),
    INDEX idx_caller_profile_id (caller_profile_id),
    INDEX idx_receiver_profile_id (receiver_profile_id),
    INDEX idx_start_time (start_time),

    FOREIGN KEY (chat_room_id) REFERENCES chat_room(chat_room_id),
    FOREIGN KEY (caller_profile_id) REFERENCES profile(profile_id),
    FOREIGN KEY (receiver_profile_id) REFERENCES profile(profile_id)
);
```

### 3.2 VoiceMuteLog 테이블 (선택 사항)

```sql
CREATE TABLE voice_mute_log (
    mute_log_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    chat_room_id BIGINT NOT NULL,
    profile_id BIGINT NOT NULL,
    is_muted BOOLEAN NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_chat_room_profile (chat_room_id, profile_id),

    FOREIGN KEY (chat_room_id) REFERENCES chat_room(chat_room_id),
    FOREIGN KEY (profile_id) REFERENCES profile(profile_id)
);
```

---

## 4. 보안 고려사항

### 4.1 인증

- 모든 WebSocket 연결과 REST API는 JWT 토큰으로 인증
- WebSocket 연결 시 `Authorization` 헤더로 토큰 전달
- 토큰에서 추출한 사용자 정보와 요청의 프로필 ID 일치 확인

### 4.2 권한 검증

- 사용자가 해당 채팅방의 참여자인지 확인
- 다른 사용자의 통화 기록에 접근할 수 없도록 제한
- 채팅방 참여자만 해당 채팅방의 음성 채팅 시그널에 접근

### 4.3 입력 검증

- 모든 요청 파라미터 유효성 검사
- SQL Injection, XSS 방지
- 통화 시간의 최대값 제한 (예: 24시간)

---

## 5. 에러 처리

### 5.1 WebSocket 에러

```json
{
  "type": "ERROR",
  "code": "UNAUTHORIZED",
  "message": "Invalid authentication token"
}
```

### 5.2 REST API 에러

```json
{
  "timestamp": "2025-12-09T10:30:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid chat room ID",
  "path": "/api/voice/call/history"
}
```

**에러 코드**:

- `400`: 잘못된 요청 (유효성 검증 실패)
- `401`: 인증 실패
- `403`: 권한 없음 (채팅방 참여자 아님)
- `404`: 리소스를 찾을 수 없음
- `500`: 서버 내부 오류

---

## 6. 구현 우선순위

### Phase 1: 필수 기능

1. ✅ WebSocket 시그널링 서버 (`/app/voice/{chatRoomId}`)
2. ✅ 통화 기록 저장 API (`POST /api/voice/call/history`)
3. ✅ 통화 통계 조회 API (`GET /api/voice/call/statistics`)

### Phase 2: 선택 기능

1. Mute 상태 업데이트 API (통화 품질 분석용)
2. 통화 기록 조회 API (관리자 페이지용)
3. 통화 알림 기능 (FCM/APNS 연동)

---

## 7. 테스트 시나리오

### 7.1 WebSocket 시그널링 테스트

1. 두 클라이언트가 같은 채팅방 토픽 구독
2. 클라이언트 A가 VOICE_CALL_REQUEST 전송
3. 클라이언트 B가 메시지 수신 확인
4. 클라이언트 B가 VOICE_CALL_ACCEPT 응답
5. WebRTC Offer/Answer/ICE Candidate 교환 확인

### 7.2 통화 기록 저장 테스트

1. 정상 완료된 통화 기록 저장 (COMPLETED)
2. startTime이 endTime보다 이전인지 확인
3. duration 계산 정확성 확인
4. 거절된 통화는 저장되지 않는지 확인

### 7.3 권한 테스트

1. 인증되지 않은 요청 거부
2. 다른 채팅방의 통화 기록 접근 거부
3. 채팅방 참여자가 아닌 사용자의 시그널 전송 거부

---

## 8. 모니터링 및 로깅

### 8.1 로그 수집

- 모든 시그널 메시지 전송/수신 로그
- 통화 시작/종료 이벤트
- WebSocket 연결/끊김 이벤트
- API 호출 로그 (요청/응답 시간, 상태 코드)

### 8.2 메트릭

- 동시 접속자 수
- 평균 통화 시간
- 통화 성공률 (연결 성공 / 전체 시도)
- API 응답 시간
- WebSocket 메시지 처리 시간

---

## 9. 프론트엔드 연동 정보

### 9.1 환경 변수

```
VITE_API_BASE_URL=http://localhost:8080
VITE_WS_URL=ws://localhost:8080/ws
```

### 9.2 WebSocket 연결

```typescript
const socket = new SockJS(`${VITE_API_BASE_URL}/ws`);
const client = new Client({
  webSocketFactory: () => socket,
  connectHeaders: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```

### 9.3 시그널 메시지 전송

```typescript
client.publish({
  destination: `/app/voice/${chatRoomId}`,
  body: JSON.stringify(message),
});
```

### 9.4 시그널 메시지 수신

```typescript
client.subscribe(`/topic/voice.${chatRoomId}`, (message) => {
  const signal = JSON.parse(message.body);
  // 자신이 보낸 메시지 제외
  if (signal.senderId !== myProfileId) {
    handleSignal(signal);
  }
});
```

---

## 10. 참고 자료

- WebRTC 표준: https://www.w3.org/TR/webrtc/
- STOMP Protocol: https://stomp.github.io/
- Spring WebSocket: https://docs.spring.io/spring-framework/reference/web/websocket.html
- ICE (Interactive Connectivity Establishment): https://datatracker.ietf.org/doc/html/rfc8445
