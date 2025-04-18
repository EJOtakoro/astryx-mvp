import React from 'react';
import { motion } from 'framer-motion';

interface FeatureComingSoonModalProps {
  message: string;
  onClose: () => void;
}

const FeatureComingSoonModal: React.FC<FeatureComingSoonModalProps> = ({ message, onClose }) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-lg max-w-md w-full p-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Feature Coming Soon</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="mb-4">{message || "This feature will be available when Nuuron launches commercially."}</p>
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="btn-secondary">Close</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeatureComingSoonModal;
