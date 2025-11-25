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
    };
  });
};
