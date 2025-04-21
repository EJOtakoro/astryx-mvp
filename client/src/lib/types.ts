export interface UserInfo {
  email: string;
  userType: string;
}

export interface Answer {
  answer1: string;
  answer2: string;
  answer3: string;
}

export interface FeedbackRating {
  [key: number]: number;
}
