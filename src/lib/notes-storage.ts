
import { Note, NoteFormData } from "@/types/note";

// Available note colors
export const NOTE_COLORS = [
  "bg-yellow-100 border-yellow-200",
  "bg-blue-100 border-blue-200",
  "bg-green-100 border-green-200",
  "bg-pink-100 border-pink-200",
  "bg-purple-100 border-purple-200",
  "bg-indigo-100 border-indigo-200",
];

const STORAGE_KEY = 'noted-app-notes';

// Helper to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return localStorage.getItem("currentUser") !== null;
};

// Get all notes from local storage
export const getAllNotes = (): Note[] => {
  if (!isAuthenticated()) {
    return [];
  }
  const notesJson = localStorage.getItem(STORAGE_KEY);
  if (!notesJson) return [];
  return JSON.parse(notesJson);
};

// Get a single note by ID
export const getNoteById = (id: string): Note | undefined => {
  if (!isAuthenticated()) {
    return undefined;
  }
  const notes = getAllNotes();
  return notes.find(note => note.id === id);
};

// Create a new note
export const createNote = (noteData: NoteFormData): Note => {
  if (!isAuthenticated()) {
    throw new Error("User not authenticated");
  }
  
  const notes = getAllNotes();
  
  const newNote: Note = {
    ...noteData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  const updatedNotes = [newNote, ...notes];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  
  return newNote;
};

// Update an existing note
export const updateNote = (id: string, noteData: Partial<NoteFormData>): Note | null => {
  if (!isAuthenticated()) {
    throw new Error("User not authenticated");
  }
  
  const notes = getAllNotes();
  const noteIndex = notes.findIndex(note => note.id === id);
  
  if (noteIndex === -1) return null;
  
  const updatedNote = {
    ...notes[noteIndex],
    ...noteData,
    updatedAt: new Date().toISOString(),
  };
  
  notes[noteIndex] = updatedNote;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  
  return updatedNote;
};

// Delete a note by ID
export const deleteNote = (id: string): boolean => {
  if (!isAuthenticated()) {
    throw new Error("User not authenticated");
  }
  
  const notes = getAllNotes();
  const filteredNotes = notes.filter(note => note.id !== id);
  
  if (filteredNotes.length === notes.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes));
  return true;
};
