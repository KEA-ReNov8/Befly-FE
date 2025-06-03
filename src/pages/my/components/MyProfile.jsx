import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import UserDetail from '@my/components/UserDetail';
import UserStat from '@my/components/UserStat';
import SharePostCard from '@my/components/SharePostCard';
import FreePostCard from '@my/components/FreePostCard';
import EditProfileModal from '@my/components/EditProfileModal';


const MyProfile = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('공유');
    const [userData, setUserData] = useState({
        username: '비플라이',
        email: 'befly@example.co.kr',
        worry: 5,
        share: 4,
        free: 4,
        point: 340
    });

    const dummyPosts = [
        { id: 1, type: '자유', category: '불안 ', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/24', likes: 120, comments: 10 },
        { id: 2, type: '공유', category: '진로', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/23', likes: 85, comments: 10 },
        { id: 3, type: '자유', category: '불안', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/22', likes: 65, comments: 10 },
        { id: 4, type: '공유', category: '스트레스', title: '오늘 너무 피곤해서 잠만 잤어요', date: '2023/11/21', likes: 42, comments: 10 },
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
    const handleProfileClick = () => {
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const handleProfileUpdate = (updatedData) => {
        setUserData({...userData, ...updatedData});
        setIsModalOpen(false);
    };

    return (
        <Container>
            <ProfileContainer>
                <UserDetail userData={userData} handleProfileClick={handleProfileClick} />
            </ProfileContainer>
            <UserStat userData={userData}/>
            <ButtonContainer>
                <ShareButton data-active={activeTab === '공유'} onClick={() => handleTabChange('공유')}>나의 공유함</ShareButton>
                <FreeButton data-active={activeTab === '자유'} onClick={() => handleTabChange('자유')}>나의 자유함</FreeButton>
            </ButtonContainer>
            <PostSection>
                {filteredPosts.map(post => 
                    activeTab === '공유' ? 
                    <SharePostCard key={post.id} post={post} /> :
                    <FreePostCard key={post.id} post={post} />
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

export default MyProfile;
