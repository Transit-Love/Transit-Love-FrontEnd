import styled from "@emotion/styled";

// 프로필 페이지의 스타일을 재사용
export {
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
