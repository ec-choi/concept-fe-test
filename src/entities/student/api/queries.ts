import { studentApi } from '@/entities/student/api';
import { queryOptions } from '@tanstack/react-query';

export const studentQueries = {
  root: () => ['/students'],
  student: () =>
    queryOptions({
      queryKey: studentQueries.root(),
      queryFn: () => studentApi.getStudents(),
    }),
};
