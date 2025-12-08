import React, { useEffect, useState } from "react";
import * as S from "./style";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar1 from "../../../assets/icon/avatar1.png";
import Heart from "../../../assets/icon/heart.svg";
import Users from "../../../assets/icon/users.svg";
import PageHeader from "../../../components/PageHeader";
import NavBar from "../../../components/NavBar";
import { BalanceItem } from "../../../components/BalanceItem";
import type { MatchedProfile } from "../../../api/profileService";

const ProfileDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<MatchedProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // location.state에서 프로필 정보 가져오기
    const stateProfile = location.state?.profile as MatchedProfile | undefined;

    if (stateProfile) {
      setProfile(stateProfile);
      setLoading(false);
    } else {
      // state가 없으면 프로필 페이지로 리다이렉트
      setError("프로필 정보를 찾을 수 없습니다.");
      setLoading(false);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    }
  }, [location, navigate]);

  // 로딩 중
  if (loading) {
    return (
      <S.ProfileContainer>
        <S.BackgroundImage />
        <PageHeader
          title="상대 프로필"
          backgroundColor="#fab0b8"
          onBack={() => navigate("/profile")}
        />
        <div
          style={{
            padding: "24px",
            textAlign: "center",
            paddingTop: "120px",
            position: "relative",
            zIndex: 100,
          }}
        >
          프로필을 불러오는 중...
        </div>
        <NavBar />
      </S.ProfileContainer>
    );
  }

  // 에러 발생
  if (error || !profile) {
    return (
      <S.ProfileContainer>
        <S.BackgroundImage />
        <PageHeader
          title="상대 프로필"
          backgroundColor="#fab0b8"
          onBack={() => navigate("/profile")}
        />
        <div
          style={{
            padding: "24px",
            textAlign: "center",
            color: "red",
            paddingTop: "120px",
            position: "relative",
            zIndex: 100,
          }}
        >
          {error || "프로필을 불러올 수 없습니다."}
        </div>
        <NavBar />
      </S.ProfileContainer>
    );
  }

  // MBTI와 키워드를 함께 표시
  const displayKeywords = [
    ...(profile.mbti ? [profile.mbti] : []),
    ...profile.keywords.map((k) => k.name),
  ];

  return (
    <S.ProfileContainer>
      <S.BackgroundImage />
      <PageHeader
        title={`${profile.nickname}님의 프로필`}
        backgroundColor="#fab0b8"
        onBack={() => navigate("/profile")}
      />
      <S.AvatarSection>
        <S.AvatarContainer>
          <S.Avatar src={Avatar1} alt="프로필" />
        </S.AvatarContainer>
        <S.ProfileInfo>
          <S.ProfileName>{profile.nickname}</S.ProfileName>
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

      <S.BalanceResults>
        <S.SectionTitle>밸런스게임 결과</S.SectionTitle>
        <S.BalanceItems>
          {profile.balanceGameAnswers.map((answer, index) => {
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

export default ProfileDetailPage;
