import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useNavigate } from 'react-router-dom';
import closeIcon from '@shared/assets/icons/Xmark.svg';

const ConfirmModal = ( {onClose}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
    };

    return (
        <Container>
            <CloseButton onClick={onClose}>
                <img src={closeIcon} alt="close" />
            </CloseButton>
            <Img />
            <Title>시작해볼까요?</Title>
            <Button onClick={handleClick}>Be, fly 시작하기</Button>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    width: 18.125rem;
    height: 21.5rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
`;

const CloseButton = styled.button`
    margin-left: 90%;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
`;

const Img = styled.img`
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    background-color: ${theme.colors.gray[500]};
`;

const Title = styled.h2`
    font-size: ${theme.fontSize.medium};
    font-family: ${theme.fontFamily.pretendard};
    line-height: 1.3;
`;

const Button = styled.button`
    width: 253px;
    height: 36px;
    padding 1rem;
    background-color: ${theme.colors.green.main};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

     &:hover {
        background-color: ${theme.colors.green[80]};
    }
`;

export default ConfirmModal;