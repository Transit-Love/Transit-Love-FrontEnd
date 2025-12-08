import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "../assets/icon/home.png";
import MessageIcon from "../assets/icon/chat.png";
import AnonymousMessageIcon from "../assets/icon/message.svg";
import ProfileIcon from "../assets/icon/profile.png";
import profileService from "../api/profileService";

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

const ItemButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 49px;
  border-radius: 12px;
  background: ${({ $active }) =>
    $active ? "rgba(250, 176, 184, 0.24)" : "transparent"};
  border: none;
  cursor: pointer;
`;

const Icon = styled.img<{ $active?: boolean }>`
  width: 24px;
  height: 24px;
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
`;

const NavBar: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isHome = pathname === "/home";
  const isChatList = pathname === "/chat-list";
  const isAnonymousMessage = pathname === "/message";
  const isProfile = pathname === "/profile";

  return (
    <Bar>
      <Items>
        <Item to="/home" $active={isHome} aria-label="home">
          <Icon src={HomeIcon} $active={isHome} />
        </Item>
        <Item to="/chat-list" $active={isChatList} aria-label="chat">
          <Icon src={MessageIcon} $active={isChatList} />
        </Item>
        <Item
          to="/message"
          $active={isAnonymousMessage}
          aria-label="anonymous-message"
        >
          <Icon src={AnonymousMessageIcon} $active={isAnonymousMessage} />
        </Item>
        <Item to="/profile" $active={isProfile} aria-label="profile">
          <Icon src={ProfileIcon} $active={isProfile} />
        </Item>
      </Items>
    </Bar>
  );
};

export default NavBar;
