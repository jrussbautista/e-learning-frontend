import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { getServerError } from '@/utils/errorUtils';
import { SubjectCreate } from '@/types/subject';
import { useSubjectCreate } from '@/services/subjectService';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/constants';

const SubjectsCreatePage = () => {
  const { mutateAsync, isLoading } = useSubjectCreate();
  const { handleSubmit, control } = useForm<SubjectCreate>({
    defaultValues: { title: '', description: '' },
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = async (values: SubjectCreate) => {
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
        Create Your Subject
      </Typography>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="title"
          control={control}
          rules={{
            required: 'Title is required field',
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Title"
              name="title"
              onChange={onChange}
              error={Boolean(error)}
              helperText={error?.message}
              value={value}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{
            required: 'Description is required field',
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              type="text"
              id="description"
              error={Boolean(error)}
              helperText={error?.message}
              value={value}
              onChange={onChange}
              multiline
              rows={5}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{
            required: 'Description is required field',
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              type="text"
              id="description"
              error={Boolean(error)}
              helperText={error?.message}
              value={value}
              onChange={onChange}
              multiline
              rows={5}
            />
          )}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, width: 100 }}
            disabled={isLoading}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SubjectsCreatePage;
