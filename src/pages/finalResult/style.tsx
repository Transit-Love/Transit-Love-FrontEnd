import styled from "@emotion/styled";

export const FinalResultContainer = styled.div`
  width: 100%;
  max-width: 390px;
  min-height: 100vh;
  background: #f9fafb;
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media (min-width: 391px) {
    background: #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
`;

export const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 140px 24px 40px;

  /* 스크롤바 숨김 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  @media (max-width: 390px) {
    padding: 140px 16px 40px;
  }
`;

export const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #6b7280;
  font-family: "Ownglyph PDH";
  font-size: 16px;
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #ef4444;
  font-family: "Ownglyph PDH";
  font-size: 16px;
  text-align: center;
  padding: 0 24px;
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
  width: 100%;
  padding: 20px;
  border-radius: 16px;
  background: #dfd1ea;
  margin-bottom: 24px;

  @media (max-width: 390px) {
    padding: 16px;
  }
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
  width: 100%;
  margin-bottom: 32px;
`;

export const AvatarContainer = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  object-fit: cover;

  @media (max-width: 390px) {
    width: 100px;
    height: 100px;
  }
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

  @media (max-width: 390px) {
    font-size: 20px;
  }
`;

export const ProfileMbti = styled.p`
  color: #6b7280;
  font-family: "Ownglyph PDH";
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
  margin: 0;
`;

export const KeywordsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-bottom: 32px;
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
  width: 100%;
  margin-bottom: 32px;
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

export const MessageCountSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px;
  margin-bottom: 32px;
  border-radius: 12px;
  background: #f3f4f6;
`;

export const MessageCountText = styled.p`
  color: #6b7280;
  font-family: "Ownglyph PDH";
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  margin: 0;
`;

export const TransferSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-top: 40px;
  padding-top: 40px;
  border-top: 1px solid #e5e7eb;
`;

export const TransferTitle = styled.h2`
  color: #000;
  font-family: "Ownglyph PDH";
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  margin: 0;

  @media (max-width: 390px) {
    font-size: 18px;
  }
`;

export const TransferSubtitle = styled.p`
  color: #6b7280;
  font-family: "Ownglyph PDH";
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  margin: 0 0 16px 0;
`;

export const PartnersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const PartnerCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  width: 100%;

  @media (max-width: 390px) {
    padding: 12px;
    gap: 12px;
  }
`;

export const PartnerAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  object-fit: cover;
  flex-shrink: 0;

  @media (max-width: 390px) {
    width: 50px;
    height: 50px;
  }
`;

export const PartnerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

export const PartnerName = styled.p`
  color: #000;
  font-family: "Ownglyph PDH";
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PartnerMbti = styled.p`
  color: #6b7280;
  font-family: "Ownglyph PDH";
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  margin: 0;
`;

export const PartnerMessageCount = styled.p`
  color: #9ca3af;
  font-family: "Ownglyph PDH";
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  margin: 0;
`;

export const TransferButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 8px;
  background: #ffc6b6;
  border: none;
  cursor: pointer;
  font-family: "Ownglyph PDH";
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #ffb8a3;
  }

  &:disabled {
    background: #e5e7eb;
    cursor: not-allowed;
    color: #9ca3af;
  }

  @media (max-width: 390px) {
    padding: 8px 16px;
    font-size: 13px;
  }
`;

export const NoPartnersMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #9ca3af;
  font-family: "Ownglyph PDH";
  font-size: 14px;
  text-align: center;
`;
