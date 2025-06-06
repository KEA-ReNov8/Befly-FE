import styled from 'styled-components';
import theme from '@app/styles/theme';

const CommentDeleteModal = ({ commentId, onConfirm, onClose }) => {
  const handleConfirm = () => {
    onConfirm(commentId);
  };

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContainer>
        <ModalContent>
          <ModalTitle>댓글 삭제</ModalTitle>
          <ModalMessage>정말로 이 댓글을 삭제하시겠습니까?</ModalMessage>
          <ButtonContainer>
            <CancelButton onClick={onClose}>취소</CancelButton>
            <ConfirmButton onClick={handleConfirm}>삭제</ConfirmButton>
          </ButtonContainer>
        </ModalContent>
      </ModalContainer>
    </>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
`;

const ModalContent = styled.div`
  background-color: ${theme.colors.other.white};
  border-radius: 8px;
  padding: 24px;
  width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ModalTitle = styled.h2`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: 16px;
  color: ${theme.colors.gray[900]};
`;

const ModalMessage = styled.p`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.gray[700]};
  margin-bottom: 24px;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${theme.colors.gray[400]};
  background-color: ${theme.colors.other.white};
  color: ${theme.colors.gray[700]};
  border-radius: 6px;
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.gray[100]};
  }
`;

const ConfirmButton = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: ${theme.colors.red.main};
  color: ${theme.colors.other.white};
  border-radius: 6px;
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.red.hover};
  }
`;

export default CommentDeleteModal;
