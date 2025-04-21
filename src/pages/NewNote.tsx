
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import NoteForm from "@/components/notes/NoteForm";
import { NoteFormData } from "@/types/note";
import { createNote } from "@/lib/notes-storage";
import { toast } from "@/components/ui/sonner";

const NewNote = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      toast.error("Please login to create notes");
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleSubmit = (data: NoteFormData) => {
    setIsSubmitting(true);
    try {
      createNote(data);
      toast.success("Note created successfully");
      navigate("/notes");
    } catch (error) {
      toast.error("Failed to create note");
      console.error("Error creating note:", error);
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while checking authentication
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Create New Note</h1>
        <NoteForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </MainLayout>
  );
};

export default NewNote;