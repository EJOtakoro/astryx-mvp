import React from 'react';
import { motion } from 'framer-motion';

interface ThankYouProps {
  navigateTo: () => void;
}

const ThankYou: React.FC<ThankYouProps> = ({ navigateTo }) => {
  return (
    <section className="scroll-section">
      <motion.div 
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-primary mb-6">Thank You!</h1>
        <p className="mb-10 text-lg">Like what you saw? You can get in touch with the team behind Nuuron using the details below:</p>
        
        <div className="bg-white p-6 rounded-lg shadow-md inline-block text-left mb-10">
          <p className="font-bold mb-2">
            Founder: <a href="mailto:ejiro.otakoro@nuuron.ai" className="text-primary hover:underline">ejiro.otakoro@nuuron.ai</a>
          </p>
          <p className="font-bold">
            Phone: <a href="tel:+447879131086" className="text-primary hover:underline">+44 7879 131086</a>
          </p>
        </div>
        
        <div>
          <motion.button 
            className="btn-secondary"
            onClick={navigateTo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Return to start
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default ThankYou;
