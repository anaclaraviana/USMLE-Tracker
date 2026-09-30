import React, { useState, useMemo } from 'react';
import {
  Award, Search, CheckCircle2, XCircle, BookOpen, Clock, BarChart2,
  GraduationCap, Sparkles,
} from 'lucide-react';
import { translations } from '../i18n';
import type { Language, Step1ResultRecord } from '../types';
import { StepTag } from '../ui';

interface Step1HallProps {
  currentLang: Language;
  records: Step1ResultRecord[];
  onViewAnalytics?: (record: Step1ResultRecord) => void;
}

export const Step1Hall: React.FC<Step1HallProps> = ({ currentLang, records, onViewAnalytics }) => {
  const t = translations[currentLang].step1;
  const [filter, setFilter] = useState<'ALL' | 'PASS' | 'FAIL'>('ALL');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = [...records];
    if (filter !== 'ALL') {
      result = result.filter((r) => r.result === filter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.username.toLowerCase().includes(q) ||
          r.targetSpecialty.toLowerCase().includes(q)
      );
    }
    return result;
  }, [records, filter, search]);

  return (
    <div className="space-y-6 pb-16">
      {/* Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#151B8D]/30 via-[#0D1122] to-[#4B1785]/20 border border-[#151B8D]/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-72 h-72 bg-[#151B8D]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-3">
            <Award className="w-7 h-7 text-blue-400" />
            {t.banner.congrats}
          </h1>
          <p className="text-sm text-gray-300 max-w-2xl">{t.banner.communityGratitude}</p>
          <p className="text-xs text-gray-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {t.banner.quickTimeNotice}
          </p>
          <button className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#151B8D] to-[#22578C] text-white text-xs font-black uppercase tracking-wider hover:opacity-90 shadow-[0_0_20px_rgba(21,27,141,0.4)] border border-[#22578C]/30 transition-all">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            {t.banner.submitBtn}
          </button>
        </div>
      </section>

      {/* Header & Filters */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-black text-white">{t.metricsHeader.title}</h2>
          <p className="text-xs text-gray-400 mt-1">{t.metricsHeader.subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 bg-[#0D1122] border border-[#1E2648] rounded-xl p-1">
            {(['ALL', 'PASS', 'FAIL'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filter === f
                    ? f === 'PASS'
                      ? 'bg-emerald-900/50 text-emerald-400'
                      : f === 'FAIL'
                      ? 'bg-red-900/50 text-red-400'
                      : 'bg-[#151B8D]/60 text-cyan-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {f === 'ALL' ? t.metricsHeader.filterAll : f === 'PASS' ? t.metricsHeader.filterPass : t.metricsHeader.filterFail}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-[#0D1122] border border-[#1E2648] rounded-xl px-3 py-2 flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.metricsHeader.searchPlaceholder}
              className="bg-transparent text-xs text-gray-200 focus:outline-none flex-1"
            />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((record) => (
          <div
            key={record.id}
            className="bg-[#0D1122] border border-[#1E2648] rounded-2xl p-5 shadow-lg hover:border-[#22578C]/50 transition-all group"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#151B8D] to-[#4B1785] flex items-center justify-center text-xs font-bold text-white border border-[#22578C]">
                  {record.username.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{record.username}</div>
                  {record.isSpecialtyPublic && (
                    <div className="text-[10px] text-gray-400 flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" />
                      {record.targetSpecialty}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                {record.result === 'PASS' ? (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-900/50 text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" /> PASS
                  </span>
                ) : (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-900/50 text-red-400 text-[10px] font-black uppercase tracking-wider border border-red-500/30">
                    <XCircle className="w-3.5 h-3.5" /> FAIL
                  </span>
                )}
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  record.isFirstAttempt
                    ? 'bg-cyan-900/40 text-cyan-400 border border-cyan-700/30'
                    : 'bg-amber-900/40 text-amber-400 border border-amber-700/30'
                }`}>
                  {record.isFirstAttempt ? t.card.firstAttempt : t.card.repeatAttempt}
                </span>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#070913]/80 border border-[#1E2648]">
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  {t.card.free120}
                </span>
                <span className="text-sm font-mono font-black text-cyan-400">{record.free120Percentage}%</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#070913]/80 border border-[#1E2648]">
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  {t.card.prepDuration}
                </span>
                <span className="text-sm font-mono font-black text-purple-400">{record.prepMonths} months</span>
              </div>

              {/* NBME Scores */}
              {record.nbmes.length > 0 && (
                <div className="p-3 rounded-lg bg-[#070913]/80 border border-[#1E2648]">
                  <div className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1.5">
                    <BarChart2 className="w-3.5 h-3.5 text-blue-400" />
                    {t.card.nbmeScores}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {record.nbmes.map((nbme, i) => (
                      <span key={i} className="px-2 py-1 rounded-md bg-[#151B8D]/30 border border-[#151B8D]/50 text-[10px] font-mono text-blue-300">
                        {nbme.form}: <span className="font-bold text-blue-200">{nbme.score}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Sims */}
              {record.otherSimulations.length > 0 && (
                <div className="p-3 rounded-lg bg-[#070913]/80 border border-[#1E2648]">
                  <div className="text-xs font-bold text-gray-400 mb-2">{t.card.otherSims}</div>
                  <div className="flex flex-wrap gap-2">
                    {record.otherSimulations.map((sim, i) => (
                      <span key={i} className="px-2 py-1 rounded-md bg-[#4B1785]/30 border border-[#4B1785]/50 text-[10px] font-mono text-purple-300">
                        {sim.name}: <span className="font-bold text-purple-200">{sim.score}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* View Analytics Button */}
              <button
                onClick={() => onViewAnalytics?.(record)}
                className="w-full py-2.5 rounded-lg text-xs font-bold text-cyan-400 bg-[#070913] border border-[#1E2648] hover:border-[#22578C] hover:bg-[#151B8D]/20 transition-all flex items-center justify-center gap-2"
              >
                <BarChart2 className="w-3.5 h-3.5" />
                {t.card.viewPrepAnalytics}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-sm text-gray-500">{t.metricsHeader.searchPlaceholder}</div>
      )}
    </div>
  );
};
