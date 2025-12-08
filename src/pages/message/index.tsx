import React, { useState } from "react";
import * as S from "./style";
import PageHeader from "../../components/PageHeader";
import NavBar from "../../components/NavBar";
import Loading from "../../components/Loading";
import { useChatList } from "../../hooks/useChatQueries";
import {
  useReceivedHeartMessages,
  useSendHeartMessage,
} from "../../hooks/useHeartMessages";

const MessagePage: React.FC = () => {
  const [message, setMessage] = useState("");
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
  const [selectedPersonName, setSelectedPersonName] = useState("선택할 사람");
  const [showPersonSelect, setShowPersonSelect] = useState(false);
  const [hasSentMessage, setHasSentMessage] = useState(false);

  // 채팅 목록 조회 (프로필 목록)
  const { data: chatList, isLoading: isChatListLoading } = useChatList();

  // 받은 속마음문자 조회
  const {
    data: receivedMessages = [],
    isLoading: isMessagesLoading,
    refetch: refetchMessages,
  } = useReceivedHeartMessages();

  // 속마음문자 전송
  const { mutate: sendMessage, isPending: isSending } = useSendHeartMessage();

  // 프로필 목록 (매칭된 사람 + 다른 사람들)
  const profiles = [
    ...(chatList?.matchedProfile ? [chatList.matchedProfile] : []),
    ...(chatList?.otherProfiles || []),
  ];

  const handleSendMessage = () => {
    console.log(
      "전송 시도 - selectedPersonId:",
      selectedPersonId,
      "selectedPersonName:",
      selectedPersonName
    );

    if (!selectedPersonId) {
      alert("메시지를 받을 사람을 선택해주세요.");
      return;
    }

    if (!message.trim()) {
      alert("메시지 내용을 입력해주세요.");
      return;
    }

    sendMessage(
      {
        receiverProfileId: selectedPersonId,
        content: message.trim(),
      },
      {
        onSuccess: () => {
          alert("속마음 문자가 전송되었습니다.");
          setMessage("");
          setSelectedPersonId(null);
          setSelectedPersonName("선택할 사람");
          setHasSentMessage(true);
          refetchMessages();
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message ||
            "속마음 문자 전송에 실패했습니다.";
          alert(errorMessage);
        },
      }
    );
  };

  const handlePersonSelect = (profileId: number, name: string) => {
    console.log("선택된 사람:", profileId, name);
    setSelectedPersonId(profileId);
    setSelectedPersonName(name);
    setShowPersonSelect(false);
  };

  // 시간 포맷팅
  const formatTime = (sentAt: string) => {
    const date = new Date(sentAt);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const isLoading = isChatListLoading || isMessagesLoading;

  return (
    <S.MessageContainer>
      <S.BackgroundImage />

      {isLoading ? (
        <div style={{ 
          width: "100%", 
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 100
        }}>
          <Loading message="메시지를 불러오는 중..." />
        </div>
      ) : (
        <>
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
                <S.CountText>{receivedMessages.length}</S.CountText>
              </S.CountBadge>
            </S.SectionHeader>

            <S.MessagesList>
              {receivedMessages.length === 0 ? (
                <S.EmptyMessage>
                  아직 받은 속마음 문자가 없습니다.
                </S.EmptyMessage>
              ) : (
                receivedMessages.map((msg) => (
                  <S.MessageCard key={msg.id}>
                    <S.MessageHeader>
                      <S.SenderName>익명의 누군가</S.SenderName>
                      <S.MessageTime>{formatTime(msg.sentAt)}</S.MessageTime>
                    </S.MessageHeader>
                    <S.MessageContent>{msg.content}</S.MessageContent>
                  </S.MessageCard>
                ))
              )}
            </S.MessagesList>
          </S.ReceivedSection>

          {!hasSentMessage && (
            <>
              <S.SendSection>
                <S.SendTitle>속마음 문자 보내기</S.SendTitle>

                <S.PersonSelectCard
                  onClick={() => setShowPersonSelect(!showPersonSelect)}
                >
                  <S.PersonSelectContent>
                    <S.PersonSelectHeader>
                      <S.PersonSelectLabel>
                        {selectedPersonName === "선택할 사람"
                          ? "메시지를 받을 사람"
                          : "받는 사람"}
                      </S.PersonSelectLabel>
                    </S.PersonSelectHeader>
                    <S.PersonSelectMessage>
                      {selectedPersonName}
                    </S.PersonSelectMessage>
                  </S.PersonSelectContent>
                  <S.ChevronIcon />
                </S.PersonSelectCard>

                {showPersonSelect && (
                  <S.PersonList>
                    {profiles.length === 0 ? (
                      <S.EmptyMessage>
                        선택 가능한 프로필이 없습니다.
                      </S.EmptyMessage>
                    ) : (
                      profiles.map((profile) => (
                        <S.PersonItem
                          key={profile.profileId}
                          onClick={() =>
                            handlePersonSelect(
                              profile.profileId,
                              profile.nickname
                            )
                          }
                        >
                          <S.PersonName>{profile.nickname}</S.PersonName>
                          {profile.mbti && (
                            <S.PersonMBTI>{profile.mbti}</S.PersonMBTI>
                          )}
                        </S.PersonItem>
                      ))
                    )}
                  </S.PersonList>
                )}

                <S.MessageInput>
                  <S.MessagePlaceholder>
                    메시지 작성 (최대 100자)
                  </S.MessagePlaceholder>
                  <S.MessageTextarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={100}
                    placeholder="마음을 전하고 싶은 내용을 작성해주세요..."
                  />
                </S.MessageInput>

                <S.CharacterCount>
                  <S.CharacterCountText>
                    {message.length}/100
                  </S.CharacterCountText>
                </S.CharacterCount>
              </S.SendSection>

              <S.SendButton onClick={handleSendMessage} disabled={isSending}>
                <S.SendButtonText>
                  {isSending ? "전송 중..." : "속마음 문자 전송하기"}
                </S.SendButtonText>
              </S.SendButton>
            </>
          )}

          <NavBar />
        </>
      )}
    </S.MessageContainer>
  );
};

export default MessagePage;
