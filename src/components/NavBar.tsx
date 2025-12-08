import React from "react";
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import MessageIcon from "../assets/icon/chat.png";
import AnonymousMessageIcon from "../assets/icon/message.svg";
import ProfileIcon from "../assets/icon/profile.png";
import authService from "../api/authService";

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
  gap: 30px;
`;

const Item = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 49px;
  border-radius: 12px;
  background: ${({ $active }) =>
    $active ? "rgba(250, 176, 184, 0.24)" : "transparent"};
`;

const Icon = styled.img<{ $active?: boolean }>`
  width: 24px;
  height: 24px;
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
`;

const NavBar: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const isAdmin = authService.isAdmin();

  // Admin 경로 체크
  const isChatList = isAdmin
    ? pathname === "/admin/chat-list"
    : pathname === "/chat-list";
  const isAnonymousMessage = isAdmin
    ? pathname === "/admin/messages"
    : pathname === "/message";
  const isProfile = pathname === "/profile";

  // Admin 경로 설정
  const chatLink = isAdmin ? "/admin/chat-list" : "/chat-list";
  const messageLink = isAdmin ? "/admin/messages" : "/message";

  return (
    <Bar>
      <Items>
        {/* 홈 탭 제거됨 */}
        <Item to={chatLink} $active={isChatList} aria-label="chat">
          <Icon src={MessageIcon} $active={isChatList} />
        </Item>
        <Item
          to={messageLink}
          $active={isAnonymousMessage}
          aria-label="anonymous-message"
        >
          <Icon src={AnonymousMessageIcon} $active={isAnonymousMessage} />
        </Item>
        {!isAdmin && (
          <Item to="/profile" $active={isProfile} aria-label="profile">
            <Icon src={ProfileIcon} $active={isProfile} />
          </Item>
        )}
      </Items>
    </Bar>
  );
};

export default NavBar;
