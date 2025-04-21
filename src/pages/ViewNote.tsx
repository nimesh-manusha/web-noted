
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Edit, Trash, ArrowLeft } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Note } from "@/types/note";
import { getNoteById, deleteNote, isAuthenticated } from "@/lib/notes-storage";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const ViewNote = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication first
    if (!isAuthenticated()) {
      toast.error("Please login to view notes");
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

  const handleDelete = async () => {
    if (!id || !note) return;
    
    // Check authentication first
    if (!isAuthenticated()) {
      toast.error("Please login to delete notes");
      navigate("/login");
      return;
    }
    
    try {
      deleteNote(id);
      toast.success("Note deleted successfully");
      navigate("/notes");
    } catch (error) {
      toast.error("Failed to delete note");
      console.error("Error deleting note:", error);
      
      // Only redirect for authentication errors
      if (error instanceof Error && error.message === "User not authenticated") {
        navigate("/login");
      }
    }
  };

  if (loading || !note) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-3xl">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-6 space-y-4">
            <div className="h-10 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-60 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="flex items-center gap-1"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Notes</span>
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/edit/${note.id}`)}
              className="flex items-center gap-1"
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              className="flex items-center gap-1"
            >
              <Trash className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          </div>
        </div>
        
        <div className={cn("rounded-lg border p-6 shadow", note.color)}>
          <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">{note.title}</h1>
          <div className="whitespace-pre-wrap text-gray-600 dark:text-gray-300">{note.content}</div>
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <div>Created: {new Date(note.createdAt).toLocaleString()}</div>
            <div>Updated: {new Date(note.updatedAt).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ViewNote;