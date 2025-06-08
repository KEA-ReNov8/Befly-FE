import { Navigate, Outlet } from 'react-router-dom';
import useIsLoggedInStore from '@shared/store/useIsLoggedInStore';

// 로그인/회원가입 페이지용 - 로그인되어 있으면 홈으로 리다이렉트
export const ProtectedRouter = () => {
  const { isLoggedIn } = useIsLoggedInStore();

  if (!isLoggedIn || isLoggedIn === null) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
