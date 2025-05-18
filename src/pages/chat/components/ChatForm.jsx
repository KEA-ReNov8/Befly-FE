import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useState, useRef, useEffect } from 'react';

const ChatForm = ( { onSendMessage }) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        e && e.preventDefault();
        if (message.trim()) {
          onSendMessage(message);
          setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault(); // 줄바꿈 방지
          handleSubmit(e);
        }
      };

    useEffect(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
      }, [message]);
    
    return (
        <Container onSubmit={handleSubmit}>
            <InputContainer>
                <TextArea ref={textareaRef} value={message} placeholder="나래에게 마음을 털어놔요..." 
                onKeyDown={handleKeyDown} onChange={(e) => setMessage(e.target.value)} rows={1} />
            </InputContainer>
            <SendButton type="button" disabled={!message.trim()} onClick={handleSubmit}>↑</SendButton>
        </Container>
    );
};

const Container = styled.form`
    display: flex;
    align-items:flex-end;
    padding: 30px;
    gap: 20px;
`;

const InputContainer = styled.div`
    width: 100%;
    height: 110px;
    display: flex;
    justify-content: center;
    padding: 16px;
    border-radius: 15px;
    border: 1px solid ${theme.colors.gray[500]};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    background-color: white;
`;

const TextArea = styled.textarea`
    flex: 1;
    max-width: 100%;
    border: none;
    outline: none;
    resize: none;
    overflow: hidden;
    line-height: 1.1;
    max-height: 200px;

    background-color: transparent;
    font-size: ${theme.fontSize.small};
    color: ${theme.colors.black};
    
    &::placeholder {
        color: ${theme.colors.gray[400]};
    }
`;

const SendButton = styled.button`
    width: 56px;
    height: 56px;
    cursor: pointer;
    border: none;
    flex-shrink: 0;
    opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    border-radius: 50%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    background-color: ${theme.colors.green.main};
    font-size: ${theme.fontSize.large};
    color: white;

    &:hover {
        background-color: ${theme.colors.green.hover};
    }
`;

export default ChatForm;
