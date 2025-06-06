import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useNavigate } from 'react-router-dom';

const WorryPost = ( {filteredPosts, onDeleteClick, activeTab} ) => {

    const navigate = useNavigate();

    const handleClick = (post) => {
        if (post.status === '고민중'){
            navigate(`/chat/${post.session_id}`);
        } else {
            navigate(`/report/${post.session_id}`);
        }
    };
    return (
        <PostsContainer>
                {filteredPosts.map(post => (
                    <PostItem key={post.id} onClick={() => handleClick(post)}>
                        <StatusContainer>
                            <PostStatus data-status={post.status}>{post.status}</PostStatus>
                        </StatusContainer>
                        <CategoryContainer>
                            <PostCategory data-category={post.category}>{post.category}</PostCategory>
                        </CategoryContainer>
                        <TitleContainer>
                            <PostTitle>{post.title}</PostTitle>
                        </TitleContainer>
                        <PostInfo>
                            <PostDate>{post.date}</PostDate>
                            <PostTime>{post.time}</PostTime>
                        </PostInfo>
                    <DeleteButton onClick={(e) => {
                        e.stopPropagation();
                        onDeleteClick(post);
                        }}>×</DeleteButton>
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
    height: 64px; 
    border-bottom: 1px solid #eee;
    padding: 15px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${theme.colors.green.light};
    }
`;

const StatusContainer = styled.div`
    width: 100px;
    text-align: center;
    align-items: center;
    justify-content: center;
`;

const PostStatus = styled.span`
    font-size: ${theme.fontSize.smMd};
    font-weight: ${theme.fontWeight.semibold};
    color: ${theme.colors.green.main};
`;

const CategoryContainer = styled.div`
    width: 132px;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
`;

const PostCategory = styled.span`
    padding: 6px 20px;
    border-radius: 20px;
    white-space: nowrap;
    background-color: ${(props) => theme.colors.category[props['data-category']]};
    color: ${theme.colors.other.white};
    font-weight: ${theme.fontWeight.semibold};
    font-size: ${theme.fontSize.smMd};
`;

const TitleContainer = styled.div`
    width: 540px;
    align-items: center;
    justify-content: center;
`;

const PostTitle = styled.div`
    flex: 1;
    font-weight: ${theme.fontWeight.semibold};
    font-size: ${theme.fontSize.md};
`;

const PostInfo = styled.div`
    width: 132px;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
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
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    font-size: 18px;
    margin-left: 25px;
    margin-bottom: 3px;
    color: ${theme.colors.gray[600]};
    cursor: pointer;
    
    &:hover {
        color: ${theme.colors.red.main};
    }
`;

export default WorryPost;
