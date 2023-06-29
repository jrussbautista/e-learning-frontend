export type SubjectPayload = {
  title: string;
  description: string;
};

export type Subject = {
  id: number;
  title: string;
  description: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};
