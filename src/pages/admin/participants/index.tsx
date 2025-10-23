import React from "react";
import CoupleListLayout from "../../../components/CoupleListLayout";
import { mockCouples } from "../../../data/mockCouples";

const AdminParticipantsPage: React.FC = () => {
  return (
    <CoupleListLayout
      title="참가자들"
      sectionTitle="커플 목록"
      couples={mockCouples}
    />
  );
};

export default AdminParticipantsPage;
