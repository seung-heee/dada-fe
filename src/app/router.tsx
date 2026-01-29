import RootLayout from '@/layout/RootLayout.tsx';
import { createBrowserRouter } from 'react-router';
import CreateRoomPage from '@/pages/CreateRoomPage.tsx';
import VotePage from '@/pages/VotePage.tsx';
import DashboardPage from '@/pages/DashboardPage.tsx';
import OnBoardingPage from '@/pages/OnBoardingPage.tsx';
import NotFoundPage from '@/pages/NotFoundPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: OnBoardingPage },
      { path: 'create-room', Component: CreateRoomPage },
      { path: 'vote/:roomId', Component: VotePage },
      { path: 'dashboard/:roomId', Component: DashboardPage },
      { path: '404', Component: NotFoundPage },
    ],
  },
]);

export default router;
