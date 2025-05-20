import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useNavigate } from 'react-router-dom';

const FreePostCard = ( {post}) => {
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/free-post/${post.id}`);
    };

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
};

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
export default FreePostCard;