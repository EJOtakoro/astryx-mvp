import React from 'react';
import NuuronLogo from '../components/NuuronLogo';
import { motion } from 'framer-motion';

interface WelcomeProps {
  navigateTo: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ navigateTo }) => {
  return (
    <section className="scroll-section">
      <motion.div 
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <NuuronLogo size="large" />
        <h2 className="text-2xl mb-10">Less Painful Bidding</h2>
        <p className="mb-8 text-lg max-w-xl mx-auto">
          Create professional industrial documents from just three AI-generated questions, plus supporting documents.
        </p>
        <motion.button 
          className="btn-primary text-lg"
          onClick={navigateTo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            scale: [1, 1.05, 1],
            transition: { 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse" 
            }
          }}
        >
          Experience Nuuron
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Welcome;
