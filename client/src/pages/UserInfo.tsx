import React, { useState } from 'react';
import AstryxLogo from '../components/AstryxLogo';
import { motion } from 'framer-motion';
import { useAppContext } from '../lib/store';

interface UserInfoProps {
  navigateTo: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ navigateTo }) => {
  const { userInfo, setUserInfo } = useAppContext();
  const [email, setEmail] = useState(userInfo.email);
  const [userType, setUserType] = useState('');

  const handleContinue = () => {
    if (!email || !userType) {
      alert("Please fill in your email and select your role before continuing");
      return;
    }
    setUserInfo({
      email,
      userType
    });
    navigateTo();
  };

  return (
    <section className="scroll-section">
      <div className="max-w-3xl mx-auto w-full">
        <div className="flex items-center mb-8">
          <AstryxLogo />
        </div>
        <motion.div 
          className="question-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-6">First, a bit about you</h2>
          
          <div className="mb-6">
            <label htmlFor="user-email" className="block mb-2 font-medium">Email</label>
            <input 
              type="email" 
              id="user-email" 
              className="input-field" 
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <p className="block mb-3 font-medium">I am a:</p>
            <div className="space-y-3">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="user-type" 
                  className="form-radio h-5 w-5 text-primary" 
                  checked={userType === 'Industry professional'}
                  onChange={() => setUserType('Industry professional')}
                />
                <span className="ml-2">Industry professional</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="user-type" 
                  className="form-radio h-5 w-5 text-primary"
                  checked={userType === 'Potential investor'}
                  onChange={() => setUserType('Potential investor')}
                />
                <span className="ml-2">Potential investor</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="user-type" 
                  className="form-radio h-5 w-5 text-primary"
                  checked={userType === 'Developer'}
                  onChange={() => setUserType('Developer')}
                />
                <span className="ml-2">Developer</span>
              </label>
            </div>
          </div>
          
          <div className="mt-8">
            <motion.button 
              className="btn-primary w-full"
              onClick={handleContinue}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UserInfo;
