import { ROOT_WITH_STUDENT_ID } from '@/app/routes/router';
import type { Student } from '@/entities/student/model/types';
import {
  navButtonStyle,
  scrollRootStyle,
  scrollViewportStyle,
  scrollbarStyle,
  thumbStyle,
} from '@/widgets/Nav/Nav.style';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { generatePath, NavLink } from 'react-router';

export const Nav = ({ students }: { students: Student[] }) => {
  return (
    <ScrollArea.Root css={scrollRootStyle} className="nav">
      <ScrollArea.Viewport css={scrollViewportStyle}>
        {students.map((student) => (
          <NavLink
            key={student.id}
            className="nav-item"
            css={navButtonStyle}
            to={generatePath(ROOT_WITH_STUDENT_ID, { studentId: student.id })}
          >
            {student.name}
          </NavLink>
        ))}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" css={scrollbarStyle}>
        <ScrollArea.Thumb css={thumbStyle} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
