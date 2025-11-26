import type { ACHIEVEMENT_GRADE } from '@/entities/achievement/model/types';
import {
  chipStarStyle,
  chipStyle,
} from '@/pages/Achievement/ui/Chip/Chip.style';
import { Icon } from '@/shared/ui/Icon/Icon';

export const Chip = ({
  checked,
  id,
  onChecked,
  grade,
  isRecommended,
}: {
  checked?: boolean;
  id: string;
  onChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
  grade: ACHIEVEMENT_GRADE;
  isRecommended?: boolean;
}) => {
  return (
    <div css={chipStyle({ grade })}>
      <input
        type="checkbox"
        onChange={(e) => onChecked(e)}
        id={id}
        checked={checked}
      />
      <label htmlFor={id} className="chip-label">
        {grade === 'SAD' && <Icon name="icon_sad" size={26} />}
        {grade === 'SMILE' && <Icon name="icon_smile" size={26} />}

        {isRecommended && (
          <span css={chipStarStyle}>
            <Icon name="icon_star" size={12} />
          </span>
        )}
        {checked && <span className="chip-overlay" />}
      </label>
    </div>
  );
};
