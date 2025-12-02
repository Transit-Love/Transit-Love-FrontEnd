import styled from "@emotion/styled";

export const CountdownContainer = styled.div`
  width: 100%;
  max-width: 390px;
  height: 100vh;
  margin: 0 auto;
  overflow-y: auto;
  position: relative;
  padding-bottom: 60px;

  @media (min-width: 391px) {
    background: #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
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

export const StatusIcons = styled.div`
  position: absolute;
  right: 21px;
  top: 21px;
  width: 20px;
  height: 14px;
  background: rgba(60, 60, 67, 0.18);
  border-radius: 20px;
  z-index: 5;
`;

export const TimeDisplay = styled.div`
  position: absolute;
  right: 25px;
  top: 17px;
  width: 54px;
  height: 21px;
  background: rgba(60, 60, 67, 0.18);
  border-radius: 20px;
  z-index: 5;
`;

export const ContentWrapper = styled.div`
  position: absolute;
  left: 25px;
  top: 222px;
  width: 347px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 62px;
  z-index: 100;
`;

export const Title = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 40px;
  line-height: 0.54em;
  text-align: center;
  color: #ffc6b6;
`;

export const TimerDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 13px;
  width: 100%;
`;

export const TimeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 16px;
  background: #fab0b8;
  border: 2px solid rgba(255, 255, 255, 0.19);
  border-radius: 16px;
  min-width: 80px;
  width: 80px;
  height: 100px;
`;

export const TimeNumber = styled.div`
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 800;
  font-size: 36px;
  line-height: 1.2em;
  color: #ffffff;
  width: 48px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TimeLabel = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.2em;
  color: #ffffff;
`;

export const TimeSeparator = styled.div`
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 800;
  font-size: 36px;
  line-height: 1.2em;
  color: #fab0b8;
`;

export const InfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  width: 100%;
  background: rgba(250, 176, 184, 0.59);
  border-radius: 20px;
`;

export const SparklesIcon = styled.div`
  width: 28px;
  height: 28px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InfoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const InfoTitle = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.2em;
  color: #ffffff;
`;

export const InfoDescription = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2em;
  color: #ffffff;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

export const ParticipantsInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

export const ParticipantsTitle = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2em;
  text-align: center;
  color: #ffc6b6;
`;

export const ParticipantsCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const UsersIcon = styled.div`
  width: 20px;
  height: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ParticipantsNumber = styled.div`
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 800;
  font-size: 20px;
  line-height: 1.2em;
  color: #ffc6b6;
`;

export const ParticipantsStatus = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2em;
  color: #dfd1ea;
`;
