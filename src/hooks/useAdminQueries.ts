import { useQuery } from "@tanstack/react-query";
import {
  getAdminMatchList,
  getAdminChatMessages,
  getAdminHeartMessages,
} from "../api/adminService";

/**
 * 어드민 매칭 목록 조회 (캐싱)
 */
export const useAdminMatchList = (includeInactive: boolean = false) => {
  return useQuery({
    queryKey: ["adminMatches", includeInactive],
    queryFn: () => getAdminMatchList(includeInactive),
    staleTime: 3 * 60 * 1000, // 3분
  });
};

/**
 * 어드민 채팅 메시지 조회 (캐싱)
 */
export const useAdminChatMessages = (matchId: number) => {
  return useQuery({
    queryKey: ["adminChatMessages", matchId],
    queryFn: () => getAdminChatMessages(matchId),
    staleTime: 30000, // 30초
    enabled: !!matchId,
  });
};

/**
 * 어드민 - 모든 속마음 문자 목록 조회
 */
export const useAdminHeartMessages = () => {
  return useQuery({
    queryKey: ["adminHeartMessages"],
    queryFn: getAdminHeartMessages,
    staleTime: 60000, // 1분
  });
};
