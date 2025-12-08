import { useQuery } from "@tanstack/react-query";
import { getAdminMatchList, getAdminChatMessages } from "../api/adminService";

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
    staleTime: 2 * 60 * 1000, // 2분
    enabled: !!matchId,
  });
};
