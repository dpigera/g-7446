
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import UploadUsers from "./pages/UploadUsers";
import CreateContent from "./pages/CreateContent";
import ChooseTheme from "./pages/ChooseTheme";
import WrapViewer from "./pages/WrapViewer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-project" 
              element={
                <ProtectedRoute>
                  <CreateProject />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-project/upload-users/:projectId" 
              element={
                <ProtectedRoute>
                  <UploadUsers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-project/create-content/:projectId" 
              element={
                <ProtectedRoute>
                  <CreateContent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-project/choose-theme/:projectId" 
              element={
                <ProtectedRoute>
                  <ChooseTheme />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/wraps/:projectId/:userId" 
              element={<WrapViewer />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
