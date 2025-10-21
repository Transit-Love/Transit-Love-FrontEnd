import React, { useState } from "react";
import * as S from "./style";
import Avatar1 from "../../assets/icon/avatar1.png";
import BackIcon from "../../assets/back.png";
import PhoneIcon from "../../assets/icon/phone.svg";
import MoreVerticalIcon from "../../assets/icon/more-vertical.svg";
import PlusIcon from "../../assets/icon/plus.svg";
import SendIcon from "../../assets/icon/send.svg";
import NavBar from "../../components/NavBar.tsx";

const ChatPage: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("메시지 전송:", message);
      setMessage("");
    }
  };

  return (
    <S.ChatPageContainer>
      <S.ChatHeader>
        <S.HeaderContent>
          <S.UserInfoSection>
            <S.BackButton src={BackIcon} alt="뒤로가기" />
            <S.Avatar src={Avatar1} alt="프로필" />
            <S.UserDetails>
              <S.UserName>너도 아라를 아라?</S.UserName>
              <S.OnlineStatus>온라인</S.OnlineStatus>
            </S.UserDetails>
          </S.UserInfoSection>
          <S.Actions>
            <S.ActionIcon src={PhoneIcon} alt="통화" />
            <S.ActionIcon src={MoreVerticalIcon} alt="더보기" />
          </S.Actions>
        </S.HeaderContent>
      </S.ChatHeader>

      <S.MessagesContainer>
        <S.DateDivider>
          <S.DateBadge>
            <S.DateText>오늘</S.DateText>
          </S.DateBadge>
        </S.DateDivider>

        <S.MessageRow>
          <S.SmallAvatar src={Avatar1} alt="프로필" />
          <S.MessageContent>
            <S.MessageBubble>
              <S.MessageText>안녕하세요! 매칭되어서 너무 기뻐요</S.MessageText>
            </S.MessageBubble>
            <S.TimeStamp>오후 2:30</S.TimeStamp>
          </S.MessageContent>
        </S.MessageRow>

        <S.MessageRowRight>
          <S.MessageContent>
            <S.MessageBubbleSent>
              <S.MessageTextSent>
                안녕하세요! 저도 정말 설레네요
              </S.MessageTextSent>
            </S.MessageBubbleSent>
            <S.TimeStampRight>오후 2:32</S.TimeStampRight>
          </S.MessageContent>
        </S.MessageRowRight>

        <S.MessageRow>
          <S.SmallAvatar src={Avatar1} alt="프로필" />
          <div style={{ width: "120px" }}>
            <S.TypingBubble>
              <S.TypingDots>
                <S.Dot />
                <S.Dot />
                <S.Dot />
              </S.TypingDots>
            </S.TypingBubble>
          </div>
        </S.MessageRow>
      </S.MessagesContainer>

      <S.InputContainer>
        <S.InputRow>
          <S.TextInputWrapper>
            <S.TextInput
              type="text"
              placeholder="메시지를 입력하세요..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <S.PlusIcon src={PlusIcon} alt="첨부" />
          </S.TextInputWrapper>
          <S.SendButton onClick={handleSendMessage}>
            <S.SendIcon src={SendIcon} alt="전송" />
          </S.SendButton>
        </S.InputRow>
      </S.InputContainer>

      <NavBar />
    </S.ChatPageContainer>
  );
};

export default ChatPage;
