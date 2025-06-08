import styled from 'styled-components';
import { BannerPlaceHolder, SectionsContainer } from '../index';
import TopBar from '@/shared/ui/TopBar/TopBar';
import theme from '@/app/styles/theme';
import { useEffect } from 'react';
import { useMyInfoStore } from '@shared/store/useMyInfoStore';
import { fetchMyInfo } from '@shared/apis/user/user';
import useIsLoggedInStore from '@shared/store/useIsLoggedInStore';

export const HomePage = () => {
  const { myInfo, setMyInfo } = useMyInfoStore();
  const { isLoggedIn, setIsLoggedIn, setIsFirstMount } = useIsLoggedInStore();

  useEffect(() => {
    // 로그인 상태이지만 사용자 정보가 없는 경우 (소셜 로그인 후 상황)
    if (isLoggedIn && !myInfo) {
      console.log('로그인 상태이지만 사용자 정보가 없음. 사용자 정보 요청 시작...');
      
      const loadUserInfo = async () => {
        try {
          const myInfoResponse = await fetchMyInfo();
          console.log('홈페이지에서 사용자 정보 응답:', myInfoResponse);
          
          if (myInfoResponse?.result) {
            const { setIsLoggedIn, setIsFirstMount } = useIsLoggedInStore.getState();

            setMyInfo(myInfoResponse.result);
            console.log('홈페이지에서 사용자 정보 저장 완료:', myInfoResponse.result);

            setIsLoggedIn(true);
            setIsFirstMount(false);
            console.log('홈페이지에서 로그인 상태 저장 완료:', isLoggedIn);
          } else {
            console.warn('사용자 정보 응답에 result가 없음:', myInfoResponse);
          }
        } catch (error) {
          console.error('홈페이지에서 사용자 정보 가져오기 실패:', error);
        }
      };

      loadUserInfo();
    }
  }, [isLoggedIn, myInfo, setMyInfo]);

  return (
    <HomeContainer>
      <TopBar />
      <BannerPlaceHolder />
      <SectionsContainer />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  background-color: ${theme.colors.other.white};

  ::-webkit-scrollbar {
    display: none;
  } //스크롤바 여부
`;
