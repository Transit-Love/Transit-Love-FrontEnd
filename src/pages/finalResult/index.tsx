import React, { useEffect, useState } from "react";
import * as S from "./style";
import Avatar from "../../assets/icon/avatar1.png";
import PageHeader from "../../components/PageHeader";
import FrameIcon from "../../assets/icon/frame.svg";
import HeartIcon from "../../assets/icon/heart-result.svg";
import UsersIcon from "../../assets/icon/users.svg";
import authService from "../../api/authService";
import type { FinalChoiceOptionsResponse } from "../../types/finalChoice";

const FinalResultPage: React.FC = () => {
  const [choiceOptions, setChoiceOptions] =
    useState<FinalChoiceOptionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    fetchFinalChoiceOptions();
  }, []);

  const fetchFinalChoiceOptions = async () => {
    try {
      setLoading(true);
      const data = await authService.getFinalChoiceOptions();
      setChoiceOptions(data);
    } catch (err) {
      setError("매칭 정보를 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalChoice = async (profileId: number) => {
    if (isChanging) return;

    const confirmed = window.confirm(
      "정말로 이 사람으로 환승하시겠습니까? 이 선택은 되돌릴 수 없습니다."
    );

    if (!confirmed) return;

    try {
      setIsChanging(true);
      const result = await authService.makeFinalChoice(profileId);
      alert(
        result.isChanged
          ? `환승이 완료되었습니다! ${result.partnerNickname}님과 매칭되었습니다.`
          : `현재 매칭을 유지합니다. ${result.partnerNickname}님과 계속 함께합니다.`
      );
      // 선택 완료 후 페이지 새로고침
      await fetchFinalChoiceOptions();
    } catch (err) {
      alert("환승 처리 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setIsChanging(false);
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

        {chatPartners && chatPartners.length > 0 && (
          <S.TransferSection>
            <S.TransferTitle>환승할 수 있는 다른 후보들</S.TransferTitle>
            <S.TransferSubtitle>
              채팅했던 다른 사람으로 환승할 수 있어요
            </S.TransferSubtitle>

            <S.PartnersList>
              {chatPartners.map((partner) => (
                <S.PartnerCard key={partner.profileId}>
                  <S.PartnerAvatar src={Avatar} alt={partner.nickname} />
                  <S.PartnerInfo>
                    <S.PartnerName>{partner.nickname}</S.PartnerName>
                    <S.PartnerMbti>{partner.mbti}</S.PartnerMbti>
                    <S.PartnerMessageCount>
                      {partner.totalMessageCount}개의 메시지
                    </S.PartnerMessageCount>
                  </S.PartnerInfo>
                  <S.TransferButton
                    onClick={() => handleFinalChoice(partner.profileId)}
                    disabled={isChanging}
                  >
                    {isChanging ? "처리 중..." : "환승하기"}
                  </S.TransferButton>
                </S.PartnerCard>
              ))}
            </S.PartnersList>
          </S.TransferSection>
        )}

        {chatPartners && chatPartners.length === 0 && (
          <S.NoPartnersMessage>
            환승 가능한 다른 후보가 없습니다.
          </S.NoPartnersMessage>
        )}
      </S.ScrollableContent>
    </S.FinalResultContainer>
  );
};

export default FinalResultPage;
