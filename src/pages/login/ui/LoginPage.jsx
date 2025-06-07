import styled from 'styled-components';
import Footer from '@shared/ui/Footer';
import Background from '@pages/login/components/Background';
import LoginForm from '@pages/login/components/LoginForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useIsLoggedInStore from '@shared/store/useIsLoggedInStore';
import { apiInstance } from '@shared/apis/instance';


export const LoginPage = () => {
    const navigate = useNavigate();
    const { isFirstMount, isLoggedIn, setIsFirstMount, setIsLoggedIn } = useIsLoggedInStore();

    useEffect(() => {
        const getIsLoggedIn = async () => {
            try {
                const response = await apiInstance.get('/auth/refresh');
                if(response.status === 200) {
                    setIsFirstMount(false);
                    setIsLoggedIn(true);
                    navigate('/');
                }
            } catch (error) {
                console.error('로그인 검증 실패:', error);
                setIsLoggedIn(false);
                setIsFirstMount(true);
            }
        };
            // 첫 방문이면서 로그인 상태가 아닌 경우에만 자동 로그인 시도
            // 로그아웃 직후에는 isFirstMount가 false이므로 시도하지 않음
        if(isFirstMount && !isLoggedIn) {
            getIsLoggedIn();
        }
    }, [isFirstMount, isLoggedIn, setIsFirstMount, setIsLoggedIn, navigate]);

    return (
        <Wrapper>
            <Background>
                <LoginForm />
            </Background>
            <Footer />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%; //화면 높이 여기서 수정
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
