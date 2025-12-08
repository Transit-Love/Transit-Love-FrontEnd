import styled from "@emotion/styled";

export const ChatPageWrapper = styled.div`
  width: 100%;
  max-width: 390px;
  height: 100vh;
  background: #f9fafb;
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media (min-width: 391px) {
    background: #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
`;

export const ChatPageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ChatHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 24px 24px 16px 24px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background: var(--Color-2, #ffc6b6);
  flex-shrink: 0;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
`;

export const UserInfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const BackButton = styled.img`
  width: 7px;
  height: 14px;
  cursor: pointer;
`;

export const Avatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  object-fit: cover;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: #fff;
  font-family: "Ownglyph PDH";
  font-style: normal;
`;

export const UserName = styled.p`
  font-size: 20px;
  font-weight: 400;
  line-height: 19.2px;
  margin: 0;
`;

export const OnlineStatus = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 14.4px;
  opacity: 0.8;
  margin: 0;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ActionIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  flex: 1;
  padding: 16px;
  overflow-y: auto;

  /* 스크롤바 숨김 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export const DateDivider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const DateBadge = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.06);
`;

export const DateText = styled.p`
  color: #6b7280;
  font-family: "Pretendard";
  font-size: 12px;
  font-weight: 500;
  line-height: 14.4px;
  margin: 0;
`;

export const MessageRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  width: 100%;
`;

export const MessageRowRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;

export const SmallAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  object-fit: cover;
`;

export const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 240px;
`;

export const MessageBubble = styled.div`
  display: inline-flex;
  align-items: flex-start;
  padding: 12px 16px;
  background: #fff;
  border-radius: 16px;
  border-top-left-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
  width: fit-content;
  max-width: 240px;
`;

export const MessageBubbleSent = styled.div`
  display: inline-flex;
  align-items: flex-start;
  padding: 12px 16px;
  background: var(--Color-2, #ffc6b6);
  border-radius: 16px;
  border-top-right-radius: 4px;
  width: fit-content;
  max-width: 240px;
`;

export const MessageText = styled.p`
  color: #000;
  font-family: "Ownglyph PDH";
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
  margin: 0;
  word-break: break-word;
  white-space: pre-wrap;
`;

export const MessageTextSent = styled.p`
  color: #fff;
  font-family: "Ownglyph PDH";
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
  margin: 0;
  word-break: break-word;
  white-space: pre-wrap;
`;

export const TimeStamp = styled.p`
  color: #9ca3af;
  font-family: "Pretendard";
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  margin: 0;
`;

export const TimeStampRight = styled.p`
  color: #9ca3af;
  font-family: "Pretendard";
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  text-align: right;
  margin: 0;
`;

export const TypingBubble = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  background: #fff;
  border-radius: 16px;
  border-top-left-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
`;

export const TypingDots = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const Dot = styled.div`
  width: 6px;
  height: 6px;
  background: #9ca3af;
  border-radius: 3px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px;
  background: #fff;
  border-top: 1px solid #e5e7eb;
  flex-shrink: 0;
  margin-bottom: 67px;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
  height: 56px;
`;

export const TextInputWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 48px;
  padding: 16px;
  align-items: center;
  gap: 8px;
  border-radius: 24px;
  border: 1px solid #e5e7eb;
  background: #f1f5f9;
`;

export const TextInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  color: #9ca3af;
  font-family: "Ownglyph PDH";
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
  outline: none;

  &::placeholder {
    color: #9ca3af;
  }
`;

export const PlusIcon = styled.img`
  width: 12px;
  height: 12px;
  cursor: pointer;
`;

export const SendButton = styled.div`
  display: flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  background: var(--Color-2, #ffc6b6);
  cursor: pointer;
`;

export const SendIcon = styled.img`
  width: 20px;
  height: 20px;
`;
