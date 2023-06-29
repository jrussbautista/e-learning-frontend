import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { queryKeys, routes } from '@/constants';
import { getServerError } from '@/utils/errorUtils';
import { SubjectPayload } from '@/types/subject';
import { useSubject, useSubjectUpdate } from '@/services/subjectService';
import { queryClient } from '@/lib/reactQuery';
import SubjectsForm from '@/pages/Subjects/components/SubjectsForm';

const SubjectsEditPage = () => {
  const params = useParams<{ id: string }>();
  const id = Number(params?.id);

  const subjectQuery = useSubject(id);
  const editSubjectMutation = useSubjectUpdate();
  const { handleSubmit, control, setValue } = useForm<SubjectPayload>({
    defaultValues: { title: '', description: '' },
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = async (values: SubjectPayload) => {
    try {
      await editSubjectMutation.mutateAsync({ id, values });
      enqueueSnackbar('Successfully subject updated!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      queryClient.invalidateQueries([queryKeys.SUBJECT, id]);
      queryClient.invalidateQueries([queryKeys.SUBJECTS]);
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

  useEffect(() => {
    if (subjectQuery.data) {
      const { title, description } = subjectQuery.data;
      setValue('title', title);
      setValue('description', description);
    }
  }, [subjectQuery.data]);

  if (subjectQuery.error) {
    return <p>Error</p>; // TODO: show nice ui error message
  }

  if (subjectQuery.isLoading) {
    return <p>Loading...</p>; // TODO: add loading spinner
  }

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
      <Typography component="h1" variant="h5">
        Edit your subject
      </Typography>
      <SubjectsForm
        control={control}
        onSubmit={handleSubmit(onSubmit)}
        isLoading={editSubjectMutation.isLoading}
      />
    </Box>
  );
};

export default SubjectsEditPage;
