import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useState, useRef, useEffect } from 'react';

const ChatForm = ( { onSendMessage, isLoading = false }) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        e && e.preventDefault();
        if (message.trim() && !isLoading) {
          onSendMessage(message);
          setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.isComposing) return;
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
                <TextArea 
                ref={textareaRef} 
                value={message} 
                //placeholder={isLoading ? "AI가 응답 중입니다..." : "나래에게 마음을 털어놔요..."}
                placeholder="나래에게 마음을 털어놔요..."
                onKeyDown={handleKeyDown} 
                onChange={(e) => setMessage(e.target.value)} 
                rows={1} 
                //disabled={isLoading}
                />
            </InputContainer>
            <SendButton 
            type="button" 
            disabled={!message.trim() || isLoading} 
            onClick={handleSubmit}
            >
                {isLoading ? '...' : '↑'}
            </SendButton>
        </Container>
    );
};

const Container = styled.form`
    display: flex;
    height: 170px;
    align-items:flex-end;
    padding: 30px;
    gap: 20px;
    position: sticky;
    bottom: 0;
    z-index: 10;
    background-color: transparent;
`;

const InputContainer = styled.div`
    width: 100%;
    height: auto;
    min-height: 80px;
    max-height: 200px;
    display: flex;
    justify-content: center;
    padding: 16px;
    border-radius: 15px;
    border: 1px solid ${theme.colors.gray[500]};
    background-color: white;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const TextArea = styled.textarea`
    flex: 1;
    width: 100%;
    border: none;
    outline: none;
    resize: none;
    overflow-y: auto;
    line-height: 1.5;
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.regular};
    color: ${theme.colors.black};
    background-color: transparent;

    max-height: calc(1.5em * 4); // 최대 4줄
    min-height: calc(1.5em * 1); // 최소 1줄
    height: auto;

    &::placeholder {
        color: ${theme.colors.gray[600]};
    }
    
   /* &:disabled {
        color: ${theme.colors.gray[600]};
        cursor: not-allowed;
    }
    */
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
    background-color: ${theme.colors.green.main};
    font-size: ${theme.fontSize.lg};
    font-weight: ${theme.fontWeight.semibold};
    color: ${theme.colors.other.white};

    &:hover {
        background-color: ${theme.colors.green.hover};
    }
`;

export default ChatForm;
