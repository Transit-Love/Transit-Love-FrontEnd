# Transit Love - 채팅 기능 프론트엔드 구현 완료 ✅

## 📋 구현 완료 기능

백엔드 API 명세서에 따라 채팅 목록 및 실시간 채팅 기능이 완전히 구현되었습니다.

### ✨ 주요 기능

1. **채팅 목록 조회** (`/chatList`)

   - 매칭된 커플 프로필 표시 (최대 1개)
   - 일반 참가자 목록 표시
   - 미읽은 메시지 카운트 표시
   - 마지막 메시지 미리보기

2. **실시간 채팅** (`/chat`)
   - WebSocket (STOMP) 기반 실시간 메시지 송수신
   - 메시지 히스토리 로드
   - 자동 읽음 처리
   - 날짜별 메시지 구분
   - 실시간 연결 상태 표시

## 📁 생성/수정된 파일

### 새로 생성된 파일

#### 타입 정의

- ✅ `src/types/chat.ts` - 채팅 관련 TypeScript 타입 정의
  - `ChatMessage`, `ChatMessageRequest`, `ChatMessageResponse`
  - `Match`, `MatchResponse`
  - `MatchedProfile`, `Profile`
  - `ChatListResponse`
  - `MessageType` enum

#### API 서비스

- ✅ `src/api/chatService.ts` - 채팅 API 서비스
  - `getChatList()` - 채팅 목록 조회
  - `getMyMatches()` - 내 매칭 목록
  - `getChatMessages()` - 메시지 조회
  - `markMessagesAsRead()` - 읽음 처리
  - `createMatch()` - 매칭 생성
  - `deleteMatch()` - 매칭 해제
  - `sendMessageViaRest()` - REST API 메시지 전송

#### WebSocket 훅

- ✅ `src/hooks/useWebSocket.ts` - WebSocket 연결 관리 커스텀 훅
  - STOMP 클라이언트 연결
  - 메시지 송수신
  - 자동 재연결
  - 읽음 처리
  - 연결 상태 관리

#### 환경 설정

- ✅ `.env` - 개발 환경 변수
- ✅ `.env.production` - 프로덕션 환경 변수
- ✅ `.env.local.example` - 환경 변수 예시

### 수정된 파일

- ✅ `src/pages/chat/index.tsx` - 채팅 페이지 API 연동
  - WebSocket 연결
  - 메시지 로드 및 표시
  - 실시간 메시지 수신
  - 메시지 전송
  - 자동 읽음 처리

## 🚀 사용 방법

### 1. 환경 변수 설정

`.env.local` 파일을 생성하고 백엔드 서버 URL을 설정하세요:

```bash
# .env.local 생성
cp .env.local.example .env.local
```

```env
VITE_API_URL=http://localhost:8080
VITE_WS_URL=http://localhost:8080
```

### 2. 의존성 설치

```bash
yarn install
```

### 3. 개발 서버 실행

```bash
yarn dev
```

### 4. 백엔드 서버 실행

채팅 기능이 동작하려면 백엔드 서버가 실행 중이어야 합니다:

```bash
# 백엔드 디렉토리에서
cd /Users/hanjiwon/Desktop/transitLove/BackEnd/transitLove
./gradlew bootRun
```

## 🔌 API 연동 상세

### REST API 엔드포인트

| 메서드 | 엔드포인트                               | 설명              |
| ------ | ---------------------------------------- | ----------------- |
| GET    | `/api/chat/list`                         | 채팅 목록 조회    |
| GET    | `/api/chat/matches`                      | 내 매칭 목록 조회 |
| GET    | `/api/chat/matches/{matchId}/messages`   | 메시지 조회       |
| PUT    | `/api/chat/matches/{matchId}/read`       | 읽음 처리         |
| POST   | `/api/chat/matches?targetProfileId={id}` | 매칭 생성         |
| DELETE | `/api/chat/matches/{matchId}`            | 매칭 해제         |

### WebSocket 엔드포인트

| 타입      | 엔드포인트              | 설명           |
| --------- | ----------------------- | -------------- |
| CONNECT   | `/ws`                   | WebSocket 연결 |
| SUBSCRIBE | `/topic/chat/{matchId}` | 채팅방 구독    |
| SEND      | `/app/chat.send`        | 메시지 전송    |
| SEND      | `/app/chat.read`        | 읽음 처리      |

