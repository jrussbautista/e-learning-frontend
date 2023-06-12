import { useSubjects } from '@/services/subjectService';
import SubjectsTable from './components/SubjectsTable';
import Typography from '@mui/material/Typography';

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
      {data.results.length > 0 ? (
        <SubjectsTable subjects={data.results} />
      ) : (
        <Typography sx={{ textAlign: 'center', margin: '20px 0' }}>
          No subjects yet.
        </Typography>
      )}
    </>
  );
};

export default SubjectsPage;
