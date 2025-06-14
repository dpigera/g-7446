
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/create-project');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Navigation */}
      <nav className="border-b border-white/20 bg-black/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            Wrapped<span className="text-yellow-400">.ai</span>
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
              You're successfully authenticated with Wrapped.ai. Start creating amazing data stories with AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
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
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
