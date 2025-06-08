import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import UserDetail from '@my/components/UserDetail';
import UserStat from '@my/components/UserStat';
import SharePostCard from '@my/components/SharePostCard';
import FreePostCard from '@my/components/FreePostCard';
import EditProfileModal from '@my/components/EditProfileModal';
import { usePostListQuery } from '@my/feature/hook/Query/usePostListQuery';
import { useInfinitePostListQuery } from '@my/feature/hook/Query/useInfinitePostListQuery';
import { usePostCountQuery } from '@my/feature/hook/Query/usePostCountQuery';
import { useGetProfileQuery } from '@my/feature/hook/Query/useGetProfileQuery';
import Wait from '@shared/ui/lottieComp/wait';

const MyProfile = () => {
    const { data: profileData } = useGetProfileQuery();

    const getUserInfo = () => {
        try {
        const myInfoStore = localStorage.getItem('myInfoStore');
        if (myInfoStore) {
            const parsed = JSON.parse(myInfoStore);
            return parsed?.state?.myInfo || null;
        }
        return null;
        } catch (error) {
        console.error('로컬스토리지 파싱 오류:', error);
        return null;
        }
    };
    const userInfo = profileData || getUserInfo();

    const [isModalOpen, setIsModalOpen] = useState(false);
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
    const handleProfileClick = () => {
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
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
                <UserDetail userData={userInfo} handleProfileClick={handleProfileClick} />
            </ProfileContainer>
            <UserStat userData={userInfo} postCount={postCount}/>
            <ButtonContainer>
                <ShareButton data-active={activeTab === '공유'} onClick={() => handleTabChange('공유')}>나의 공유함</ShareButton>
                <FreeButton data-active={activeTab === '자유'} onClick={() => handleTabChange('자유')}>나의 자유함</FreeButton>
            </ButtonContainer>
            <PostSection>
                {((activeTab === '공유' && isLoadingPosts) || (activeTab === '자유' && isFreeLoading)) ? (
                    <LoadingContainer>
                        <Wait />
                    </LoadingContainer>
                ) : currentPosts.length === 0 ? (
                    <EmptyStateContainer>
                        {activeTab === '공유' ? (
                            <>
                                <EmptyTitle>아직 공유한 고민이 없어요</EmptyTitle>
                                <EmptyDescription>
                                    첫 번째 고민을 공유해보세요!
                                </EmptyDescription>
                            </>
                        ) : (
                            <>
                                <EmptyTitle>아직 작성한 자유글이 없어요</EmptyTitle>
                                <EmptyDescription>
                                    자유롭게 생각을 나눠보세요!
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
            {isModalOpen && <EditProfileModal onClose={handleModalClose} />}
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
    align-items: center;
    justify-content: center;
    text-align: center;

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
    align-items: center;
    justify-content: center;
    text-align: center;

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

const LoadingContainer = styled.div`
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 50px auto;
`;

export default MyProfile;
