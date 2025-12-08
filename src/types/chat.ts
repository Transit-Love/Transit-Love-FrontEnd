// 채팅 메시지 타입
export type MessageType = "TEXT" | "IMAGE" | "SYSTEM";

// 채팅 메시지
export interface ChatMessage {
  id: number;
  matchId: number;
  senderProfileId: number;
  content: string;
  type: MessageType;
  isRead: boolean;
  sentAt: string;
  readAt?: string;
}

// 채팅 메시지 전송 요청
export interface ChatMessageRequest {
  matchId: number;
  content: string;
  type: MessageType;
}

// 채팅 메시지 응답
export interface ChatMessageResponse {
  id: number;
  matchId: number;
  senderProfileId: number;
  senderNickname: string;
  content: string;
  type: MessageType;
  isRead: boolean;
  sentAt: string;
  readAt?: string;
}

// 매칭 정보
export interface Match {
  id: number;
  profile1Id: number;
  profile2Id: number;
  isActive: boolean;
  matchedAt: string;
  unmatchedAt?: string;
}

// 매칭 응답
export interface MatchResponse {
  matchId: number;
  otherProfileId: number;
  otherNickname: string;
  otherMbti: string;
  matchedAt: string;
  unreadMessageCount: number;
  lastMessage?: string;
  lastMessageTime?: string;
}

// 매칭된 프로필 (채팅 목록용)
export interface MatchedProfile {
  matchId: number;
  profileId: number;
  nickname: string;
  mbti: string;
  matchedAt: string;
  unreadMessageCount: number;
  lastMessage?: string;
  lastMessageTime?: string;
}

// 일반 프로필 (채팅 목록용)
export interface Profile {
  profileId: number;
  nickname: string;
  mbti: string;
  createdAt: string;
}

// 채팅방 타입
export type RoomType = "MATCHED" | "UNMATCHED";

// 채팅방 정보
export interface ChatRoom {
  chatRoomId: number;
  profile1Id: number;
  profile2Id: number;
  matchId?: number;
  roomType: RoomType;
  isActive: boolean;
  createdAt: string;
  expiresAt?: string; // 비매칭 채팅방의 경우 2시간 후 만료
  lastMessageAt?: string;
}

// 채팅방 생성 요청
export interface CreateChatRoomRequest {
  targetProfileId: number;
}

// 채팅방 생성 응답
export interface CreateChatRoomResponse {
  chatRoomId: number;
  otherProfileId: number;
  otherNickname: string;
  otherMbti: string;
  roomType: RoomType;
  expiresAt?: string;
  unreadMessageCount: number;
}

// 채팅방 리스트 아이템
export interface ChatRoomListItem {
  chatRoomId: number;
  otherProfileId: number;
  otherNickname: string;
  otherMbti: string;
  roomType: RoomType;
  expiresAt?: string;
  unreadMessageCount: number;
  lastMessage?: string;
  lastMessageAt?: string;
  isExpired: boolean; // 만료 여부
  remainingMinutes?: number; // 남은 시간 (분)
}

// 채팅방 리스트 응답
export interface ChatRoomListResponse {
  matchedRooms: ChatRoomListItem[];
  unmatchedRooms: ChatRoomListItem[];
}

// 채팅 목록 응답
export interface ChatListResponse {
  matchedProfile?: MatchedProfile;
  otherProfiles: Profile[];
}

// WebSocket 메시지
export interface WebSocketMessage {
  type: "CHAT" | "READ" | "TYPING";
  data: ChatMessageResponse | Record<string, unknown>;
}
