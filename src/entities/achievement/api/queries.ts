import { achievementApi } from '@/entities/achievement/api';
import { queryOptions } from '@tanstack/react-query';

export const achievementQueries = {
  root: () => ['/achievements'],
  achievement: (
    searchParams: Parameters<typeof achievementApi.getAchievements>[0],
  ) =>
    queryOptions({
      queryKey: [
        ...achievementQueries.root(),
        searchParams.studentId,
        searchParams.gradeKey,
      ],
      queryFn: () => achievementApi.getAchievements(searchParams),
    }),
};
