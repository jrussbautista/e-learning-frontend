import { queryKeys } from '@/constants';
import { apiClient } from '@/lib/axios';
import { Subject, SubjectCreate } from '@/types/subject';
import { useMutation, useQuery } from '@tanstack/react-query';

type Response = {
  results: Subject[];
};

export const createSubject = async (
  values: SubjectCreate
): Promise<Subject> => {
  const response = await apiClient.post('/subjects/', values);
  return response.data;
};

export const deleteSubject = (id: number) => {
  return apiClient.delete(`/subjects/${id}`);
};

export const getSubjects = async (): Promise<Response> => {
  const response = await apiClient.get('/subjects/');
  return response.data;
};

export const useSubjects = () => {
  return useQuery({ queryKey: [queryKeys.SUBJECTS], queryFn: getSubjects });
};

export const useSubjectCreate = () => {
  return useMutation({
    mutationFn: (values: SubjectCreate) => createSubject(values),
  });
};
