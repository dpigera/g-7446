
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserWithCaptions {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  wrap_captions: string[] | null;
}

const CreateContent = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { user } = useAuth();
  const [creativePrompt, setCreativePrompt] = useState(`For each user, send the following to GPT-4:
- The system prompt describing the app's goal (turn data into a personalized Wrapped experience)
- The admin's creative prompt
- The user's name, image URL, and \`data\` JSON

Ask GPT-4 to return 5–6 slide captions (1 sentence each, playful tone, emojis allowed). Save the output as \`wrap_captions\` in the user record`);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUsers, setGeneratedUsers] = useState<UserWithCaptions[]>([]);
  const [error, setError] = useState<string | null>(null);

  if (!projectId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-white text-lg">Invalid project ID</div>
      </div>
    );
  }

  const handleGenerateContent = async () => {
    if (!user) {
      setError('You must be logged in to generate content');
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-wrap-content', {
        body: {
          projectId,
          creativePrompt,
        },
      });

      if (error) {
        throw new Error(error.message || 'Failed to generate content');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedUsers(data.users || []);
    } catch (err) {
      console.error('Error generating content:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsGenerating(false);
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
                <div className="w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                <span className="ml-2 text-white font-medium">Create Content</span>
              </div>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-6">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-white mb-2">
                Step 3: Create Content
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Project ID: {projectId}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="creative-prompt" className="text-white text-lg font-medium mb-3 block">
                  Creative Prompt
                </Label>
                <Textarea
                  id="creative-prompt"
                  value={creativePrompt}
                  onChange={(e) => setCreativePrompt(e.target.value)}
                  className="min-h-[200px] bg-white/5 border-white/20 text-white placeholder-gray-400 resize-none"
                  placeholder="Enter your creative prompt here..."
                  disabled={isGenerating}
                />
              </div>
              
              <Button 
                onClick={handleGenerateContent}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-3"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating wrapped content...
                  </>
                ) : (
                  'Generate wrapped content'
                )}
              </Button>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-red-400">{error}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Loading State */}
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Generating wrapped content...</h3>
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
              </div>
            </motion.div>
          )}

          {/* Results Table */}
          {generatedUsers.length > 0 && !isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Generated Content Results</CardTitle>
                  <CardDescription className="text-gray-300">
                    Successfully generated captions for {generatedUsers.length} users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/20">
                        <TableHead className="text-gray-300">First Name</TableHead>
                        <TableHead className="text-gray-300">Last Name</TableHead>
                        <TableHead className="text-gray-300">Email</TableHead>
                        <TableHead className="text-gray-300">Generated Captions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {generatedUsers.map((user) => (
                        <TableRow key={user.id} className="border-white/20">
                          <TableCell className="text-white">{user.first_name}</TableCell>
                          <TableCell className="text-white">{user.last_name}</TableCell>
                          <TableCell className="text-gray-300">{user.email}</TableCell>
                          <TableCell className="text-gray-300">
                            {user.wrap_captions && user.wrap_captions.length > 0 ? (
                              <ul className="space-y-1">
                                {user.wrap_captions.map((caption, index) => (
                                  <li key={index} className="text-sm">
                                    {index + 1}. {caption}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span className="text-gray-500">No captions generated</span>
                            )}
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
    </div>
  );
};

export default CreateContent;
