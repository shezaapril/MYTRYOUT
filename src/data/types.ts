export type QuestionType = 's' | 'tf' | 'm';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  topic: string;
  passageIndex?: number;
  passage?: string; // Teks bacaan lengkap yang disematkan langsung di setiap butir soal literasi
  passageTitle?: string; // Judul wacana/teks bacaan
  explanation?: string;
  image?: string; // URL atau base64 gambar pendukung soal
  imageAlt?: string; // Deskripsi/teks alternatif gambar
  diagramSvg?: string; // Diagram/ilustrasi visual geometris berbasis SVG
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: 's';
  options: string[];
  correctAnswer: number;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'tf';
  statements: string[];
  correctAnswers: number[]; // 1 for True, 0 for False
}

export interface MultiSelectQuestion extends BaseQuestion {
  type: 'm';
  options: string[];
  correctAnswers: number[]; // Array of correct option indices
}

export type Question = SingleChoiceQuestion | TrueFalseQuestion | MultiSelectQuestion;

export type UserAnswer = number | number[] | null;

export type ExamCategory = 'TKA' | 'UTBK';

export interface Subject {
  id: 'mat' | 'ind' | 'eng';
  name: string;
  category: ExamCategory; // TKA or UTBK
  durationMinutes: number;
  questions: Question[];
  passages: string[];
}

export interface QuestionEvaluation {
  isFullyCorrect: boolean;
  creditScore: number;
  keyDisplay: string;
  userDisplay: string;
  topic: string;
  flagged?: boolean;
}

export interface TryoutResult {
  id: string;
  subjectId: 'mat' | 'ind' | 'eng';
  subjectName: string;
  examCategory: ExamCategory; // 'TKA' or 'UTBK'
  mode: 'timed' | 'practice'; // 'timed' = Try Out Resmi, 'practice' = Latihan Soal
  score: number; // IRT score: TKA (200 - 800) or UTBK (0 - 1000)
  category: 'Baik' | 'Memadai' | 'Kurang';
  date: string;
  timestamp: number;
  totalQuestions: number;
  correctCount: number;
  partialCount: number;
  wrongCount: number;
  answers: Record<number, UserAnswer>;
  flagged: Record<number, boolean>;
  evaluations: QuestionEvaluation[];
  timeSpentSeconds: number;
  candidateName?: string;
}

export type PtnType = 'Universitas' | 'Institut' | 'Politeknik';

export interface CandidateProfile {
  // Informasi Pengguna
  name: string;
  highSchool: string; // Asal SMA
  graduationYear: string; // Angkatan
  avatarUrl?: string | null; // Foto Profil Pengguna (Base64 atau URL)

  // Target PTN
  ptnType: PtnType; // Politeknik, Institut, Universitas
  targetUniv: string; // Nama PTN Tujuan
  targetFaculty: string; // Fakultas Tujuan
  targetMajor: string; // Jurusan Tujuan

  // Target Skor
  targetScoreTKA: number;
  targetScoreUTBK: number;

  // Passing Grade Skor
  passingGradeTKA: number;
  passingGradeUTBK: number;
}
