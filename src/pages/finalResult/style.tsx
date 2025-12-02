import styled from "@emotion/styled";

export const FinalResultContainer = styled.div`
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
  padding: 24px 24px 20px 24px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  background: var(--secondary, #ffc6b6);
  position: absolute;
  top: 0;
  left: 0;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
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

export const HeaderSubtitle = styled.p`
  color: #fff;
  font-family: "Ownglyph PDH";
  font-size: 16px;
  font-weight: 400;
  line-height: 21.6px;
  margin: 0;
`;

export const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 342px;
  padding: 20px;
  border-radius: 16px;
  background: #dfd1ea;
  position: absolute;
  top: 162px;
  left: 50%;
  transform: translateX(-50%);
`;

export const InfoIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  color: #fff;
  font-family: "Ownglyph PDH";
  font-style: normal;
`;

export const InfoMainText = styled.p`
  font-size: 32px;
  font-weight: 400;
  line-height: 19.2px;
  margin: 0;
`;

export const InfoSubText = styled.p`
  font-size: 15px;
  font-weight: 400;
  line-height: 16.8px;
  margin: 0;
`;

export const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 342px;
  position: absolute;
  top: 316px;
  left: 50%;
  transform: translateX(-50%);
`;

export const AvatarContainer = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  object-fit: cover;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const ProfileName = styled.p`
  color: #000;
  font-family: "Ownglyph PDH";
  font-size: 24px;
  font-weight: 400;
  line-height: 28.8px;
  margin: 0;
`;

export const KeywordsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 342px;
  position: absolute;
  top: 518px;
  left: 24px;
`;

export const SectionTitle = styled.p`
  color: #000;
  font-family: "Ownglyph PDH";
  font-size: 18px;
  font-weight: 400;
  line-height: 21.6px;
  margin: 0;
  width: 100%;
`;

export const KeywordsWrapper = styled.div`
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
  border-radius: 20px;
  background: var(--secondary, #ffc6b6);
`;

export const KeywordText = styled.p`
  color: #fff;
  font-family: "Ownglyph PDH";
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  margin: 0;
`;

export const BalanceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 342px;
  position: absolute;
  top: 626px;
  left: 50%;
  transform: translateX(-50%);
`;

export const BalanceItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const BalanceItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--secondary, #ffc6b6);
  background: #ffffff;
  width: 100%;
`;

export const BalanceIcon = styled.img`
  width: 17px;
  height: 15px;
`;

export const BalanceTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  font-family: "Ownglyph PDH";
  font-style: normal;
`;

export const BalanceLabel = styled.p`
  color: #6b7280;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  margin: 0;
`;

export const BalanceValue = styled.p`
  color: #000;
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
  margin: 0;
`;
