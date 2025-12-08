import React from "react";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <S.HomeWrapper>
      <S.HomeContainer>
        <S.BackgroundImage />
        
        <S.HeaderSection>
          <S.Logo>환승으로 연애하다</S.Logo>
          <S.Subtitle>새로운 인연과 특별한 만남</S.Subtitle>
          <S.WelcomeText>지금 바로 시작해보세요 ✨</S.WelcomeText>
        </S.HeaderSection>

        <S.MainCardSection>
          <S.MainCard onClick={() => navigate("/chat-list")}>
            <S.MainCardIcon>💬</S.MainCardIcon>
            <S.MainCardContent>
              <S.MainCardTitle>채팅 시작하기</S.MainCardTitle>
              <S.MainCardDescription>
                마음에 드는 상대와 대화를 시작해보세요
              </S.MainCardDescription>
              <S.StartButton>
                <S.ButtonText>지금 시작하기</S.ButtonText>
                <S.ButtonArrow>→</S.ButtonArrow>
              </S.StartButton>
            </S.MainCardContent>
          </S.MainCard>
        </S.MainCardSection>
      </S.HomeContainer>
      <NavBar />
    </S.HomeWrapper>
  );
};

export default HomePage;
