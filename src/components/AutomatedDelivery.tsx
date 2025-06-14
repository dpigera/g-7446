
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, Users, CheckCircle } from 'lucide-react';

const AutomatedDelivery = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 to-yellow-100" id="delivery">
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
              Wrapped & Delivered
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We automatically email your highlight reel to your team, audience, or clients — 
              so you don't have to lift a finger.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Schedule & Forget
                  </h3>
                  <p className="text-gray-600">
                    Set up weekly, monthly, or quarterly deliveries. Your wrapped reports 
                    will automatically generate and send on your schedule.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Smart Distribution
                  </h3>
                  <p className="text-gray-600">
                    Send different insights to different groups. Team leads get management 
                    metrics, while team members get personal achievements.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Perfect Formatting
                  </h3>
                  <p className="text-gray-600">
                    Beautiful, mobile-optimized emails that look professional across 
                    all devices and email clients.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Email Preview */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Email Interface */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                {/* Email Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-gray-600">From: your-team@wrapped.ai</div>
                    <div className="text-sm text-gray-600">Subject: 📊 Your Q4 Wrapped is here!</div>
                  </div>
                </div>

                {/* Email Content */}
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Your Q4 Performance Wrapped! 🎉
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Amazing quarter, team! Here are your highlights:
                    </p>
                  </div>

                  {/* Embedded Slides */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-4 text-black text-center">
                      <div className="text-2xl mb-1">🚀</div>
                      <div className="text-sm font-medium">Your team completed 247% more tasks!</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-lg p-4 text-white text-center">
                      <div className="text-2xl mb-1">⭐</div>
                      <div className="text-sm font-medium">Customer satisfaction hit an all-time high</div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      View Full Report
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating delivery indicators */}
              <div className="absolute -top-4 -right-4 bg-yellow-500 text-black p-2 rounded-full">
                <Mail className="w-4 h-4" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-yellow-600 text-white p-2 rounded-full">
                <CheckCircle className="w-4 h-4" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AutomatedDelivery;
