import React, { useState } from 'react';
import AstryxLogo from '../components/AstryxLogo';
import { motion } from 'framer-motion';
import DocumentPreview from '../components/DocumentPreview';

interface DocumentUploadProps {
  navigateTo: () => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ navigateTo }) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <section className="scroll-section">
      <div className="max-w-3xl mx-auto w-full">
        <div className="flex items-center mb-8">
          <AstryxLogo />
        </div>
        <motion.div 
          className="question-card mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-lg font-medium mb-2">Uploads</p>
            <div 
              className="inline-flex items-center text-primary font-medium cursor-pointer group mb-2"
              onClick={() => setShowPreview(true)}
            >
              <span className="underline">Invitation To Tender</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2">Scenario</h3>
            <p className="text-gray-900">
              You are a bid manager at XYZ Inspection writing a technical proposal. The fictitious client is the Moray Offshore Transmission Consortium, responsible for exporting energy from offshore wind farms to the mainland. Recent seabed movement near their high-voltage subsea cables has raised concerns around mechanical strain, burial depth, and joint integrity. They've issued a competitive tender to appoint a qualified contractor for a full inspection campaign using ROVs, sonar mapping, and structural analysis.
            </p>
          </div>
          
          <div className="mt-8">
            <motion.button 
              className="btn-primary w-full"
              onClick={navigateTo}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Document Preview Modal */}
      {showPreview && <DocumentPreview onClose={() => setShowPreview(false)} />}
    </section>
  );
};

export default DocumentUpload;
