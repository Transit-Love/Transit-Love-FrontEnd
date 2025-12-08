# 음성 채팅 백엔드 API 명세서

## 📋 개요

Transit Love 음성 채팅 기능을 위한 백엔드 API 명세서입니다.
음소거 상태 관리, 통화 기록 저장 및 조회 기능을 포함합니다.

---

## 🔐 인증

모든 API는 JWT Bearer 토큰 인증이 필요합니다.

```
Authorization: Bearer {access_token}
```

---

## 📡 API 엔드포인트

### 1. 음소거 상태 변경 (Mute/Unmute)

음성 채팅 중 사용자의 음소거 상태를 서버에 알립니다.

#### Request

```http
POST /api/voice/room/{chatRoomId}/mute
```

**Path Parameters:**

- `chatRoomId` (Long, required): 채팅방 ID

**Request Body:**

```json
{
  "profileId": 123,
  "isMuted": true,
  "timestamp": 1702000000000
}
```

| Field     | Type    | Required | Description                             |
| --------- | ------- | -------- | --------------------------------------- |
| profileId | Long    | Y        | 프로필 ID                               |
| isMuted   | Boolean | Y        | 음소거 상태 (true: 음소거, false: 해제) |
| timestamp | Long    | Y        | 상태 변경 시각 (Unix timestamp, ms)     |

#### Response

**Success (200 OK):**

```json
{
  "success": true,
  "message": "음소거 상태가 업데이트되었습니다.",
  "data": {
    "chatRoomId": 1,
    "profileId": 123,
    "isMuted": true,
    "updatedAt": "2024-12-08T23:45:00"
  }
}
```

**Error (400 Bad Request):**

```json
{
  "success": false,
  "message": "유효하지 않은 요청입니다.",
  "errorCode": "INVALID_REQUEST"
}
```

**Error (404 Not Found):**

```json
{
  "success": false,
  "message": "채팅방을 찾을 수 없습니다.",
  "errorCode": "CHAT_ROOM_NOT_FOUND"
}
```

---

### 2. 통화 기록 저장

음성 통화가 종료되면 통화 기록을 저장합니다.

#### Request

```http
POST /api/voice/call/history
```

**Request Body:**

```json
{
  "chatRoomId": 1,
  "callerProfileId": 123,
  "receiverProfileId": 456,
  "startTime": "2024-12-08T23:30:00",
  "endTime": "2024-12-08T23:45:00",
  "duration": 900,
  "callStatus": "COMPLETED",
  "voiceModulationUsed": true
}
```

| Field               | Type              | Required | Description                             |
| ------------------- | ----------------- | -------- | --------------------------------------- |
| chatRoomId          | Long              | Y        | 채팅방 ID                               |
| callerProfileId     | Long              | Y        | 발신자 프로필 ID                        |
| receiverProfileId   | Long              | Y        | 수신자 프로필 ID                        |
| startTime           | String (ISO 8601) | Y        | 통화 시작 시각                          |
| endTime             | String (ISO 8601) | Y        | 통화 종료 시각                          |
| duration            | Integer           | Y        | 통화 시간 (초)                          |
| callStatus          | String            | Y        | 통화 상태 (COMPLETED, REJECTED, FAILED) |
| voiceModulationUsed | Boolean           | N        | 음성 변조 사용 여부 (기본값: false)     |

**Call Status 값:**

- `COMPLETED`: 정상 종료
- `REJECTED`: 수신자가 거절
- `FAILED`: 연결 실패 또는 오류
- `MISSED`: 수신자가 응답하지 않음

#### Response

**Success (201 Created):**

```json
{
  "success": true,
  "message": "통화 기록이 저장되었습니다.",
  "data": {
    "callHistoryId": 789,
    "chatRoomId": 1,
    "callerProfileId": 123,
    "receiverProfileId": 456,
    "startTime": "2024-12-08T23:30:00",
    "endTime": "2024-12-08T23:45:00",
    "duration": 900,
    "callStatus": "COMPLETED",
    "voiceModulationUsed": true,
    "createdAt": "2024-12-08T23:45:01"
  }
}
```

**Error (400 Bad Request):**

```json
{
  "success": false,
  "message": "통화 시작 시각이 종료 시각보다 늦습니다.",
  "errorCode": "INVALID_TIME_RANGE"
}
```

