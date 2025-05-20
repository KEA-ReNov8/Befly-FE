import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useNavigate } from 'react-router-dom';

const WorryPost = ( {filteredPosts, onDeleteClick} ) => {

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/my/worry/${id}`);
    }

    return (
        <PostsContainer>
                {filteredPosts.map(post => (
                    <PostItem key={post.id} onClick={() => handleClick(post.id)}>
                        <PostStatus data-category={post.category}>{post.category}</PostStatus>
                        <PostTitle>{post.title}</PostTitle>
                        <PostInfo>
                            <PostDate>{post.date}</PostDate>
                            <PostTime>{post.time}</PostTime>
                        </PostInfo>
                    <DeleteButton onClick={(e) => {
                        e.stopPropagation();
                        onDeleteClick(post.id)}}>×</DeleteButton>
                </PostItem>
            ))}
        </PostsContainer>
    );
};

const PostsContainer = styled.div`
    margin-top: 20px;
    margin-bottom: 30px;
    width: 980px;
    display: flex;
    flex-direction: column;
    border-top: 1px solid ${theme.colors.gray[900]};
    border-bottom: 1px solid ${theme.colors.gray[900]};
`;

const PostItem = styled.div`
    width: 100%;
    height: 62px; 
    border-bottom: 1px solid #eee;
    padding: 15px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${theme.colors.green.light};
    }
`;

const PostStatus = styled.span`
    padding: 6px 14px;
    border-radius: 4px;
    font-size: 14px;
    margin-right: 20px;
    margin-left: 20px;
    white-space: nowrap;
    background-color: ${(props) => theme.colors.category[props['data-category']]};
    color: white;
    font-family: ${theme.fontFamily.pretendard};
`;

const PostTitle = styled.div`
    flex: 1;
    font-weight: 500;
    font-family: ${theme.fontFamily.pretendard};
`;

const PostInfo = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
`;

const PostDate = styled.span`
    color: ${theme.colors.gray[500]};
    font-size: 12px;
    margin-right: 10px;
`;

const PostTime = styled.span`
    color: ${theme.colors.gray[500]};
    font-size: 12px;
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    font-size: 18px;
    color: ${theme.colors.gray[600]};
    cursor: pointer;
    margin-left: 10px;
    margin-right: 15px;
    
    &:hover {
        color: ${theme.colors.red.main};
    }
`;

export default WorryPost;