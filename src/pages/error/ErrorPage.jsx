import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import theme from '@app/styles/theme';

export const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Container>
            <Content>
                <ErrorIcon>😵</ErrorIcon>
                <ErrorCode>404</ErrorCode>
                <Title>페이지를 찾을 수 없습니다</Title>
                <Description>
                    요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
                    <br />
                    URL을 다시 확인해 주세요.
                </Description>
                <ButtonContainer>
                    <BackButton onClick={handleGoBack}>
                        이전 페이지
                    </BackButton>
                    <HomeButton onClick={handleGoHome}>
                        홈으로 가기
                    </HomeButton>
                </ButtonContainer>
            </Content>
        </Container>
    );
};

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, ${theme.colors.green.light} 0%, ${theme.colors.green.main} 100%);
    padding: 20px;
`;

const Content = styled.div`
    text-align: center;
    background-color: ${theme.colors.other.white};
    padding: 60px 40px;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
    animation: slideUp 0.8s ease-out;

    @keyframes slideUp {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const ErrorIcon = styled.div`
    font-size: 80px;
    margin-bottom: 20px;
    animation: bounce 2s infinite;

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
`;

const ErrorCode = styled.h1`
    font-size: 120px;
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.green.main};
    margin: 0;
    line-height: 1;
    margin-bottom: 20px;
`;

const Title = styled.h2`
    font-size: ${theme.fontSize.xl};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.gray[900]};
    margin: 0 0 16px 0;
`;

const Description = styled.p`
    font-size: ${theme.fontSize.md};
    color: ${theme.colors.gray[600]};
    line-height: 1.6;
    margin: 0 0 40px 0;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
`;

const Button = styled.button`
    padding: 12px 24px;
    border-radius: 8px;
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    cursor: pointer;
    border: none;
    transition: all 0.3s ease;
    min-width: 120px;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }
`;

const HomeButton = styled(Button)`
    background-color: ${theme.colors.green.main};
    color: ${theme.colors.other.white};

    &:hover {
        background-color: ${theme.colors.green.hover};
    }
`;

const BackButton = styled(Button)`
    background-color: ${theme.colors.other.white};
    color: ${theme.colors.gray[700]};
    border: 2px solid ${theme.colors.gray[300]};

    &:hover {
        background-color: ${theme.colors.gray[50]};
        border-color: ${theme.colors.gray[400]};
    }
`;
