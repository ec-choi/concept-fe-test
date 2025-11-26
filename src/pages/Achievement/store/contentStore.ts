import type {
  ChipWithAchievement,
  LittleChapter,
  MiddleChapter,
} from '@/pages/Achievement/hooks/useStudentAchievement';
import type { DIFFICULTY_TYPE } from '@/entities/typeChip/model/types';
import { create } from 'zustand';

type ContentStoreType = {
  selectedChipIds: Set<number>;
};

type ContentStoreActionType = {
  toggleChip: (chipId: number) => void;
  toggleDifficultyGroup: (
    littleChapterId: number,
    difficulty: DIFFICULTY_TYPE,
    chips: ChipWithAchievement[],
  ) => void;
  toggleLittleChapter: (littleChapter: LittleChapter) => void;
  toggleMiddleChapter: (
    middleChapter: MiddleChapter extends Map<number, infer T> ? T : never,
  ) => void;
  getFilteredSelectedChips: (filteredChipIds: number[]) => Set<number>;
  syncWithFilteredChips: (filteredChipIds: number[]) => void;
  resetSelection: () => void;
};

// 체크 상태 계산 유틸리티 함수들
export const getChipCheckState = (
  chipId: number,
  selectedChipIds: Set<number>,
) => {
  return {
    checked: selectedChipIds.has(chipId),
    indeterminate: false,
  };
};

export const getDifficultyGroupCheckState = (
  chips: ChipWithAchievement[],
  selectedChipIds: Set<number>,
) => {
  if (chips.length === 0) {
    return {
      checked: false,
      indeterminate: false,
      selectedCount: 0,
      totalCount: 0,
    };
  }

  const selectedCount = chips.filter((chip) =>
    selectedChipIds.has(chip.conceptChipId),
  ).length;

  if (selectedCount === 0) {
    return {
      checked: false,
      indeterminate: false,
      selectedCount: 0,
      totalCount: chips.length,
    };
  } else if (selectedCount === chips.length) {
    return {
      checked: true,
      indeterminate: false,
      selectedCount,
      totalCount: chips.length,
    };
  } else {
    return {
      checked: false,
      indeterminate: true,
      selectedCount,
      totalCount: chips.length,
    };
  }
};

export const getLittleChapterCheckState = (
  littleChapter: LittleChapter,
  selectedChipIds: Set<number>,
) => {
  const allChips: ChipWithAchievement[] = [];
  Object.values(littleChapter.difficulties).forEach((chips) => {
    allChips.push(...chips);
  });

  if (allChips.length === 0) {
    return {
      checked: false,
      indeterminate: false,
      selectedCount: 0,
      totalCount: 0,
    };
  }

  const selectedCount = allChips.filter((chip) =>
    selectedChipIds.has(chip.conceptChipId),
  ).length;

  if (selectedCount === 0) {
    return {
      checked: false,
      indeterminate: false,
      selectedCount: 0,
      totalCount: allChips.length,
    };
  } else if (selectedCount === allChips.length) {
    return {
      checked: true,
      indeterminate: false,
      selectedCount,
      totalCount: allChips.length,
    };
  } else {
    return {
      checked: false,
      indeterminate: true,
      selectedCount,
      totalCount: allChips.length,
    };
  }
};

export const getMiddleChapterCheckState = (
  middleChapter: MiddleChapter extends Map<number, infer T> ? T : never,
  selectedChipIds: Set<number>,
) => {
  const allChips: ChipWithAchievement[] = [];
  middleChapter.littleChapters.forEach((littleChapter) => {
    Object.values(littleChapter.difficulties).forEach((chips) => {
      allChips.push(...chips);
    });
  });

  if (allChips.length === 0) {
    return {
      checked: false,
      indeterminate: false,
      selectedCount: 0,
      totalCount: 0,
    };
  }

  const selectedCount = allChips.filter((chip) =>
    selectedChipIds.has(chip.conceptChipId),
  ).length;

  if (selectedCount === 0) {
    return {
      checked: false,
      indeterminate: false,
      selectedCount: 0,
      totalCount: allChips.length,
    };
  } else if (selectedCount === allChips.length) {
    return {
      checked: true,
      indeterminate: false,
      selectedCount,
      totalCount: allChips.length,
    };
  } else {
    return {
      checked: false,
      indeterminate: true,
      selectedCount,
      totalCount: allChips.length,
    };
  }
};

