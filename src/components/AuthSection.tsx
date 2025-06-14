
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Chrome } from 'lucide-react';

const AuthSection = () => {
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
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-md mx-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Get Started Free</h3>
            
            <div className="space-y-4">
              {/* Email Input */}
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Work Email
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              {/* Primary CTA */}
              <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-4 px-6 rounded-lg transition-all hover:shadow-xl hover:shadow-yellow-500/25 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center group">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-white/20"></div>
                <span className="px-4 text-sm text-gray-400">or continue with</span>
                <div className="flex-1 border-t border-white/20"></div>
              </div>

              {/* Social Auth Options */}
              <div className="space-y-3">
                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all border border-white/20 flex items-center justify-center space-x-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all border border-white/20 flex items-center justify-center space-x-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.5 12.09c0-1.58-.18-3.09-.52-4.53H12v8.11h6.46c-.28 1.48-1.13 2.73-2.4 3.58v2.96h3.89c2.27-2.09 3.58-5.17 3.58-8.82z"/>
                    <path d="M12 24c3.24 0 5.95-1.08 7.94-2.91l-3.89-2.96c-1.07.72-2.44 1.15-4.05 1.15-3.11 0-5.74-2.1-6.68-4.92H1.4v3.04C3.43 21.3 7.42 24 12 24z"/>
                    <path d="M5.32 14.36c-.24-.72-.38-1.49-.38-2.27 0-.78.14-1.55.38-2.27V6.78H1.4C.51 8.55.06 10.22.06 12s.45 3.45 1.34 5.22l3.92-3.06z"/>
                    <path d="M12 4.75c1.75 0 3.32.6 4.55 1.78l3.41-3.41C17.95 1.19 15.24.06 12 .06 7.42.06 3.43 2.76 1.4 6.67l3.92 3.06C6.26 6.85 8.89 4.75 12 4.75z"/>
                  </svg>
                  <span>Continue with Microsoft</span>
                </button>
              </div>
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-400 mt-6">
              By signing up, you agree to our{' '}
              <a href="#" className="text-yellow-400 hover:text-yellow-300">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-yellow-400 hover:text-yellow-300">Privacy Policy</a>
            </p>
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
