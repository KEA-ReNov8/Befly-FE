import styled from 'styled-components';
import theme from '@app/styles/theme';
import aiLogo from '../../../../public/favicon.svg';

const ChatMessage = ( {message} ) => {
    const { text, isUser } = message;

    return (
        <Container data-isUser={isUser}>
            {!isUser && <ProfileMark src={aiLogo} />}
            <MessageBubble data-isUser={isUser}>
                { text }
            </MessageBubble>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: ${(props) => (props['data-isUser'] ? 'flex-end' : 'flex-start')}; 
    gap: 10px;
    margin-bottom: 16px;
`;

const ProfileMark = styled.img`
    width: 52px;
    height: 52px;
    border-radius: 50%;
    object-fit: cover;
`;

const MessageBubble = styled.div`
  white-space: pre-wrap;
  position: relative;
  max-width: 70%;
  padding: 16px 16px;
  border-radius: 8px;
  border:none;
  word-wrap: break-word;
  line-height: 1.5;
  background-color: ${(props) => (props['data-isUser'] ? theme.colors.gray[300] : theme.colors.green.main)};
  color: ${(props) => (props['data-isUser'] ? theme.colors.black : theme.colors.other.white)};

  &::after {
    content: '';
    position: absolute;
    top: 12px;
    ${(props) =>
      props['data-isUser']
        ? `
      right: -8px;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid ${theme.colors.gray[300]};
    `
        : `
      left: -7px;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 8px solid ${theme.colors.green.main};
    `}
  }
`;

export default ChatMessage;
