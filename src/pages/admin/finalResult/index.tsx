import React from "react";
import CoupleListLayout from "../../../components/CoupleListLayout";
import { mockCouples } from "../../../data/mockCouples";

const AdminFinalResultPage: React.FC = () => {
  return (
    <CoupleListLayout
      title="매칭 결과"
      sectionTitle="커플 목록"
      couples={mockCouples}
    />
  );
};

export default AdminFinalResultPage;