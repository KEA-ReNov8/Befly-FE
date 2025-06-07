import { Navigate, Outlet } from 'react-router-dom';
import useIsLoggedInStore from '@shared/store/useIsLoggedInStore';

// 로그인/회원가입 페이지용 - 로그인되어 있으면 홈으로 리다이렉트
export const PublicRouter = () => {
  const { isLoggedIn } = useIsLoggedInStore();

  // 로그인 상태 - "/"으로 이동
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  // 로그인 X - 해당 라우트 렌더링
  return <Outlet />;
};

// 메인 콘텐츠용 - 로그인 안되어 있으면 로그인 페이지로 리다이렉트
export const ProtectedRouter = () => {
  const { isLoggedIn } = useIsLoggedInStore();

  // 로그인 안됨 - "/login"으로 이동
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  // 로그인됨 - 해당 라우트 렌더링
  return <Outlet />;
};
