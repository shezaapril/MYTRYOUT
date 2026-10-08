import React, { useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { CandidateProfile, PtnType, TryoutResult } from '../data/types';
import { UserAvatar } from './UserAvatar';
import { 
  User, 
  School, 
  Calendar, 
  Target, 
  Award, 
  Check, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles,
  BookOpen,
  Camera,
  Trash2,
  Cloud,
  Laptop,
  Smartphone,
  LogIn
} from 'lucide-react';

interface UserProfileTabProps {
  profile: CandidateProfile;
  onSaveProfile: (profile: CandidateProfile) => void;
  history: TryoutResult[];
  currentUser?: FirebaseUser | null;
  onOpenAuthModal?: () => void;
  isSyncing?: boolean;
}

export const UserProfileTab: React.FC<UserProfileTabProps> = ({
  profile,
  onSaveProfile,
  history,
  currentUser = null,
  onOpenAuthModal,
  isSyncing = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CandidateProfile>(profile);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Calculate latest and best scores for TKA and UTBK (HANYA DARI HASIL TRY OUT RESMI / BERWAKTU)
  // Catatan: Matematika Wajib, Bahasa Indonesia, dan Bahasa Inggris adalah TKA
  const tkaResults = history.filter(h => (h.examCategory === 'TKA' || ['mat', 'ind', 'eng'].includes(h.subjectId)) && h.mode === 'timed');
  const utbkResults = history.filter(h => h.examCategory === 'UTBK' && !['mat', 'ind', 'eng'].includes(h.subjectId) && h.mode === 'timed');

  const latestTKA = tkaResults.length > 0 ? tkaResults[0].score : null;
  const bestTKA = tkaResults.length > 0 ? Math.max(...tkaResults.map(h => h.score)) : null;

  const latestUTBK = utbkResults.length > 0 ? utbkResults[0].score : null;
  const bestUTBK = utbkResults.length > 0 ? Math.max(...utbkResults.map(h => h.score)) : null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Status evaluator helper
  const evaluateStatus = (actual: number | null, passing: number, target: number) => {
    if (actual === null) return { text: 'Belum Ada Data Tryout', color: 'text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700' };
    if (actual >= target) return { text: 'Sangat Layak (Di Atas Target)', color: 'text-[#F2619C] bg-[#F2619C]/15 border-[#F2619C]/40' };
    if (actual >= passing) return { text: 'Layak (Lolos Passing Grade)', color: 'text-[#6886c5] dark:text-[#93ABD9] bg-[#93ABD9]/15 border-[#93ABD9]/40' };
    if (passing - actual <= 30) return { text: 'Mendekati Passing Grade', color: 'text-[#7d7715] dark:text-[#EDE986] bg-[#EDE986]/25 border-[#EDE986]' };
    return { text: 'Perlu Peningkatan', color: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-700' };
  };

  const statusTKA = evaluateStatus(bestTKA, profile.passingGradeTKA, profile.targetScoreTKA);
  const statusUTBK = evaluateStatus(bestUTBK, profile.passingGradeUTBK, profile.targetScoreUTBK);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#F2619C]">
            Profil Peserta & Sasaran Masuk PTN
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Profil Pengguna & Target PTN
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Data pribadi calon mahasiswa dan acuan skor kelayakan menuju perguruan tinggi impian
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              onClick={() => {
                setFormData(profile);
                setIsEditing(true);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#F2619C] hover:bg-[#d84581] rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profil & Target</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Batal
            </button>
          )}
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-[#EDE986]/25 dark:bg-[#EDE986]/15 border border-[#EDE986] rounded-2xl flex items-center gap-3 text-slate-900 dark:text-white text-xs font-medium">
          <CheckCircle2 className="w-5 h-5 text-[#F2619C] shrink-0" />
          <span>Profil dan target PTN berhasil diperbarui dan disimpan secara permanen.</span>
        </div>
      )}

      {/* Editor Form Mode */}
      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-4 h-4 text-[#F2619C]" />
              <span>1. Identitas & Foto Profil Peserta</span>
            </h2>

            {/* Avatar upload & preview section */}
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-center gap-4">
              <UserAvatar
                name={formData.name}
                avatarUrl={formData.avatarUrl}
                size="xl"
                editable={true}
                onAvatarChange={newUrl => setFormData(prev => ({ ...prev, avatarUrl: newUrl }))}
              />
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Foto Profil Pengguna
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Unggah foto pribadi untuk ditampilkan pada Beranda, Navigasi, dan Rapor Tryout resmi.
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  <label className="cursor-pointer px-3 py-1.5 bg-[#F2619C] hover:bg-[#d84581] text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-xs">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Pilih Foto dari Perangkat</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData(prev => ({ ...prev, avatarUrl: reader.result as string }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  {formData.avatarUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, avatarUrl: null }))}
                      className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                    >
                      Hapus Foto & Gunakan Inisial
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nama Lengkap"
                  required
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#93ABD9] text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Asal SMA
                </label>
                <input
                  type="text"
                  value={formData.highSchool}
                  onChange={e => setFormData({ ...formData, highSchool: e.target.value })}
                  placeholder="Contoh: SMAN 8 Jakarta"
                  required
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#93ABD9] text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Angkatan (Tahun Lulus)
                </label>
                <input
                  type="text"
                  value={formData.graduationYear}
                  onChange={e => setFormData({ ...formData, graduationYear: e.target.value })}
                  placeholder="Contoh: 2025"
                  required
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#93ABD9] text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <School className="w-4 h-4 text-[#93ABD9]" />
              <span>2. Informasi Target PTN Tujuan</span>
            </h2>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Jenis PTN
                </label>
                <div className="grid grid-cols-3 gap-2 max-w-md">
                  {(['Universitas', 'Institut', 'Politeknik'] as PtnType[]).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, ptnType: type })}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all text-center cursor-pointer ${
                        formData.ptnType === type
                          ? 'bg-[#F2619C] text-white border-[#F2619C] shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Nama PTN Tujuan
                  </label>
                  <input
                    type="text"
                    value={formData.targetUniv}
                    onChange={e => setFormData({ ...formData, targetUniv: e.target.value })}
                    placeholder="Contoh: Universitas Indonesia"
                    required
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#93ABD9] text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Fakultas Tujuan
                  </label>
                  <input
                    type="text"
                    value={formData.targetFaculty}
                    onChange={e => setFormData({ ...formData, targetFaculty: e.target.value })}
                    placeholder="Contoh: Fakultas Kedokteran"
                    required
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#93ABD9] text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Jurusan Tujuan
                  </label>
                  <input
                    type="text"
                    value={formData.targetMajor}
                    onChange={e => setFormData({ ...formData, targetMajor: e.target.value })}
                    placeholder="Contoh: Pendidikan Dokter"
                    required
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#93ABD9] text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-[#EDE986]" />
              <span>3. Target Skor & Passing Grade (TKA: Skala 200–800 · UTBK: Rentang 0–1000)</span>
            </h2>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Box TKA */}
              <div className="p-4 bg-[#93ABD9]/10 dark:bg-[#93ABD9]/15 border border-[#93ABD9]/30 rounded-xl space-y-3">
                <div className="text-xs font-bold text-[#6484c4] dark:text-[#93ABD9]">
                  Target & Passing Grade TKA (Skala 200–800)
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Target Skor TKA: <b className="font-mono text-slate-900 dark:text-white">{formData.targetScoreTKA}</b>
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="800"
                    step="5"
                    value={formData.targetScoreTKA}
                    onChange={e => setFormData({ ...formData, targetScoreTKA: Number(e.target.value) })}
                    className="w-full accent-[#93ABD9]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Passing Grade Skor TKA: <b className="font-mono text-slate-900 dark:text-white">{formData.passingGradeTKA}</b>
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="800"
                    step="5"
                    value={formData.passingGradeTKA}
                    onChange={e => setFormData({ ...formData, passingGradeTKA: Number(e.target.value) })}
                    className="w-full accent-[#93ABD9]"
                  />
                </div>
              </div>

              {/* Box UTBK */}
              <div className="p-4 bg-[#F2619C]/10 dark:bg-[#F2619C]/15 border border-[#F2619C]/30 rounded-xl space-y-3">
                <div className="text-xs font-bold text-[#F2619C]">
                  Target & Passing Grade UTBK (Rentang 0–1000)
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Target Skor UTBK: <b className="font-mono text-slate-900 dark:text-white">{formData.targetScoreUTBK}</b>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="5"
                    value={formData.targetScoreUTBK}
                    onChange={e => setFormData({ ...formData, targetScoreUTBK: Number(e.target.value) })}
                    className="w-full accent-[#F2619C]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Passing Grade Skor UTBK: <b className="font-mono text-slate-900 dark:text-white">{formData.passingGradeUTBK}</b>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="5"
                    value={formData.passingGradeUTBK}
                    onChange={e => setFormData({ ...formData, passingGradeUTBK: Number(e.target.value) })}
                    className="w-full accent-[#F2619C]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#F2619C] hover:bg-[#d84581] rounded-xl transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      ) : (
        /* View Showcase Mode */
        <div className="space-y-6">
          {/* Main Profile Overview Card */}
          <div className="bg-gradient-to-br from-[#2a3853] via-[#3a496e] to-[#48283e] border border-[#93ABD9]/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#F2619C]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <UserAvatar
                  name={profile.name}
                  avatarUrl={profile.avatarUrl}
                  size="2xl"
                  editable={true}
                  onAvatarChange={newUrl => onSaveProfile({ ...profile, avatarUrl: newUrl })}
                />
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#EDE986] uppercase tracking-wider">
                    <User className="w-4 h-4 text-[#EDE986]" />
                    <span>Profil Siswa</span>
                    <span className="text-[10px] font-normal text-slate-300 bg-white/10 px-2 py-0.5 rounded-full">
                      Klik kamera untuk ubah foto
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {profile.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200">
                    <span className="flex items-center gap-1">
                      <School className="w-3.5 h-3.5 text-[#93ABD9]" />
                      {profile.highSchool}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#E7BEF8]" />
                      Angkatan {profile.graduationYear}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-xs border border-[#E7BEF8]/30 p-4 rounded-2xl min-w-[240px]">
                <div className="text-[11px] font-bold uppercase text-[#EDE986]">
                  Target {profile.ptnType}
                </div>
                <div className="text-base font-bold text-white mt-0.5 truncate">
                  {profile.targetUniv}
                </div>
                <div className="text-xs text-slate-300 mt-1 truncate">
                  {profile.targetFaculty}
                </div>
                <div className="text-xs font-semibold text-[#E7BEF8] truncate">
                  {profile.targetMajor}
                </div>
              </div>
            </div>

            {/* Target & Passing Grade Row */}
            <div className="relative z-10 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                <div className="text-[11px] text-slate-300 font-medium">Target Skor TKA</div>
                <div className="text-2xl font-black font-mono text-[#EDE986] mt-1">
                  {profile.targetScoreTKA}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                <div className="text-[11px] text-slate-300 font-medium">Passing Grade TKA</div>
                <div className="text-2xl font-black font-mono text-[#93ABD9] mt-1">
                  {profile.passingGradeTKA}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                <div className="text-[11px] text-slate-300 font-medium">Target Skor UTBK</div>
                <div className="text-2xl font-black font-mono text-[#EDE986] mt-1">
                  {profile.targetScoreUTBK}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                <div className="text-[11px] text-slate-300 font-medium">Passing Grade UTBK</div>
                <div className="text-2xl font-black font-mono text-[#F2619C] mt-1">
                  {profile.passingGradeUTBK}
                </div>
              </div>
            </div>
          </div>

          {/* Pengukuran Kelayakan Menuju PTN */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F2619C]">
                <ShieldCheck className="w-4 h-4 text-[#F2619C]" />
                <span>Hasil Analisis Kelayakan Masuk PTN</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                Kesiapan Menuju {profile.targetMajor} ({profile.targetUniv})
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Evaluasi otomatis dihitung <b>hanya dari hasil simulasi Try Out resmi</b> (berwaktu), bukan dari latihan soal bebas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Analisis TKA */}
              <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#93ABD9]" />
                    <span>Jalur TKA (Skala 200–800)</span>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${statusTKA.color}`}>
                    {statusTKA.text}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                    <div className="text-slate-400 text-[10px]">Skor Kamu</div>
                    <div className="text-base font-bold font-mono text-[#93ABD9] mt-0.5">
                      {bestTKA !== null ? bestTKA.toFixed(2) : '-'}
                    </div>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                    <div className="text-slate-400 text-[10px]">Passing Grade</div>
                    <div className="text-base font-bold font-mono text-[#E7BEF8] mt-0.5">
                      {profile.passingGradeTKA}
                    </div>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                    <div className="text-slate-400 text-[10px]">Target Skor</div>
                    <div className="text-base font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                      {profile.targetScoreTKA}
                    </div>
                  </div>
                </div>

                {/* Progress Visual */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Progres Terhadap Passing Grade:</span>
                    <span className="font-mono font-bold">
                      {bestTKA !== null
                        ? `${bestTKA >= profile.passingGradeTKA ? '+' : ''}${(bestTKA - profile.passingGradeTKA).toFixed(2)} poin`
                        : 'Belum pernah try out resmi'}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        bestTKA && bestTKA >= profile.targetScoreTKA
                          ? 'bg-[#EDE986]'
                          : bestTKA && bestTKA >= profile.passingGradeTKA
                          ? 'bg-[#93ABD9]'
                          : 'bg-[#E7BEF8]'
                      }`}
                      style={{
                        width: `${bestTKA !== null ? Math.min(100, Math.max(5, (bestTKA / profile.targetScoreTKA) * 100)) : 0}%`
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Analisis UTBK */}
              <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#F2619C]" />
                    <span>Jalur UTBK (Rentang 0–1000)</span>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${statusUTBK.color}`}>
                    {statusUTBK.text}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                    <div className="text-slate-400 text-[10px]">Skor Kamu</div>
                    <div className="text-base font-bold font-mono text-[#F2619C] mt-0.5">
                      {bestUTBK !== null ? bestUTBK.toFixed(2) : '-'}
                    </div>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                    <div className="text-slate-400 text-[10px]">Passing Grade</div>
                    <div className="text-base font-bold font-mono text-[#F2619C] mt-0.5">
                      {profile.passingGradeUTBK}
                    </div>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                    <div className="text-slate-400 text-[10px]">Target Skor</div>
                    <div className="text-base font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                      {profile.targetScoreUTBK}
                    </div>
                  </div>
                </div>

                {/* Progress Visual */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Progres Terhadap Passing Grade:</span>
                    <span className="font-mono font-bold">
                      {bestUTBK !== null
                        ? `${bestUTBK >= profile.passingGradeUTBK ? '+' : ''}${(bestUTBK - profile.passingGradeUTBK).toFixed(2)} poin`
                        : 'Belum tryout'}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        bestUTBK && bestUTBK >= profile.targetScoreUTBK
                          ? 'bg-[#EDE986]'
                          : bestUTBK && bestUTBK >= profile.passingGradeUTBK
                          ? 'bg-[#F2619C]'
                          : 'bg-[#93ABD9]'
                      }`}
                      style={{
                        width: `${Math.min(100, Math.max(5, ((bestUTBK || 0) / profile.targetScoreUTBK) * 100))}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cloud Account & Multi-Device Sync Section */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#93ABD9]/25 to-[#F2619C]/25 text-[#F2619C]">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Sinkronisasi Akun & Multi-Device</span>
                    {currentUser ? (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                        {isSyncing ? 'Menyinkronkan...' : 'Terhubung ke Google'}
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800">
                        Mode Lokal (Belum Masuk)
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {currentUser
                      ? `Semua nilai tryout dan profil tersimpan otomatis di cloud Firestore untuk email: ${currentUser.email}`
                      : 'Masuk dengan Google agar nilai tryout dan progres Anda tidak hilang dan dapat dibuka di HP atau laptop lain.'}
                  </p>
                </div>
              </div>

              {onOpenAuthModal && (
                <button
                  type="button"
                  onClick={onOpenAuthModal}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                    currentUser
                      ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                      : 'bg-[#F2619C] hover:bg-[#d84581] text-white shadow-xs'
                  }`}
                >
                  {currentUser ? (
                    <>
                      <Cloud className="w-4 h-4 text-emerald-500" />
                      <span>Kelola Akun / Keluar</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Masuk dengan Google</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <Laptop className="w-4 h-4 text-[#93ABD9] shrink-0" />
                <div className="text-[11px] text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Laptop / Komputer:</span> Kerjakan CBT dengan tampilan penuh layaknya ujian resmi.
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-[#F2619C] shrink-0" />
                <div className="text-[11px] text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Smartphone / Tablet:</span> Cek riwayat nilai, evaluasi pembahasan soal, dan target PTN kapan saja.
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
