import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SideBar from '@chat/components/SideBar';
import ProgressBar from '@chat/components/ProgressBar';
import ChatMessage from '@chat/components/ChatMessage';
import ChatForm from '@chat/components/ChatForm';
import ChatMenu from '@shared/assets/icons/ChatMenuicon.svg';
import aiLogo from '../../../../public/favicon.svg';
import theme from '@app/styles/theme';
import SuspendModal from '@chat/components/SuspendModal';
import SuccessModal from '@chat/components/SuccessModal';
import { useSendChatMutation } from '@chat/feature/hooks/mutate/useSendChatMutation';
import { sendChat } from '@chat/feature/utils/sendChat';
//import { useChatStore } from '@chat/feature/store/useChatStore';
import { useChatHistoryQuery } from '@chat/feature/hooks/query/useChatHistoryQuery';
import { useLocation, useParams } from 'react-router-dom';

const Chat = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const messageListRef = useRef(null);

  const location = useLocation();
  const params = useParams();

  /*const {
    currentSessionId,
    setCurrentSessionId,
    progress,
    incrementProgress,
  } = useChatStore();*/
  useEffect (() => {
    if (params.sessionId) {
      setCurrentSessionId(params.sessionId);
      return;
    }

    const pathParts = location.pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    if (lastPart !== 'chat') {
      setCurrentSessionId(lastPart);
    }
  }, [location.pathname, params.sessionId]);

  const { data: chatHistoryData, error: historyError } = useChatHistoryQuery(
    currentSessionId, !!currentSessionId
  );

  // 채팅 내역을 메시지 형태로 변환하는 함수
  const convertApiMessagesToState = (apiMessages) => {
    if (!apiMessages || !Array.isArray(apiMessages)) return [];

    return apiMessages.map((msg, index) => {
      let cleanedContent = msg.content;
      
      // AI 메시지의 경우 "AI:" 접두사와 ** 마크다운 문자 제거
      if (msg.type === 'ai') {
        cleanedContent = msg.content.replace(/^AI:\s*/, '').replace(/\*\*/g, '');
      }

      return {
        id: index + 1,
        text: cleanedContent,
        isUser: msg.type === 'human',
        timestamp: new Date(),
      };
    })
  };

  // 채팅 내역 로드 완료 시 메시지 설정
  useEffect(() => {
    if (chatHistoryData?.result?.messages && Array.isArray(chatHistoryData.result.messages) && chatHistoryData.result.messages.length > 0) {
      const convertedMessages = convertApiMessagesToState(chatHistoryData.result.messages);
      setMessages(convertedMessages);
      
      // 프로그레스 계산 (AI 메시지 개수 * 10, 최대 100)
      const aiMessageCount = chatHistoryData.result.messages.filter(msg => msg.type === 'ai').length;
      setProgress(Math.min(aiMessageCount * 10, 100));
    }
    // chatHistoryData가 있지만 messages가 비어있는 경우는 무시 (새로운 세션이므로 초기 메시지 유지)
  }, [chatHistoryData]);

  // 새로운 채팅 세션인 경우 초기 메시지 설정
  /*useEffect(() => {
    if (!currentSessionId) {
      setMessages([
        {
          id: 1,
          text: '안녕하세요 저는 나래입니다. 고민이 있으시면 언제든지 물어보세요. 제가 도와드리겠습니다.',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      setProgress(0);
    }
  }, [currentSessionId]);*/

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

  const handleProgressChange = (currentProgress) => {};

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleChatSuccess = (aiResponse, fullResponse) => {
    // "AI:" 접두사와 ** 마크다운 문자 제거
    const cleanedResponse = aiResponse.replace(/^AI:\s*/, '').replace(/\*\*/g, '');
    
    const aiMessage = {
      id: messages.length + 1,
      text: cleanedResponse,
      isUser: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiMessage]);

    setProgress(prev => Math.min(prev + 10, 100));

    setIsLoading(false);
  };

  const handleChatError = (error) => {
    console.error('채팅 전송 실패:', error);
  };

  const sendChatMutation = useSendChatMutation(handleChatSuccess, handleChatError); 

  const handleSendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);

    const userMessage = {
      id: messages.length + 1,
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      await sendChat(text, currentSessionId, sendChatMutation);
    } catch (error) {
      console.error('채팅 전송 실패:', error);
      setIsLoading(false);
    }
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
            <ProgressBar progress={progress} onProgressChange={handleProgressChange} />
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
          {isLoading && (
            <LoadingMessage>
              <ProfileMark src={aiLogo} />
              <LoadingBubble>
                <LoadingDots>
                  <Dot />
                  <Dot />
                  <Dot />
                </LoadingDots>
              </LoadingBubble>
            </LoadingMessage>
          )}
        </MessageList>
        <ChatForm onSendMessage={handleSendMessage} isLoading={isLoading} />
        </MessageContainer>
      </ChatContainer>
      {isSuspendModalOpen && <SuspendModal onClose={handleSuspendModalClose} />}
      {isSuccessModalOpen && <SuccessModal onClose={handleSuccessModalClose} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 1440px;
  height: 830px;
  position: relative;
  overflow: hidden;
  background-color: ${theme.colors.other.white};
  border-top: 1px solid ${theme.colors.gray[400]};
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MenuButtonContainer = styled.div`
  position: absolute;
  margin-top: 45px;
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
  margin-left: ${(props) => (props['data-sidebarOpen'] ? '310px' : '0')};
`;

const TopContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.green.main};
  padding-top: 10px;
  margin-bottom: 30px;
`;

const SuspendButton = styled.button`
  position: absolute;
  margin-bottom: 10px;
  left: 90%;
  width: 98px;
  height: 38px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  color: ${theme.colors.other.white};
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.medium};
  background-color: ${theme.colors.red[400]};

  &:hover {
    background-color: ${theme.colors.red[600]};
  }
`;

const FinishButton = styled.button`
  position: absolute;
  margin-bottom: 10px;
  left: 90%;
  width: 98px;
  height: 38px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  color: ${theme.colors.other.white};
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.medium};
  background-color: ${theme.colors.green.main};

  &:hover {
    background-color: ${theme.colors.green.hover};
  }
`;

const MessageContainer = styled.div`  display: flex;
  flex-direction: column;
  height: 770px;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scroll-behavior: smooth;
`;

const LoadingMessage = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 16px;
`;

const ProfileMark = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
`;

const LoadingBubble = styled.div`
  background-color: ${theme.colors.green.main};
  padding: 16px;
  border-radius: 8px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 12px;
    left: -7px;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid ${theme.colors.green.main};
  }
`;

const LoadingDots = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${theme.colors.other.white};
  border-radius: 50%;
  animation: blink 1.4s infinite both;

  &:nth-child(1) {
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes blink {
    0%, 80%, 100% {
      opacity: 0.3;
      transform: scale(0.8);
    }
    40% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export default Chat;

