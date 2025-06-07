import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@app/layout';
import { HomePage } from '@pages/home';
import { LoginPage, SignupPage, SelfSignupPage, FindPwPage } from '@pages/login';
import { MyPage, MyWorryPage } from '@pages/my';
import {
  FreePage,
  FreePostListPage,
  FreePostPage,
  SharePage,
  SharePostListPage,
  SharePostPage,
} from '@pages/post';
import { UserProfilePage } from '@pages/profile';
import { ReportPage } from '@pages/report';
import { ChatPage } from '@pages/chat';
import { ErrorPage } from '@pages/error/ErrorPage';
import { ProtectedRouter } from './ProtectedRouter';

export const router = createBrowserRouter([
  // 로그인/회원가입 페이지 - 로그인되어 있으면 홈으로 리다이렉트
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'signup',
    element: <SignupPage />,
  },
  {
    path: 'common-signup',
    element: <SelfSignupPage />,
  },
  {
    path: 'find-pw',
    element: <FindPwPage />,
  },

  {
    path: '/',
    element: <ProtectedRouter />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { index: true, element: <HomePage /> },
        ],
      },
    ],
  },

  // 자유 게시판
  {
    path: 'free',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'page/:page', element: <FreePostListPage /> },
      { path: 'create-free', element: <FreePostPage /> },
      { path: 'edit/:postId', element: <FreePostPage /> },
      { path: ':postId', element: <FreePage /> },
    ],
  },

  // 나눔 게시판
  {
    path: 'share',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'page/:page', element: <SharePostListPage /> },
      { path: 'create-share', element: <SharePostPage /> },
      { path: ':postId', element: <SharePage /> },
    ],
  },

  // 마이페이지
  {
    path: 'my',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MyPage /> },
      { path: 'myworry', element: <MyWorryPage /> },
    ],
  },

  // 유저 프로필
  {
    path: 'profile/:userId',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <UserProfilePage /> },
    ],
  },

  // 리포트 페이지
  {
    path: 'report/:sessionId',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ReportPage /> },
    ],
  },

  // 채팅 페이지
  {
    path: 'chat/:sessionId',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ChatPage /> },
    ],
  },
]);
