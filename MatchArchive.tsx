import React, { useState, useMemo } from 'react';
import {
  FileText, Search, Crown, Stethoscope, Shield, BookOpen,
  CheckCircle2, Clock, Award, Sparkles, X,
} from 'lucide-react';
import { translations } from '../i18n';
import type { Language, MatchProfileEntry } from '../types';

interface MatchArchiveProps {
  currentLang: Language;
  records: MatchProfileEntry[];
}

export const MatchArchive: React.FC<MatchArchiveProps> = ({ currentLang, records }) => {
  const t = translations[currentLang].match;
  const [search, setSearch] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('ALL');
  const [selectedProfile, setSelectedProfile] = useState<MatchProfileEntry | null>(null);

  const specialties = useMemo(() => {
    const set = new Set(records.map((r) => r.appliedSpecialty));
    return ['ALL', ...Array.from(set)];
  }, [records]);

  const filtered = useMemo(() => {
    let result = [...records];
    if (specialtyFilter !== 'ALL') {
      result = result.filter((r) => r.appliedSpecialty === specialtyFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.candidateName.toLowerCase().includes(q) ||
          r.appliedSpecialty.toLowerCase().includes(q) ||
          String(r.yog).includes(q)
      );
    }
    return result;
  }, [records, specialtyFilter, search]);

  return (
    <div className="space-y-6 pb-16">
      {/* Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#22578C]/30 via-[#0D1122] to-[#151B8D]/20 border border-[#22578C]/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute bottom-0 right-0 -mr-16 -mb-16 w-72 h-72 bg-[#22578C]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-3">
            <FileText className="w-7 h-7 text-cyan-400" />
            {t.banner.title}
          </h1>
          <p className="text-sm text-gray-300 max-w-2xl">{t.banner.subtitle}</p>
          <div className="p-3 rounded-xl bg-[#070913]/60 border border-[#22578C]/30 max-w-2xl">
            <div className="text-xs font-bold text-cyan-400 mb-1">{t.banner.explanationTitle}</div>
            <p className="text-xs text-gray-400">{t.banner.explanationText}</p>
          </div>
          <button className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#22578C] to-[#151B8D] text-white text-xs font-black uppercase tracking-wider hover:opacity-90 shadow-[0_0_20px_rgba(34,87,140,0.4)] border border-[#151B8D]/30 transition-all">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            {t.banner.submitBtn}
          </button>
        </div>
      </section>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-[#0D1122] border border-[#1E2648] rounded-xl px-3 py-2">
          <select
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="bg-transparent text-xs font-semibold text-gray-200 focus:outline-none cursor-pointer"
          >
            {specialties.map((spec) => (
              <option key={spec} value={spec} className="bg-[#0D1122]">
                {spec === 'ALL' ? t.actions.filterSpecialty : spec}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 bg-[#0D1122] border border-[#1E2648] rounded-xl px-3 py-2 flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.actions.search}
            className="bg-transparent text-xs text-gray-200 focus:outline-none flex-1"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((profile) => (
          <div
            key={profile.id}
            className="bg-[#0D1122] border border-[#1E2648] rounded-2xl p-5 shadow-lg hover:border-[#22578C]/50 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#22578C] to-[#151B8D] flex items-center justify-center text-xs font-bold text-white border border-[#22578C]">
                  {profile.candidateName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{profile.candidateName}</div>
                  <div className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Stethoscope className="w-3 h-3" />
                    {profile.appliedSpecialty}
                  </div>
                </div>
              </div>
              {profile.isMatched ? (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-900/50 text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/30">
                  <Crown className="w-3 h-3" /> {t.status.badgeMatched}
                </span>
              ) : (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-900/50 text-amber-400 text-[10px] font-black uppercase tracking-wider border border-amber-500/30">
                  <Clock className="w-3 h-3" /> {t.status.badgeApplicant}
                </span>
              )}
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-2.5 rounded-lg bg-[#070913]/80 border border-[#1E2648]">
                <div className="text-[9px] font-bold uppercase text-gray-500">YOG</div>
                <div className="text-sm font-mono font-bold text-cyan-400">{profile.yog}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#070913]/80 border border-[#1E2648]">
                <div className="text-[9px] font-bold uppercase text-gray-500">Step 2</div>
                <div className="text-sm font-mono font-bold text-purple-400">{profile.step2Score}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#070913]/80 border border-[#1E2648]">
                <div className="text-[9px] font-bold uppercase text-gray-500">USCE</div>
                <div className="text-sm font-mono font-bold text-blue-400">{profile.totalUsceMonths}m</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#070913]/80 border border-[#1E2648]">
                <div className="text-[9px] font-bold uppercase text-gray-500">LORs</div>
                <div className="text-sm font-mono font-bold text-amber-400">{profile.lorsCount}</div>
              </div>
            </div>

            {/* Extra Info */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                profile.step1Result === 'PASS'
                  ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-700/30'
                  : 'bg-red-900/40 text-red-400 border border-red-700/30'
              }`}>
                Step 1: {profile.step1Result}
              </span>
              {profile.step3Score !== null && profile.step3Score !== undefined && (
                <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-[#22578C]/30 text-cyan-300 border border-[#22578C]/50">
                  Step 3: {profile.step3Score}
                </span>
              )}
              {profile.visaRequired && (
                <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-amber-900/40 text-amber-400 border border-amber-700/30 flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5" /> Visa
                </span>
              )}
              {profile.programCategory && (
                <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-[#4B1785]/30 text-purple-300 border border-[#4B1785]/50">
                  {profile.programCategory}
                </span>
              )}
            </div>

            {/* Research & Pubs */}
            <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-cyan-400" />
                {profile.researchMonths}m research
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-3 h-3 text-purple-400" />
                {profile.publicationsCount} pubs
              </span>
            </div>

            {profile.isMatched && profile.matchedSpecialty && (
              <div className="p-2 rounded-lg bg-emerald-900/20 border border-emerald-700/20 mb-3">
                <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Matched: {profile.matchedSpecialty}
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedProfile(profile)}
              className="w-full py-2.5 rounded-lg text-xs font-bold text-cyan-400 bg-[#070913] border border-[#1E2648] hover:border-[#22578C] hover:bg-[#151B8D]/20 transition-all"
            >
              {t.actions.viewFullCv}
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-sm text-gray-500">{t.actions.search}</div>
      )}

      {/* Full CV Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setSelectedProfile(null)}>
          <div className="bg-[#0D1122] border border-[#22578C]/50 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-[#0D1122] border-b border-[#1E2648] p-5 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#22578C] to-[#151B8D] flex items-center justify-center text-sm font-bold text-white border border-[#22578C]">
                  {selectedProfile.candidateName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-lg font-black text-white">{selectedProfile.candidateName}</div>
                  <div className="text-xs text-gray-400">{selectedProfile.appliedSpecialty}</div>
                </div>
              </div>
              <button onClick={() => setSelectedProfile(null)} className="p-2 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {selectedProfile.isMatched && selectedProfile.matchedSpecialty && (
                <div className="p-4 rounded-xl bg-emerald-900/20 border border-emerald-700/30">
                  <div className="text-xs font-black uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-2">
                    <Crown className="w-4 h-4" /> {t.status.badgeMatched}
                  </div>
                  <div className="text-sm text-white">{selectedProfile.matchedSpecialty}</div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'YOG', value: selectedProfile.yog },
                  { label: 'Step 1', value: selectedProfile.step1Result },
                  { label: 'Step 2 CK', value: selectedProfile.step2Score },
                  { label: 'Step 3', value: selectedProfile.step3Score ?? 'N/A' },
                  { label: 'USCE Months', value: selectedProfile.totalUsceMonths },
                  { label: 'LORs Count', value: selectedProfile.lorsCount },
                  { label: 'Research Months', value: selectedProfile.researchMonths },
                  { label: 'Publications', value: selectedProfile.publicationsCount },
                  { label: 'Visa Required', value: selectedProfile.visaRequired ? 'Yes' : 'No' },
                  { label: 'Program Category', value: selectedProfile.programCategory ?? 'N/A' },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-lg bg-[#070913]/80 border border-[#1E2648]">
                    <div className="text-[10px] font-bold uppercase text-gray-500">{item.label}</div>
                    <div className="text-sm font-mono font-bold text-cyan-400">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
