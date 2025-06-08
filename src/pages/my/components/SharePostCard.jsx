import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import defaultImage from '@shared/assets/imgs/defaultImage.svg';

const SharePostCard = ( { post } ) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/share/${post.solvedId}`);
    };

    const dateOnly = new Date(post.createdAt).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const handleImageError = (e) => {
      e.target.src = defaultImage;
    };

    return (
    <CardContainer onClick={handleClick}>
      <CardImage src={post.imageUrl || defaultImage} alt="게시글 이미지"/>
      {post.category && (
        <CategoryPill color={theme.colors.category[post.category]}>{post.category}</CategoryPill>
      )}
      <CardContentContainer>
        <CardTitle>{post.solvedTitle}</CardTitle>
        <CardFooter>
          <LeftFooter>
            <span>♡ {post.likeCount}</span>
            <span>🗨️ {post.commentCount}</span>
          </LeftFooter>
          <RightFooter>
            <span>{dateOnly}</span>
          </RightFooter>
        </CardFooter>
      </CardContentContainer>
    </CardContainer>
    );
};

const CardContainer = styled.div`
  width: 220px;
  background: ${theme.colors.other.white};
  border-radius: 8px;
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

const CardImage = styled.img`
  width: 100%;
  height: 153px;
  background: ${theme.colors.gray[100]};
  border-radius: 8px 8px 0 0;
  object-fit: cover;
`;

const CategoryPill = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 30px;
  padding: 0 5px;
  background: ${(props) => props.color || theme.colors.green.main};
  color: ${theme.colors.other.white};
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
  padding: 27px 20px 20px;
  margin-top: 10px;
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
  margin-bottom: 10px;
`;

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

export default SharePostCard;

/*        <PostCardContainer onClick={handleClick}>
            <Category data-category={post.category}>{post.category}</Category>
            <Title>{post.title}</Title>
            <CardFooter>
                <PostDate>{post.date}</PostDate>
                <PostStat>
                <span>♡&nbsp;{post.likes}</span>
                <span>🗨️&nbsp;{post.comments}</span>
                </PostStat>
            </CardFooter>
        </PostCardContainer>
const PostCardContainer = styled.div`
    width: 230px;
    height: 160px;
    border-radius: 5px;
    border: 1px solid ${theme.colors.gray[400]};
    background-color: ${theme.colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    
    &:hover {
        border: 1px solid ${theme.colors.gray[300]};
        box-shadow: 0px 0px 10px 0px rgba(18, 165, 27, 0.2);
        transform: scale(1.01);
`;

const Category = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-bottom: 1px solid ${theme.colors.gray[200]};
    border-radius: 10px;
    width: 66px;
    height: 28px;
    margin-bottom: 20px;
    background-color: ${(props) => theme.colors.category[props['data-category']]};
    font-weight: ${theme.fontWeight.regular};
    font-family: ${theme.fontFamily.pretendard};
`;

const Title = styled.p`
    text-align: center;
    width: 200px;
    font-size: 17px;
    font-family: ${theme.fontFamily.pretendard};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 10px;
`;

const CardFooter = styled.div`
    display:flex;
    align-items: center;
    font-family: ${theme.fontFamily.pretendard};
    margin-top: 20px;
    border-top: 1px solid ${theme.colors.gray[200]};
    padding-top: 10px;
    width: 100%;
`;

const PostDate = styled.p`
    margin-left: 20px;
    font-size: ${theme.fontSize.xsmall};
    font-family: ${theme.fontFamily.pretendard};
`;

const PostStat = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-left: 60px;
    font-size: ${theme.fontSize.xsmall};
`;

export default SharePostCard;*/
