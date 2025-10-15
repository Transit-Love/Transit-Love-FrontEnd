import styled from "@emotion/styled";

export const ChatContainer = styled.div`
  width: 390px;
  height: 844px;
  background: transparent;
  position: relative;
  overflow: hidden;
  margin: 0 auto;

  @media (min-width: 391px) {
    background: #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
`;

export const ChatHeader = styled.div`
  display: flex;
  width: 390px;
  height: 144px;
  padding: 42px 24px 16px 24px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  background: var(--Color-2, #ffc6b6);
`;

export const HeaderTitle = styled.div`
  display: flex;
  height: 28px;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  align-self: stretch;
  position: relative;
`;

export const TitleText = styled.span`
  color: #fff;
  font-family: "Ownglyph PDH";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 21.6px; /* 120% */
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const HeaderInfo = styled.div`
  display: flex;
  padding: 8px 16px;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
`;

export const InfoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

export const InfoText = styled.span`
  color: #fff;
  font-family: "Ownglyph PDH";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16.8px; /* 120% */
  flex: 1 0 0;
`;

export const CoupleSection = styled.div`
  display: flex;
  width: 350px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;
export const CoupleLabel = styled.span`
  color: #000;
  font-family: "Ownglyph PDH";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px; /* 96% */
`;

export const UserCard = styled.div<{ isCouple?: boolean }>`
  display: flex;
  height: 72px;
  padding: 16px;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  border-radius: 16px;
  border: 1px solid ${({ isCouple }) => (isCouple ? "#fab0b8" : "#FFC6B6")};
  background: #fff;
`;

export const UserImage = styled.img`
  display: flex;
  width: 48px;
  height: 48px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
`;

export const UserName = styled.span`
  color: #000;
  font-family: "Ownglyph PDH";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px; /* 120% */
`;

export const UserTag = styled.div<{ isCouple?: boolean }>`
  display: flex;
  padding: 4px 8px;
  align-items: center;
  border-radius: 8px;
  background: ${({ isCouple }) => (isCouple ? "#fab0b8" : "#FFC6B6")};
`;

export const OtherLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const OtherTitle = styled.span`
  color: #6b7280;
  font-family: "Ownglyph PDH";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px; /* 96% */
`;

export const OtherCount = styled.div`
  display: flex;
  padding: 4px 8px;
  align-items: center;
  border-radius: 12px;
  background: var(--Color-2, #ffc6b6);
  color: #fff;
  font-family: "Ownglyph PDH";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
