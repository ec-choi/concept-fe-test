import type { TypeChip } from '@/entities/typeChip/model/types';

export type ACHIEVEMENT_GRADE =
  | 'WHITE'
  | 'GRAY'
  | 'SAD'
  | 'RED'
  | 'YELLOW'
  | 'GREEN'
  | 'SMILE';

export type Achievement = {
  typeChipId: TypeChip['id'];
  achievement: ACHIEVEMENT_GRADE;
};
