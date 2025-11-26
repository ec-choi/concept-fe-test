import type { DIFFICULTY_TYPE } from '@/entities/typeChip/model/types';
import type { StructuredData } from '@/pages/Achievement/model/types';

/**
 * 난이도별 빈 상태 클래스명 생성
 */
export const getDifficultyEmptyClassName = (
  difficulty: DIFFICULTY_TYPE,
  structuredData: StructuredData,
  isEmpty?: boolean,
): string => {
  const isEmptyState = isEmpty ?? false;

  if (isEmptyState) return '';

  if (difficulty === 'basic' && structuredData.isBasicColEmpty) {
    return 'is-basic-empty';
  }
  if (difficulty === 'intermediate' && structuredData.isIntermediateColEmpty) {
    return 'is-intermediate-empty';
  }
  if (difficulty === 'advanced' && structuredData.isAdvancedColEmpty) {
    return 'is-advanced-empty';
  }

  return '';
};
