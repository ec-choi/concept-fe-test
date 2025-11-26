import type { ChipWithAchievement } from '@/pages/Achievement/hooks/useStudentAchievement';
import type { LittleChapter } from '@/pages/Achievement/hooks/useStudentAchievement';
import type { MiddleChapter } from '@/pages/Achievement/hooks/useStudentAchievement';

export const getChipCheckState = (
  chipId: number,
  selectedChipIds: Set<number>,
) => {
  console.log('chipId', chipId);
  console.log('selectedChipIds', selectedChipIds);
  return {
    checked: selectedChipIds.has(chipId),
    indeterminate: false,
  };
};

export const getDifficultyGroupCheckState = (
  chips: ChipWithAchievement[],
  selectedChipIds: Set<number>,
) => {
  console.log('getDifficultyGroupCheckState chips', chips);
  console.log('getDifficultyGroupCheckState selectedChipIds', selectedChipIds);
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
  console.log('getLittleChapterCheckState littleChapter', littleChapter);
  console.log('getLittleChapterCheckState selectedChipIds', selectedChipIds);
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
  console.log('getMiddleChapterCheckState middleChapter', middleChapter);
  console.log('getMiddleChapterCheckState selectedChipIds', selectedChipIds);
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
