import React from "react";
import * as S from "./style";
import Logo from "../../assets/logo.svg";
import GoogleIcon from "../../assets/icon/google-logo.png";
import { useNavigate } from "react-router-dom";
import authService from "../../api/authService";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
  const googleAuthUrl = `${API_BASE_URL}/oauth2/authorize/google`;

  const handleGoogleLogin = () => {
    // 방법 1: 직접 리다이렉트 (현재 방식)
    authService.loginWithGoogle();

    // 방법 2: 만약 위 방식이 안되면 아래 방식 시도
    // window.location.href = googleAuthUrl;
  };

  return (
    <S.LoginContainer>
      <S.LogoText>환승으로 연애하다</S.LogoText>

      <S.MainImage>
        <img src={Logo} alt="logo" />
      </S.MainImage>

      {/* 방법 3: <a> 태그로 직접 이동 (가장 확실한 방법) */}
      <a href={googleAuthUrl} style={{ textDecoration: "none", width: "100%" }}>
        <S.GoogleLoginFrame style={{ cursor: "pointer" }}>
          <S.GoogleIcon src={GoogleIcon} alt="google" />
          <S.GoogleText>Google로 로그인</S.GoogleText>
        </S.GoogleLoginFrame>
      </a>

      {/* 기존 방식 (주석 처리) */}
      {/* <S.GoogleLoginFrame
        onClick={handleGoogleLogin}
        style={{ cursor: "pointer" }}
      >
        <S.GoogleIcon src={GoogleIcon} alt="google" />
        <S.GoogleText>Google로 로그인</S.GoogleText>
      </S.GoogleLoginFrame> */}

      <S.InfoText>학교 계정으로 로그인하셔야 참여가 가능합니다.</S.InfoText>
      <S.Underline />
      <S.AdminText onClick={() => navigate("/admin/messages")}>
        어드민 페이지
      </S.AdminText>
    </S.LoginContainer>
  );
};

export default LoginPage;
