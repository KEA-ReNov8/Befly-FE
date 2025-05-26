import styled from 'styled-components';
import theme from '@app/styles/theme';
import UserProfile from '@profile/components/UserProfile';
import TopBar from '@shared/ui/TopBar/TopBar';


export const UserProfilePage = ( ) => {
    return (
        <Wrapper>
            <TopBar />
            <Line > 비플라이2 님의 프로필</Line>
            <UserProfile />
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
