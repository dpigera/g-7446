
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProblemStatement from '@/components/ProblemStatement';
import HowItWorks from '@/components/HowItWorks';
import WhyItMatters from '@/components/WhyItMatters';
import RealExamples from '@/components/RealExamples';
import PoweredByAI from '@/components/PoweredByAI';
import AutomatedDelivery from '@/components/AutomatedDelivery';
import TrackEngagement from '@/components/TrackEngagement';
import Testimonials from '@/components/Testimonials';
import AuthSection from '@/components/AuthSection';
import { motion } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-reveal');
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      document.querySelectorAll('section').forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      
      <main className="pt-16">
        <Hero />
        <ProblemStatement />
        <HowItWorks />
        <WhyItMatters />
        <RealExamples />
        <PoweredByAI />
        <AutomatedDelivery />
        <TrackEngagement />
        <Testimonials />
        <AuthSection />
      </main>
      
      <footer className="bg-black py-8 border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-6 md:mb-0"
            >
              <h3 className="text-2xl font-bold text-white">Wrappd<span className="text-yellow-400">.ai</span></h3>
              <p className="text-sm text-gray-400 mt-2">© {new Date().getFullYear()} Wrappd.ai. All rights reserved.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex space-x-8"
            >
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Contact</a>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
