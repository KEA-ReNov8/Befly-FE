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
                {isCodeConfirmed && <SuccessText>✔ 확인되었습니다.</SuccessText>}
                <Password type="password" placeholder="새 비밀번호 입력" />
                <PasswordCheck type="password" placeholder="비밀번호 확인" />
            </Input>
            <SubmitButton onClick={handleSubmit}>초기화</SubmitButton>
        </Container>
    )
}

const Container = styled.form`
    display: flex;
    flex-direction: column;
    width: 24.375rem;
    height: 100%;
    align-items: center;
    border: 1px solid ${theme.colors.gray[500]};
    border-radius: 1rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 100px;
    padding-bottom: 20px;
`;

const Title = styled.h2`
    color: ${theme.colors.green.main};
    font-size: ${theme.fontSize.medium};
    font-family: ${theme.fontFamily.pretendard};
    margin-top: 1.5rem;
    margin-right: 5rem;
`;

const Input = styled.div`
    display: flex;
    position: relative;
    width: 335.7px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;
    gap: 1rem;
`;

const EmailContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1rem;
    border: 1px solid ${theme.colors.gray[500]};
    border-radius: 5px;
`;

const Email = styled.input`
    flex: 1;
    width: 100%;
    padding: 0.7rem 1rem;
    border: none;
    font-size: 1rem;
    font-family: ${theme.fontFamily.pretendard};
    
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
    border-radius: 5px;
    margin-right: 10px;
    font-family: ${theme.fontFamily.pretendard};
    background-color: ${theme.colors.green.main};
    color: ${theme.colors.other.white};

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
    border: 1px solid ${theme.colors.gray[500]};
    border-radius: 5px;
`;

const CheckCode = styled.input`
    flex: 1;
    padding: 0.7rem 1rem;
    border: none;
    font-size: 1rem;
    font-family: ${theme.fontFamily.pretendard};

    &:focus {
        outline: none;
        border-color: ${theme.colors.green.main};
    }
`;

const CheckButton = styled.button`
    width: 66px;
    height: 30px;
    margin-right: 10px;
    background-color: ${theme.colors.green.main};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${theme.colors.green.hover};
    }
`;

const Password = styled.input`
    flex: 1;
    width: 100%;
    width: 100%;
    padding: 0.7rem 1rem;
    border: 1px solid ${theme.colors.gray[500]};
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: ${theme.colors.green.main};
    }
`;

const PasswordCheck = styled.input`
    flex: 1;
    width: 100%;
    width: 100%;
    padding: 0.7rem 1rem;
    border: 1px solid ${theme.colors.gray[500]};
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: ${theme.colors.green.main};
    }
`;

const SubmitButton = styled.button`
    width: 335.7px;
    height: 40px;
    padding 1rem;
    margin-top: 1.5rem;
    background-color: ${theme.colors.green.main};
    font-size: 1rem;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;

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
