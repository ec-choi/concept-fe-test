import * as ScrollArea from '@radix-ui/react-scroll-area';
import {
  scrollbarStyle,
  scrollRootStyle,
  scrollViewportStyle,
  thumbStyle,
} from './Scroll.style';
import type { SerializedStyles } from '@emotion/react';

export const ScrollRoot = ({
  emotionCss,
  children,
  className,
}: {
  emotionCss?: SerializedStyles;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <ScrollArea.Root css={[scrollRootStyle, emotionCss]} className={className}>
      <ScrollArea.Viewport css={scrollViewportStyle}>
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" css={scrollbarStyle}>
        <ScrollArea.Thumb css={thumbStyle} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
