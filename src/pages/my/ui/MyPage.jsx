import styled from 'styled-components';
import theme from '@app/styles/theme';
import MyProfile from '@my/components/MyProfile';
import TopBar from '@shared/ui/TopBar/TopBar';

export const MyPage = () => {
    return (
        <Wrapper>
            <TopBar />
            <MiddleBar>
                <Line>마이페이지</Line>
                <Button>로그아웃</Button>
            </MiddleBar>
            <MyProfile />
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

const MiddleBar = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${theme.colors.green.main};
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

const Button = styled.p`
    width: 100px;
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    margin-right: 210px;
    cursor: pointer;
    text-align: center;
    color: ${theme.colors.other.white};

    &:hover {
        color: ${theme.colors.red[300]};
    }
`;