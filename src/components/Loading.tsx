import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import Logo from "../assets/logo.svg";

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "로딩 중..." }) => {
  return (
    <LoadingContainer>
      <LogoWrapper>
        <GlowCircle />
        <LogoImage src={Logo} alt="로고" />
      </LogoWrapper>
      <LoadingText>{message}</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;

// 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-15px) scale(1.05);
  }
`;

const glow = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.1;
  }
`;

// 스타일 컴포넌트
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  animation: ${fadeIn} 0.6s ease-out;
`;

const LogoWrapper = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImage = styled.img`
  width: 90px;
  height: 90px;
  z-index: 2;
  animation: ${float} 3s ease-in-out infinite;
  filter: drop-shadow(0 8px 16px rgba(250, 176, 184, 0.4));
`;

const GlowCircle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(250, 176, 184, 0.3) 0%, rgba(250, 176, 184, 0) 70%);
  animation: ${glow} 3s ease-in-out infinite;
`;

const LoadingText = styled.p`
  font-family: "Ownglyph PDH", -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #fab0b8;
  margin-top: 24px;
  animation: ${fadeIn} 0.8s ease-out 0.3s both;
`;
