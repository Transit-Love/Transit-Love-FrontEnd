import React from 'react';
import * as S from './style.tsx';
import { useNavigate } from 'react-router-dom';
import Back from '../../../assets/back.png';
import Heart from '../../../assets/icon/heart.svg';

const AdminParticipantsPage: React.FC = () => {
  const navigate = useNavigate();

  const couples = [
    {
      id: 1,
      leftName: '온니온니허온니',
      rightName: '너도 아라를 아라?',
      leftAvatar: '/src/assets/icon/avatar1.png',
      rightAvatar: '/src/assets/icon/avatar2.png',
    },
    {
      id: 2,
      leftName: '사진작가 이효준',
      rightName: '나도 연애하고 싶다',
      leftAvatar: '/src/assets/icon/avatar3.png',
      rightAvatar: '/src/assets/icon/avatar4.png',
    },
    {
      id: 3,
      leftName: '에빈니',
      rightName: '승찬니',
      leftAvatar: '/src/assets/icon/avatar2.png',
      rightAvatar: '/src/assets/icon/avatar3.png',
    },
    {
      id: 4,
      leftName: '민주핑',
      rightName: '효준핑',
      leftAvatar: '/src/assets/icon/avatar4.png',
      rightAvatar: '/src/assets/icon/avatar1.png',
    },
  ];

  return (
    <S.Container>
      <S.BackgroundImage />

      <S.Header>
        <S.NavBar>
          <S.IconButton onClick={() => navigate(-1)}>
            <img src={Back} alt="back" />
          </S.IconButton>
          <S.HeaderTitle>참가자들</S.HeaderTitle>
          <S.IconButton aria-label="filter" />
        </S.NavBar>
      </S.Header>

      <S.StatusIcons />
      <S.TimeDisplay />

      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>커플 목록</S.SectionTitle>
        </S.SectionHeader>

        <S.CoupleList>
          {couples.map((c) => (
            <S.CoupleCard key={c.id}>
              <S.CoupleRow>
                <S.Avatar src={c.leftAvatar} alt={c.leftName} />
                <S.Name>{c.leftName}</S.Name>
                <S.HeartIcon src={Heart} alt="heart" />
                <S.Avatar src={c.rightAvatar} alt={c.rightName} />
                <S.Name>{c.rightName}</S.Name>
              </S.CoupleRow>
            </S.CoupleCard>
          ))}
        </S.CoupleList>
      </S.Section>
    </S.Container>
  );
};

export default AdminParticipantsPage;