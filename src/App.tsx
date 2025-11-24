import { studentApi } from '@/entities/student/api';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    studentApi.getStudents();
  }, []);
  return <>APP</>;
}

export default App;
