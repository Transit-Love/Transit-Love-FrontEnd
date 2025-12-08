import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as S from "./style";
import Avatar1 from "../../assets/icon/avatar1.png";
import Avatar2 from "../../assets/icon/avatar2.png";
import Avatar3 from "../../assets/icon/avatar3.png";
import Avatar4 from "../../assets/icon/avatar4.png";
import BackIcon from "../../assets/back.png";
import PhoneIcon from "../../assets/icon/phone.svg";
import MoreVerticalIcon from "../../assets/icon/more-vertical.svg";
import PlusIcon from "../../assets/icon/plus.svg";
import SendIcon from "../../assets/icon/send.svg";
import NavBar from "../../components/NavBar";
import Loading from "../../components/Loading";
import { useWebSocket } from "../../hooks/useWebSocket";
import {
  useChatMessages,
  useChatRoomMessages,
} from "../../hooks/useChatQueries";
import {
  markMessagesAsRead,
  markChatRoomMessagesAsRead,
} from "../../api/chatService";
import type { ChatMessageResponse } from "../../types/chat";
import profileService from "../../api/profileService";
import type { MatchedProfile } from "../../api/profileService";

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const matchId = searchParams.get("matchId")
    ? Number(searchParams.get("matchId"))
    : null;
  const chatRoomId = searchParams.get("chatRoomId")
    ? Number(searchParams.get("chatRoomId"))
    : null;
  const otherProfileId = Number(searchParams.get("profileId"));

  const [message, setMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<ChatMessageResponse[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [matchedProfile, setMatchedProfile] = useState<MatchedProfile | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserIdRef = useRef<number | null>(null);

  // React Hooks는 항상 같은 순서로 호출되어야 함
  const chatRoomMessagesQuery = useChatRoomMessages(chatRoomId || 0);
  const chatMessagesQuery = useChatMessages(matchId || 0);

  // 조건에 따라 적절한 쿼리 결과 선택
  const {
    data: serverMessages = [],
    isLoading,
    error: queryError,
  } = chatRoomId ? chatRoomMessagesQuery : chatMessagesQuery;

  // useMemo로 messages 배열 메모이제이션
  const messages = useMemo(
    () => [...serverMessages, ...localMessages],
    [serverMessages, localMessages]
  );

  useEffect(() => {
    if (queryError) {
      setError(
        queryError instanceof Error
          ? queryError.message
          : "메시지를 불러오는데 실패했습니다."
      );
    }
  }, [queryError]);

  // 현재 사용자 프로필 ID 가져오기
  useEffect(() => {
    const fetchMyProfileId = async () => {
      try {
        const myProfile = await profileService.getMyProfile();
        console.log("✅ 내 프로필 조회 성공:", myProfile);
        console.log("✅ 내 프로필 ID:", myProfile.id);

        if (myProfile.id !== undefined) {
          setCurrentUserId(myProfile.id);
          currentUserIdRef.current = myProfile.id;
        }
      } catch (error) {
        console.error("❌ 내 프로필 조회 실패:", error);

        // fallback: localStorage에서 시도
        const userId = localStorage.getItem("userId");
        const profileId = localStorage.getItem("profileId");
        const id = profileId || userId;

        if (id) {
          const numId = Number(id);
          setCurrentUserId(numId);
          currentUserIdRef.current = numId;
          console.warn("⚠️ localStorage에서 ID 사용:", numId);
        }
      }
    };

    fetchMyProfileId();
  }, []);

  // 매칭된 상대 프로필 정보 가져오기
  useEffect(() => {
    const fetchMatchedProfile = async () => {
      try {
        const matched = await profileService.getMatchedProfile();
        if (matched && Array.isArray(matched) && matched.length > 0) {
          // otherProfileId와 일치하는 프로필 찾기
          const foundProfile = matched.find((p) => p.id === otherProfileId);
          if (foundProfile) {
            setMatchedProfile(foundProfile);
          } else {
            // 못 찾으면 첫 번째 프로필 사용
            setMatchedProfile(matched[0]);
          }
        }
      } catch (error) {
        console.error("매칭된 상대 조회 실패:", error);
      }
    };

    if (otherProfileId) {
      fetchMatchedProfile();
    }
  }, [otherProfileId]);

  // 아바타 이미지 매핑
  const getAvatarImage = (profileId: number) => {
    const avatars = [Avatar1, Avatar2, Avatar3, Avatar4];
    return avatars[profileId % avatars.length];
  };

  // 메시지 수신 핸들러
  const handleMessageReceived = (newMessage: ChatMessageResponse) => {
    const currentUser = currentUserIdRef.current;
    console.log("메시지 수신:", {
      messageId: newMessage.id,
      senderProfileId: newMessage.senderProfileId,
      currentUserId: currentUser,
      isMyMessage: newMessage.senderProfileId === currentUser,
      content: newMessage.content,
    });

    setLocalMessages((prev) => {
      // 중복 메시지 방지: ID가 이미 존재하는지 확인
      const exists = prev.some((msg) => msg.id === newMessage.id);
      if (exists) {
        console.log("중복 메시지 무시:", newMessage.id);
        return prev;
      }

      return [...prev, newMessage];
    });

    // 상대방 메시지면 자동으로 읽음 처리
    if (newMessage.senderProfileId !== currentUserId) {
      if (chatRoomId) {
        markChatRoomMessagesAsRead(chatRoomId).catch((err) =>
          console.error("읽음 처리 실패:", err)
        );
      } else if (matchId) {
        markMessagesAsRead(matchId).catch((err) =>
          console.error("읽음 처리 실패:", err)
        );
      }
    }
  };

  // WebSocket 연결 (matchId 또는 chatRoomId 사용)
  const connectionId = chatRoomId || matchId;

  // connectionId가 없으면 WebSocket 연결하지 않음
  const shouldConnect = !!connectionId;

  const { isConnected, sendMessage: sendWebSocketMessage } = useWebSocket({
    matchId: connectionId || 0, // 0은 더미 값 (연결 안함)
    enabled: shouldConnect, // 연결 활성화 여부
    onMessageReceived: handleMessageReceived,
    onConnected: () => console.log("✅ 채팅방 연결됨"),
    onDisconnected: () => console.log("❌ 채팅방 연결 해제됨"),
    onError: (error) => {
      // 중요한 오류만 처리
      if (
        error instanceof Error &&
        (error.message === "No access token" ||
          error.message === "Authentication failed" ||
          error.message === "Max reconnect attempts reached")
      ) {
        console.error("WebSocket 오류:", error.message);
        setError("로그인이 만료되었습니다. 다시 로그인해주세요.");
        setTimeout(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("userId");
          navigate("/login");
        }, 2000);
      }
      // 일시적인 연결 오류는 무시 (자동 재연결)
    },
  });

  // 초기 로드 시 읽음 처리
  useEffect(() => {
    if (!isLoading && serverMessages.length > 0) {
      if (chatRoomId) {
        markChatRoomMessagesAsRead(chatRoomId).catch(() =>
          console.warn("읽음 처리 실패")
        );
      } else if (matchId) {
        markMessagesAsRead(matchId).catch(() => console.warn("읽음 처리 실패"));
      }
    }
  }, [isLoading, chatRoomId, matchId, serverMessages.length]);

  // 메시지 목록이 업데이트되면 스크롤 하단으로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() && isConnected) {
      sendWebSocketMessage(message.trim());
      setMessage("");
    } else if (!isConnected) {
      alert("채팅 서버와 연결되지 않았습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  // 시간 포맷팅
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "오후" : "오전";
    const displayHours = hours % 12 || 12;
    return `${period} ${displayHours}:${minutes}`;
  };

  // 날짜 구분자 체크
  const shouldShowDateDivider = (
    currentMsg: ChatMessageResponse,
    prevMsg?: ChatMessageResponse
  ) => {
    if (!prevMsg) return true;
    const currentDate = new Date(currentMsg.sentAt).toDateString();
    const prevDate = new Date(prevMsg.sentAt).toDateString();
    return currentDate !== prevDate;
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return "오늘";
    }
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  if (isLoading) {
    return (
      <S.ChatPageWrapper>
        <Loading message="채팅을 불러오는 중..." />
        <NavBar />
      </S.ChatPageWrapper>
    );
  }

  if (error) {
    return (
      <S.ChatPageWrapper>
        <div style={{ padding: "24px", textAlign: "center", color: "red" }}>
          {error}
        </div>
        <NavBar />
      </S.ChatPageWrapper>
    );
  }

  // 상대방 프로필 정보 (메시지에서 가져오기)
  // 로딩 중
  if (isLoading) {
    return (
      <S.ChatPageWrapper>
        <S.ChatHeader>
          <S.HeaderContent>
            <S.UserInfoSection>
              <S.BackButton
                src={BackIcon}
                alt="뒤로가기"
                onClick={() => navigate(-1)}
                style={{ cursor: "pointer" }}
              />
              <S.UserDetails>
                <S.UserName>로딩 중...</S.UserName>
              </S.UserDetails>
            </S.UserInfoSection>
          </S.HeaderContent>
        </S.ChatHeader>
        <S.MessagesContainer>
          <div style={{ textAlign: "center", padding: "20px" }}>
            메시지를 불러오는 중...
          </div>
        </S.MessagesContainer>
        <NavBar />
      </S.ChatPageWrapper>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <S.ChatPageWrapper>
        <S.ChatHeader>
          <S.HeaderContent>
            <S.UserInfoSection>
              <S.BackButton
                src={BackIcon}
                alt="뒤로가기"
                onClick={() => navigate(-1)}
                style={{ cursor: "pointer" }}
              />
              <S.UserDetails>
                <S.UserName>오류</S.UserName>
              </S.UserDetails>
            </S.UserInfoSection>
          </S.HeaderContent>
        </S.ChatHeader>
        <S.MessagesContainer>
          <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
            {error}
          </div>
        </S.MessagesContainer>
        <NavBar />
      </S.ChatPageWrapper>
    );
  }

  const otherProfile =
    messages.length > 0
      ? messages.find((m) => m.senderProfileId !== currentUserId)
      : null;

  // 매칭된 프로필 정보가 있으면 그것을 사용, 없으면 메시지에서 추출
  const displayName =
    matchedProfile?.nickname || otherProfile?.senderNickname || "상대방";
  const displayMbti = matchedProfile?.mbti;

  return (
    <S.ChatPageWrapper>
      <S.ChatHeader>
        <S.HeaderContent>
          <S.UserInfoSection>
            <S.BackButton
              src={BackIcon}
              alt="뒤로가기"
              onClick={() => navigate(-1)}
              style={{ cursor: "pointer" }}
            />
            <S.Avatar src={getAvatarImage(otherProfileId)} alt="프로필" />
            <S.UserDetails>
              <S.UserName>
                {displayName}
                {displayMbti && (
                  <span
                    style={{
                      fontSize: "12px",
                      marginLeft: "8px",
                      color: "#999",
                    }}
                  >
                    ({displayMbti})
                  </span>
                )}
              </S.UserName>
              <S.OnlineStatus>
                {isConnected ? "온라인" : "오프라인"}
              </S.OnlineStatus>
            </S.UserDetails>
          </S.UserInfoSection>
          <S.Actions>
            <S.ActionIcon src={PhoneIcon} alt="통화" />
            <S.ActionIcon src={MoreVerticalIcon} alt="더보기" />
          </S.Actions>
        </S.HeaderContent>
      </S.ChatHeader>

      <S.MessagesContainer>
        {messages.map((msg, index) => {
          const isMyMessage = msg.senderProfileId === currentUserId;
          const showDateDivider = shouldShowDateDivider(
            msg,
            messages[index - 1]
          );

          return (
            <React.Fragment key={`${msg.id}-${index}`}>
              {showDateDivider && (
                <S.DateDivider>
                  <S.DateBadge>
                    <S.DateText>{formatDate(msg.sentAt)}</S.DateText>
                  </S.DateBadge>
                </S.DateDivider>
              )}

              {isMyMessage ? (
                <S.MessageRowRight>
                  <S.MessageContent>
                    <S.MessageBubbleSent>
                      <S.MessageTextSent>{msg.content}</S.MessageTextSent>
                    </S.MessageBubbleSent>
                    <S.TimeStampRight>
                      {formatTime(msg.sentAt)}
                    </S.TimeStampRight>
                  </S.MessageContent>
                </S.MessageRowRight>
              ) : (
                <S.MessageRow>
                  <S.SmallAvatar
                    src={getAvatarImage(msg.senderProfileId)}
                    alt="프로필"
                  />
                  <S.MessageContent>
                    <S.MessageBubble>
                      <S.MessageText>{msg.content}</S.MessageText>
                    </S.MessageBubble>
                    <S.TimeStamp>{formatTime(msg.sentAt)}</S.TimeStamp>
                  </S.MessageContent>
                </S.MessageRow>
              )}
            </React.Fragment>
          );
        })}
        <div ref={messagesEndRef} />
      </S.MessagesContainer>

      <S.InputContainer>
        <S.InputRow>
          <S.TextInputWrapper>
            <S.TextInput
              type="text"
              placeholder="메시지를 입력하세요..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
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
    </S.ChatPageWrapper>
  );
};

export default ChatPage;
