import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { routes } from '@/constants';
import { getServerError } from '@/utils/errorUtils';
import { SubjectPayload } from '@/types/subject';
import { useSubjectCreate } from '@/services/subjectService';
import SubjectsForm from '@/pages/Subjects/components/SubjectsForm';

const SubjectsCreatePage = () => {
  const { mutateAsync, isLoading } = useSubjectCreate();
  const { handleSubmit, control } = useForm<SubjectPayload>({
    defaultValues: { title: '', description: '' },
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = async (values: SubjectPayload) => {
    try {
      await mutateAsync(values);
      enqueueSnackbar('Successfully subject created!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      navigate(routes.subjects);
    } catch (error) {
      const serverError = getServerError(error);
      enqueueSnackbar(serverError, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
      <Typography component="h1" variant="h5">
        Create your subject
      </Typography>
      <SubjectsForm
        control={control}
        onSubmit={handleSubmit(onSubmit)}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default SubjectsCreatePage;
