import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../../../api/authService';

const OAuth2Redirect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const error = urlParams.get('error');

    if (token) {
      // 토큰 저장
      authService.setToken(token);

      // 프로필 설정 페이지로 이동 (또는 메인 페이지로 변경 가능)
      navigate('/profile/setting');
    } else if (error) {
      // 에러 처리
      console.error('OAuth2 로그인 실패:', error);
      alert('로그인에 실패했습니다: ' + error);
      navigate('/login');
    } else {
      // 토큰도 에러도 없는 경우
      navigate('/login');
    }
  }, [location, navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '18px',
      color: '#666'
    }}>
      <p>로그인 처리 중...</p>
    </div>
  );
};

export default OAuth2Redirect;
