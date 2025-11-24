import { gradeApi } from '@/entities/grade/api';
import { queryOptions } from '@tanstack/react-query';

export const gradeQueries = {
  root: () => ['/grades'],
  grade: () =>
    queryOptions({
      queryKey: gradeQueries.root(),
      queryFn: () => gradeApi.getGrades(),
    }),
};
