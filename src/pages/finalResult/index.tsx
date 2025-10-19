import React from "react";
import * as S from "./style";
import Avatar from "../../assets/icon/avatar1.png";
import BackIcon from "../../assets/back.png";
import FrameIcon from "../../assets/icon/frame.svg";
import HeartIcon from "../../assets/icon/heart-result.svg";
import UsersIcon from "../../assets/icon/users.svg";

const FinalResultPage: React.FC = () => {
  const keywords = ["ENFP", "영화광", "운동", "우웅?"];

  const balanceResults = [
    {
      icon: HeartIcon,
      label: "연애 스타일",
      value: "설레는 연애",
    },
    {
      icon: UsersIcon,
      label: "연애 경험",
      value: "능숙한 편",
    },
  ];

  return (
    <S.FinalResultContainer>
      <S.Header>
        <S.HeaderContent>
          <S.NavBar>
            <S.BackButton src={BackIcon} alt="뒤로가기" />
            <S.HeaderTitle>최종 결과</S.HeaderTitle>
          </S.NavBar>
          <S.HeaderSubtitle>당신을 선택한 상대</S.HeaderSubtitle>
        </S.HeaderContent>
      </S.Header>

      <S.InfoCard>
        <S.InfoIcon src={FrameIcon} alt="축하" />
        <S.InfoText>
          <S.InfoMainText>축하합니다!!</S.InfoMainText>
          <S.InfoSubText>당신이 선택한 사람과 매칭되었어요!!</S.InfoSubText>
        </S.InfoText>
      </S.InfoCard>

      <S.AvatarSection>
        <S.AvatarContainer src={Avatar} alt="프로필" />
        <S.ProfileInfo>
          <S.ProfileName>너도 아라를 아라?</S.ProfileName>
        </S.ProfileInfo>
      </S.AvatarSection>

      <S.KeywordsSection>
        <S.SectionTitle>이런 사람이에요</S.SectionTitle>
        <S.KeywordsWrapper>
          {keywords.map((keyword, index) => (
            <S.KeywordTag key={index}>
              <S.KeywordText>{keyword}</S.KeywordText>
            </S.KeywordTag>
          ))}
        </S.KeywordsWrapper>
      </S.KeywordsSection>

      <S.BalanceSection>
        <S.SectionTitle>밸런스게임 결과</S.SectionTitle>
        <S.BalanceItems>
          {balanceResults.map((item, index) => (
            <S.BalanceItem key={index}>
              <S.BalanceIcon src={item.icon} alt={item.label} />
              <S.BalanceTextWrapper>
                <S.BalanceLabel>{item.label}</S.BalanceLabel>
                <S.BalanceValue>{item.value}</S.BalanceValue>
              </S.BalanceTextWrapper>
            </S.BalanceItem>
          ))}
        </S.BalanceItems>
      </S.BalanceSection>
    </S.FinalResultContainer>
  );
};

export default FinalResultPage;
