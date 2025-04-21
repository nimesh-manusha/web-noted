
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { getAllNotes } from "@/lib/notes-storage";
import { Note } from "@/types/note";
import MainLayout from "@/components/layout/MainLayout";
import NoteCard from "@/components/notes/NoteCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadNotes = () => {
    setLoading(true);
    try {
      const allNotes = getAllNotes();
      setNotes(allNotes);
    } catch (error) {
      console.error("Failed to load notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Notes</h1>
          <Button onClick={() => navigate("/new")} className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            <span>New Note</span>
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-lg border bg-gray-100 dark:bg-gray-800"
              />
            ))}
          </div>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <div className="mb-4 rounded-full bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
              <PlusCircle className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold">No notes yet</h2>
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              Create your first note to get started
            </p>
            <Button onClick={() => navigate("/new")}>Create Note</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} onDelete={loadNotes} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;