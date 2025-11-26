import type { ChipWithAchievement } from '@/pages/Achievement/hooks/useStudentAchievement';
import type { LittleChapter } from '@/pages/Achievement/hooks/useStudentAchievement';
import type { MiddleChapter } from '@/pages/Achievement/hooks/useStudentAchievement';

export const getDifficultyGroupCheckState = (
  chips: ChipWithAchievement[],
  selectedChipIds: Set<number>,
) => {
  if (chips.length === 0) {
    return {
      checked: false,
      indeterminate: false,
    };
  }

  const selectedCount = chips.filter((chip) =>
    selectedChipIds.has(chip.conceptChipId),
  ).length;

  if (selectedCount === 0) {
    return {
      checked: false,
      indeterminate: false,
    };
  } else if (selectedCount === chips.length) {
    return {
      checked: true,
      indeterminate: false,
    };
  } else {
    return {
      checked: false,
      indeterminate: true,
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
    };
  }

  const selectedCount = allChips.filter((chip) =>
    selectedChipIds.has(chip.conceptChipId),
  ).length;

  if (selectedCount === 0) {
    return {
      checked: false,
      indeterminate: false,
    };
  } else if (selectedCount === allChips.length) {
    return {
      checked: true,
      indeterminate: false,
    };
  } else {
    return {
      checked: false,
      indeterminate: true,
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
    };
  }

  const selectedCount = allChips.filter((chip) =>
    selectedChipIds.has(chip.conceptChipId),
  ).length;

  if (selectedCount === 0) {
    return {
      checked: false,
      indeterminate: false,
    };
  } else if (selectedCount === allChips.length) {
    return {
      checked: true,
      indeterminate: false,
    };
  } else {
    return {
      checked: false,
      indeterminate: true,
    };
  }
};
