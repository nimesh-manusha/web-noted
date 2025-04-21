
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, LogIn, UserPlus } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <BookOpen className="h-12 w-12 text-purple-600 dark:text-purple-400" />
          <h1 className="text-4xl font-bold text-purple-800 dark:text-purple-300">Noted</h1>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Your Personal Note-Writing
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Capture your thoughts, organize your ideas, and keep track of important information with Noted.
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <Button
            onClick={() => navigate("/signup")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8"
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Sign Up
          </Button>
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="px-8"
          >
            <LogIn className="mr-2 h-5 w-5" />
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;