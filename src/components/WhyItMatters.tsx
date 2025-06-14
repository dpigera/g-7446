
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, BookOpen, BarChart2, Users } from 'lucide-react';

const WhyItMatters = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Make your analytics memorable",
      description: "Transform dry numbers into stories people actually remember and care about",
      color: "from-yellow-400 to-yellow-500"
    },
    {
      icon: BookOpen,
      title: "Turn data into storytelling",
      description: "AI crafts compelling narratives that highlight what matters most to your audience",
      color: "from-yellow-400 to-yellow-500"
    },
    {
      icon: BarChart2,
      title: "Track views and engagement",
      description: "See exactly who's reading, what they care about, and how they're responding",
      color: "from-yellow-400 to-yellow-500"
    },
    {
      icon: Users,
      title: "Perfect for clients, teams, or investors",
      description: "Whether it's internal updates or client reports, deliver insights that impress",
      color: "from-yellow-400 to-yellow-500"
    }
  ];

  return (
    <section className="py-20 bg-white" id="why-it-matters">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Why Wrapped Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop sending reports that get ignored. Start creating content that gets shared.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Icon */}
                <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg`}>
                  <benefit.icon className="w-8 h-8 text-black" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-bold text-black mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 bg-black rounded-2xl p-8 shadow-xl border border-gray-200"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">5x</div>
                <div className="text-sm text-gray-300">Higher engagement than traditional reports</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">90%</div>
                <div className="text-sm text-gray-300">Of users say their data is more memorable</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">2min</div>
                <div className="text-sm text-gray-300">Average time to generate a highlight reel</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyItMatters;
