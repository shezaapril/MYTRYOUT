import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Grid, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  AlertTriangle, 
  Maximize2, 
  Minimize2, 
  Check, 
  Volume2, 
  VolumeX, 
  Type, 
  BookOpen, 
  Info, 
  CheckCircle2,
  XCircle,
  ZoomIn,
  X
} from 'lucide-react';
import { Subject, Question, UserAnswer, TryoutResult, CandidateProfile } from '../data/types';
import { LETTERS, formatTime, calculateCredit, calculateIRTScore, getCategory, formatAnswerKey, formatUserAnswer } from '../utils/scoring';
import { getQuestionPassage } from '../data/questions';
import { sounds } from '../utils/audio';

interface ExamScreenProps {
  subject: Subject;
  mode: 'timed' | 'practice';
  profile: CandidateProfile;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onSubmitExam: (result: TryoutResult) => void;
  onExitExam: () => void;
}

export const ExamScreen: React.FC<ExamScreenProps> = ({
  subject,
  mode,
  profile,
  isFullscreen,
  onToggleFullscreen,
  soundEnabled,
  onToggleSound,
  onSubmitExam,
  onExitExam
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, UserAnswer>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [showNavigator, setShowNavigator] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showCancelPracticeModal, setShowCancelPracticeModal] = useState<boolean>(false);
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(
    mode === 'timed' ? subject.durationMinutes * 60 : 0
  );
  const [timeSpent, setTimeSpent] = useState<number>(0);

  const initialTotalSeconds = subject.durationMinutes * 60;
  const isTimeWarning = mode === 'timed' && timeRemaining <= 300 && timeRemaining > 0; // <= 5 mins
  const isTimeCritical = mode === 'timed' && timeRemaining <= 60 && timeRemaining > 0; // <= 1 min

  const currentQuestion = subject.questions[currentIndex];

  // Timer interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);

      if (mode === 'timed') {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            sounds.playWarning();
            handleFinalSubmit();
            return 0;
          }
          if (prev === 300 || prev === 60) {
            sounds.playWarning();
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [mode]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input or modal is open
      if (showSubmitModal) return;

      if (e.key === 'ArrowRight' && currentIndex < subject.questions.length - 1) {
        goToQuestion(currentIndex + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        goToQuestion(currentIndex - 1);
      } else if (e.key.toLowerCase() === 'r') {
        toggleFlag();
      } else if (currentQuestion.type === 's') {
        const keyUpper = e.key.toUpperCase();
        const letterIdx = LETTERS.indexOf(keyUpper);
        if (letterIdx >= 0 && letterIdx < currentQuestion.options.length) {
          handleSelectOption(letterIdx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQuestion, answers, flagged, showSubmitModal]);

  const goToQuestion = (index: number) => {
    sounds.playNavigate();
    setCurrentIndex(Math.max(0, Math.min(subject.questions.length - 1, index)));
    setShowNavigator(false);
  };

  const handleSelectOption = (optionIndex: number) => {
    sounds.playSelect();
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handleMultiSelectOption = (optionIndex: number) => {
    sounds.playSelect();
    const current = (answers[currentIndex] as number[]) || [];
    let updated: number[];
    if (current.includes(optionIndex)) {
      updated = current.filter(idx => idx !== optionIndex);
    } else {
      updated = [...current, optionIndex].sort((a, b) => a - b);
    }
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: updated.length > 0 ? updated : null
    }));
  };

  const handleTrueFalseSelect = (statementIndex: number, val: number) => {
    sounds.playSelect();
    const q = currentQuestion as { statements: string[] };
    const current = (answers[currentIndex] as number[]) || q.statements.map(() => -1);
    const updated = [...current];
    updated[statementIndex] = val;
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: updated
    }));
  };

  const toggleFlag = () => {
    sounds.playFlag();
    setFlagged(prev => ({
      ...prev,
      [currentIndex]: !prev[currentIndex]
    }));
  };

  const getQuestionStatus = (idx: number) => {
    const isAnswered = answers[idx] !== undefined && answers[idx] !== null;
    const isFlag = !!flagged[idx];
    if (isFlag) return 'flagged';
    if (isAnswered) return 'answered';
    return 'unanswered';
  };

  const answeredCount = Object.values(answers).filter(v => v !== null && v !== undefined).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;
  const unansweredCount = subject.questions.length - answeredCount;

  const handleFinalSubmit = () => {
    sounds.playComplete();
    const credits = subject.questions.map((q, idx) => calculateCredit(q, answers[idx]));
    const score = calculateIRTScore(subject.questions.length, credits, subject.category);
    const category = getCategory(score, subject.category);

    const fullCorrectCount = credits.filter(c => c === 1).length;
    const partialCount = credits.filter(c => c > 0 && c < 1).length;
    const wrongCount = credits.filter(c => c === 0).length;

    const evaluations = subject.questions.map((q, idx) => ({
      isFullyCorrect: credits[idx] === 1,
      creditScore: credits[idx],
      keyDisplay: formatAnswerKey(q),
      userDisplay: formatUserAnswer(q, answers[idx]),
      topic: q.topic,
      flagged: !!flagged[idx]
    }));

    const result: TryoutResult = {
      id: 'res-' + Date.now(),
      subjectId: subject.id,
      subjectName: subject.name,
      examCategory: subject.category,
      mode,
      score,
      category,
      date: new Date().toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      timestamp: Date.now(),
      totalQuestions: subject.questions.length,
      correctCount: fullCorrectCount,
      partialCount,
      wrongCount,
      answers,
      flagged,
      evaluations,
      timeSpentSeconds: timeSpent,
      candidateName: profile.name || 'Peserta'
    };

    onSubmitExam(result);
  };

  // Font size class mapping
  const getTextSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-base';
      case 'xlarge':
        return 'text-lg';
      default:
        return 'text-sm sm:text-base';
    }
  };

  const questionPassage = getQuestionPassage(currentQuestion, subject);
  const passageContent = questionPassage ? questionPassage.text : null;
  const passageTitle = questionPassage ? questionPassage.title : (currentQuestion.passageIndex !== undefined ? `Wacana ${currentQuestion.passageIndex + 1}` : null);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col justify-between selection:bg-[#E7BEF8] selection:text-slate-900">
      {/* CBT Sticky Header */}
      <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-900 dark:text-white text-base">
              {subject.name}
            </span>
            <span className="hidden sm:inline text-xs text-slate-400">·</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
              Soal {currentIndex + 1} dari {subject.questions.length}
            </span>
          </div>

          {/* Center: Countdown Timer */}
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono font-bold text-sm sm:text-base transition-colors ${
                mode === 'practice'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  : isTimeCritical
                  ? 'bg-red-500 text-white animate-pulse'
                  : isTimeWarning
                  ? 'bg-[#EDE986]/30 text-amber-800 dark:text-[#EDE986] border border-[#EDE986]'
                  : 'bg-[#93ABD9]/15 dark:bg-[#93ABD9]/20 text-[#4c679e] dark:text-[#93ABD9] border border-[#93ABD9]/40'
              }`}
            >
              <Clock className="w-4 h-4 shrink-0" />
              <span>
                {mode === 'timed' ? formatTime(timeRemaining) : `Latihan: ${formatTime(timeSpent)}`}
              </span>
            </div>
          </div>

          {/* Right: Quick Tools */}
          <div className="flex items-center gap-2">
            {/* Font Size Selector */}
            <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 text-xs font-bold rounded ${
                  fontSize === 'normal' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
                }`}
                title="Ukuran Font Normal"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 text-sm font-bold rounded ${
                  fontSize === 'large' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
                }`}
                title="Ukuran Font Sedang"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 text-base font-bold rounded ${
                  fontSize === 'xlarge' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
                }`}
                title="Ukuran Font Besar"
              >
                A++
              </button>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={onToggleSound}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title={soundEnabled ? 'Suara Aktif' : 'Suara Senyap'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Fullscreen */}
            <button
              onClick={onToggleFullscreen}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Cancel Practice Button (Practice Mode only) */}
            {mode === 'practice' && (
              <button
                type="button"
                onClick={() => setShowCancelPracticeModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                title="Batalkan latihan bebas (tidak akan masuk riwayat)"
              >
                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                <span className="hidden sm:inline">Batalkan Latihan</span>
                <span className="sm:hidden">Batal</span>
              </button>
            )}

            {/* Question Matrix Drawer Toggle */}
            <button
              onClick={() => setShowNavigator(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xs"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Daftar Soal</span>
              <span className="ml-1 text-[11px] opacity-80 font-mono">
                ({answeredCount}/{subject.questions.length})
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Examination Workspace */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1">
        <div className={`grid gap-6 ${passageContent ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
          {/* Left: Reading Passage (Desktop/Large Screen) */}
          {passageContent && (
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col max-h-[70vh] lg:max-h-[calc(100vh-180px)] overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  <BookOpen className="w-4 h-4 text-[#93ABD9] shrink-0" />
                  <span className="truncate">{passageTitle || 'Wacana / Teks Bacaan'}</span>
                </div>
                <span className="text-[11px] text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 font-semibold px-2 py-0.5 rounded shrink-0">
                  Teks Terkait
                </span>
              </div>
              <div className={`mt-4 overflow-y-auto pr-2 text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap ${getTextSizeClass()}`}>
                {passageContent}
              </div>
            </div>
          )}

          {/* Right: Question & Options */}
          <div className={`${passageContent ? 'lg:col-span-7' : 'w-full'} bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between`}>
            <div>
              {/* Question Header Meta */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-base">
                    Nomor {currentIndex + 1}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {currentQuestion.topic}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {flagged[currentIndex] && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-md">
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                      Ragu-ragu
                    </span>
                  )}
                  <span className="text-xs text-slate-400 font-mono">
                    Tipe: {currentQuestion.type === 's' ? 'Pilihan Ganda' : currentQuestion.type === 'tf' ? 'Benar / Salah' : 'Pilihan Majemuk'}
                  </span>
                </div>
              </div>

              {/* Teks Bacaan Banner / Mobile Inline Reading Box */}
              {passageContent && (
                <div className="mt-4 p-3.5 bg-indigo-50/75 dark:bg-indigo-950/30 rounded-xl border border-indigo-200/80 dark:border-indigo-900/60">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-indigo-950 dark:text-indigo-200 truncate">
                      <BookOpen className="w-4 h-4 text-[#93ABD9] shrink-0" />
                      <span className="truncate">Wacana: <b className="font-bold">{passageTitle}</b></span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/60 px-2 py-0.5 rounded shrink-0">
                      Teks Literasi
                    </span>
                  </div>

                  {/* On Mobile/Tablet screens, embed the full reading passage right above the question */}
                  <div className="lg:hidden mt-3 pt-3 border-t border-indigo-200/60 dark:border-indigo-900/40 text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto pr-1">
                    {passageContent}
                  </div>
                </div>
              )}

              {/* Question Text */}
              <div className={`mt-5 text-slate-900 dark:text-white font-medium leading-relaxed ${getTextSizeClass()}`}>
                <p className="whitespace-pre-line">{currentQuestion.prompt}</p>
              </div>

              {/* Question Image if provided */}
              {currentQuestion.image && (
                <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center">
                  <div 
                    onClick={() => setZoomedImage({ src: currentQuestion.image!, alt: currentQuestion.imageAlt || `Gambar Soal Nomor ${currentIndex + 1}` })}
                    className="relative cursor-zoom-in group max-w-full rounded-lg overflow-hidden flex flex-col items-center"
                    title="Klik gambar untuk memperbesar"
                  >
                    <img
                      src={currentQuestion.image}
                      alt={currentQuestion.imageAlt || `Gambar Soal Nomor ${currentIndex + 1}`}
                      className="max-h-80 sm:max-h-96 w-auto max-w-full object-contain rounded-lg shadow-xs group-hover:opacity-95 transition-all"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 bg-slate-900/80 hover:bg-slate-900 text-white text-[11px] font-medium rounded-lg shadow-sm flex items-center gap-1 backdrop-blur-xs transition-opacity opacity-90 group-hover:opacity-100">
                      <ZoomIn className="w-3.5 h-3.5 text-[#EDE986]" />
                      <span>Klik untuk Perbesar</span>
                    </div>
                  </div>
                  {currentQuestion.imageAlt && (
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center italic">
                      {currentQuestion.imageAlt}
                    </span>
                  )}
                </div>
              )}

              {/* Question SVG Diagram if provided */}
              {currentQuestion.diagramSvg && (
                <div 
                  className="mt-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: currentQuestion.diagramSvg }}
                />
              )}

              {/* Options Section */}
              <div className="mt-6 space-y-3">
                {/* 1. Single Choice ('s') */}
                {currentQuestion.type === 's' && (
                  <div className="space-y-2.5">
                    {currentQuestion.options.map((opt, optIdx) => {
                      const isSelected = answers[currentIndex] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(optIdx)}
                          className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer group ${
                            isSelected
                              ? 'border-[#F2619C] bg-[#F2619C]/10 dark:bg-[#F2619C]/15 dark:border-[#F2619C] shadow-xs'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? 'bg-[#F2619C] text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                            }`}
                          >
                            {LETTERS[optIdx]}
                          </span>
                          <span className={`pt-0.5 text-slate-800 dark:text-slate-200 ${getTextSizeClass()}`}>
                            {opt}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 2. True / False Matrix ('tf') */}
                {currentQuestion.type === 'tf' && (
                  <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-xl">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 font-semibold">
                          <th className="p-3.5 sm:p-4">Pernyataan</th>
                          <th className="p-3.5 sm:p-4 w-28 text-center">Benar</th>
                          <th className="p-3.5 sm:p-4 w-28 text-center">Salah</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {currentQuestion.statements.map((stmt, sIdx) => {
                          const currentAnswers = (answers[currentIndex] as number[]) || [];
                          const isTrue = currentAnswers[sIdx] === 1;
                          const isFalse = currentAnswers[sIdx] === 0;

                          return (
                            <tr key={sIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                              <td className={`p-3.5 sm:p-4 text-slate-800 dark:text-slate-200 leading-normal ${getTextSizeClass()}`}>
                                {stmt}
                              </td>
                              <td className="p-3 text-center">
                                <button
                                  onClick={() => handleTrueFalseSelect(sIdx, 1)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    isTrue
                                      ? 'bg-emerald-600 text-white shadow-xs'
                                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                                  }`}
                                >
                                  Benar
                                </button>
                              </td>
                              <td className="p-3 text-center">
                                <button
                                  onClick={() => handleTrueFalseSelect(sIdx, 0)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    isFalse
                                      ? 'bg-red-600 text-white shadow-xs'
                                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                                  }`}
                                >
                                  Salah
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 3. Multi-Select ('m') */}
                {currentQuestion.type === 'm' && (
                  <div className="space-y-2.5">
                    <div className="text-xs text-[#F2619C] font-semibold mb-2">
                      💡 Pilih semua opsi yang menurut Anda benar (bisa lebih dari satu jawaban)
                    </div>
                    {currentQuestion.options.map((opt, optIdx) => {
                      const userSelected = (answers[currentIndex] as number[]) || [];
                      const isSelected = userSelected.includes(optIdx);

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleMultiSelectOption(optIdx)}
                          className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer group ${
                            isSelected
                              ? 'border-[#F2619C] bg-[#F2619C]/10 dark:bg-[#F2619C]/15 dark:border-[#F2619C] shadow-xs'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                              isSelected
                                ? 'bg-[#F2619C] border-[#F2619C] text-white'
                                : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-transparent'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs font-bold text-slate-500 mr-2 font-mono">
                              {LETTERS[optIdx]}.
                            </span>
                            <span className={`text-slate-800 dark:text-slate-200 ${getTextSizeClass()}`}>
                              {opt}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions for current question */}
            <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToQuestion(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                <button
                  onClick={toggleFlag}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-1.5 cursor-pointer ${
                    flagged[currentIndex]
                      ? 'bg-[#EDE986] text-slate-950 border-[#EDE986] font-bold shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${flagged[currentIndex] ? 'fill-current' : ''}`} />
                  <span>{flagged[currentIndex] ? 'Hapus Ragu-ragu' : 'Ragu-ragu'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {currentIndex < subject.questions.length - 1 ? (
                  <button
                    onClick={() => goToQuestion(currentIndex + 1)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#F2619C] hover:bg-[#d84581] text-white transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSubmitModal(true)}
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-[#F2619C] hover:bg-[#d84581] text-white transition-colors flex items-center gap-1 shadow-md cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Selesai & Kumpulkan</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CBT Bottom Bar Status */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>{answeredCount} Terjawab</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>{flaggedCount} Ragu-ragu</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span>{unansweredCount} Kosong</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {mode === 'practice' ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowCancelPracticeModal(true)}
                  className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Batalkan Latihan (Tanpa Simpan Riwayat)</span>
                </button>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(true)}
                  className="text-xs font-semibold text-[#F2619C] hover:underline cursor-pointer"
                >
                  Selesai & Kumpulkan Latihan
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowSubmitModal(true)}
                className="text-xs font-semibold text-[#F2619C] hover:underline cursor-pointer"
              >
                Akhiri Tryout Lebih Awal
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Modal: Daftar Soal / Matrix Navigator */}
      {showNavigator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Daftar Nomor Soal {subject.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Klik nomor untuk langsung berpindah ke soal tersebut
                </p>
              </div>
              <button
                onClick={() => setShowNavigator(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-semibold p-1"
              >
                Tutup ✕
              </button>
            </div>

            {/* Grid of question buttons */}
            <div className="mt-5 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2.5 max-h-[50vh] overflow-y-auto p-1">
              {subject.questions.map((_, idx) => {
                const status = getQuestionStatus(idx);
                const isCurrent = idx === currentIndex;

                return (
                  <button
                    key={idx}
                    onClick={() => goToQuestion(idx)}
                    className={`h-11 rounded-xl text-xs font-bold font-mono transition-all relative flex items-center justify-center cursor-pointer ${
                      isCurrent
                        ? 'ring-2 ring-[#F2619C] ring-offset-2 dark:ring-offset-slate-900'
                        : ''
                    } ${
                      status === 'flagged'
                        ? 'bg-[#EDE986] text-slate-950 font-black shadow-xs'
                        : status === 'answered'
                        ? 'bg-[#93ABD9] text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {status === 'flagged' && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-slate-950" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend & Summary */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#93ABD9]" />
                  <span>Dijawab ({answeredCount})</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#EDE986]" />
                  <span>Ragu-ragu ({flaggedCount})</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700" />
                  <span>Belum ({unansweredCount})</span>
                </span>
              </div>

              <button
                onClick={() => {
                  setShowNavigator(false);
                  setShowSubmitModal(true);
                }}
                className="px-4 py-2 bg-[#F2619C] hover:bg-[#d84581] text-white rounded-xl font-bold transition-colors cursor-pointer shadow-xs"
              >
                Kumpulkan Ujian
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Confirm Submit */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-[#EDE986]/30 text-amber-700 dark:text-[#EDE986] flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Konfirmasi Kumpulkan Ujian
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Pastikan Anda telah memeriksa kembali seluruh jawaban sebelum mengakhiri sesi.
            </p>

            {/* Status breakdown card */}
            <div className="my-5 p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Total Soal:</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{subject.questions.length}</span>
              </div>
              <div className="flex justify-between text-[#6888c6] dark:text-[#93ABD9]">
                <span>Sudah Dijawab:</span>
                <span className="font-bold font-mono">{answeredCount}</span>
              </div>
              <div className="flex justify-between text-[#7d7715] dark:text-[#EDE986]">
                <span>Ditandai Ragu-ragu:</span>
                <span className="font-bold font-mono">{flaggedCount}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Belum Dijawab:</span>
                <span className="font-bold font-mono">{unansweredCount}</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <div className="mb-5 p-3 bg-[#EDE986]/25 border border-[#EDE986] rounded-xl text-xs text-slate-900 dark:text-slate-100">
                ⚠️ Masih ada <b>{unansweredCount} soal</b> yang belum diisi. Soal kosong tidak akan mendapatkan poin penilaian IRT.
              </div>
            )}

            {mode === 'practice' && (
              <div className="mb-5 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-xl flex items-center justify-between text-xs">
                <span className="text-rose-700 dark:text-rose-300">
                  Ingin batalkan tanpa menyimpan ke riwayat?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setShowSubmitModal(false);
                    setShowCancelPracticeModal(true);
                  }}
                  className="font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer ml-2"
                >
                  Batalkan Latihan
                </button>
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Lanjutkan Mengerjakan
              </button>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  handleFinalSubmit();
                }}
                className="px-4 py-2.5 text-xs font-bold text-white bg-[#F2619C] hover:bg-[#d84581] rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                Ya, Kumpulkan Jawaban
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Konfirmasi Batalkan Latihan Bebas (Tidak Masuk Riwayat/Historis) */}
      {showCancelPracticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
              <XCircle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Batalkan Sesi Latihan Bebas?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Sesi latihan ini akan dihentikan sekarang. Seluruh jawaban dan progres latihan ini <b>TIDAK AKAN DISIMPAN</b> ke dalam riwayat ujian (historis) maupun statistik skor TKA Anda.
            </p>

            <div className="my-4 p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs space-y-2">
              <div className="flex justify-between text-slate-500">
                <span>Mata Pelajaran:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{subject.name}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Progres Pengerjaan:</span>
                <span className="font-semibold text-slate-900 dark:text-white font-mono">{answeredCount} dari {subject.questions.length} dijawab</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Durasi Berjalan:</span>
                <span className="font-semibold text-slate-900 dark:text-white font-mono">{formatTime(timeSpent)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowCancelPracticeModal(false)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Lanjutkan Latihan
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCancelPracticeModal(false);
                  onExitExam();
                }}
                className="px-4 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                Ya, Batalkan & Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox / Zoomed Image Modal */}
      {zoomedImage && (
        <div 
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-150 cursor-zoom-out"
        >
          <div 
            onClick={e => e.stopPropagation()} 
            className="relative max-w-5xl max-h-[92vh] w-full bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col items-center overflow-hidden border border-slate-200 dark:border-slate-800 cursor-default"
          >
            <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate pr-4">
                {zoomedImage.alt}
              </span>
              <button
                type="button"
                onClick={() => setZoomedImage(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Tutup (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto max-h-[76vh] w-full flex items-center justify-center p-2 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-100 dark:border-slate-800/80">
              <img
                src={zoomedImage.src}
                alt={zoomedImage.alt}
                className="max-h-[72vh] max-w-full w-auto object-contain rounded-lg shadow-sm"
              />
            </div>
            <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 text-center">
              Klik di luar gambar atau tombol silang di kanan atas untuk menutup
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
