import { useQuery } from "@tanstack/react-query";
import {
  getChatList,
  getChatRoomList,
  getChatMessages,
  getChatRoomMessages,
} from "../api/chatService";

/**
 * 채팅 목록 조회 (매칭된 커플 + 일반 프로필)
 */
export const useChatList = () => {
  return useQuery({
    queryKey: ["chatList"],
    queryFn: getChatList,
    staleTime: 2 * 60 * 1000, // 2분
  });
};

/**
 * 채팅방 목록 조회 (2시간 제한 채팅방 포함)
 */
export const useChatRoomList = () => {
  return useQuery({
    queryKey: ["chatRoomList"],
    queryFn: getChatRoomList,
    staleTime: 1 * 60 * 1000, // 1분
  });
};

/**
 * 매칭 채팅 메시지 조회
 */
export const useChatMessages = (matchId: number | null) => {
  return useQuery({
    queryKey: ["chatMessages", matchId],
    queryFn: () => getChatMessages(matchId!),
    staleTime: 30 * 1000, // 30초
    enabled: !!matchId,
  });
};

/**
 * 채팅방 메시지 조회
 */
export const useChatRoomMessages = (chatRoomId: number | null) => {
  return useQuery({
    queryKey: ["chatRoomMessages", chatRoomId],
    queryFn: () => getChatRoomMessages(chatRoomId!),
    staleTime: 30 * 1000, // 30초
    enabled: !!chatRoomId,
  });
};
