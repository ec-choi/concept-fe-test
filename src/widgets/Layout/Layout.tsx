import { studentQueries } from '@/entities/student/api/queries';
import { queryClient } from '@/shared/lib/queryClient';
import { layoutStyle } from '@/widgets/Layout/Layout.style';
import { Nav } from '@/widgets/Nav/Nav';
import { Outlet, useLoaderData } from 'react-router';

export const Layout = () => {
  const { students } = useLoaderData<typeof Layout.loader>();
  return (
    <main css={layoutStyle}>
      <Nav students={students} />
      <Outlet />
    </main>
  );
};

Layout.loader = async () => {
  const { data: students } = await queryClient.ensureQueryData(
    studentQueries.student(),
  );
  return { students };
};