---

### 3. 통화 기록 조회 (특정 채팅방)

특정 채팅방의 음성 통화 기록을 조회합니다.

#### Request

```http
GET /api/voice/call/history?chatRoomId={chatRoomId}&page={page}&size={size}
```

**Query Parameters:**

- `chatRoomId` (Long, required): 채팅방 ID
- `page` (Integer, optional): 페이지 번호 (기본값: 0)
- `size` (Integer, optional): 페이지 크기 (기본값: 20)

#### Response

**Success (200 OK):**

```json
{
  "success": true,
  "message": "통화 기록을 조회했습니다.",
  "data": {
    "content": [
      {
        "callHistoryId": 789,
        "chatRoomId": 1,
        "callerProfileId": 123,
        "callerNickname": "철수",
        "receiverProfileId": 456,
        "receiverNickname": "영희",
        "startTime": "2024-12-08T23:30:00",
        "endTime": "2024-12-08T23:45:00",
        "duration": 900,
        "callStatus": "COMPLETED",
        "voiceModulationUsed": true,
        "createdAt": "2024-12-08T23:45:01"
      },
      {
        "callHistoryId": 788,
        "chatRoomId": 1,
        "callerProfileId": 456,
        "callerNickname": "영희",
        "receiverProfileId": 123,
        "receiverNickname": "철수",
        "startTime": "2024-12-08T22:00:00",
        "endTime": "2024-12-08T22:10:00",
        "duration": 600,
        "callStatus": "COMPLETED",
        "voiceModulationUsed": false,
        "createdAt": "2024-12-08T22:10:01"
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 20
    },
    "totalElements": 2,
    "totalPages": 1,
    "last": true,
    "first": true
  }
}
```

---

### 4. 통화 기록 조회 (내 프로필)

내 프로필의 모든 음성 통화 기록을 조회합니다.

#### Request

```http
GET /api/voice/call/history/my?page={page}&size={size}
```

**Query Parameters:**

- `page` (Integer, optional): 페이지 번호 (기본값: 0)
- `size` (Integer, optional): 페이지 크기 (기본값: 20)

#### Response

**Success (200 OK):**

```json
{
  "success": true,
  "message": "통화 기록을 조회했습니다.",
  "data": {
    "content": [
      {
        "callHistoryId": 789,
        "chatRoomId": 1,
        "partnerProfileId": 456,
        "partnerNickname": "영희",
        "isCaller": true,
        "startTime": "2024-12-08T23:30:00",
        "endTime": "2024-12-08T23:45:00",
        "duration": 900,
        "callStatus": "COMPLETED",
        "voiceModulationUsed": true,
        "createdAt": "2024-12-08T23:45:01"
      },
      {
        "callHistoryId": 788,
        "chatRoomId": 1,
        "partnerProfileId": 456,
        "partnerNickname": "영희",
        "isCaller": false,
        "startTime": "2024-12-08T22:00:00",
        "endTime": "2024-12-08T22:10:00",
        "duration": 600,
        "callStatus": "COMPLETED",
        "voiceModulationUsed": false,
        "createdAt": "2024-12-08T22:10:01"
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 20
    },
    "totalElements": 2,
    "totalPages": 1,
    "last": true,
    "first": true
  }
}
```

---

### 5. 통화 통계 조회

특정 채팅방의 음성 통화 통계를 조회합니다.

#### Request

```http
GET /api/voice/call/statistics?chatRoomId={chatRoomId}
```

**Query Parameters:**

- `chatRoomId` (Long, required): 채팅방 ID

#### Response

**Success (200 OK):**

```json
{
  "success": true,
  "message": "통화 통계를 조회했습니다.",
  "data": {
    "chatRoomId": 1,
    "totalCalls": 15,
    "completedCalls": 12,
    "rejectedCalls": 2,
    "missedCalls": 1,
    "totalDuration": 10800,
    "averageDuration": 720,
    "longestCallDuration": 1800,
    "shortestCallDuration": 300,
    "voiceModulationUsageRate": 0.75,
    "firstCallTime": "2024-12-01T10:00:00",
    "lastCallTime": "2024-12-08T23:45:00"
  }
}
```

