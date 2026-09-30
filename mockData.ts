import type {
  LeaderboardEntry,
  Step1ResultRecord,
  Step23ScoreRecord,
  MatchProfileEntry,
} from './types';

export const mockLeaderboardData: LeaderboardEntry[] = [
  { id: '1', rank: 1, username: 'GrindMaster_MD', step: 'STEP_2', targetSpecialty: 'Internal Medicine', isSpecialtyPublic: true, questionsCount: 1840, cardsCount: 3200, streakDays: 47, mode: 'BOTH' },
  { id: '2', rank: 2, username: 'NoDaysOff', step: 'STEP_1', targetSpecialty: 'Dermatology', isSpecialtyPublic: true, questionsCount: 1620, cardsCount: 2800, streakDays: 39, mode: 'DAILY_GRIND' },
  { id: '3', rank: 3, username: 'Synapse_Sniper', step: 'STEP_2', targetSpecialty: 'Neurology', isSpecialtyPublic: true, questionsCount: 1450, cardsCount: 2100, streakDays: 31, mode: 'DEDICATED' },
  { id: '4', rank: 4, username: 'QBank_Warrior', step: 'STEP_1', targetSpecialty: 'Pediatrics', isSpecialtyPublic: true, questionsCount: 1320, cardsCount: 1950, streakDays: 28, mode: 'DAILY_GRIND' },
  { id: '5', rank: 5, username: 'AnkiMachine', step: 'STEP_2', targetSpecialty: 'Psychiatry', isSpecialtyPublic: false, questionsCount: 1180, cardsCount: 3400, streakDays: 25, mode: 'BOTH' },
  { id: '6', rank: 6, username: 'DedicatedDoc', step: 'STEP_3', targetSpecialty: 'Emergency Medicine', isSpecialtyPublic: true, questionsCount: 1050, cardsCount: 1600, streakDays: 22, mode: 'DEDICATED' },
  { id: '7', rank: 7, username: 'NightShiftStudier', step: 'STEP_2', targetSpecialty: 'General Surgery', isSpecialtyPublic: true, questionsCount: 920, cardsCount: 1400, streakDays: 19, mode: 'DAILY_GRIND' },
  { id: '8', rank: 8, username: 'FlashcardsOnly', step: 'STEP_1', targetSpecialty: 'Undecided', isSpecialtyPublic: false, questionsCount: 340, cardsCount: 4200, streakDays: 15, mode: 'DAILY_GRIND' },
  { id: '9', rank: 9, username: 'ClinicalKing', step: 'STEP_2', targetSpecialty: 'Anesthesiology', isSpecialtyPublic: true, questionsCount: 880, cardsCount: 1100, streakDays: 14, mode: 'DEDICATED' },
  { id: '10', rank: 10, username: 'ResilientResident', step: 'STEP_3', targetSpecialty: 'Family Medicine', isSpecialtyPublic: true, questionsCount: 760, cardsCount: 950, streakDays: 11, mode: 'BOTH' },
  { id: '11', rank: 11, username: 'PathFinder', step: 'STEP_1', targetSpecialty: 'Pathology', isSpecialtyPublic: true, questionsCount: 680, cardsCount: 1200, streakDays: 9, mode: 'DAILY_GRIND' },
  { id: '12', rank: 12, username: 'RadReader', step: 'STEP_2', targetSpecialty: 'Radiology (Diagnostic)', isSpecialtyPublic: false, questionsCount: 540, cardsCount: 880, streakDays: 7, mode: 'DEDICATED' },
];

