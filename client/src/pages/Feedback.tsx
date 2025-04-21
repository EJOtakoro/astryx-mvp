import React, { useState } from 'react';
import AstryxLogo from '../components/AstryxLogo';
import { motion } from 'framer-motion';
import { Slider } from '../components/ui/slider';
import { useAppContext } from '../lib/store';

interface FeedbackProps {
  navigateTo: () => void;
}

const FeedbackItem: React.FC<{
  number: number;
  title: string;
  value: number;
  onChange: (value: number) => void;
}> = ({ number, title, value, onChange }) => {
  return (
    <div className="feature-rating">
      <p className="font-medium mb-3">{number}. {title}</p>
      <div className="flex items-center">
        <span className="text-sm mr-2 whitespace-nowrap">Not so useful</span>
        <div className="relative flex-1 mx-2">
          <Slider 
            defaultValue={[value]} 
            max={5}
            min={1}
            step={1}
            onValueChange={(val) => onChange(val[0])}
          />
        </div>
        <span className="text-sm ml-2 whitespace-nowrap">Extremely valuable</span>
      </div>
    </div>
  );
};

const Feedback: React.FC<FeedbackProps> = ({ navigateTo }) => {
  const { feedbackRatings, setFeedbackRating, additionalFeedback, setAdditionalFeedback } = useAppContext();
  
  const handleRatingChange = (number: number, value: number) => {
    setFeedbackRating(number, value);
  };

  return (
    <section className="scroll-section py-8">
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
          <h2 className="text-xl font-semibold mb-6">Hope you enjoyed the demo!</h2>
          <p className="mb-8">Please indicate how you feel about these 6 possible features:</p>

          <div className="space-y-8">
            <FeedbackItem 
              number={1} 
              title="Drafting from 3 AI generated questions" 
              value={feedbackRatings[1]}
              onChange={(value) => handleRatingChange(1, value)}
            />
            
            <FeedbackItem 
              number={2} 
              title="Live document collaboration" 
              value={feedbackRatings[2]}
              onChange={(value) => handleRatingChange(2, value)}
            />
            
            <FeedbackItem 
              number={3} 
              title="AI section insights" 
              value={feedbackRatings[3]}
              onChange={(value) => handleRatingChange(3, value)}
            />
            
            <FeedbackItem 
              number={4} 
              title="Integrations with other bid management tools" 
              value={feedbackRatings[4]}
              onChange={(value) => handleRatingChange(4, value)}
            />
            
            <FeedbackItem 
              number={5} 
              title="Built-in compliance checker" 
              value={feedbackRatings[5]}
              onChange={(value) => handleRatingChange(5, value)}
            />
            
            <FeedbackItem 
              number={6} 
              title="Two-click question assignment with other teammates if you don't know the answer" 
              value={feedbackRatings[6]}
              onChange={(value) => handleRatingChange(6, value)}
            />

            <div className="mt-8">
              <label htmlFor="additional-feedback" className="block font-medium mb-2">Anything else:</label>
              <textarea 
                id="additional-feedback" 
                className="input-field min-h-[100px] resize-none" 
                placeholder="Share any other thoughts or feedback..."
                value={additionalFeedback}
                onChange={(e) => setAdditionalFeedback(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-8">
            <motion.button 
              className="btn-primary w-full"
              onClick={navigateTo}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Done
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Feedback;
