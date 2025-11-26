import type { TypeChip } from '@/entities/typeChip/model/types';
import type { ChipWithAchievement } from '@/pages/Achievement/hooks/useStudentAchievement';
import type { LittleChapter } from '@/pages/Achievement/hooks/useStudentAchievement';
import type { MiddleChapter } from '@/pages/Achievement/hooks/useStudentAchievement';

const getCheckStateFromChips = (
  chips: ChipWithAchievement[],
  selectedChipIds: Set<number>,
) => {
  const totalCount = chips.length;
  if (totalCount === 0) {
    return {
      checked: false,
      indeterminate: false,
    };
  }

  let selectedCount = 0;
  for (let i = 0; i < totalCount; i++) {
    if (selectedChipIds.has(chips[i].conceptChipId)) {
      selectedCount++;
    }
  }

  if (selectedCount === 0) {
    return {
      checked: false,
      indeterminate: false,
    };
  }

  if (selectedCount === totalCount) {
    return {
      checked: true,
      indeterminate: false,
    };
  }

  return {
    checked: false,
    indeterminate: true,
  };
};

export const getDifficultyGroupCheckState = (
  chips: ChipWithAchievement[],
  selectedChipIds: Set<TypeChip['conceptChipId']>,
) => {
  return getCheckStateFromChips(chips, selectedChipIds);
};

export const getLittleChapterCheckState = (
  littleChapter: LittleChapter,
  selectedChipIds: Set<number>,
) => {
  const allChips = Object.values(littleChapter.difficulties).flat();
  return getCheckStateFromChips(allChips, selectedChipIds);
};

export const getMiddleChapterCheckState = (
  middleChapter: MiddleChapter extends Map<number, infer T> ? T : never,
  selectedChipIds: Set<number>,
) => {
  const allChips = Array.from(middleChapter.littleChapters.values()).flatMap(
    (littleChapter) => Object.values(littleChapter.difficulties).flat(),
  );
  return getCheckStateFromChips(allChips, selectedChipIds);
};
