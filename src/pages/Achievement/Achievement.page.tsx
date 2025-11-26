import { achievementSectionStyle } from '@/pages/Achievement/Achievement.style';
import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { cachedQueryOptions, queryClient } from '@/shared/lib/queryClient';
import { gradeQueries } from '@/entities/grade/api/queries';
import { Filter } from '@/pages/Achievement/ui/Filter/Filter';
import { Footer } from '@/pages/Achievement/ui/Footer/Footer';
import { AchievementContent } from '@/pages/Achievement/ui/AchievementContent/AchievementContent';
import { AchievementProvider } from '@/pages/Achievement/store/context';

export const AchievementPage = () => {
  const { grades, studentId } = useLoaderData();
  return (
    <AchievementProvider key={studentId} initialGradeKey={grades[0].key}>
      <section css={achievementSectionStyle}>
        <Filter grades={grades} />
        <AchievementContent />
        <Footer />
      </section>
    </AchievementProvider>
  );
};

AchievementPage.loader = async ({ params }: LoaderFunctionArgs) => {
  const studentId = params.studentId;

  const { data: grades } = await queryClient.ensureQueryData({
    ...gradeQueries.grade(),
    ...cachedQueryOptions,
  });
  return { grades, studentId };
};
