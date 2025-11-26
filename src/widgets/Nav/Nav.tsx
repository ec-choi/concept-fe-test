import { ACHIEVEMENT } from '@/app/routes/router';
import type { Student } from '@/entities/student/model/types';
import { ScrollRoot } from '@/shared/ui/Scroll/Scroll';
import { navButtonStyle, navScrollRootStyle } from '@/widgets/Nav/Nav.style';
import { generatePath, NavLink } from 'react-router';

export const Nav = ({ students }: { students: Student[] }) => {
  return (
    <ScrollRoot emotionCss={navScrollRootStyle}>
      {students.map((student) => (
        <NavLink
          key={student.id}
          className="nav-item"
          css={navButtonStyle}
          to={generatePath(ACHIEVEMENT, { studentId: student.id })}
        >
          {student.name}
        </NavLink>
      ))}
    </ScrollRoot>
  );
};
