import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useNavigate } from 'react-router-dom';
import Suspend from '@shared/ui/lottieComp/Suspend';

const SuspendModal = ( {onClose}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/my/myworry');
    };

    return (
        <ModalOverlay>
            <ModalContainer>
                <LottieContainer>
                    <Suspend />
                </LottieContainer>
                <TitleContainer>
                    <Title>당신의 이야기를</Title>
                    <Title>조금 더 들려주세요!</Title>
                </TitleContainer>
                <SubTitle>종료할 경우 리포트가 생성되지 않습니다.</SubTitle>
                <ButtonContainer>
                    <ReturnButton onClick={onClose}>취소</ReturnButton>
                    <SuspendButton onClick={handleClick}>종료하기</SuspendButton>
                </ButtonContainer>
            </ModalContainer>
        </ModalOverlay>
    );
};

const ModalOverlay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 344px;
    height: 420px;
    z-index: 1001;
    border-radius: 8px;
    background-color: white;
    border: 1px solid ${theme.colors.gray[400]};
`;

const LottieContainer = styled.div`
    margin-top: 20px;
    width: 150px;
    height: 150px;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
`;

const Title = styled.h2`
    margin-top: 10px;
    font-size: ${theme.fontSize.lg};
    font-weight: ${theme.fontWeight.medium};
`;

const SubTitle = styled.p`
    margin-top: 20px;
    font-size: ${theme.fontSize.smMd};
    font-weight: ${theme.fontWeight.regular};
    color: ${theme.colors.gray[800]};
`;

const ButtonContainer = styled.div`
    display: flex;
    margin-top: 20px;
    gap: 15px;
`;

const SuspendButton = styled.button`
    width: 134px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    background-color: ${theme.colors.red[400]};
    color: ${theme.colors.other.white};
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};

    &:hover {
        background-color: ${theme.colors.red.hover};
    }
`;

const ReturnButton = styled.button`
    width: 134px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    background-color: white;
    border: 1px solid ${theme.colors.gray[500]};
    color: ${theme.colors.other.black};
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};

    &:hover {
        background-color: ${theme.colors.gray[500]};
    }
`;

export default SuspendModal;
