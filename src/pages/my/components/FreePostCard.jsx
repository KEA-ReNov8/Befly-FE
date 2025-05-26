import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useNavigate } from 'react-router-dom';

const FreePostCard = ( {post}) => {
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/free/${post.id}`);
    };
    return (
        <CardContainer onClick={handleClick}>
          <CardImage />
          <CardContentContainer>
            <CardTitle>{post.title}</CardTitle>
            <CardFooter>
              <LeftFooter>
                <span>♡ {post.likes}</span>
                <span>🗨️ {post.comments}</span>
              </LeftFooter>
              <RightFooter>
                <span>{post.date}</span>
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

const CardImage = styled.div`
  width: 100%;
  height: 153px;
  background: ${theme.colors.gray[300]};
  border-radius: 8px 8px 0 0;
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

export default FreePostCard;

/*
return (
    <PostCardContainer onClick={handleClick}>
        <Title>{post.title}</Title>
        <CardFooter>
            <PostDate>{post.date}</PostDate>
            <PostStat>
                <span>♡&nbsp;{post.likes}</span>
                <span>💬&nbsp;{post.comments}</span>
            </PostStat>
        </CardFooter>
    </PostCardContainer>
);

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

const Title = styled.p`
    text-align: center;
    width: 200px;
    height: 30%;
    font-size: 17px;
    font-family: ${theme.fontFamily.pretendard};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 10px;
    margin-top: 37px;
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
*/
