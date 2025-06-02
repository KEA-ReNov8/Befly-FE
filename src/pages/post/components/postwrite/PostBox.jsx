import styled from 'styled-components';
import theme from '@app/styles/theme';
import PostSelectModal from '@pages/post/components/PostSelectModal';
import { useState } from 'react';

export const PostBox = ({ title, author, date, content, stats, postId, children = null }) => {

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteModalOpen(prev => !prev); // 이전 상태를 반전
  };

  const onCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
  <PostContainer>
    <PostHeader>
      <HeaderWrapper>
        <PostTitle>{title}</PostTitle>
        <Meta>
          <span>{author}</span>
          <Divider>|</Divider>
          <span>{date}</span>
        </Meta>
      </HeaderWrapper>
      <EditButton onClick={handleDelete}>...</EditButton>
    </PostHeader>
    {/* MindReportSection 등 children이 들어갈 위치 */}
    {children}
    <PostContent dangerouslySetInnerHTML={{ __html: content }} />
    <PostStats>
      <span>♡ {stats.like}</span>
      <span>🗨️ {stats.comment}</span>
    </PostStats>
    {isDeleteModalOpen && <PostSelectModal postId={postId} />}
  </PostContainer>
  );
};

const PostContainer = styled.div`
  position: relative;
  width: 1044px;
  padding: 30px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 10px 10px;
  border: 1px solid ${theme.colors.gray[400]};
  padding: 40px;
  box-sizing: border-box;
  border-top: none;
  margin-bottom: 40px;
`;
const PostHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;
const HeaderWrapper = styled.div`
  width: 940px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const PostTitle = styled.h1`
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin-bottom: 8px;
`;
const Meta = styled.div`
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.regular};
  margin-top: 8px;
  color: ${theme.colors.gray[600]};
  display: flex;
  gap: 8px;
`;
const Divider = styled.span`
  color: ${theme.colors.gray[500]};
`;
const EditButton = styled.button`
  background: none;
  border: none;
  font-size: ${theme.fontSize.xl};
  color: ${theme.colors.gray[500]};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.gray[700]};
  }
`;
const PostContent = styled.div`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.gray[800]};
  line-height: 1.6;
  margin-bottom: 16px;
  width: 905px;
  margin-left: 10px;

  img {
    max-width: 100%;
    margin: 10px 0;
    border-radius: 8px;
  }
  p {
    margin-bottom: 16px;
  }
`;
const PostStats = styled.div`
  display: flex;
  gap: 16px;
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.gray[900]};
  margin-left: 10px;
`;
