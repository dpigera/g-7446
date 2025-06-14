
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Loader2, Play, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import SlidePreviewModal from '@/components/SlidePreviewModal';

interface UserWithCaptions {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  wrap_captions: string[] | null;
}

const templates = [
  {
    id: 'vibrant',
    name: 'Vibrant',
    preview: {
      backgroundColor: '#FF6B35',
      textColor: '#FFFFFF',
      accentColor: '#FFE66D'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    preview: {
      backgroundColor: '#000000',
      textColor: '#FFFFFF',
      accentColor: '#4ECDC4'
    }
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    preview: {
      backgroundColor: '#2D3748',
      textColor: '#FFFFFF',
      accentColor: '#9F7AEA'
    }
  },
  {
    id: 'ocean',
    name: 'Ocean',
    preview: {
      backgroundColor: '#1E40AF',
      textColor: '#FFFFFF',
      accentColor: '#06B6D4'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset',
    preview: {
      backgroundColor: '#DC2626',
      textColor: '#FFFFFF',
      accentColor: '#F59E0B'
    }
  },
  {
    id: 'forest',
    name: 'Forest',
    preview: {
      backgroundColor: '#059669',
      textColor: '#FFFFFF',
      accentColor: '#84CC16'
    }
  }
];

const ChooseTheme = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTheme, setSelectedTheme] = useState<string>('vibrant');
  const [isUpdating, setIsUpdating] = useState(false);
  const [projectUsers, setProjectUsers] = useState<UserWithCaptions[]>([]);
  const [showFinalTable, setShowFinalTable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithCaptions | null>(null);
  const [projectName, setProjectName] = useState<string>('');

  // Load project theme and users when page loads
  useEffect(() => {
    const loadProjectData = async () => {
      if (!projectId) {
        setIsLoading(false);
        return;
      }

      try {
        // Load project theme and name
        const { data: project, error: projectError } = await supabase
          .from('projects')
          .select('theme, name')
          .eq('id', projectId)
          .single();

        if (projectError) {
          console.error('Error loading project:', projectError);
        } else if (project) {
          setSelectedTheme(project.theme || 'vibrant');
          setProjectName(project.name || 'PROJECT');
          // If theme is already saved, show the final table
          if (project.theme) {
            setShowFinalTable(true);
          }
        }

        // Load project users
        const { data: users, error: usersError } = await supabase
          .from('project_users')
          .select('id, first_name, last_name, email, wrap_captions')
          .eq('project_id', projectId);

        if (usersError) {
          console.error('Error loading project users:', usersError);
        } else {
          const usersWithCaptions = users?.filter(user => {
            return user.wrap_captions && 
                   Array.isArray(user.wrap_captions) && 
                   user.wrap_captions.length > 0;
          }).map(user => ({
            ...user,
            wrap_captions: user.wrap_captions as string[]
          })) || [];

          setProjectUsers(usersWithCaptions);
        }
      } catch (err) {
        console.error('Error loading project data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjectData();
  }, [projectId]);

  if (!projectId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-white text-lg">Invalid project ID</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
  };

  const handleGenerateFinalWraps = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to generate final wraps",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    
    try {
      console.log('Updating project theme to:', selectedTheme);

      const { error } = await supabase
        .from('projects')
        .update({ theme: selectedTheme })
        .eq('id', projectId);

      if (error) {
        console.error('Error updating project theme:', error);
        throw new Error(error.message || 'Failed to update project theme');
      }

      toast({
        title: "Success!",
        description: "Theme saved successfully!",
      });

      setShowFinalTable(true);
    } catch (err) {
      console.error('Error updating theme:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePreviewSlides = (userId: string, userName: string) => {
    const user = projectUsers.find(u => u.id === userId);
    if (user && user.wrap_captions && user.wrap_captions.length > 0) {
      setSelectedUser(user);
      setModalOpen(true);
    } else {
      toast({
        title: "No Content Available",
        description: `No wrapped content found for ${userName}`,
        variant: "destructive",
      });
    }
  };

  const handlePreviewInNewTab = (userId: string, userName: string) => {
    const user = projectUsers.find(u => u.id === userId);
    if (user && user.wrap_captions && user.wrap_captions.length > 0) {
      const url = `/wraps/${projectId}/${userId}`;
      window.open(url, '_blank');
    } else {
      toast({
        title: "No Content Available",
        description: `No wrapped content found for ${userName}`,
        variant: "destructive",
      });
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
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
            onClick={() => navigate(`/create-project/create-content/${projectId}`)}
            variant="outline" 
            size="sm"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Content</span>
          </Button>
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
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 text-black rounded-full flex items-center justify-center font-semibold">
                  ✓
                </div>
                <span className="ml-2 text-green-400 font-medium">Project Created</span>
              </div>
              <div className="w-12 h-px bg-gray-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 text-black rounded-full flex items-center justify-center font-semibold">
                  ✓
                </div>
                <span className="ml-2 text-green-400 font-medium">Users Uploaded</span>
              </div>
              <div className="w-12 h-px bg-gray-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 text-black rounded-full flex items-center justify-center font-semibold">
                  ✓
                </div>
                <span className="ml-2 text-green-400 font-medium">Content Created</span>
              </div>
              <div className="w-12 h-px bg-gray-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center font-semibold">
                  4
                </div>
                <span className="ml-2 text-white font-medium">Choose Theme</span>
              </div>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-6">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-white mb-2">
                Step 4: Choose Theme
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Pick a template for your wrapped slides
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Template Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <motion.div
                    key={template.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedTheme === template.id ? 'scale-105' : 'hover:scale-102'
                    }`}
                    onClick={() => handleThemeSelect(template.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`rounded-lg border-2 overflow-hidden ${
                        selectedTheme === template.id 
                          ? 'border-yellow-400 shadow-lg shadow-yellow-400/20' 
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      {/* Template Preview */}
                      <div 
                        className="h-48 p-8 flex flex-col justify-center items-center text-center relative"
                        style={{ backgroundColor: template.preview.backgroundColor }}
                      >
                        <div 
                          className="text-lg font-black uppercase tracking-wide mb-2"
                          style={{ color: template.preview.textColor }}
                        >
                          2025
                        </div>
                        <div 
                          className="text-3xl font-black uppercase"
                          style={{ color: template.preview.accentColor }}
                        >
                          {projectName.toUpperCase()}
                        </div>
                        <div 
                          className="text-base font-bold uppercase mt-2"
                          style={{ color: template.preview.textColor }}
                        >
                          SLIDES
                        </div>
                      </div>
                      
                      {/* Template Name */}
                      <div className="bg-white/5 p-4 text-center">
                        <h3 className="text-lg font-bold text-white">{template.name}</h3>
                        {selectedTheme === template.id && (
                          <div className="text-yellow-400 text-sm mt-1 font-medium">
                            ✓ Selected
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Generate Button */}
              {!showFinalTable && (
                <div className="pt-4">
                  <Button 
                    onClick={handleGenerateFinalWraps}
                    disabled={isUpdating}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-4 text-lg"
                    size="lg"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Saving theme...
                      </>
                    ) : (
                      'Generate final wraps!'
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Final Results Table */}
          {showFinalTable && projectUsers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">🎉 Your Wrapped Slides Are Ready!</CardTitle>
                  <CardDescription className="text-gray-300">
                    Click "Preview" to see slides in a modal or "Preview in new tab" to open in a separate tab
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/20">
                        <TableHead className="text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-300 w-64">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projectUsers.map((user) => (
                        <TableRow key={user.id} className="border-white/20 hover:bg-gray-100/5">
                          <TableCell className="text-white">
                            <div>
                              <div className="font-medium">{user.first_name} {user.last_name}</div>
                              <div className="text-gray-300 text-sm">{user.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                onClick={() => handlePreviewSlides(user.id, `${user.first_name} ${user.last_name}`)}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                                size="sm"
                              >
                                <Play className="w-4 h-4 mr-2" />
                                Preview
                              </Button>
                              <Button
                                onClick={() => handlePreviewInNewTab(user.id, `${user.first_name} ${user.last_name}`)}
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                                size="sm"
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Preview in new tab
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Slide Preview Modal */}
      {selectedUser && (
        <SlidePreviewModal
          isOpen={modalOpen}
          onClose={closeModal}
          userName={`${selectedUser.first_name} ${selectedUser.last_name}`}
          captions={selectedUser.wrap_captions || []}
          theme={selectedTheme}
          projectName={projectName}
        />
      )}
    </div>
  );
};

export default ChooseTheme;
