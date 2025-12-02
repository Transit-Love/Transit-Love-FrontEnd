import styled from "@emotion/styled";
import React from "react";

const Tag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background: var(--secondary, #ffc6b6);
  border-radius: 20px;
`;

interface KeywordTagProps {
  children: React.ReactNode;
}

export const KeywordTag: React.FC<KeywordTagProps> = ({ children }) => (
  <Tag>{children}</Tag>
);
