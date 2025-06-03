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

    const { isFirstMount, setIsFirstMount, setIsLoggedIn } = useIsLoggedInStore.getState();

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
                //setIsFirstMount(false);
            }
        };
        if(isFirstMount) {
            getIsLoggedIn();
        }
    }, []);

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
