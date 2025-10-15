import React from "react";
import * as S from "./style";
import MessageCircleIcon from "../../assets/icon/message-circle.svg";
import MessageCircleFilledIcon from "../../assets/icon/message-circle-filled.svg";
import ChevronLeftIcon from "../../assets/back.png";
import InfoIcon from "../../assets/icon/Info.png";
import Avatar1 from "../../assets/icon/avatar1.png";
import Avatar2 from "../../assets/icon/avatar2.png";
import Avatar3 from "../../assets/icon/avatar3.png";
import Avatar4 from "../../assets/icon/avatar4.png";

interface OtherUser {
  id: number;
  name: string;
  avatar: string;
  tags: string[];
  hasMessage: boolean;
}

const ChatListPage: React.FC = () => {
  const otherUsers: OtherUser[] = [
    {
      id: 1,
      name: "나도 연애하고 싶다",
      avatar: Avatar2,
      tags: ["ISFP"],
      hasMessage: true,
    },
    {
      id: 2,
      name: "사진작가 이효준",
      avatar: Avatar3,
      tags: ["ESTP", "여행"],
      hasMessage: true,
    },
    {
      id: 3,
      name: "에빈니",
      avatar: Avatar4,
      tags: ["ENTJ", "운동"],
      hasMessage: true,
    },
  ];

  return (
    <S.ChatContainer>
      <S.ChatHeader>
        <S.HeaderTitle>
          <img
            src={ChevronLeftIcon}
            alt="뒤로가기"
            style={{ width: "7px", height: "14px", cursor: "pointer" }}
          />
          <S.TitleText>채팅</S.TitleText>
        </S.HeaderTitle>
        <S.HeaderInfo>
          <S.InfoDiv>
            <img
              src={InfoIcon}
              alt="정보"
              style={{ width: "16px", height: "16px" }}
            />
            <S.InfoText>
              다른 참가자와는 짧은 대화만 가능합니다 (30분)
            </S.InfoText>
          </S.InfoDiv>
        </S.HeaderInfo>
      </S.ChatHeader>

      <div
        style={{
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <S.CoupleSection>
          <S.CoupleLabel>커플 상대</S.CoupleLabel>
          <S.UserCard isCouple>
            <S.UserImage src={Avatar1} alt="프로필" />
            <S.UserInfo>
              <S.UserName>너도 아라를 아라?</S.UserName>
              <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                <S.UserTag isCouple>
                  <S.InfoText
                    style={{ fontSize: "12px", lineHeight: "normal" }}
                  >
                    ENFP
                  </S.InfoText>
                </S.UserTag>
                <S.UserTag isCouple>
                  <S.InfoText
                    style={{ fontSize: "12px", lineHeight: "normal" }}
                  >
                    영화광
                  </S.InfoText>
                </S.UserTag>
              </div>
            </S.UserInfo>
            <img
              src={MessageCircleIcon}
              alt="메시지"
              style={{ width: "24px", height: "24px", cursor: "pointer" }}
            />
          </S.UserCard>
        </S.CoupleSection>

        <S.CoupleSection>
          <S.OtherLabel>
            <S.OtherTitle>다른 참가자</S.OtherTitle>
            <S.OtherCount>{otherUsers.length}</S.OtherCount>
          </S.OtherLabel>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "100%",
            }}
          >
            {otherUsers.map((user) => (
              <S.UserCard key={user.id}>
                <S.UserImage src={user.avatar} alt="프로필" />
                <S.UserInfo>
                  <S.UserName>{user.name}</S.UserName>
                  <div
                    style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}
                  >
                    {user.tags.map((tag, index) => (
                      <S.UserTag key={index}>
                        <S.InfoText
                          style={{ fontSize: "12px", lineHeight: "normal" }}
                        >
                          {tag}
                        </S.InfoText>
                      </S.UserTag>
                    ))}
                  </div>
                </S.UserInfo>
                <img
                  src={MessageCircleFilledIcon}
                  alt="메시지"
                  style={{
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                    opacity: user.hasMessage ? 0.5 : 1,
                  }}
                />
              </S.UserCard>
            ))}
          </div>
        </S.CoupleSection>
      </div>
    </S.ChatContainer>
  );
};

export default ChatListPage;
