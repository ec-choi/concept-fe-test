import { Switch } from '@/shared/ui/Switch/Switch';
import { filterStyle, resetButtonStyle } from './Filter.style';
import { Icon } from '@/shared/ui/Icon/Icon';
import type { Grade } from '@/entities/grade/model/types';
import { ACHIEVEMENT_GRADES } from '@/entities/achievement/model/constant';
import { Chip } from '@/pages/Achievement/ui/Chip/Chip';
import { useFilterStore } from '@/pages/Achievement/store/context';
import { useLoaderData } from 'react-router';
import type { AchievementPage } from '@/pages/Achievement/Achievement.page';
import { useStudentAchievement } from '@/pages/Achievement/hooks/useStudentAchievement';
import { useMemo } from 'react';
import type { ACHIEVEMENT_GRADE } from '@/entities/achievement/model/types';

export const Filter = ({ grades }: { grades: Grade[] }) => {
  const { studentId } = useLoaderData<typeof AchievementPage.loader>();

  const gradeKey = useFilterStore((state) => state.gradeKey);
  const isRecommendOnly = useFilterStore((state) => state.isRecommendOnly);
  const achievementGrades = useFilterStore((state) => state.achievementGrades);
  const setFilter = useFilterStore((state) => state.setFilter);
  const resetFilter = useFilterStore((state) => state.resetFilter);

  const { chips, studentAchievement } = useStudentAchievement({
    studentId,
  });

  // 각 성취도 등급별 개수 계산
  const achievementCounts = useMemo(() => {
    if (!chips || !studentAchievement?.data) {
      return {} as Record<ACHIEVEMENT_GRADE, number>;
    }

    const counts = ACHIEVEMENT_GRADES.reduce(
      (acc, grade) => {
        acc[grade] = 0;
        return acc;
      },
      {} as Record<ACHIEVEMENT_GRADE, number>,
    );

    chips.forEach((chip) => {
      const achievement = studentAchievement.data.find(
        (ach) => ach.typeChipId === chip.id,
      );
      if (achievement?.achievement) {
        counts[achievement.achievement]++;
      }
    });

    return counts;
  }, [chips, studentAchievement]);

  return (
    <div css={filterStyle}>
      <div className="filter">
        <select
          onChange={(e) => setFilter({ gradeKey: e.target.value })}
          value={gradeKey}
        >
          {grades?.map((grade) => (
            <option key={grade.key} value={grade.key}>
              {grade.name}
            </option>
          ))}
        </select>
        <div className="switch">
          <Switch
            onCheckedChange={(checked) =>
              setFilter({ isRecommendOnly: checked })
            }
            checked={isRecommendOnly}
          />
          <span>추천 유형만 보기</span>
        </div>
        <button css={resetButtonStyle} onClick={resetFilter}>
          <Icon name="icon_reset" size={16} />
          초기화
        </button>
      </div>
      <div className="chip-filter">
        <p className="title">성취도 컬러</p>
        {ACHIEVEMENT_GRADES.map((grade) => (
          <div className="chip" key={grade}>
            <Chip
              grade={grade}
              id={`filter-${grade}`}
              checked={achievementGrades.includes(grade)}
              onChecked={(e) =>
                setFilter({
                  achievementGrades: e.target.checked
                    ? [...achievementGrades, grade]
                    : achievementGrades.filter((g) => g !== grade),
                })
              }
            />
            <span>{achievementCounts[grade] || 0}개</span>
          </div>
        ))}
      </div>
    </div>
  );
};
