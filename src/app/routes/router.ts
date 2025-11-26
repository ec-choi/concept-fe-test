import { AchievementPage } from '@/pages/Achievement/Achievement.page';
import { Layout } from '@/widgets/Layout/Layout';
import { createBrowserRouter, redirect, generatePath } from 'react-router';
import { queryClient } from '@/shared/lib/queryClient';
import { studentQueries } from '@/entities/student/api/queries';

export const ROOT = '/';
export const ACHIEVEMENT = `:studentId`;

export const router = createBrowserRouter([
  {
    path: ROOT,
    Component: Layout,
    loader: Layout.loader,
    children: [
      {
        index: true,
        loader: async () => {
          const { data: students } = await queryClient.ensureQueryData(
            studentQueries.student(),
          );
          const redirectRoute = generatePath(ACHIEVEMENT, {
            studentId: students?.[0].id,
          });
          return redirect(redirectRoute);
        },
      },
      {
        path: ACHIEVEMENT,
        Component: AchievementPage,
        loader: AchievementPage.loader,
      },
    ],
  },
]);
