import React, { useState, useEffect } from "react";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import profileService from "../../api/profileService";
import Loading from "../../components/Loading";

const CountdownPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 3,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
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
          // 시간이 다 되면 매칭된 상대 페이지로 직접 이동
          clearInterval(timer);
          setIsLoading(true);
          
          // 매칭된 상대 조회 후 이동
          profileService.getMatchedProfile()
            .then((matched) => {
              if (matched && Array.isArray(matched) && matched.length > 0) {
                navigate(`/profile/${matched[0].id}`, {
                  state: { profile: matched[0] }
                });
              } else {
                // 매칭된 상대가 없으면 프로필로
                navigate("/profile");
              }
            })
            .catch((error) => {
              console.error("매칭 상대 조회 실패:", error);
              navigate("/profile");
            })
            .finally(() => {
              setIsLoading(false);
            });
          
          return prevTime;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  if (isLoading) {
    return (
      <S.CountdownContainer>
        <S.BackgroundImage />
        <Loading message="매칭 상대를 불러오는 중..." />
      </S.CountdownContainer>
    );
  }

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
            <S.InfoDescription>
              곧 운명의 상대를 만날 수 있어요
            </S.InfoDescription>
          </S.InfoTextWrapper>
        </S.InfoCard>
      </S.ContentWrapper>
    </S.CountdownContainer>
  );
};

export default CountdownPage;
