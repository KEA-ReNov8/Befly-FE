import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import theme from '@app/styles/theme';

const PostCard = ({
  type,
  title,
  content,
  likes,
  comments,
  time,
  nickname,
  categoryName,
  postId,
  currentPage,
}) => {
  const categoryColor = theme.colors.category[categoryName];

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    // 클릭 시 해당 계시글로 이동
    if (type === 'free') {
      navigate(`/free/${postId}`, { state: { from: location.pathname, page: currentPage } });
    } else if (type === 'shared') {
      navigate(`/share/${postId}`, { state: { from: location.pathname, page: currentPage } });
    }
  };

  return (
    <CardContainer onClick={handleClick}>
      <CardImage />
      {type === 'shared' && categoryName && (
        <CategoryPill color={categoryColor}>{categoryName}</CategoryPill>
      )}
      <CardContentContainer>
        <CardTitle>{title}</CardTitle>
        <CardContent>{content}</CardContent>
        <CardFooter>
          <LeftFooter>
            <span>♡ {likes}</span>
            <span>🗨️ {comments}</span>
          </LeftFooter>
          <RightFooter>
            <span>{time}</span>
            <Divider />
            <span>{nickname}</span>
          </RightFooter>
        </CardFooter>
      </CardContentContainer>
    </CardContainer>
  );
};
export default PostCard;

const CardContainer = styled.div`
  width: 240px;
  height: 330px;
  background: ${theme.colors.other.white};
  border-radius: 8px;
  //border: 1px solid ${theme.colors.gray[400]};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-4px);
  }

  display: flex;
  flex-direction: column;
  position: relative;
  flex: none;
  box-sizing: border-box;
`;

const CardImage = styled.div`
  width: 100%;
  height: 153px;
  background: ${theme.colors.gray[300]};
  border-radius: 8px 8px 0 0;
`;

const CategoryPill = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 30px;
  padding: 0 5px;
  background: ${(props) => props.color || theme.colors.green.main};
  color: ${theme.colors.gray[900]};
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.medium};
  border-radius: 999px;
  position: absolute;
  left: 50%;
  top: 140px;
  transform: translateX(-50%);
  z-index: 2;
`;

const CardContentContainer = styled.div`
  width: 100%;
  height: 177px;
  padding: 27px 20px 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
`;

const CardTitle = styled.h3`
  width: 100%;
  height: 20px;
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.semibold};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 20px;
`;

const CardContent = styled.p`
  width: 100%;
  flex: 1;
  max-height: calc(1.6em * 3);
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.gray[800]};
  line-height: 1.6em;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
`;
// 카드 푸터- 좋아요, 댓글 수, 작성 시간, 닉네임을 표시
const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftFooter = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.gray[800]};
`;

const RightFooter = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.gray[800]};
`;

const Divider = styled.div`
  width: 1px;
  height: 10px;
  background-color: ${theme.colors.gray[800]};
`;
