import type {
  ChipWithAchievement,
  LittleChapter,
  MiddleChapter,
} from '@/pages/Achievement/hooks/useStudentAchievement';
import type { DIFFICULTY_TYPE } from '@/entities/typeChip/model/types';
import { create } from 'zustand';
import {
  getDifficultyGroupCheckState,
  getLittleChapterCheckState,
  getMiddleChapterCheckState,
} from '@/pages/Achievement/helper/checkState';

type ContentStoreType = {
  selectedChipIds: Set<number>;
};

type ContentStoreActionType = {
  toggleChip: (chipId: number) => void;
  // 난도 선택 체크
  toggleDifficultyGroup: (
    littleChapterId: number,
    difficulty: DIFFICULTY_TYPE,
    chips: ChipWithAchievement[],
  ) => void;
  // 소단원 선택 체크
  toggleLittleChapter: (littleChapter: LittleChapter) => void;
  // 중단원 선택 체크
  toggleMiddleChapter: (
    middleChapter: MiddleChapter extends Map<number, infer T> ? T : never,
  ) => void;
  // 필터링된 칩 ID 목록 추출
  getFilteredSelectedChips: (filteredChipIds: number[]) => Set<number>;
  // 필터링된 칩 ID 목록과 동기화
  syncWithFilteredChips: (filteredChipIds: number[]) => void;
  resetSelection: () => void;
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
