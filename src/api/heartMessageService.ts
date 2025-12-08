import client from "./client";
import type {
  HeartMessage,
  HeartMessageRequest,
  HeartMessageResponse,
} from "../types/heartMessage";

const heartMessageService = {
  /**
   * 속마음문자 전송
   */
  sendHeartMessage: async (
    request: HeartMessageRequest
  ): Promise<HeartMessageResponse> => {
    const response = await client.post<HeartMessageResponse>(
      "/api/heart-messages",
      request
    );
    return response.data;
  },

  /**
   * 전체 속마음문자 목록 조회 (보낸 것 + 받은 것)
   */
  getAllHeartMessages: async (): Promise<HeartMessage[]> => {
    const response = await client.get<HeartMessage[]>("/api/heart-messages");
    return response.data;
  },

  /**
   * 받은 속마음문자 목록 조회
   */
  getReceivedHeartMessages: async (): Promise<HeartMessage[]> => {
    const response = await client.get<HeartMessage[]>(
      "/api/heart-messages/received"
    );
    return response.data;
  },

  /**
   * 보낸 속마음문자 목록 조회
   */
  getSentHeartMessages: async (): Promise<HeartMessage[]> => {
    const response = await client.get<HeartMessage[]>(
      "/api/heart-messages/sent"
    );
    return response.data;
  },
};

export default heartMessageService;
