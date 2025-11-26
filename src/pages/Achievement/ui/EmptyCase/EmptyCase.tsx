import { emptyCaseStyle } from '@/pages/Achievement/ui/EmptyCase/EmptyCase.style';
import type { ReactNode } from 'react';

export const EmptyCase = ({ text }: { text: ReactNode }) => {
  return (
    <div css={emptyCaseStyle}>
      <p>{text}</p>
    </div>
  );
};
