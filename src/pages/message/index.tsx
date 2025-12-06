import React, { useState } from "react";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import NavBar from "../../components/NavBar";

const MessagePage: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("오늘 정말 즐거웠어요...");
  const [selectedPerson, setSelectedPerson] = useState("선택할 사람");

  const receivedMessages = [
    {
      id: 1,
      sender: "익명의 누군가",
      time: "23:15",
      content: "오늘 하루 정말 즐거웠어요. 내일도 이야기 나눠요",
    },
    {
      id: 2,
      sender: "익명의 누군가",
      time: "23:28",
      content: "당신과 대화하면서 정말 많이 웃었어요. 고마워요",
    },
  ];

  const handleSendMessage = () => {
    if (selectedPerson === "선택할 사람") {
      alert("메시지를 받을 사람을 선택해주세요.");
      return;
    }
    console.log("메시지 전송:", message, "받는 사람:", selectedPerson);
  };

  const handlePersonSelect = () => {
    setSelectedPerson("너도 아라를 아라?");
  };

  return (
    <S.MessageContainer>
      <S.BackgroundImage />
      
      <PageHeader 
        title="속마음 문자" 
        subtitle="23:42에 종료 • 1시간 18분 남음"
      />

      <S.InfoCard>
        <S.InfoText>
          <S.InfoTitle>속마음 문자는 단 한 번만 보낼 수 있어요</S.InfoTitle>
          <S.InfoDescription>
            상대방이 누구인지 알 수 없도록 익명으로 전송됩니다
          </S.InfoDescription>
        </S.InfoText>
      </S.InfoCard>

      <S.ReceivedSection>
        <S.SectionHeader>
          <S.SectionTitle>받은 속마음 문자</S.SectionTitle>
          <S.CountBadge>
            <S.CountText>2</S.CountText>
          </S.CountBadge>
        </S.SectionHeader>

        <S.MessagesList>
          {receivedMessages.map((msg) => (
            <S.MessageCard key={msg.id}>
              <S.MessageHeader>
                <S.SenderName>{msg.sender}</S.SenderName>
                <S.MessageTime>{msg.time}</S.MessageTime>
              </S.MessageHeader>
              <S.MessageContent>{msg.content}</S.MessageContent>
            </S.MessageCard>
          ))}
        </S.MessagesList>
      </S.ReceivedSection>

      <S.SendSection>
        <S.SendTitle>속마음 문자 보내기</S.SendTitle>

        <S.PersonSelectCard onClick={handlePersonSelect}>
          <S.PersonSelectContent>
            <S.PersonSelectHeader>
              <S.PersonSelectLabel>{selectedPerson}</S.PersonSelectLabel>
            </S.PersonSelectHeader>
            <S.PersonSelectMessage>
              {selectedPerson !== "선택할 사람" ? selectedPerson : ""}
            </S.PersonSelectMessage>
          </S.PersonSelectContent>
          <S.ChevronIcon />
        </S.PersonSelectCard>

        <S.MessageInput>
          <S.MessagePlaceholder>메시지 작성 (최대 100자)</S.MessagePlaceholder>
          <S.MessageTextarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={100}
          />
        </S.MessageInput>

        <S.CharacterCount>
          <S.CharacterCountText>{message.length}/100</S.CharacterCountText>
        </S.CharacterCount>
      </S.SendSection>

      <S.SendButton onClick={handleSendMessage}>
        <S.SendButtonText>속마음 문자 전송하기</S.SendButtonText>
      </S.SendButton>

      <NavBar />
    </S.MessageContainer>
  );
};

export default MessagePage;
