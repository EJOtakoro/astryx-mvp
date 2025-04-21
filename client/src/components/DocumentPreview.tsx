import React from 'react';
import { motion } from 'framer-motion';

interface DocumentPreviewProps {
  onClose: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ onClose }) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-bold text-lg">Invitation To Tender</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <h1 className="text-xl font-bold mb-4">Invitation To Tender: Subsea Cable Inspection Campaign</h1>
          <h2 className="text-lg font-semibold mb-2">Moray Offshore Transmission Consortium</h2>
          <p className="mb-4">Reference: MOTC-CABLE-25</p>
          
          <h3 className="font-bold mt-6 mb-2">Background</h3>
          <p className="mb-4">The Moray Offshore Transmission Consortium operates critical subsea power infrastructure connecting offshore wind generation to mainland grid connections. Recent environmental monitoring has indicated seabed movement in areas where our high-voltage export cables are situated.</p>
          
          <h3 className="font-bold mt-6 mb-2">Scope of Work</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Conduct bathymetric and geophysical survey along 220km of cable routes</li>
            <li>Perform ROV visual inspection of cable protection systems, particularly at joint locations</li>
            <li>Analyze burial depth against design specifications</li>
            <li>Identify and assess potential hazards including free spans and exposure risks</li>
            <li>Provide comprehensive report with remediation recommendations</li>
          </ul>
          
          <h3 className="font-bold mt-6 mb-2">Submission Requirements</h3>
          <p>Interested parties should submit a Technical Proposal addressing methodology, equipment, personnel qualifications, and risk management approach.</p>
          
          <p className="font-medium mt-6">Submission Deadline: July 7, 2025</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DocumentPreview;