export const createContentStore = () =>
  create<ContentStoreType & ContentStoreActionType>((set, get) => ({
    selectedChipIds: new Set<number>(),

    toggleChip: (chipId: number) => {
      set((state) => {
        const newSelectedChipIds = new Set(state.selectedChipIds);
        if (newSelectedChipIds.has(chipId)) {
          newSelectedChipIds.delete(chipId);
        } else {
          newSelectedChipIds.add(chipId);
        }
        return { selectedChipIds: newSelectedChipIds };
      });
    },

    toggleDifficultyGroup: (
      _littleChapterId: number,
      _difficulty: DIFFICULTY_TYPE,
      chips: ChipWithAchievement[],
    ) => {
      set((state) => {
        const newSelectedChipIds = new Set(state.selectedChipIds);
        const checkState = getDifficultyGroupCheckState(
          chips,
          state.selectedChipIds,
        );

        // 파트체크(indeterminate) 또는 체크 안됨 상태면 모두 선택
        if (checkState.indeterminate || !checkState.checked) {
          chips.forEach((chip) => {
            newSelectedChipIds.add(chip.conceptChipId);
          });
        } else {
          // 모두 체크된 상태면 모두 해제
          chips.forEach((chip) => {
            newSelectedChipIds.delete(chip.conceptChipId);
          });
        }

        return { selectedChipIds: newSelectedChipIds };
      });
    },

    toggleLittleChapter: (littleChapter: LittleChapter) => {
      set((state) => {
        const newSelectedChipIds = new Set(state.selectedChipIds);
        const allChips: ChipWithAchievement[] = [];
        Object.values(littleChapter.difficulties).forEach((chips) => {
          allChips.push(...chips);
        });

        const checkState = getLittleChapterCheckState(
          littleChapter,
          state.selectedChipIds,
        );

        // 파트체크(indeterminate) 또는 체크 안됨 상태면 모두 선택
        if (checkState.indeterminate || !checkState.checked) {
          allChips.forEach((chip) => {
            newSelectedChipIds.add(chip.conceptChipId);
          });
        } else {
          // 모두 체크된 상태면 모두 해제
          allChips.forEach((chip) => {
            newSelectedChipIds.delete(chip.conceptChipId);
          });
        }

        return { selectedChipIds: newSelectedChipIds };
      });
    },

    toggleMiddleChapter: (
      middleChapter: MiddleChapter extends Map<number, infer T> ? T : never,
    ) => {
      set((state) => {
        const newSelectedChipIds = new Set(state.selectedChipIds);
        const allChips: ChipWithAchievement[] = [];
        middleChapter.littleChapters.forEach((littleChapter) => {
          Object.values(littleChapter.difficulties).forEach((chips) => {
            allChips.push(...chips);
          });
        });

        const checkState = getMiddleChapterCheckState(
          middleChapter,
          state.selectedChipIds,
        );

        // 파트체크(indeterminate) 또는 체크 안됨 상태면 모두 선택
        if (checkState.indeterminate || !checkState.checked) {
          allChips.forEach((chip) => {
            newSelectedChipIds.add(chip.conceptChipId);
          });
        } else {
          // 모두 체크된 상태면 모두 해제
          allChips.forEach((chip) => {
            newSelectedChipIds.delete(chip.conceptChipId);
          });
        }

        return { selectedChipIds: newSelectedChipIds };
      });
    },

    getFilteredSelectedChips: (filteredChipIds: number[]) => {
      const state = get();
      const filteredSet = new Set(filteredChipIds);
      const result = new Set<number>();

      state.selectedChipIds.forEach((chipId) => {
        if (filteredSet.has(chipId)) {
          result.add(chipId);
        }
      });

      return result;
    },

    syncWithFilteredChips: (filteredChipIds: number[]) => {
      set((state) => {
        const filteredSet = new Set(filteredChipIds);
        const newSelectedChipIds = new Set<number>();

        state.selectedChipIds.forEach((chipId) => {
          if (filteredSet.has(chipId)) {
            newSelectedChipIds.add(chipId);
          }
        });

        return { selectedChipIds: newSelectedChipIds };
      });
    },

    resetSelection: () => {
      set({ selectedChipIds: new Set<number>() });
    },
  }));
