import type { ACHIEVEMENT_GRADE } from '@/entities/achievement/model/types';
import type { Grade } from '@/entities/grade/model/types';
import { create } from 'zustand';

type FilterStoreType = {
  gradeKey: Grade['key'];
  isRecommendOnly: boolean;
  achievementGrades: ACHIEVEMENT_GRADE[];
};

type FilterStoreActionType = {
  setFilter: (filter: Partial<FilterStoreType>) => void;
  toggleAchievementGrade: (grade: ACHIEVEMENT_GRADE) => void;
  resetFilter: () => void;
};

export const createFilterStore = ({
  initialGradeKey,
}: {
  initialGradeKey: FilterStoreType['gradeKey'];
}) => {
  const INITIAL_VALUE = {
    gradeKey: initialGradeKey ?? '',
    isRecommendOnly: false,
    achievementGrades: [],
  };

  return create<FilterStoreType & FilterStoreActionType>((set) => {
    return {
      ...INITIAL_VALUE,
      setFilter: (filter) => set((state) => ({ ...state, ...filter })),
      toggleAchievementGrade: (grade) =>
        set((state) => {
          const isSelected = state.achievementGrades.includes(grade);
          return {
            ...state,
            achievementGrades: isSelected
              ? state.achievementGrades.filter((g) => g !== grade)
              : [...state.achievementGrades, grade],
          };
        }),
      resetFilter: () => set((state) => ({ ...state, ...INITIAL_VALUE })),
    };
  });
};
