import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PostCard = ({
  type,
  title,
  content,
  likes,
  comments,
  time,
  nickname,
  categoryColor,
  postId,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === 'free') {
      navigate(`/free/${postId}`);
    } else if (type === 'shared') {
      navigate(`/share/${postId}`);
    }
  };

  return (
    <CardContainer onClick={handleClick}>
      <CardImage />
      {type === 'shared' && <CategoryIndicator color={categoryColor} />}
      <CardContentContainer>
        <CardTitle>{title}</CardTitle>
        <CardContent>{content}</CardContent>
        <CardFooter>
          <span>
            ❤️ {likes} 💬 {comments}
          </span>
          <span>
            {time} | {nickname}
          </span>
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
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }

  display: flex;
  flex-direction: column;
  position: relative;
`;
const CardImage = styled.div`
  width: 100%;
  height: 153px;
  background: #e0e0e0;
  border-radius: 10px, 10px, 0, 0;
`;
const CardContentContainer = styled.div`
  width: 100%;
  height: 177px;
  padding: 13.5px 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;
const CardTitle = styled.h3`
  width: 100%;
  height: 20px;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardContent = styled.p`
  width: 100%;
  flex: 1;
  max-height: calc(1.2em * 4);
  font-size: 12px;
  color: #666666;
  line-height: 1.2em;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
// 카드 푸터- 좋아요, 댓글 수, 작성 시간, 닉네임을 표시
const CardFooter = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  color: #888888;
`;
// 카테고리 인디케이터- 공유글일 경우, 카테고리를 표시하기 위해 사용
const CategoryIndicator = styled.div`
  width: 6px;
  height: 40px;
  background-color: ${(props) => props.color || '#4CAF50'};
  position: absolute;
  left: 0;
  top: 10px;
  border-radius: 2px;
`;
