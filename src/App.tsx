import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import NewNote from "./pages/NewNote";
import EditNote from "./pages/EditNote";
import ViewNote from "./pages/ViewNote";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = typeof window !== "undefined" && localStorage.getItem("currentUser") !== null;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const users = localStorage.getItem("users");
      if (!users) {
        localStorage.setItem("users", JSON.stringify([]));
      }
    }
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/notes" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/new" element={<ProtectedRoute><NewNote /></ProtectedRoute>} />
            <Route path="/edit/:id" element={<ProtectedRoute><EditNote /></ProtectedRoute>} />
            <Route path="/notes/:id" element={<ProtectedRoute><ViewNote /></ProtectedRoute>} />
            

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
