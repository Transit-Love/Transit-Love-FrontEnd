import styled from "@emotion/styled";
import React from "react";

const Card = styled.div`
  width: 342px;
  background: #dfd1ea;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: 100;
`;

interface InfoCardProps {
  icon?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  children,
}) => (
  <Card>
    {icon}
    {title && <div style={{ fontWeight: 600 }}>{title}</div>}
    {children}
  </Card>
);
