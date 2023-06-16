import Typography from '@mui/material/Typography';

import { useSubjects } from '@/services/subjectService';
import SubjectsTable from './components/SubjectsTable';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/constants';

const SubjectsPage = () => {
  const { data, isError, isLoading } = useSubjects();
  const navigate = useNavigate();

  if (isError) {
    return <div>error</div>; // TODO: add error ui
  }

  if (isLoading) {
    return null; // TODO: add loading spinner
  }

  return (
    <>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={() => navigate(routes.subjectsCreate)}
        >
          Add New Subject
        </Button>
      </Box>
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
