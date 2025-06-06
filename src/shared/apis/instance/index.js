import axios from 'axios';
import useIsLoggedInStore from '@shared/store/useIsLoggedInStore';

export const apiInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  //baseURL: '/api', // 프록시 설정 적용
  timeout: 10000,
  withCredentials: true,
});

const nonToken = [
    '/auth/signin', //로그인
    '/auth/signup', //자체
    '/auth/refresh', //토큰 재발급
    '/auth/logout', //로그아웃
];

apiInstance.interceptors.request.use((config) => {
  const apiURL = config.url;
  if (apiURL && nonToken.includes(apiURL)) return config;
  //헤더 방식으로 토큰 사용하는 경우
  /*const { accessToken } = useAuthStore();
    if (accessToken) {
        (config.headers).Authorization = `Bearer ${accessToken}`;
    }*/
  return config;
});

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response.data.code;
    const message = error.response.data.message;
    // const { isFirstMount, setIsFirstMount } = useIsLoggedInStore().getState();
    const { isFirstMount, setIsFirstMount } = useIsLoggedInStore.getState();

    // refresh token 만료 -> 에러코드 세분화 refresh401 등
    if (
      statusCode === 'REFRESH_TOKEN_NOT_VALID' ||
      message === '토큰이 만료되었습니다. 다시 로그인해주세요' ||
      (error.response.config.url === '/auth/refresh' && error.status === 400)
    ) {
      // 로그인 페이지 이동 - refresh
      if (isFirstMount) {
        return setIsFirstMount(false);
      }
      return (window.location.href = `${import.meta.env.VITE_REDIRECT_ADDRESS}`);
    }
    if (error.response?.status === 401 && error.response.config.url !== '/auth/signin') {
      try {
        const res = await apiInstance.get('/auth/refresh');

        /*const newAccessToken = res.data.result.accessToken;
          const { setAccessToken } = useAuthStore.getState();
          setAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;*/

        return apiInstance(originalRequest); //요청 재시도
      } catch (error) {
        console.error(error);
      }
    }
    return Promise.reject(error);
  },
);
