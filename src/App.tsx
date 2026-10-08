/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { Subject, TryoutResult, CandidateProfile } from './data/types';
import { SUBJECTS_DATA } from './data/questions';
import { Navbar } from './components/Navbar';
import { HomeDashboard } from './components/HomeDashboard';
import { ExamScreen } from './components/ExamScreen';
import { ResultScreen } from './components/ResultScreen';
import { UserProfileTab } from './components/UserProfileTab';
import { ScoreStatisticsTab } from './components/ScoreStatisticsTab';
import { PrintScorecard } from './components/PrintScorecard';
import { AuthModal } from './components/AuthModal';
import { sounds } from './utils/audio';
import { 
  subscribeToAuth, 
  syncProfileToFirestore, 
  fetchProfileFromFirestore, 
  syncTryoutResultToFirestore, 
  fetchHistoryFromFirestore, 
  clearAllHistoryFromFirestore 
} from './firebase';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'profile' | 'statistics' | 'exam' | 'result' | 'print'>('home');
  const [examSubjectId, setExamSubjectId] = useState<'mat' | 'ind' | 'eng' | null>(null);
  const [examMode, setExamMode] = useState<'timed' | 'practice'>('timed');
  const [currentResult, setCurrentResult] = useState<TryoutResult | null>(null);

  // Authentication & Cloud Sync State
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Profile state with full schema and migration support
  const [profile, setProfile] = useState<CandidateProfile>(() => {
    const defaultProfile: CandidateProfile = {
      name: 'Sheiza Aprillia',
      highSchool: 'SMAN 8 Jakarta',
      graduationYear: '2025',
      avatarUrl: null,
      ptnType: 'Universitas',
      targetUniv: 'Universitas Indonesia (UI)',
      targetFaculty: 'Fakultas Kedokteran',
      targetMajor: 'Pendidikan Dokter',
      targetScoreTKA: 720,
      targetScoreUTBK: 780,
      passingGradeTKA: 680,
      passingGradeUTBK: 720
    };

    try {
      const saved = localStorage.getItem('tka_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultProfile,
          ...parsed,
          avatarUrl: parsed.avatarUrl !== undefined ? parsed.avatarUrl : defaultProfile.avatarUrl,
          highSchool: parsed.highSchool || defaultProfile.highSchool,
          graduationYear: parsed.graduationYear || defaultProfile.graduationYear,
          ptnType: parsed.ptnType || defaultProfile.ptnType,
          targetFaculty: parsed.targetFaculty || defaultProfile.targetFaculty,
          targetScoreTKA: parsed.targetScoreTKA || defaultProfile.targetScoreTKA,
          targetScoreUTBK: parsed.targetScoreUTBK || defaultProfile.targetScoreUTBK,
          passingGradeTKA: parsed.passingGradeTKA || defaultProfile.passingGradeTKA,
          passingGradeUTBK: parsed.passingGradeUTBK || defaultProfile.passingGradeUTBK
        };
      }
    } catch {
      // fallback
    }
    return defaultProfile;
  });

  // History state with persistence & strict category mode validation
  // Catatan: Matematika Wajib, Bahasa Indonesia, dan Bahasa Inggris adalah TKA
  const [history, setHistory] = useState<TryoutResult[]>(() => {
    try {
      const saved = localStorage.getItem('tka_h');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((item, idx) => {
            const subjectId = item.subjectId || item.s || 'mat';
            // All 3 subjects (mat, ind, eng) are TKA subjects
            const examCategory = ['mat', 'ind', 'eng'].includes(subjectId) ? 'TKA' : (item.examCategory || 'TKA');
            // Strict rule: only treat as 'timed' if explicitly marked 'timed'
            const mode = item.mode === 'timed' ? 'timed' : 'practice';

            if (item.id && item.mode) {
              return {
                ...item,
                examCategory,
                mode: item.mode === 'timed' ? 'timed' : 'practice'
              };
            }

            return {
              id: item.id || 'legacy-' + idx,
              subjectId,
              subjectName: item.subjectName || (subjectId === 'ind' ? 'Bahasa Indonesia' : subjectId === 'eng' ? 'Bahasa Inggris' : 'Matematika Wajib'),
              examCategory,
              mode,
              score: item.score || item.sc || 500,
              category: item.category || item.c || 'Memadai',
              date: item.date || item.d || new Date().toLocaleDateString('id-ID'),
              timestamp: item.timestamp || (Date.now() - idx * 86400000),
              totalQuestions: item.totalQuestions || (item.r ? item.r.length : 25),
              correctCount: item.correctCount || (item.r ? item.r.filter((r: unknown[]) => r[0] === 1).length : 15),
              partialCount: item.partialCount || 0,
              wrongCount: item.wrongCount || (item.r ? item.r.filter((r: unknown[]) => r[0] !== 1).length : 10),
              answers: item.answers || {},
              flagged: item.flagged || {},
              evaluations: item.evaluations || (item.r ? item.r.map((r: unknown[]) => ({
                isFullyCorrect: r[0] === 1,
                creditScore: r[0] === 1 ? 1 : 0,
                keyDisplay: String(r[1]),
                userDisplay: String(r[2]),
                topic: String(r[3] || 'Umum')
              })) : []),
              timeSpentSeconds: item.timeSpentSeconds || 3600,
              candidateName: item.candidateName || 'Peserta'
            };
          });
        }
      }
    } catch {
      // fallback
    }
    return [];
  });

  // Dark mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tka_dark');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sound toggle
  const [soundEnabled, setSoundEnabled] = useState<boolean>(sounds.isEnabled());

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Subscribe to Firebase Auth and synchronize data across devices
  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (user) => {
      setCurrentUser(user);
      if (user) {
        setIsSyncing(true);
        try {
          // 1. Fetch cloud profile
          const remoteProfile = await fetchProfileFromFirestore(user.uid);
          if (remoteProfile) {
            setProfile(prev => {
              const merged: CandidateProfile = {
                ...prev,
                ...remoteProfile,
                name: remoteProfile.name || user.displayName || prev.name,
                avatarUrl: remoteProfile.avatarUrl !== undefined ? remoteProfile.avatarUrl : (user.photoURL || prev.avatarUrl)
              };
              try {
                localStorage.setItem('tka_profile', JSON.stringify(merged));
              } catch {}
              return merged;
            });
          } else {
            // First time login: sync current local profile to cloud
            const initialSync: CandidateProfile = {
              ...profile,
              name: profile.name === 'Sheiza Aprillia' && user.displayName ? user.displayName : profile.name,
              avatarUrl: profile.avatarUrl || user.photoURL || null
            };
            setProfile(initialSync);
            await syncProfileToFirestore(user.uid, initialSync);
          }

          // 2. Fetch cloud history
          const remoteHistory = await fetchHistoryFromFirestore(user.uid);
          if (remoteHistory && remoteHistory.length > 0) {
            setHistory(prev => {
              // Combine remote and existing local items without duplicate IDs
              const map = new Map<string, TryoutResult>();
              remoteHistory.forEach(r => map.set(r.id, r));
              prev.forEach(p => {
                if (!map.has(p.id)) {
                  map.set(p.id, p);
                  // Push local-only item up to Firestore
                  syncTryoutResultToFirestore(user.uid, p).catch(console.error);
                }
              });
              const merged = Array.from(map.values()).sort((a, b) => b.timestamp - a.timestamp);
              try {
                localStorage.setItem('tka_h', JSON.stringify(merged));
              } catch {}
              return merged;
            });
          } else if (history.length > 0) {
            // Push existing local history to Firestore
            for (const item of history) {
              await syncTryoutResultToFirestore(user.uid, item);
            }
          }
        } catch (err) {
          console.error('Error during initial cloud sync:', err);
        } finally {
          setIsSyncing(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('tka_dark', String(darkMode));
    } catch {
      // storage quota fallback
    }
  }, [darkMode]);

  const handleToggleSound = () => {
    const nextState = sounds.toggleSound();
    setSoundEnabled(nextState);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const handleStartExam = (subjectId: 'mat' | 'ind' | 'eng', mode: 'timed' | 'practice' = 'timed') => {
    setExamSubjectId(subjectId);
    setExamMode(mode);
    setCurrentTab('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveProfile = async (newProfile: CandidateProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem('tka_profile', JSON.stringify(newProfile));
    } catch {
      // storage quota fallback
    }
    // Sync to cloud if user is logged in
    if (currentUser) {
      try {
        setIsSyncing(true);
        await syncProfileToFirestore(currentUser.uid, newProfile);
      } catch (err) {
        console.error('Failed to sync profile to cloud:', err);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  const handleSubmitExam = async (result: TryoutResult) => {
    // Ensure all 3 subjects (mat, ind, eng) have examCategory: 'TKA'
    const finalResult: TryoutResult = {
      ...result,
      examCategory: ['mat', 'ind', 'eng'].includes(result.subjectId) ? 'TKA' : result.examCategory
    };
    const updatedHistory = [finalResult, ...history];
    setHistory(updatedHistory);
    try {
      localStorage.setItem('tka_h', JSON.stringify(updatedHistory));
    } catch {
      // storage quota fallback
    }
    setCurrentResult(finalResult);
    setCurrentTab('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Sync to cloud if user is logged in
    if (currentUser) {
      try {
        setIsSyncing(true);
        await syncTryoutResultToFirestore(currentUser.uid, finalResult);
      } catch (err) {
        console.error('Failed to sync tryout result to cloud:', err);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  const handleViewResult = (result: TryoutResult) => {
    setCurrentResult(result);
    setCurrentTab('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = async () => {
    setHistory([]);
    try {
      localStorage.removeItem('tka_h');
    } catch {
      // ignore
    }
    if (currentUser) {
      try {
        await clearAllHistoryFromFirestore(currentUser.uid);
      } catch (err) {
        console.error('Failed to clear cloud history:', err);
      }
    }
  };

  const handleClearCategoryHistory = (category: 'TKA' | 'UTBK') => {
    const updated = history.filter(h => {
      const isTka = h.examCategory === 'TKA' || ['mat', 'ind', 'eng'].includes(h.subjectId);
      return category === 'TKA' ? !isTka : isTka;
    });
    setHistory(updated);
    try {
      localStorage.setItem('tka_h', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      {/* Navbar (hidden in exam mode or print mode) */}
      {currentTab !== 'print' && (
        <Navbar
          currentTab={currentTab}
          onSelectTab={tab => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          profile={profile}
          inExamMode={currentTab === 'exam'}
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          isSyncing={isSyncing}
        />
      )}

      {/* Main Views */}
      <div className="flex-1">
        {currentTab === 'home' && (
          <HomeDashboard
            onStartExam={handleStartExam}
            history={history}
            onViewResult={handleViewResult}
            profile={profile}
            onNavigateTab={tab => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'profile' && (
          <UserProfileTab
            profile={profile}
            onSaveProfile={handleSaveProfile}
            history={history}
            currentUser={currentUser}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            isSyncing={isSyncing}
          />
        )}

        {currentTab === 'statistics' && (
          <ScoreStatisticsTab
            history={history}
            profile={profile}
            onViewResult={handleViewResult}
            onClearHistory={handleClearHistory}
            onClearCategoryHistory={handleClearCategoryHistory}
            onStartExam={subId => handleStartExam(subId, 'timed')}
          />
        )}

        {currentTab === 'exam' && examSubjectId && (
          <ExamScreen
            subject={SUBJECTS_DATA[examSubjectId]}
            mode={examMode}
            profile={profile}
            isFullscreen={isFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            onSubmitExam={handleSubmitExam}
            onExitExam={() => {
              setExamSubjectId(null);
              setCurrentTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'result' && currentResult && (
          <ResultScreen
            result={currentResult}
            profile={profile}
            onRetake={subId => handleStartExam(subId, 'timed')}
            onGoHome={() => setCurrentTab('home')}
            onPrint={() => setCurrentTab('print')}
          />
        )}

        {currentTab === 'print' && currentResult && (
          <PrintScorecard
            result={currentResult}
            profile={profile}
            onClose={() => setCurrentTab('result')}
          />
        )}
      </div>

      {/* Footer (hidden in exam mode & print mode) */}
      {currentTab !== 'exam' && currentTab !== 'print' && (
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 px-4 sm:px-6 transition-colors">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div>
              <b>My Tryout</b> · Sistem Pengukuran Kelayakan Menuju PTN
            </div>
            <div className="flex items-center gap-4">
              <span>Rumpun TKA & UTBK</span>
              <span aria-hidden="true">·</span>
              <span>Skala IRT 200–800</span>
              <span aria-hidden="true">·</span>
              <span>Predikat Istimewa ≥ 725,00</span>
            </div>
          </div>
        </footer>
      )}

      {/* Cross-Device Cloud Sync Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onAuthSuccess={user => {
          console.log('Successfully authenticated as:', user.email);
        }}
      />
    </div>
  );
}
