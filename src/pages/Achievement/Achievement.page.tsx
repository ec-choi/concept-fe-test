import { achievementStyle } from '@/pages/Achievement/Achievement.style';
import { Students } from '@/widgets/Nav/Nav';
import { studentApi } from '@/entities/student/api';
import { generatePath, redirect, type LoaderFunctionArgs } from 'react-router';
import { ROOT_WITH_STUDENT_ID } from '@/app/routes/router';
import { useLoaderData } from 'react-router';
import { queryClient } from '@/shared/lib/queryClient';

export const AchievementPage = () => {
  const { students } = useLoaderData();

  return (
    <div css={achievementStyle}>
      <Students students={students} />
      <div>ff</div>
    </div>
  );
};

AchievementPage.loader = async ({ params }: LoaderFunctionArgs) => {
  const studentId = params.studentId;
  const response = await queryClient.ensureQueryData({
    queryKey: ['students'],
    queryFn: () => studentApi.getStudents(),
  });
  if (!studentId) {
    const rou = generatePath(ROOT_WITH_STUDENT_ID, {
      studentId: response[0].id,
    });
    return redirect(rou);
  } else {
    return { students: response };
  }
};
