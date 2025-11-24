import { studentApi } from '@/entities/student/api';
import { queryOptions } from '@tanstack/react-query';

export const sudentQueries = {
  root: () => ['/students'],
  student: () =>
    queryOptions({
      queryKey: sudentQueries.root(),
      queryFn: () => studentApi.getStudents(),
    }),
};
