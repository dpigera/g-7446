
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap } from 'lucide-react';

const PoweredByAI = () => {
  return (
    <section className="py-20 bg-white" id="powered-by-ai">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 mb-6">
              <Brain className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Powered by Advanced AI</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built on the smartest AI
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Wrapped.ai uses GPT-4 to turn dry metrics into fun, human-sounding captions 
              your audience will actually want to read.
            </p>
          </div>

          {/* AI Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Context</h3>
              <p className="text-gray-600 text-sm">
                Understands your data relationships and creates meaningful connections
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Human Voice</h3>
              <p className="text-gray-600 text-sm">
                Generates captions that sound natural, engaging, and perfectly on-brand
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100"
            >
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600 text-sm">
                Processes complex datasets and generates insights in seconds, not hours
              </p>
            </motion.div>
          </div>

          {/* AI Demo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl p-8"
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-6">See AI in action</h4>
            
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="text-left">
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                  <div className="text-xs text-gray-500 mb-2">Raw Data Input:</div>
                  <div className="font-mono text-xs text-gray-700">
                    meetings_attended: 47<br/>
                    avg_duration: 32.5_min<br/>
                    productivity_score: 8.2
                  </div>
                </div>
              </div>
              
              <div className="text-left">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-500 p-4 rounded-lg text-white">
                  <div className="text-xs text-purple-100 mb-2">AI Generated Caption:</div>
                  <div className="text-sm font-medium">
                    "You're a meeting rockstar! 47 meetings with perfect efficiency. 
                    Your 32-minute average keeps everyone focused and productive! 🎯"
                  </div>
                </div>
              </div>
            </div>

            {/* OpenAI Partnership */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-4 text-gray-500">
                <span className="text-sm">Powered by</span>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <span className="font-semibold">OpenAI GPT-4</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PoweredByAI;
