import styled from "@emotion/styled";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fab0b8 0%, #ffd4d8 100%);
  padding: 20px;
`;

export const Content = styled.div`
  text-align: center;
  background: white;
  border-radius: 24px;
  padding: 60px 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

export const ErrorCode = styled.h1`
  font-size: 120px;
  font-weight: 900;
  color: #fab0b8;
  margin: 0;
  line-height: 1;
  text-shadow: 4px 4px 0px rgba(250, 176, 184, 0.2);
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 24px 0 16px 0;
`;

export const Description = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 40px 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const HomeButton = styled.button`
  padding: 14px 32px;
  background-color: #fab0b8;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f89ca6;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(250, 176, 184, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const BackButton = styled.button`
  padding: 14px 32px;
  background-color: white;
  color: #fab0b8;
  border: 2px solid #fab0b8;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff0f0;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(250, 176, 184, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;
