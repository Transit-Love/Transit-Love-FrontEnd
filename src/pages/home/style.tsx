import styled from "@emotion/styled";

export const HomeWrapper = styled.div`
  width: 100%;
  max-width: 390px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 30px;

  @media (min-width: 391px) {
    background: #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
`;

export const HomeContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  position: relative;
  padding-bottom: 80px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const BackgroundImage = styled.div`
  position: absolute;
  left: -17px;
  top: -2px;
  width: 423.93px;
  height: 909.16px;
  background-image: url("/background.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;

  @media (min-width: 391px) {
    display: none;
  }
`;

export const HeaderSection = styled.div`
  position: relative;
  z-index: 100;
  padding: 80px 24px 50px;
  text-align: center;
`;

export const Logo = styled.h1`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-size: 40px;
  font-weight: 400;
  color: #fab0b8;
  margin: 0 0 12px 0;
  text-shadow: 0 2px 8px rgba(250, 176, 184, 0.4);
  letter-spacing: -0.5px;
`;

export const Subtitle = styled.p`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #999;
  margin: 0 0 12px 0;
`;

export const WelcomeText = styled.p`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-size: 22px;
  font-weight: 400;
  color: #333;
  margin: 0;
`;

export const MainCardSection = styled.div`
  position: relative;
  z-index: 100;
  padding: 0 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

export const MainCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 250, 251, 0.98) 100%);
  border-radius: 32px;
  padding: 48px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(250, 176, 184, 0.2);
  border: 2px solid rgba(250, 176, 184, 0.3);
  width: 100%;
  max-width: 340px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(250, 176, 184, 0.1) 0%, rgba(250, 176, 184, 0) 50%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 16px 48px rgba(250, 176, 184, 0.35);
    border-color: rgba(250, 176, 184, 0.5);

    &::before {
      opacity: 1;
    }

    span:last-child {
      transform: translateX(4px);
    }
  }

  &:active {
    transform: translateY(-4px) scale(1.01);
  }
`;

export const MainCardIcon = styled.div`
  font-size: 80px;
  line-height: 1;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

export const MainCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

export const MainCardTitle = styled.h2`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-size: 28px;
  font-weight: 500;
  color: #333;
  margin: 0;
  letter-spacing: -0.5px;
`;

export const MainCardDescription = styled.p`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #666;
  margin: 0;
  text-align: center;
  line-height: 1.6;
`;

export const StartButton = styled.div`
  margin-top: 8px;
  padding: 16px 36px;
  background: linear-gradient(135deg, #fab0b8 0%, #f89ca4 100%);
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(250, 176, 184, 0.4);
`;

export const ButtonText = styled.span`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
`;

export const ButtonArrow = styled.span`
  font-size: 20px;
  color: #ffffff;
  transition: transform 0.3s ease;
`;
