
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SignUpForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUpWithEmail } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signUpWithEmail(email, password, fullName);
    
    if (!error) {
      // User will be automatically signed in and redirected by the auth state change
      navigate('/dashboard');
    }
    
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white mb-2">
          Create Your Account
        </CardTitle>
        <CardDescription className="text-gray-300">
          Join thousands of teams using Wrapped.ai
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName" className="text-white">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-white">Work Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              placeholder="you@company.com"
            />
          </div>
          
          <div>
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              placeholder="Choose a secure password"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-3 px-4 rounded-lg transition-all hover:shadow-xl hover:shadow-yellow-500/25"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-xs text-gray-400 mt-4 text-center">
          ⚠️ Please use your work email address. Personal email providers are not allowed.
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
