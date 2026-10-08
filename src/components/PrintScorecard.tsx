import React from 'react';
import { TryoutResult, CandidateProfile } from '../data/types';
import { formatTime } from '../utils/scoring';
import { ArrowLeft, Printer } from 'lucide-react';

interface PrintScorecardProps {
  result: TryoutResult;
  profile: CandidateProfile;
  onClose: () => void;
}

export const PrintScorecard: React.FC<PrintScorecardProps> = ({
  result,
  profile,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  // Group by topic
  const topicMap: Record<string, { total: number; correct: number }> = {};
  result.evaluations.forEach(ev => {
    const t = ev.topic || 'Umum';
    if (!topicMap[t]) topicMap[t] = { total: 0, correct: 0 };
    topicMap[t].total += 1;
    if (ev.isFullyCorrect) topicMap[t].correct += 1;
  });

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 font-sans text-slate-900">
      {/* Top action bar (hidden during print) */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between no-print">
        <button
          onClick={onClose}
          className="px-4 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Evaluasi</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-5 py-2 text-xs font-semibold bg-[#F2619C] hover:bg-[#d84581] text-white rounded-xl transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Sekarang / Simpan PDF</span>
        </button>
      </div>

      {/* Official Scorecard Paper */}
      <div className="max-w-3xl mx-auto bg-white border border-slate-300 rounded-xl p-8 sm:p-10 shadow-lg print:shadow-none print:border-none print:p-0">
        {/* Header */}
        <div className="border-b-2 border-slate-800 pb-5 text-center">
          <div className="text-xs font-bold tracking-widest uppercase text-slate-500">
            MY TRYOUT · SISTEM PENGUKURAN KELAYAKAN MENUJU PTN
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 mt-1">
            RAPOR HASIL TRYOUT RESMI CBT
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Sistem Penilaian Resmi Skala Item Response Theory (IRT)
          </p>
        </div>

        {/* Candidate & Exam Metadata */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-xs border border-slate-200 rounded-xl p-4 bg-slate-50/50">
          <div className="space-y-1.5">
            <div>
              <span className="text-slate-500">Nama Peserta:</span>{' '}
              <b className="text-slate-900">{result.candidateName || profile.name}</b>
            </div>
            <div>
              <span className="text-slate-500">Asal SMA & Angkatan:</span>{' '}
              <span className="text-slate-800">{profile.highSchool} ({profile.graduationYear})</span>
            </div>
            <div>
              <span className="text-slate-500">Mata Uji & Rumpun:</span>{' '}
              <b className="text-slate-900">{result.subjectName} ({result.examCategory})</b>
            </div>
          </div>
          <div className="space-y-1.5">
            <div>
              <span className="text-slate-500">Target {profile.ptnType}:</span>{' '}
              <b className="text-slate-900">{profile.targetUniv}</b>
            </div>
            <div>
              <span className="text-slate-500">Fakultas & Jurusan:</span>{' '}
              <span className="text-slate-800">{profile.targetFaculty} — {profile.targetMajor}</span>
            </div>
            <div>
              <span className="text-slate-500">Target & Passing Grade ({result.examCategory}):</span>{' '}
              <span className="text-slate-800 font-mono">
                Target: {result.examCategory === 'TKA' ? profile.targetScoreTKA : profile.targetScoreUTBK} · 
                Passing: {result.examCategory === 'TKA' ? profile.passingGradeTKA : profile.passingGradeUTBK}
              </span>
            </div>
          </div>
        </div>

        {/* Primary Score Box */}
        <div className="mt-6 border border-slate-200 rounded-xl p-6 bg-[#93ABD9]/10 text-center space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            SKOR AKHIR IRT ({result.examCategory === 'UTBK' ? 'RENTANG 0 - 1000' : 'SKALA 200 - 800'})
          </div>
          <div className="text-5xl font-black font-mono text-[#F2619C]">
            {result.score.toFixed(2)}
          </div>
          <div className="flex items-center justify-center gap-3 text-xs font-semibold">
            <span className="bg-[#93ABD9]/20 text-[#3f5787] px-3 py-1 rounded-md">
              Kategori: {result.category}
            </span>
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-md">
              {result.mode === 'timed' ? 'Try Out Resmi' : 'Latihan Mandiri'}
            </span>
            {result.score >= (result.examCategory === 'UTBK' ? 800 : 725) && (
              <span className="bg-[#EDE986] text-amber-900 px-3 py-1 rounded-md">
                🏆 Predikat Istimewa
              </span>
            )}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mt-6 grid grid-cols-4 gap-3 text-center text-xs">
          <div className="p-3 border border-slate-200 rounded-lg">
            <div className="text-slate-500">Total Soal</div>
            <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">{result.totalQuestions}</div>
          </div>
          <div className="p-3 border border-slate-200 rounded-lg">
            <div className="text-slate-500">Benar Penuh</div>
            <div className="text-lg font-bold font-mono text-emerald-700 mt-0.5">{result.correctCount}</div>
          </div>
          <div className="p-3 border border-slate-200 rounded-lg">
            <div className="text-slate-500">Benar Parsial</div>
            <div className="text-lg font-bold font-mono text-amber-700 mt-0.5">{result.partialCount}</div>
          </div>
          <div className="p-3 border border-slate-200 rounded-lg">
            <div className="text-slate-500">Salah / Kosong</div>
            <div className="text-lg font-bold font-mono text-rose-700 mt-0.5">{result.wrongCount}</div>
          </div>
        </div>

        {/* Topic Mastery Breakdown */}
        <div className="mt-6">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
            Rincian Penguasaan Berdasarkan Topik
          </h3>
          <table className="w-full text-xs text-left border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="p-2.5 font-bold">Topik / Submateri</th>
                <th className="p-2.5 font-bold text-center">Jumlah Soal</th>
                <th className="p-2.5 font-bold text-center">Jawaban Benar</th>
                <th className="p-2.5 font-bold text-right">Persentase</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {Object.entries(topicMap).map(([topic, stat], idx) => {
                const pct = Math.round((stat.correct / stat.total) * 100);
                return (
                  <tr key={idx}>
                    <td className="p-2.5 font-medium">{topic}</td>
                    <td className="p-2.5 text-center font-mono">{stat.total}</td>
                    <td className="p-2.5 text-center font-mono">{stat.correct}</td>
                    <td className="p-2.5 text-right font-mono font-bold">
                      {pct}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Signatures & Notes */}
        <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs text-slate-600">
          <div>
            <div className="font-bold text-slate-900 mb-1">Catatan Evaluasi:</div>
            <p className="leading-relaxed">
              Skor IRT merefleksikan tingkat kesulitan tiap butir soal. Pertahankan metode review berbasis <i>spaced repetition</i> untuk butir soal yang belum tuntas.
            </p>
          </div>
          <div className="text-right space-y-12">
            <div>Dicetak secara digital oleh Sistem Tryout INTEN CBT</div>
            <div className="font-bold text-slate-900">Verifikator Ujian Mandiri</div>
          </div>
        </div>
      </div>
    </div>
  );
};
