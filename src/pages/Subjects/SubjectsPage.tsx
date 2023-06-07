import { useSubjects } from '@/services/subjectService';
import SubjectsTable from './components/SubjectsTable';

const SubjectsPage = () => {
  const { data, isError, isLoading } = useSubjects();

  if (isError) {
    return 'error'; // TODO: add error ui
  }

  if (isLoading) {
    return null; // TODO: add loading spinner
  }

  return (
    <>
      <SubjectsTable subjects={data.results} />
    </>
  );
};

export default SubjectsPage;
