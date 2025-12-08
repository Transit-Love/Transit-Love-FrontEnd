import React, { useEffect, useState } from "react";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import Avatar1 from "../../assets/icon/avatar1.png";
import Heart from "../../assets/icon/heart.svg";
import Users from "../../assets/icon/users.svg";
import NavBar from "../../components/NavBar";
import PageHeader from "../../components/PageHeader";
import type { Profile } from "../../types/profile";
import { BalanceItem } from "../../components/BalanceItem";
import profileService from "../../api/profileService";
import authService from "../../api/authService";
import type {
  MatchedProfile,
  Profile as ApiProfile,
} from "../../api/profileService";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [myProfile, setMyProfile] = useState<ApiProfile | null>(null);
  const [matchedProfile, setMatchedProfile] = useState<MatchedProfile | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 내 프로필 및 매칭된 상대 조회
  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      setError(null);

      try {
        // 디버깅: 현재 저장된 토큰 확인
        const currentToken = localStorage.getItem("accessToken");
        console.log("=== 프로필 조회 시작 ===");
        console.log(
          "현재 토큰 (앞 20자):",
          currentToken ? currentToken.substring(0, 20) + "..." : "없음"
        );

        // 현재 인증된 사용자 정보 확인
        try {
          const currentUser = await authService.getCurrentUser();
          console.log("현재 인증된 사용자:", currentUser);
        } catch (err) {
          console.error("현재 사용자 정보 조회 실패:", err);
        }

        // 내 프로필 조회
        const profile = await profileService.getMyProfile();
        console.log("내 프로필 조회 성공:", profile);
        setMyProfile(profile);

        // 매칭된 상대 조회
        try {
          const matched = await profileService.getMatchedProfile();
          console.log("매칭 API 응답:", matched);

          // API는 배열을 반환하지만 1대1 매칭이므로 첫 번째 요소만 사용
          if (matched && Array.isArray(matched) && matched.length > 0) {
            setMatchedProfile(matched[0]);
          } else {
            setMatchedProfile(null);
          }
        } catch (matchError) {
          console.error("매칭된 상대 조회 실패:", matchError);
          setMatchedProfile(null);
        }
      } catch (error: any) {
        console.error("프로필 조회 실패:", error);

        if (error.response?.status === 404) {
          // 프로필이 없으면 설정 페이지로
          alert("프로필을 먼저 설정해주세요.");
          navigate("/profile/setting");
        } else if (error.response?.status === 401) {
          // 인증 실패
          alert("로그인이 필요합니다.");
          navigate("/login");
        } else {
          setError("프로필을 불러오는데 실패했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [navigate]);

  // 로딩 중
  if (loading) {
    return (
      <S.ProfileContainer>
        <S.BackgroundImage />
        <PageHeader title="내 프로필" backgroundColor="#fab0b8" />
        <div style={{ padding: "24px", textAlign: "center" }}>
          프로필을 불러오는 중...
        </div>
        <NavBar />
      </S.ProfileContainer>
    );
  }

  // 에러 발생
  if (error || !myProfile) {
    return (
      <S.ProfileContainer>
        <S.BackgroundImage />
        <PageHeader title="내 프로필" backgroundColor="#fab0b8" />
        <div style={{ padding: "24px", textAlign: "center", color: "red" }}>
          {error || "프로필을 불러올 수 없습니다."}
        </div>
        <NavBar />
      </S.ProfileContainer>
    );
  }

  // MBTI와 키워드를 함께 표시
  const displayKeywords = [
    ...(myProfile.mbti ? [myProfile.mbti] : []),
    ...myProfile.keywords.map((k) => k.name),
  ];

  return (
    <S.ProfileContainer>
      <S.BackgroundImage />
      <PageHeader title="내 프로필" backgroundColor="#fab0b8" />
      <S.AvatarSection>
        <S.AvatarContainer>
          <S.Avatar src={Avatar1} alt="프로필" />
        </S.AvatarContainer>
        <S.ProfileInfo>
          <S.ProfileName>{myProfile.nickname}</S.ProfileName>
        </S.ProfileInfo>
      </S.AvatarSection>

      <S.KeywordsSection>
        <S.SectionTitle>이런 사람이에요</S.SectionTitle>
        <S.KeywordsGrid>
          {displayKeywords.map((keyword, index) => (
            <S.KeywordTag key={index}>{keyword}</S.KeywordTag>
          ))}
        </S.KeywordsGrid>
      </S.KeywordsSection>

      {/* 매칭된 상대 섹션 */}
      <S.MatchSection>
        <S.SectionTitle>내 매칭 상대</S.SectionTitle>
        {matchedProfile ? (
          <S.MatchedCard
            onClick={() => navigate(`/profile/${matchedProfile.id}`)}
          >
            <S.MatchedInfo>
              <S.MatchedName>{matchedProfile.nickname}</S.MatchedName>
              {matchedProfile.mbti && (
                <S.MatchedMBTI>{matchedProfile.mbti}</S.MatchedMBTI>
              )}
            </S.MatchedInfo>
            <S.MatchedKeywords>
              {matchedProfile.keywords.slice(0, 3).map((keyword) => (
                <S.MatchedKeywordTag key={keyword.id}>
                  {keyword.name}
                </S.MatchedKeywordTag>
              ))}
            </S.MatchedKeywords>
          </S.MatchedCard>
        ) : (
          <S.MatchInfo>
            <S.MatchStatusText>아직 매칭된 상대가 없습니다</S.MatchStatusText>
            <S.MatchStatusSubText>
              곧 특별한 인연을 만날 수 있을 거예요! 💕
            </S.MatchStatusSubText>
          </S.MatchInfo>
        )}
      </S.MatchSection>

      <S.BalanceResults>
        <S.SectionTitle>밸런스게임 결과</S.SectionTitle>
        <S.BalanceItems>
          {myProfile.balanceGameAnswers.map((answer, index) => {
            // 아이콘은 인덱스에 따라 번갈아 표시
            const icon = index % 2 === 0 ? Heart : Users;
            const selectedAnswer =
              answer.selectedOption === 1 ? answer.option1 : answer.option2;

            return (
              <BalanceItem
                key={answer.balanceGameId}
                icon={icon}
                category={answer.question || `질문 ${answer.balanceGameId}`}
                result={selectedAnswer || `선택 ${answer.selectedOption}`}
              />
            );
          })}
        </S.BalanceItems>
      </S.BalanceResults>

      <NavBar />
    </S.ProfileContainer>
  );
};

export default ProfilePage;
