import styled from 'styled-components';
import theme from '@app/styles/theme';
import MyProfile from '@my/components/MyProfile';
import TopBar from '@shared/ui/TopBar/TopBar';
import { useLogoutMutation } from '@my/feature/hook/mutation/useLogoutMutation';
import { useNavigate } from 'react-router-dom';
import useIsLoggedInStore from '@shared/store/useIsLoggedInStore';

export const MyPage = () => {
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
    const navigate = useNavigate();
    const { logout } = useIsLoggedInStore();
    const userInfo = getUserInfo();
    const logoutMutation = useLogoutMutation(userInfo?.userId);

    const handleLogout = async() => {
        // 클라이언트 로그아웃은 항상 실행
        logout();
        navigate('/login', { replace: true });
        
        // 서버 로그아웃은 백그라운드에서 실행 (에러 무시)
        /*try {
            await logoutMutation.mutateAsync();

        } catch (error) {
            // 서버 로그아웃 실패는 무시 (이미 클라이언트는 로그아웃됨)
            console.log('서버 로그아웃 실패 (무시됨):', error.response?.status);
        }*/
    };

    return (
        <Wrapper>
            <TopBar />
            <MiddleBar>
                <Line>마이페이지</Line>
                <Button onClick={handleLogout}>로그아웃</Button>
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