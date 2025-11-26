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
import { Select, SelectItem } from '@/shared/ui/Select/Select';

export const Filter = ({ grades }: { grades: Grade[] }) => {
  const { studentId } = useLoaderData<typeof AchievementPage.loader>();

  const gradeKey = useFilterStore((state) => state.gradeKey);
  const isRecommendOnly = useFilterStore((state) => state.isRecommendOnly);
  const achievementGrades = useFilterStore((state) => state.achievementGrades);
  const setFilter = useFilterStore((state) => state.setFilter);
  const toggleAchievementGrade = useFilterStore(
    (state) => state.toggleAchievementGrade,
  );
  const resetFilter = useFilterStore((state) => state.resetFilter);

  const { structuredData } = useStudentAchievement({
    studentId,
  });

  // structuredData에서 계산된 성취도별 개수 사용
  const achievementCounts = structuredData.achievementCounts;
  return (
    <div css={filterStyle}>
      <div className="filter">
        <Select
          placeholder="학년 선택"
          onValueChange={(value) => setFilter({ gradeKey: value })}
          value={gradeKey}
        >
          {grades?.map((grade) => (
            <SelectItem key={grade.key} value={grade.key}>
              {grade.name}
            </SelectItem>
          ))}
        </Select>

        <div className="switch">
          <Switch
            onCheckedChange={(checked) => {
              setFilter({ isRecommendOnly: checked });
            }}
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
              onChecked={() => {
                toggleAchievementGrade(grade);
              }}
            />
            <span>{achievementCounts[grade] || 0}개</span>
          </div>
        ))}
      </div>
    </div>
  );
};