## 🧩 컴포넌트 구조

```
채팅 목록 페이지 (ChatListPage)
├── PageHeader - 페이지 헤더
├── HeaderInfo - 정보 카드
├── CoupleSection - 매칭된 커플 섹션
│   └── UserCard (isCouple) - 커플 카드
│       ├── 아바타
│       ├── 닉네임, MBTI
│       ├── 마지막 메시지 미리보기
│       └── 미읽은 메시지 카운트
├── OtherSection - 일반 참가자 섹션
│   └── UserCard[] - 참가자 목록
└── NavBar - 하단 네비게이션

채팅 페이지 (ChatPage)
├── ChatHeader - 채팅 헤더
│   ├── BackButton - 뒤로가기
│   ├── Avatar - 상대방 아바타
│   ├── UserDetails - 닉네임, 온라인 상태
│   └── Actions - 통화, 더보기
├── MessagesContainer - 메시지 목록
│   ├── DateDivider - 날짜 구분자
│   ├── MessageRow - 상대방 메시지
│   └── MessageRowRight - 내 메시지
├── InputContainer - 입력 영역
│   ├── TextInput - 메시지 입력
│   ├── PlusIcon - 첨부
│   └── SendButton - 전송
└── NavBar - 하단 네비게이션
```

## 🎨 주요 로직

### 채팅 목록 페이지

```typescript
// 1. 채팅 목록 로드
useEffect(() => {
  const fetchChatList = async () => {
    const data = await getChatList();
    setChatList(data);
  };
  fetchChatList();
}, []);

// 2. 채팅방으로 이동
const handleNavigateToChat = (matchId, profileId) => {
  navigate(`/chat?matchId=${matchId}&profileId=${profileId}`);
};
```

### 채팅 페이지

```typescript
// 1. WebSocket 연결
const { isConnected, sendMessage } = useWebSocket({
  matchId,
  onMessageReceived: (message) => {
    setMessages((prev) => [...prev, message]);
  },
});

// 2. 메시지 히스토리 로드
useEffect(() => {
  const loadMessages = async () => {
    const data = await getChatMessages(matchId);
    setMessages(data);
    await markMessagesAsRead(matchId);
  };
  loadMessages();
}, [matchId]);

// 3. 메시지 전송
const handleSendMessage = () => {
  if (message.trim() && isConnected) {
    sendMessage(message.trim());
    setMessage("");
  }
};
```

## 🔒 인증 처리

모든 API 요청에는 JWT 토큰이 자동으로 포함됩니다:

```typescript
// src/api/client.ts
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

WebSocket 연결 시에도 JWT 토큰을 헤더에 포함:

```typescript
// src/hooks/useWebSocket.ts
const client = new Client({
  connectHeaders: {
    Authorization: `Bearer ${token}`,
  },
});
```

## 📊 데이터 흐름

### 채팅 목록 조회 흐름

```
사용자 → ChatListPage
         ↓
    getChatList() (API)
         ↓
    GET /api/chat/list
         ↓
    응답: { matchedProfile, otherProfiles }
         ↓
    화면 렌더링
```

### 채팅 메시지 송수신 흐름

```
메시지 전송:
사용자 입력 → sendMessage() → WebSocket SEND → 백엔드
                                  ↓
                            STOMP /app/chat.send

메시지 수신:
백엔드 → STOMP /topic/chat/{matchId} → WebSocket SUBSCRIBE
                                         ↓
                                  onMessageReceived()
                                         ↓
                                   메시지 목록 업데이트
