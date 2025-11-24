import type { Student } from '@/entities/student/model/types';
import { studentsStyle, studentsViewportStyle } from '@/widgets/Nav/Nav.style';
import * as ScrollArea from '@radix-ui/react-scroll-area';

export const Students = ({ students }: { students: Student[] }) => {
  console.log(students);
  return (
    <ScrollArea.Root css={studentsStyle} className="students">
      <ScrollArea.Viewport css={studentsViewportStyle}>
        {students.map((student) => (
          <div key={student.id}>{student.name}</div>
        ))}
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
};
