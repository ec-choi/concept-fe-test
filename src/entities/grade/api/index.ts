import type { Grade } from '@/entities/grade/model/types';
import { http } from '@/shared/lib/http';

export const gradeApi = {
  getGrades: async () => {
    return (await http.get<Grade[]>('grades')).json();
  },
};
