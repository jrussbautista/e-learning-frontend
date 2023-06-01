import { ValidationErrors } from '@/types/error';
import { AxiosError } from 'axios';

export const getServerError = (error: unknown) => {
  const knownError = error as AxiosError<ValidationErrors>;
  if (!knownError.response) {
    return knownError?.message;
  }
  const errorData = knownError.response.data;
  if (errorData?.non_field_errors) {
    return errorData.non_field_errors[0];
  }
  return 'Sorry, something went wrong';
};
