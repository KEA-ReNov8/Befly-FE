import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useDeleteFreePostMutation } from '@post/feature/hooks/useDeleteFreePostMutation';
import { useDeleteSharePostMutation } from '@post/feature/hooks/useDeleteSharePostMutation';
import { useNavigate } from 'react-router-dom';

const DeleteModal = ({ onClose, postId, postType = 'free' }) => {
  const navigate = useNavigate();

  // 게시글 타입에 따라 적절한 삭제 훅 사용
  const { mutate: deleteFreePost, isPending: isFreeDeleting } = useDeleteFreePostMutation();
  const { mutate: deleteSharePost, isPending: isShareDeleting } = useDeleteSharePostMutation();

  const isPending = postType === 'free' ? isFreeDeleting : isShareDeleting;

  const handleDelete = () => {
    if (postType === 'free') {
      deleteFreePost(postId, {
        onSuccess: () => {
          alert('게시글이 삭제되었습니다.');
          // 캐시 무효화가 완료된 후 네비게이션
          setTimeout(() => {
            navigate('/free/page/1'); // 자유게시판 목록으로 이동
          }, 100);
        },
        onError: (error) => {
          console.error('자유글 삭제 실패:', error);
          alert('게시글 삭제에 실패했습니다.');
        },
      });
    } else if (postType === 'share') {
      deleteSharePost(postId, {
        onSuccess: () => {
          alert('게시글이 삭제되었습니다.');
          // 캐시 무효화가 완료된 후 네비게이션
          setTimeout(() => {
            navigate('/share/page/1'); // 공유게시판 목록으로 이동
          }, 100);
        },
        onError: (error) => {
          console.error('공유글 삭제 실패:', error);
          alert('게시글 삭제에 실패했습니다.');
        },
      });
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <Title>삭제하시겠습니까?</Title>
        <ButtonContainer>
          <ReturnButton onClick={onClose}>취소</ReturnButton>
          <DeleteButton onClick={handleDelete} disabled={isPending}>
            {isPending ? '삭제 중...' : '삭제하기'}
          </DeleteButton>
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
