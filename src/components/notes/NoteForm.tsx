
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Note, NoteFormData } from "@/types/note";
import { NOTE_COLORS } from "@/lib/notes-storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";

interface NoteFormProps {
  initialData?: Note;
  onSubmit: (data: NoteFormData) => void;
  isSubmitting?: boolean;
}

const NoteForm = ({ initialData, onSubmit, isSubmitting = false }: NoteFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<NoteFormData>({
    title: "",
    content: "",
    color: NOTE_COLORS[0],
  });

  // Load initial data if editing an existing note
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        content: initialData.content,
        color: initialData.color,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (color: string) => {
    setFormData(prev => ({ ...prev, color }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Note title"
          className="w-full"
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your note here..."
          className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label>Note Color</Label>
        <div className="flex flex-wrap gap-2">
          {NOTE_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleColorChange(color)}
              className={`h-6 w-6 rounded-full border ${color} ${
                formData.color === color ? "ring-2 ring-offset-2 ring-purple-500" : ""
              }`}
              disabled={isSubmitting}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData ? "Update Note" : "Create Note"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;