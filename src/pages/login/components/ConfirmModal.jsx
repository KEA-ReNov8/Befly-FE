import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useNavigate } from 'react-router-dom';
import closeIcon from '@shared/assets/icons/Xmark.svg';
import Greet from '@shared/ui/lottieComp/Greet';

const ConfirmModal = ( {onClose}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <Container>
            <CloseButton onClick={onClose}>
                <img src={closeIcon} alt="close" />
            </CloseButton>
            <LottieContainer>
                <Greet />
            </LottieContainer>
            <Title>시작해볼까요?</Title>
            <Button onClick={handleClick}>Be, Fly 시작하기</Button>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    width: 18.125rem;
    height: 21.5rem;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const CloseButton = styled.button`
    margin-left: 90%;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
`;

const LottieContainer = styled.div`
    width: 180px;
    height: 180px;
`;

const Title = styled.h2`
    font-size: ${theme.fontSize.lg};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.other.black};
    margin-bottom: 10px;
`;

const Button = styled.button`
    width: 253px;
    height: 36px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background-color: ${theme.colors.green.main};
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.other.white};

     &:hover {
        background-color: ${theme.colors.green.hover};
    }
`;

export default ConfirmModal;
