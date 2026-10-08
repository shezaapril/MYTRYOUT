import { Question, UserAnswer, QuestionEvaluation, ExamCategory } from '../data/types';

export const LETTERS = ['A', 'B', 'C', 'D', 'E'];

/**
 * Calculates credit score for a question (0 to 1)
 */
export function calculateCredit(q: Question, ans: UserAnswer | undefined): number {
  if (ans === undefined || ans === null) return 0;

  if (q.type === 's') {
    return ans === q.correctAnswer ? 1 : 0;
  }

  if (q.type === 'm') {
    if (!Array.isArray(ans)) return 0;
    const correctArr = q.correctAnswers;
    const hits = ans.filter(idx => correctArr.includes(idx)).length;
    const wrong = ans.length - hits;
    return Math.max(0, (hits - wrong) / correctArr.length);
  }

  if (q.type === 'tf') {
    if (!Array.isArray(ans)) return 0;
    let match = 0;
    q.correctAnswers.forEach((val, i) => {
      if (ans[i] === val) match++;
    });
    return match / q.correctAnswers.length;
  }

  return 0;
}

/**
 * Item Response Theory (IRT) estimation algorithm
 * - TKA: Skala 200 - 800 (INTEN model, mean 500, sd 100)
 * - UTBK: Rentang 0 - 1000 (Standar Resmi UTBK SNPMB / BP3, mean 500, sd 150)
 */
export function calculateIRTScore(
  totalItems: number, 
  credits: number[], 
  examCategory: ExamCategory = 'TKA'
): number {
  const grid: [number, number][] = [];
  let totalWeight = 0;
  let totalScoreWeighted = 0;

  // Numerical integration over theta in [-3, 3]
  for (let theta = -3.0; theta <= 3.001; theta += 0.1) {
    let logLikelihood = -(theta * theta) / 8; // Prior normal distribution

    credits.forEach((credit, i) => {
      // 2PL parameter heuristics
      const b = -1.7 + (3.4 * ((i * 7) % totalItems)) / totalItems; // Difficulty
      const a = 0.8 + ((i * 3) % 5) * 0.2; // Discrimination
      const p = Math.min(0.999, Math.max(0.001, 1 / (1 + Math.exp(-a * (theta - b)))));

      logLikelihood += credit * Math.log(p) + (1 - credit) * Math.log(1 - p);
    });

    grid.push([theta, logLikelihood]);
  }

  const maxLogLikelihood = Math.max(...grid.map(v => v[1]));

  grid.forEach(([theta, logL]) => {
    const weight = Math.exp(logL - maxLogLikelihood);
    totalWeight += weight;
    totalScoreWeighted += weight * theta;
  });

  const estimatedTheta = totalWeight > 0 ? totalScoreWeighted / totalWeight : 0;

  if (examCategory === 'UTBK') {
    // UTBK Scale: 0 - 1000
    const rawScore = 500 + 150 * estimatedTheta;
    const clamped = Math.max(0, Math.min(1000, rawScore));
    return Math.round(clamped * 100) / 100;
  } else {
    // TKA Scale: 200 - 800
    const rawScore = 500 + 100 * estimatedTheta;
    const clamped = Math.max(200, Math.min(800, rawScore));
    return Math.round(clamped * 100) / 100;
  }
}

/**
 * Returns Category based on standard
 * - TKA: >= 641 Baik, >= 481 Memadai, < 481 Kurang
 * - UTBK (0-1000): >= 700 Baik, >= 550 Memadai, < 550 Kurang
 */
export function getCategory(score: number, examCategory: ExamCategory = 'TKA'): 'Baik' | 'Memadai' | 'Kurang' {
  if (examCategory === 'UTBK') {
    if (score >= 700) return 'Baik';
    if (score >= 550) return 'Memadai';
    return 'Kurang';
  } else {
    if (score >= 641) return 'Baik';
    if (score >= 481) return 'Memadai';
    return 'Kurang';
  }
}

/**
 * Estimates national percentile from IRT score
 */
export function estimatePercentile(score: number, examCategory: ExamCategory = 'TKA'): number {
  const sd = examCategory === 'UTBK' ? 150 : 100;
  const z = (score - 500) / sd;
  // Approximation of standard normal CDF
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  const cdf = z >= 0 ? 1 - p : p;
  return Math.min(99.9, Math.max(0.1, Math.round(cdf * 1000) / 10));
}

/**
 * Convert correct key to human-readable string
 */
export function formatAnswerKey(q: Question): string {
  if (q.type === 's') {
    return LETTERS[q.correctAnswer] || '-';
  }
  if (q.type === 'm') {
    return q.correctAnswers.map(idx => LETTERS[idx]).sort().join(', ');
  }
  if (q.type === 'tf') {
    return q.correctAnswers.map(v => (v === 1 ? 'B' : 'S')).join(' - ');
  }
  return '-';
}

/**
 * Convert user answer to human-readable string
 */
export function formatUserAnswer(q: Question, ans: UserAnswer | undefined): string {
  if (ans === undefined || ans === null) return 'Kosong';

  if (q.type === 's') {
    if (typeof ans === 'number') {
      return LETTERS[ans] || 'Kosong';
    }
    return 'Kosong';
  }

  if (q.type === 'm') {
    if (Array.isArray(ans) && ans.length > 0) {
      return ans.map(idx => LETTERS[idx]).sort().join(', ');
    }
    return 'Kosong';
  }

  if (q.type === 'tf') {
    if (Array.isArray(ans)) {
      return ans.map(v => (v === 1 ? 'B' : v === 0 ? 'S' : '?')).join(' - ');
    }
    return 'Kosong';
  }

  return 'Kosong';
}

/**
 * Format seconds into mm:ss
 */
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}
