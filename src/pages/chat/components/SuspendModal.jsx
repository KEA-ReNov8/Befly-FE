import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useNavigate } from 'react-router-dom';

const SuspendModal = ( {onClose}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/list');
    };

    return (
        <ModalOverlay>
            <ModalContainer>
                <Img />
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
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    background-color: white;
`;

const Img = styled.img`
    margin-top: 20px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: ${theme.colors.gray[500]};
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
    font-size: ${theme.fontSize.smallMedium};
    font-family: ${theme.fontFamily.pretendard};
`;

const SubTitle = styled.p`
    margin-top: 20px;
    font-size: ${theme.fontSize.xsmall};
    color: ${theme.colors.gray[700]};
    font-family: ${theme.fontFamily.pretendard};
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
    color: white;
    font-family: ${theme.fontFamily.pretendard};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: ${theme.colors.red.main};
    }
`;

const ReturnButton = styled.button`
    width: 134px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    background-color: white;
    border: 1px solid ${theme.colors.gray[500]};
    font-family: ${theme.fontFamily.pretendard};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: ${theme.colors.gray[500]};
    }
`;

export default SuspendModal;
