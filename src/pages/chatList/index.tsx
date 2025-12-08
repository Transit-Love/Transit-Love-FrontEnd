import React, { useEffect, useState } from "react";
import * as S from "./style";
import MessageCircleIcon from "../../assets/icon/message-circle.svg";
import MessageCircleFilledIcon from "../../assets/icon/message-circle-filled.svg";
import InfoIcon from "../../assets/icon/Info.png";
import Avatar1 from "../../assets/icon/avatar1.png";
import Avatar2 from "../../assets/icon/avatar2.png";
import Avatar3 from "../../assets/icon/avatar3.png";
import Avatar4 from "../../assets/icon/avatar4.png";
import NavBar from "../../components/NavBar";
import PageHeader from "../../components/PageHeader";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { useChatList, useChatRoomList } from "../../hooks/useChatQueries";
import { createChatRoom } from "../../api/chatService";
import type {
  Profile as ChatProfile,
  ChatRoomListItem,
} from "../../types/chat";
import { isApiError } from "../../types/error";

const ChatListPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // React Query로 데이터 가져오기 (자동 캐싱)
  const {
    data: chatList,
    isLoading: chatListLoading,
    error: chatListError,
  } = useChatList();
  const {
    data: chatRoomList,
    isLoading: chatRoomListLoading,
    error: chatRoomListError,
  } = useChatRoomList();

  const loading = chatListLoading || chatRoomListLoading;
  const error = chatListError || chatRoomListError;

  // 1분마다 현재 시간 업데이트 (남은 시간 표시용)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 1분마다
    return () => clearInterval(timer);
  }, []);

  // 남은 시간 계산 (분 단위)
  const getRemainingMinutes = (expiresAt?: string): number | null => {
    if (!expiresAt) return null;
    const expireTime = new Date(expiresAt).getTime();
    const now = currentTime.getTime();
    const diff = expireTime - now;
    if (diff <= 0) return 0;
    return Math.floor(diff / 60000); // 밀리초를 분으로 변환
  };

  // 남은 시간 텍스트 생성
  const getRemainingTimeText = (minutes: number | null): string => {
    if (minutes === null) return "";
    if (minutes === 0) return "만료됨";
    if (minutes < 60) return `${minutes}분 남음`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}시간 ${mins}분 남음` : `${hours}시간 남음`;
  };

  // 아바타 이미지 매핑 (임시)
  const getAvatarImage = (profileId: number) => {
    const avatars = [Avatar1, Avatar2, Avatar3, Avatar4];
    return avatars[profileId % avatars.length];
  };

  // 채팅으로 이동
  const handleNavigateToChat = (matchId: number, profileId: number) => {
    navigate(`/chat?matchId=${matchId}&profileId=${profileId}`);
  };

  // 일반 참가자와 채팅 시작 (2시간 제한 채팅방 생성)
  const handleStartChatWithProfile = async (profileId: number) => {
    try {
      // 2시간 제한 채팅방 생성 또는 조회
      const chatRoomResponse = await createChatRoom(profileId);

      // 채팅방으로 이동
      navigate(
        `/chat?chatRoomId=${chatRoomResponse.chatRoomId}&profileId=${chatRoomResponse.otherProfileId}`
      );
    } catch (err: unknown) {
      console.error("채팅방 생성 실패:", err);
      if (isApiError(err)) {
        if (err.response?.status === 401) {
          alert("로그인이 필요합니다.");
          navigate("/login");
        } else if (err.response?.status === 400) {
          const errorMsg =
            err.response?.data?.message || "채팅방 생성에 실패했습니다.";
          alert(errorMsg);
        } else {
          alert("채팅방 생성에 실패했습니다. 다시 시도해주세요.");
        }
      } else {
        alert("채팅방 생성에 실패했습니다.");
      }
    }
  };

  // 채팅방으로 이동 (기존 채팅방)
  const handleNavigateToChatRoom = (chatRoomId: number, profileId: number) => {
    navigate(`/chat?chatRoomId=${chatRoomId}&profileId=${profileId}`);
  };

  // 로딩 중
  if (loading) {
    return (
      <S.ChatWrapper>
        <div style={{ 
          width: "100%", 
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Loading message="채팅 목록을 불러오는 중..." />
        </div>
      </S.ChatWrapper>
    );
  }

  // 에러 발생
  if (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "채팅 목록을 불러오는데 실패했습니다.";

    return (
      <S.ChatWrapper>
        <PageHeader title="채팅" backgroundColor="#FFC6B6" />
        <S.ChatContainer>
          <div style={{ padding: "24px", textAlign: "center", color: "red" }}>
            {errorMessage}
          </div>
        </S.ChatContainer>
        <NavBar />
      </S.ChatWrapper>
    );
  }

  const matchedProfile = chatList?.matchedProfile;
  const otherProfiles = chatList?.otherProfiles || [];

  return (
    <S.ChatWrapper>
      <PageHeader title="채팅" backgroundColor="#FFC6B6" />
      <S.HeaderInfo>
        <S.InfoCard>
          <img
            src={InfoIcon}
            alt="정보"
            style={{ width: "16px", height: "16px" }}
          />
          <S.InfoText>
            다른 참가자와는 2시간 동안만 대화가 가능합니다
          </S.InfoText>
        </S.InfoCard>
      </S.HeaderInfo>
      <S.ChatContainer>

      <div
        style={{
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* 매칭된 커플 */}
        {matchedProfile && (
          <S.CoupleSection>
            <S.CoupleLabel>커플 상대</S.CoupleLabel>
            <S.UserCard isCouple>
              <S.UserImage
                src={getAvatarImage(matchedProfile.profileId)}
                alt="프로필"
              />
              <S.UserInfo>
                <S.UserName>{matchedProfile.nickname}</S.UserName>
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                  <S.UserTag isCouple>
                    <S.InfoText
                      style={{ fontSize: "12px", lineHeight: "normal" }}
                    >
                      {matchedProfile.mbti}
                    </S.InfoText>
                  </S.UserTag>
                  {matchedProfile.lastMessage && (
                    <S.InfoText
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        maxWidth: "150px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {matchedProfile.lastMessage}
                    </S.InfoText>
                  )}
                </div>
              </S.UserInfo>
              <div style={{ position: "relative" }}>
                <img
                  src={MessageCircleIcon}
                  alt="메시지"
                  style={{ width: "19px", height: "19px", cursor: "pointer" }}
                  onClick={() =>
                    handleNavigateToChat(
                      matchedProfile.matchId,
                      matchedProfile.profileId
                    )
                  }
                />
                {matchedProfile.unreadMessageCount > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      backgroundColor: "#FF6B6B",
                      color: "white",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {matchedProfile.unreadMessageCount}
                  </div>
                )}
              </div>
            </S.UserCard>
          </S.CoupleSection>
        )}

        {/* 매칭된 커플이 없을 때 */}
        {!matchedProfile && (
          <S.CoupleSection>
            <S.CoupleLabel>커플 상대</S.CoupleLabel>
            <div
              style={{ textAlign: "center", padding: "20px", color: "#999" }}
            >
              아직 매칭된 커플이 없습니다.
            </div>
          </S.CoupleSection>
        )}

        {/* 진행 중인 채팅방 (2시간 제한) */}
        {chatRoomList && chatRoomList.unmatchedRooms.length > 0 && (
          <S.CoupleSection>
            <S.OtherLabel>
              <S.OtherTitle>진행 중인 대화</S.OtherTitle>
              <S.OtherCount>{chatRoomList.unmatchedRooms.length}</S.OtherCount>
            </S.OtherLabel>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                width: "100%",
              }}
            >
              {chatRoomList.unmatchedRooms.map((room: ChatRoomListItem) => {
                const remaining = getRemainingMinutes(room.expiresAt);
                const isExpired = remaining !== null && remaining <= 0;

                return (
                  <S.UserCard
                    key={room.chatRoomId}
                    style={{ opacity: isExpired ? 0.5 : 1 }}
                  >
                    <S.UserImage
                      src={getAvatarImage(room.otherProfileId)}
                      alt="프로필"
                    />
                    <S.UserInfo>
                      <S.UserName>{room.otherNickname}</S.UserName>
                      <div
                        style={{
                          display: "flex",
                          gap: "4px",
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        <S.UserTag>
                          <S.InfoText
                            style={{ fontSize: "12px", lineHeight: "normal" }}
                          >
                            {room.otherMbti}
                          </S.InfoText>
                        </S.UserTag>
                        {remaining !== null && (
                          <S.InfoText
                            style={{
                              fontSize: "11px",
                              color: remaining <= 30 ? "#FF6B6B" : "#FF9800",
                              fontWeight: "bold",
                            }}
                          >
                            {getRemainingTimeText(remaining)}
                          </S.InfoText>
                        )}
                      </div>
                      {room.lastMessage && (
                        <S.InfoText
                          style={{
                            fontSize: "12px",
                            color: "#666",
                            maxWidth: "200px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {room.lastMessage}
                        </S.InfoText>
                      )}
                    </S.UserInfo>
                    <div style={{ position: "relative" }}>
                      <img
                        src={MessageCircleIcon}
                        alt="메시지"
                        style={{
                          width: "19px",
                          height: "19px",
                          cursor: isExpired ? "not-allowed" : "pointer",
                        }}
                        onClick={() =>
                          !isExpired &&
                          handleNavigateToChatRoom(
                            room.chatRoomId,
                            room.otherProfileId
                          )
                        }
                      />
                      {room.unreadMessageCount > 0 && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            backgroundColor: "#FF6B6B",
                            color: "white",
                            borderRadius: "50%",
                            width: "18px",
                            height: "18px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {room.unreadMessageCount}
                        </div>
                      )}
                    </div>
                  </S.UserCard>
                );
              })}
            </div>
          </S.CoupleSection>
        )}

        {/* 다른 참가자 목록 */}
        <S.CoupleSection>
          <S.OtherLabel>
            <S.OtherTitle>다른 참가자</S.OtherTitle>
            <S.OtherCount>{otherProfiles.length}</S.OtherCount>
          </S.OtherLabel>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "100%",
            }}
          >
            {otherProfiles.length === 0 ? (
              <div
                style={{ textAlign: "center", padding: "20px", color: "#999" }}
              >
                다른 참가자가 없습니다.
              </div>
            ) : (
              otherProfiles.map((profile: ChatProfile) => (
                <S.UserCard key={profile.profileId}>
                  <S.UserImage
                    src={getAvatarImage(profile.profileId)}
                    alt="프로필"
                  />
                  <S.UserInfo>
                    <S.UserName>{profile.nickname}</S.UserName>
                    <div
                      style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}
                    >
                      <S.UserTag>
                        <S.InfoText
                          style={{ fontSize: "12px", lineHeight: "normal" }}
                        >
                          {profile.mbti}
                        </S.InfoText>
                      </S.UserTag>
                    </div>
                  </S.UserInfo>
                  <img
                    src={MessageCircleFilledIcon}
                    alt="메시지"
                    style={{
                      width: "19px",
                      height: "19px",
                      cursor: "pointer",
                      opacity: 1,
                    }}
                    onClick={() =>
                      handleStartChatWithProfile(profile.profileId)
                    }
                  />
                </S.UserCard>
              ))
            )}
          </div>
        </S.CoupleSection>
      </div>
      </S.ChatContainer>
      <NavBar />
    </S.ChatWrapper>
  );
};

export default ChatListPage;
