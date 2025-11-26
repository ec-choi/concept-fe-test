import { achievementApi } from '@/entities/achievement/api';
import { queryOptions } from '@tanstack/react-query';

export const achievementQueries = {
  root: () => ['/achievement'],
  achievement: (params: Parameters<typeof achievementApi.getAchievements>[0]) =>
    queryOptions({
      queryKey: [
        ...achievementQueries.root(),
        params.studentId,
        params.gradeKey,
      ],
      queryFn: () => achievementApi.getAchievements(params),
    }),
};
