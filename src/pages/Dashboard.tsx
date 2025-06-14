
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Folder, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const handleGetStarted = () => {
    navigate('/create-project');
  };

  const handleProjectClick = async (projectId: string) => {
    // Get the project details including theme
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('theme')
      .eq('id', projectId)
      .single();

    if (projectError) {
      console.error('Error fetching project details:', projectError);
      // Fallback to upload users step if there's an error
      navigate(`/create-project/upload-users/${projectId}`);
      return;
    }

    // If project has a theme, go directly to Step 4 (Choose Theme)
    if (project?.theme) {
      navigate(`/create-project/choose-theme/${projectId}`);
      return;
    }

    // If no theme, check if this project has any users uploaded
    const { data: projectUsers, error } = await supabase
      .from('project_users')
      .select('id')
      .eq('project_id', projectId)
      .limit(1);

    if (error) {
      console.error('Error checking project users:', error);
      // Fallback to upload users step if there's an error
      navigate(`/create-project/upload-users/${projectId}`);
      return;
    }

    // If project has users, go to Step 3 (Create Content)
    // If no users, go to Step 2 (Upload Users)
    if (projectUsers && projectUsers.length > 0) {
      navigate(`/create-project/create-content/${projectId}`);
    } else {
      navigate(`/create-project/upload-users/${projectId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Navigation */}
      <nav className="border-b border-white/20 bg-black/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            Wrappd<span className="text-yellow-400">.ai</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Welcome, {user?.user_metadata?.full_name || user?.email}</span>
            <Button onClick={signOut} variant="outline" size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome to Your Dashboard! 🎉
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              You're successfully authenticated with Wrappd.ai. Start creating amazing data stories with AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">📊 Create Your First Wrapped</CardTitle>
                <CardDescription className="text-gray-300">
                  Upload your data and let AI generate beautiful insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleGetStarted}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">⚡ Your Profile</CardTitle>
                <CardDescription className="text-gray-300">
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Name:</strong> {user?.user_metadata?.full_name || 'Not provided'}</p>
                <p><strong>Joined:</strong> {new Date(user?.created_at || '').toLocaleDateString()}</p>
              </CardContent>
            </Card>
          </div>

          {/* Your Projects Section */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Folder className="w-5 h-5" />
                <span>Your Projects</span>
              </CardTitle>
              <CardDescription className="text-gray-300">
                Continue working on your existing projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              {projectsLoading ? (
                <div className="text-gray-300 text-center py-4">Loading projects...</div>
              ) : projects && projects.length > 0 ? (
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => handleProjectClick(project.id)}
                      className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">{project.name}</h3>
                          <div className="flex items-center space-x-2 text-gray-400 text-sm mt-1">
                            <Calendar className="w-4 h-4" />
                            <span>Created {new Date(project.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">
                  <p>No projects yet. Create your first project to get started!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
