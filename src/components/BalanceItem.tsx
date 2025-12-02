import styled from "@emotion/styled";
import React from "react";

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8fafc;
  border: 1px solid #fab0b8;
  border-radius: 16px;
`;

interface BalanceItemProps {
  icon: string;
  category: string;
  result: string;
}

export const BalanceItem: React.FC<BalanceItemProps> = ({
  icon,
  category,
  result,
}) => (
  <Item>
    <img src={icon} alt={category} style={{ width: 24, height: 24 }} />
    <div>
      <div style={{ fontWeight: 600 }}>{category}</div>
      <div>{result}</div>
    </div>
  </Item>
);
