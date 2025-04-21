
export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export type NoteFormData = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
