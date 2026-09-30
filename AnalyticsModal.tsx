import React, { useState } from 'react';
import { X, BarChart2, BookOpen, Layers, Clock, TrendingUp, CheckCircle2 } from 'lucide-react';
import { translations } from '../i18n';
import type { Language } from '../types';

interface AnalyticsModalProps {
  currentLang: Language;
  isOpen: boolean;
  onClose: () => void;
  username?: string;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ currentLang, isOpen, onClose, username }) => {
  const t = translations[currentLang].analytics;
  const [activeTab, setActiveTab] = useState<'AUTO' | 'MANUAL'>('AUTO');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  // Simulated volume data for the chart
  const volumeData = [
    { day: 'D1', questions: 40, cards: 150 },
    { day: 'D2', questions: 60, cards: 200 },
    { day: 'D3', questions: 80, cards: 180 },
    { day: 'D4', questions: 55, cards: 220 },
    { day: 'D5', questions: 90, cards: 250 },
    { day: 'D6', questions: 120, cards: 300 },
    { day: 'D7', questions: 100, cards: 280 },
    { day: 'D8', questions: 140, cards: 320 },
    { day: 'D9', questions: 160, cards: 350 },
    { day: 'D10', questions: 180, cards: 400 },
    { day: 'D11', questions: 150, cards: 380 },
    { day: 'D12', questions: 200, cards: 420 },
    { day: 'D13', questions: 220, cards: 450 },
    { day: 'D14', questions: 240, cards: 500 },
  ];

  const maxQ = Math.max(...volumeData.map((d) => d.questions));
  const maxC = Math.max(...volumeData.map((d) => d.cards));
  const peakCadence = Math.max(...volumeData.map((d) => d.questions + d.cards));
  const avgQ = Math.round(volumeData.reduce((s, d) => s + d.questions, 0) / volumeData.length);
  const avgC = Math.round(volumeData.reduce((s, d) => s + d.cards, 0) / volumeData.length);

  const handleSaveManual = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={onClose}>
      <div
        className="bg-[#0D1122] border border-[#22578C]/50 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#0D1122] border-b border-[#1E2648] p-5 flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-cyan-400" />
              {t.modal.title}
            </h2>
            {username && <p className="text-xs text-gray-400 mt-0.5">{username}</p>}
            <p className="text-[10px] text-gray-500 mt-0.5">{t.modal.subtitle}</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-4 border-b border-[#1E2648]">
          <button
            onClick={() => setActiveTab('AUTO')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'AUTO'
                ? 'bg-[#151B8D]/60 text-cyan-400 border border-[#22578C]/50'
                : 'bg-[#070913] text-gray-400 border border-[#1E2648] hover:text-white'
            }`}
          >
            {t.modal.tabAuto}
          </button>
          <button
            onClick={() => setActiveTab('MANUAL')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'MANUAL'
                ? 'bg-[#4B1785]/60 text-purple-300 border border-[#4B1785]/50'
                : 'bg-[#070913] text-gray-400 border border-[#1E2648] hover:text-white'
            }`}
          >
            {t.modal.tabManual}
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'AUTO' ? (
            <div className="space-y-5">
              <p className="text-xs text-gray-400">{t.modal.autoDesc}</p>

              {/* Stats Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#070913]/80 border border-[#1E2648]">
                  <TrendingUp className="w-4 h-4 text-amber-400 mb-1" />
                  <div className="text-[9px] font-bold uppercase text-gray-500">{t.charts.peakCadence}</div>
                  <div className="text-sm font-mono font-black text-amber-400">{peakCadence}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#070913]/80 border border-[#1E2648]">
                  <BookOpen className="w-4 h-4 text-cyan-400 mb-1" />
                  <div className="text-[9px] font-bold uppercase text-gray-500">{t.charts.avgDailyQuestions}</div>
                  <div className="text-sm font-mono font-black text-cyan-400">{avgQ}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#070913]/80 border border-[#1E2648]">
                  <Layers className="w-4 h-4 text-purple-400 mb-1" />
                  <div className="text-[9px] font-bold uppercase text-gray-500">{t.charts.avgDailyCards}</div>
                  <div className="text-sm font-mono font-black text-purple-400">{avgC}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#070913]/80 border border-[#1E2648]">
                  <Clock className="w-4 h-4 text-emerald-400 mb-1" />
                  <div className="text-[9px] font-bold uppercase text-gray-500">{t.charts.totalSimDays}</div>
                  <div className="text-sm font-mono font-black text-emerald-400">{volumeData.length}</div>
                </div>
              </div>

              {/* Volume Chart */}
              <div>
                <h3 className="text-xs font-bold text-gray-300 mb-3">{t.charts.volumeCurve}</h3>
                <div className="p-4 rounded-xl bg-[#070913]/80 border border-[#1E2648]">
                  <div className="flex items-end justify-between gap-1 h-40">
                    {volumeData.map((d, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                        <div className="w-full flex flex-col items-center justify-end h-full gap-0.5">
                          <div
                            className="w-full max-w-[16px] bg-gradient-to-t from-[#151B8D] to-cyan-400 rounded-t-sm transition-all hover:opacity-80"
                            style={{ height: `${(d.questions / maxQ) * 60}%` }}
                            title={`${d.questions} Q`}
                          />
                          <div
                            className="w-full max-w-[16px] bg-gradient-to-t from-[#4B1785] to-pink-500 rounded-t-sm transition-all hover:opacity-80"
                            style={{ height: `${(d.cards / maxC) * 35}%` }}
                            title={`${d.cards} C`}
                          />
                        </div>
                        <span className="text-[7px] text-gray-500">{d.day}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-3 text-[10px]">
                    <span className="flex items-center gap-1 text-cyan-400">
                      <div className="w-2 h-2 rounded-sm bg-cyan-400" /> Questions
                    </span>
                    <span className="flex items-center gap-1 text-purple-400">
                      <div className="w-2 h-2 rounded-sm bg-purple-400" /> Cards
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 mt-2">{t.charts.chartPlaceholderNote}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <p className="text-xs text-gray-400">{t.modal.manualDesc}</p>

              {savedSuccess && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  {t.manualForm.savedSuccess}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">{t.manualForm.prepTimeLabel}</label>
                  <input type="number" defaultValue={9} className="w-full bg-[#070913] border border-[#1E2648] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#22578C]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">{t.manualForm.primaryQbankLabel}</label>
                  <select className="w-full bg-[#070913] border border-[#1E2648] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#22578C]">
                    <option className="bg-[#0D1122]">UWorld</option>
                    <option className="bg-[#0D1122]">Amboss</option>
                    <option className="bg-[#0D1122]">Kaplan</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">{t.manualForm.totalQuestionsLabel}</label>
                  <input type="number" defaultValue={3500} className="w-full bg-[#070913] border border-[#1E2648] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#22578C]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">{t.manualForm.avgQuestionsDayLabel}</label>
                  <input type="number" defaultValue={80} className="w-full bg-[#070913] border border-[#1E2648] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#22578C]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">{t.manualForm.qbankCompletedLabel}</label>
                  <input type="number" defaultValue={100} className="w-full bg-[#070913] border border-[#1E2648] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#22578C]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">{t.manualForm.totalCardsLabel}</label>
                  <input type="number" defaultValue={12000} className="w-full bg-[#070913] border border-[#1E2648] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#22578C]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">{t.manualForm.avgCardsDayLabel}</label>
                  <input type="number" defaultValue={250} className="w-full bg-[#070913] border border-[#1E2648] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#22578C]" />
                </div>
              </div>

              {/* Passes Checkboxes */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">{t.manualForm.passesLabel}</label>
                <div className="flex flex-wrap gap-2">
                  {[t.manualForm.pass1, t.manualForm.pass2, t.manualForm.pass3].map((pass, i) => (
                    <label key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#070913] border border-[#1E2648] cursor-pointer hover:border-[#22578C]">
                      <input type="checkbox" defaultChecked={i === 0} className="accent-[#22578C]" />
                      <span className="text-xs text-gray-300">{pass}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Scope Radio */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">{t.manualForm.scopeLabel}</label>
                <div className="flex flex-wrap gap-2">
                  {[t.manualForm.scopeIncorrects, t.manualForm.scopeIncorrectsFlagged, t.manualForm.scopeFullReset].map((scope, i) => (
                    <label key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#070913] border border-[#1E2648] cursor-pointer hover:border-[#22578C]">
                      <input type="radio" name="scope" defaultChecked={i === 0} className="accent-[#4B1785]" />
                      <span className="text-xs text-gray-300">{scope}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSaveManual}
                className="w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#151B8D] to-[#4B1785] hover:opacity-90 shadow-[0_0_20px_rgba(75,23,133,0.3)] border border-[#22578C]/30 transition-all"
              >
                {t.manualForm.saveBtn}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
