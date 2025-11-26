type DIFFICULTY_TYPE = 'intermediate' | 'advanced' | 'basic';

export type TypeChip = {
  conceptChipId: number;
  conceptId: number;
  conceptName: string;
  difficulty: DIFFICULTY_TYPE;
  id: number;
  littleChapterId: number;
  littleChapterName: string;
  middleChapterId: number;
  middleChapterName: string;
  recommended: boolean;
};
