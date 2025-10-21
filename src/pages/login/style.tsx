import styled from '@emotion/styled';

export const LoginContainer = styled.div`
  width: 390px;
  height: 844px;
  background: transparent;
  position: relative;
  overflow: hidden;
  margin: 0 auto;

  @media (min-width: 391px) {
    background: #FFFFFF;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
  }
`;

export const LogoText = styled.div`
  position: absolute;
  left: 210px;
  top: 277px;
  width: 111px;
  height: 24px;
  font-family: 'Ownglyph PDH', inherit;
  font-weight: 400;
  font-size: 20px;
  line-height: 1.2em;
  color: #484848;
  z-index: 3;
`;

export const MainImage = styled.div`
  position: absolute;
  left: 107px;
  top: 335px;
  width: 176px;
  height: 174px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const GoogleLoginFrame = styled.div`
  position: absolute;
  left: 36px;
  top: 663px;
  width: 318px;
  height: 52px;
  background: #FFFFFF;
  border-radius: 10px;
  z-index: 3;
`;

export const GoogleIcon = styled.img`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  object-fit: contain;
  z-index: 4;
`;

export const GoogleText = styled.div`
  position: absolute;
  left: 50px;
  top: 50%;
  transform: translateY(-50%);
  width: 106px;
  height: 20px;
  font-family: 'Ownglyph PDH', inherit;
  font-weight: 400;
  font-size: 20px;
  line-height: 0.96em;
  color: #000000;
  z-index: 4;
`;

export const InfoText = styled.div`
  position: absolute;
  left: 79px;
  top: 733px;
  width: 231px;
  height: 20px;
  font-family: 'Ownglyph PDH', inherit;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2em;
  color: #000000;
  z-index: 3;
`;

export const AdminText = styled.div`
  position: absolute;
  left: 79px;
  top: 760px;
  width: 231px;
  height: 20px;
  font-family: 'Ownglyph PDH', inherit;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2em;
  color: #000000;
  z-index: 3;
  cursor: pointer;
`;

export const Underline = styled.div`
  position: absolute;
  left: 77px;
  top: 744px;
  width: 51px;
  height: 9px;
  background: rgba(250, 176, 184, 0.36);
  z-index: 3;
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
