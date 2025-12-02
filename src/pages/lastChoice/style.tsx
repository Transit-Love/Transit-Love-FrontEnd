import styled from "@emotion/styled";

export const FinalChoiceContainer = styled.div`
  width: 390px;
  min-height: 100vh;
  background: #f9fafb;
  position: relative;
  overflow-y: auto;
  margin: 0 auto;
  padding-bottom: 40px;

  @media (min-width: 391px) {
    background: #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
`;

export const Header = styled.div`
  display: flex;
  width: 390px;
  height: 122px;
  padding: 24px 24px 8px 24px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  background: var(--primary, #fab0b8);
  position: absolute;
  top: 0;
  left: 0;
`;

export const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: 100%;
  position: relative;
`;

export const BackButton = styled.img`
  width: 7px;
  height: 14px;
  position: absolute;
  left: 0;
  cursor: pointer;
`;

export const HeaderTitle = styled.p`
  color: #fff;
  font-family: "Ownglyph PDH";
  font-size: 24px;
  font-weight: 400;
  line-height: 21.6px;
  margin: 0;
`;

export const TimerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const TimerText = styled.p`
  color: #fff;
  font-family: "Ownglyph PDH";
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

export const TimeLeft = styled.p`
  color: #fff;
  font-family: "Ownglyph PDH";
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 342px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const SectionTitle = styled.p`
  color: #000;
  font-family: "Ownglyph PDH";
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  margin: 0;
  width: 100%;
`;

export const MatchCard = styled.div<{ variant?: "current" | "transfer" }>`
  display: flex;
  gap: 16px;
  height: 96px;
  padding: 12px 24px;
  align-items: center;
  border-radius: 20px;
  background: ${({ variant }) =>
    variant === "current"
      ? "var(--primary, #fab0b8)"
      : "var(--secondary, #ffc6b6)"};
  width: 100%;
`;

export const MatchAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  object-fit: cover;
`;

export const MatchInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  justify-content: center;
`;

export const MatchName = styled.p`
  color: #fff;
  font-family: "Ownglyph PDH";
  font-size: 18px;
  font-weight: 400;
  line-height: 21.6px;
  margin: 0;
`;

export const MatchStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const StatIcon = styled.img`
  width: 13px;
  height: 13px;
`;

export const StatText = styled.p`
  color: #fff;
  font-family: "Ownglyph PDH";
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  margin: 0;
`;

export const ActionButton = styled.div<{ variant?: "current" | "transfer" }>`
  display: flex;
  gap: 12px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: ${({ variant }) =>
    variant === "current"
      ? "var(--primary, #fab0b8)"
      : "var(--secondary, #ffc6b6)"};
  width: 100%;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

export const ButtonIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const ButtonText = styled.p`
  color: #fff;
  font-family: "Ownglyph PDH";
  font-size: 18px;
  font-weight: 400;
  line-height: 21.6px;
  margin: 0;
`;

export const WarningBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  width: 342px;
  padding: 16px;
  border-radius: 12px;
  background: var(--thirdary, #dfd1ea);
  position: absolute;
  bottom: 105px;
  left: 50%;
  transform: translateX(-50%);
`;

export const WarningIcon = styled.img`
  width: 17px;
  height: 15px;
`;

export const WarningText = styled.p`
  color: #fff;
  font-family: "Ownglyph PDH";
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  margin: 0;
  width: 100%;
`;
