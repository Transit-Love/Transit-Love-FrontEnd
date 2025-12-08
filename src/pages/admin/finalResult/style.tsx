import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  max-width: 390px;
  height: 100vh;
  margin: 0 auto;
  overflow-y: auto;
  position: relative;
  padding-bottom: 60px;

  /* 스크롤바 숨김 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

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

export const Header = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 390px;
  height: 100px;
  background: #ffc6b6;
  z-index: 200;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  padding: 0 24px 16px;
`;

export const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  width: 28px;
  height: 28px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const HeaderTitle = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.2em;
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

export const Section = styled.div`
  position: absolute;
  left: 20px;
  top: 124px;
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 100;
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 0.96em;
  color: #000000;
`;

export const CoupleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const CoupleCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #ffffff;
  border: 1px solid #fab0b8;
  border-radius: 16px;
`;

export const CoupleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
`;

export const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 24px;
  object-fit: cover;
`;

export const Name = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2em;
  color: #000000;
`;

export const HeartIcon = styled.img`
  width: 24px;
  height: 24px;
`;