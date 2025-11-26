import {
  achievementContentStyle,
  achievementScrollRootStyle,
  tableHeaderStyle,
  accordionRootStyle,
  accordionHeaderStyle,
  accordionTriggerStyle,
  accordionContentStyle,
  littleChapterSectionStyle,
} from '@/pages/Achievement/ui/AchievementContent/AchievementContent.style';
import { ScrollRoot } from '@/shared/ui/Scroll/Scroll';
import { useStudentAchievement } from '@/pages/Achievement/hooks/useStudentAchievement';
import { useLoaderData } from 'react-router';
import type { AchievementPage } from '@/pages/Achievement/Achievement.page';
import * as Accordion from '@radix-ui/react-accordion';
import {
  DIFFICULTY_TYPE_KR,
  DIFFICULTY_TYPES,
} from '@/entities/typeChip/model/constant';
import { Icon } from '@/shared/ui/Icon/Icon';
import type { DIFFICULTY_TYPE } from '@/entities/typeChip/model/types';
import { Chip } from '@/pages/Achievement/ui/Chip/Chip';
import clsx from 'clsx';
import {
  useContentStore,
  useFilterStore,
} from '@/pages/Achievement/store/context';
import {
  getChipCheckState,
  getDifficultyGroupCheckState,
  getLittleChapterCheckState,
  getMiddleChapterCheckState,
} from '@/pages/Achievement/store/contentStore';
import { useEffect, useMemo } from 'react';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { EmptyCase } from '@/pages/Achievement/ui/EmptyCase/EmptyCase';

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

  // 현재 필터링된 칩 ID 목록 추출
  const filteredChipIds = useMemo(() => {
    const chipIds: number[] = [];
    structuredData.content.forEach((middleChapter) => {
      middleChapter.littleChapters.forEach((littleChapter) => {
        Object.values(littleChapter.difficulties).forEach((chips) => {
          chips.forEach((chip) => {
            chipIds.push(chip.conceptChipId);
          });
        });
      });
    });
    return chipIds;
  }, [structuredData]);

  // 필터가 변경되면 선택된 칩을 필터링된 칩과 동기화
  useEffect(() => {
    syncWithFilteredChips(filteredChipIds);
  }, [filteredChipIds, syncWithFilteredChips]);
  const isEmpty = !isFetching && structuredData.isEmpty;

  return (
    <div css={achievementContentStyle}>
      <div css={tableHeaderStyle}>
        <div className="first-column table-header-item">단원</div>
        {DIFFICULTY_TYPES.map((difficulty) => (
          <div
            key={difficulty}
            className={clsx('table-header-item', {
              'is-basic-empty':
                !isEmpty &&
                difficulty === 'basic' &&
                structuredData.isBasicColEmpty,
              'is-intermediate-empty':
                !isEmpty &&
                difficulty === 'intermediate' &&
                structuredData.isIntermediateColEmpty,
              'is-advanced-empty':
                !isEmpty &&
                difficulty === 'advanced' &&
                structuredData.isAdvancedColEmpty,
            })}
          >
            {DIFFICULTY_TYPE_KR[difficulty]}
          </div>
        ))}
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
          {Array.from(structuredData.content.values()).map((middleChapter) => {
            const middleChapterCheckState = getMiddleChapterCheckState(
              middleChapter,
              selectedChipIds,
            );

            return (
              <Accordion.Root
                type="multiple"
                css={accordionRootStyle}
                key={middleChapter.middleChapterId}
                defaultValue={Array.from(structuredData.content.values()).map(
                  (middleChapter) => `middle-${middleChapter.middleChapterId}`,
                )}
              >
                <Accordion.Item
                  value={`middle-${middleChapter.middleChapterId}`}
                >
                  <Accordion.Header css={accordionHeaderStyle}>
                    <Accordion.Trigger css={accordionTriggerStyle} asChild>
                      <div>
                        <span className="accordion-trigger-icon">
                          <Icon name="icon_arrow_down" size={24} />
                        </span>
                        <Checkbox
                          checked={
                            middleChapterCheckState.indeterminate
                              ? 'indeterminate'
                              : middleChapterCheckState.checked
                          }
                          onCheckedChange={() => {
                            toggleMiddleChapter(middleChapter);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                        <label
                          htmlFor={`middle-${middleChapter.middleChapterId}`}
                        >
                          {middleChapter.middleChapterName}
                        </label>
                      </div>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content css={accordionContentStyle}>
                    {Array.from(middleChapter.littleChapters.values()).map(
                      (littleChapter) => {
                        const littleChapterCheckState =
                          getLittleChapterCheckState(
                            littleChapter,
                            selectedChipIds,
                          );

                        return (
                          <section
                            css={littleChapterSectionStyle}
                            style={
                              littleChapter.isEmpty ? { display: 'none' } : {}
                            }
                            key={littleChapter.littleChapterId}
                          >
                            <h3 className="first-column content-item little-chapter">
                              <Checkbox
                                id={`little-chapter-${littleChapter.littleChapterId}`}
                                checked={
                                  littleChapterCheckState.indeterminate
                                    ? 'indeterminate'
                                    : littleChapterCheckState.checked
                                }
                                onCheckedChange={() => {
                                  toggleLittleChapter(littleChapter);
                                }}
                              />
                              <label
                                htmlFor={`little-chapter-${littleChapter.littleChapterId}`}
                              >
                                {littleChapter.littleChapterName}
                              </label>
                            </h3>
                            {Object.keys(littleChapter.difficulties).map(
                              (difficulty) => {
                                const chips =
                                  littleChapter.difficulties[
                                    difficulty as DIFFICULTY_TYPE
                                  ];
                                const difficultyGroupCheckState =
                                  getDifficultyGroupCheckState(
                                    chips,
                                    selectedChipIds,
                                  );

                                return (
                                  <article
                                    className={clsx(
                                      'content-item difficulty-group',
                                      {
                                        'is-basic-empty':
                                          difficulty === 'basic' &&
                                          structuredData.isBasicColEmpty,
                                        'is-intermediate-empty':
                                          difficulty === 'intermediate' &&
                                          structuredData.isIntermediateColEmpty,
                                        'is-advanced-empty':
                                          difficulty === 'advanced' &&
                                          structuredData.isAdvancedColEmpty,
                                      },
                                    )}
                                    key={`difficulty-${littleChapter.littleChapterId}-${difficulty}`}
                                  >
                                    {chips.length > 0 && (
                                      <Checkbox
                                        id={`difficulty-${littleChapter.littleChapterId}-${difficulty}`}
                                        checked={
                                          difficultyGroupCheckState.indeterminate
                                            ? 'indeterminate'
                                            : difficultyGroupCheckState.checked
                                        }
                                        onCheckedChange={() => {
                                          toggleDifficultyGroup(
                                            littleChapter.littleChapterId,
                                            difficulty as DIFFICULTY_TYPE,
                                            chips,
                                          );
                                        }}
                                      />
                                    )}

                                    <div className="chip-container">
                                      {chips.map((chip) => {
                                        const chipCheckState =
                                          getChipCheckState(
                                            chip.conceptChipId,
                                            selectedChipIds,
                                          );

                                        return (
                                          <Chip
                                            key={chip.conceptChipId}
                                            id={`conceptChipId-${chip.conceptChipId.toString()}`}
                                            checked={chipCheckState.checked}
                                            onChecked={() => {
                                              toggleChip(chip.conceptChipId);
                                            }}
                                            isRecommended={chip.recommended}
                                            grade={chip.achievement ?? 'WHITE'}
                                          />
                                        );
                                      })}
                                    </div>
                                  </article>
                                );
                              },
                            )}
                          </section>
                        );
                      },
                    )}
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            );
          })}
        </ScrollRoot>
      )}
    </div>
  );
};
