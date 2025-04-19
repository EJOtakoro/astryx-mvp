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
        <motion.button 
          className="btn-primary inspiring-text"
          onClick={navigateTo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Experience Nuuron
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Welcome;
