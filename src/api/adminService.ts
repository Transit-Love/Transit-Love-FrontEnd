import apiClient from "./client";
import type {
  AdminMatchListResponse,
  AdminChatMessagesResponse,
} from "../types/admin";

/**
 * 어드민 - 모든 커플 매칭 목록 조회
 * @param includeInactive 비활성 매칭 포함 여부 (기본: false)
 */
export const getAdminMatchList = async (
  includeInactive: boolean = false
): Promise<AdminMatchListResponse> => {
  const params = new URLSearchParams();
  if (includeInactive) {
    params.append("includeInactive", "true");
  }

  const response = await apiClient.get(
    `/api/admin/chat/matches${params.toString() ? `?${params.toString()}` : ""}`
  );
  return response.data;
};

/**
 * 어드민 - 특정 커플의 채팅 메시지 조회
 * @param matchId 매칭 ID
 */
export const getAdminChatMessages = async (
  matchId: number
): Promise<AdminChatMessagesResponse> => {
  const response = await apiClient.get(
    `/api/admin/chat/matches/${matchId}/messages`
  );
  return response.data;
};
