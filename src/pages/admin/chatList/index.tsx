import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../../chatList/style"; // 사용자 채팅 스타일 재활용
import AdminNavBar from "../../../components/AdminNavBar";
import PageHeader from "../../../components/PageHeader";
import { useAdminMatchList } from "../../../hooks/useAdminQueries";
import MessageCircleIcon from "../../../assets/icon/message-circle.svg";
import Avatar1 from "../../../assets/icon/avatar1.png";
import Avatar2 from "../../../assets/icon/avatar2.png";
import Avatar3 from "../../../assets/icon/avatar3.png";
import Avatar4 from "../../../assets/icon/avatar4.png";

const AdminChatListPage: React.FC = () => {
  const navigate = useNavigate();
  const [showInactive, setShowInactive] = useState(false);

  // React Query로 데이터 가져오기 (자동 캐싱)
  const { data, isLoading, error } = useAdminMatchList(showInactive);
  const matches = data?.matches || [];

  // 아바타 이미지 매핑
  const getAvatarImage = (profileId: number) => {
    const avatars = [Avatar1, Avatar2, Avatar3, Avatar4];
    return avatars[profileId % avatars.length];
  };

  // 시간 포맷팅
  const formatTime = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "오후" : "오전";
    const displayHours = hours % 12 || 12;
    return `${period} ${displayHours}:${minutes}`;
  };

  // 채팅방으로 이동
  const handleViewChat = (matchId: number) => {
    navigate(`/admin/chat/${matchId}`);
  };

  // 로딩 중
  if (isLoading) {
    return (
      <S.ChatContainer>
        <PageHeader title="어드민 - 채팅 목록" backgroundColor="#FFC6B6" />
        <div style={{ padding: "24px", textAlign: "center" }}>로딩 중...</div>
        <AdminNavBar />
      </S.ChatContainer>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <S.ChatContainer>
        <PageHeader title="어드민 - 채팅 목록" backgroundColor="#FFC6B6" />
        <div style={{ padding: "24px", textAlign: "center", color: "red" }}>
          {error instanceof Error ? error.message : "오류가 발생했습니다"}
        </div>
        <AdminNavBar />
      </S.ChatContainer>
    );
  }

  // 활성/비활성 매칭 분리
  const activeMatches = matches.filter((m) => m.isActive);
  const inactiveMatches = matches.filter((m) => !m.isActive);

  return (
    <S.ChatContainer>
      <PageHeader title="어드민 - 채팅 목록" backgroundColor="#FFC6B6" />

      <div
        style={{
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <div style={{ fontSize: "14px", color: "#666" }}>
          전체 매칭: {matches.length}개
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setShowInactive(false)}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: showInactive ? "1px solid #ddd" : "1px solid #FFC6B6",
              backgroundColor: showInactive ? "white" : "#FFC6B6",
              color: showInactive ? "#666" : "white",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            활성 매칭 ({activeMatches.length})
          </button>
          <button
            onClick={() => setShowInactive(true)}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: !showInactive ? "1px solid #ddd" : "1px solid #FFC6B6",
              backgroundColor: !showInactive ? "white" : "#FFC6B6",
              color: !showInactive ? "#666" : "white",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            전체 보기 ({matches.length})
          </button>
        </div>
      </div>

      <div
        style={{
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* 활성 매칭 목록 */}
        <S.CoupleSection>
          <S.CoupleLabel>
            {showInactive ? "모든 매칭" : "활성 매칭"}
          </S.CoupleLabel>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "100%",
            }}
          >
            {(showInactive ? matches : activeMatches).length === 0 ? (
              <div
                style={{ textAlign: "center", padding: "20px", color: "#999" }}
              >
                매칭이 없습니다.
              </div>
            ) : (
              (showInactive ? matches : activeMatches).map((match) => (
                <S.UserCard key={match.matchId} isCouple>
                  <div style={{ display: "flex", gap: "8px", flex: 1 }}>
                    <S.UserImage
                      src={getAvatarImage(match.profile1.profileId)}
                      alt="프로필1"
                    />
                    <S.UserInfo>
                      <S.UserName>{match.profile1.nickname}</S.UserName>
                      <div
                        style={{
                          display: "flex",
                          gap: "4px",
                          flexWrap: "wrap",
                        }}
                      >
                        <S.UserTag isCouple>
                          <S.InfoText
                            style={{ fontSize: "12px", lineHeight: "normal" }}
                          >
                            {match.profile1.mbti}
                          </S.InfoText>
                        </S.UserTag>
                      </div>
                    </S.UserInfo>
                  </div>

                  <div style={{ fontSize: "16px", color: "#fab0b8" }}>💑</div>

                  <div style={{ display: "flex", gap: "8px", flex: 1 }}>
                    <S.UserImage
                      src={getAvatarImage(match.profile2.profileId)}
                      alt="프로필2"
                    />
                    <S.UserInfo>
                      <S.UserName>{match.profile2.nickname}</S.UserName>
                      <div
                        style={{
                          display: "flex",
                          gap: "4px",
                          flexWrap: "wrap",
                        }}
                      >
                        <S.UserTag isCouple>
                          <S.InfoText
                            style={{ fontSize: "12px", lineHeight: "normal" }}
                          >
                            {match.profile2.mbti}
                          </S.InfoText>
                        </S.UserTag>
                      </div>
                    </S.UserInfo>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <img
                        src={MessageCircleIcon}
                        alt="메시지"
                        style={{
                          width: "19px",
                          height: "19px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleViewChat(match.matchId)}
                      />
                      {match.totalMessageCount > 0 && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            backgroundColor: "#FFC6B6",
                            color: "white",
                            borderRadius: "50%",
                            minWidth: "18px",
                            height: "18px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "10px",
                            fontWeight: "bold",
                            padding: "0 4px",
                          }}
                        >
                          {match.totalMessageCount}
                        </div>
                      )}
                    </div>
                    <S.InfoText style={{ fontSize: "10px", color: "#999" }}>
                      {match.matchType === "AUTO" ? "자동" : "수동"}
                    </S.InfoText>
                  </div>
                </S.UserCard>
              ))
            )}
          </div>
        </S.CoupleSection>

        {/* 매칭 상세 정보 */}
        {(showInactive ? matches : activeMatches).length > 0 && (
          <S.CoupleSection>
            <S.CoupleLabel>매칭 상세 정보</S.CoupleLabel>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                width: "100%",
              }}
            >
              {(showInactive ? matches : activeMatches).map((match) => (
                <div
                  key={match.matchId}
                  style={{
                    display: "flex",
                    padding: "20px",
                    alignItems: "center",
                    gap: "12px",
                    borderRadius: "16px",
                    backgroundColor: "#F8F9FA",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "24px",
                      height: "24px",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "6px",
                      backgroundColor: match.isActive ? "#FFC6B6" : "#E0E0E0",
                    }}
                  >
                    <span style={{ color: "white", fontSize: "16px" }}>✓</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        color: "#000",
                        fontSize: "16px",
                        fontWeight: 500,
                        marginBottom: "4px",
                      }}
                    >
                      {match.profile1.nickname} ↔ {match.profile2.nickname}
                    </div>
                    <div
                      style={{
                        color: "#666",
                        fontSize: "13px",
                      }}
                    >
                      유사도: {match.similarityScore.toFixed(1)}점 · 메시지:{" "}
                      {match.totalMessageCount}개
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </S.CoupleSection>
        )}
      </div>

      <AdminNavBar />
    </S.ChatContainer>
  );
};

export default AdminChatListPage;
