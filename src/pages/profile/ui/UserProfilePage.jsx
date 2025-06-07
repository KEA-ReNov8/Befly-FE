import styled from 'styled-components';
import theme from '@app/styles/theme';
import UserProfile from '@profile/components/UserProfile';
import TopBar from '@shared/ui/TopBar/TopBar';
import { useParams } from 'react-router-dom';
import { useGetUserInfoQuery } from '@profile/feature/hook/useGetUserInfoQuery';

export const UserProfilePage = ( ) => {
    const { userId } = useParams();
    console.log('URL에서 가져온 userId:', userId);
    const { data: userData, isLoading, isError } = useGetUserInfoQuery(userId);
    console.log('API에서 받은 userData:', userData);
    
    if (isLoading) {
        return (
            <Wrapper>
                <TopBar />
                <Line>사용자 프로필을 불러오는 중...</Line>
            </Wrapper>
        );
    }
    
    if (isError || !userData) {
        return (
            <Wrapper>
                <TopBar />
                <Line>사용자 정보를 불러올 수 없습니다</Line>
            </Wrapper>
        );
    }
    
    return (
        <Wrapper>
            <TopBar />
            <Line>{userData?.nickName || '사용자'} 님의 프로필</Line>
            <UserProfile userInfo={userData} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1440px;
    margin: 0 auto;
`;

const Line = styled.div`
    width: 100%;
    height: 66px;
    background-color: ${theme.colors.green.main};
    display: flex;
    align-items: center;
    font-size: ${theme.fontSize.xl};
    font-weight: ${theme.fontWeight.bold};
    padding-left: 220px;
    color: ${theme.colors.other.white};
`;
