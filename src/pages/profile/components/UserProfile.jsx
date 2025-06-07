import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import UserDetail from '@profile/components/UserDetail';
import UserStat from '@profile/components/UserStat';
import SharePostCard from '@my/components/SharePostCard';
import FreePostCard from '@my/components/FreePostCard';
import { usePostCountQuery } from '@profile/feature/hook/usePostCountQuery';
import { usePostListQuery } from '@my/feature/hook/Query/usePostListQuery';
import { useInfinitePostListQuery } from '@my/feature/hook/Query/useInfinitePostListQuery';


const UserProfile = ({ userInfo }) => {
    const [activeTab, setActiveTab] = useState('공유');
    const observerRef = useRef(null);

    const { data: postCount } = usePostCountQuery(userInfo?.userId);

    const {
        data: infiniteData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isLoadingPosts,
    } = useInfinitePostListQuery(activeTab === '공유' ? userInfo?.userId : null);

    const { data: freePostData, isLoading: isFreeLoading } = usePostListQuery(activeTab === '자유' ? userInfo?.userId : null);

    // 네이티브 Intersection Observer로 무한스크롤 구현 (공유함만)
    useEffect(() => {
        if (activeTab !== '공유' || !observerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {
                root: null,
                rootMargin: '100px',
                threshold: 0
            }
        );

        observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [activeTab, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // 현재 탭에 따른 게시글 데이터
    const getCurrentPosts = () => {
        if (activeTab === '공유') {
            return infiniteData?.posts || [];
        } else if (activeTab === '자유') {
            return freePostData?.posts || [];
        } 
        return [];
    };

    const currentPosts = getCurrentPosts();

    return (
        <Container>
            <ProfileContainer>
                <UserDetail userData={userInfo} />
            </ProfileContainer>
            <UserStat userData={userInfo} postCount={postCount}/>
            <ButtonContainer>
                <ShareButton data-active={activeTab === '공유'} onClick={() => handleTabChange('공유')}>공유함</ShareButton>
                <FreeButton data-active={activeTab === '자유'} onClick={() => handleTabChange('자유')}>자유함</FreeButton>
            </ButtonContainer>
            <PostSection>
                {currentPosts.length === 0 ? (
                    <EmptyStateContainer>
                        {activeTab === '공유' ? (
                            <>
                                <EmptyTitle>공유한 고민이 없어요</EmptyTitle>
                                <EmptyDescription>
                                    아직 공유된 고민이 없습니다.
                                </EmptyDescription>
                            </>
                        ) : (
                            <>
                                <EmptyTitle>작성한 자유글이 없어요</EmptyTitle>
                                <EmptyDescription>
                                    아직 작성된 자유글이 없습니다.
                                </EmptyDescription>
                            </>
                        )}
                    </EmptyStateContainer>
                ) : (
                    currentPosts.map((post, index) => {
                        if (activeTab === '공유') {
                            return <SharePostCard key={`${post.solvedId}-${index}`} post={post} />;
                        } else if (activeTab === '자유') {
                            return <FreePostCard key={`${post.postId}-${index}`} post={post} />;
                        } 
                    })
                )}
                {/* 무한스크롤 트리거 (공유함일 때만) */}
                {activeTab === '공유' && currentPosts.length > 0 && (
                    <div ref={observerRef} style={{ height: '20px', width: '100%' }}></div>
                )}
            </PostSection>
        </Container>
    );
};

const Container = styled.div`
    width: 1044px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid ${theme.colors.gray[400]};
    border-top: none;
    border-radius: 0 0 10px 10px;
    margin-bottom: 80px;
`;

const ProfileContainer = styled.div`
    width: 100%;
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ButtonContainer = styled.div`
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    margin-top: 30px;
    margin-left: 10%;
    gap: 20px;
`;

const ShareButton = styled.button`
    width: 84px;
    height: 30px;
    border-radius: 8px;
    background-color: ${ (props) => props['data-active'] ? theme.colors.green.main : theme.colors.other.white };
    color: ${ (props) => props['data-active'] ? theme.colors.other.white : theme.colors.gray[800] };
    font-size: ${theme.fontSize.smMd};
    font-weight: ${theme.fontWeight.medium};
    cursor: pointer;
    border: 1px solid ${ (props) => props['data-active'] ? theme.colors.green.main : theme.colors.gray[400]};
    transition: all 0.3s;

    &:hover {
        background-color: ${theme.colors.green.hover};
        color: ${theme.colors.other.white};
    }
`;

const FreeButton = styled.button`
    width: 84px;
    height: 30px;
    border-radius: 8px;
    background-color: ${ (props) => props['data-active'] ? theme.colors.green.main : theme.colors.other.white };
    color: ${ (props) => props['data-active'] ? theme.colors.other.white : theme.colors.gray[800]};
    font-size: ${theme.fontSize.smMd};
    font-weight: ${theme.fontWeight.medium};
    cursor: pointer;
    border: 1px solid ${ (props) => props['data-active'] ? theme.colors.green.main : theme.colors.gray[400]};
    transition: all 0.3s;

    &:hover {
        background-color: ${theme.colors.green.hover};
        color: ${theme.colors.other.white};
    }
`;

const PostSection = styled.div`
    margin-left: 10%;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
`;

const EmptyStateContainer = styled.div`
    margin-right: 10%;
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
`;

const EmptyTitle = styled.h3`
    font-size: ${theme.fontSize.lg};
    font-weight: ${theme.fontWeight.semibold};
    color: ${theme.colors.gray[600]};
    margin: 0;
`;

const EmptyDescription = styled.p`
    font-size: ${theme.fontSize.md};
    color: ${theme.colors.gray[500]};
    text-align: center;
    line-height: 1.5;
    margin: 0;
`;

export default UserProfile;
