import styled from 'styled-components';
import theme from '@app/styles/theme'
import Chat from '@chat/components/Chat';
import TobBar from '@shared/ui/TopBar/TopBar'

export const ChatPage = () => {
    return (
        <ChatContainer>
            <Wrapper>
                <TobBar/>
                <Chat/>
            </Wrapper>
        </ChatContainer>
    );
};

const ChatContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1440px;
    margin: 0 auto;
`;
