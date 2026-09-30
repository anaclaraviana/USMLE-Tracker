import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Dashboard } from '@/components/Dashboard';
import { Leaderboards } from '@/components/Leaderboards';
import { Step1Hall } from '@/components/Step1Hall';
import { Step23Hall } from '@/components/Step23Hall';
import { MatchArchive } from '@/components/MatchArchive';
import { AnalyticsModal } from '@/components/AnalyticsModal';
import { mockLeaderboardData, mockStep1Results, mockStep23Scores, mockMatchProfiles } from '@/mockData';
import type { Language, UserProfile, LeaderboardEntry } from '@/types';

function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<UserProfile>({
    name: 'Alex',
    currentStep: 'STEP_2',
    targetSpecialty: 'Internal Medicine',
    isSpecialtyPublic: true,
    streak: 14,
    isLoggedIn: true,
  });
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(mockLeaderboardData);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [analyticsUsername, setAnalyticsUsername] = useState<string | undefined>();

  const handleLoginToggle = () => {
    setUser((prev) => ({ ...prev, isLoggedIn: !prev.isLoggedIn }));
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  const handleAddDailyLog = (log: { questions: number; cards: number; mode: 'DAILY_GRIND' | 'DEDICATED'; date: string }) => {
    const existingIdx = leaderboardData.findIndex((e) => e.username === user.name);
    if (existingIdx >= 0) {
      setLeaderboardData((prev) =>
        prev.map((entry, idx) =>
          idx === existingIdx
            ? {
                ...entry,
                questionsCount: entry.questionsCount + log.questions,
                cardsCount: entry.cardsCount + log.cards,
                streakDays: entry.streakDays + 1,
              }
            : entry
        )
      );
    } else {
      const newEntry: LeaderboardEntry = {
        id: `self-${Date.now()}`,
        rank: 0,
        username: user.name,
        step: user.currentStep,
        targetSpecialty: user.targetSpecialty,
        isSpecialtyPublic: user.isSpecialtyPublic,
        questionsCount: log.questions,
        cardsCount: log.cards,
        streakDays: 1,
        mode: log.mode === 'DAILY_GRIND' ? 'DAILY_GRIND' : 'DEDICATED',
      };
      setLeaderboardData((prev) => [...prev, newEntry]);
    }
  };

  const openAnalytics = (username: string) => {
    setAnalyticsUsername(username);
    setAnalyticsOpen(true);
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            currentLang={currentLang}
            user={user}
            onUpdateProfile={handleUpdateProfile}
            onAddDailyLog={handleAddDailyLog}
          />
        );
      case 'leaderboards':
        return <Leaderboards currentLang={currentLang} entries={leaderboardData} />;
      case 'step1Hall':
        return (
          <Step1Hall
            currentLang={currentLang}
            records={mockStep1Results}
            onViewAnalytics={(r) => openAnalytics(r.username)}
          />
        );
      case 'step23Hall':
        return (
          <Step23Hall
            currentLang={currentLang}
            records={mockStep23Scores}
            onViewAnalytics={(r) => openAnalytics(r.username)}
          />
        );
      case 'matchArchive':
        return <MatchArchive currentLang={currentLang} records={mockMatchProfiles} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#070913] text-white">
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={user}
        onLoginToggle={handleLoginToggle}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderTab()}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E2648] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            USMLE GRIND — Mind Hypertrophy
          </p>
        </div>
      </footer>

      <AnalyticsModal
        currentLang={currentLang}
        isOpen={analyticsOpen}
        onClose={() => setAnalyticsOpen(false)}
        username={analyticsUsername}
      />
    </div>
  );
}

export default App;
