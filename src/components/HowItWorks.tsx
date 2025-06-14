
import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, Mail, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload your team's spreadsheet",
      description: "Simply drag and drop your Excel or CSV file with your team's data",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Sparkles,
      title: "Generate AI-powered highlight reels",
      description: "Our AI transforms boring data into engaging, story-driven slides",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Mail,
      title: "Send automatically via email",
      description: "Beautiful highlight reels delivered straight to your team's inbox",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-20 bg-white" id="how-it-works">
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
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your data into engaging stories in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full z-0">
                    <ArrowRight className="w-8 h-8 text-gray-300 mx-auto" />
                  </div>
                )}
                
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl`}>
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                  
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-900 text-white text-sm font-bold rounded-full mb-4">
                    {index + 1}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Demo Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">See the magic happen</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 mb-2">Input</div>
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-300 rounded w-full"></div>
                    <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-lg text-white">
                  <div className="text-xs text-purple-100 mb-2">Output</div>
                  <div className="text-2xl mb-1">🎯</div>
                  <div className="text-xs font-medium">Your team hit 95% of goals!</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
