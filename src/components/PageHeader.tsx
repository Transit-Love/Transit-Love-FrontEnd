import React from "react";
import styled from "@emotion/styled";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backgroundColor?: string;
  onBackClick?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showBackButton = true,
  backgroundColor = "#fab0b8",
}) => {
  return (
    <HeaderContainer backgroundColor={backgroundColor}>
      <HeaderContent>
        <HeaderTitle hasBackButton={showBackButton}>{title}</HeaderTitle>
      </HeaderContent>
      {subtitle && (
        <SubtitleSection>
          <SubtitleText>{subtitle}</SubtitleText>
        </SubtitleSection>
      )}
    </HeaderContainer>
  );
};

export default PageHeader;

const HeaderContainer = styled.div<{ backgroundColor: string }>`
  display: flex;
  width: 100%;
  max-width: 390px;
  padding: 42px 24px 16px 24px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  background: ${({ backgroundColor }) => backgroundColor};
  margin: 0 auto;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  display: flex;
  height: 28px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  align-self: stretch;
  position: relative;
`;

const HeaderTitle = styled.span<{ hasBackButton: boolean }>`
  color: #fff;
  font-family: "Ownglyph PDH";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 21.6px;
  text-align: center;
`;

const SubtitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

const SubtitleText = styled.span`
  color: #fff;
  font-family: "Ownglyph PDH";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16.8px;
  text-align: center;
`;
