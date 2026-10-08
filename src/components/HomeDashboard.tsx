import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  RotateCcw, 
  Target, 
  FileText, 
  ChevronRight,
  ShieldCheck,
  Compass,
  School,
  BarChart2,
  Sparkles,
  Upload,
  Camera,
  Edit3
} from 'lucide-react';
import { Subject, TryoutResult, CandidateProfile } from '../data/types';
import { SUBJECTS_DATA } from '../data/questions';
import { getCategory } from '../utils/scoring';
import motivasiKampusImg from '../assets/images/motivasi_kampus_itb_1791435997567.jpg';
import { EditMotivationModal, MotivationConfig } from './EditMotivationModal';
import { UserAvatar } from './UserAvatar';

const DEFAULT_MOTIVATION: MotivationConfig = {
  imageUrl: null,
  campusTitle: 'Gedung T.P. Rachmat (Labtek V ITB)',
  campusSubtitle: 'Institut Teknologi Bandung — Kampus Ganesha',
  quote: '"Setiap soal dan sesi tryout yang kamu selesaikan hari ini bukan sekadar deretan skor, melainkan bekal nyata yang membawamu selangkah lebih dekat ke gerbang fakultas impianmu."'
};

interface HomeDashboardProps {
  onStartExam: (subjectId: 'mat' | 'ind' | 'eng', mode: 'timed' | 'practice') => void;
  history: TryoutResult[];
  onViewResult: (result: TryoutResult) => void;
  profile: CandidateProfile;
  onNavigateTab: (tab: 'profile' | 'statistics') => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onStartExam,
  history,
  onViewResult,
  profile,
  onNavigateTab
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Motivation config state with persistence
  const [motivationConfig, setMotivationConfig] = useState<MotivationConfig>(() => {
    try {
      const savedConfig = localStorage.getItem('tka_motivation_config');
      if (savedConfig) {
        return {
          ...DEFAULT_MOTIVATION,
          ...JSON.parse(savedConfig)
        };
      }
      const legacyImg = localStorage.getItem('tka_motivation_img');
      if (legacyImg) {
        return {
          ...DEFAULT_MOTIVATION,
          imageUrl: legacyImg
        };
      }
    } catch {
      // fallback
    }
    return DEFAULT_MOTIVATION;
  });

  const motivationSrc = motivationConfig.imageUrl || motivasiKampusImg;

  const handleSaveMotivation = (newConfig: MotivationConfig) => {
    setMotivationConfig(newConfig);
    try {
      localStorage.setItem('tka_motivation_config', JSON.stringify(newConfig));
      if (newConfig.imageUrl) {
        localStorage.setItem('tka_motivation_img', newConfig.imageUrl);
      } else {
        localStorage.removeItem('tka_motivation_img');
      }
    } catch {
      // storage quota fallback
    }
  };

  const handleResetMotivation = () => {
    setMotivationConfig(DEFAULT_MOTIVATION);
    try {
      localStorage.removeItem('tka_motivation_config');
      localStorage.removeItem('tka_motivation_img');
    } catch {
      // ignore
    }
  };
  // Map best or latest score for each subject (HANYA DARI HASIL TRY OUT RESMI)
  const tryoutHistory = history.filter(h => h.mode === 'timed');
  const latestBySubject: Record<string, TryoutResult | undefined> = {
    mat: tryoutHistory.find(h => h.subjectId === 'mat'),
    ind: tryoutHistory.find(h => h.subjectId === 'ind'),
    eng: tryoutHistory.find(h => h.subjectId === 'eng'),
  };

  const subjectKeys: ('mat' | 'ind' | 'eng')[] = ['mat', 'ind', 'eng'];
  const completedSubjects = subjectKeys.filter(k => !!latestBySubject[k]);
  const isAllCompleted = completedSubjects.length === 3;

  const averageScore = isAllCompleted
    ? Math.round(
        (subjectKeys.reduce((acc, k) => acc + (latestBySubject[k]?.score || 0), 0) / 3) * 100
      ) / 100
    : null;

