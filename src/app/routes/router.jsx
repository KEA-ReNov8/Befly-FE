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
import { PublicRouter } from './ProtectedRouter';

export const router = createBrowserRouter([
  // 로그인/회원가입 페이지 - 로그인되어 있으면 홈으로 리다이렉트
  {
    path: '/',
    element: <PublicRouter />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
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
    ]
  },
  // 메인 콘텐츠 - 로그인 안되어 있으면 로그인 페이지로 리다이렉트
  {
    path: '/',
    element: <ProtectedRouter />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
        ],
      },
      {
        path: 'free',
        element: <RootLayout />,
        children: [
          {
            path: 'page/:page',
            element: <FreePostListPage />,
          },
          {
            path: 'create-free',
            element: <FreePostPage />,
          },
          {
            path: 'edit/:postId',
            element: <FreePostPage />,
          },
          {
            path: ':postId',
            element: <FreePage />,
          },
        ],
      },
      {
        path: 'share',
        element: <RootLayout />,
        children: [
          {
            path: 'page/:page',
            element: <SharePostListPage />,
          },
          {
            path: 'create-share',
            element: <SharePostPage />,
          },
          {
            path: ':postId',
            element: <SharePage />,
          },
        ],
      },
      {
        path: 'my',
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <MyPage />,
          },
          {
            path: 'myworry',
            element: <MyWorryPage />,
          },
        ],
      },
      {
        path: 'profile/:userId',
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <UserProfilePage />,
          },
        ],
      },
      {
        path: 'report/:sessionId',
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <ReportPage />,
          },
        ],
      },
      {
        path: 'chat/:sessionId',
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <ChatPage />,
          },
        ],
      },
    ],
  },
]);
