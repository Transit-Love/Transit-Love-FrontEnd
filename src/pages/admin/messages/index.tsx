import React from "react";
import * as S from "./style";
import AdminNavBar from "../../../components/AdminNavBar";
import PageHeader from "../../../components/PageHeader";
import Loading from "../../../components/Loading";
import { useAdminHeartMessages } from "../../../hooks/useAdminQueries";

const AdminMessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useAdminHeartMessages();

  const messages = data?.messages || [];
  const totalMessages = data?.totalMessages || 0;

  // 시간 포맷팅
  const formatTime = (sentAt: string) => {
    const date = new Date(sentAt);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // 로딩 중
  if (isLoading) {
    return (
      <S.Container>
        <div style={{ 
          width: "100%", 
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Loading message="속마음 문자를 불러오는 중..." />
        </div>
      </S.Container>
    );
  }

  // 에러 발생
  if (error) {
    let errorMessage = "오류가 발생했습니다";
    
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    // API 에러 응답 처리
    if ((error as any).response) {
      const status = (error as any).response.status;
      if (status === 403) {
        errorMessage = "접근 권한이 없습니다. (ADMIN 권한 필요)";
      } else if (status === 401) {
        errorMessage = "인증이 필요합니다. 다시 로그인해주세요.";
      }
    }
    
    return (
      <S.Container>
        <S.BackgroundImage />
        <PageHeader title="속마음 문자들" backgroundColor="#FFC6B6" />
        <div style={{ 
          padding: "40px 24px", 
          textAlign: "center", 
          color: "#e74c3c",
          fontSize: "14px"
        }}>
          {errorMessage}
        </div>
        <AdminNavBar />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.BackgroundImage />

      <PageHeader title="속마음 문자들" backgroundColor="#FFC6B6" />

      <S.StatusIcons />
      <S.TimeDisplay />

      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>속마음 문자 목록 ({totalMessages})</S.SectionTitle>
        </S.SectionHeader>

        <S.MessageList>
          {messages.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
              아직 속마음 문자가 없습니다.
            </div>
          ) : (
            messages.map((m) => (
              <S.MessageCard key={m.id}>
                <S.MessageHeader>
                  <S.MessageTitle>
                    {m.senderProfile.nickname} → {m.receiverProfile.nickname}
                  </S.MessageTitle>
                  <S.MessageTime>{formatTime(m.sentAt)}</S.MessageTime>
                </S.MessageHeader>
                <S.MessageContent>{m.content}</S.MessageContent>
              </S.MessageCard>
            ))
          )}
        </S.MessageList>
      </S.Section>

      <AdminNavBar />
    </S.Container>
  );
};

export default AdminMessagesPage;
