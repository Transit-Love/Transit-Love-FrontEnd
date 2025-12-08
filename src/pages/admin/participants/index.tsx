import React from "react";
import CoupleListLayout from "../../../components/CoupleListLayout";
import { useAdminMatchList } from "../../../hooks/useAdminQueries";
import Loading from "../../../components/Loading";
import type { Couple } from "../../../types/couple";
import type { AdminMatch } from "../../../types/admin";

const AdminParticipantsPage: React.FC = () => {
  const { data, isLoading, error } = useAdminMatchList(false);

  // AdminMatch를 Couple 형식으로 변환
  const couples: Couple[] = data?.matches.map((match: AdminMatch) => ({
    id: match.matchId,
    leftName: match.profile1.nickname,
    rightName: match.profile2.nickname,
    leftAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${match.profile1.nickname}`,
    rightAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${match.profile2.nickname}`,
  })) || [];

  if (isLoading) {
    return (
      <div style={{ 
        width: "100%", 
        maxWidth: "390px", 
        height: "100vh", 
        margin: "0 auto",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "#ffffff",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)"
      }}>
        <Loading message="참가자 목록을 불러오는 중..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>매칭 목록을 불러오는데 실패했습니다.</p>
        <p>{error instanceof Error ? error.message : "알 수 없는 오류"}</p>
      </div>
    );
  }

  return (
    <CoupleListLayout
      title="참가자들"
      sectionTitle="커플 목록"
      couples={couples}
    />
  );
};

export default AdminParticipantsPage;
