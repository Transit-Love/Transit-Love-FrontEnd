import apiClient from "./client";
import type { VoiceRoomResponse } from "../types/voiceChat";

// 음소거 상태 요청 타입
interface VoiceMuteRequest {
  profileId: number;
  isMuted: boolean;
  timestamp: number;
}

// 통화 기록 요청 타입
interface VoiceCallHistoryRequest {
  chatRoomId: number;
  callerProfileId: number;
  receiverProfileId: number;
  startTime: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
  duration: number; // 초 단위
  callStatus: "COMPLETED" | "REJECTED" | "FAILED" | "MISSED";
  voiceModulationUsed?: boolean;
}

// 통화 기록 응답 타입
interface VoiceCallHistoryResponse {
  callHistoryId: number;
  chatRoomId: number;
  callerProfileId: number;
  callerNickname?: string;
  receiverProfileId: number;
  receiverNickname?: string;
  startTime: string;
  endTime: string;
  duration: number;
  callStatus: string;
  voiceModulationUsed: boolean;
  createdAt: string;
}

// 통화 통계 응답 타입
interface VoiceCallStatisticsResponse {
  chatRoomId: number;
  totalCalls: number;
  completedCalls: number;
  rejectedCalls: number;
  missedCalls: number;
  totalDuration: number;
  averageDuration: number;
  longestCallDuration: number;
  shortestCallDuration: number;
  voiceModulationUsageRate: number;
  firstCallTime: string;
  lastCallTime: string;
}

export const voiceChatService = {
  // 음성 채팅방 정보 조회
  getVoiceRoom: async (chatRoomId: number): Promise<VoiceRoomResponse> => {
    const response = await apiClient.get(`/api/voice/room/${chatRoomId}`);
    return response.data;
  },

  // 세션 상태 조회
  getSessionStatus: async (
    chatRoomId: number
  ): Promise<{ active: boolean }> => {
    const response = await apiClient.get(
      `/api/voice/room/${chatRoomId}/status`
    );
    return response.data;
  },

  // 강제 종료
  endCall: async (chatRoomId: number): Promise<void> => {
    await apiClient.post(`/api/voice/room/${chatRoomId}/end`);
  },

  // 음소거 상태 변경
  updateMuteStatus: async (
    chatRoomId: number,
    request: VoiceMuteRequest
  ): Promise<void> => {
    await apiClient.post(`/api/voice/room/${chatRoomId}/mute`, request);
  },

  // 음소거 상태 조회
  getMuteStatus: async (
    chatRoomId: number,
    profileId: number
  ): Promise<{ isMuted: boolean }> => {
    const response = await apiClient.get(
      `/api/voice/room/${chatRoomId}/mute/${profileId}`
    );
    return response.data;
  },

  // 통화 기록 저장
  saveCallHistory: async (
    request: VoiceCallHistoryRequest
  ): Promise<VoiceCallHistoryResponse> => {
    const response = await apiClient.post("/api/voice/call/history", request);
    return response.data;
  },

  // 채팅방별 통화 기록 조회
  getCallHistory: async (
    chatRoomId: number,
    page = 0,
    size = 20
  ): Promise<{
    content: VoiceCallHistoryResponse[];
    totalElements: number;
    totalPages: number;
  }> => {
    const response = await apiClient.get(
      `/api/voice/call/history?chatRoomId=${chatRoomId}&page=${page}&size=${size}`
    );
    return response.data;
  },

  // 내 통화 기록 조회
  getMyCallHistory: async (
    page = 0,
    size = 20
  ): Promise<{
    content: VoiceCallHistoryResponse[];
    totalElements: number;
    totalPages: number;
  }> => {
    const response = await apiClient.get(
      `/api/voice/call/history/my?page=${page}&size=${size}`
    );
    return response.data;
  },

  // 통화 통계 조회
  getCallStatistics: async (
    chatRoomId: number
  ): Promise<VoiceCallStatisticsResponse> => {
    const response = await apiClient.get(
      `/api/voice/call/statistics?chatRoomId=${chatRoomId}`
    );
    return response.data;
  },
};
