import { queryKeys } from '@/constants';
import { apiClient } from '@/lib/axios';
import { Subject } from '@/types/subject';
import { useQuery } from '@tanstack/react-query';

type Response = {
  results: Subject[];
};

export const getSubjects = async (): Promise<Response> => {
  const response = await apiClient.get('/subjects/');
  return response.data;
};

export const useSubjects = () => {
  return useQuery({ queryKey: [queryKeys.SUBJECTS], queryFn: getSubjects });
};
