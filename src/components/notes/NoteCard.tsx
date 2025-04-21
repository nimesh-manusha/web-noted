
import { useState } from "react";
import { Note } from "@/types/note";
import { Edit, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { deleteNote, isAuthenticated } from "@/lib/notes-storage";

interface NoteCardProps {
  note: Note;
  onDelete: () => void;
}

const NoteCard = ({ note, onDelete }: NoteCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check authentication first
    if (!isAuthenticated()) {
      toast.error("Please login to delete notes");
      navigate("/login");
      return;
    }
    
    setIsDeleting(true);
    
    try {
      deleteNote(note.id);
      toast.success("Note deleted successfully");
      onDelete();
    } catch (error) {
      toast.error("Failed to delete note");
      console.error("Error deleting note:", error);
      
      // Only redirect if it's an authentication error
      if (error instanceof Error && error.message === "User not authenticated") {
        navigate("/login");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check authentication first
    if (!isAuthenticated()) {
      toast.error("Please login to edit notes");
      navigate("/login");
      return;
    }
    
    navigate(`/edit/${note.id}`);
  };

  const handleCardClick = () => {
    if (!isAuthenticated()) {
      toast.error("Please login to view note details");
      navigate("/login");
      return;
    }
    
    navigate(`/notes/${note.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className={cn(
        "group cursor-pointer rounded-lg border p-4 shadow-sm transition-all hover:shadow-md",
        note.color,
        isDeleting && "opacity-50"
      )}
    >
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 dark:text-gray-100">{note.title}</h3>
        <div className="flex space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={handleEdit}
            className="rounded p-1 text-gray-500 hover:bg-white/50 hover:text-blue-600"
            disabled={isDeleting}
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="rounded p-1 text-gray-500 hover:bg-white/50 hover:text-red-600"
            disabled={isDeleting}
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{note.content}</div>
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {new Date(note.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default NoteCard;