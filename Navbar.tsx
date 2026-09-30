import React, { useState } from 'react';
import {
  Flame, Globe, Menu, X, Dumbbell, Trophy, Award, FileCheck, FileText,
  LayoutDashboard, Lock, LogOut,
} from 'lucide-react';
import { translations } from '../i18n';
import type { Language, UserProfile } from '../types';
import { StepTag } from '../ui';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  user: UserProfile;
  onLoginToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang, onLanguageChange, activeTab, onTabChange, user, onLoginToggle,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[currentLang].nav;

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'leaderboards', label: t.leaderboards, icon: Trophy },
    { id: 'step1Hall', label: t.step1Hall, icon: Award },
    { id: 'step23Hall', label: t.step23Hall, icon: FileCheck },
    { id: 'matchArchive', label: t.matchArchive, icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070913] border-b border-[#1E2648]">
      <div className="h-1 w-full bg-gradient-to-r from-[#151B8D] via-[#4B1785] to-[#22578C]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onTabChange('dashboard')}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#151B8D] to-[#4B1785] flex items-center justify-center border border-[#4B1785]/50 shadow-[0_0_20px_rgba(75,23,133,0.4)]">
              <Dumbbell className="w-5 h-5 text-white transform -rotate-45" />
            </div>
            <div>
              <span className="text-xl font-black tracking-wider text-white flex items-center gap-1">
                USMLE<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">GRIND</span>
              </span>
              <span className="block text-[9px] font-bold tracking-widest text-gray-400 uppercase -mt-1">
                {t.tagline}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#151B8D]/80 to-[#4B1785]/80 text-white shadow-[0_0_20px_rgba(21,27,141,0.4)] border border-[#22578C]/50'
                      : 'text-gray-300 hover:text-white hover:bg-[#141A33]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0D1122] border border-[#1E2648] text-xs font-semibold text-gray-300 hover:text-white hover:border-[#22578C] transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span className="uppercase">{currentLang === 'en' ? 'EN' : 'PT'}</span>
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-lg bg-[#0D1122] border border-[#1E2648] shadow-2xl py-1 z-50">
                  <button
                    onClick={() => { onLanguageChange('en'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between ${
                      currentLang === 'en' ? 'bg-[#151B8D]/40 text-cyan-400 font-bold' : 'text-gray-300 hover:bg-[#141A33]'
                    }`}
                  >
                    <span>English</span>
                  </button>
                  <button
                    onClick={() => { onLanguageChange('pt'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between ${
                      currentLang === 'pt' ? 'bg-[#4B1785]/40 text-purple-300 font-bold' : 'text-gray-300 hover:bg-[#141A33]'
                    }`}
                  >
                    <span>Português</span>
                  </button>
                </div>
              )}
            </div>

            {/* User Profile Badge */}
            {user.isLoggedIn ? (
              <div className="flex items-center space-x-3 bg-[#0D1122] border border-[#1E2648] rounded-xl p-1.5 pr-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-950/40 border border-amber-500/30 text-amber-400 text-xs font-black">
                  <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{user.streak}d</span>
                </div>
                <StepTag step={user.currentStep} size="sm" />
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#151B8D] to-[#4B1785] flex items-center justify-center text-xs font-bold text-white border border-[#22578C]">
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <button onClick={onLoginToggle} title={t.logout} className="text-gray-400 hover:text-red-400 transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onLoginToggle}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#151B8D] hover:bg-[#22578C] border border-[#22578C]/50 text-xs font-bold text-white shadow-[0_0_20px_rgba(21,27,141,0.4)] transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                {t.login}
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => onLanguageChange(currentLang === 'en' ? 'pt' : 'en')}
              className="p-2 text-xs font-bold rounded-md bg-[#0D1122] border border-[#1E2648] text-gray-300"
            >
              {currentLang === 'en' ? 'EN' : 'PT'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#0D1122] border border-[#1E2648] text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D1122] border-b border-[#1E2648] px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { onTabChange(item.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold ${
                    isActive
                      ? 'bg-gradient-to-r from-[#151B8D] to-[#4B1785] text-white border border-[#22578C]/40'
                      : 'text-gray-300 hover:bg-[#141A33]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </div>
          {!user.isLoggedIn && (
            <button
              onClick={() => { onLoginToggle(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#151B8D] text-white text-sm font-bold"
            >
              <Lock className="w-4 h-4" />
              {t.login}
            </button>
          )}
        </div>
      )}
    </header>
  );
};