  const isIstimewa = isAllCompleted && 
    (latestBySubject.mat?.score || 0) >= 725.0 && 
    (latestBySubject.ind?.score || 0) >= 750.0 && 
    (latestBySubject.eng?.score || 0) >= 750.0;

  const getSubjectIcon = (id: string) => {
    switch (id) {
      case 'mat':
        return '∑';
      case 'ind':
        return 'ID';
      case 'eng':
        return 'EN';
      default:
        return '•';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Hero Welcome Banner */}
      <section className="bg-gradient-to-br from-[#2a3853] via-[#3a496e] to-[#48283e] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-[#93ABD9]/30">
        <div className="absolute -right-12 -bottom-12 w-72 h-72 bg-[#F2619C]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -top-12 w-64 h-64 bg-[#93ABD9]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            {/* Above main title */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EDE986]">
              <ShieldCheck className="w-4 h-4 text-[#EDE986]" />
              <span>SISTEM PENGUKURAN KELAYAKAN MENUJU PTN</span>
            </div>

            {/* Main title: My Tryout */}
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>My Tryout</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#F2619C]" />
            </h1>

            <p className="text-sm text-slate-200 leading-relaxed">
              Ukur kesiapanmu dengan sistem penilaian resmi Item Response Theory (IRT). Latih fokus, kecepatan, dan pantau kelayakan skor menuju perguruan tinggi impian.
            </p>

            {/* Target summary pill tags */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 bg-black/25 border border-[#E7BEF8]/30 px-3 py-1.5 rounded-xl backdrop-blur-xs">
                <Target className="w-3.5 h-3.5 text-[#EDE986]" />
                <span className="text-white">
                  Target {profile.ptnType}: <b className="text-[#EDE986]">{profile.targetMajor}</b> · {profile.targetUniv}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/25 border border-[#93ABD9]/30 px-3 py-1.5 rounded-xl backdrop-blur-xs">
                <span className="text-white">Passing Grade: <b className="text-[#E7BEF8]">TKA {profile.passingGradeTKA}</b> / <b className="text-[#F2619C]">UTBK {profile.passingGradeUTBK}</b></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => onNavigateTab('profile')}
              className="px-5 py-2.5 text-xs font-bold text-slate-900 bg-[#EDE986] hover:bg-[#ded970] rounded-xl transition-all shadow-md text-center cursor-pointer"
            >
              Lihat Profil & Target PTN
            </button>
            <button
              onClick={() => onNavigateTab('statistics')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-[#E7BEF8]/20 border border-[#93ABD9]/40 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <BarChart2 className="w-3.5 h-3.5 text-[#E7BEF8]" />
              <span>Statistik Perkembangan Skor</span>
            </button>
          </div>
        </div>
      </section>

      {/* Galeri Motivasi Menuju Kampus Impian (Ratio 4:3) */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Sisi Kiri: Foto Motivasi Rasio 4:3 */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 group bg-slate-100 dark:bg-slate-800">
              <img
                src={motivationSrc}
                alt={motivationConfig.campusTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />

              {/* Tombol Cepat Edit di atas foto */}
              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="absolute top-3.5 right-3.5 z-10 px-3 py-1.5 bg-slate-950/75 hover:bg-slate-900 backdrop-blur-md text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md border border-white/20 hover:scale-105"
                title="Ubah foto dan keterangan kampus"
              >
                <Camera className="w-3.5 h-3.5 text-amber-300" />
                <span>Ganti Foto & Keterangan</span>
              </button>

              {/* Keterangan Kampus di bawah foto */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Kampus Impian Menanti</span>
                </div>
                <div className="text-sm sm:text-base font-extrabold truncate mt-0.5">
                  {motivationConfig.campusTitle}
                </div>
                <div className="text-[11px] text-slate-300 truncate">
                  {motivationConfig.campusSubtitle || 'Rasio 4:3 · Pengingat visual perjuangan menuju PTN impian'}
                </div>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Teks Motivasi & Komitmen Belajar */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F2619C]">
                <Target className="w-4 h-4 text-[#F2619C]" />
                <span>PENGINGAT TARGET & MOTIVASI HARIAN</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                Langkah Nyata Menuju Kampus Impian
              </h2>
              <blockquote className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic border-l-3 border-[#F2619C] pl-3.5 my-3 leading-relaxed">
                {motivationConfig.quote}
              </blockquote>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-[#93ABD9]/10 dark:bg-[#93ABD9]/15 p-3.5 rounded-xl border border-[#93ABD9]/30">
              <div>
                <span className="text-slate-400 text-[11px]">Target Jurusan:</span>
                <div className="font-bold text-slate-900 dark:text-white truncate mt-0.5">{profile.targetMajor}</div>
                <div className="text-[11px] text-slate-500 truncate">{profile.targetUniv}</div>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">Sasaran Skor:</span>
                <div className="font-mono font-bold text-[#F2619C] mt-0.5">
                  TKA {profile.targetScoreTKA} · UTBK {profile.targetScoreUTBK}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Passing: {profile.passingGradeTKA} / {profile.passingGradeUTBK}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="cursor-pointer px-4 py-2 text-xs font-semibold bg-[#F2619C] hover:bg-[#d84581] text-white rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Ubah Foto & Keterangan Kampus</span>
              </button>
              {(motivationConfig.imageUrl || motivationConfig.campusTitle !== DEFAULT_MOTIVATION.campusTitle || motivationConfig.campusSubtitle !== DEFAULT_MOTIVATION.campusSubtitle) && (
                <button
                  type="button"
                  onClick={handleResetMotivation}
                  className="px-3 py-2 text-xs text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Reset Foto & Keterangan Awal
                </button>
              )}
              <button
                type="button"
                onClick={() => onNavigateTab('profile')}
                className="px-3.5 py-2 text-xs font-semibold text-[#93ABD9] hover:text-[#F2619C] hover:underline ml-auto cursor-pointer"
              >
                Sesuaikan Target PTN →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rapor Nilai Rata-rata 3 Mapel */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-[#93ABD9]" />
              <span>Rekapitulasi Skor Gabungan TKA</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Rata-rata 3 mata uji TKA (Matematika Wajib, Bahasa Indonesia, Bahasa Inggris) skala IRT (200 - 800)
            </p>
          </div>

          {averageScore !== null && (
            <div className="text-right">
              <div className="text-xs text-slate-500 dark:text-slate-400">Rata-Rata Komposit</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#F2619C]">
                {averageScore.toFixed(2)}
              </div>
            </div>
          )}
        </div>

        {isAllCompleted && averageScore !== null ? (
          <div className="mt-5 space-y-4">
            {isIstimewa ? (
              <div className="p-4 bg-[#EDE986]/25 dark:bg-[#EDE986]/15 border border-[#EDE986] rounded-xl flex items-start gap-3">
                <Award className="w-6 h-6 text-[#7d7715] dark:text-[#EDE986] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    🏆 Predikat ISTIMEWA Tercapai!
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-200 mt-0.5">
                    Selamat! Semua mata uji kamu telah mencapai ambang batas minimal 725,00. Tingkat kesiapan masuk program studi unggulan sangat tinggi!
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Kategori Rata-Rata: <b className="text-slate-700 dark:text-slate-200">{getCategory(averageScore)}</b> · Syarat Predikat Istimewa: seluruh mata uji ≥ 725,00.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {subjectKeys.map(k => {
                const res = latestBySubject[k]!;
                const sub = SUBJECTS_DATA[k];
                return (
                  <div
                    key={k}
                    onClick={() => onViewResult(res)}
                    className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl hover:border-[#93ABD9] cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                        {sub.name} <span className="text-[10px] opacity-70">({sub.category})</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F2619C] transition-colors" />
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                        {res.score.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-500">{res.category}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 truncate">
                      {res.date}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Baru {completedSubjects.length} dari 3 mata uji diselesaikan. Selesaikan ketiganya untuk melihat kalkulasi rata-rata skor TKA resmi.
            </div>
            <div className="text-xs font-bold text-[#F2619C] shrink-0">
              {completedSubjects.length}/3 Selesai
            </div>
          </div>
        )}
      </section>

      {/* Tiga Paket Soal Mata Pelajaran */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Pilih Paket Ujian</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Kerjakan sesuai batas waktu untuk simulasi realistis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {subjectKeys.map(key => {
            const subject = SUBJECTS_DATA[key];
            const latest = latestBySubject[key];

            const iconBg = key === 'mat' 
              ? 'bg-[#93ABD9]/20 text-[#93ABD9] border-[#93ABD9]/40' 
              : key === 'ind' 
              ? 'bg-[#E7BEF8]/25 text-[#a445c7] dark:text-[#E7BEF8] border-[#E7BEF8]/50' 
              : 'bg-[#EDE986]/35 text-[#887f13] dark:text-[#EDE986] border-[#EDE986]/60';

            return (
              <div
                key={key}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#93ABD9]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-10 h-10 rounded-xl border font-bold flex items-center justify-center text-sm font-mono ${iconBg}`}>
                        {getSubjectIcon(key)}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 bg-[#93ABD9]/15 px-2 py-0.5 rounded">
                        {subject.category}
                      </span>
                    </div>

                    {latest ? (
                      <span className="text-xs font-semibold text-[#F2619C] bg-[#F2619C]/10 px-2.5 py-1 rounded-md">
                        Skor: {latest.score.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Belum Ujian</span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{subject.name}</h3>
                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {subject.questions.length} Soal
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {subject.durationMinutes} Menit
                    </span>
                  </div>

                  {subject.passages.length > 0 && (
                    <div className="mt-2 text-xs text-slate-400">
                      Termasuk {subject.passages.length} wacana teks analitis
                    </div>
                  )}

                  {latest && (
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                      Terakhir dikerjakan: <span className="font-medium text-slate-700 dark:text-slate-300">{latest.date}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => onStartExam(key, 'timed')}
                    className="w-full py-2.5 px-4 bg-[#F2619C] hover:bg-[#d84581] text-white rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Mulai Tryout Resmi ({subject.durationMinutes} mnt)</span>
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onStartExam(key, 'practice')}
                      className="flex-1 py-2 px-3 bg-[#93ABD9]/15 hover:bg-[#93ABD9]/25 text-slate-700 dark:text-slate-200 border border-[#93ABD9]/30 rounded-lg text-xs font-medium transition-colors text-center cursor-pointer"
                      title="Latihan santai tanpa batas waktu"
                    >
                      Latihan Bebas
                    </button>
                    {latest && (
                      <button
                        onClick={() => onViewResult(latest)}
                        className="py-2 px-3 border border-[#E7BEF8]/60 hover:bg-[#E7BEF8]/20 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                        title="Buka pembahasan hasil terakhir"
                      >
                        Pembahasan
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Target PTN Info Card */}
      <section className="bg-gradient-to-r from-[#93ABD9]/10 via-[#E7BEF8]/10 to-[#F2619C]/10 rounded-2xl p-6 border border-[#93ABD9]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#F2619C]">
            Target Pribadi Peserta
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <School className="w-4 h-4 text-[#93ABD9]" />
            <span>{profile.targetMajor} — {profile.targetUniv}</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Fakultas: {profile.targetFaculty} · Asal: {profile.highSchool} ({profile.graduationYear})
          </p>
        </div>
        <button
          onClick={() => onNavigateTab('profile')}
          className="px-4 py-2 text-xs font-bold text-slate-900 bg-[#EDE986] hover:bg-[#ded970] rounded-xl transition-colors shrink-0 shadow-xs cursor-pointer"
        >
          Lihat & Edit Profil
        </button>
      </section>

      {/* Modal Ubah Foto & Keterangan Kampus Motivasi */}
      <EditMotivationModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentConfig={motivationConfig}
        defaultImage={motivasiKampusImg}
        onSave={handleSaveMotivation}
        onReset={handleResetMotivation}
      />
    </div>
  );
};
