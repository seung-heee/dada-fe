import RootLayout from '@/layout/RootLayout.tsx';
import OnBoarding from '@/pages/OnBoarding.tsx';
import { createBrowserRouter } from 'react-router';
import CreateRoomPage from '@/pages/CreateRoomPage.tsx';
import VotePage from '@/pages/VotePage.tsx';
import Dashboard from '@/pages/Dashboard.tsx';
import NotFound from '@/pages/NotFound.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: OnBoarding },
      { path: 'create-room', Component: CreateRoomPage },
      { path: 'vote/:roomId', Component: VotePage },
      { path: 'dashboard/:roomId', Component: Dashboard },
      { path: '404', Component: NotFound },
    ],
  },
]);
