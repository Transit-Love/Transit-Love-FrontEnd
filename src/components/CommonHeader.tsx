import React from "react";
import styled from "@emotion/styled";
import BackIcon from "../assets/back.png";

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 390px;
  height: 100px;
  background: var(--primary, #fab0b8);
  z-index: 200;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 24px 24px 16px;
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  gap: 104px;
  width: 100%;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.div`
  font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 0.9em;
  color: #ffffff;
`;

interface CommonHeaderProps {
  title: string;
  onBack: () => void;
  children?: React.ReactNode;
}

const CommonHeader: React.FC<CommonHeaderProps> = ({
  title,
  onBack,
  children,
}) => (
  <Header>
    <NavBar>
      <BackButton onClick={onBack}>
        <img src={BackIcon} alt="뒤로가기" />
      </BackButton>
      <HeaderTitle>{title}</HeaderTitle>
      {children}
    </NavBar>
  </Header>
);

export default CommonHeader;
