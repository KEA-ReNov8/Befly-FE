import styled from 'styled-components';
import theme from '@app/styles/theme';

const DeleteModal = ( {onClose}) => {

    const handleClick = () => {
        window.location.reload();
    };

    return (
        <ModalOverlay>
            <ModalContainer>
                <Title>삭제하시겠습니까?</Title>
                <ButtonContainer>
                    <ReturnButton onClick={onClose}>취소</ReturnButton>
                    <DeleteButton onClick={handleClick}>삭제하기</DeleteButton>
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
    width: 340px;
    height: 150px;
    border-radius: 15px;
    border: 1px solid ${theme.colors.gray[400]};
    background-color: white;
`;

const Title = styled.div`
    font-size: ${theme.fontSize.lg};
    font-weight: ${theme.fontWeight.semibold};
    margin-top: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 15px;
    margin-top: 30px;
`;

const DeleteButton = styled.button`
    width: 120px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    background-color: ${theme.colors.red[400]};
    color: white;
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.semibold};

    &:hover {
        background-color: ${theme.colors.red.hover};
    }
`;

const ReturnButton = styled.button`
    width: 120px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    background-color: white;
    border: 1px solid ${theme.colors.gray[400]};
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.semibold};

    &:hover {
        background-color: ${theme.colors.gray[500]};
    }
`;

export default DeleteModal;
