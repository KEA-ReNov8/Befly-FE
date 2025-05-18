import styled from 'styled-components';
import Chat from '@chat/components/Chat';

export const ChatPage = () => {
    return (
        <Wrapper>
            <></>
            <Chat/>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1440px;
    height: 1024px;
    margin: 0 auto;
`;
