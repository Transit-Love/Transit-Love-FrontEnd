import React from "react";
import * as S from "./style.ts";
import { useNavigate } from "react-router-dom";
import Back from "../../assets/back.png";
import Heart from "../../assets/icon/heart.svg";
import AdminNavBar from "../AdminNavBar";
import type { Couple } from "../../types/couple";

interface CoupleListLayoutProps {
  title: string;
  sectionTitle?: string;
  couples: Couple[];
}

const CoupleListLayout: React.FC<CoupleListLayoutProps> = ({
  title,
  sectionTitle = "커플 목록",
  couples,
}) => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.BackgroundImage />

      <S.Header>
        <S.NavBar>
          <S.IconButton onClick={() => navigate(-1)}>
            <img src={Back} alt="back" />
          </S.IconButton>
          <S.HeaderTitle>{title}</S.HeaderTitle>
          <S.IconButton aria-label="filter" />
        </S.NavBar>
      </S.Header>

      <S.StatusIcons />
      <S.TimeDisplay />

      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>{sectionTitle}</S.SectionTitle>
        </S.SectionHeader>

        <S.CoupleList>
          {couples.map((couple) => (
            <S.CoupleCard key={couple.id}>
              <S.CoupleRow>
                <S.Avatar src={couple.leftAvatar} alt={couple.leftName} />
                <S.Name>{couple.leftName}</S.Name>
                <S.HeartIcon src={Heart} alt="heart" />
                <S.Avatar src={couple.rightAvatar} alt={couple.rightName} />
                <S.Name>{couple.rightName}</S.Name>
              </S.CoupleRow>
            </S.CoupleCard>
          ))}
        </S.CoupleList>
      </S.Section>

      <AdminNavBar />
    </S.Container>
  );
};

export default CoupleListLayout;
