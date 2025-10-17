'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Fase1MandatoCielo } from '@/components/missions/china/Fase1MandatoCielo';
import { Fase2ConsejoDragon } from '@/components/missions/china/Fase2ConsejoDragon';
import { Fase3SecretosGranMuralla } from '@/components/missions/china/Fase3SecretosGranMuralla';
import { Fase4GoImperio } from '@/components/missions/china/Fase4GoImperio';

export default function JuegoPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const missionId = params.missionId as string;
  const [savedProgress, setSavedProgress] = useState<Record<string, unknown> | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }

    // Load saved progress
    const loadSavedProgress = async () => {
      try {
        const progressRef = doc(db, 'userProgress', user.uid, 'empires', 'china');
        const progressDoc = await getDoc(progressRef);

        if (progressDoc.exists()) {
          const data = progressDoc.data();
          const missionProgress = data.missionProgress?.[missionId];

          if (missionProgress && !missionProgress.completed) {
            setSavedProgress(missionProgress);
          }
        }
      } catch (error) {
        console.error('Error loading saved progress:', error);
      } finally {
        setLoadingProgress(false);
      }
    };

    loadSavedProgress();
  }, [user, router, missionId]);

  const handleComplete = async (score: number, extraData?: Record<string, unknown>) => {
    if (!user) return;

    try {
      // New Firebase path for empire-specific progress
      const progressRef = doc(db, 'userProgress', user.uid, 'empires', 'china');
      const progressDoc = await getDoc(progressRef);

      if (progressDoc.exists()) {
        const currentProgress = progressDoc.data();
        const totalPoints = (currentProgress.totalPoints || 0) + score;
        const completedMissions = currentProgress.completedMissions || [];

        if (!completedMissions.includes(missionId)) {
          completedMissions.push(missionId);
        }

        const missionProgress = currentProgress.missionProgress || {};
        missionProgress[missionId] = {
          missionId,
          progress: 100,
          completed: true,
          score: Math.max(missionProgress[missionId]?.score || 0, score),
          attempts: (missionProgress[missionId]?.attempts || 0) + 1,
          lastAttempt: new Date(),
          ...extraData,
        };

        await updateDoc(progressRef, {
          totalPoints,
          completedMissions,
          missionProgress,
          lastUpdated: new Date(),
        });
      } else {
        // Create initial progress
        await setDoc(progressRef, {
          userId: user.uid,
          empireId: 'china',
          totalPoints: score,
          completedMissions: [missionId],
          currentLevel: 'Iniciado',
          achievements: [],
          missionProgress: {
            [missionId]: {
              missionId,
              progress: 100,
              completed: true,
              score,
              attempts: 1,
              lastAttempt: new Date(),
              ...extraData,
            },
          },
          createdAt: new Date(),
          lastUpdated: new Date(),
        });
      }

      // Redirect to missions page
      setTimeout(() => {
        router.push('/imperios/china/misiones');
      }, 2000);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handlePartialProgress = async (progress: number, partialData?: Record<string, unknown>) => {
    if (!user) return;

    try {
      const progressRef = doc(db, 'userProgress', user.uid, 'empires', 'china');
      const progressDoc = await getDoc(progressRef);

      if (progressDoc.exists()) {
        const currentProgress = progressDoc.data();
        const missionProgress = currentProgress.missionProgress || {};

        // Only update if progress is greater than current saved progress
        const currentMissionProgress = missionProgress[missionId]?.progress || 0;
        if (progress > currentMissionProgress || !missionProgress[missionId]?.completed) {
          missionProgress[missionId] = {
            missionId,
            progress,
            completed: false,
            score: missionProgress[missionId]?.score || 0,
            attempts: missionProgress[missionId]?.attempts || 0,
            lastAttempt: new Date(),
            ...partialData,
          };

          await updateDoc(progressRef, {
            missionProgress,
            lastUpdated: new Date(),
          });
        }
      } else {
        // Create initial progress with partial data
        await setDoc(progressRef, {
          userId: user.uid,
          empireId: 'china',
          totalPoints: 0,
          completedMissions: [],
          currentLevel: 'Iniciado',
          achievements: [],
          missionProgress: {
            [missionId]: {
              missionId,
              progress,
              completed: false,
              score: 0,
              attempts: 0,
              lastAttempt: new Date(),
              ...partialData,
            },
          },
          createdAt: new Date(),
          lastUpdated: new Date(),
        });
      }
    } catch (error) {
      console.error('Error saving partial progress:', error);
    }
  };

  if (!user || loadingProgress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-6xl animate-glow">🐉</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#faf9f7] to-[#E6D5B8] py-8">
      {missionId === 'mandato-cielo' && (
        <Fase1MandatoCielo
          onComplete={(data) => {
            handleComplete(data.score, {
              correctSelections: data.correctSelections,
              totalCorrect: data.totalCorrect,
            });
          }}
          onProgressUpdate={(progress, data) => {
            handlePartialProgress(progress, data);
          }}
          savedProgress={savedProgress}
        />
      )}

      {missionId === 'consejo-dragon' && (
        <Fase2ConsejoDragon
          onComplete={(score) => {
            handleComplete(score);
          }}
          onProgressUpdate={(progress, data) => {
            handlePartialProgress(progress, data);
          }}
          savedProgress={savedProgress}
        />
      )}

      {missionId === 'secretos-gran-muralla' && (
        <Fase3SecretosGranMuralla
          onComplete={(score) => {
            handleComplete(score);
          }}
          onProgressUpdate={(progress, data) => {
            handlePartialProgress(progress, data);
          }}
          savedProgress={savedProgress}
        />
      )}

      {missionId === 'go-imperio' && (
        <Fase4GoImperio
          onComplete={(score) => {
            handleComplete(score);
          }}
          onProgressUpdate={(progress, data) => {
            handlePartialProgress(progress, data);
          }}
          savedProgress={savedProgress}
        />
      )}
    </main>
  );
}
