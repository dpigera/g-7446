
import React from 'react';
import { motion } from 'framer-motion';
import { FileSpreadsheet, BarChart3, Frown } from 'lucide-react';

const ProblemStatement = () => {
  return (
    <section className="py-20 bg-gray-100" id="problem">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Tired of boring dashboards?
          </h2>
          
          <p className="text-xl text-gray-600 mb-16 leading-relaxed">
            Most teams bury their insights in cluttered spreadsheets and stale presentations. 
            We make your data shine — instantly.
          </p>
          
          {/* Problem Illustrations */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileSpreadsheet className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Endless Spreadsheets</h3>
              <p className="text-gray-500 text-sm">
                Data trapped in rows and columns that nobody wants to read
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Stale Presentations</h3>
              <p className="text-gray-500 text-sm">
                20-slide decks that put your audience to sleep
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Frown className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Zero Engagement</h3>
              <p className="text-gray-500 text-sm">
                Insights that never reach the right people at the right time
              </p>
            </motion.div>
          </div>
          
          {/* Before/After Visual */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-600 mb-4">Before: The Old Way</h4>
              <div className="bg-gray-200 p-6 rounded-xl border-2 border-dashed border-gray-400">
                <div className="space-y-2">
                  <div className="h-3 bg-gray-400 rounded w-full"></div>
                  <div className="h-3 bg-gray-400 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-400 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-400 rounded w-2/3"></div>
                </div>
                <p className="text-xs text-gray-500 mt-4">Boring spreadsheet data</p>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="text-lg font-semibold text-purple-600 mb-4">After: The Wrapped Way</h4>
              <div className="bg-gradient-to-br from-purple-500 to-indigo-500 p-6 rounded-xl text-white">
                <div className="text-2xl mb-2">🎉</div>
                <p className="font-semibold">You completed 247% more tasks than last quarter!</p>
                <p className="text-sm text-purple-100 mt-2">Your productivity is on fire! 🔥</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatement;
