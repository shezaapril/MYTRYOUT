import React from 'react';
import { Maximize2, Minimize2, Volume2, VolumeX, Moon, Sun, User, BarChart2, Cloud, CloudCheck, LogIn } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { CandidateProfile } from '../data/types';
import { UserAvatar } from './UserAvatar';

interface NavbarProps {
  currentTab: 'home' | 'profile' | 'statistics' | 'exam' | 'result' | 'print';
  onSelectTab: (tab: 'home' | 'profile' | 'statistics') => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  profile: CandidateProfile;
  inExamMode?: boolean;
  currentUser: FirebaseUser | null;
  onOpenAuthModal: () => void;
  isSyncing?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  isFullscreen,
  onToggleFullscreen,
  soundEnabled,
  onToggleSound,
  darkMode,
  onToggleDarkMode,
  profile,
  inExamMode = false,
  currentUser,
  onOpenAuthModal,
  isSyncing = false
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark "My Tryout" */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => !inExamMode && onSelectTab('home')}
            className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink rounded-lg p-1 flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-palette flex items-center justify-center shadow-xs">
              <span className="text-white font-black text-sm">MT</span>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-brand-pink transition-colors">
              My Tryout
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links: Beranda, Profil & Target PTN, Statistik Skor */}
        {!inExamMode ? (
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => onSelectTab('home')}
              className={`hover:text-brand-pink transition-colors relative py-1 ${
                currentTab === 'home' ? 'text-brand-pink font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-pink after:rounded-full' : ''
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => onSelectTab('profile')}
              className={`hover:text-brand-pink transition-colors relative py-1 ${
                currentTab === 'profile' ? 'text-brand-pink font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-pink after:rounded-full' : ''
              }`}
            >
              Profil & Target PTN
            </button>
            <button
              onClick={() => onSelectTab('statistics')}
              className={`hover:text-brand-pink transition-colors relative py-1 ${
                currentTab === 'statistics' ? 'text-brand-pink font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-pink after:rounded-full' : ''
              }`}
            >
              Statistik Skor
            </button>
          </nav>
        ) : (
          <div className="text-xs text-slate-500 dark:text-slate-400 hidden sm:flex items-center gap-2">
            <span>Sesi Ujian Berlangsung</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold px-2 py-0.5 rounded-full bg-brand-pink/15 text-brand-pink">Mode CBT Resmi</span>
          </div>
        )}

        {/* Zone 3: Primary Actions & Settings */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Auth / Cloud Sync Button */}
          {!inExamMode && (
            currentUser ? (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 text-xs font-semibold text-slate-800 dark:text-slate-100 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700/60 rounded-full transition-colors cursor-pointer group"
                title={`Akun: ${currentUser.email || currentUser.displayName} (Tersinkronisasi ke Cloud)`}
              >
                <div className="relative">
                  <UserAvatar
                    name={currentUser.displayName || profile.name}
                    avatarUrl={currentUser.photoURL || profile.avatarUrl}
                    size="sm"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
                </div>
                <div className="hidden sm:flex flex-col text-left leading-none">
                  <span className="text-[11px] font-bold truncate max-w-[100px]">
                    {currentUser.displayName?.split(' ')[0] || profile.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-medium">
                    {isSyncing ? 'Menyinkron...' : 'Cloud Aktif'}
                  </span>
                </div>
              </button>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#F2619C] hover:bg-[#d84581] rounded-full shadow-xs hover:shadow-sm transition-all cursor-pointer"
                title="Masuk dengan akun Google agar progres dan statistik tetap tersimpan di device lain"
              >
                <Cloud className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Masuk / Sinkron</span>
                <span className="sm:hidden">Masuk</span>
              </button>
            )
          )}

          {/* Quick link to profile tab with Avatar (if not already logged in or in tablet/desktop) */}
          {!inExamMode && !currentUser && (
            <button
              onClick={() => onSelectTab('profile')}
              className="flex items-center gap-2 pl-1.5 pr-3 py-1 text-xs font-semibold text-slate-800 dark:text-slate-100 bg-[#E7BEF8]/25 dark:bg-[#E7BEF8]/15 hover:bg-[#E7BEF8]/40 border border-[#93ABD9]/40 rounded-full transition-colors cursor-pointer"
              title="Buka Profil Pengguna & Ganti Foto"
            >
              <UserAvatar
                name={profile.name}
                avatarUrl={profile.avatarUrl}
                size="sm"
              />
              <span className="truncate max-w-[110px] hidden md:inline">{profile.name || 'Profil'}</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Matikan Suara' : 'Aktifkan Suara'}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={soundEnabled ? 'Suara Aktif' : 'Suara Senyap'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleDarkMode}
            aria-label={darkMode ? 'Mode Terang' : 'Mode Gelap'}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={onToggleFullscreen}
            aria-label={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh CBT'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
