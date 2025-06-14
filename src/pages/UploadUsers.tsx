
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import UserDataPreview from '@/components/UserDataPreview';

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
}

const UploadUsers = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [uploadedUserCount, setUploadedUserCount] = useState<number | null>(null);
  const [uploadedUserData, setUploadedUserData] = useState<UserData[]>([]);

  const handleUploadComplete = (userCount: number, userData: UserData[]) => {
    setUploadedUserCount(userCount);
    setUploadedUserData(userData);
  };

  const handleContinue = () => {
    // Navigate to Step 3: Create Content
    navigate(`/create-project/create-content/${projectId}`);
  };

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
            Wrappd<span className="text-yellow-400">.ai</span>
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
                <div className="w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <span className="ml-2 text-white font-medium">Upload User List</span>
              </div>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-6">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-white mb-2">
                Step 2: Upload Your User List
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Project ID: {projectId}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload 
                projectId={projectId} 
                onUploadComplete={handleUploadComplete}
              />
            </CardContent>
          </Card>

          {uploadedUserCount !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <UserDataPreview 
                users={uploadedUserData}
                userCount={uploadedUserCount}
                onContinue={handleContinue}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UploadUsers;
