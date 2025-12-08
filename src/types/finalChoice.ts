export interface CurrentMatchDto {
  matchId: number;
  profileId: number;
  nickname: string;
  mbti: string;
  matchedAt: string;
  totalMessageCount: number;
}

export interface ChatPartnerDto {
  profileId: number;
  nickname: string;
  mbti: string;
  totalMessageCount: number;
  lastMessageAt: string;
}

export interface FinalChoiceOptionsResponse {
  currentMatch: CurrentMatchDto | null;
  chatPartners: ChatPartnerDto[];
}

export interface FinalChoiceRequest {
  selectedProfileId: number;
}

export interface FinalChoiceResponse {
  matchId: number;
  myProfileId: number;
  partnerProfileId: number;
  partnerNickname: string;
  partnerMbti: string;
  isChanged: boolean;
  finalizedAt: string;
}
