import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Content>
        <S.ErrorCode>404</S.ErrorCode>
        <S.Title>페이지를 찾을 수 없습니다</S.Title>
        <S.Description>
          요청하신 페이지가 존재하지 않거나
          <br />
          이동되었을 수 있습니다.
        </S.Description>
        <S.ButtonGroup>
          <S.HomeButton onClick={() => navigate("/profile")}>
            홈으로 가기
          </S.HomeButton>
          <S.BackButton onClick={() => navigate(-1)}>
            이전 페이지로
          </S.BackButton>
        </S.ButtonGroup>
      </S.Content>
    </S.Container>
  );
};

export default NotFoundPage;