| Field                    | Type    | Description                  |
| ------------------------ | ------- | ---------------------------- |
| totalCalls               | Integer | 총 통화 시도 횟수            |
| completedCalls           | Integer | 완료된 통화 횟수             |
| rejectedCalls            | Integer | 거절된 통화 횟수             |
| missedCalls              | Integer | 부재중 통화 횟수             |
| totalDuration            | Integer | 총 통화 시간 (초)            |
| averageDuration          | Integer | 평균 통화 시간 (초)          |
| longestCallDuration      | Integer | 최장 통화 시간 (초)          |
| shortestCallDuration     | Integer | 최단 통화 시간 (초)          |
| voiceModulationUsageRate | Double  | 음성 변조 사용률 (0.0 ~ 1.0) |
| firstCallTime            | String  | 첫 통화 시각                 |
| lastCallTime             | String  | 마지막 통화 시각             |

---

### 6. 현재 활성 통화 조회

현재 진행 중인 음성 통화 목록을 조회합니다.

#### Request

```http
GET /api/voice/call/active
```

#### Response

**Success (200 OK):**

```json
{
  "success": true,
  "message": "활성 통화 목록을 조회했습니다.",
  "data": {
    "activeCalls": [
      {
        "chatRoomId": 1,
        "callerProfileId": 123,
        "callerNickname": "철수",
        "receiverProfileId": 456,
        "receiverNickname": "영희",
        "startTime": "2024-12-08T23:30:00",
        "currentDuration": 300,
        "callerMuted": false,
        "receiverMuted": true
      }
    ],
    "totalActiveCalls": 1
  }
}
```

---

## 🗂️ 데이터베이스 스키마

### VoiceCallHistory 테이블

```sql
CREATE TABLE voice_call_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    chat_room_id BIGINT NOT NULL,
    caller_profile_id BIGINT NOT NULL,
    receiver_profile_id BIGINT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    duration INT NOT NULL COMMENT '통화 시간(초)',
    call_status VARCHAR(20) NOT NULL COMMENT 'COMPLETED, REJECTED, FAILED, MISSED',
    voice_modulation_used BOOLEAN DEFAULT FALSE COMMENT '음성 변조 사용 여부',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_chat_room_id (chat_room_id),
    INDEX idx_caller_profile_id (caller_profile_id),
    INDEX idx_receiver_profile_id (receiver_profile_id),
    INDEX idx_start_time (start_time),
    INDEX idx_call_status (call_status),

    FOREIGN KEY (chat_room_id) REFERENCES chat_room(id) ON DELETE CASCADE,
    FOREIGN KEY (caller_profile_id) REFERENCES profile(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_profile_id) REFERENCES profile(id) ON DELETE CASCADE
);
```

### VoiceMuteStatus 테이블

```sql
CREATE TABLE voice_mute_status (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    chat_room_id BIGINT NOT NULL,
    profile_id BIGINT NOT NULL,
    is_muted BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY uk_chat_room_profile (chat_room_id, profile_id),
    INDEX idx_chat_room_id (chat_room_id),
    INDEX idx_profile_id (profile_id),

    FOREIGN KEY (chat_room_id) REFERENCES chat_room(id) ON DELETE CASCADE,
    FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE
);
```

---

## 📊 Entity 클래스

### VoiceCallHistory.java

```java
package com.transitlove.domain.voice.entity;

import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "voice_call_history")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class VoiceCallHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "chat_room_id", nullable = false)
    private Long chatRoomId;

    @Column(name = "caller_profile_id", nullable = false)
    private Long callerProfileId;

    @Column(name = "receiver_profile_id", nullable = false)
    private Long receiverProfileId;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "duration", nullable = false)
    private Integer duration; // 초 단위

    @Enumerated(EnumType.STRING)
    @Column(name = "call_status", nullable = false, length = 20)
    private CallStatus callStatus;

    @Column(name = "voice_modulation_used")
    private Boolean voiceModulationUsed = false;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
```

### CallStatus.java (Enum)

```java
package com.transitlove.domain.voice.entity;

public enum CallStatus {
    COMPLETED("정상 종료"),
    REJECTED("거절됨"),
    FAILED("연결 실패"),
    MISSED("부재중");

    private final String description;

    CallStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
```

### VoiceMuteStatus.java

