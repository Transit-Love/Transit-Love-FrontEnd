import React from "react";
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import FinalResultIcon from "../assets/icon/profile.png";
import HomeIcon from "../assets/icon/home.png";
import MessageIcon from "../assets/icon/message.svg";

const Bar = styled.nav`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: 390px;
  height: 67px;
  background: #ffffff;
  border-top: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Items = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

const Item = styled(Link)<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 49px;
  border-radius: 12px;
  background: ${({ active }) =>
    active ? "rgba(250, 176, 184, 0.24)" : "transparent"};
`;

const Icon = styled.img<{ active?: boolean }>`
  width: 24px;
  height: 24px;
  opacity: ${({ active }) => (active ? 1 : 0.6)};
`;

const AdminNavBar: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isParticipants = pathname === "/admin/participants";
  const isMessages = pathname === "/admin/messages";
  const isFinalResult = pathname === "/admin/final-result";

  return (
    <Bar>
      <Items>
        <Item
          to="/admin/final-result"
          active={isFinalResult}
          aria-label="final-result"
        >
          <Icon src={HomeIcon} active={isFinalResult} />
        </Item>
        <Item to="/admin/messages" active={isMessages} aria-label="messages">
          <Icon src={MessageIcon} active={isMessages} />
        </Item>
        <Item
          to="/admin/participants"
          active={isParticipants}
          aria-label="participants"
        >
          <Icon src={FinalResultIcon} active={isParticipants} />
        </Item>
      </Items>
    </Bar>
  );
};

export default AdminNavBar;
