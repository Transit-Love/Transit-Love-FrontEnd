import React, { useState, useEffect } from 'react';
import * as S from './style';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';

const CountdownPage: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 35,
    seconds: 42
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // 시간이 다 되면 매칭 페이지로 이동
          clearInterval(timer);
          navigate('/matching');
          return prevTime;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <S.CountdownContainer>
      <S.BackgroundImage />

      <S.ContentWrapper>
        <S.Title>곧 매칭이 시작됩니다!</S.Title>
        
        <S.TimerDisplay>
          <S.TimeBox>
            <S.TimeNumber>{formatTime(timeLeft.hours)}</S.TimeNumber>
            <S.TimeLabel>시간</S.TimeLabel>
          </S.TimeBox>
          <S.TimeSeparator>:</S.TimeSeparator>
          <S.TimeBox>
            <S.TimeNumber>{formatTime(timeLeft.minutes)}</S.TimeNumber>
            <S.TimeLabel>분</S.TimeLabel>
          </S.TimeBox>
          <S.TimeSeparator>:</S.TimeSeparator>
          <S.TimeBox>
            <S.TimeNumber>{formatTime(timeLeft.seconds)}</S.TimeNumber>
            <S.TimeLabel>초</S.TimeLabel>
          </S.TimeBox>
        </S.TimerDisplay>

        <S.InfoCard>
          <S.SparklesIcon>✨</S.SparklesIcon>
          <S.InfoTextWrapper>
            <S.InfoTitle>매칭 준비 중...</S.InfoTitle>
            <S.InfoDescription>곧 운명의 상대를 만날 수 있어요</S.InfoDescription>
          </S.InfoTextWrapper>
        </S.InfoCard>

        <S.InfoSection>
          <S.ParticipantsInfo>
            <S.ParticipantsTitle>현재 참여자</S.ParticipantsTitle>
            <S.ParticipantsCount>
              <S.UsersIcon>👥</S.UsersIcon>
              <S.ParticipantsNumber>24명</S.ParticipantsNumber>
              <S.ParticipantsStatus>참여 중</S.ParticipantsStatus>
            </S.ParticipantsCount>
          </S.ParticipantsInfo>
        </S.InfoSection>
      </S.ContentWrapper>

      <NavBar />
    </S.CountdownContainer>
  );
};

export default CountdownPage;
