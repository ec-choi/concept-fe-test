import {
  achievementContentStyle,
  achievementScrollRootStyle,
} from '@/pages/Achievement/ui/AchievementContent/AchievementContent.style';
import { ScrollRoot } from '@/shared/ui/Scroll/Scroll';
import { HEIGHT_TOKEN } from '@/pages/Achievement/ui/styleToken';

export const AchievementContent = () => {
  return (
    <div css={achievementContentStyle}>
      <div
        style={{ height: HEIGHT_TOKEN.TABLE_HEADER, backgroundColor: 'yellow' }}
      ></div>
      <ScrollRoot css={achievementScrollRootStyle}>
        {Array.from({ length: 12 }).map(() => (
          <div
            style={{
              height: 64,
              backgroundColor: 'blue',
              border: '1px solid red',
            }}
          ></div>
        ))}
      </ScrollRoot>
    </div>
  );
};
