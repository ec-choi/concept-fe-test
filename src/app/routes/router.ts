import { AchievementPage } from '@/pages/Achievement/Achievement.page';
import { Layout } from '@/widgets/Layout/Layout';
import { createBrowserRouter } from 'react-router';

export const ROOT = '/';
export const ACHIEVEMENT = `:studentId`;

export const router = createBrowserRouter([
  {
    path: ROOT,
    Component: Layout,
    loader: Layout.loader,
    children: [
      {
        path: ACHIEVEMENT,
        Component: AchievementPage,
        loader: AchievementPage.loader,
      },
    ],
  },
]);
