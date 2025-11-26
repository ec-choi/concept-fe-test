import { achievementQueries } from '@/entities/achievement/api/queries';
import type {
  Achievement,
  ACHIEVEMENT_GRADE,
} from '@/entities/achievement/model/types';
import type { Student } from '@/entities/student/model/types';
import type {
  DIFFICULTY_TYPE,
  TypeChip,
} from '@/entities/typeChip/model/types';
import { typeChipQueries } from '@/entities/typeChip/api/queries';
import { useFilterStore } from '@/pages/Achievement/store/context';
import { cachedQueryOptions } from '@/shared/lib/queryClient';
import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';

export type MiddleChapter = Map<
  number,
  {
    middleChapterId: number;
    middleChapterName: string;
    littleChapters: Map<number, LittleChapter>;
  }
>;

export type LittleChapter = {
  littleChapterId: number;
  littleChapterName: string;
  middleChapterId: number;
  difficulties: DifficultyGroup;
  isEmpty: boolean;
};

export type DifficultyGroup = Record<DIFFICULTY_TYPE, ChipWithAchievement[]>;

export type ChipWithAchievement = TypeChip & {
  littleChapterId: LittleChapter['littleChapterId'];
  achievement: ACHIEVEMENT_GRADE;
};

export const useStudentAchievement = ({
  studentId,
}: {
  studentId?: Student['id'];
}) => {
  const gradeKey = useFilterStore((state) => state.gradeKey);
  const isRecommendOnly = useFilterStore((state) => state.isRecommendOnly);
  const achievementGrades = useFilterStore((state) => state.achievementGrades);

  const [
    { data: typeChips, isFetching: isTypeChipsFetching },
    { data: studentAchievement, isFetching: isStudentAchievementFetching },
  ] = useQueries({
    queries: [
      {
        ...typeChipQueries.typeChip({ gradeKey: gradeKey || '' }),
        enabled: !!gradeKey,
        ...cachedQueryOptions,
      },
      {
        ...achievementQueries.achievement({
          studentId: studentId || '',
          gradeKey: gradeKey || '',
        }),
        enabled: !!studentId && !!gradeKey,
      },
    ],
  });

  const chipMap = useMemo(() => {
    const map = new Map<TypeChip['id'], TypeChip>();
    typeChips?.data.forEach((chip) => {
      if (isRecommendOnly) {
        if (chip.recommended) {
          map.set(chip.id, chip);
        }
      } else {
        map.set(chip.id, chip);
      }
    });
    return map;
  }, [typeChips, isRecommendOnly]);

  const originStudentAchievementChips = useMemo(() => {
    return studentAchievement?.data || [];
  }, [studentAchievement]);

  const filteredStudentAchievementChipMap = useMemo(() => {
    const map = new Map<Achievement['typeChipId'], Achievement>();
    originStudentAchievementChips.forEach((achievement) => {
      if (
        achievementGrades.length === 0 ||
        achievementGrades.includes(achievement.achievement)
      ) {
        map.set(achievement.typeChipId, achievement);
      }
    });
    return map;
  }, [originStudentAchievementChips, achievementGrades]);

  const structuredData = useMemo(() => {
    const result: {
      isAllEmpty: boolean; // 비어있는지 여부(모든 필터링 적용)
      isBasicColEmpty: boolean; // 총 개수 중 기본 난이도 칼럼이 비어있는지 여부(모든 필터링 적용)
      isIntermediateColEmpty: boolean; // 총 개수 중 중간 난이도 칼럼이 비어있는지 여부(모든 필터링 적용)
      isAdvancedColEmpty: boolean; // 총 개수 중 고급 난이도 칼럼이 비어있는지 여부(모든 필터링 적용)
      content: MiddleChapter; // 중단원 데이터(모든 필터링 적용)
      achievementCounts: Record<ACHIEVEMENT_GRADE, number>; // 성취도별 개수(난이도 필터링만 적용)
    } = {
      isAllEmpty: true,
      isBasicColEmpty: true,
      isIntermediateColEmpty: true,
      isAdvancedColEmpty: true,
      content: new Map(),
      achievementCounts: {
        WHITE: 0,
        GRAY: 0,
        SAD: 0,
        RED: 0,
        YELLOW: 0,
        GREEN: 0,
        SMILE: 0,
      },
    };
    if (
      !chipMap ||
      !filteredStudentAchievementChipMap ||
      originStudentAchievementChips.length === 0
    )
      return result;

    originStudentAchievementChips.forEach((studentAchievementChip) => {
      // 1. 성취도과 칩정보를 매칭하기 위해 칩 찾기(학생성취도와 유형칩은 항상 1:1 매칭으로 갯수가 같음)
      const chip = chipMap.get(studentAchievementChip.typeChipId);
      if (!chip) return;
      // 2. achievementCounts 계산
      if (isRecommendOnly) {
        if (chip.recommended) {
          result.achievementCounts[studentAchievementChip.achievement]++;
        }
      } else {
        result.achievementCounts[studentAchievementChip.achievement]++;
      }
      // 3. 이하 필털이 된 유형칩 계산
      const filteredStudentAchievementChip =
        filteredStudentAchievementChipMap.get(chip.id);

      let _chip: ChipWithAchievement | undefined;
      if (filteredStudentAchievementChip?.typeChipId === chip.id) {
        _chip = {
          ...chip,
          ...filteredStudentAchievementChip,
        };
      }

      const middleChapter = result.content.get(chip.middleChapterId);

      if (!middleChapter) {
        result.content.set(chip.middleChapterId, {
          middleChapterId: chip.middleChapterId,
          middleChapterName: chip.middleChapterName,
          littleChapters: new Map(),
        });
      }

      let littleChapter = middleChapter?.littleChapters.get(
        chip.littleChapterId,
      );

      if (!littleChapter) {
        const newLittleChapter = {
          littleChapterId: chip.littleChapterId,
          littleChapterName: chip.littleChapterName,
          middleChapterId: chip.middleChapterId,
          isEmpty: true,
          difficulties: {
            basic: [],
            intermediate: [],
            advanced: [],
          },
        };
        result.content
          .get(chip.middleChapterId)
          ?.littleChapters.set(chip.littleChapterId, newLittleChapter);
        littleChapter = newLittleChapter;
      }

      if (littleChapter && _chip) {
        result.isAllEmpty = false;
        littleChapter.isEmpty = false;
        littleChapter.difficulties[chip.difficulty].push(_chip);
        if (chip.difficulty === 'basic') {
          result.isBasicColEmpty = false;
        } else if (chip.difficulty === 'intermediate') {
          result.isIntermediateColEmpty = false;
        } else if (chip.difficulty === 'advanced') {
          result.isAdvancedColEmpty = false;
        }
      }
    });

    return result;
  }, [
    chipMap,
    filteredStudentAchievementChipMap,
    originStudentAchievementChips,
    isRecommendOnly,
  ]);

  return {
    structuredData,
    isFetching: isTypeChipsFetching || isStudentAchievementFetching,
  };
};
