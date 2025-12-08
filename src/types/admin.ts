// 어드민 전용 타입 정의

// 프로필 정보
export interface AdminProfile {
  profileId: number;
  nickname: string;
  mbti: string;
}

// 매칭 타입
export type MatchType = "AUTO" | "MANUAL";

// 매칭 정보 (채팅방 리스트용)
export interface AdminMatch {
  matchId: number;
  profile1: AdminProfile;
  profile2: AdminProfile;
  isActive: boolean;
  matchType: MatchType;
  similarityScore: number;
  matchedAt: string;
  unmatchedAt?: string;
  totalMessageCount: number;
  lastMessage?: string;
  lastMessageTime?: string;
}

// 모든 매칭 리스트 응답
export interface AdminMatchListResponse {
  matches: AdminMatch[];
  totalCount: number;
}

// 채팅 메시지 (어드민용)
export interface AdminChatMessage {
  id: number;
  messageId: number;
  senderProfileId: number;
  senderNickname: string;
  content: string;
  type: "TEXT" | "IMAGE" | "SYSTEM";
  isRead: boolean;
  sentAt: string;
  readAt?: string;
}

// 매칭 프로필 정보
export interface AdminMatchProfiles {
  profile1: AdminProfile;
  profile2: AdminProfile;
  matchedAt: string;
  isActive: boolean;
}

// 특정 매칭의 채팅 메시지 응답
export interface AdminChatMessagesResponse {
  matchId: number;
  matchProfiles: AdminMatchProfiles;
  messages: AdminChatMessage[];
  totalMessageCount: number;
}

// 속마음 문자 프로필 정보
export interface HeartMessageProfile {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

// 속마음 문자 (Admin용)
export interface AdminHeartMessage {
  id: number;
  senderProfile: HeartMessageProfile;
  receiverProfile: HeartMessageProfile;
  content: string;
  sentAt: string;
}

// 속마음 문자 목록 응답
export interface AdminHeartMessagesResponse {
  totalMessages: number;
  messages: AdminHeartMessage[];
}
