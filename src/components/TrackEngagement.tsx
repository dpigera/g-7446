
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Eye, Heart, Share, TrendingUp } from 'lucide-react';

const TrackEngagement = () => {
  return (
    <section className="py-20 bg-white" id="track-engagement">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Know what people care about
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get real-time stats on opens, slide views, and reactions. 
              Know what's working and what's not.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Analytics Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200"
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Q4 Wrapped Analytics
                </h3>
                <p className="text-sm text-gray-600">Last 7 days</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <Eye className="w-5 h-5 text-blue-500" />
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">1,247</div>
                  <div className="text-xs text-gray-600">Total Views</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">89%</div>
                  <div className="text-xs text-gray-600">Engagement Rate</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <Share className="w-5 h-5 text-purple-500" />
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">156</div>
                  <div className="text-xs text-gray-600">Shares</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <BarChart3 className="w-5 h-5 text-green-500" />
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">4.2min</div>
                  <div className="text-xs text-gray-600">Avg. Time</div>
                </div>
              </div>

              {/* Popular Slides */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Most Popular Slides</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="text-lg">🚀</div>
                      <span className="text-sm text-gray-700">Team productivity slide</span>
                    </div>
                    <span className="text-sm font-medium text-purple-600">78%</span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="text-lg">💰</div>
                      <span className="text-sm text-gray-700">Revenue growth</span>
                    </div>
                    <span className="text-sm font-medium text-purple-600">65%</span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="text-lg">⭐</div>
                      <span className="text-sm text-gray-700">Customer satisfaction</span>
                    </div>
                    <span className="text-sm font-medium text-purple-600">52%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Real-Time Tracking
                  </h3>
                  <p className="text-gray-600">
                    See who's reading your wrapped reports the moment they open them. 
                    Track engagement as it happens.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Slide Performance
                  </h3>
                  <p className="text-gray-600">
                    Discover which insights resonate most with your audience. 
                    Double down on what works.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Improve Over Time
                  </h3>
                  <p className="text-gray-600">
                    Use engagement data to refine your next wrapped report. 
                    Each one gets better than the last.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Enterprise Analytics
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Get advanced insights with team comparisons, department breakdowns, 
                  and custom reporting dashboards.
                </p>
                <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
                  Learn more about Enterprise →
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrackEngagement;
