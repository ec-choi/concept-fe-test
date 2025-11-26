import * as Accordion from '@radix-ui/react-accordion';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { Icon } from '@/shared/ui/Icon/Icon';
import { getMiddleChapterCheckState } from '@/pages/Achievement/helper/checkState';
import type { MiddleChapterValue } from '@/pages/Achievement/model/types';
import type { StructuredData } from '@/pages/Achievement/model/types';
import type { TypeChip } from '@/entities/typeChip/model/types';
import type {
  ChipWithAchievement,
  LittleChapter,
} from '@/pages/Achievement/model/types';
import { LittleChapterSection } from './LittleChapterSection';
import {
  accordionRootStyle,
  accordionHeaderStyle,
  accordionTriggerStyle,
  accordionContentStyle,
} from './AchievementContent.style';

type MiddleChapterAccordionProps = {
  middleChapter: MiddleChapterValue;
  allMiddleChapters: MiddleChapterValue[];
  structuredData: StructuredData;
  selectedChipIds: Set<TypeChip['conceptChipId']>;
  onToggleMiddleChapter: (middleChapter: MiddleChapterValue) => void;
  onToggleLittleChapter: (littleChapter: LittleChapter) => void;
  onToggleDifficultyGroup: (chips: ChipWithAchievement[]) => void;
  onToggleChip: (chipId: TypeChip['conceptChipId']) => void;
};

export const MiddleChapterAccordion = ({
  middleChapter,
  allMiddleChapters,
  structuredData,
  selectedChipIds,
  onToggleMiddleChapter,
  onToggleLittleChapter,
  onToggleDifficultyGroup,
  onToggleChip,
}: MiddleChapterAccordionProps) => {
  const middleChapterCheckState = getMiddleChapterCheckState(
    middleChapter,
    selectedChipIds,
  );

  return (
    <Accordion.Root
      type="multiple"
      css={accordionRootStyle}
      key={middleChapter.middleChapterId}
      defaultValue={allMiddleChapters.map(
        (mc) => `middle-${mc.middleChapterId}`,
      )}
    >
      <Accordion.Item value={`middle-${middleChapter.middleChapterId}`}>
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
                  onToggleMiddleChapter(middleChapter);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
              <label htmlFor={`middle-${middleChapter.middleChapterId}`}>
                {middleChapter.middleChapterName}
              </label>
            </div>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content css={accordionContentStyle}>
          {Array.from(middleChapter.littleChapters.values()).map(
            (littleChapter) => (
              <LittleChapterSection
                key={littleChapter.littleChapterId}
                littleChapter={littleChapter}
                structuredData={structuredData}
                selectedChipIds={selectedChipIds}
                onToggleLittleChapter={onToggleLittleChapter}
                onToggleDifficultyGroup={onToggleDifficultyGroup}
                onToggleChip={onToggleChip}
              />
            ),
          )}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
