import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { getLittleChapterCheckState } from '@/pages/Achievement/helper/checkState';
import { DIFFICULTY_TYPES } from '@/entities/typeChip/model/constant';
import type { LittleChapter } from '@/pages/Achievement/model/types';
import type { StructuredData } from '@/pages/Achievement/model/types';
import type { TypeChip } from '@/entities/typeChip/model/types';
import type { ChipWithAchievement } from '@/pages/Achievement/model/types';
import { DifficultyGroup } from './DifficultyGroup';
import { littleChapterSectionStyle } from './AchievementContent.style';

type LittleChapterSectionProps = {
  littleChapter: LittleChapter;
  structuredData: StructuredData;
  selectedChipIds: Set<TypeChip['conceptChipId']>;
  onToggleLittleChapter: (littleChapter: LittleChapter) => void;
  onToggleDifficultyGroup: (chips: ChipWithAchievement[]) => void;
  onToggleChip: (chipId: TypeChip['conceptChipId']) => void;
};

export const LittleChapterSection = ({
  littleChapter,
  structuredData,
  selectedChipIds,
  onToggleLittleChapter,
  onToggleDifficultyGroup,
  onToggleChip,
}: LittleChapterSectionProps) => {
  const littleChapterCheckState = getLittleChapterCheckState(
    littleChapter,
    selectedChipIds,
  );

  if (littleChapter.isEmpty) return null;

  return (
    <section
      css={littleChapterSectionStyle}
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
            onToggleLittleChapter(littleChapter);
          }}
        />
        <label htmlFor={`little-chapter-${littleChapter.littleChapterId}`}>
          {littleChapter.littleChapterName}
        </label>
      </h3>
      {DIFFICULTY_TYPES.map((difficulty) => {
        const chips = littleChapter.difficulties[difficulty];

        return (
          <DifficultyGroup
            key={`difficulty-${littleChapter.littleChapterId}-${difficulty}`}
            difficulty={difficulty}
            chips={chips}
            littleChapterId={littleChapter.littleChapterId}
            structuredData={structuredData}
            selectedChipIds={selectedChipIds}
            onToggleDifficultyGroup={onToggleDifficultyGroup}
            onToggleChip={onToggleChip}
          />
        );
      })}
    </section>
  );
};
