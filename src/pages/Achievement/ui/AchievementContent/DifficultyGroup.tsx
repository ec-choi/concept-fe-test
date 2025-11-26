import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { Chip } from '@/pages/Achievement/ui/Chip/Chip';
import { getDifficultyGroupCheckState } from '@/pages/Achievement/helper/checkState';
import { getDifficultyEmptyClassName } from '@/pages/Achievement/helper/difficultyUtils';
import type { ChipWithAchievement } from '@/pages/Achievement/model/types';
import type { DIFFICULTY_TYPE } from '@/entities/typeChip/model/types';
import type { StructuredData } from '@/pages/Achievement/model/types';
import type { TypeChip } from '@/entities/typeChip/model/types';
import clsx from 'clsx';

type DifficultyGroupProps = {
  difficulty: DIFFICULTY_TYPE;
  chips: ChipWithAchievement[];
  littleChapterId: number;
  structuredData: StructuredData;
  selectedChipIds: Set<TypeChip['conceptChipId']>;
  onToggleDifficultyGroup: (chips: ChipWithAchievement[]) => void;
  onToggleChip: (chipId: TypeChip['conceptChipId']) => void;
};

export const DifficultyGroup = ({
  difficulty,
  chips,
  littleChapterId,
  structuredData,
  selectedChipIds,
  onToggleDifficultyGroup,
  onToggleChip,
}: DifficultyGroupProps) => {
  const difficultyGroupCheckState = getDifficultyGroupCheckState(
    chips,
    selectedChipIds,
  );

  const emptyClassName = getDifficultyEmptyClassName(
    difficulty,
    structuredData,
  );

  return (
    <article
      className={clsx('content-item difficulty-group', emptyClassName)}
      key={`difficulty-${littleChapterId}-${difficulty}`}
    >
      {chips.length > 0 && (
        <Checkbox
          id={`difficulty-${littleChapterId}-${difficulty}`}
          checked={
            difficultyGroupCheckState.indeterminate
              ? 'indeterminate'
              : difficultyGroupCheckState.checked
          }
          onCheckedChange={() => {
            onToggleDifficultyGroup(chips);
          }}
        />
      )}

      <div className="chip-container">
        {chips.map((chip) => (
          <Chip
            key={chip.conceptChipId}
            id={`concept-chip-${chip.conceptChipId}`}
            checked={selectedChipIds.has(chip.conceptChipId)}
            onChecked={() => {
              onToggleChip(chip.conceptChipId);
            }}
            isRecommended={chip.recommended}
            grade={chip.achievement ?? 'WHITE'}
          />
        ))}
      </div>
    </article>
  );
};
