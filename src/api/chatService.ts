import apiClient from "./client";
import type {
  ChatListResponse,
  MatchResponse,
  ChatMessageResponse,
  ChatMessageRequest,
  CreateChatRoomRequest,
  CreateChatRoomResponse,
  ChatRoomListResponse,
} from "../types/chat";

/**
 * 채팅 목록 조회 (매칭된 커플 + 일반 프로필)
 */
export const getChatList = async (): Promise<ChatListResponse> => {
  try {
    const response = await apiClient.get("/api/chat/list");
    return response.data;
  } catch (error: any) {
    console.error("getChatList 에러:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * 내 매칭 목록 조회
 */
export const getMyMatches = async (): Promise<MatchResponse[]> => {
  const response = await apiClient.get("/api/chat/matches");
  return response.data;
};

/**
 * 채팅방 생성 또는 조회 (2시간 제한 채팅방)
 * @param targetProfileId 대화 상대 프로필 ID
 */
export const createChatRoom = async (
  targetProfileId: number
): Promise<CreateChatRoomResponse> => {
  const request: CreateChatRoomRequest = { targetProfileId };
  const response = await apiClient.post("/api/chatrooms", request);
  return response.data;
};

/**
 * 내 채팅방 리스트 조회 (매칭/비매칭 구분)
 */
export const getChatRoomList = async (): Promise<ChatRoomListResponse> => {
  const response = await apiClient.get("/api/chatrooms");
  return response.data;
};

/**
 * 채팅방 메시지 조회
 * @param chatRoomId 채팅방 ID
 * @param page 페이지 번호 (optional)
 * @param size 페이지 크기 (optional)
 */
export const getChatRoomMessages = async (
  chatRoomId: number,
  page?: number,
  size?: number
): Promise<ChatMessageResponse[]> => {
  const params = new URLSearchParams();
  if (page !== undefined) params.append("page", page.toString());
  if (size !== undefined) params.append("size", size.toString());

  const response = await apiClient.get(
    `/api/chatrooms/${chatRoomId}/messages${
      params.toString() ? `?${params.toString()}` : ""
    }`
  );
  return response.data;
};

/**
 * 채팅방 메시지 읽음 처리
 * @param chatRoomId 채팅방 ID
 */
export const markChatRoomMessagesAsRead = async (
  chatRoomId: number
): Promise<void> => {
  await apiClient.put(`/api/chatrooms/${chatRoomId}/read`);
};

/**
 * 특정 매칭의 채팅 메시지 조회
 * @param matchId 매칭 ID
 * @param page 페이지 번호 (optional)
 * @param size 페이지 크기 (optional)
 */
export const getChatMessages = async (
  matchId: number,
  page?: number,
  size?: number
): Promise<ChatMessageResponse[]> => {
  const params = new URLSearchParams();
  if (page !== undefined) params.append("page", page.toString());
  if (size !== undefined) params.append("size", size.toString());

  const response = await apiClient.get(
    `/api/chat/matches/${matchId}/messages${
      params.toString() ? `?${params.toString()}` : ""
    }`
  );
  return response.data;
};

/**
 * 메시지 읽음 처리
 * @param matchId 매칭 ID
 */
export const markMessagesAsRead = async (matchId: number): Promise<void> => {
  await apiClient.put(`/api/chat/matches/${matchId}/read`);
};

/**
 * 매칭 생성
 * @param targetProfileId 매칭할 상대방 프로필 ID
 */
export const createMatch = async (
  targetProfileId: number
): Promise<MatchResponse> => {
  const response = await apiClient.post(
    `/api/chat/matches?targetProfileId=${targetProfileId}`
  );
  return response.data;
};

/**
 * 매칭 해제
 * @param matchId 매칭 ID
 */
export const deleteMatch = async (matchId: number): Promise<void> => {
  await apiClient.delete(`/api/chat/matches/${matchId}`);
};

/**
 * REST API로 메시지 전송 (WebSocket 사용 불가 시)
 * @param request 메시지 전송 요청
 */
export const sendMessageViaRest = async (
  request: ChatMessageRequest
): Promise<ChatMessageResponse> => {
  const response = await apiClient.post("/api/chat/send", request);
  return response.data;
};

/**
 * 마지막 선택 옵션 조회
 * 현재 매칭 상대 + 채팅했던 다른 사람들
 */
export const getFinalChoiceOptions = async () => {
  const response = await apiClient.get("/api/chat/final-choice/options");
  return response.data;
};

/**
 * 마지막 선택 실행
 * @param selectedProfileId 선택한 프로필 ID
 */
export const makeFinalChoice = async (selectedProfileId: number) => {
  const response = await apiClient.post("/api/chat/final-choice", {
    selectedProfileId,
  });
  return response.data;
};
