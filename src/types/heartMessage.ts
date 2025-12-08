export interface ProfileInfo {
  id: number;
  nickname: string;
  profileImageUrl?: string;
}

export interface HeartMessage {
  id: number;
  senderProfile: ProfileInfo;
  receiverProfile: ProfileInfo;
  content: string;
  sentAt: string;
}

export interface HeartMessageRequest {
  receiverProfileId: number;
  content: string;
}

export interface HeartMessageResponse extends HeartMessage {}
