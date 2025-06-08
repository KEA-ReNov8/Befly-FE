import styled from 'styled-components';
import Footer from '@shared/ui/Footer';
import Background from '@pages/login/components/Background';
import LoginForm from '@pages/login/components/LoginForm';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import useIsLoggedInStore from '@shared/store/useIsLoggedInStore';
import { useMyInfoStore } from '@shared/store/useMyInfoStore';
import { fetchMyInfo } from '@shared/apis/user/user';

export const LoginPage = () => {
    const navigate = useNavigate();
    const { isFirstMount, isLoggedIn, setIsFirstMount, setIsLoggedIn } = useIsLoggedInStore();
    const { setMyInfo } = useMyInfoStore();
    const retryCountRef = useRef(0);
    const maxRetries = 2; // 최대 3번 재시도
    const retryDelay = 2000; // 2초 간격
    
    useEffect(() => {
        const run = async () => {
          try {
            const response = await fetchMyInfo(); // 소셜 로그인 이후 토큰이 있으면 성공
            if (response?.result) {
              setMyInfo(response.result);
              setIsLoggedIn(true);
              setIsFirstMount(false);
              retryCountRef.current = 0; // 성공 시 재시도 카운트 리셋
              navigate('/', { replace: true });
            } else {
              // 로그인 실패 시도
              handleFailure();
            }
          } catch (e) {
            console.warn('소셜 로그인 후 사용자 정보 가져오기 실패:', e);
            handleFailure();
          }
        };

        const handleFailure = () => {
          retryCountRef.current += 1;
          
          if (retryCountRef.current >= maxRetries) {
            // 최대 재시도 횟수 초과 시 더 이상 재시도하지 않음
            console.warn(`최대 재시도 횟수(${maxRetries})를 초과했습니다. 재시도를 중단합니다.`);
            setIsLoggedIn(false);
            setIsFirstMount(false); // 더 이상 재시도하지 않도록 false로 설정
            return;
          }

          // 재시도 대기 시간 후 다시 시도
          console.log(`재시도 ${retryCountRef.current}/${maxRetries} 예정 (${retryDelay}ms 후)`);
          setTimeout(() => {
            setIsLoggedIn(false);
            setIsFirstMount(true);
          }, retryDelay);
        };
    
        if (isFirstMount === null || isLoggedIn === null) {
          setIsFirstMount(true);
          setIsLoggedIn(false);
          retryCountRef.current = 0;
        }
    
        if (isFirstMount && retryCountRef.current < maxRetries) {
          run();
        }
      }, [isFirstMount, isLoggedIn])

    /*useEffect(() => {
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
                setIsFirstMount(true);
                setIsFirstMount(true);
            }
        };
            // 첫 방문이면서 로그인 상태가 아닌 경우에만 자동 로그인 시도
            // 로그아웃 직후에는 isFirstMount가 false이므로 시도하지 않음
        if(isFirstMount) {
            // 첫 방문이면서 로그인 상태가 아닌 경우에만 자동 로그인 시도
            // 로그아웃 직후에는 isFirstMount가 false이므로 시도하지 않음
        if(isFirstMount) {
            getIsLoggedIn();
        }
    }, [isFirstMount, isLoggedIn, setIsFirstMount, setIsLoggedIn, navigate]);*/

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
