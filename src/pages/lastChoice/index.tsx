import React, { useEffect, useState } from "react";
import * as S from "./style";
import Avatar1 from "../../assets/icon/avatar1.png";
import PageHeader from "../../components/PageHeader";
import MessageCircleIcon from "../../assets/icon/white-message-circle.svg";
import HeartIcon from "../../assets/icon/heart.svg";
import CheckCircleIcon from "../../assets/icon/check-circle.svg";
import ZapIcon from "../../assets/icon/zap.svg";
import RepeatIcon from "../../assets/icon/repeat.svg";
import AlertTriangleIcon from "../../assets/icon/alert-triangle.svg";
import { getFinalChoiceOptions, makeFinalChoice } from "../../api/chatService";
import type { FinalChoiceOptionsResponse } from "../../types/finalChoice";

const FinalChoicePage: React.FC = () => {
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
      const data = await getFinalChoiceOptions();
      setChoiceOptions(data);
    } catch (err) {
      setError("매칭 정보를 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueWithCurrent = async () => {
    if (!choiceOptions?.currentMatch || isChanging) return;

    const confirmed = window.confirm("현재 매칭 상대와 계속하시겠습니까?");

    if (!confirmed) return;

    try {
      setIsChanging(true);
      const result = await makeFinalChoice(
        choiceOptions.currentMatch.profileId
      );
      alert(`${result.partnerNickname}님과 계속 함께합니다!`);
      window.location.href = "/final-result";
    } catch (err) {
      alert("처리 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setIsChanging(false);
    }
  };

  const handleTransfer = async (profileId: number, nickname: string) => {
    if (isChanging) return;

    const confirmed = window.confirm(
      `정말로 ${nickname}님으로 환승하시겠습니까? 이 선택은 되돌릴 수 없습니다.`
    );

    if (!confirmed) return;

    try {
      setIsChanging(true);
      const result = await makeFinalChoice(profileId);
      alert(
        `환승이 완료되었습니다! ${result.partnerNickname}님과 매칭되었습니다.`
      );
      window.location.href = "/final-result";
    } catch (err) {
      alert("환승 처리 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setIsChanging(false);
    }
  };

  if (loading) {
    return (
      <S.FinalChoiceContainer>
        <PageHeader
          title="마지막 선택"
          subtitle="로딩 중..."
          backgroundColor="#fab0b8"
        />
        <S.LoadingMessage>로딩 중...</S.LoadingMessage>
      </S.FinalChoiceContainer>
    );
  }

  if (error || !choiceOptions) {
    return (
      <S.FinalChoiceContainer>
        <PageHeader
          title="마지막 선택"
          subtitle="오류 발생"
          backgroundColor="#fab0b8"
        />
        <S.ErrorMessage>
          {error || "데이터를 불러올 수 없습니다."}
        </S.ErrorMessage>
      </S.FinalChoiceContainer>
    );
  }

  const { currentMatch, chatPartners } = choiceOptions;

  return (
    <S.FinalChoiceContainer>
      <PageHeader
        title="마지막 선택"
        subtitle="신중하게 결정해주세요"
        backgroundColor="#fab0b8"
      />

      <S.ScrollableContent>
        {/* 현재 매칭 상대 섹션 */}
        {currentMatch && (
          <S.ContentSection>
            <S.SectionTitle>현재 매칭된 커플</S.SectionTitle>
            <S.MatchCard variant="current">
              <S.MatchAvatar src={Avatar1} alt="현재 매칭 상대" />
              <S.MatchInfo>
                <S.MatchName>{currentMatch.nickname}</S.MatchName>
                <S.MatchStats>
                  <S.StatItem>
                    <S.StatIcon src={MessageCircleIcon} alt="메시지" />
                    <S.StatText>{currentMatch.totalMessageCount}개</S.StatText>
                  </S.StatItem>
                  <S.StatItem>
                    <S.StatIcon src={HeartIcon} alt="MBTI" />
                    <S.StatText>{currentMatch.mbti}</S.StatText>
                  </S.StatItem>
                </S.MatchStats>
              </S.MatchInfo>
            </S.MatchCard>
            <S.ActionButton
              variant="current"
              onClick={handleContinueWithCurrent}
              disabled={isChanging}
            >
              <S.ButtonIcon src={CheckCircleIcon} alt="체크" />
              <S.ButtonText>
                {isChanging ? "처리 중..." : "이 사람과 계속하기"}
              </S.ButtonText>
            </S.ActionButton>
          </S.ContentSection>
        )}

        {/* 환승 후보 섹션 */}
        {chatPartners && chatPartners.length > 0 && (
          <S.ContentSection>
            <S.SectionTitle>환승 후보</S.SectionTitle>
            <S.TransferList>
              {chatPartners.map((partner) => (
                <S.TransferCard key={partner.profileId}>
                  <S.MatchCard variant="transfer">
                    <S.MatchAvatar src={Avatar1} alt={partner.nickname} />
                    <S.MatchInfo>
                      <S.MatchName>{partner.nickname}</S.MatchName>
                      <S.MatchStats>
                        <S.StatItem>
                          <S.StatIcon src={MessageCircleIcon} alt="메시지" />
                          <S.StatText>{partner.totalMessageCount}개</S.StatText>
                        </S.StatItem>
                        <S.StatItem>
                          <S.StatIcon src={ZapIcon} alt="MBTI" />
                          <S.StatText>{partner.mbti}</S.StatText>
                        </S.StatItem>
                      </S.MatchStats>
                    </S.MatchInfo>
                  </S.MatchCard>
                  <S.ActionButton
                    variant="transfer"
                    onClick={() =>
                      handleTransfer(partner.profileId, partner.nickname)
                    }
                    disabled={isChanging}
                  >
                    <S.ButtonIcon src={RepeatIcon} alt="환승" />
                    <S.ButtonText>
                      {isChanging ? "처리 중..." : "환승하기"}
                    </S.ButtonText>
                  </S.ActionButton>
                </S.TransferCard>
              ))}
            </S.TransferList>
          </S.ContentSection>
        )}

        {chatPartners && chatPartners.length === 0 && (
          <S.NoPartnersMessage>
            환승 가능한 다른 후보가 없습니다.
          </S.NoPartnersMessage>
        )}

        {/* 경고 메시지 */}
        <S.WarningBox>
          <S.WarningIcon src={AlertTriangleIcon} alt="경고" />
          <S.WarningText>
            선택은 되돌릴 수 없어요. 신중하게 결정해주세요!
          </S.WarningText>
        </S.WarningBox>
      </S.ScrollableContent>
    </S.FinalChoiceContainer>
  );
};

export default FinalChoicePage;
