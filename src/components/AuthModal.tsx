import React, { useState } from 'react';
import { X, Cloud, Smartphone, Laptop, CheckCircle2, AlertCircle, LogOut } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { signInWithGoogle, signOutUser } from '../firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: FirebaseUser | null;
  onAuthSuccess?: (user: FirebaseUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAuthSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await signInWithGoogle();
      if (onAuthSuccess) onAuthSuccess(user);
      onClose();
    } catch (err: unknown) {
      console.error('Login error:', err);
      const msg = err instanceof Error ? err.message : 'Gagal masuk dengan Google';
      if (msg.includes('popup-closed-by-user')) {
        setError('Jendela masuk ditutup sebelum proses selesai. Silakan coba lagi.');
      } else {
        setError('Terjadi kendala saat menghubungkan akun. Silakan coba beberapa saat lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOutUser();
      onClose();
    } catch (err) {
      console.error('Sign out error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 space-y-6 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-44 h-44 rounded-full bg-gradient-to-br from-[#E7BEF8]/40 to-[#F2619C]/20 blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {currentUser ? (
          /* User is already logged in */
          <div className="space-y-6 pt-2">
            <div className="flex items-center gap-4">
              {currentUser.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt={currentUser.displayName || 'Akun'} 
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#F2619C]/40 shadow-sm"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#93ABD9] to-[#F2619C] text-white font-bold flex items-center justify-center text-xl shadow-sm">
                  {currentUser.displayName ? currentUser.displayName[0] : 'U'}
                </div>
              )}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Akun Terhubung & Tersinkronisasi</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white truncate max-w-[220px]">
                  {currentUser.displayName || 'Pengguna'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[220px]">
                  {currentUser.email}
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                <Cloud className="w-4 h-4 text-[#93ABD9]" />
                <span>Sinkronisasi Multi-Device Aktif</span>
              </div>
              <p className="leading-relaxed text-[11px] text-slate-500 dark:text-slate-400">
                Semua hasil tryout resmi, statistik TKA, profil, dan target jurusan Anda tersimpan di cloud database Firestore dan akan otomatis sinkron saat membuka web ini di laptop atau ponsel lain.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              >
                Selesai
              </button>
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="py-2.5 px-4 text-xs font-semibold rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{loading ? 'Keluar...' : 'Keluar Akun'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* User is NOT logged in */
          <div className="space-y-6 pt-2">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E7BEF8]/30 dark:bg-[#E7BEF8]/15 text-[#93ABD9] dark:text-[#E7BEF8] text-[11px] font-bold uppercase tracking-wider">
                <Cloud className="w-3 h-3 text-[#F2619C]" />
                <span>Cloud Multi-Device Sync</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Masuk untuk Simpan Progres
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Gunakan akun Google agar nilai Try Out, statistik grafik TKA, dan target kampus tetap tersimpan saat Anda berpindah device (HP, tablet, atau laptop).
              </p>
            </div>

            {/* Cross-device illustration features */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
                <div className="p-1.5 bg-[#93ABD9]/15 text-[#93ABD9] rounded-lg">
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Laptop / PC</h4>
                  <p className="text-[10px] text-slate-500">CBT & Evaluasi Detail</p>
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
                <div className="p-1.5 bg-[#F2619C]/15 text-[#F2619C] rounded-lg">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">HP / Tablet</h4>
                  <p className="text-[10px] text-slate-500">Latihan Cepat & Review</p>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-3 pt-1">
              <button
                onClick={handleSignIn}
                disabled={loading}
                className="w-full py-3 px-4 bg-[#F2619C] hover:bg-[#d84581] text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 cursor-pointer text-xs disabled:opacity-60"
              >
                {/* Google G SVG */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#EDE986" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#ffffff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EDE986" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>{loading ? 'Menghubungkan...' : 'Lanjutkan dengan Google'}</span>
              </button>

              <p className="text-center text-[10px] text-slate-400">
                Data Anda aman dan terlindungi secara privat di Google Firebase.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
