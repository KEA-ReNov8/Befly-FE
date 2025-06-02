import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DeleteModal from '@pages/post/components/DeleteModal';

//삭제 안될 경우 삭제 모달 복제해서 새로 만들기
const PostSelectModal = ({ postId }) => {

    const navigate = useNavigate();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDelete = () => {
        setIsDeleteModalOpen(true);
    };

    const handleEdit = () => {
        navigate(`/post/${postId}`);
    };

  return (
    <ModalContainer>
        <EditButton onClick={handleEdit}>수정</EditButton>
        <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
        {isDeleteModalOpen && <DeleteModal onClose={() => setIsDeleteModalOpen(false)} />}
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
    position: absolute;
    top: 70px;
    right: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px;
    padding: 10px;
    background-color: ${theme.colors.other.white};
    border-radius: 8px;
    border: 1px solid ${theme.colors.gray[400]};
`;

const EditButton = styled.div`
    width: 100%;
    background-color: ${theme.colors.other.white};
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.other.black};
    padding-bottom: 10px;
    border-bottom: 1px solid ${theme.colors.gray[400]};
    margin-bottom: 10px;
    cursor: pointer;
    text-align: center;
`;

const DeleteButton = styled.div`
    width: 100%;
    text-align: center;
    background-color: ${theme.colors.other.white};
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.red.main};
    cursor: pointer;
`;

export default PostSelectModal;
