import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

export const HomeWrapper = styled.div`
  width: 100%;
  max-width: 390px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (min-width: 391px) {
    background: #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
`;

export const HomeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
  overflow-y: auto;
  margin-bottom: 67px;

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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;
  z-index: 2;
`;

export const Logo = styled.h1`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 32px;
  line-height: 1.2em;
  color: #fab0b8;
  text-align: center;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.4em;
  color: #6b7280;
  text-align: center;
  margin: 0;
`;

export const WelcomeText = styled.p`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4em;
  color: #9ca3af;
  text-align: center;
  margin: 0;
`;

export const MainCardSection = styled.div`
  width: 100%;
  max-width: 342px;
  z-index: 2;
`;

export const MainCard = styled.div`
  padding: 32px 24px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(255, 250, 251, 0.95) 100%
  );
  border: 2px solid #fab0b8;
  border-radius: 32px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  box-shadow: 0 4px 12px rgba(250, 176, 184, 0.15);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(250, 176, 184, 0.25);
    border-color: #f89ca4;
  }

  &:hover div:last-child {
    background: linear-gradient(135deg, #f89ca4 0%, #f68a96 100%);
  }

  &:hover span:last-child {
    transform: translateX(4px);
  }
`;

export const MainCardIcon = styled.div`
  font-size: 80px;
  animation: ${float} 3s ease-in-out infinite;
`;

export const MainCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

export const MainCardTitle = styled.h2`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.2em;
  color: #000000;
  margin: 0;
  text-align: center;
`;

export const MainCardDescription = styled.p`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4em;
  color: #6b7280;
  margin: 0;
  text-align: center;
`;

export const StartButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(135deg, #fab0b8 0%, #f89ca4 100%);
  border-radius: 20px;
  margin-top: 8px;
  transition: all 0.3s ease;
`;

export const ButtonText = styled.span`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.2em;
  color: #ffffff;
`;

export const ButtonArrow = styled.span`
  font-size: 18px;
  color: #ffffff;
  transition: transform 0.3s ease;
`;
