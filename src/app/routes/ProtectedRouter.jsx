import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRouter = () => {
  //const { isLoggedIn } = useIsLoggedInStore.getState();

  // 로그인 상태 - "/home"으로 이동
  /*if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }*/

  // 로그인 X - 해당 라우트 렌더링
  return <Outlet />;
};