import React from 'react';
import * as S from './style';
import { useNavigate } from 'react-router-dom';
import Back from '../../assets/back.png';
import Avatar1 from '../../assets/icon/avatar1.png';
import Heart from '../../assets/icon/heart.svg';
import Users from '../../assets/icon/users.svg';
import MessageCircle from '../../assets/icon/message-circle.svg';
import NavBar from '../../components/NavBar.tsx';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const keywords = ['ENFP', '영화광', '운동', '우웅?'];
  
  const balanceResults = [
    {
      icon: Heart,
      category: '연애 스타일',
      result: '설레는 연애'
    },
    {
      icon: Users,
      category: '연애 경험',
      result: '능숙한 편'
    }
  ];

  return (
    <S.ProfileContainer>
      <S.BackgroundImage />
      <S.Header>
        <S.NavBar>
          <S.BackButton onClick={() => navigate(-1)}>
            <img src={Back} alt="back" />
          </S.BackButton>
          <S.HeaderTitle>내 프로필</S.HeaderTitle>
        </S.NavBar>
      </S.Header>

      <S.StatusIcons />
      <S.TimeDisplay />

      <S.AvatarSection>
        <S.AvatarContainer>
          <S.Avatar src={Avatar1} alt="프로필" />
        </S.AvatarContainer>
        <S.ProfileInfo>
          <S.ProfileName>너도 아라를 아라?</S.ProfileName>
        </S.ProfileInfo>
      </S.AvatarSection>

      <S.KeywordsSection>
        <S.SectionTitle>이런 사람이에요</S.SectionTitle>
        <S.KeywordsGrid>
          {keywords.map((keyword, index) => (
            <S.KeywordTag key={index}>
              {keyword}
            </S.KeywordTag>
          ))}
        </S.KeywordsGrid>
      </S.KeywordsSection>

      <S.BalanceResults>
        <S.SectionTitle>밸런스게임 결과</S.SectionTitle>
        <S.BalanceItems>
          {balanceResults.map((item, index) => (
            <S.BalanceItem key={index}>
              <S.BalanceIcon src={item.icon} alt={item.category} />
              <S.BalanceText>
                <S.BalanceCategory>{item.category}</S.BalanceCategory>
                <S.BalanceResult>{item.result}</S.BalanceResult>
              </S.BalanceText>
            </S.BalanceItem>
          ))}
        </S.BalanceItems>
      </S.BalanceResults>

      <NavBar />
    </S.ProfileContainer>
  );
};

export default ProfilePage;