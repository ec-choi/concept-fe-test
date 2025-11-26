import {
  achievementContentStyle,
  achievementScrollRootStyle,
  tableHeaderStyle,
} from '@/pages/Achievement/ui/AchievementContent/AchievementContent.style';
import { ScrollRoot } from '@/shared/ui/Scroll/Scroll';
import { useStudentAchievement } from '@/pages/Achievement/hooks/useStudentAchievement';
import { useLoaderData } from 'react-router';
import type { AchievementPage } from '@/pages/Achievement/Achievement.page';
import {
  DIFFICULTY_TYPE_KR,
  DIFFICULTY_TYPES,
} from '@/entities/typeChip/model/constant';
import clsx from 'clsx';
import {
  useContentStore,
  useFilterStore,
} from '@/pages/Achievement/store/context';
import { useMemo, useEffect } from 'react';
import { EmptyCase } from '@/pages/Achievement/ui/EmptyCase/EmptyCase';
import { MiddleChapterAccordion } from './MiddleChapterAccordion';
import { getDifficultyEmptyClassName } from '@/pages/Achievement/helper/difficultyUtils';

export const AchievementContent = () => {
  const { studentId } = useLoaderData<typeof AchievementPage.loader>();
  const achievementGrades = useFilterStore((state) => state.achievementGrades);
  const { structuredData, isFetching } = useStudentAchievement({ studentId });

  const selectedChipIds = useContentStore((state) => state.selectedChipIds);
  const toggleChip = useContentStore((state) => state.toggleChip);
  const toggleDifficultyGroup = useContentStore(
    (state) => state.toggleDifficultyGroup,
  );
  const toggleLittleChapter = useContentStore(
    (state) => state.toggleLittleChapter,
  );
  const toggleMiddleChapter = useContentStore(
    (state) => state.toggleMiddleChapter,
  );
  const syncWithFilteredChips = useContentStore(
    (state) => state.syncWithFilteredChips,
  );

  const filteredChipIds = useMemo(
    () => Array.from(structuredData.filteredChipMap.keys()),
    [structuredData.filteredChipMap],
  );

  // 필터가 변경되면 선택된 칩을 필터링된 칩과 동기화
  useEffect(() => {
    syncWithFilteredChips(filteredChipIds);
  }, [filteredChipIds, syncWithFilteredChips]);

  const isEmpty = !isFetching && structuredData.isAllEmpty;
  const allMiddleChapters = Array.from(structuredData.content.values());

  return (
    <div css={achievementContentStyle}>
      <div css={tableHeaderStyle}>
        <div className="first-column table-header-item">단원</div>
        {DIFFICULTY_TYPES.map((difficulty) => {
          const emptyClassName = getDifficultyEmptyClassName(
            difficulty,
            structuredData,
            isEmpty,
          );

          return (
            <div
              key={difficulty}
              className={clsx('table-header-item', emptyClassName)}
            >
              {DIFFICULTY_TYPE_KR[difficulty]}
            </div>
          );
        })}
      </div>
      {isEmpty ? (
        <EmptyCase
          text={
            <>
              {achievementGrades.length ? (
                <>
                  해당 성취도의
                  <br />
                  학습 결과가 없습니다.
                </>
              ) : (
                <>추천 유형이 없습니다.</>
              )}
            </>
          }
        />
      ) : (
        <ScrollRoot css={achievementScrollRootStyle}>
          {allMiddleChapters.map((middleChapter) => (
            <MiddleChapterAccordion
              key={middleChapter.middleChapterId}
              middleChapter={middleChapter}
              allMiddleChapters={allMiddleChapters}
              structuredData={structuredData}
              selectedChipIds={selectedChipIds}
              onToggleMiddleChapter={toggleMiddleChapter}
              onToggleLittleChapter={toggleLittleChapter}
              onToggleDifficultyGroup={toggleDifficultyGroup}
              onToggleChip={toggleChip}
            />
          ))}
        </ScrollRoot>
      )}
    </div>
  );
};
