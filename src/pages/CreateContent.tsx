
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const CreateContent = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  if (!projectId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-white text-lg">Invalid project ID</div>
      </div>
    );
  }

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
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-300 text-lg">
                  Content creation step coming soon...
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  This is where you'll be able to create your wrapped content.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateContent;
