import type { TypeChip } from '@/entities/typeChip/model/types';

export type Achievement = {
  typeChipId: TypeChip['id'];
  achievement: 'WHITE' | 'GRAY' | 'SAD' | 'RED' | 'YELLOW' | 'GREEN' | 'SMILE';
};
