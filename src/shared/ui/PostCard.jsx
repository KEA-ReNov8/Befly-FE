import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { colors } from '@/app/styles/colors';
import { useLocation } from 'react-router-dom';

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
  const categoryColor = colors.category[categoryName];

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
            <span>❤️ {likes}</span>
            <span>💬 {comments}</span>
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
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.1);

  cursor: pointer;
  transition: transform 0.2s ease-in-out;
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
  background: #e0e0e0;
  border-radius: 8px 8px 0 0;
`;

const CategoryPill = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 28px;
  padding: 0 5px;
  background: ${(props) => props.color || '#4CAF50'};
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  border-radius: 999px;
  position: absolute;
  left: 50%;
  top: 140px;
  transform: translateX(-50%);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.06);
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
  font-size: 15px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 20px;
`;

const CardContent = styled.p`
  width: 100%;
  flex: 1;
  max-height: calc(1.6em * 3);
  font-size: 13px;
  color: #666666;
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
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftFooter = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 12px;
  color: #888888;
`;

const RightFooter = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 12px;
  color: #888888;
`;

const Divider = styled.div`
  width: 1px;
  height: 10px;
  background-color: #888888;
`;
