import type { DIFFICULTY_TYPE } from '@/entities/typeChip/model/types';

export const DIFFICULTY_TYPES: DIFFICULTY_TYPE[] = [
  'basic',
  'intermediate',
  'advanced',
];
export const DIFFICULTY_TYPE_KR: Record<DIFFICULTY_TYPE, string> = {
  basic: '개념',
  intermediate: '기본',
  advanced: '심화',
};
