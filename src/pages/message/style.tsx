import styled from "@emotion/styled";

export const MessageContainer = styled.div`
  width: 100%;
  max-width: 390px;
  height: 100vh;
  margin: 0 auto;
  overflow-y: auto;
  position: relative;
  padding-bottom: 100px;

  @media (min-width: 391px) {
    background: #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }

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
  left: 0px;
  top: 0px;
  width: 390px;
  height: 122px;
  background: #fab0b8;
  z-index: 200;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 24px 24px 8px;
`;

export const NavBar = styled.div`
  display: flex;
  align-items: center;
  gap: 104px;
  width: 100%;
  height: 28px;
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

export const TimerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const TimerText = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.085em;
  color: #ffffff;
`;

export const TimeLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ClockIcon = styled.div`
  width: 16px;
  height: 16px;

  &::before {
    content: "";
    display: block;
    width: 13.33px;
    height: 13.33px;
    border: 1.33px solid #ffe5b4;
    border-radius: 50%;
    margin: 1.33px;
  }

  &::after {
    content: "";
    position: absolute;
    width: 2.67px;
    height: 5.33px;
    background: #ffe5b4;
    margin: 8px 0 0 8px;
  }
`;

export const TimeLeftText = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.085em;
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

export const InfoCard = styled.div`
  position: absolute;
  left: 24px;
  top: 146px;
  width: 342px;
  background: #dfd1ea;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: 100;
`;

export const InfoIcon = styled.div`
  width: 24px;
  height: 24px;

  &::before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    margin: 2px;
  }

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 4px;
    border-left: 2px solid #ffffff;
    margin: 12px 0 0 12px;
  }
`;

export const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const InfoTitle = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 0.96em;
  color: #000000;
`;

export const InfoDescription = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 1.12em;
  color: #000000;
`;

export const ReceivedSection = styled.div`
  position: absolute;
  left: 24px;
  top: 287px;
  width: 342px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 100;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const SectionTitle = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 1.2em;
  color: #000000;
`;

export const CountBadge = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  background: #fab0b8;
  border-radius: 16px;
`;

export const CountText = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.085em;
  color: #ffffff;
`;

export const MessagesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const MessageCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: #f8fafc;
  border: 1px solid #fab0b8;
  border-radius: 16px;
`;

export const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const SenderName = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.2em;
  color: #6b7280;
`;

export const MessageTime = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.2em;
  color: #6b7280;
`;

export const MessageContent = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2em;
  color: #000000;
`;

export const SendSection = styled.div`
  position: absolute;
  left: 24px;
  top: 544px;
  width: 342px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 100;
`;

export const SendTitle = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 1.2em;
  color: #000000;
`;

export const PersonSelectCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 342px;
  padding: 4px 20px;
  background: #f8fafc;
  border: 1px solid #fab0b8;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }
`;

export const PersonSelectContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PersonSelectHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PersonSelectLabel = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.4em;
  color: #6b7280;
`;

export const PersonSelectMessage = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.37em;
  color: #000000;
`;

export const ChevronIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;

  &::before {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    border-right: 2px solid #fab0b8;
    border-bottom: 2px solid #fab0b8;
    transform: rotate(45deg);
    margin-top: -4px;
  }
`;

export const MessageInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: #f8fafc;
  border: 1px solid #fab0b8;
  border-radius: 16px;
  height: 86px;
`;

export const MessagePlaceholder = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.2em;
  color: #6b7280;
`;

export const MessageTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2em;
  color: #000000;
  outline: none;
  resize: none;

  &::placeholder {
    color: #6b7280;
  }
`;

export const CharacterCount = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

export const CharacterCountText = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.2em;
  color: #9ca3af;
`;

export const SendButton = styled.button`
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  width: 342px;
  height: 48px;
  background: #fab0b8;
  border-radius: 20px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  z-index: 999;
  transition: all 0.2s ease;

  &:hover {
    background: #f8a8b0;
  }
`;

export const SendIcon = styled.div`
  width: 16px;
  height: 16px;

  &::before {
    content: "";
    display: block;
    width: 7.29px;
    height: 7.29px;
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    transform: rotate(-45deg);
    margin: 7.28px 0 0 1.43px;
  }
`;

export const SendButtonText = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.2em;
  color: #ffffff;
`;

export const EmptyMessage = styled.div`
  padding: 40px 20px;
  text-align: center;
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #9ca3af;
`;

export const PersonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: #ffffff;
  border: 1px solid #fab0b8;
  border-radius: 12px;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 4px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #fab0b8;
    border-radius: 3px;
  }
`;

export const PersonItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    transform: translateX(4px);
  }
`;

export const PersonName = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #000000;
`;

export const PersonMBTI = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #6b7280;
`;
