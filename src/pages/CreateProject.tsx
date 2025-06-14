
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const CreateProject = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [projectName, setProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectName.trim()) {
      toast({
        title: "Project name required",
        description: "Please enter a project name",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a project",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            name: projectName.trim(),
            user_id: user.id,
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating project:', error);
        toast({
          title: "Error creating project",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Project created!",
        description: `"${projectName}" has been created successfully.`,
      });

      // Navigate to Step 2 with the project ID
      navigate(`/create-project/upload-users/${data.id}`);
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Error creating project",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Navigation */}
      <nav className="border-b border-white/20 bg-black/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            Wrapped<span className="text-yellow-400">.ai</span>
          </div>
          <Button 
            onClick={() => navigate('/dashboard')}
            variant="outline" 
            size="sm"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <span className="ml-2 text-white font-medium">Enter Project Name</span>
              </div>
              <div className="w-12 h-px bg-gray-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-600 text-gray-400 rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <span className="ml-2 text-gray-400">Upload User List</span>
              </div>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-white mb-2">
                Create Your First Wrapped
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Let's start by giving your project a name. This will help you organize your wrapped reports.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleCreateProject} className="space-y-6">
                <div>
                  <Label htmlFor="projectName" className="text-white text-lg font-medium">
                    Project Name
                  </Label>
                  <Input
                    id="projectName"
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g., 2024 Year-End Team Report"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 mt-2 h-12 text-lg"
                    maxLength={100}
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    Choose a descriptive name that will help you identify this project later.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !projectName.trim()}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-4 px-6 rounded-lg transition-all hover:shadow-xl hover:shadow-yellow-500/25 text-lg h-14"
                >
                  {isLoading ? 'Creating Project...' : 'Create Project'}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Once created, you'll be taken to the next step where you can upload your user data.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateProject;
