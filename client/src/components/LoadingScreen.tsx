import React from 'react';
import NuuronLogo from './NuuronLogo';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  message: string;
  subMessage: string;
  showDocumentPreview?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message, 
  subMessage,
  showDocumentPreview = false 
}) => {
  return (
    <div className="scroll-section bg-gray-50">
      <div className="max-w-3xl mx-auto text-center w-full">
        <div className="flex items-center justify-center mb-8">
          <NuuronLogo />
        </div>
        
        <p className="text-xl mb-8">{message}</p>
        
        {showDocumentPreview && (
          <motion.div 
            className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <div className="w-2 h-14 bg-primary rounded-full mr-4"></div>
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded-full mb-3 w-3/4 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2 w-5/6 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full w-4/6 animate-pulse"></div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div className="w-64 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden mb-4">
          <div className="loading-progress"></div>
        </div>
        
        <p className="text-sm text-gray-500">{subMessage}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
