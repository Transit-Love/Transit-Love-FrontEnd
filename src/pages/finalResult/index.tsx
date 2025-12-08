import React, { useEffect, useState } from "react";
import * as S from "./style";
import Avatar from "../../assets/icon/avatar1.png";
import PageHeader from "../../components/PageHeader";
import FrameIcon from "../../assets/icon/frame.svg";
import HeartIcon from "../../assets/icon/heart-result.svg";
import UsersIcon from "../../assets/icon/users.svg";
import { getFinalChoiceOptions } from "../../api/chatService";
import type { FinalChoiceOptionsResponse } from "../../types/finalChoice";

const FinalResultPage: React.FC = () => {
  const [choiceOptions, setChoiceOptions] =
    useState<FinalChoiceOptionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFinalChoiceOptions();
  }, []);

  const fetchFinalChoiceOptions = async () => {
    try {
      setLoading(true);
      const data = await getFinalChoiceOptions();
      setChoiceOptions(data);
    } catch (err) {
      setError("매칭 정보를 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <S.FinalResultContainer>
        <PageHeader
          title="최종 결과"
          subtitle="당신의 선택"
          backgroundColor="#fab0b8"
        />
        <S.LoadingMessage>로딩 중...</S.LoadingMessage>
      </S.FinalResultContainer>
    );
  }

  if (error || !choiceOptions) {
    return (
      <S.FinalResultContainer>
        <PageHeader
          title="최종 결과"
          subtitle="당신의 선택"
          backgroundColor="#fab0b8"
        />
        <S.ErrorMessage>
          {error || "데이터를 불러올 수 없습니다."}
        </S.ErrorMessage>
      </S.FinalResultContainer>
    );
  }

  const { currentMatch, chatPartners } = choiceOptions;

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
      <PageHeader
        title="최종 결과"
        subtitle="당신의 선택"
        backgroundColor="#fab0b8"
      />

      <S.ScrollableContent>
        {currentMatch && (
          <>
            <S.InfoCard>
              <S.InfoIcon src={FrameIcon} alt="축하" />
              <S.InfoText>
                <S.InfoMainText>축하합니다!!</S.InfoMainText>
                <S.InfoSubText>
                  당신이 선택한 사람과 매칭되었어요!!
                </S.InfoSubText>
              </S.InfoText>
            </S.InfoCard>

            <S.AvatarSection>
              <S.AvatarContainer src={Avatar} alt="프로필" />
              <S.ProfileInfo>
                <S.ProfileName>{currentMatch.nickname}</S.ProfileName>
                <S.ProfileMbti>{currentMatch.mbti}</S.ProfileMbti>
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

            <S.MessageCountSection>
              <S.MessageCountText>
                총 {currentMatch.totalMessageCount}개의 메시지를 주고받았어요
              </S.MessageCountText>
            </S.MessageCountSection>
          </>
        )}

        {!currentMatch && (
          <S.NoPartnersMessage>
            아직 매칭된 상대가 없습니다.
          </S.NoPartnersMessage>
        )}
      </S.ScrollableContent>
    </S.FinalResultContainer>
  );
};

export default FinalResultPage;
