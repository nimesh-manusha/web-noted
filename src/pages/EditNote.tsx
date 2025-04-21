
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import NoteForm from "@/components/notes/NoteForm";
import { Note, NoteFormData } from "@/types/note";
import { getNoteById, updateNote, isAuthenticated } from "@/lib/notes-storage";
import { toast } from "@/components/ui/sonner";

const EditNote = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check for authentication first
    if (!isAuthenticated()) {
      toast.error("Please login to edit notes");
      navigate("/login");
      return;
    }

    if (!id) {
      navigate("/notes");
      return;
    }

    try {
      const foundNote = getNoteById(id);
      if (!foundNote) {
        toast.error("Note not found");
        navigate("/notes");
        return;
      }
      setNote(foundNote);
    } catch (error) {
      console.error("Failed to fetch note:", error);
      toast.error("Failed to load note");
      
      // Only redirect for authentication errors
      if (error instanceof Error && error.message === "User not authenticated") {
        navigate("/login");
      } else {
        navigate("/notes");
      }
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  const handleSubmit = (data: NoteFormData) => {
    if (!id) return;
    
    // Check authentication first
    if (!isAuthenticated()) {
      toast.error("Please login to update notes");
      navigate("/login");
      return;
    }
    
    setIsSubmitting(true);
    try {
      updateNote(id, data);
      toast.success("Note updated successfully");
      navigate("/notes");
    } catch (error) {
      toast.error("Failed to update note");
      console.error("Error updating note:", error);
      
      // Only redirect for authentication errors
      if (error instanceof Error && error.message === "User not authenticated") {
        navigate("/login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-2xl">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-6 space-y-4">
            <div className="h-10 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Edit Note</h1>
        {note && (
          <NoteForm
            initialData={note}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default EditNote;