```

## 🧪 테스트 시나리오

### 1. 채팅 목록 테스트

1. 로그인 상태에서 채팅 목록 페이지 접속
2. 매칭된 커플 카드 확인
3. 미읽은 메시지 카운트 확인
4. 일반 참가자 목록 확인
5. 채팅 아이콘 클릭하여 채팅방 이동

### 2. 실시간 채팅 테스트

1. 채팅방 입장
2. WebSocket 연결 확인 (온라인 상태 표시)
3. 메시지 히스토리 로드 확인
4. 메시지 입력 및 전송
5. 상대방 메시지 실시간 수신 확인
6. 자동 읽음 처리 확인

### 3. 에러 처리 테스트

1. 백엔드 서버 중지 상태에서 접속
2. 토큰 만료 시나리오
3. 네트워크 오류 시나리오
4. WebSocket 연결 실패 시나리오

## 🐛 에러 처리

### API 에러

```typescript
try {
  const data = await getChatList();
} catch (err) {
  if (err.response?.status === 401) {
    // 인증 실패 - 로그인 페이지로 리다이렉트
    navigate("/login");
  } else if (err.response?.status === 403) {
    // 권한 없음
    setError("접근 권한이 없습니다.");
  } else {
    // 기타 오류
    setError("데이터를 불러오는데 실패했습니다.");
  }
}
```

### WebSocket 에러

```typescript
const { isConnected } = useWebSocket({
  onError: (error) => {
    console.error("WebSocket 오류:", error);
    alert("채팅 서버와 연결할 수 없습니다.");
  },
});

// 연결 상태 확인
if (!isConnected) {
  alert("채팅 서버와 연결되지 않았습니다.");
  return;
}
```

## 📦 설치된 패키지

```json
{
  "dependencies": {
    "@stomp/stompjs": "^7.2.1",
    "sockjs-client": "^1.6.1"
  },
  "devDependencies": {
    "@types/sockjs-client": "^1.5.4"
  }
}
```

## 🔧 환경 변수 설명

| 변수명         | 설명               | 기본값                  |
| -------------- | ------------------ | ----------------------- |
| `VITE_API_URL` | REST API 서버 URL  | `http://localhost:8080` |
| `VITE_WS_URL`  | WebSocket 서버 URL | `http://localhost:8080` |
| `NODE_ENV`     | 실행 환경          | `development`           |

## 🎯 완료 체크리스트

- [x] 채팅 관련 타입 정의
- [x] API 서비스 구현
- [x] WebSocket 훅 구현
- [x] 채팅 목록 페이지 API 연동
- [x] 채팅 페이지 API 연동
- [x] 실시간 메시지 송수신
- [x] 메시지 읽음 처리
- [x] 환경 변수 설정
- [x] 에러 처리
- [x] 문서화

## 🚀 다음 단계

### 추가 기능 구현 (선택사항)

- [ ] 이미지 메시지 전송
- [ ] 타이핑 인디케이터
- [ ] 메시지 페이지네이션
- [ ] 메시지 검색
- [ ] 푸시 알림
- [ ] 읽음 확인 표시 (✓✓)
- [ ] 메시지 삭제
- [ ] 차단 기능

### 성능 최적화

- [ ] 메시지 목록 가상화 (react-window)
- [ ] 이미지 lazy loading
- [ ] 메시지 캐싱
- [ ] WebSocket 재연결 로직 개선

## 📝 참고 사항

### Mock 데이터

로그인 토큰이 없는 경우 자동으로 Mock 데이터를 사용합니다:

```typescript
const useMockData = !localStorage.getItem("accessToken");
```

### 프로필 정보

현재 로그인한 사용자의 프로필 정보는 `useProfile` 훅을 통해 가져옵니다:

```typescript
const { profile } = useProfile();
const isMyMessage = message.senderProfileId === profile?.id;
```

## ⚠️ 주의사항

1. **백엔드 서버 실행 필수**: 채팅 기능을 사용하려면 백엔드 서버가 실행 중이어야 합니다.
2. **JWT 토큰 필요**: 로그인 후 발급받은 JWT 토큰이 localStorage에 저장되어 있어야 합니다.
3. **WebSocket 포트**: 백엔드 WebSocket 포트가 8080이 아닌 경우 `.env` 파일에서 수정하세요.
4. **CORS 설정**: 백엔드에서 프론트엔드 도메인이 CORS에 허용되어 있어야 합니다.

## 🎉 완료!

Transit Love 채팅 기능 프론트엔드 구현이 완료되었습니다!

---

**구현 완료일**: 2025-12-08  
**구현자**: GitHub Copilot  
**프레임워크**: React + TypeScript + Vite + WebSocket (STOMP)
