import {
  achievementSectionStyle,
  achievementStyle,
} from '@/pages/Achievement/Achievement.style';
import { Nav } from '@/widgets/Nav/Nav';
import { generatePath, redirect, type LoaderFunctionArgs } from 'react-router';
import { ROOT_WITH_STUDENT_ID } from '@/app/routes/router';
import { useLoaderData } from 'react-router';
import { queryClient } from '@/shared/lib/queryClient';
import { sudentQueries } from '@/entities/student/api/queries';
import { gradeQueries } from '@/entities/grade/api/queries';
import { Filter } from '@/pages/Achievement/ui/Filter/Filter';
import { Footer } from '@/pages/Achievement/ui/Footer/Footer';
import { AchievementContent } from '@/pages/Achievement/ui/AchievementContent/AchievementContent';
import { AchievementProvider } from '@/pages/Achievement/store/context';

export const AchievementPage = () => {
  const { students, grades, studentId } = useLoaderData();

  return (
    <AchievementProvider key={studentId} initialGradeKey={grades[0].key}>
      <main css={achievementStyle}>
        <Nav students={students} />
        <section css={achievementSectionStyle}>
          <Filter grades={grades} />
          <AchievementContent />
          <Footer />
        </section>
      </main>
    </AchievementProvider>
  );
};

AchievementPage.loader = async ({ params }: LoaderFunctionArgs) => {
  const studentId = params.studentId;

  const _students = queryClient.ensureQueryData(sudentQueries.student());
  const _grades = queryClient.ensureQueryData(gradeQueries.grade());
  const [students, grades] = await Promise.all([_students, _grades]);
  if (!studentId) {
    const redirectRoute = generatePath(ROOT_WITH_STUDENT_ID, {
      studentId: students[0].id,
    });
    return redirect(redirectRoute);
  } else {
    return { students, grades, studentId };
  }
};
