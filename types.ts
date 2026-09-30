export type Language = 'en' | 'pt';
export type StepType = 'STEP_1' | 'STEP_2' | 'STEP_3';
export type LeaderboardTab = 'DAILY_GRIND' | 'DEDICATED' | 'UNIFIED';
export type Timeframe = 'TODAY' | 'WEEK' | 'MONTH' | 'ALL_TIME';

export interface UserProfile {
  name: string;
  currentStep: StepType;
  targetSpecialty: string;
  isSpecialtyPublic: boolean;
  streak: number;
  isLoggedIn: boolean;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  step: StepType;
  targetSpecialty: string;
  isSpecialtyPublic: boolean;
  questionsCount: number;
  cardsCount: number;
  streakDays: number;
  mode: 'DAILY_GRIND' | 'DEDICATED' | 'BOTH';
}

export interface Step1ResultRecord {
  id: string;
  username: string;
  targetSpecialty: string;
  isSpecialtyPublic: boolean;
  result: 'PASS' | 'FAIL';
  isFirstAttempt: boolean;
  free120Percentage: number;
  prepMonths: number;
  nbmes: { form: string; score: string }[];
  otherSimulations: { name: string; score: string }[];
  submissionDate: string;
}

export interface Step23ScoreRecord {
  id: string;
  username: string;
  targetSpecialty: string;
  isSpecialtyPublic: boolean;
  stepType: 'STEP_2' | 'STEP_3';
  realScore: number;
  estimatedScore?: number;
  free120Percentage?: number;
  nbmes?: { form: string; score: string }[];
  monthsAfterStep2?: number;
  timing?: 'BEFORE_MATCH' | 'DURING_RESIDENCY';
  pgyLevel?: string;
  submissionTimestamp: number;
}

export interface MatchProfileEntry {
  id: string;
  candidateName: string;
  isMatched: boolean;
  matchedSpecialty?: string;
  appliedSpecialty: string;
  programCategory?: 'UNIVERSITY' | 'COMMUNITY_AFFILIATED' | 'COMMUNITY';
  yog: number;
  visaRequired: boolean;
  step1Result: 'PASS' | 'FAIL';
  step2Score: number;
  step3Score?: number | null;
  totalUsceMonths: number;
  lorsCount: number;
  researchMonths: number;
  publicationsCount: number;
}

export interface DailyLog {
  id: string;
  username: string;
  questions: number;
  cards: number;
  mode: 'DAILY_GRIND' | 'DEDICATED';
  date: string;
}
