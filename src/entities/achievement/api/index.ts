import type { Achievement } from '@/entities/achievement/model/types';
import type { Grade } from '@/entities/grade/model/types';
import type { Student } from '@/entities/student/model/types';
import { http } from '@/shared/lib/http';

export const achievementApi = {
  getAchievements: async (params: {
    studentId: Student['id'];
    gradeKey: Grade['key'];
  }) => {
    return await http.get<Achievement[]>('/achievement', { params });
  },
};
