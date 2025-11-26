import { achievementQueries } from '@/entities/achievement/api/queries';
import type { ACHIEVEMENT_GRADE } from '@/entities/achievement/model/types';
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
        // initialData: () => prevData.current,
      },
    ],
  });

  const chips = useMemo(() => {
    return typeChips?.data.filter((chip) => {
      if (isRecommendOnly) {
        return chip.recommended;
      }
      return true;
    });
  }, [typeChips, isRecommendOnly]);

  const originStudentAchievementChips = useMemo(() => {
    return studentAchievement?.data || [];
  }, [studentAchievement]);

  const filteredStudentAchievementChips = useMemo(() => {
    return originStudentAchievementChips.filter((achievement) => {
      return (
        achievementGrades.length === 0 ||
        achievementGrades.includes(achievement.achievement)
      );
    });
  }, [originStudentAchievementChips, achievementGrades]);

  const structuredData = useMemo(() => {
    const result: {
      isEmpty: boolean; // 필터링이 적용된 데이터가 비어있는지 여부
      isBasicColEmpty: boolean; // 총 개수 중 기본 난이도 칼럼이 비어있는지 여부
      isIntermediateColEmpty: boolean; // 총 개수 중 중간 난이도 칼럼이 비어있는지 여부
      isAdvancedColEmpty: boolean; // 총 개수 중 고급 난이도 칼럼이 비어있는지 여부
      content: MiddleChapter; // 중단원 데이터
      achievementCounts: Record<ACHIEVEMENT_GRADE, number>; // 성취도별 개수(필터링 적용x)
    } = {
      achievementCounts: {
        WHITE: 0,
        GRAY: 0,
        SAD: 0,
        RED: 0,
        YELLOW: 0,
        GREEN: 0,
        SMILE: 0,
      },
      isEmpty: true,
      isBasicColEmpty: true,
      isIntermediateColEmpty: true,
      isAdvancedColEmpty: true,
      content: new Map(),
    };
    if (
      !chips ||
      !filteredStudentAchievementChips ||
      !originStudentAchievementChips
    )
      return result;
    originStudentAchievementChips.forEach((originAchievementChip) => {
      // 1. 오리진 학생 성취도 칩과 유형칩 매칭( 1:1 매칭으로 학생 성취도칩과 유형칩 갯수가 항상 같음)
      const typeChip = chips.find(
        (chip) => chip.id === originAchievementChip.typeChipId,
      );

      if (!typeChip) return;

      if (isRecommendOnly) {
        // 2. 오리진 학생 성취도 칩의 갯수 계산(추천 유형 필터에 영향을 받음)
        if (typeChip.recommended) {
          result.achievementCounts[originAchievementChip.achievement]++;
        }
      } else {
        result.achievementCounts[originAchievementChip.achievement]++;
      }

      // 3. 이하 처리는 필터링 적용한 학생 성취도 칩과 유형칩 매칭
      const filteredStudentAchievementChip =
        filteredStudentAchievementChips.find((achievement) => {
          return achievement.typeChipId === typeChip.id;
        });

      let _chip: ChipWithAchievement | undefined;
      if (filteredStudentAchievementChip?.typeChipId === typeChip.id) {
        _chip = {
          ...filteredStudentAchievementChip,
          ...typeChip,
        };
      }

      const middleChapter = result.content.get(typeChip.middleChapterId);

      if (!middleChapter) {
        result.content.set(typeChip.middleChapterId, {
          middleChapterId: typeChip.middleChapterId,
          middleChapterName: typeChip.middleChapterName,
          littleChapters: new Map(),
        });
      }

      let littleChapter = middleChapter?.littleChapters.get(
        typeChip.littleChapterId,
      );

      if (!littleChapter) {
        const newLittleChapter = {
          littleChapterId: typeChip.littleChapterId,
          littleChapterName: typeChip.littleChapterName,
          middleChapterId: typeChip.middleChapterId,
          isEmpty: true,
          difficulties: {
            basic: [],
            intermediate: [],
            advanced: [],
          },
        };
        result.content
          .get(typeChip.middleChapterId)
          ?.littleChapters.set(typeChip.littleChapterId, newLittleChapter);
        littleChapter = newLittleChapter;
      }

      if (littleChapter && _chip) {
        littleChapter.isEmpty = false;
        littleChapter.difficulties[typeChip.difficulty].push(_chip);
        if (typeChip.difficulty === 'basic') {
          result.isBasicColEmpty = false;
        } else if (typeChip.difficulty === 'intermediate') {
          result.isIntermediateColEmpty = false;
        } else if (typeChip.difficulty === 'advanced') {
          result.isAdvancedColEmpty = false;
        }
        result.isEmpty = false;
      }
    });

    return result;
  }, [
    isRecommendOnly,
    chips,
    filteredStudentAchievementChips,
    originStudentAchievementChips,
  ]);

  return {
    chips,
    studentAchievement,
    structuredData,
    isFetching: isTypeChipsFetching || isStudentAchievementFetching,
  };
};
