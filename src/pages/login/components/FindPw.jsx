import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const FindPw = ( ) => {

    const [timeLeft, setTimeLeft] = useState(180); // 3분 = 180초
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/');
    }

    const handleSendCode = () => {
        setIsCodeSent(true);
        setIsCodeConfirmed(false);
        setTimeLeft(180); // 다시 3분으로 리셋
    
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const formatTime = (seconds) => {
        const min = String(Math.floor(seconds / 60)).padStart(1, '0');
        const sec = String(seconds % 60).padStart(2, '0');
        return `${min}:${sec}`;
    };

    const handleConfirmCode = () => {
        setIsCodeConfirmed(true);
    };

    return (
        <Container>
            <Title>비밀번호를 초기화합니다.</Title>
            <Input>
                <EmailContainer>
                    <Email type="email" placeholder="이메일"/>
                    <SendButton onClick={handleSendCode}>코드전송</SendButton>
                </EmailContainer>
                {isCodeSent && (
                <TimerText>{timeLeft > 0 ? `남은 시간: ${formatTime(timeLeft)}` : '인증 시간이 만료되었습니다.'}</TimerText>
                )}
                <CheckCodeContainer>
                    <CheckCode type="text" placeholder="인증코드"/>
                    <CheckButton onClick={handleConfirmCode}>코드확인</CheckButton>
                </CheckCodeContainer>
                {isCodeConfirmed && <SuccessText>확인되었습니다.</SuccessText>}
                <Password type="password" placeholder="새 비밀번호 입력" />
                <PasswordCheck type="password" placeholder="비밀번호 확인" />
            </Input>
            <SubmitButton onClick={handleSubmit}>초기화</SubmitButton>
        </Container>
    )
}

const Container = styled.form`
    width: 390px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-items: center;
    border: 1px solid ${theme.colors.gray.main};
    border-radius: 8px;
    margin-bottom: 100px;
    padding-bottom: 20px;
    gap: 1rem;
`;

const Title = styled.h2`
    color: ${theme.colors.green.main};
    font-size: ${theme.fontSize.xl};
    font-weight: ${theme.fontWeight.semibold};
    margin-top: 30px;
    margin-right: 80px;
    margin-bottom: 15px;
`;

const Input = styled.div`
    width: 335.7px;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

const EmailContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1rem;
    border: 1px solid ${theme.colors.gray.main};
    border-radius: 8px;
`;

const Email = styled.input`
    flex: 1;
    width: 100%;
    padding: 0.7rem 1rem;
    border: none;
    border-radius: 8px;
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.other.black};
    
    &:focus {
        outline: none;
        border-color: ${theme.colors.green.main};
    }
`;

const SendButton = styled.button`
    width: 66px;
    height: 30px;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    margin-right: 10px;
    font-size: ${theme.fontSize.smMd};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.other.white};
    background-color: ${theme.colors.green.main};

    &:hover {
        background-color: ${theme.colors.green.hover};
    }
`;

const CheckCodeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1rem;
    border: 1px solid ${theme.colors.gray.main};
    border-radius: 8px;
`;

const CheckCode = styled.input`
    flex: 1;
    width: 100%;
    padding: 0.7rem 1rem;
    border: none;
    border-radius: 8px;
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.other.black};
    
    &:focus {
        outline: none;
        border-color: ${theme.colors.green.main};
    }
`;

const CheckButton = styled.button`
    width: 66px;
    height: 30px;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    margin-right: 10px;
    font-size: ${theme.fontSize.smMd};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.other.white};
    background-color: ${theme.colors.green.main};

    &:hover {
        background-color: ${theme.colors.green.hover};
    }
`;

const Password = styled.input`
    flex: 1;
    width: 100%;
    padding: 0.7rem 1rem;
    border: 1px solid ${theme.colors.gray.main};
    border-radius: 8px;
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.other.black};
    
    &:focus {
        outline: none;
        border-color: ${theme.colors.green.main};
    }
`;

const PasswordCheck = styled.input`
    flex: 1;
    width: 100%;
    padding: 0.7rem 1rem;
    border: 1px solid ${theme.colors.gray.main};
    border-radius: 8px;
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.other.black};
    
    &:focus {
        outline: none;
        border-color: ${theme.colors.green.main};
    }
`;

const SubmitButton = styled.button`
    width: 335.7px;
    height: 40px;
    background-color: ${theme.colors.green.main};
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.other.white};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: ${theme.colors.green[80]};
    }
`;

const TimerText = styled.div`
    font-size: 0.9rem;
    color: ${theme.colors.gray[600]};
    margin-top: 0.3rem;
    align-self: flex-start;
    padding-left: 0.2rem;
`;

const SuccessText = styled.div`
    font-size: 0.9rem;
    color: ${theme.colors.green.main};
    margin-top: 0.3rem;
    align-self: flex-start;
    padding-left: 0.2rem;
`;

export default FindPw;
