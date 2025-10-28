import styled from "@emotion/styled";

export const ProfileContainer = styled.div`
  width: 100%;
  max-width: 390px;
  height: 100vh;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  padding-bottom: 10px;

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
  left: -28.74px;
  top: -2.05px;
  width: 447.21px;
  height: 959.07px;
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
  height: 72px;
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

export const ChevronLeft = styled.div`
  width: 28px;
  height: 28px;

  &::before {
    content: "";
    display: block;
    width: 7px;
    height: 14px;
    border-left: 2.33px solid #ffffff;
    border-bottom: 2.33px solid #ffffff;
    transform: rotate(45deg);
    margin: 7px 10.5px;
  }
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

export const NicknameSection = styled.div`
  width: 390px;
  padding: 5px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 100;
  margin-top: 99px;
`;

export const MBTISection = styled.div`
  width: 390px;
  padding: 5px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 100;
  margin-top: 40px;
`;

export const SectionTitle = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 0.9em;
  color: #000000;
  margin-bottom: 7px;
`;

export const InputField = styled.div`
  width: 342px;
  height: 44px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
`;

export const InputText = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2em;
  color: #6b7280;
  outline: none;

  &::placeholder {
    color: #6b7280;
  }
`;

export const InputDescription = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.2em;
  color: #6b7280;
  margin-top: 7px;
`;

export const BalanceGameSection = styled.div`
  width: 342px;
  margin: 40px auto;
  min-height: 317px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 100;
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
`;

export const SectionDescription = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.2em;
  color: #6b7280;
`;

export const QuestionCard = styled.div`
  width: 100%;
  height: 245px;
  background: #ffffff;
  border-radius: 20px;
  padding: 16px 24px 17px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const QuestionHeader = styled.div`
  display: flex;
  gap: 7rem;
  margin-left: 8rem;
  align-items: center;
  width: 100%;
`;

export const QuestionNumber = styled.div`
  width: 40px;
  height: 40px;
  background: #fab0b8;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2em;
  color: #ffffff;
`;

export const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ArrowIcon = styled.div`
  width: 7px;
  height: 14px;

  &::before {
    content: "";
    display: block;
    width: 7px;
    height: 14px;
    border-right: 2.33px solid #ffc6b6;
    border-bottom: 2.33px solid #ffc6b6;
    transform: rotate(-45deg);
  }
`;

export const QuestionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const QuestionText = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.2em;
  color: #000000;
`;

export const OptionButton = styled.button<{ selected: boolean }>`
  width: 100%;
  height: 60px;
  background: ${(props) => (props.selected ? "#FAB0B8" : "#F8FAFC")};
  border-radius: 16px;
  border: ${(props) => (props.selected ? "none" : "1px solid #E5E7EB")};
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.selected ? "#f8a8b0" : "#f1f5f9")};
  }
`;

export const OptionIcon = styled.div`
  width: 24px;
  height: 24px;
  font-size: 16px;
`;

export const OptionText = styled.div<{ selected: boolean }>`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2em;
  color: ${(props) => (props.selected ? "#FFFFFF" : "#6B7280")};
`;

export const KeywordsSection = styled.div`
  width: 342px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 40px auto 200px;
  z-index: 100;
`;

export const KeywordsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const KeywordButton = styled.button<{ selected: boolean }>`
  height: 27px;
  padding: 12px 20px;
  border-radius: 24px;
  border: none;
  cursor: pointer;
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.2em;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${(props) => (props.selected ? "#FAB0B8" : "#FFFFFF")};
  color: ${(props) => (props.selected ? "#FFFFFF" : "#FAB0B8")};
  border: 1px solid #fab0b8;

  &:hover {
    background: ${(props) => (props.selected ? "#f8a8b0" : "#fdf2f2")};
  }
`;

export const NextButton = styled.button`
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 370px;
  height: 40px;
  background: #fab0b8;
  border-radius: 20px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
`;

export const NextButtonText = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.2em;
  color: #ffffff;
`;

export const TestText = styled.div`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 24px;
  color: #ff0000;
  z-index: 10;
  background: #ffffff;
  padding: 10px;
  border-radius: 8px;
`;
