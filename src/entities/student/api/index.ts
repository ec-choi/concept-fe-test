import type { Student } from '@/entities/student/model/types';
import { http } from '@/shared/lib/http';

export const studentApi = {
  getStudents: async () => {
    return await http.get<Student[]>('students');
  },
};