export const mockStep1Results: Step1ResultRecord[] = [
  {
    id: 's1-1', username: 'GrindMaster_MD', targetSpecialty: 'Internal Medicine', isSpecialtyPublic: true,
    result: 'PASS', isFirstAttempt: true, free120Percentage: 78, prepMonths: 9,
    nbmes: [{ form: 'NBME 26', score: '68%' }, { form: 'NBME 28', score: '72%' }, { form: 'NBME 30', score: '75%' }],
    otherSimulations: [{ name: 'UWorld Sim 1', score: '74%' }],
    submissionDate: '2025-03-15',
  },
  {
    id: 's1-2', username: 'NoDaysOff', targetSpecialty: 'Dermatology', isSpecialtyPublic: true,
    result: 'PASS', isFirstAttempt: true, free120Percentage: 82, prepMonths: 12,
    nbmes: [{ form: 'NBME 25', score: '71%' }, { form: 'NBME 29', score: '76%' }, { form: 'NBME 31', score: '80%' }],
    otherSimulations: [{ name: 'UWorld Sim 2', score: '79%' }, { name: 'Amboss Sim', score: '77%' }],
    submissionDate: '2025-02-20',
  },
  {
    id: 's1-3', username: 'QBank_Warrior', targetSpecialty: 'Pediatrics', isSpecialtyPublic: true,
    result: 'PASS', isFirstAttempt: false, free120Percentage: 70, prepMonths: 14,
    nbmes: [{ form: 'NBME 27', score: '62%' }, { form: 'NBME 30', score: '68%' }],
    otherSimulations: [{ name: 'UWorld Sim 1', score: '65%' }],
    submissionDate: '2025-04-02',
  },
  {
    id: 's1-4', username: 'FlashcardsOnly', targetSpecialty: 'Undecided', isSpecialtyPublic: false,
    result: 'FAIL', isFirstAttempt: true, free120Percentage: 58, prepMonths: 6,
    nbmes: [{ form: 'NBME 26', score: '52%' }, { form: 'NBME 28', score: '55%' }],
    otherSimulations: [],
    submissionDate: '2025-01-10',
  },
  {
    id: 's1-5', username: 'PathFinder', targetSpecialty: 'Pathology', isSpecialtyPublic: true,
    result: 'PASS', isFirstAttempt: true, free120Percentage: 75, prepMonths: 8,
    nbmes: [{ form: 'NBME 29', score: '70%' }, { form: 'NBME 31', score: '73%' }],
    otherSimulations: [{ name: 'UWorld Sim 1', score: '71%' }],
    submissionDate: '2025-05-18',
  },
  {
    id: 's1-6', username: 'ResilientResident', targetSpecialty: 'Family Medicine', isSpecialtyPublic: true,
    result: 'FAIL', isFirstAttempt: false, free120Percentage: 62, prepMonths: 10,
    nbmes: [{ form: 'NBME 25', score: '58%' }, { form: 'NBME 30', score: '60%' }],
    otherSimulations: [{ name: 'Amboss Sim', score: '59%' }],
    submissionDate: '2025-06-05',
  },
];

export const mockStep23Scores: Step23ScoreRecord[] = [
  {
    id: 's23-1', username: 'GrindMaster_MD', targetSpecialty: 'Internal Medicine', isSpecialtyPublic: true,
    stepType: 'STEP_2', realScore: 256, estimatedScore: 252, free120Percentage: 78,
    nbmes: [{ form: 'NBME 9', score: '248' }, { form: 'NBME 11', score: '254' }, { form: 'NBME 13', score: '255' }],
    submissionTimestamp: Date.now() - 86400000 * 2,
  },
  {
    id: 's23-2', username: 'Synapse_Sniper', targetSpecialty: 'Neurology', isSpecialtyPublic: true,
    stepType: 'STEP_2', realScore: 248, estimatedScore: 245, free120Percentage: 74,
    nbmes: [{ form: 'NBME 10', score: '242' }, { form: 'NBME 12', score: '246' }],
    submissionTimestamp: Date.now() - 86400000 * 5,
  },
  {
    id: 's23-3', username: 'DedicatedDoc', targetSpecialty: 'Emergency Medicine', isSpecialtyPublic: true,
    stepType: 'STEP_3', realScore: 242, estimatedScore: 240, free120Percentage: 71,
    nbmes: [{ form: 'NBME 4', score: '238' }, { form: 'NBME 6', score: '241' }],
    monthsAfterStep2: 8, timing: 'BEFORE_MATCH',
    submissionTimestamp: Date.now() - 86400000 * 10,
  },
  {
    id: 's23-4', username: 'AnkiMachine', targetSpecialty: 'Psychiatry', isSpecialtyPublic: false,
    stepType: 'STEP_2', realScore: 262, estimatedScore: 258, free120Percentage: 82,
    nbmes: [{ form: 'NBME 9', score: '255' }, { form: 'NBME 11', score: '260' }, { form: 'NBME 14', score: '261' }],
    submissionTimestamp: Date.now() - 86400000 * 1,
  },
  {
    id: 's23-5', username: 'ResilientResident', targetSpecialty: 'Family Medicine', isSpecialtyPublic: true,
    stepType: 'STEP_3', realScore: 228, estimatedScore: 225, free120Percentage: 66,
    nbmes: [{ form: 'NBME 5', score: '222' }],
    monthsAfterStep2: 14, timing: 'DURING_RESIDENCY', pgyLevel: 'PGY-1',
    submissionTimestamp: Date.now() - 86400000 * 20,
  },
  {
    id: 's23-6', username: 'ClinicalKing', targetSpecialty: 'Anesthesiology', isSpecialtyPublic: true,
    stepType: 'STEP_2', realScore: 251, estimatedScore: 249, free120Percentage: 76,
    nbmes: [{ form: 'NBME 10', score: '246' }, { form: 'NBME 13', score: '250' }],
    submissionTimestamp: Date.now() - 86400000 * 30,
  },
];

