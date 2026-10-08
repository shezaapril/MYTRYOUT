import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  TrendingUp, 
  Clock, 
  Printer, 
  RotateCcw, 
  Home, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  BookOpen, 
  Lightbulb,
  Check,
  Target,
  ZoomIn,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TryoutResult, Question, CandidateProfile } from '../data/types';
import { SUBJECTS_DATA, getQuestionPassage } from '../data/questions';
import { estimatePercentile, formatTime } from '../utils/scoring';

interface ResultScreenProps {
  result: TryoutResult;
  profile: CandidateProfile;
  onRetake: (subjectId: 'mat' | 'ind' | 'eng') => void;
  onGoHome: () => void;
  onPrint: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  profile,
  onRetake,
  onGoHome,
  onPrint
}) => {
  const [filterType, setFilterType] = useState<'all' | 'correct' | 'wrong' | 'flagged'>('all');
  const [expandedExplanation, setExpandedExplanation] = useState<Record<number, boolean>>({});
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null);

  const subject = SUBJECTS_DATA[result.subjectId];
  const percentile = estimatePercentile(result.score, result.examCategory);
  const isHighScorer = result.examCategory === 'UTBK' ? result.score >= 700 : result.score >= 641;
  const isIstimewa = result.examCategory === 'UTBK' ? result.score >= 800.0 : result.score >= 725.0;

  // Trigger celebration confetti on mount for high scores
  useEffect(() => {
    if (isHighScorer) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // canvas-confetti error fallback
      }
    }
  }, [isHighScorer]);

  // Topic performance calculation
  const topicStats: Record<string, { total: number; correct: number; points: number }> = {};
  result.evaluations.forEach((ev, idx) => {
    const t = ev.topic || 'Umum';
    if (!topicStats[t]) {
      topicStats[t] = { total: 0, correct: 0, points: 0 };
    }
    topicStats[t].total += 1;
    topicStats[t].points += ev.creditScore;
    if (ev.isFullyCorrect) {
      topicStats[t].correct += 1;
    }
  });

  const weakTopics = Object.entries(topicStats)
    .filter(([_, stats]) => stats.points / stats.total < 0.6)
    .sort((a, b) => (a[1].points / a[1].total) - (b[1].points / b[1].total));

  const toggleExplanation = (idx: number) => {
    setExpandedExplanation(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const expandAll = () => {
    const allExp: Record<number, boolean> = {};
    result.evaluations.forEach((_, idx) => {
      allExp[idx] = true;
    });
    setExpandedExplanation(allExp);
  };

  const collapseAll = () => {
    setExpandedExplanation({});
  };

  // Filter questions for the review list
  const filteredIndices = subject.questions
    .map((_, idx) => idx)
    .filter(idx => {
      const ev = result.evaluations[idx];
      if (filterType === 'correct') return ev.isFullyCorrect;
      if (filterType === 'wrong') return !ev.isFullyCorrect;
      if (filterType === 'flagged') return !!ev.flagged;
      return true;
    });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F2619C]">
            Hasil & Evaluasi Resmi CBT
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {result.subjectName}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Peserta: <b className="text-slate-700 dark:text-slate-200">{result.candidateName || profile.name}</b> · Tanggal Selesai: {result.date}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrint}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Rapor</span>
          </button>
          <button
            onClick={() => onRetake(result.subjectId)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-[#F2619C] hover:bg-[#d84581] rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Ujian</span>
          </button>
          <button
            onClick={onGoHome}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Beranda</span>
          </button>
        </div>
      </div>

      {/* Hero Score Showcase Card */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Main Score Number */}
          <div className="md:col-span-5 text-center md:text-left space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Skor Item Response Theory (IRT)
            </span>
            <div className="flex items-baseline justify-center md:justify-start gap-3">
              <span className="text-5xl sm:text-6xl font-black font-mono text-[#F2619C]">
                {result.score.toFixed(2)}
              </span>
              <span className="text-xs font-mono text-slate-400">
                / {result.examCategory === 'UTBK' ? '1000' : '800'}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-lg ${
                  result.category === 'Baik'
                    ? 'bg-[#EDE986]/30 text-[#7d7715] dark:text-[#EDE986] border border-[#EDE986]'
                    : result.category === 'Memadai'
                    ? 'bg-[#93ABD9]/20 text-[#506da3] dark:text-[#93ABD9]'
                    : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                }`}
              >
                Kategori {result.category}
              </span>

              <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                Estimasi Persentil {percentile}%
              </span>

              <span className="text-[11px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                {result.mode === 'timed' ? 'Sesi Try Out Resmi' : 'Sesi Latihan Bebas'}
              </span>
            </div>

            {isIstimewa && (
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200 bg-[#EDE986] px-3 py-1.5 rounded-xl shadow-xs">
                  🏆 Predikat Istimewa (≥ {result.examCategory === 'UTBK' ? '800,00' : '725,00'})
                </span>
              </div>
            )}
          </div>

          {/* Detailed Statistics Metrics */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
              <div className="text-xs text-slate-400 font-medium">Benar Penuh</div>
              <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                {result.correctCount}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">dari {result.totalQuestions} soal</div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
              <div className="text-xs text-slate-400 font-medium">Benar Parsial</div>
              <div className="text-2xl font-bold font-mono text-[#7d7715] dark:text-[#EDE986] mt-1">
                {result.partialCount}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">tipe B/S & majemuk</div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
              <div className="text-xs text-slate-400 font-medium">Salah / Kosong</div>
              <div className="text-2xl font-bold font-mono text-rose-600 dark:text-rose-400 mt-1">
                {result.wrongCount}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">tanpa poin</div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
              <div className="text-xs text-slate-400 font-medium">Waktu Selesai</div>
              <div className="text-lg font-bold font-mono text-slate-700 dark:text-slate-300 mt-1">
                {formatTime(result.timeSpentSeconds)}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">menit : detik</div>
            </div>
          </div>
        </div>
      </section>

      {/* Target PTN Benchmark Comparison */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-[#93ABD9]" />
              <span>Pengukuran Kelayakan Target Masuk PTN</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Evaluasi skor {result.score.toFixed(2)} pada jalur {result.examCategory} terhadap target dan passing grade Anda
            </p>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Target {profile.ptnType}: <b className="text-slate-800 dark:text-white">{profile.targetUniv}</b>
          </div>
        </div>

        {(() => {
          const isTKA = result.examCategory === 'TKA';
          const relevantTarget = isTKA ? profile.targetScoreTKA : profile.targetScoreUTBK;
          const relevantPassing = isTKA ? profile.passingGradeTKA : profile.passingGradeUTBK;
          const diffTarget = Math.round((result.score - relevantTarget) * 100) / 100;
          const diffPassing = Math.round((result.score - relevantPassing) * 100) / 100;
          const isAboveTarget = diffTarget >= 0;
          const isAbovePassing = diffPassing >= 0;

          return (
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                <div className="text-[11px] text-slate-400 font-semibold uppercase">Jurusan & Fakultas</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{profile.targetMajor}</div>
                <div className="text-xs text-slate-500">{profile.targetFaculty} ({profile.targetUniv})</div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Passing Grade ({result.examCategory}):</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">{relevantPassing}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Target Skor ({result.examCategory}):</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">{relevantTarget}</span>
                </div>
                <div className="pt-1 flex justify-between text-xs border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500">Skor Ujian Anda:</span>
                  <span className="font-bold font-mono text-[#F2619C]">{result.score.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-4 bg-[#93ABD9]/10 dark:bg-[#93ABD9]/15 border border-[#93ABD9]/30 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-[#5573ab] dark:text-[#93ABD9] font-semibold uppercase">Status Kelayakan</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    {isAboveTarget ? '✓ Sangat Layak (Lolos Target)' : isAbovePassing ? '✓ Layak (Lolos Passing Grade)' : '⚡ Perlu Peningkatan'}
                  </div>
                </div>
                <div className="text-xs font-mono mt-2 text-[#5573ab] dark:text-[#93ABD9]">
                  {isAbovePassing ? `+${diffPassing} poin di atas passing grade` : `${diffPassing} poin dari passing grade`}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Topic Mastery & Study Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Topic Breakdown */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Penguasaan Berdasarkan Topik
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Rincian persentase perolehan poin tiap submateri
          </p>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {Object.entries(topicStats).map(([topic, stats]) => {
              const pct = Math.round((stats.points / stats.total) * 100);
              return (
                <div key={topic} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                      {topic}
                    </span>
                    <span className="font-mono text-slate-500">
                      {pct}% ({stats.correct}/{stats.total} soal)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-[#93ABD9]' : 'bg-rose-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Study Advice & Spaced Repetition */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <span>Rekomendasi Belajar Personal</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Strategi peningkatan nilai efektif sebelum hari ujian
            </p>

            <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {weakTopics.length > 0 ? (
                <div className="p-3 bg-[#EDE986]/20 border border-[#EDE986] rounded-xl text-amber-900 dark:text-[#EDE986]">
                  <b>Prioritaskan pemantapan materi:</b>{' '}
                  {weakTopics.map(([t, s]) => `${t} (${s.correct}/${s.total})`).join(', ')}.
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300">
                  🎉 Pemahaman konsep sangat merata di seluruh topik! Pertahankan ritme kecepatan.
                </div>
              )}

              <ul className="space-y-2 list-disc list-inside text-slate-600 dark:text-slate-400">
                <li>
                  <b>Catatan Kesalahan (Error Log):</b> Tulis ulang soal yang kamu jawab salah, lalu ulangi pengerjaan 2 hari kemudian tanpa melihat kunci (metode <i>Spaced Repetition</i>).
                </li>
                <li>
                  <b>Active Recall:</b> Tutup pembahasan dan jelaskan langkah penyelesaian dengan kata-kata sendiri.
                </li>
                <li>
                  {result.subjectId === 'mat'
                    ? 'Kuasai eliminasi cepat pada SPLTV dan uji titik pojok program linear untuk menghemat alokasi waktu.'
                    : 'Baca pertanyaan dan kata kunci terlebih dahulu sebelum membaca teks panjang untuk efisiensi skimming.'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Question Review & Pembahasan Lengkap */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Pembahasan Lengkap Seluruh Soal
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Pelajari kunci jawaban resmi dan langkah penyelesaian terperinci
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={expandAll}
              className="text-xs font-semibold text-[#F2619C] hover:underline px-2 py-1 cursor-pointer"
            >
              Buka Semua Pembahasan
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              onClick={collapseAll}
              className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:underline px-2 py-1 cursor-pointer"
            >
              Tutup Semua
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterType === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Semua ({subject.questions.length})
          </button>
          <button
            onClick={() => setFilterType('correct')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterType === 'correct'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Benar ({result.correctCount})
          </button>
          <button
            onClick={() => setFilterType('wrong')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterType === 'wrong'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Salah / Kosong ({result.wrongCount})
          </button>
          <button
            onClick={() => setFilterType('flagged')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterType === 'flagged'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Ditandai Ragu-ragu ({Object.values(result.flagged).filter(Boolean).length})
          </button>
        </div>

        {/* Question Cards List */}
        <div className="space-y-4">
          {filteredIndices.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              Tidak ada soal pada kategori filter ini.
            </div>
          ) : (
            filteredIndices.map(qIdx => {
              const q = subject.questions[qIdx];
              const ev = result.evaluations[qIdx];
              const isExpanded = !!expandedExplanation[qIdx];

              return (
                <div
                  key={q.id}
                  className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all"
                >
                  {/* Card Header summary */}
                  <div
                    onClick={() => toggleExplanation(qIdx)}
                    className="p-4 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/70 dark:hover:bg-slate-800/70 cursor-pointer flex items-center justify-between gap-3 select-none"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                          ev.isFullyCorrect
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : ev.creditScore > 0
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {qIdx + 1}
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-900 dark:text-white">
                            Soal {qIdx + 1}
                          </span>
                          <span className="text-xs text-slate-400">·</span>
                          <span className="text-xs text-slate-500">{ev.topic}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-3">
                          <span>
                            Jawaban Anda: <b className="text-slate-700 dark:text-slate-300">{ev.userDisplay}</b>
                          </span>
                          <span>·</span>
                          <span>
                            Kunci: <b className="text-emerald-600 dark:text-emerald-400">{ev.keyDisplay}</b>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                          ev.isFullyCorrect
                            ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50'
                            : ev.creditScore > 0
                            ? 'text-amber-700 bg-amber-50 dark:bg-amber-950/50'
                            : 'text-rose-700 bg-rose-50 dark:bg-rose-950/50'
                        }`}
                      >
                        {ev.isFullyCorrect ? '✔ Benar' : ev.creditScore > 0 ? '⚡ Parsial' : '✘ Salah'}
                      </span>

                      <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Body: Question Text, Options & Explanation */}
                  {isExpanded && (
                    <div className="p-5 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs bg-white dark:bg-slate-900">
                      {/* Passage preview if applicable */}
                      {(() => {
                        const pass = getQuestionPassage(q, subject);
                        if (!pass) return null;
                        return (
                          <div className="p-3.5 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-xl border border-indigo-200/80 dark:border-indigo-900/60 space-y-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-300">
                              <BookOpen className="w-4 h-4 text-[#93ABD9]" />
                              <span>{pass.title}</span>
                            </div>
                            <div className="text-slate-700 dark:text-slate-300 italic max-h-48 overflow-y-auto whitespace-pre-wrap text-xs leading-relaxed">
                              {pass.text}
                            </div>
                          </div>
                        );
                      })()}

                      {/* Prompt */}
                      <p className="font-medium text-slate-900 dark:text-white text-sm whitespace-pre-line leading-relaxed">
                        {q.prompt}
                      </p>

                      {/* Image if available */}
                      {q.image && (
                        <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center">
                          <div
                            onClick={() => setZoomedImage({ src: q.image!, alt: q.imageAlt || `Gambar Soal Nomor ${qIdx + 1}` })}
                            className="relative cursor-zoom-in group max-w-full rounded-lg overflow-hidden flex flex-col items-center"
                            title="Klik untuk memperbesar gambar"
                          >
                            <img
                              src={q.image}
                              alt={q.imageAlt || `Gambar Soal`}
                              className="max-h-64 sm:max-h-72 w-auto max-w-full object-contain rounded-lg shadow-xs group-hover:opacity-95 transition-all"
                              loading="lazy"
                            />
                            <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-slate-900/80 hover:bg-slate-900 text-white text-[10px] font-medium rounded-md shadow-sm flex items-center gap-1 backdrop-blur-xs opacity-90 group-hover:opacity-100 transition-opacity">
                              <ZoomIn className="w-3 h-3 text-[#EDE986]" />
                              <span>Perbesar</span>
                            </div>
                          </div>
                          {q.imageAlt && (
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 text-center italic">
                              {q.imageAlt}
                            </span>
                          )}
                        </div>
                      )}

                      {/* SVG diagram if available */}
                      {q.diagramSvg && (
                        <div 
                          className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: q.diagramSvg }}
                        />
                      )}

                      {/* Explanation Block */}
                      {q.explanation && (
                        <div className="p-4 bg-[#93ABD9]/10 dark:bg-[#93ABD9]/15 border border-[#93ABD9]/30 rounded-xl space-y-2">
                          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                            <Lightbulb className="w-4 h-4 text-[#F2619C]" />
                            <span>Pembahasan & Solusi:</span>
                          </div>
                          <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line text-xs font-mono">
                            {q.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

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
