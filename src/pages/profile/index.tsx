import React from 'react';
import * as S from './style';
import { useNavigate } from 'react-router-dom';
import Avatar1 from '../../assets/icon/avatar1.png';
import Heart from '../../assets/icon/heart.svg';
import Users from '../../assets/icon/users.svg';
import NavBar from '../../components/NavBar';
import PageHeader from '../../components/PageHeader';
import type { Profile } from "../../types/profile";
import { BalanceItem } from "../../components/BalanceItem";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  // Profile 타입 기반 데이터 예시
  const profile: Profile = {
    avatar: Avatar1,
    name: "너도 아라를 아라?",
    keywords: ["ENFP", "영화광", "운동", "우웅?"],
    balanceResults: [
      {
        icon: Heart,
        category: "연애 스타일",
        result: "설레는 연애",
      },
      {
        icon: Users,
        category: "연애 경험",
        result: "능숙한 편",
      },
    ],
  };

  return (
    <S.ProfileContainer>
      <S.BackgroundImage />
      <PageHeader title="내 프로필" backgroundColor="#fab0b8" />
      <S.AvatarSection>
        <S.AvatarContainer>
          <S.Avatar src={profile.avatar} alt="프로필" />
        </S.AvatarContainer>
        <S.ProfileInfo>
          <S.ProfileName>{profile.name}</S.ProfileName>
        </S.ProfileInfo>
      </S.AvatarSection>

      <S.KeywordsSection>
        <S.SectionTitle>이런 사람이에요</S.SectionTitle>
        <S.KeywordsGrid>
          {profile.keywords.map((keyword, index) => (
            <S.KeywordTag key={index}>{keyword}</S.KeywordTag>
          ))}
        </S.KeywordsGrid>
      </S.KeywordsSection>

      <S.BalanceResults>
        <S.SectionTitle>밸런스게임 결과</S.SectionTitle>
        <S.BalanceItems>
          {profile.balanceResults.map((item, index) => (
            <BalanceItem
              key={index}
              icon={item.icon}
              category={item.category}
              result={item.result}
            />
          ))}
        </S.BalanceItems>
      </S.BalanceResults>

      <NavBar />
    </S.ProfileContainer>
  );
};

export default ProfilePage;
