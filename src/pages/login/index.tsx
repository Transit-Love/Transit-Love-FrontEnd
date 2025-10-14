import React from 'react';
import * as S from './style';
import Logo from '../../assets/logo.svg';
import GoogleIcon from '../../assets/icon/google-logo.png'
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGoogleLogin = () => {
    console.log('Google 로그인');
    navigate('/profile');
  };

  return (
    <S.LoginContainer>
      <S.LogoText>환승으로 연애하다</S.LogoText>
      
      <S.MainImage>
        <img src={Logo} alt="logo" />
      </S.MainImage>
      
        <S.GoogleLoginFrame onClick={handleGoogleLogin} style={{ cursor: 'pointer' }}>
          <S.GoogleIcon src={GoogleIcon} alt="google" />
          <S.GoogleText>Google로 로그인</S.GoogleText>
        </S.GoogleLoginFrame>
      
      <S.InfoText>학교 계정으로 로그인하셔야 참여가 가능합니다.</S.InfoText>
      
      <S.Underline />
    </S.LoginContainer>
  );
};

export default LoginPage;
