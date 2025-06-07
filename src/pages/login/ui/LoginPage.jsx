import styled from 'styled-components';
import Footer from '@shared/ui/Footer';
import Background from '@pages/login/components/Background';
import LoginForm from '@pages/login/components/LoginForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useIsLoggedInStore from '@shared/store/useIsLoggedInStore';
import { apiInstance } from '@/shared/apis/instance';


export const LoginPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
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
                setIsFirstMount(false);
            }
        };
        
        // 소셜 로그인 성공 후 리다이렉트인지 확인 (여러 방법 시도)
        const hasRefreshToken = document.cookie.includes('refreshToken') || document.cookie.includes('JSESSIONID');
        
        // 소셜 로그인 후이거나, 쿠키가 있거나, 첫 방문이면서 로그인 상태가 아닌 경우 자동 로그인 시도
        if(hasRefreshToken || (isFirstMount && !isLoggedIn)) {
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
