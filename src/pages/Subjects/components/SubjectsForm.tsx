import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import Box from '@mui/material/Box';

type SubjectsFormProps = {
  control: any;
  isLoading: boolean;
  onSubmit: () => void;
};

const SubjectsForm = ({ control, onSubmit, isLoading }: SubjectsFormProps) => {
  return (
    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
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
  );
};

export default SubjectsForm;
