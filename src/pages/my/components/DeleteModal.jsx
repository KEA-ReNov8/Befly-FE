import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useDeleteChatSession } from '@chat/feature/hooks/mutate/useDeleteChatSession';

const DeleteModal = ( {onClose, sessionToDelete}) => {

    const deleteSessionMutation = useDeleteChatSession();

    const handleClick = async () => {
        if(!sessionToDelete) {
            alert('삭제할 세션 정보가 없습니다.');
            return;
        }

        try {
            const statusField = sessionToDelete.status === '고민중' ? 'true' : 'false';

            await deleteSessionMutation.mutateAsync({
                statusField,
                sessionId: sessionToDelete.session_id
            });

            alert('세션이 성공적으로 삭제되었습니다.');
            onClose();
        } catch (error) {
            console.error('삭제 실패:', error);
        }
    };

    return (
        <ModalOverlay>
            <ModalContainer>
                <Title>삭제하시겠습니까?</Title>
                <ButtonContainer>
                    <ReturnButton onClick={onClose} disabled={deleteSessionMutation.isPending}>취소</ReturnButton>
                    <DeleteButton onClick={handleClick} disabled={deleteSessionMutation.isPending}>삭제하기</DeleteButton>
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

    &:disabled {
        background-color: ${theme.colors.gray[200]};
        cursor: not-allowed;
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

    &:disabled {
        background-color: ${theme.colors.gray[200]};
        cursor: not-allowed;
    }
`;

export default DeleteModal;
