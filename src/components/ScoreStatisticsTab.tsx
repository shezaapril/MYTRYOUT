import React, { useState } from 'react';
import { TryoutResult, CandidateProfile } from '../data/types';
import { 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Trash2, 
  BarChart3, 
  BookOpen, 
  Target, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Info
} from 'lucide-react';

interface ScoreStatisticsTabProps {
  history: TryoutResult[];
  profile: CandidateProfile;
  onViewResult: (result: TryoutResult) => void;
  onClearHistory: () => void;
  onClearCategoryHistory?: (category: 'TKA' | 'UTBK') => void;
  onStartExam: (subjectId: 'mat' | 'ind' | 'eng') => void;
}

export const ScoreStatisticsTab: React.FC<ScoreStatisticsTabProps> = ({
  history,
  profile,
  onViewResult,
  onClearHistory,
  onClearCategoryHistory,
  onStartExam
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'TKA' | 'UTBK'>('all');
  const [tableFilter, setTableFilter] = useState<'all' | 'timed' | 'practice'>('all');

  // Sort chronological (oldest to newest for growth trends)
  const chronological = [...history].sort((a, b) => a.timestamp - b.timestamp);

  // STRICT RULE: Statistik HANYA dihitung dari hasil Try Out resmi (mode === 'timed'), bukan latihan soal!
  // Catatan: Matematika Wajib, Bahasa Indonesia, dan Bahasa Inggris adalah mata pelajaran TKA
  const tryoutOnly = chronological.filter(h => h.mode === 'timed');
  const tkaHistory = tryoutOnly.filter(h => h.examCategory === 'TKA' || ['mat', 'ind', 'eng'].includes(h.subjectId));
  const utbkHistory = tryoutOnly.filter(h => h.examCategory === 'UTBK' && !['mat', 'ind', 'eng'].includes(h.subjectId));

  const practiceCount = history.filter(h => h.mode === 'practice').length;

  // Stats calculation helper
  const calculateTrackStats = (list: TryoutResult[], passingGrade: number, targetScore: number) => {
    if (list.length === 0) {
      return {
        count: 0,
        first: null,
        latest: null,
        highest: null,
        average: null,
        growth: null,
        passingDelta: null,
        targetDelta: null
      };
    }

    const first = list[0].score;
    const latest = list[list.length - 1].score;
    const highest = Math.max(...list.map(h => h.score));
    const average = Math.round((list.reduce((acc, h) => acc + h.score, 0) / list.length) * 100) / 100;
    const growth = Math.round((latest - first) * 100) / 100;
    const passingDelta = Math.round((latest - passingGrade) * 100) / 100;
    const targetDelta = Math.round((latest - targetScore) * 100) / 100;

    return {
      count: list.length,
      first,
      latest,
      highest,
      average,
      growth,
      passingDelta,
      targetDelta
    };
  };

  const tkaStats = calculateTrackStats(tkaHistory, profile.passingGradeTKA, profile.targetScoreTKA);
  const utbkStats = calculateTrackStats(utbkHistory, profile.passingGradeUTBK, profile.targetScoreUTBK);

  // Render a visual trend bar chart for a list of results
  const renderTrendChart = (
    list: TryoutResult[], 
    passingGrade: number, 
    targetScore: number, 
    trackLabel: string,
    minScale: number,
    maxScale: number
  ) => {
    if (list.length === 0) {
      return (
        <div className="py-12 text-center text-xs text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
          Belum ada sesi Try Out resmi untuk {trackLabel}. Kerjakan tryout dengan batas waktu untuk merekam grafik perkembangan skor.
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#F2619C]" />
              <span>Skor Try Out</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-b-2 border-dashed border-[#EDE986]" />
              <span>Passing Grade ({passingGrade})</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-b-2 border-dashed border-[#93ABD9]" />
              <span>Target ({targetScore})</span>
            </span>
          </div>
          <span className="font-mono text-[11px]">
            {minScale === 0 ? 'Rentang Skor UTBK 0–1000' : 'Skala Skor TKA 200–800'}
          </span>
        </div>

        {/* Visual Chart Bars */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
          {list.map((item, idx) => {
            const pct = Math.min(100, Math.max(5, ((item.score - minScale) / (maxScale - minScale)) * 100));
            const passingPct = Math.min(100, Math.max(5, ((passingGrade - minScale) / (maxScale - minScale)) * 100));
            const isLatest = idx === list.length - 1;

            return (
              <div
                key={item.id}
                onClick={() => onViewResult(item)}
                className="group cursor-pointer space-y-1"
              >
                <div className="flex justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-slate-700 dark:text-slate-300">
                      Tryout #{idx + 1}
                    </span>
                    <span className="text-slate-900 dark:text-white font-medium">
                      {item.subjectName}
                    </span>
                    <span className="text-[11px] text-slate-400 hidden sm:inline font-mono">
                      ({item.date})
                    </span>
                    {isLatest && (
                      <span className="text-[10px] font-bold text-[#F2619C] bg-[#F2619C]/15 px-1.5 py-0.2 rounded">
                        Terbaru
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 font-mono font-bold">
                    <span className="text-[#F2619C]">
                      {item.score.toFixed(2)}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ({item.category})
                    </span>
                  </div>
                </div>

                {/* Progress bar container */}
                <div className="relative w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
                  {/* Passing Grade Marker Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-[#EDE986] z-10 shadow-xs"
                    style={{ left: `${passingPct}%` }}
                    title={`Passing Grade: ${passingGrade}`}
                  />

                  {/* Score Fill */}
                  <div
                    className={`h-full rounded-lg transition-all duration-500 ${
                      item.score >= targetScore
                        ? 'bg-[#EDE986] group-hover:brightness-105'
                        : item.score >= passingGrade
                        ? 'bg-[#F2619C] group-hover:bg-[#d84581]'
                        : 'bg-[#93ABD9] group-hover:brightness-105'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Filtered rows for the bottom session history table
  const tableHistory = history.filter(h => {
    if (tableFilter === 'timed') return h.mode === 'timed';
    if (tableFilter === 'practice') return h.mode === 'practice';
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#F2619C]">
            Perkembangan Skor Tryout Menuju PTN
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-[#93ABD9]" />
            <span>Statistik Skor & Tren Pertumbuhan</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Data statistik dihitung secara murni dari <b>hasil Try Out resmi</b> dan dipisah antara <b>TKA (200–800)</b> dan <b>UTBK (0–1000)</b>
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Reset Data</span>
          </button>
        )}
      </div>

      {/* Tryout Exclusivity Banner */}
      <div className="p-4 bg-[#93ABD9]/15 dark:bg-[#93ABD9]/10 border border-[#93ABD9]/30 rounded-2xl flex items-start gap-3">
        <Info className="w-5 h-5 text-[#93ABD9] shrink-0 mt-0.5" />
        <div className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
          <b>Ketentuan Statistik:</b> Seluruh metrik statistik, rata-rata, dan grafik tren di halaman ini <b>hanya dihitung dari simulasi Try Out resmi (berwaktu)</b>. Hasil latihan soal bebas ({practiceCount} sesi) tidak dicampur agar data pertumbuhan skor murni mencerminkan kesiapan ujian resmi.
        </div>
      </div>

      {/* Category Filter Selector */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-[#F2619C] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Semua Rumpun ({tryoutOnly.length} Tryout)
        </button>
        <button
          onClick={() => setActiveCategory('TKA')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeCategory === 'TKA'
              ? 'bg-[#F2619C] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Khusus TKA (Skala 200–800)
        </button>
        <button
          onClick={() => setActiveCategory('UTBK')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeCategory === 'UTBK'
              ? 'bg-[#F2619C] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Khusus UTBK (Rentang 0–1000)
        </button>
      </div>

      {/* SECTION 1: STATISTIK SKOR TKA */}
      {(activeCategory === 'all' || activeCategory === 'TKA') && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#93ABD9]" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Statistik Skor TKA (Skala 200–800)
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Mencakup Matematika Wajib, Bahasa Indonesia, & Bahasa Inggris · Target: {profile.targetScoreTKA} · Passing Grade: {profile.passingGradeTKA}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {tkaStats.growth !== null && (
                <span
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 ${
                    tkaStats.growth >= 0
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                  }`}
                >
                  {tkaStats.growth >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  <span>Pertumbuhan: {tkaStats.growth >= 0 ? `+${tkaStats.growth}` : tkaStats.growth} poin</span>
                </span>
              )}

              {tkaHistory.length > 0 && onClearCategoryHistory && (
                <button
                  onClick={() => onClearCategoryHistory('TKA')}
                  className="px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors flex items-center gap-1 cursor-pointer font-medium"
                  title="Hapus seluruh rekaman sesi TKA"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset Sesi TKA</span>
                </button>
              )}
            </div>
          </div>

          {tkaHistory.length === 0 ? (
            /* Dedicated Zero-State for TKA */
            <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border-2 border-dashed border-[#93ABD9]/40 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#93ABD9]/15 text-[#93ABD9] flex items-center justify-center">
                <Clock className="w-7 h-7" />
              </div>
              <div className="max-w-md mx-auto space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EDE986]/30 text-[#7d7715] dark:text-[#EDE986]">
                  Status: Belum Ada Riwayat Try Out Resmi
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Anda Belum Pernah Mengerjakan Try Out Resmi Jalur TKA
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Statistik jalur TKA (Matematika Wajib, Bahasa Indonesia, Bahasa Inggris; skala IRT 200–800) hanya dihitung murni dari hasil simulasi CBT berwaktu. Belum ada skor tryout resmi yang tercatat. Sesi latihan soal tidak dicampur ke grafik ini.
                </p>
              </div>

              {/* Target & Passing Grade Preview */}
              <div className="max-w-md mx-auto grid grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-400 text-[11px]">Target Skor TKA</div>
                  <div className="text-lg font-bold font-mono text-[#F2619C] mt-0.5">{profile.targetScoreTKA}</div>
                  <div className="text-[10px] text-slate-400">skala 200–800</div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-400 text-[11px]">Passing Grade TKA</div>
                  <div className="text-lg font-bold font-mono text-slate-700 dark:text-slate-200 mt-0.5">{profile.passingGradeTKA}</div>
                  <div className="text-[10px] text-slate-400">ambang batas prodi</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => onStartExam('mat')}
                  className="px-4 py-2.5 bg-[#F2619C] hover:bg-[#d84581] text-white rounded-xl text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Try Out MTK Wajib</span>
                </button>
                <button
                  onClick={() => onStartExam('ind')}
                  className="px-4 py-2.5 bg-[#93ABD9] hover:bg-[#7b98d1] text-white rounded-xl text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Try Out B. Indonesia</span>
                </button>
                <button
                  onClick={() => onStartExam('eng')}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Try Out B. Inggris</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Metric Cards for TKA */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                  <div className="text-xs text-slate-400 font-medium">Skor Tryout Pertama</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                    {tkaStats.first !== null ? tkaStats.first.toFixed(2) : '-'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">sesi awal</div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                  <div className="text-xs text-slate-400 font-medium">Skor Tryout Terakhir</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#93ABD9] mt-1">
                    {tkaStats.latest !== null ? tkaStats.latest.toFixed(2) : '-'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">sesi terbaru</div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                  <div className="text-xs text-slate-400 font-medium">Skor Tertinggi TKA</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#7d7715] dark:text-[#EDE986] mt-1">
                    {tkaStats.highest !== null ? tkaStats.highest.toFixed(2) : '-'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">rekor tryout</div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                  <div className="text-xs text-slate-400 font-medium">Rata-Rata Tryout</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-slate-700 dark:text-slate-300 mt-1">
                    {tkaStats.average !== null ? tkaStats.average.toFixed(2) : '-'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">dari {tkaStats.count} tryout</div>
                </div>
              </div>

              {/* Trend Chart */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Grafik Perkembangan Skor TKA Per Sesi Try Out
                </h3>
                {renderTrendChart(tkaHistory, profile.passingGradeTKA, profile.targetScoreTKA, 'TKA', 200, 800)}
              </div>
            </>
          )}
        </section>
      )}

      {/* SECTION 2: STATISTIK SKOR UTBK */}
      {(activeCategory === 'all' || activeCategory === 'UTBK') && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F2619C]" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Statistik Skor UTBK (Rentang 0–1000)
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Mencakup Literasi Bahasa Indonesia & Bahasa Inggris · Target: {profile.targetScoreUTBK} · Passing Grade: {profile.passingGradeUTBK}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {utbkStats.growth !== null && (
                <span
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 ${
                    utbkStats.growth >= 0
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                  }`}
                >
                  {utbkStats.growth >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  <span>Pertumbuhan: {utbkStats.growth >= 0 ? `+${utbkStats.growth}` : utbkStats.growth} poin</span>
                </span>
              )}

              {utbkHistory.length > 0 && onClearCategoryHistory && (
                <button
                  onClick={() => onClearCategoryHistory('UTBK')}
                  className="px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors flex items-center gap-1 cursor-pointer font-medium"
                  title="Hapus seluruh rekaman sesi UTBK"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset Sesi UTBK</span>
                </button>
              )}
            </div>
          </div>

          {utbkHistory.length === 0 ? (
            /* Dedicated Zero-State for UTBK */
            <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border-2 border-dashed border-[#F2619C]/40 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F2619C]/15 text-[#F2619C] flex items-center justify-center">
                <Clock className="w-7 h-7" />
              </div>
              <div className="max-w-md mx-auto space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EDE986]/30 text-[#7d7715] dark:text-[#EDE986]">
                  Status: Belum Ada Riwayat Try Out Resmi
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Anda Belum Pernah Mengerjakan Try Out Resmi Jalur UTBK
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Statistik jalur UTBK (Bahasa Indonesia & Bahasa Inggris, skala 0–1000) mencatat hasil try out simulasi berwaktu. Belum ada try out resmi yang tercatat.
                </p>
              </div>

              {/* Target & Passing Grade Preview */}
              <div className="max-w-md mx-auto grid grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-400 text-[11px]">Target Skor UTBK</div>
                  <div className="text-lg font-bold font-mono text-[#F2619C] mt-0.5">{profile.targetScoreUTBK}</div>
                  <div className="text-[10px] text-slate-400">skala 0–1000</div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-400 text-[11px]">Passing Grade UTBK</div>
                  <div className="text-lg font-bold font-mono text-slate-700 dark:text-slate-200 mt-0.5">{profile.passingGradeUTBK}</div>
                  <div className="text-[10px] text-slate-400">ambang batas prodi</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => onStartExam('ind')}
                  className="px-4 py-2 bg-[#F2619C] hover:bg-[#d84581] text-white rounded-xl text-xs font-bold transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Try Out B. Indonesia (25 Menit)</span>
                </button>
                <button
                  onClick={() => onStartExam('eng')}
                  className="px-4 py-2 bg-[#93ABD9] hover:bg-[#748ec4] text-white rounded-xl text-xs font-bold transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Try Out B. Inggris (25 Menit)</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Metric Cards for UTBK */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                  <div className="text-xs text-slate-400 font-medium">Skor Tryout Pertama</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                    {utbkStats.first !== null ? utbkStats.first.toFixed(2) : '-'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">sesi awal</div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                  <div className="text-xs text-slate-400 font-medium">Skor Tryout Terakhir</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#F2619C] mt-1">
                    {utbkStats.latest !== null ? utbkStats.latest.toFixed(2) : '-'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">sesi terbaru</div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                  <div className="text-xs text-slate-400 font-medium">Skor Tertinggi UTBK</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#7d7715] dark:text-[#EDE986] mt-1">
                    {utbkStats.highest !== null ? utbkStats.highest.toFixed(2) : '-'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">rekor tryout</div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                  <div className="text-xs text-slate-400 font-medium">Rata-Rata Tryout</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-slate-700 dark:text-slate-300 mt-1">
                    {utbkStats.average !== null ? utbkStats.average.toFixed(2) : '-'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">dari {utbkStats.count} tryout</div>
                </div>
              </div>

              {/* Trend Chart */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Grafik Perkembangan Skor UTBK Per Sesi Try Out
                </h3>
                {renderTrendChart(utbkHistory, profile.passingGradeUTBK, profile.targetScoreUTBK, 'UTBK', 0, 1000)}
              </div>
            </>
          )}
        </section>
      )}

      {/* Sesi Tabel Rinci */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Riwayat Seluruh Sesi Pengerjaan
            </h3>
            <p className="text-xs text-slate-500">Tercatat {history.length} total sesi ({tryoutOnly.length} Try Out Resmi, {practiceCount} Latihan Soal)</p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setTableFilter('all')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                tableFilter === 'all' ? 'bg-[#F2619C] text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Semua ({history.length})
            </button>
            <button
              onClick={() => setTableFilter('timed')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                tableFilter === 'timed' ? 'bg-[#F2619C] text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Try Out Resmi ({tryoutOnly.length})
            </button>
            <button
              onClick={() => setTableFilter('practice')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                tableFilter === 'practice' ? 'bg-[#F2619C] text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Latihan ({practiceCount})
            </button>
          </div>
        </div>

        {tableHistory.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            Tidak ada data sesi pada filter ini.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold">
                  <th className="py-2.5 px-3">Tanggal</th>
                  <th className="py-2.5 px-3">Tipe Sesi</th>
                  <th className="py-2.5 px-3">Rumpun</th>
                  <th className="py-2.5 px-3">Mata Uji</th>
                  <th className="py-2.5 px-3">Skor</th>
                  <th className="py-2.5 px-3">Kategori</th>
                  <th className="py-2.5 px-3">Akurasi</th>
                  <th className="py-2.5 px-3 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {tableHistory.map(item => (
                  <tr
                    key={item.id}
                    onClick={() => onViewResult(item)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group"
                  >
                    <td className="py-3 px-3 font-mono text-slate-500">{item.date}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        item.mode === 'timed'
                          ? 'bg-[#F2619C]/15 text-[#F2619C]'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {item.mode === 'timed' ? 'Try Out Resmi' : 'Latihan Soal'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        item.examCategory === 'TKA'
                          ? 'bg-[#93ABD9]/20 text-[#6180bf] dark:text-[#93ABD9]'
                          : 'bg-[#E7BEF8]/30 text-[#863ca8] dark:text-[#E7BEF8]'
                      }`}>
                        {item.examCategory}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                      {item.subjectName}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-[#F2619C]">
                      {item.score.toFixed(2)}
                      <span className="text-[10px] text-slate-400 font-normal ml-1">
                        ({item.examCategory === 'UTBK' ? '0-1000' : '200-800'})
                      </span>
                    </td>
                    <td className="py-3 px-3">{item.category}</td>
                    <td className="py-3 px-3 text-slate-500 font-mono">
                      {item.correctCount}/{item.totalQuestions} Benar
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-[#93ABD9] group-hover:text-[#F2619C] font-semibold group-hover:underline">
                        Buka Evaluasi →
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};
