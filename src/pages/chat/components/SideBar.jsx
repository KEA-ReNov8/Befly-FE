import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import ChatMenu from '@shared/assets/icons/ChatMenuicon.svg';
import SideBarButton from '@chat/components/SideBarButton';
import { useChatSessionListQuery } from '@chat/feature/hooks/query/useChatSessionListQuery';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const SideBar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { sessionId: currentSessionId } = useParams();
    const location = useLocation();

    // 현재 세션 ID 추출 (URL에서)
    const getCurrentSessionId = () => {
        if (currentSessionId) return currentSessionId;
        
        const pathParts = location.pathname.split('/');
        const lastPart = pathParts[pathParts.length - 1];
        return lastPart !== 'chat' ? lastPart : null;
    };

    const activeSessionId = getCurrentSessionId();

    const { data: chatList, error, isLoading } = useChatSessionListQuery('true', isOpen);

    const chatSessions = chatList?.result || [];

    // 채팅 세션을 생성 날짜 기준 최신 순으로 정렬
    const sortedChatSessions = [...chatSessions].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA; // 최신 순으로 정렬
    });

    const handleChatClick = (sessionId) => {
        navigate(`/chat/${sessionId}`);
    };

    return (
        <SideBarContainer data-isOpen={isOpen}>
            <SideBarHeader>
                <MenuButton onClick={onClose}>
                    <img src={ChatMenu} alt="close" />
                </MenuButton>
            </SideBarHeader>
            <SideBarContent>
                {sortedChatSessions.map((session) => (
                    <SideBarButton
                        key={session.session_id}
                        sessionId={session.session_id}
                        title={session.chat_title}
                        status={session.status}
                        category={session.category}
                        active={session.session_id === activeSessionId}
                        onClick={() => handleChatClick(session.session_id)}
                    />
                ))}
            </SideBarContent>
        </SideBarContainer>
    );
};

const SideBarContainer = styled.div`
    width: 310px;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${theme.colors.gray[400]};
    background-color: ${theme.colors.other.white};
        ::-webkit-scrollbar {
        display: none;
    }
`;

const SideBarHeader = styled.div`
    height: 120px;
    display: flex;
    align-items: center;
`;

const MenuButton = styled.button`
    padding-left: 30px;
    background: none;
    border: none;
    cursor: pointer;
`;

const SideBarContent = styled.div`
    flex: 1;
    overflow-y: auto;
    list-style: none;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 3px;
`;

export default SideBar;
