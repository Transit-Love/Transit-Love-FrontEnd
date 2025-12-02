import React from "react";
import * as S from "./style";
import Avatar1 from "../../assets/icon/avatar1.png";
import Avatar2 from "../../assets/icon/avatar2.png";
import PageHeader from "../../components/PageHeader";
import MessageCircleIcon from "../../assets/icon/white-message-circle.svg";
import HeartIcon from "../../assets/icon/heart.svg";
import CheckCircleIcon from "../../assets/icon/check-circle.svg";
import ZapIcon from "../../assets/icon/zap.svg";
import RepeatIcon from "../../assets/icon/repeat.svg";
import AlertTriangleIcon from "../../assets/icon/alert-triangle.svg";

const FinalChoicePage: React.FC = () => {
  const handleContinueWithCurrent = () => {
    console.log("현재 매칭 상대와 계속하기");
  };

  const handleTransfer = () => {
    console.log("환승하기");
  };

  return (
    <S.FinalChoiceContainer>
      <PageHeader 
        title="마지막 선택" 
        subtitle="23:59에 종료 • 1시간 1분 남음"
        backgroundColor="#fab0b8"
      />

      {/* 현재 매칭 상대 섹션 */}
      <S.ContentSection style={{ top: "158px" }}>
        <S.SectionTitle>현재 매칭 상대</S.SectionTitle>
        <S.MatchCard variant="current">
          <S.MatchAvatar src={Avatar1} alt="현재 매칭 상대" />
          <S.MatchInfo>
            <S.MatchName>너도 아라를 아라?</S.MatchName>
            <S.MatchStats>
              <S.StatItem>
                <S.StatIcon src={MessageCircleIcon} alt="메시지" />
                <S.StatText>48개</S.StatText>
              </S.StatItem>
              <S.StatItem>
                <S.StatIcon src={HeartIcon} alt="하트" />
                <S.StatText>좋은 대화</S.StatText>
              </S.StatItem>
            </S.MatchStats>
          </S.MatchInfo>
        </S.MatchCard>
        <S.ActionButton variant="current" onClick={handleContinueWithCurrent}>
          <S.ButtonIcon src={CheckCircleIcon} alt="체크" />
          <S.ButtonText>이 사람과 계속하기</S.ButtonText>
        </S.ActionButton>
      </S.ContentSection>

      {/* 환승 후보 섹션 */}
      <S.ContentSection style={{ top: "390px" }}>
        <S.SectionTitle>환승 후보</S.SectionTitle>
        <S.MatchCard variant="transfer">
          <S.MatchAvatar src={Avatar2} alt="환승 후보" />
          <S.MatchInfo>
            <S.MatchName>너의 로맨스에 내 이름을 써줘</S.MatchName>
            <S.MatchStats>
              <S.StatItem>
                <S.StatIcon src={MessageCircleIcon} alt="메시지" />
                <S.StatText>12개</S.StatText>
              </S.StatItem>
              <S.StatItem>
                <S.StatIcon src={ZapIcon} alt="번개" />
                <S.StatText>새로운 인연</S.StatText>
              </S.StatItem>
            </S.MatchStats>
          </S.MatchInfo>
        </S.MatchCard>
        <S.ActionButton variant="transfer" onClick={handleTransfer}>
          <S.ButtonIcon src={RepeatIcon} alt="환승" />
          <S.ButtonText>환승하기</S.ButtonText>
        </S.ActionButton>
      </S.ContentSection>

      {/* 경고 메시지 */}
      <S.WarningBox>
        <S.WarningIcon src={AlertTriangleIcon} alt="경고" />
        <S.WarningText>
          선택은 되돌릴 수 없어요. 신중하게 결정해주세요!
        </S.WarningText>
      </S.WarningBox>
    </S.FinalChoiceContainer>
  );
};

export default FinalChoicePage;
