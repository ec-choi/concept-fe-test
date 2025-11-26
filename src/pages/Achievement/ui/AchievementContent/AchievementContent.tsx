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

export const AchievementContent = () => {
  const { studentId } = useLoaderData<typeof AchievementPage.loader>();
  const { structuredData } = useStudentAchievement({ studentId });
  console.log(structuredData);
  return (
    <div css={achievementContentStyle}>
      <div css={tableHeaderStyle}>
        <div className="first-column table-header-item">단원</div>
        {DIFFICULTY_TYPES.map((difficulty) => (
          <div
            className={clsx('table-header-item', {
              'is-basic-empty':
                difficulty === 'basic' && structuredData.isBasicColEmpty,
              'is-intermediate-empty':
                difficulty === 'intermediate' &&
                structuredData.isIntermediateColEmpty,
              'is-advanced-empty':
                difficulty === 'advanced' && structuredData.isAdvancedColEmpty,
            })}
          >
            {DIFFICULTY_TYPE_KR[difficulty]}
          </div>
        ))}
      </div>
      <ScrollRoot css={achievementScrollRootStyle}>
        {Array.from(structuredData.content.values()).map((middleChapter) => (
          <Accordion.Root
            type="multiple"
            css={accordionRootStyle}
            key={middleChapter.middleChapterId}
            defaultValue={Array.from(structuredData.content.values()).map(
              (middleChapter) => `middle-${middleChapter.middleChapterId}`,
            )}
          >
            <Accordion.Item value={`middle-${middleChapter.middleChapterId}`}>
              <Accordion.Header css={accordionHeaderStyle}>
                <Accordion.Trigger css={accordionTriggerStyle}>
                  <span className="accordion-trigger-icon">
                    <Icon name="icon_arrow_down" size={24} />
                  </span>
                  <input
                    type="checkbox"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onChange={(e) => {
                      e.stopPropagation();
                    }}
                  />
                  <label htmlFor={`middle-${middleChapter.middleChapterId}`}>
                    {middleChapter.middleChapterName}
                  </label>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content css={accordionContentStyle}>
                {Array.from(middleChapter.littleChapters.values()).map(
                  (littleChapter) => (
                    <section
                      css={littleChapterSectionStyle}
                      style={littleChapter.isEmpty ? { display: 'none' } : {}}
                      key={littleChapter.littleChapterId}
                    >
                      <h3 className="first-column content-item little-chapter">
                        <input
                          type="checkbox"
                          id={littleChapter.littleChapterId.toString()}
                        />
                        <label
                          htmlFor={littleChapter.littleChapterId.toString()}
                        >
                          {littleChapter.littleChapterName}
                        </label>
                      </h3>
                      {Object.keys(littleChapter.difficulties).map(
                        (difficulty) => (
                          <article
                            className={clsx('content-item difficulty-group', {
                              'is-basic-empty':
                                difficulty === 'basic' &&
                                structuredData.isBasicColEmpty,
                              'is-intermediate-empty':
                                difficulty === 'intermediate' &&
                                structuredData.isIntermediateColEmpty,
                              'is-advanced-empty':
                                difficulty === 'advanced' &&
                                structuredData.isAdvancedColEmpty,
                            })}
                            key={
                              littleChapter.littleChapterId + '-' + difficulty
                            }
                          >
                            <input type="checkbox" />
                            <div className="chip-container">
                              {littleChapter.difficulties[
                                difficulty as DIFFICULTY_TYPE
                              ].map((chip) => (
                                <Chip
                                  key={chip.conceptChipId}
                                  id={chip.conceptChipId.toString()}
                                  onChecked={() => {}}
                                  isRecommended={chip.recommended}
                                  grade={chip.achievement ?? 'WHITE'}
                                />
                              ))}
                            </div>
                          </article>
                        ),
                      )}
                    </section>
                  ),
                )}
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        ))}
      </ScrollRoot>
    </div>
  );
};
