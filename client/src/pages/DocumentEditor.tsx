import React, { useState } from 'react';
import NuuronLogo from '../components/NuuronLogo';
import { motion } from 'framer-motion';
import { useAppContext } from '../lib/store';
import DocumentInfoModal from '../components/DocumentInfoModal';
import FeatureComingSoonModal from '../components/FeatureComingSoonModal';
import InsightComingSoonModal from '../components/InsightComingSoonModal';

interface DocumentEditorProps {
  navigateTo: () => void;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ navigateTo }) => {
  const { answers } = useAppContext();
  const [showDocumentInfo, setShowDocumentInfo] = useState(false);
  const [showFeatureSoon, setShowFeatureSoon] = useState(false);
  const [showInsightSoon, setShowInsightSoon] = useState(false);
  const [featureMessage, setFeatureMessage] = useState('');

  const handleFeatureClick = (featureName: string) => {
    setFeatureMessage(`The "${featureName}" feature will be available when Nuuron launches commercially.`);
    setShowFeatureSoon(true);
  };

  return (
    <section className="scroll-section py-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <NuuronLogo />
          <div className="flex space-x-3">
            <button 
              className="flex items-center text-primary font-medium hover:text-opacity-90"
              onClick={() => handleFeatureClick('Add Contributor')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Contributor
            </button>
            <button 
              className="flex items-center text-primary font-medium hover:text-opacity-90"
              onClick={() => handleFeatureClick('Save for later')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save for later
            </button>
            <button 
              className="flex items-center text-gray-900 hover:text-primary"
              onClick={() => setShowDocumentInfo(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>

        <motion.div 
          className="bg-white rounded-lg shadow-md p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Document Content */}
          <div className="document-text">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Technical Proposal</h1>
              <div className="flex space-x-1">
                <button 
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={() => handleFeatureClick('Download')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={() => handleFeatureClick('Save')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mb-2 text-gray-600">
              <p>Submitted by: XYZ Inspection Ltd</p>
              <p>For: Moray Offshore Transmission Consortium (MOTC)</p>
              <p>Tender Reference: MOTC-CABLE-25</p>
              <p>Submission Date: 7 July 2025</p>
            </div>

            <div className="my-8">
              <div className="flex items-center">
                <h2 className="text-xl font-semibold">1. Company Profile</h2>
                <button className="ml-2 lightbulb-icon" onClick={() => setShowInsightSoon(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </button>
              </div>
              
              <div className="pl-4 border-l-2 border-gray-200 mt-4 mb-6">
                <p className="mb-2">XYZ Inspection Ltd is a UK-registered subsea services provider with over 14 years of experience delivering high-resolution inspection and survey solutions to clients across the offshore wind, interconnector, and oil & gas sectors. We specialise in high-voltage cable inspections, structural integrity assessments, and ROV-based diagnostics.</p>
              </div>

              <div className="flex items-center">
                <h2 className="text-xl font-semibold">2. Project Understanding & Objectives</h2>
                <button className="ml-2 lightbulb-icon" onClick={() => setShowInsightSoon(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </button>
              </div>
              
              <div className="pl-4 border-l-2 border-gray-200 mt-4 mb-6">
                <p className="mb-2">We understand that the Moray Offshore Transmission Consortium (MOTC) is initiating a targeted campaign to assess the structural and burial integrity of 220 km of subsea export cables currently in operation. This follows environmental observations suggesting localised seabed mobility and potential exposure of joints, free spans, or strain points.</p>
                <p>The campaign's core objectives include:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>High-resolution bathymetric and geophysical survey of defined cable corridors</li>
                  <li>Visual ROV-based inspections of joints, clamps, touchdown points, and crossing structures</li>
                  <li>Burial depth assessment with GIS correlation to "as-laid" data</li>
                  <li>Bend radius verification and stress modelling</li>
                  <li>Provision of an intervention-prioritised integrity report, compliant with regulatory standards</li>
                </ul>
              </div>

              <div className="flex items-center">
                <h2 className="text-xl font-semibold">3. Technical Approach & Methodology</h2>
                <button className="ml-2 lightbulb-icon" onClick={() => setShowInsightSoon(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </button>
              </div>

              <div className="pl-4 border-l-2 border-gray-200 mt-4 mb-6">
                <h3 className="font-medium mb-2">3.1 Survey Operations</h3>
                <p className="mb-4">Our proposed bathymetric and geophysical survey approach will utilize {answers.answer1} to provide comprehensive seabed mapping and cable position verification. The multi-beam system will deliver high-resolution 3D terrain models to identify potential free spans and burial depth variations, while the side-scan sonar will capture detailed imagery of seabed features and potential cable exposures. Magnetometers will be deployed to precisely locate and track the cable routes where burial depths exceed the detection capabilities of acoustic methods.</p>
                
                <p className="mb-2">Our survey methodology includes:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1 mb-4">
                  <li>Initial calibration runs to optimize sensor configurations for seabed conditions</li>
                  <li>Primary corridor survey using 150% coverage with overlapping parallel lines</li>
                  <li>Targeted high-density surveys at crossing points and joint locations</li>
                  <li>Real-time data QC with field processing capabilities for immediate anomaly verification</li>
                </ul>
                
                <h3 className="font-medium mb-2">3.2 ROV Inspection</h3>
                <p className="mb-2">Building on our recent equipment upgrades, {answers.answer2}. These state-of-the-art systems enable us to:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Perform visual inspections with 4K imaging capabilities</li>
                  <li>Conduct tactile investigations using manipulator arms where required</li>
                  <li>Generate point-cloud models of complex structures using multibeam sonar</li>
                  <li>Execute precision measurements of cable positions, spans, and burial depths</li>
                </ul>
              </div>

              <div className="flex items-center">
                <h2 className="text-xl font-semibold">4. Equipment & Asset Inventory</h2>
                <button className="ml-2 lightbulb-icon" onClick={() => setShowInsightSoon(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </button>
              </div>

              <div className="pl-4 border-l-2 border-gray-200 mt-4 mb-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse my-4">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-left">Asset</th>
                        <th className="border px-4 py-2 text-left">Model/Type</th>
                        <th className="border px-4 py-2 text-left">Function</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2">Vessel</td>
                        <td className="border px-4 py-2">MV Sentinel (DP2)</td>
                        <td className="border px-4 py-2">60m survey support vessel, 30-day endurance</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Sonar</td>
                        <td className="border px-4 py-2">Kongsberg EM2040</td>
                        <td className="border px-4 py-2">High-res MBES</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">SSS</td>
                        <td className="border px-4 py-2">Edgetech 4205</td>
                        <td className="border px-4 py-2">Dual-frequency side-scan sonar</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">ROV</td>
                        <td className="border px-4 py-2">Seaeye Falcon & Comanche</td>
                        <td className="border px-4 py-2">Inspection-class ROVs with high-res multibeam sonar</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Positioning</td>
                        <td className="border px-4 py-2">RTK GNSS + HiPAP</td>
                        <td className="border px-4 py-2">0.5m accuracy</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm italic">All hardware and software are owned and operated by XYZ Inspection Ltd and supported by OEM service agreements.</p>
              </div>

              <div className="flex items-center">
                <h2 className="text-xl font-semibold">5. Risk & Constraint Mitigation</h2>
                <button className="ml-2 lightbulb-icon" onClick={() => setShowInsightSoon(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </button>
              </div>

              <div className="pl-4 border-l-2 border-gray-200 mt-4 mb-6">
                <ul className="space-y-3">
                  <li><span className="font-medium">Weather Constraints:</span> Campaign scheduled within late-summer window (Aug–Sept); vessel capable of operating in up to 2.5m Hs.</li>
                  <li><span className="font-medium">Environmental Permitting:</span> Support offered for marine licence coordination, though XYZ does not act as named applicant.</li>
                  <li><span className="font-medium">Subcontracting:</span> GIS-based cable burial modelling to be delivered by OceanAtlas Ltd under XYZ's supervision (existing framework partner).</li>
                  <li><span className="font-medium">ROV Dwell Time:</span> High tidal flow zones may require DP-assisted station-keeping in Area C; mitigation planned through pre-survey tidal modelling.</li>
                  <li><span className="font-medium">Vessel Availability:</span> {answers.answer3}. We are currently securing vessel allocation and will provide confirmed dates upon contract award.</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <button className="bg-primary text-white px-6 py-3 rounded-lg flex items-center">
                <span>Message Nuuron</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex justify-center">
          <motion.button 
            className="btn-primary"
            onClick={navigateTo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue to Feedback
          </motion.button>
        </div>
      </div>

      {/* Modals */}
      {showDocumentInfo && <DocumentInfoModal onClose={() => setShowDocumentInfo(false)} />}
      {showFeatureSoon && <FeatureComingSoonModal message={featureMessage} onClose={() => setShowFeatureSoon(false)} />}
      {showInsightSoon && <InsightComingSoonModal onClose={() => setShowInsightSoon(false)} />}
    </section>
  );
};

export default DocumentEditor;
