import { useState } from 'react';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import UserDetail from '@profile/components/UserDetail';
import UserStat from '@my/components/UserStat';
import SharePostCard from '@my/components/SharePostCard';
import FreePostCard from '@my/components/FreePostCard';

const UserProfile = () => {

    const [activeTab, setActiveTab] = useState('공유');
    const [userData, setUserData] = useState({
        username: '비플라이2',
        email: 'befly@example.co.kr',
        worry: 5,
        share: 4,
        free: 4,
        point: 9999
    });

    const dummyPosts = [
        { id: 1, type: '자유', category: '불안 ', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/24', likes: 120, comments: 10 },
        { id: 2, type: '공유', category: '진로', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/23', likes: 85, comments: 10 },
        { id: 3, type: '자유', category: '불안', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/22', likes: 65, comments: 10 },
        { id: 4, type: '공유', category: '불안', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/21', likes: 42, comments: 10 },
        { id: 5, type: '자유', category: '불안', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/20', likes: 28, comments: 10 },
        { id: 6, type: '공유', category: '불안', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/19', likes: 15, comments: 10 },
        { id: 7, type: '자유', category: '불안', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/18', likes: 10, comments: 10 },
        { id: 8, type: '공유', category: '불안', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/17', likes: 5, comments: 10 },
        { id: 9, type: '자유', category: '불안', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/16', likes: 3, comments: 10 },
        { id: 10, type: '공유', category: '불안', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/15', likes: 2, comments: 10 },
        { id: 11, type: '자유', category: '불안', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/14', likes: 1, comments: 10 },
        { id: 12, type: '공유', category: '불안', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/13', likes: 1, comments: 10 },
        { id: 13, type: '자유', category: '불안', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/12', likes: 1, comments: 10 },
        { id: 14, type: '공유', category: '불안', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/11', likes: 1, comments: 10 },
        { id: 15, type: '자유', category: '불안', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/10', likes: 1, comments: 10 },
        { id: 16, type: '공유', category: '불안', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/09', likes: 1, comments: 10   },
        { id: 17, type: '자유', category: '불안', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/08', likes: 1, comments: 10 },
    ];

    const filteredPosts = dummyPosts.filter(post => post.type === activeTab);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Container>
            <ProfileContainer>
                <UserDetail userData={userData} />
            </ProfileContainer>
            <UserStat userData={userData}/>
            <Line />
            <ButtonContainer>
                <ShareButton data-active={activeTab === '공유'} onClick={() => handleTabChange('공유')}>공유함</ShareButton>
                <FreeButton data-active={activeTab === '자유'} onClick={() => handleTabChange('자유')}>자유함</FreeButton>
            </ButtonContainer>
            <PostSection>
                {filteredPosts.map(post => 
                    activeTab === '공유' ? 
                    <SharePostCard key={post.id} post={post} /> :
                    <FreePostCard key={post.id} post={post} />
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
    border: 1px solid ${theme.colors.gray[200]};
    border-radius: 15px;
    background-color: ${theme.colors.other.white};
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    margin-bottom: 100px;
`;

const Line = styled.div`
    width: 80%;
    height: 1px;
    margin-top: 30px;
    background-color: ${theme.colors.gray[500]};
`;

const ProfileContainer = styled.div`
    width: 100%;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ButtonContainer = styled.div`
    position: relative;
    width: 95%;
    height: 50px;
    display: flex;
    margin-top: 30px;
    margin-left: 50px;
    gap: 10px;
`;

const ShareButton = styled.button`
    width: 82px;
    height: 30px;
    border-radius: 10px;
    background-color: ${ (props) => props['data-active'] ? theme.colors.green.main : theme.colors.other.white };
    color: ${ (props) => props['data-active'] ? theme.colors.other.white : theme.colors.other.black };
    font-size: ${theme.fontSize.xsmall};
    font-family: ${theme.fontFamily.pretendard};
    cursor: pointer;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    border: 1px solid ${ (props) => props['data-active'] ? theme.colors.green.main : theme.colors.gray[200]};
    transition: all 0.3s;

    &:hover {
        background-color: ${theme.colors.green.hover};
        color: ${theme.colors.other.white};
    }
`;

const FreeButton = styled.button`
    width: 82px;
    height: 30px;
    border-radius: 10px;
    background-color: ${ (props) => props['data-active'] ? theme.colors.green.main : theme.colors.other.white };
    color: ${ (props) => props['data-active'] ? theme.colors.other.white : theme.colors.other.black};
    font-size: ${theme.fontSize.xsmall};
    font-family: ${theme.fontFamily.pretendard};
    cursor: pointer;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    border: 1px solid ${ (props) => props['data-active'] ? theme.colors.green.main : theme.colors.gray[200]};
    transition: all 0.3s;

    &:hover {
        background-color: ${theme.colors.green.hover};
        color: ${theme.colors.other.white};
    }
`;

const PostSection = styled.div`
    width: 100%;
    margin-top: 20px;
    margin-left: 65px;
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
`;

export default UserProfile;

