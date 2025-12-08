import React from "react";
import * as S from "./style.ts";
import { useNavigate } from "react-router-dom";
import Heart from "../../assets/icon/heart.svg";
import AdminNavBar from "../AdminNavBar";
import PageHeader from "../PageHeader";
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

      <PageHeader title={title} backgroundColor="#FFC6B6" />

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
