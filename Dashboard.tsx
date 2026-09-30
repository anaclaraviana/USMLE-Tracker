import React, { useState } from 'react';
import {
  Flame, Zap, Calendar, BookOpen, Layers, Minus, Plus, Sparkles,
  TrendingUp, Shield, CheckCircle2, Crosshair, Eye, EyeOff,
} from 'lucide-react';
import { translations } from '../i18n';
import type { Language, UserProfile, StepType } from '../types';
import { StepTag, InfoTooltip } from '../ui';

interface DashboardProps {
  currentLang: Language;
  user: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onAddDailyLog: (log: { questions: number; cards: number; mode: 'DAILY_GRIND' | 'DEDICATED'; date: string }) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ currentLang, user, onUpdateProfile, onAddDailyLog }) => {
  const t = translations[currentLang];
  const tDash = t.dashboard;
  const tInput = t.dailyInput;
  const tStats = t.stats;

  const [questions, setQuestions] = useState<number>(40);
  const [cards, setCards] = useState<number>(150);
  const [studyMode, setStudyMode] = useState<'DAILY_GRIND' | 'DEDICATED'>('DAILY_GRIND');
  const [logDate, setLogDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(user.targetSpecialty);
  const [isPublic, setIsPublic] = useState<boolean>(user.isSpecialtyPublic);
  const [selectedStep, setSelectedStep] = useState<StepType>(user.currentStep);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmitGrind = (e: React.FormEvent) => {
    e.preventDefault();
    if (questions <= 0 && cards <= 0) return;
    onAddDailyLog({ questions, cards, mode: studyMode, date: logDate });
    showToast(tInput.logSuccess);
  };

  const handleSaveProfile = () => {
    onUpdateProfile({ targetSpecialty: selectedSpecialty, isSpecialtyPublic: isPublic, currentStep: selectedStep });
    showToast(tDash.profileUpdated);
  };

  return (
    <div className="space-y-8 pb-16">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gradient-to-r from-[#151B8D] to-[#4B1785] border border-cyan-400 text-white px-5 py-3.5 rounded-xl shadow-[0_0_25px_rgba(75,23,133,0.5)]">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-bold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0D1122] via-[#141A33] to-[#1E2648] border border-[#1E2648] p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[#4B1785]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <StepTag step={user.currentStep} />
              <span className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                {user.targetSpecialty}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              {tDash.welcome}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">{user.name}</span>
            </h1>
            <p className="text-sm text-gray-400 font-medium">"{tDash.consistencyTitle}"</p>
          </div>
          <div className="flex items-center gap-4 bg-[#070913]/80 border border-[#1E2648] p-4 rounded-2xl shadow-[0_0_25px_rgba(21,27,141,0.3)]">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-red-600/20 border border-amber-500/40 flex items-center justify-center">
              <Flame className="w-7 h-7 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-black text-white flex items-baseline gap-1">
                {user.streak} <span className="text-xs font-bold text-amber-400">DAYS</span>
              </div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">{tDash.streak}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid: Daily Input & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Daily Input */}
        <section className="lg:col-span-7 xl:col-span-8 space-y-6">
          <div className="bg-[#0D1122] border border-[#1E2648] rounded-2xl p-6 sm:p-8 shadow-[0_0_20px_rgba(21,27,141,0.2)]">
            <div className="flex items-center justify-between pb-6 border-b border-[#1E2648]">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  {tInput.title}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">{tInput.subtitle}</p>
              </div>
              <div className="flex items-center gap-2 bg-[#070913] px-3 py-1.5 rounded-lg border border-[#1E2648]">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <input
                  type="date"
                  value={logDate}
                  onChange={(e) => setLogDate(e.target.value)}
                  className="bg-transparent text-xs text-gray-200 focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            <form onSubmit={handleSubmitGrind} className="mt-6 space-y-6">
              {/* Study Mode Selector */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                    {tInput.studyMode}
                  </label>
                  <InfoTooltip title={tInput.studyMode} content={tInput.modeInfoTooltip} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setStudyMode('DAILY_GRIND')}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      studyMode === 'DAILY_GRIND'
                        ? 'bg-[#151B8D]/50 border-[#22578C] shadow-[0_0_20px_rgba(34,87,140,0.4)]'
                        : 'bg-[#070913]/60 border-[#1E2648] hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-white">{tInput.dailyGrind}</span>
                      <span className={`w-3 h-3 rounded-full ${studyMode === 'DAILY_GRIND' ? 'bg-cyan-400' : 'bg-gray-700'}`} />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">{tInput.dailyGrindDesc}</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStudyMode('DEDICATED')}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      studyMode === 'DEDICATED'
                        ? 'bg-[#4B1785]/50 border-[#4B1785] shadow-[0_0_20px_rgba(75,23,133,0.4)]'
                        : 'bg-[#070913]/60 border-[#1E2648] hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-white">{tInput.dedicated}</span>
                      <span className={`w-3 h-3 rounded-full ${studyMode === 'DEDICATED' ? 'bg-purple-400' : 'bg-gray-700'}`} />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">{tInput.dedicatedDesc}</p>
                  </button>
                </div>
              </div>

              {/* Questions Input */}
              <div className="p-5 rounded-xl bg-[#070913]/80 border border-[#1E2648] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    {tInput.questionsLabel}
                  </label>
                  <span className="font-extrabold text-cyan-400 font-mono text-lg">{questions}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setQuestions(Math.max(0, questions - 5))} className="p-2.5 rounded-lg bg-[#0D1122] border border-[#1E2648] text-gray-300 hover:text-white">
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number" min="0" max="500" value={questions}
                    onChange={(e) => setQuestions(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full text-center bg-[#0D1122] border border-[#1E2648] rounded-lg py-2 text-white font-black text-lg focus:border-cyan-400 focus:outline-none"
                  />
                  <button type="button" onClick={() => setQuestions(questions + 5)} className="p-2.5 rounded-lg bg-[#0D1122] border border-[#1E2648] text-gray-300 hover:text-white">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] uppercase font-bold text-gray-500">{tInput.quickAdd}:</span>
                  {[10, 20, 40, 80].map((amt) => (
                    <button key={amt} type="button" onClick={() => setQuestions(questions + amt)}
                      className="px-2.5 py-1 text-xs font-bold rounded-md bg-[#151B8D]/40 hover:bg-[#151B8D] text-blue-300 border border-[#151B8D]/70 transition-colors">
                      +{amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flashcards Input */}
              <div className="p-5 rounded-xl bg-[#070913]/80 border border-[#1E2648] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    {tInput.flashcardsLabel}
                  </label>
                  <span className="font-extrabold text-purple-400 font-mono text-lg">{cards}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setCards(Math.max(0, cards - 25))} className="p-2.5 rounded-lg bg-[#0D1122] border border-[#1E2648] text-gray-300 hover:text-white">
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number" min="0" max="2000" value={cards}
                    onChange={(e) => setCards(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full text-center bg-[#0D1122] border border-[#1E2648] rounded-lg py-2 text-white font-black text-lg focus:border-purple-400 focus:outline-none"
                  />
                  <button type="button" onClick={() => setCards(cards + 25)} className="p-2.5 rounded-lg bg-[#0D1122] border border-[#1E2648] text-gray-300 hover:text-white">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] uppercase font-bold text-gray-500">{tInput.quickAdd}:</span>
                  {[50, 100, 200, 300].map((amt) => (
                    <button key={amt} type="button" onClick={() => setCards(cards + amt)}
                      className="px-2.5 py-1 text-xs font-bold rounded-md bg-[#4B1785]/40 hover:bg-[#4B1785] text-purple-300 border border-[#4B1785]/70 transition-colors">
                      +{amt}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-gradient-to-r from-[#151B8D] via-[#4B1785] to-[#22578C] hover:opacity-95 shadow-[0_0_25px_rgba(75,23,133,0.4)] border border-cyan-400/30 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                {tInput.submitBtn}
              </button>
            </form>
          </div>
        </section>

        {/* Profile & Goals Column */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          {/* Daily Goal */}
          <div className="bg-[#0D1122] border border-[#1E2648] rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-gray-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              {tStats.dailyGoal}
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-400">{tStats.todayQuestions}</span>
                  <span className="text-cyan-400 font-mono">{questions} / 40 q</span>
                </div>
                <div className="w-full h-2 bg-[#070913] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#151B8D] to-cyan-400 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, (questions / 40) * 100)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-400">{tStats.todayCards}</span>
                  <span className="text-purple-400 font-mono">{cards} / 150 c</span>
                </div>
                <div className="w-full h-2 bg-[#070913] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#4B1785] to-pink-500 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, (cards / 150) * 100)}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Profile & Privacy Settings */}
          <div className="bg-[#0D1122] border border-[#1E2648] rounded-2xl p-6 shadow-xl space-y-5">
            <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2 border-b border-[#1E2648] pb-3">
              <Shield className="w-4 h-4 text-purple-400" />
              {tDash.targetStep} & Profile
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{tDash.targetStep}</label>
              <div className="grid grid-cols-3 gap-2">
                {(['STEP_1', 'STEP_2', 'STEP_3'] as const).map((step) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => setSelectedStep(step)}
                    className={`py-2 text-xs font-extrabold rounded-lg border transition-all ${
                      selectedStep === step
                        ? 'bg-[#4B1785] text-white border-purple-400 shadow-[0_0_15px_rgba(75,23,133,0.5)]'
                        : 'bg-[#070913] text-gray-400 border-[#1E2648] hover:text-white'
                    }`}
                  >
                    {step.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{tDash.specialtyLabel}</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full bg-[#070913] border border-[#1E2648] rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-[#22578C]"
              >
                {t.specialties.map((spec) => (
                  <option key={spec} value={spec} className="bg-[#0D1122] text-white">{spec}</option>
                ))}
              </select>
            </div>

            {/* Specialty Privacy Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{tDash.specialtyPrivacy}</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsPublic(true)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                    isPublic
                      ? 'bg-emerald-900/40 text-emerald-400 border-emerald-500/50'
                      : 'bg-[#070913] text-gray-400 border-[#1E2648] hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  {tDash.public}
                </button>
                <button
                  type="button"
                  onClick={() => setIsPublic(false)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                    !isPublic
                      ? 'bg-gray-700/60 text-gray-200 border-gray-500'
                      : 'bg-[#070913] text-gray-400 border-[#1E2648] hover:text-white'
                  }`}
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  {tDash.private}
                </button>
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
              className="w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#151B8D] to-[#4B1785] hover:opacity-90 shadow-[0_0_20px_rgba(75,23,133,0.3)] border border-[#22578C]/30 transition-all"
            >
              {tDash.saveProfile}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
