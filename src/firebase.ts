import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  signOut, 
  GoogleAuthProvider, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  deleteDoc, 
  getDocFromServer,
  writeBatch
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { CandidateProfile, TryoutResult } from './data/types';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); /* CRITICAL: The app will break without this line */
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection on boot
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

/**
 * Sign in using Google Popup
 */
export async function signInWithGoogle(): Promise<FirebaseUser> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

/**
 * Sign out current user
 */
export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Listen to auth state changes
 */
export function subscribeToAuth(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Save candidate profile to Firestore
 */
export async function syncProfileToFirestore(userId: string, profile: CandidateProfile): Promise<void> {
  const path = `users/${userId}`;
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, {
      userId,
      name: profile.name || 'Calon Mahasiswa',
      highSchool: profile.highSchool || '',
      graduationYear: profile.graduationYear || '2025',
      avatarUrl: profile.avatarUrl || null,
      ptnType: profile.ptnType || 'Universitas',
      targetUniv: profile.targetUniv || '',
      targetFaculty: profile.targetFaculty || '',
      targetMajor: profile.targetMajor || '',
      targetScoreTKA: profile.targetScoreTKA ?? 720,
      targetScoreUTBK: profile.targetScoreUTBK ?? 780,
      passingGradeTKA: profile.passingGradeTKA ?? 680,
      passingGradeUTBK: profile.passingGradeUTBK ?? 720,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

/**
 * Load candidate profile from Firestore
 */
export async function fetchProfileFromFirestore(userId: string): Promise<Partial<CandidateProfile> | null> {
  const path = `users/${userId}`;
  try {
    const userDocRef = doc(db, 'users', userId);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data() as Partial<CandidateProfile>;
    }
    return null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path);
  }
}

/**
 * Save a single Tryout result to Firestore subcollection
 */
export async function syncTryoutResultToFirestore(userId: string, result: TryoutResult): Promise<void> {
  const safeId = result.id.replace(/[^a-zA-Z0-9_-]/g, '_');
  const path = `users/${userId}/history/${safeId}`;
  try {
    const itemDocRef = doc(db, 'users', userId, 'history', safeId);
    await setDoc(itemDocRef, {
      id: safeId,
      userId,
      subjectId: result.subjectId,
      subjectName: result.subjectName,
      examCategory: result.examCategory,
      mode: result.mode,
      score: result.score,
      category: result.category,
      date: result.date,
      timestamp: result.timestamp,
      totalQuestions: result.totalQuestions,
      correctCount: result.correctCount,
      partialCount: result.partialCount,
      wrongCount: result.wrongCount,
      timeSpentSeconds: result.timeSpentSeconds,
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

/**
 * Fetch all tryout history for the user from Firestore
 */
export async function fetchHistoryFromFirestore(userId: string): Promise<TryoutResult[]> {
  const path = `users/${userId}/history`;
  try {
    const historyColRef = collection(db, 'users', userId, 'history');
    const snap = await getDocs(historyColRef);
    const results: TryoutResult[] = [];
    snap.forEach((d) => {
      const data = d.data();
      results.push({
        id: data.id || d.id,
        subjectId: data.subjectId || 'mat',
        subjectName: data.subjectName || 'Matematika Wajib',
        examCategory: data.examCategory || 'TKA',
        mode: data.mode || 'timed',
        score: data.score || 500,
        category: data.category || 'Memadai',
        date: data.date || '',
        timestamp: data.timestamp || Date.now(),
        totalQuestions: data.totalQuestions || 25,
        correctCount: data.correctCount || 0,
        partialCount: data.partialCount || 0,
        wrongCount: data.wrongCount || 0,
        answers: {},
        flagged: {},
        evaluations: [],
        timeSpentSeconds: data.timeSpentSeconds || 0,
        candidateName: ''
      });
    });
    return results;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

/**
 * Delete a specific history entry from Firestore
 */
export async function deleteHistoryItemFromFirestore(userId: string, historyId: string): Promise<void> {
  const safeId = historyId.replace(/[^a-zA-Z0-9_-]/g, '_');
  const path = `users/${userId}/history/${safeId}`;
  try {
    await deleteDoc(doc(db, 'users', userId, 'history', safeId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

/**
 * Clear all history entries for user from Firestore
 */
export async function clearAllHistoryFromFirestore(userId: string): Promise<void> {
  const path = `users/${userId}/history`;
  try {
    const historyColRef = collection(db, 'users', userId, 'history');
    const snap = await getDocs(historyColRef);
    const batch = writeBatch(db);
    snap.forEach(d => {
      batch.delete(d.ref);
    });
    await batch.commit();
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}
