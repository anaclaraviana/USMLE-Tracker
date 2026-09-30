import React, { useState, useMemo } from 'react';
import {
  FileCheck, Search, BookOpen, BarChart2, Clock, Calendar,
  Stethoscope, ShieldAlert, Sparkles, ArrowUpDown,
} from 'lucide-react';
import { translations } from '../i18n';
import type { Language, Step23ScoreRecord } from '../types';
import { StepTag } from '../ui';

interface Step23HallProps {
  currentLang: Language;
  records: Step23ScoreRecord[];
  onViewAnalytics?: (record: Step23ScoreRecord) => void;
}

type SortMode = 'RECENT' | 'RANDOM' | 'SCORE_DESC' | 'SCORE_ASC';

export const Step23Hall: React.FC<Step23HallProps> = ({ currentLang, records, onViewAnalytics }) => {
  const t = translations[currentLang].step23;
  const [examFilter, setExamFilter] = useState<'ALL' | 'STEP_2' | 'STEP_3'>('ALL');
  const [sortMode, setSortMode] = useState<SortMode>('RECENT');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = [...records];
    if (examFilter !== 'ALL') {
      result = result.filter((r) => r.stepType === examFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.username.toLowerCase().includes(q) ||
          r.targetSpecialty.toLowerCase().includes(q)
      );
    }

    switch (sortMode) {
      case 'RECENT':
        result.sort((a, b) => b.submissionTimestamp - a.submissionTimestamp);
        break;
      case 'SCORE_DESC':
        result.sort((a, b) => b.realScore - a.realScore);
        break;
      case 'SCORE_ASC':
        result.sort((a, b) => a.realScore - b.realScore);
        break;
      case 'RANDOM':
        result.sort(() => Math.random() - 0.5);
        break;
    }
    return result;
  }, [records, examFilter, sortMode, search]);

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString(currentLang === 'en' ? 'en-US' : 'pt-BR', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4B1785]/30 via-[#0D1122] to-[#22578C]/20 border border-[#4B1785]/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-[#4B1785]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-3">
            <FileCheck className="w-7 h-7 text-purple-400" />
            {t.banner.title}
          </h1>
          <p className="text-sm text-gray-300 max-w-2xl">{t.banner.subtitle}</p>
          <div className="flex items-start gap-2 p-3 rounded-xl bg-[#070913]/60 border border-amber-500/20 max-w-2xl">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200/80">{t.banner.antiAnxietyNotice}</p>
          </div>
          <button className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4B1785] to-[#22578C] text-white text-xs font-black uppercase tracking-wider hover:opacity-90 shadow-[0_0_20px_rgba(75,23,133,0.4)] border border-[#22578C]/30 transition-all">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            {t.banner.submitBtn}
          </button>
        </div>
      </section>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 bg-[#0D1122] border border-[#1E2648] rounded-xl p-1">
          {(['ALL', 'STEP_2', 'STEP_3'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setExamFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                examFilter === f
                  ? f === 'STEP_2'
                    ? 'bg-[#4B1785]/60 text-purple-300'
                    : f === 'STEP_3'
                    ? 'bg-[#22578C]/60 text-cyan-300'
                    : 'bg-[#151B8D]/60 text-blue-300'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {f === 'ALL' ? t.filters.all : f === 'STEP_2' ? t.filters.step2Only : t.filters.step3Only}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-[#0D1122] border border-[#1E2648] rounded-xl px-3 py-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            className="bg-transparent text-xs font-semibold text-gray-200 focus:outline-none cursor-pointer"
          >
            <option value="RECENT" className="bg-[#0D1122]">{t.filters.sortRecent}</option>
            <option value="RANDOM" className="bg-[#0D1122]">{t.filters.sortRandom}</option>
            <option value="SCORE_DESC" className="bg-[#0D1122]">{t.filters.sortScoreDesc}</option>
            <option value="SCORE_ASC" className="bg-[#0D1122]">{t.filters.sortScoreAsc}</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-[#0D1122] border border-[#1E2648] rounded-xl px-3 py-2 flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.filters.searchPlaceholder}
            className="bg-transparent text-xs text-gray-200 focus:outline-none flex-1"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((record) => (
          <div key={record.id} className="bg-[#0D1122] border border-[#1E2648] rounded-2xl p-5 shadow-lg hover:border-[#22578C]/50 transition-all">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#4B1785] to-[#22578C] flex items-center justify-center text-xs font-bold text-white border border-[#22578C]">
                  {record.username.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{record.username}</div>
                  {record.isSpecialtyPublic && (
                    <div className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Stethoscope className="w-3 h-3" />
                      {record.targetSpecialty}
                    </div>
                  )}
                </div>
              </div>
              <StepTag step={record.stepType === 'STEP_2' ? 'STEP_2' : 'STEP_3'} size="sm" />
            </div>

            {/* Real Score - Big Display */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#151B8D]/20 to-[#4B1785]/20 border border-[#22578C]/30 mb-3">
              <div className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1">{t.card.realDeal}</div>
              <div className="text-3xl font-black text-white font-mono">{record.realScore}</div>
              {record.estimatedScore && (
                <div className="text-xs text-gray-400 mt-1">
                  {t.card.estimatedScore}: <span className="font-mono font-bold text-cyan-400">{record.estimatedScore}</span>
                </div>
              )}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {record.free120Percentage !== undefined && (
                <div className="p-2.5 rounded-lg bg-[#070913]/80 border border-[#1E2648]">
                  <div className="text-[9px] font-bold uppercase text-gray-500">{t.card.free120}</div>
                  <div className="text-sm font-mono font-bold text-cyan-400">{record.free120Percentage}%</div>
                </div>
              )}
              {record.monthsAfterStep2 !== undefined && (
                <div className="p-2.5 rounded-lg bg-[#070913]/80 border border-[#1E2648]">
                  <div className="text-[9px] font-bold uppercase text-gray-500">{t.card.timeAfterStep2}</div>
                  <div className="text-sm font-mono font-bold text-purple-400">{record.monthsAfterStep2}m</div>
                </div>
              )}
              {record.timing && (
                <div className="p-2.5 rounded-lg bg-[#070913]/80 border border-[#1E2648]">
                  <div className="text-[9px] font-bold uppercase text-gray-500">{t.card.matchTiming}</div>
                  <div className="text-xs font-bold text-amber-400">
                    {record.timing === 'BEFORE_MATCH' ? t.card.beforeMatch : t.card.duringResidency}
                    {record.pgyLevel && ` (${record.pgyLevel})`}
                  </div>
                </div>
              )}
              <div className="p-2.5 rounded-lg bg-[#070913]/80 border border-[#1E2648]">
                <div className="text-[9px] font-bold uppercase text-gray-500 flex items-center gap-1">
                  <Calendar className="w-2.5 h-2.5" /> Submitted
                </div>
                <div className="text-xs font-bold text-gray-300">{formatDate(record.submissionTimestamp)}</div>
              </div>
            </div>

            {/* NBME Scores */}
            {record.nbmes && record.nbmes.length > 0 && (
              <div className="p-3 rounded-lg bg-[#070913]/80 border border-[#1E2648] mb-3">
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

            <button
              onClick={() => onViewAnalytics?.(record)}
              className="w-full py-2.5 rounded-lg text-xs font-bold text-cyan-400 bg-[#070913] border border-[#1E2648] hover:border-[#22578C] hover:bg-[#151B8D]/20 transition-all flex items-center justify-center gap-2"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              {t.card.viewPrepAnalytics}
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-sm text-gray-500">{t.filters.searchPlaceholder}</div>
      )}
    </div>
  );
};
