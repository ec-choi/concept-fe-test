import type { ACHIEVEMENT_GRADE } from '@/entities/achievement/model/types';
import type {
  DIFFICULTY_TYPE,
  TypeChip,
} from '@/entities/typeChip/model/types';

export type ChipWithAchievement = TypeChip & {
  littleChapterId: number;
  achievement: ACHIEVEMENT_GRADE;
};

export type DifficultyGroup = Record<DIFFICULTY_TYPE, ChipWithAchievement[]>;

export type LittleChapter = {
  littleChapterId: number;
  littleChapterName: string;
  middleChapterId: number;
  difficulties: DifficultyGroup;
  isEmpty: boolean;
};

export type MiddleChapterValue = {
  middleChapterId: TypeChip['middleChapterId'];
  middleChapterName: TypeChip['middleChapterName'];
  littleChapters: Map<TypeChip['littleChapterId'], LittleChapter>;
};

export type MiddleChapter = Map<
  TypeChip['middleChapterId'],
  MiddleChapterValue
>;

export type StructuredData = {
  isAllEmpty: boolean;
  isBasicColEmpty: boolean;
  isIntermediateColEmpty: boolean;
  isAdvancedColEmpty: boolean;
  content: MiddleChapter;
  achievementCounts: Record<ACHIEVEMENT_GRADE, number>;
  filteredChipMap: Map<TypeChip['conceptChipId'], ChipWithAchievement>;
};
