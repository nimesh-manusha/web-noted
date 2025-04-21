
import { useState } from "react";
import { Menu, X, PlusSquare, BookOpen, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import CalendarView from "../calendar/CalendarView";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white dark:bg-slate-900 shadow-lg transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Noted</h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            <li>
              <a
                href="/notes"
                className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-purple-100 dark:text-gray-200 dark:hover:bg-purple-900/20"
              >
                <BookOpen className="mr-3 h-5 w-5 text-purple-600 dark:text-purple-400" />
                All Notes
              </a>
            </li>
            <li>
              <a
                href="/new"
                className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-purple-100 dark:text-gray-200 dark:hover:bg-purple-900/20"
              >
                <PlusSquare className="mr-3 h-5 w-5 text-purple-600 dark:text-purple-400" />
                New Note
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex w-full items-center rounded-md px-3 py-2 text-gray-700 hover:bg-purple-100 dark:text-gray-200 dark:hover:bg-purple-900/20"
              >
                <LogOut className="mr-3 h-5 w-5 text-purple-600 dark:text-purple-400" />
                Logout
              </button>
            </li>
          </ul>
        </nav>

        {/* Add Calendar to Sidebar - fixed width container */}
        <div className="p-4 border-t overflow-hidden">
          <div className="max-w-[240px] mx-auto">
            <CalendarView />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn("flex-1 transition-all duration-300 ease-in-out", 
                       isSidebarOpen ? "ml-64" : "ml-0")}>
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white/80 px-4 backdrop-blur-sm dark:bg-slate-900/80 dark:border-slate-700">
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
        </header>

        {/* Page Content */}
        <main className="container mx-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;