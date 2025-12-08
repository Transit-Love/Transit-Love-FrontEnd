import React from "react";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "../../../components/AdminNavBar";
import PageHeader from "../../../components/PageHeader";

const AdminMessagesPage: React.FC = () => {
  const navigate = useNavigate();

  const messages = [
    {
      id: 1,
      from: "에빈니",
      to: "승찬니",
      time: "23:15",
      content: "오늘 하루 정말 즐거웠어요. 내일도 이야기 나눠요",
    },
    {
      id: 2,
      from: "나도 연애하고 싶다",
      to: "민주핑",
      time: "23:28",
      content: "당신과 대화하면서 정말 많이 웃었어요. 고마워요",
    },
    {
      id: 3,
      from: "너도 아라를 아라?",
      to: "사진작가 이효준",
      time: "23:29",
      content: "대화 나눈 시간이 짧아 아쉽네요..ㅠ",
    },
    {
      id: 4,
      from: "효준핑",
      to: "민주핑",
      time: "23:31",
      content: "내꺼하자",
    },
    {
      id: 5,
      from: "온니온니허온니",
      to: "에빈니",
      time: "23:41",
      content: "실제로 만나 대화하고 싶다는 생각은 처음이였어요 ^^",
    },
  ];

  return (
    <S.Container>
      <S.BackgroundImage />

      <PageHeader title="속마음 문자들" backgroundColor="#FFC6B6" />

      <S.StatusIcons />
      <S.TimeDisplay />

      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>속마음 문자 목록</S.SectionTitle>
        </S.SectionHeader>

        <S.MessageList>
          {messages.map((m) => (
            <S.MessageCard key={m.id}>
              <S.MessageHeader>
                <S.MessageTitle>{`${m.from} → ${m.to}`}</S.MessageTitle>
                <S.MessageTime>{m.time}</S.MessageTime>
              </S.MessageHeader>
              <S.MessageContent>{m.content}</S.MessageContent>
            </S.MessageCard>
          ))}
        </S.MessageList>
      </S.Section>

      <AdminNavBar />
    </S.Container>
  );
};

export default AdminMessagesPage;
