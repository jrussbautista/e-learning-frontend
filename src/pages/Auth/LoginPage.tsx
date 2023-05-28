import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form';

import { LoginDTO } from '@/types/auth';
import useAuthStore from '@/store/useAuthStore';
import { getServerError } from '@/utils/errorUtils';

const LoginPage = () => {
  const { handleSubmit, control } = useForm<LoginDTO>({
    defaultValues: { email: '', password: '' },
  });

  const login = useAuthStore((state) => state.login);

  const onSubmit = async (values: LoginDTO) => {
    try {
      await login(values);
      console.log('success'); // TODO: redirect to dashboard page
    } catch (error) {
      const serverError = getServerError(error);
      console.log('serverError', serverError); // TODO: show error message
    }
  };

  return (
    <div>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required field',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={onChange}
              error={Boolean(error)}
              helperText={error?.message}
              value={value}
              autoFocus
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Password is required field',
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={Boolean(error)}
              helperText={error?.message}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default LoginPage;
