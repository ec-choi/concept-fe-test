import type {
  ChipWithAchievement,
  LittleChapter,
  MiddleChapterValue,
} from '@/pages/Achievement/model/types';

/**
 * 소단원에서 모든 칩 수집
 */
export const collectAllChipsFromLittleChapter = (
  littleChapter: LittleChapter,
): ChipWithAchievement[] => {
  return Object.values(littleChapter.difficulties).flat();
};

/**
 * 중단원에서 모든 칩 수집
 */
export const collectAllChipsFromMiddleChapter = (
  middleChapter: MiddleChapterValue,
): ChipWithAchievement[] => {
  return Array.from(middleChapter.littleChapters.values()).flatMap(
    (littleChapter) => Object.values(littleChapter.difficulties).flat(),
  );
};
