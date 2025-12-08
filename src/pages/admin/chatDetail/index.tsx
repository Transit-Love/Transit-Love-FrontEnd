import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "../../chat/style"; // 사용자 채팅 스타일 재활용
import Loading from "../../../components/Loading";
import Avatar1 from "../../../assets/icon/avatar1.png";
import Avatar2 from "../../../assets/icon/avatar2.png";
import Avatar3 from "../../../assets/icon/avatar3.png";
import Avatar4 from "../../../assets/icon/avatar4.png";
import BackIcon from "../../../assets/back.png";
import AdminNavBar from "../../../components/AdminNavBar";
import { useAdminChatMessages } from "../../../hooks/useAdminQueries";
import type { AdminChatMessage } from "../../../types/admin";

const AdminChatDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { matchId } = useParams<{ matchId: string }>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // React Query로 데이터 가져오기 (자동 캐싱)
  const { data, isLoading, error } = useAdminChatMessages(Number(matchId));
  const messages = data?.messages || [];
  const matchProfiles = data?.matchProfiles || null;

  // 아바타 이미지 매핑
  const getAvatarImage = (profileId: number) => {
    const avatars = [Avatar1, Avatar2, Avatar3, Avatar4];
    return avatars[profileId % avatars.length];
  };

  // 메시지 목록이 업데이트되면 스크롤 하단으로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    currentMsg: AdminChatMessage,
    prevMsg?: AdminChatMessage
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
      <S.ChatPageContainer>
        <Loading message="채팅 내역을 불러오는 중..." />
        <AdminNavBar />
      </S.ChatPageContainer>
    );
  }

  if (error) {
    return (
      <S.ChatPageContainer>
        <div style={{ padding: "24px", textAlign: "center", color: "red" }}>
          {error instanceof Error ? error.message : "오류가 발생했습니다"}
        </div>
        <AdminNavBar />
      </S.ChatPageContainer>
    );
  }

  if (!matchProfiles) {
    return (
      <S.ChatPageContainer>
        <div style={{ padding: "24px", textAlign: "center" }}>
          프로필 정보를 불러올 수 없습니다.
        </div>
        <AdminNavBar />
      </S.ChatPageContainer>
    );
  }

  return (
    <S.ChatPageContainer>
      <S.ChatHeader>
        <S.HeaderContent>
          <S.UserInfoSection>
            <S.BackButton
              src={BackIcon}
              alt="뒤로가기"
              onClick={() => navigate("/admin/chat-list")}
              style={{ cursor: "pointer" }}
            />
            <S.Avatar
              src={getAvatarImage(matchProfiles.profile1.profileId)}
              alt="프로필1"
            />
            <S.UserDetails>
              <S.UserName>
                {matchProfiles.profile1.nickname} 💑{" "}
                {matchProfiles.profile2.nickname}
              </S.UserName>
              <S.OnlineStatus>
                {matchProfiles.profile1.mbti} · {matchProfiles.profile2.mbti}
              </S.OnlineStatus>
            </S.UserDetails>
          </S.UserInfoSection>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 12px",
              backgroundColor: "#9B7EBD",
              color: "white",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            읽기 전용
          </div>
        </S.HeaderContent>
      </S.ChatHeader>

      <S.MessagesContainer>
        {messages.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "#999",
            }}
          >
            아직 메시지가 없습니다.
          </div>
        ) : (
          messages.map((msg, index) => {
            const showDateDivider = shouldShowDateDivider(
              msg,
              messages[index - 1]
            );

            // senderProfileId로 profile1인지 profile2인지 판단
            const isProfile1 =
              msg.senderProfileId === matchProfiles.profile1.profileId;
            const senderProfile = isProfile1
              ? matchProfiles.profile1
              : matchProfiles.profile2;
            const senderColor = isProfile1 ? "#5B9BD5" : "#ED7D95";

            return (
              <React.Fragment key={msg.id}>
                {showDateDivider && (
                  <S.DateDivider>
                    <S.DateBadge>
                      <S.DateText>{formatDate(msg.sentAt)}</S.DateText>
                    </S.DateBadge>
                  </S.DateDivider>
                )}

                {isProfile1 ? (
                  // Profile1 메시지 - 오른쪽에 표시
                  <S.MessageRowRight>
                    <S.MessageContent style={{ alignItems: "flex-end" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          justifyContent: "flex-end",
                          marginBottom: "4px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "12px",
                            color: senderColor,
                            fontWeight: 600,
                          }}
                        >
                          {senderProfile.nickname}
                        </div>
                        <S.SmallAvatar
                          src={getAvatarImage(senderProfile.profileId)}
                          alt="프로필1"
                        />
                      </div>
                      <S.MessageBubbleSent>
                        <S.MessageTextSent>{msg.content}</S.MessageTextSent>
                      </S.MessageBubbleSent>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          marginTop: "4px",
                          justifyContent: "flex-end",
                        }}
                      >
                        <S.TimeStampRight>
                          {formatTime(msg.sentAt)}
                        </S.TimeStampRight>
                        {msg.isRead && (
                          <S.TimeStampRight style={{ color: "#9B7EBD" }}>
                            · 읽음
                          </S.TimeStampRight>
                        )}
                      </div>
                    </S.MessageContent>
                  </S.MessageRowRight>
                ) : (
                  // Profile2 메시지 - 왼쪽에 표시
                  <S.MessageRow>
                    <S.SmallAvatar
                      src={getAvatarImage(senderProfile.profileId)}
                      alt="프로필2"
                    />
                    <S.MessageContent>
                      <div
                        style={{
                          fontSize: "12px",
                          color: senderColor,
                          fontWeight: 600,
                          marginBottom: "4px",
                        }}
                      >
                        {senderProfile.nickname}
                      </div>
                      <S.MessageBubble>
                        <S.MessageText>{msg.content}</S.MessageText>
                      </S.MessageBubble>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          marginTop: "4px",
                        }}
                      >
                        <S.TimeStamp>{formatTime(msg.sentAt)}</S.TimeStamp>
                        {msg.isRead && (
                          <S.TimeStamp style={{ color: "#9B7EBD" }}>
                            · 읽음
                          </S.TimeStamp>
                        )}
                      </div>
                    </S.MessageContent>
                  </S.MessageRow>
                )}
              </React.Fragment>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </S.MessagesContainer>

      {/* 읽기 전용 안내 */}
      <div
        style={{
          padding: "16px 20px",
          backgroundColor: "#F8F9FA",
          borderTop: "1px solid #E9ECEF",
          textAlign: "center",
          color: "#666",
          fontSize: "13px",
        }}
      >
        🔒 어드민 모드 - 읽기 전용 (메시지 전송 불가)
      </div>

      <AdminNavBar />
    </S.ChatPageContainer>
  );
};

export default AdminChatDetailPage;
