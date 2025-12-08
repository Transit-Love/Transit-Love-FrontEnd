import styled from "@emotion/styled";

export const ProfileWrapper = styled.div`
  width: 100%;
  max-width: 390px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;

  @media (min-width: 391px) {
    background: #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
`;

export const ProfileContainer = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  margin-top: -60px;
  margin-bottom: 80px;

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

export const Header = styled.div`
  position: absolute;
  width: 390px;
  height: 5.5rem;
  background: #fab0b8;
  z-index: 200;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 24px 24px 20px;
`;

export const NavBar = styled.div`
  display: flex;
  align-items: center;
  gap: 104px;
  width: 100%;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderTitle = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 0.9em;
  color: #ffffff;
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

export const AvatarSection = styled.div`
  position: absolute;
  left: 24px;
  top: 159px;
  width: 342px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  z-index: 100;
`;

export const AvatarContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const ProfileName = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.2em;
  color: #000000;
`;

export const KeywordsSection = styled.div`
  position: absolute;
  left: 24px;
  top: 361px;
  width: 342px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 100;
`;

export const MatchSection = styled.div`
  position: absolute;
  left: 24px;
  top: 450px;
  width: 342px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 100;
`;

export const MatchedCard = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #fff5f7 0%, #ffe8ec 100%);
  border: 2px solid #fab0b8;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(250, 176, 184, 0.3);
  }
`;

export const MatchedInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MatchedName = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 1.2em;
  color: #000000;
`;

export const MatchedMBTI = styled.div`
  padding: 4px 12px;
  background: #fab0b8;
  border-radius: 12px;
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
`;

export const MatchedKeywords = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const MatchedKeywordTag = styled.div`
  padding: 6px 12px;
  background: #ffffff;
  border: 1px solid #fab0b8;
  border-radius: 12px;
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 13px;
  color: #fab0b8;
`;

export const MatchInfo = styled.div`
  padding: 24px;
  background: #f8fafc;
  border: 1px dashed #fab0b8;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
`;

export const MatchStatusText = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.4em;
  color: #6b7280;
`;

export const MatchStatusSubText = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4em;
  color: #9ca3af;
`;

export const SectionTitle = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.2em;
  color: #000000;
`;

export const KeywordsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
`;

export const KeywordTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background: #fab0b8;
  border-radius: 20px;
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.2em;
  color: #ffffff;
`;

export const BalanceResults = styled.div`
  position: absolute;
  left: 25px;
  top: 630px;
  width: 342px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 100;
`;

export const BalanceItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const BalanceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8fafc;
  border: 1px solid #fab0b8;
  border-radius: 12px;
`;

export const BalanceIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const BalanceText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const BalanceCategory = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.2em;
  color: #6b7280;
`;

export const BalanceResult = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2em;
  color: #000000;
`;

export const ActionSection = styled.div`
  position: absolute;
  left: 0;
  top: 702px;
  width: 390px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 0 24px 25px;
  z-index: 100;
`;

export const ChatButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  height: 48px;
  background: #fab0b8;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8a8b0;
  }
`;

export const MessageIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const ChatButtonText = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.2em;
  color: #ffffff;
`;
