import React, { createContext, useContext, useState } from 'react';
import { UserInfo, Answer, FeedbackRating } from './types';

interface AppState {
  userInfo: UserInfo;
  answers: Answer;
  feedbackRatings: FeedbackRating;
  setUserInfo: (userInfo: UserInfo) => void;
  setAnswer: (questionNumber: number, answer: string) => void;
  setFeedbackRating: (questionNumber: number, rating: number) => void;
  additionalFeedback: string;
  setAdditionalFeedback: (feedback: string) => void;
}

const defaultState: AppState = {
  userInfo: {
    email: '',
    userType: 'Industry professional'
  },
  answers: {
    answer1: 'Multi-beam echo sounders, side-scan sonar, and magnetometers.',
    answer2: 'Yes, we added 2 new ROV\'s (Seaeye Falcon and Comanche) with high-res multibeam sonar',
    answer3: 'Vessel availability subject to confirmation (Q3 slot preferred)'
  },
  feedbackRatings: {
    1: 3,
    2: 3,
    3: 3,
    4: 3,
    5: 3,
    6: 3
  },
  setUserInfo: () => {},
  setAnswer: () => {},
  setFeedbackRating: () => {},
  additionalFeedback: '',
  setAdditionalFeedback: () => {}
};

const AppContext = createContext<AppState>(defaultState);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfoState] = useState<UserInfo>(defaultState.userInfo);
  const [answers, setAnswersState] = useState<Answer>(defaultState.answers);
  const [feedbackRatings, setFeedbackRatingsState] = useState<FeedbackRating>(defaultState.feedbackRatings);
  const [additionalFeedback, setAdditionalFeedbackState] = useState('');

  const setUserInfo = (userInfo: UserInfo) => {
    setUserInfoState(userInfo);
  };

  const setAnswer = (questionNumber: number, answer: string) => {
    setAnswersState(prev => ({
      ...prev,
      [`answer${questionNumber}`]: answer
    }));
  };

  const setFeedbackRating = (questionNumber: number, rating: number) => {
    setFeedbackRatingsState(prev => ({
      ...prev,
      [questionNumber]: rating
    }));
  };

  const setAdditionalFeedback = (feedback: string) => {
    setAdditionalFeedbackState(feedback);
  };

  return React.createElement(
    AppContext.Provider,
    {
      value: {
        userInfo,
        answers,
        feedbackRatings,
        setUserInfo,
        setAnswer,
        setFeedbackRating,
        additionalFeedback,
        setAdditionalFeedback
      }
    },
    children
  );
};

export const useAppContext = () => useContext(AppContext);