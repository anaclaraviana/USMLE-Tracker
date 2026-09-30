import React, { useState, useMemo } from 'react';
import { Trophy, Crown, Medal, Filter, Flame, BookOpen, Layers, BarChart2 } from 'lucide-react';
import { translations } from '../i18n';
import type { Language, LeaderboardTab, StepType, LeaderboardEntry } from '../types';
import { StepTag, InfoTooltip } from '../ui';

interface LeaderboardsProps {
  currentLang: Language;
  entries: LeaderboardEntry[];
}

export const Leaderboards: React.FC<LeaderboardsProps> = ({ currentLang, entries }) => {
  const t = translations[currentLang].leaderboards;
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('DAILY_GRIND');
  const [timeframe, setTimeframe] = useState('ALL_TIME');
  const [stepFilter, setStepFilter] = useState('ALL');

  const filteredEntries = useMemo(() => {
    let result = [...entries];

    if (activeTab === 'DAILY_GRIND') {
      result = result.filter((e) => e.mode === 'DAILY_GRIND' || e.mode === 'BOTH');
    } else if (activeTab === 'DEDICATED') {
      result = result.filter((e) => e.mode === 'DEDICATED' || e.mode === 'BOTH');
    }

    if (stepFilter !== 'ALL') {
      result = result.filter((e) => e.step === stepFilter);
    }

    result.sort((a, b) => (b.questionsCount + b.cardsCount) - (a.questionsCount + a.cardsCount));

    return result.map((entry, idx) => ({ ...entry, rank: idx + 1 }));
  }, [entries, activeTab, stepFilter]);

  const podiumEntries = filteredEntries.slice(0, 3);
  const tableEntries = filteredEntries.slice(3);

  const tabs: { id: LeaderboardTab; label: string; tooltipTitle: string; tooltipDesc: string }[] = [
    { id: 'DAILY_GRIND', label: t.tabs.dailyGrind, tooltipTitle: t.tooltips.dailyGrindTitle, tooltipDesc: t.tooltips.dailyGrindDesc },
    { id: 'DEDICATED', label: t.tabs.dedicated, tooltipTitle: t.tooltips.dedicatedTitle, tooltipDesc: t.tooltips.dedicatedDesc },
    { id: 'UNIFIED', label: t.tabs.unified, tooltipTitle: t.tooltips.unifiedTitle, tooltipDesc: t.tooltips.unifiedDesc },
  ];

  const podiumStyles = [
    { icon: Crown, label: t.podium.topGrinder, bg: 'from-amber-500/20 to-yellow-600/10', border: 'border-amber-500/50', text: 'text-amber-400', glow: 'shadow-[0_0_30px_rgba(245,158,11,0.3)]', height: 'mt-0' },
    { icon: Medal, label: t.podium.runnerUp, bg: 'from-slate-400/20 to-slate-500/10', border: 'border-slate-400/50', text: 'text-slate-300', glow: 'shadow-[0_0_20px_rgba(148,163,184,0.2)]', height: 'mt-6' },
    { icon: Trophy, label: t.podium.thirdPlace, bg: 'from-orange-700/20 to-orange-800/10', border: 'border-orange-600/50', text: 'text-orange-400', glow: 'shadow-[0_0_20px_rgba(234,88,12,0.2)]', height: 'mt-10' },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white flex items-center justify-center gap-3">
          <Trophy className="w-8 h-8 text-amber-400" />
          {t.title}
        </h1>
        <p className="text-sm text-gray-400 mt-2">{t.subtitle}</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#151B8D] to-[#4B1785] text-white border border-[#22578C]/50 shadow-[0_0_20px_rgba(75,23,133,0.4)]'
                  : 'bg-[#0D1122] text-gray-400 border border-[#1E2648] hover:text-white hover:border-[#22578C]'
              }`}
            >
              {tab.label}
              <InfoTooltip title={tab.tooltipTitle} content={tab.tooltipDesc} />
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-2 bg-[#0D1122] border border-[#1E2648] rounded-xl px-3 py-2">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-transparent text-xs font-semibold text-gray-200 focus:outline-none cursor-pointer"
          >
            <option value="ALL_TIME" className="bg-[#0D1122]">{t.filters.allTime}</option>
            <option value="MONTH" className="bg-[#0D1122]">{t.filters.thisMonth}</option>
            <option value="WEEK" className="bg-[#0D1122]">{t.filters.thisWeek}</option>
            <option value="TODAY" className="bg-[#0D1122]">{t.filters.today}</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-[#0D1122] border border-[#1E2648] rounded-xl px-3 py-2">
          <select
            value={stepFilter}
            onChange={(e) => setStepFilter(e.target.value)}
            className="bg-transparent text-xs font-semibold text-gray-200 focus:outline-none cursor-pointer"
          >
            <option value="ALL" className="bg-[#0D1122]">{t.filters.allSteps}</option>
            <option value="STEP_1" className="bg-[#0D1122]">Step 1</option>
            <option value="STEP_2" className="bg-[#0D1122]">Step 2 CK</option>
            <option value="STEP_3" className="bg-[#0D1122]">Step 3</option>
          </select>
        </div>
      </div>

      {/* Podium */}
      {podiumEntries.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {podiumEntries.map((entry, idx) => {
            const style = podiumStyles[idx];
            const Icon = style.icon;
            return (
              <div key={entry.id} className={`${style.height}`}>
                <div className={`relative bg-gradient-to-br ${style.bg} border ${style.border} rounded-2xl p-5 ${style.glow} overflow-hidden`}>
                  <div className="absolute top-3 right-3">
                    <Icon className={`w-7 h-7 ${style.text}`} />
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`text-4xl font-black ${style.text}`}>#{entry.rank}</div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#151B8D] to-[#4B1785] flex items-center justify-center text-sm font-bold text-white border border-[#22578C]">
                      {entry.username.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="text-sm font-bold text-white">{entry.username}</div>
                    <div className={`text-[10px] font-black uppercase tracking-wider ${style.text}`}>{style.label}</div>
                    <StepTag step={entry.step} size="sm" />
                    <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                      <Flame className="w-3 h-3" />
                      {entry.streakDays}d
                    </div>
                    <div className="flex gap-3 pt-1 text-xs">
                      <span className="text-cyan-400 font-mono font-bold flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />{entry.questionsCount}
                      </span>
                      <span className="text-purple-400 font-mono font-bold flex items-center gap-1">
                        <Layers className="w-3 h-3" />{entry.cardsCount}
                      </span>
                    </div>
                    {entry.isSpecialtyPublic && (
                      <span className="text-[10px] text-gray-400">{entry.targetSpecialty}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table */}
      <div className="bg-[#0D1122] border border-[#1E2648] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#070913] border-b border-[#1E2648]">
                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-gray-400">{t.table.rank}</th>
                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-gray-400">{t.table.user}</th>
                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-gray-400 hidden sm:table-cell">{t.table.step}</th>
                <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-gray-400">{t.table.questions}</th>
                <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-gray-400 hidden sm:table-cell">{t.table.cards}</th>
                <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-gray-400">{t.table.totalVolume}</th>
              </tr>
            </thead>
            <tbody>
              {tableEntries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-500">{t.table.noData}</td>
                </tr>
              ) : (
                tableEntries.map((entry) => (
                  <tr key={entry.id} className="border-b border-[#1E2648]/50 hover:bg-[#141A33]/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-bold text-gray-300">#{entry.rank}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#151B8D] to-[#4B1785] flex items-center justify-center text-[10px] font-bold text-white border border-[#22578C]">
                          {entry.username.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{entry.username}</div>
                          <div className="flex items-center gap-1 text-[10px] text-amber-400">
                            <Flame className="w-2.5 h-2.5" />{entry.streakDays}d
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell"><StepTag step={entry.step} size="sm" /></td>
                    <td className="px-4 py-3 text-right text-sm font-mono text-cyan-400 font-bold">{entry.questionsCount}</td>
                    <td className="px-4 py-3 text-right text-sm font-mono text-purple-400 font-bold hidden sm:table-cell">{entry.cardsCount}</td>
                    <td className="px-4 py-3 text-right text-sm font-mono text-white font-black flex items-center justify-end gap-1">
                      <BarChart2 className="w-3 h-3 text-gray-500" />
                      {entry.questionsCount + entry.cardsCount}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