```java
package com.transitlove.domain.voice.entity;

import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "voice_mute_status",
       uniqueConstraints = @UniqueConstraint(
           name = "uk_chat_room_profile",
           columnNames = {"chat_room_id", "profile_id"}
       ))
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class VoiceMuteStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "chat_room_id", nullable = false)
    private Long chatRoomId;

    @Column(name = "profile_id", nullable = false)
    private Long profileId;

    @Column(name = "is_muted", nullable = false)
    private Boolean isMuted = false;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public void updateMuteStatus(boolean isMuted) {
        this.isMuted = isMuted;
    }
}
```

---

## 📝 DTO 클래스

### VoiceCallHistoryRequest.java

```java
package com.transitlove.domain.voice.dto;

import com.transitlove.domain.voice.entity.CallStatus;
import lombok.*;
import javax.validation.constraints.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VoiceCallHistoryRequest {

    @NotNull(message = "채팅방 ID는 필수입니다.")
    private Long chatRoomId;

    @NotNull(message = "발신자 프로필 ID는 필수입니다.")
    private Long callerProfileId;

    @NotNull(message = "수신자 프로필 ID는 필수입니다.")
    private Long receiverProfileId;

    @NotNull(message = "통화 시작 시각은 필수입니다.")
    private LocalDateTime startTime;

    @NotNull(message = "통화 종료 시각은 필수입니다.")
    private LocalDateTime endTime;

    @NotNull(message = "통화 시간은 필수입니다.")
    @Min(value = 0, message = "통화 시간은 0 이상이어야 합니다.")
    private Integer duration;

    @NotNull(message = "통화 상태는 필수입니다.")
    private CallStatus callStatus;

    private Boolean voiceModulationUsed = false;
}
```

### VoiceMuteRequest.java

```java
package com.transitlove.domain.voice.dto;

import lombok.*;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VoiceMuteRequest {

    @NotNull(message = "프로필 ID는 필수입니다.")
    private Long profileId;

    @NotNull(message = "음소거 상태는 필수입니다.")
    private Boolean isMuted;

    @NotNull(message = "타임스탬프는 필수입니다.")
    private Long timestamp;
}
```

### VoiceCallStatisticsResponse.java

```java
package com.transitlove.domain.voice.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VoiceCallStatisticsResponse {
    private Long chatRoomId;
    private Integer totalCalls;
    private Integer completedCalls;
    private Integer rejectedCalls;
    private Integer missedCalls;
    private Integer totalDuration;
    private Integer averageDuration;
    private Integer longestCallDuration;
    private Integer shortestCallDuration;
    private Double voiceModulationUsageRate;
    private LocalDateTime firstCallTime;
    private LocalDateTime lastCallTime;
}
```

---

## 🎯 서비스 인터페이스 예시

### VoiceCallService.java

```java
package com.transitlove.domain.voice.service;

import com.transitlove.domain.voice.dto.*;
import com.transitlove.domain.voice.entity.VoiceCallHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface VoiceCallService {

    /**
     * 음소거 상태 업데이트
     */
    void updateMuteStatus(Long chatRoomId, VoiceMuteRequest request);

    /**
     * 통화 기록 저장
     */
    VoiceCallHistory saveCallHistory(VoiceCallHistoryRequest request);

    /**
     * 채팅방별 통화 기록 조회
     */
    Page<VoiceCallHistory> getCallHistoryByChatRoom(Long chatRoomId, Pageable pageable);

    /**
     * 내 통화 기록 조회
     */
    Page<VoiceCallHistory> getMyCallHistory(Long profileId, Pageable pageable);

    /**
     * 통화 통계 조회
     */
    VoiceCallStatisticsResponse getCallStatistics(Long chatRoomId);

    /**
     * 현재 활성 통화 조회
     */
    List<ActiveCallResponse> getActiveCalls();
}
```

---

## 🔔 WebSocket 메시지 확장

기존 음성 시그널 메시지에 음소거 상태를 추가합니다.

### VoiceSignalMessage 업데이트

```java
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VoiceSignalMessage {
    private VoiceSignalType type;
    private Long chatRoomId;
    private Long fromProfileId;
    private Long toProfileId;
    private String sdp;
    private Object candidate;
    private Long timestamp;

    // 추가 필드
    private Boolean isMuted;        // 음소거 상태
    private Boolean isSpeakerOn;    // 스피커 상태
}
```

### 새로운 시그널 타입

