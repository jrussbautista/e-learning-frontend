import { queryKeys } from '@/constants';
import { apiClient } from '@/lib/axios';
import { Subject, SubjectPayload } from '@/types/subject';
import { useMutation, useQuery } from '@tanstack/react-query';

type Response = {
  results: Subject[];
};

export const getSubject = async (id: number): Promise<Subject> => {
  const response = await apiClient.get(`/subjects/${id}/`);
  return response.data;
};

export const createSubject = async (
  values: SubjectPayload
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

export const updateSubject = async (
  id: number,
  values: Partial<SubjectPayload>
): Promise<Subject> => {
  const response = await apiClient.patch(`/subjects/${id}/`, values);
  return response.data;
};

export const useSubject = (id: number) => {
  return useQuery({
    queryKey: [queryKeys.SUBJECT, id],
    queryFn: () => getSubject(id),
  });
};

export const useSubjects = () => {
  return useQuery({ queryKey: [queryKeys.SUBJECTS], queryFn: getSubjects });
};

export const useSubjectCreate = () => {
  return useMutation({
    mutationFn: (values: SubjectPayload) => createSubject(values),
  });
};

export const useSubjectUpdate = () => {
  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: number;
      values: Partial<SubjectPayload>;
    }) => updateSubject(id, values),
  });
};
