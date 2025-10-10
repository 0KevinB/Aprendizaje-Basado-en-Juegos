'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Fase1RioSagrado } from '@/components/missions/india/Fase1RioSagrado';
import { Fase2ConsejoLoto } from '@/components/missions/india/Fase2ConsejoLoto';
import { Fase3AjedrezSabios } from '@/components/missions/india/Fase3AjedrezSabios';
import { Fase4SabiosIndo } from '@/components/missions/india/Fase4SabiosIndo';

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
        const progressRef = doc(db, 'userProgress', user.uid, 'empires', 'india');
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
      const progressRef = doc(db, 'userProgress', user.uid, 'empires', 'india');
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
          empireId: 'india',
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
        router.push('/imperios/india/misiones');
      }, 2000);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handlePartialProgress = async (progress: number, partialData?: Record<string, unknown>) => {
    if (!user) return;

    try {
      const progressRef = doc(db, 'userProgress', user.uid, 'empires', 'india');
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
          empireId: 'india',
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
        <div className="text-6xl animate-glow">🕉️</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#faf9f7] to-[#E6D5B8] py-8">
      {missionId === 'rio-sagrado' && (
        <Fase1RioSagrado
          onComplete={(data) => {
            handleComplete(data.score, {
              matchedPairs: data.matchedPairs,
              totalPairs: data.totalPairs,
            });
          }}
          onProgressUpdate={(progress, data) => {
            handlePartialProgress(progress, data);
          }}
          savedProgress={savedProgress}
        />
      )}

      {missionId === 'consejo-loto' && (
        <Fase2ConsejoLoto
          onComplete={(score) => {
            handleComplete(score);
          }}
          onProgressUpdate={(progress, data) => {
            handlePartialProgress(progress, data);
          }}
          savedProgress={savedProgress}
        />
      )}

      {missionId === 'ajedrez-sabios' && (
        <Fase3AjedrezSabios
          onComplete={(score) => {
            handleComplete(score);
          }}
          onProgressUpdate={(progress, data) => {
            handlePartialProgress(progress, data);
          }}
          savedProgress={savedProgress}
        />
      )}

      {missionId === 'sabios-indo' && (
        <Fase4SabiosIndo
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
