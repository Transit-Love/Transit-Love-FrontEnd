import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import heartMessageService from "../api/heartMessageService";
import type { HeartMessageRequest } from "../types/heartMessage";

/**
 * 받은 속마음문자 목록 조회
 */
export const useReceivedHeartMessages = () => {
  return useQuery({
    queryKey: ["heartMessages", "received"],
    queryFn: heartMessageService.getReceivedHeartMessages,
    staleTime: 1000 * 60 * 5, // 5분
  });
};

/**
 * 보낸 속마음문자 목록 조회
 */
export const useSentHeartMessages = () => {
  return useQuery({
    queryKey: ["heartMessages", "sent"],
    queryFn: heartMessageService.getSentHeartMessages,
    staleTime: 1000 * 60 * 5, // 5분
  });
};

/**
 * 전체 속마음문자 목록 조회
 */
export const useAllHeartMessages = () => {
  return useQuery({
    queryKey: ["heartMessages", "all"],
    queryFn: heartMessageService.getAllHeartMessages,
    staleTime: 1000 * 60 * 5, // 5분
  });
};

/**
 * 속마음문자 전송
 */
export const useSendHeartMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: HeartMessageRequest) =>
      heartMessageService.sendHeartMessage(request),
    onSuccess: () => {
      // 모든 속마음문자 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["heartMessages"] });
    },
  });
};
