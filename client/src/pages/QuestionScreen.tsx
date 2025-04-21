import React, { useState, useEffect } from 'react';
import AstryxLogo from '../components/AstryxLogo';
import { motion } from 'framer-motion';
import { useAppContext } from '../lib/store';

interface QuestionScreenProps {
  questionNumber: number;
  question: string;
  defaultAnswer: string;
  navigateTo: () => void;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ 
  questionNumber, 
  question, 
  defaultAnswer, 
  navigateTo 
}) => {
  const { answers, setAnswer } = useAppContext();
  const initialAnswer = answers[`answer${questionNumber}` as keyof typeof answers] || defaultAnswer;
  const [answer, setAnswerText] = useState(initialAnswer);
  const [isDefaultUnchanged, setIsDefaultUnchanged] = useState(answer === defaultAnswer);

  const handleTextAreaFocus = () => {
    if (isDefaultUnchanged) {
      setAnswerText('');
      setIsDefaultUnchanged(false);
    }
  };

  const handleContinue = () => {
    setAnswer(questionNumber, answer);
    navigateTo();
  };

  useEffect(() => {
    // Set initial answer if it wasn't in the store already
    if (!answers[`answer${questionNumber}` as keyof typeof answers]) {
      setAnswer(questionNumber, defaultAnswer);
    }
  }, []);

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
          <h2 className="text-xl font-semibold mb-6">{question}</h2>

          <div className="mb-6">
            <textarea 
              id={`answer-${questionNumber}`} 
              className="input-field min-h-[120px] resize-none"
              value={answer}
              onChange={(e) => {
                setAnswerText(e.target.value);
                setIsDefaultUnchanged(false);
              }}
              onFocus={handleTextAreaFocus}
            />
            {isDefaultUnchanged && (
              <p className="default-text-label">Default answer. Click to edit</p>
            )}
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

export default QuestionScreen;