```java
public enum VoiceSignalType {
    VOICE_CALL_REQUEST,
    VOICE_CALL_ACCEPT,
    VOICE_CALL_REJECT,
    VOICE_CALL_END,
    OFFER,
    ANSWER,
    ICE_CANDIDATE,

    // 추가
    MUTE_STATUS_CHANGED,    // 음소거 상태 변경
    SPEAKER_STATUS_CHANGED  // 스피커 상태 변경
}
```

---

## 🧪 테스트 케이스

### 통화 기록 저장 테스트

```java
@Test
void saveCallHistory_Success() {
    // Given
    VoiceCallHistoryRequest request = VoiceCallHistoryRequest.builder()
        .chatRoomId(1L)
        .callerProfileId(123L)
        .receiverProfileId(456L)
        .startTime(LocalDateTime.now().minusMinutes(15))
        .endTime(LocalDateTime.now())
        .duration(900)
        .callStatus(CallStatus.COMPLETED)
        .voiceModulationUsed(true)
        .build();

    // When
    VoiceCallHistory result = voiceCallService.saveCallHistory(request);

    // Then
    assertNotNull(result.getId());
    assertEquals(1L, result.getChatRoomId());
    assertEquals(900, result.getDuration());
}
```

---

## 📌 프론트엔드 통합 가이드

### 1. 음소거 상태 전송

```typescript
// src/hooks/useVoiceChat.ts
const toggleMute = useCallback(() => {
  if (localStreamRef.current) {
    const audioTrack = localStreamRef.current.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);

      // 서버에 음소거 상태 전송
      fetch(`/api/voice/room/${chatRoomId}/mute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profileId: myProfileId,
          isMuted: !audioTrack.enabled,
          timestamp: Date.now(),
        }),
      });

      // WebSocket으로 상대방에게 알림
      sendSignal(VoiceSignalType.MUTE_STATUS_CHANGED, {
        isMuted: !audioTrack.enabled,
      });
    }
  }
}, [chatRoomId, myProfileId, sendSignal]);
```

### 2. 통화 종료 시 기록 저장

```typescript
const endCall = useCallback(() => {
  const endTime = new Date();

  // 통화 기록 저장
  fetch("/api/voice/call/history", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      chatRoomId,
      callerProfileId: myProfileId,
      receiverProfileId: partnerProfileId,
      startTime: callStartTimeRef.current.toISOString(),
      endTime: endTime.toISOString(),
      duration: callDuration,
      callStatus: "COMPLETED",
      voiceModulationUsed: modulationSettings.effectType !== "none",
    }),
  });

  sendSignal(VoiceSignalType.VOICE_CALL_END);
  setCallStatus(VoiceCallStatus.ENDED);
  cleanup();
}, [
  chatRoomId,
  myProfileId,
  partnerProfileId,
  callDuration,
  modulationSettings,
]);
```

### 3. 통화 기록 조회

```typescript
// src/api/voiceChatService.ts
export const voiceChatService = {
  // 통화 기록 조회
  getCallHistory: async (chatRoomId: number, page = 0, size = 20) => {
    const response = await apiClient.get(
      `/api/voice/call/history?chatRoomId=${chatRoomId}&page=${page}&size=${size}`
    );
    return response.data;
  },

  // 내 통화 기록 조회
  getMyCallHistory: async (page = 0, size = 20) => {
    const response = await apiClient.get(
      `/api/voice/call/history/my?page=${page}&size=${size}`
    );
    return response.data;
  },

  // 통화 통계 조회
  getCallStatistics: async (chatRoomId: number) => {
    const response = await apiClient.get(
      `/api/voice/call/statistics?chatRoomId=${chatRoomId}`
    );
    return response.data;
  },
};
```

---

## 🚀 배포 체크리스트

- [ ] 데이터베이스 마이그레이션 스크립트 작성
- [ ] API 엔드포인트 테스트
- [ ] 권한 검증 로직 추가
- [ ] 로깅 및 모니터링 설정
- [ ] 에러 핸들링 구현
- [ ] API 문서 자동 생성 (Swagger/OpenAPI)
- [ ] 성능 테스트 (부하 테스트)
- [ ] 보안 검토 (SQL Injection, XSS 등)

---

**작성일**: 2024-12-08  
**버전**: 1.0.0  
**상태**: ✅ 완료
