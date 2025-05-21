import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SideBar from '@chat/components/SideBar';
import ProgressBar from '@chat/components/ProgressBar';
import ChatMessage from '@chat/components/ChatMessage';
import ChatForm from '@chat/components/ChatForm';
import ChatMenu from '@shared/assets/icons/ChatMenuicon.svg';
import theme from '@app/styles/theme';
import SuspendModal from '@chat/components/SuspendModal';
import SuccessModal from '@chat/components/SuccessModal';

const Chat = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const messageListRef = useRef(null);

  const handleSuspendModalOpen = () => {
    setIsSuspendModalOpen(true);
  };

  const handleSuccessModalOpen = () => {
    setIsSuccessModalOpen(true);
  };

  const handleSuspendModalClose = () => {
    setIsSuspendModalOpen(false);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleProgressChange = (currentProgress) => {
    setProgress(currentProgress);
  }

  //test
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '안녕하세요 저는 나래입니다. 고민이 있으시면 언제든지 물어보세요. 제가 도와드리겠습니다.',
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);

    // 챗봇 응답 시뮬레이션
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: '걱정마 잘 될거야~',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <Container>
      <ChatContainer data-sidebarOpen={isSideBarOpen}>
        <SideBarContainer data-isOpen={isSideBarOpen}>
          <SideBar isOpen={isSideBarOpen} onClose={toggleSideBar} />
        </SideBarContainer>
        <MenuButtonContainer>
          {!isSideBarOpen && (
            <MenuButton onClick={toggleSideBar}>
              <img src={ChatMenu} alt="menu" />
            </MenuButton>
          )}
        </MenuButtonContainer>
        <TopContainer>
          <Header>
            <Title>AI 메이트 나래</Title>
            <ProgressBar onProgressChange={handleProgressChange} />
          </Header>
          {progress < 100 ? (
            <SuspendButton onClick={handleSuspendModalOpen}>대화 종료</SuspendButton>
          ) : (
            <FinishButton onClick={handleSuccessModalOpen}>대화 완료</FinishButton>
          )}
        </TopContainer>
        <MessageContainer>
        <MessageList ref={messageListRef}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </MessageList>
        <ChatForm onSendMessage={handleSendMessage} />
        </MessageContainer>
      </ChatContainer>
      {isSuspendModalOpen && <SuspendModal onClose={handleSuspendModalClose} />}
      {isSuccessModalOpen && <SuccessModal onClose={handleSuccessModalClose} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 1140px;
  height: 830px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 1px solid ${theme.colors.gray[500]};
  background-color: ${theme.colors.other.white};
`;

const MenuButtonContainer = styled.div`
  position: absolute;
  top: 6%;
  left: 3%;
  z-index: 10;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 16px;
  padding: 4px;
`;

const SideBarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 10;
  transform: translateX(${(props) => (props['data-isOpen'] ? '0' : '-100%')});
  transition: transform 0.3s ease;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  transition: margin-left 0.3s ease;
  margin-left: ${(props) => (props['data-sidebarOpen'] ? '316px' : '0')};
`;

const TopContainer = styled.div`
  width: 100%;
  height: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.gray[300]};
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;
  margin-bottom: 20px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
  color: ${theme.colors.green.main};
  font-family: ${theme.fontFamily.pretendard};
  font-size: ${theme.fontSize.medium};
  padding-top: 10px;
  margin-bottom: 10px;
`;

const SuspendButton = styled.button`
  position: absolute;
  left: 90%;
  width: 98px;
  height: 38px;
  border: none;
  border-radius: 100px;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: ${theme.fontFamily.pretendard};
  background-color: ${theme.colors.red[400]};

  &:hover {
    background-color: ${theme.colors.red[600]};
  }
`;

const FinishButton = styled.button`
  position: absolute;
  left: 90%;
  width: 98px;
  height: 38px;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: white;
  font-family: ${theme.fontFamily.pretendard};
  background-color: ${theme.colors.green.main};

  &:hover {
    background-color: ${theme.colors.green.hover};
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  scroll-behavior: smooth;
`;

export default Chat;
