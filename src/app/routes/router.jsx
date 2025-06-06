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
  //작업 완료시 프로텍트 라우터로 전환 예정
  /*{
    path: '/',
    element: <ProtectedRouter />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
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
  },*/
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
    path: 'profile/:id',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <UserProfilePage />,
      },
    ],
  },
  {
    path: 'report',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ReportPage />,
      },
    ],
  },
  {
    path: 'chat',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ChatPage />,
      },
    ],
  },
]);
