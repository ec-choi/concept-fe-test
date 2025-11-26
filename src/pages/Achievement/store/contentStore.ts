import type {
  ChipWithAchievement,
  LittleChapter,
  MiddleChapterValue,
} from '@/pages/Achievement/model/types';
import type { TypeChip } from '@/entities/typeChip/model/types';
import { create } from 'zustand';
import {
  getDifficultyGroupCheckState,
  getLittleChapterCheckState,
  getMiddleChapterCheckState,
} from '@/pages/Achievement/helper/checkState';
import {
  collectAllChipsFromLittleChapter,
  collectAllChipsFromMiddleChapter,
} from '@/pages/Achievement/helper/chipUtils';

type ContentStoreType = {
  selectedChipIds: Set<TypeChip['conceptChipId']>;
};

type ContentStoreActionType = {
  toggleChip: (chipId: TypeChip['conceptChipId']) => void;
  // 난도 선택 체크
  toggleDifficultyGroup: (chips: ChipWithAchievement[]) => void;
  // 소단원 선택 체크
  toggleLittleChapter: (littleChapter: LittleChapter) => void;
  // 중단원 선택 체크
  toggleMiddleChapter: (middleChapter: MiddleChapterValue) => void;

  // 필터링된 칩 ID 목록과 동기화
  syncWithFilteredChips: (filteredChipIds: TypeChip['conceptChipId'][]) => void;
  resetSelection: () => void;
};

// 공통 토글 로직(스토어에서만 쓰임)
const toggleChipsByCheckState = (
  currentSelectedChipIds: Set<number>,
  chips: ChipWithAchievement[],
  checkState: { checked: boolean; indeterminate: boolean },
): Set<number> => {
  const newSelectedChipIds = new Set(currentSelectedChipIds);

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

  return newSelectedChipIds;
};

export const createContentStore = () =>
  create<ContentStoreType & ContentStoreActionType>((set) => ({
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

    toggleDifficultyGroup: (chips: ChipWithAchievement[]) => {
      set((state) => {
        const checkState = getDifficultyGroupCheckState(
          chips,
          state.selectedChipIds,
        );
        const newSelectedChipIds = toggleChipsByCheckState(
          state.selectedChipIds,
          chips,
          checkState,
        );
        return { selectedChipIds: newSelectedChipIds };
      });
    },

    toggleLittleChapter: (littleChapter: LittleChapter) => {
      set((state) => {
        const allChips = collectAllChipsFromLittleChapter(littleChapter);

        const checkState = getLittleChapterCheckState(
          littleChapter,
          state.selectedChipIds,
        );
        const newSelectedChipIds = toggleChipsByCheckState(
          state.selectedChipIds,
          allChips,
          checkState,
        );
        return { selectedChipIds: newSelectedChipIds };
      });
    },

    toggleMiddleChapter: (middleChapter: MiddleChapterValue) => {
      set((state) => {
        const allChips = collectAllChipsFromMiddleChapter(middleChapter);

        const checkState = getMiddleChapterCheckState(
          middleChapter,
          state.selectedChipIds,
        );
        const newSelectedChipIds = toggleChipsByCheckState(
          state.selectedChipIds,
          allChips,
          checkState,
        );
        return { selectedChipIds: newSelectedChipIds };
      });
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
