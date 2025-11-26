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
import { useMemo, useRef } from 'react';

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
  achievement?: ACHIEVEMENT_GRADE;
};

export const useStudentAchievement = ({
  studentId,
}: {
  studentId?: Student['id'];
}) => {
  const gradeKey = useFilterStore((state) => state.gradeKey);
  const isRecommendOnly = useFilterStore((state) => state.isRecommendOnly);
  const achievementGrades = useFilterStore((state) => state.achievementGrades);

  const prevData = useRef<Achievement[]>([]);
  const [{ data: typeChips }, { data: studentAchievement }] = useQueries({
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

  const studentAchievementChips = useMemo(() => {
    return studentAchievement?.data.filter((achievement) => {
      return (
        achievementGrades.length === 0 ||
        achievementGrades.includes(achievement.achievement)
      );
    });
  }, [studentAchievement, achievementGrades]);

  const structuredData = useMemo(() => {
    const result: {
      isBasicColEmpty: boolean; // 기본 난이도 칼럼이 비어있는지 여부
      isIntermediateColEmpty: boolean; // 중간 난이도 칼럼이 비어있는지 여부
      isAdvancedColEmpty: boolean; // 고급 난이도 칼럼이 비어있는지 여부
      content: MiddleChapter; // 중단원 데이터
    } = {
      isBasicColEmpty: true,
      isIntermediateColEmpty: true,
      isAdvancedColEmpty: true,
      content: new Map(),
    };

    if (!chips || !studentAchievementChips) return result;

    chips.forEach((chip) => {
      const studentAchievementChip = studentAchievementChips.find(
        (ach) => ach.typeChipId === chip.id,
      );
      let _chip: ChipWithAchievement | undefined;
      if (studentAchievementChip?.typeChipId === chip.id) {
        _chip = {
          ...studentAchievementChip,
          ...chip,
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

      const littleChapter = middleChapter?.littleChapters.get(
        chip.littleChapterId,
      );

      if (!littleChapter) {
        result.content
          .get(chip.middleChapterId)
          ?.littleChapters.set(chip.littleChapterId, {
            littleChapterId: chip.littleChapterId,
            littleChapterName: chip.littleChapterName,
            middleChapterId: chip.middleChapterId,
            isEmpty: true,
            difficulties: {
              basic: [],
              intermediate: [],
              advanced: [],
            },
          });
      }
      if (littleChapter && _chip) {
        littleChapter.isEmpty = false;
        littleChapter?.difficulties[chip.difficulty].push(_chip);
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
    chips, //
    studentAchievementChips,
  ]);

  return { chips, studentAchievement, structuredData };
};
