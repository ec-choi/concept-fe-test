import { AchievementPage } from '@/pages/Achievement/Achievement.page';
import { createBrowserRouter } from 'react-router';

export const ROOT = '/';
export const ROOT_WITH_STUDENT_ID = `${ROOT}/:studentId`;

export const router = createBrowserRouter([
  {
    path: ROOT,
    Component: AchievementPage,
    loader: AchievementPage.loader,
    children: [
      {
        path: ROOT_WITH_STUDENT_ID,
        Component: AchievementPage,
        loader: AchievementPage.loader,
      },
    ],
  },
]);
