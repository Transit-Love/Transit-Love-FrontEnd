import apiClient from "./client";

export type MBTIType =
  | "ISTJ"
  | "ISFJ"
  | "INFJ"
  | "INTJ"
  | "ISTP"
  | "ISFP"
  | "INFP"
  | "INTP"
  | "ESTP"
  | "ESFP"
  | "ENFP"
  | "ENTP"
  | "ESTJ"
  | "ESFJ"
  | "ENFJ"
  | "ENTJ";

export interface Keyword {
  id: number;
  name: string;
}

export interface BalanceGameAnswer {
  balanceGameId: number;
  question?: string;
  option1?: string;
  option2?: string;
  selectedOption: number;
}

export interface Profile {
  id?: number;
  nickname: string;
  mbti?: MBTIType;
  keywords: Keyword[];
  balanceGameAnswers: BalanceGameAnswer[];
  createdAt?: string;
}

export interface MatchedProfile {
  id: number;
  nickname: string;
  mbti?: MBTIType;
  keywords: Keyword[];
  balanceGameAnswers: BalanceGameAnswer[];
  createdAt?: string;
}

export interface CreateProfileRequest {
  nickname: string;
  mbti?: MBTIType;
  keywordIds: number[];
  balanceGameAnswers: {
    balanceGameId: number;
    selectedOption: number;
  }[];
}

const profileService = {
  // 프로필 생성
  createProfile: async (data: CreateProfileRequest): Promise<Profile> => {
    try {
      const response = await apiClient.post<Profile>("/api/profiles", data);
      return response.data;
    } catch (error) {
      console.error("Failed to create profile:", error);
      throw error;
    }
  },

  // 내 프로필 조회
  getMyProfile: async (): Promise<Profile> => {
    try {
      const response = await apiClient.get<Profile>("/api/profiles/me");
      return response.data;
    } catch (error) {
      console.error("Failed to get my profile:", error);
      throw error;
    }
  },

  // 내 프로필 수정
  updateMyProfile: async (data: CreateProfileRequest): Promise<Profile> => {
    try {
      const response = await apiClient.put<Profile>("/api/profiles/me", data);
      return response.data;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  },

  // 매칭된 상대 조회
  getMatchedProfile: async (): Promise<MatchedProfile[]> => {
    try {
      const response = await apiClient.get<MatchedProfile[]>(
        "/api/profiles/matched"
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get matched profile:", error);
      throw error;
    }
  },
};

export default profileService;
