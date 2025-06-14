
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '@/components/SignUpForm';

const AuthSection = () => {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setShowSignUp(true);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black" id="auth">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Wrap? 🎁
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Transform your data into stories people actually want to read. 
              Join thousands of teams already using Wrapped.ai.
            </p>
          </div>

          {/* Auth Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            {user ? (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-white mb-6">Welcome Back!</h3>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Welcome back, {user.user_metadata?.full_name || user.email}!
                  </p>
                  <button 
                    onClick={handleGetStarted}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-4 px-6 rounded-lg transition-all hover:shadow-xl hover:shadow-yellow-500/25 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center group"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-md">
                {showSignUp ? (
                  <div className="space-y-4">
                    <SignUpForm />
                    <div className="text-center">
                      <button
                        onClick={() => setShowSignUp(false)}
                        className="text-gray-400 hover:text-white text-sm"
                      >
                        ← Back to options
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-6">Get Started Free</h3>
                    
                    <div className="space-y-4">
                      {/* Primary CTA - Create Account */}
                      <button 
                        onClick={handleGetStarted}
                        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-4 px-6 rounded-lg transition-all hover:shadow-xl hover:shadow-yellow-500/25 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center group"
                      >
                        Create Account
                        <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-white/20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-transparent text-gray-400">or</span>
                        </div>
                      </div>

                      {/* Google Sign In */}
                      <button 
                        onClick={signInWithGoogle}
                        className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 px-4 rounded-lg transition-all border border-gray-300 flex items-center justify-center space-x-3"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span>Continue with Google</span>
                      </button>

                      <div className="text-center">
                        <button
                          onClick={() => navigate('/auth')}
                          className="text-gray-400 hover:text-white text-sm"
                        >
                          Already have an account? Sign in
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 mt-6">
                      ⚠️ Please use your work email address. Personal email providers are not allowed.
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Benefits Reminder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 grid md:grid-cols-3 gap-6 text-center"
          >
            <div className="text-gray-300">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-sm">Generate in seconds</div>
            </div>
            <div className="text-gray-300">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm">AI-powered insights</div>
            </div>
            <div className="text-gray-300">
              <div className="text-2xl mb-2">📧</div>
              <div className="text-sm">Auto-delivery</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthSection;
