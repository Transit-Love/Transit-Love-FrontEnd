import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import * as S from "../../chatList/style"; // 사용자 채팅 스타일 재활용
import AdminNavBar from "../../../components/AdminNavBar";
import PageHeader from "../../../components/PageHeader";
import Loading from "../../../components/Loading";
import { useAdminMatchList } from "../../../hooks/useAdminQueries";
import MessageCircleIcon from "../../../assets/icon/message-circle.svg";
import Avatar1 from "../../../assets/icon/avatar1.png";
import Avatar2 from "../../../assets/icon/avatar2.png";
import Avatar3 from "../../../assets/icon/avatar3.png";
import Avatar4 from "../../../assets/icon/avatar4.png";

// Mobile-responsive container
const MobileContainer = styled.div`
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  padding: 0;
`;

const ContentWrapper = styled.div`
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;

  @media (max-width: 390px) {
    padding: 12px 16px;
  }
`;

const SectionWrapper = styled.div`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 390px) {
    padding: 16px 16px;
    gap: 16px;
  }
`;

const StyledCoupleSection = styled(S.CoupleSection)`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;

  @media (max-width: 390px) {
    max-width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 390px) {
    gap: 4px;
  }
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid ${({ $active }) => ($active ? "#FFC6B6" : "#ddd")};
  background: ${({ $active }) => ($active ? "#FFC6B6" : "white")};
  color: ${({ $active }) => ($active ? "white" : "#666")};
  cursor: pointer;
  font-size: 13px;
  white-space: nowrap;

  @media (max-width: 390px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`;

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

  // 채팅방으로 이동
  const handleViewChat = (matchId: number) => {
    navigate(`/admin/chat/${matchId}`);
  };

  // 로딩 중
  if (isLoading) {
    return (
      <S.ChatWrapper>
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
          <Loading message="채팅 목록을 불러오는 중..." />
        </div>
      </S.ChatWrapper>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <S.ChatWrapper>
        <PageHeader title="채팅 목록" backgroundColor="#FFC6B6" />
        <div style={{ padding: "24px", textAlign: "center", color: "red" }}>
          {error instanceof Error ? error.message : "오류가 발생했습니다"}
        </div>
        <AdminNavBar />
      </S.ChatWrapper>
    );
  }

  // 활성/비활성 매칭 분리
  const activeMatches = matches.filter((m) => m.isActive);

  return (
    <S.ChatWrapper>
      <PageHeader title="채팅 목록" backgroundColor="#FFC6B6" />

      <S.ChatContainer>
        <MobileContainer>
        <ContentWrapper>
          <div style={{ fontSize: "14px", color: "#666" }}>
            전체 매칭: {matches.length}개
          </div>
          <ButtonGroup>
            <FilterButton
              onClick={() => setShowInactive(false)}
              $active={!showInactive}
            >
              활성 매칭 ({activeMatches.length})
            </FilterButton>
            <FilterButton
              onClick={() => setShowInactive(true)}
              $active={showInactive}
            >
              전체 보기 ({matches.length})
            </FilterButton>
          </ButtonGroup>
        </ContentWrapper>

        <SectionWrapper>
          {/* 활성 매칭 목록 */}
          <StyledCoupleSection>
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
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#999",
                  }}
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
                    </div>
                  </S.UserCard>
                ))
              )}
            </div>
          </StyledCoupleSection>

          {/* 매칭 상세 정보 */}
          {(showInactive ? matches : activeMatches).length > 0 && (
            <StyledCoupleSection>
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
                      <span style={{ color: "white", fontSize: "16px" }}>
                        ✓
                      </span>
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
            </StyledCoupleSection>
          )}
        </SectionWrapper>
      </MobileContainer>
      </S.ChatContainer>

      <AdminNavBar />
    </S.ChatWrapper>
  );
};

export default AdminChatListPage;