export const mockMatchProfiles: MatchProfileEntry[] = [
  {
    id: 'm-1', candidateName: 'GrindMaster_MD', isMatched: true, matchedSpecialty: 'Internal Medicine',
    appliedSpecialty: 'Internal Medicine', programCategory: 'UNIVERSITY', yog: 2024, visaRequired: false,
    step1Result: 'PASS', step2Score: 256, step3Score: 242, totalUsceMonths: 8, lorsCount: 4,
    researchMonths: 12, publicationsCount: 6,
  },
  {
    id: 'm-2', candidateName: 'NoDaysOff', isMatched: true, matchedSpecialty: 'Dermatology',
    appliedSpecialty: 'Dermatology', programCategory: 'UNIVERSITY', yog: 2024, visaRequired: true,
    step1Result: 'PASS', step2Score: 262, step3Score: 248, totalUsceMonths: 12, lorsCount: 5,
    researchMonths: 24, publicationsCount: 12,
  },
  {
    id: 'm-3', candidateName: 'Synapse_Sniper', isMatched: true, matchedSpecialty: 'Neurology',
    appliedSpecialty: 'Neurology', programCategory: 'COMMUNITY_AFFILIATED', yog: 2023, visaRequired: true,
    step1Result: 'PASS', step2Score: 248, step3Score: null, totalUsceMonths: 6, lorsCount: 3,
    researchMonths: 8, publicationsCount: 3,
  },
  {
    id: 'm-4', candidateName: 'NightShiftStudier', isMatched: false,
    appliedSpecialty: 'General Surgery', yog: 2025, visaRequired: false,
    step1Result: 'PASS', step2Score: 245, step3Score: null, totalUsceMonths: 4, lorsCount: 3,
    researchMonths: 6, publicationsCount: 2,
  },
  {
    id: 'm-5', candidateName: 'ClinicalKing', isMatched: true, matchedSpecialty: 'Anesthesiology',
    appliedSpecialty: 'Anesthesiology', programCategory: 'COMMUNITY', yog: 2023, visaRequired: true,
    step1Result: 'PASS', step2Score: 251, step3Score: 235, totalUsceMonths: 10, lorsCount: 4,
    researchMonths: 10, publicationsCount: 4,
  },
  {
    id: 'm-6', candidateName: 'RadReader', isMatched: false,
    appliedSpecialty: 'Radiology (Diagnostic)', yog: 2025, visaRequired: true,
    step1Result: 'PASS', step2Score: 254, step3Score: null, totalUsceMonths: 3, lorsCount: 2,
    researchMonths: 4, publicationsCount: 1,
  },
];
