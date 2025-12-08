import styled from "@emotion/styled";

// 프로필 페이지의 스타일을 재사용
export {
  ProfileWrapper,
  ProfileContainer,
  BackgroundImage,
  AvatarContainer,
  Avatar,
  ProfileInfo,
  ProfileName,
  SectionTitle,
  KeywordsGrid,
  KeywordTag,
  BalanceItems,
} from "../style";

// 상대 프로필 페이지에서 absolute position 제거
export const AvatarSection = styled.div`
  position: relative;
  width: 342px;
  margin: 120px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  z-index: 100;
`;

export const KeywordsSection = styled.div`
  position: relative;
  width: 342px;
  margin: 24px auto 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 100;
`;

export const BalanceResults = styled.div`
  position: relative;
  width: 342px;
  margin: 24px auto 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 100;
  padding-bottom: 24px;
`;

export const ChatButton = styled.button`
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

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: translateX(-50%) scale(0.98);
  }
`;

export const ChatButtonText = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.2em;
  color: #ffffff;
`;
