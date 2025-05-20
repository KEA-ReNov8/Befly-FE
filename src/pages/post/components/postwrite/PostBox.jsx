import styled from 'styled-components';
import theme from '@app/styles/theme';

const PostBox = ({ title, author, date, content, stats, onEdit }) => (
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
      <EditButton onClick={onEdit}>...</EditButton>
    </PostHeader>
    <PostContent dangerouslySetInnerHTML={{ __html: content }} />
    <PostStats>
      <span>❤️ {stats.like}</span>
      <span>💬 {stats.comment}</span>
    </PostStats>
  </PostContainer>
);

export default PostBox;

const PostContainer = styled.div`
  width: 1044px;
  padding: 30px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid ${theme.colors.gray[200]};
  padding: 40px;
  box-sizing: border-box;
  margin: 30px 0;
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
  font-size: 20px;
  font-weight: 700;
  color: ${theme.colors.gray[900]};
  margin-bottom: 8px;
`;
const Meta = styled.div`
  font-size: 14px;
  color: ${theme.colors.gray[500]};
  display: flex;
  gap: 8px;
`;
const Divider = styled.span`
  color: ${theme.colors.gray[300]};
`;
const EditButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: ${theme.colors.gray[400]};
  cursor: pointer;
`;
const PostContent = styled.div`
  font-size: 15px;
  color: ${theme.colors.gray[800]};
  line-height: 1.6;
  margin-bottom: 30px;
  img {
    max-width: 100%;
    margin: 20px 0;
    border-radius: 6px;
  }
  p {
    margin-bottom: 16px;
  }
`;
const PostStats = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: ${theme.colors.gray[600]};
`;
