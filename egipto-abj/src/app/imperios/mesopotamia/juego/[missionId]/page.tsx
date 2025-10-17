'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Fase1MapaRios } from '@/components/missions/mesopotamia/Fase1MapaRios';
import { Fase2GuardianesSaber } from '@/components/missions/mesopotamia/Fase2GuardianesSaber';
import { Fase3LineaTiempo } from '@/components/missions/mesopotamia/Fase3LineaTiempo';
import { Fase4LegadoEterno } from '@/components/missions/mesopotamia/Fase4LegadoEterno';

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
        const progressRef = doc(db, 'userProgress', user.uid, 'empires', 'mesopotamia');
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

  const handleComplete = async (data: { score: number; correctAnswers: number; totalQuestions: number }) => {
    if (!user) return;

    try {
      // New Firebase path for empire-specific progress
      const progressRef = doc(db, 'userProgress', user.uid, 'empires', 'mesopotamia');
      const progressDoc = await getDoc(progressRef);

      if (progressDoc.exists()) {
        const currentProgress = progressDoc.data();
        const totalPoints = (currentProgress.totalPoints || 0) + data.score;
        const completedMissions = currentProgress.completedMissions || [];

        if (!completedMissions.includes(missionId)) {
          completedMissions.push(missionId);
        }

        const missionProgress = currentProgress.missionProgress || {};
        missionProgress[missionId] = {
          missionId,
          progress: 100,
          completed: true,
          score: Math.max(missionProgress[missionId]?.score || 0, data.score),
          attempts: (missionProgress[missionId]?.attempts || 0) + 1,
          lastAttempt: new Date(),
          correctAnswers: data.correctAnswers,
          totalQuestions: data.totalQuestions,
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
          empireId: 'mesopotamia',
          totalPoints: data.score,
          completedMissions: [missionId],
          currentLevel: 'Iniciado',
          achievements: [],
          missionProgress: {
            [missionId]: {
              missionId,
              progress: 100,
              completed: true,
              score: data.score,
              attempts: 1,
              lastAttempt: new Date(),
              correctAnswers: data.correctAnswers,
              totalQuestions: data.totalQuestions,
            },
          },
          createdAt: new Date(),
          lastUpdated: new Date(),
        });
      }

      // Redirect to missions page
      setTimeout(() => {
        router.push('/imperios/mesopotamia/misiones');
      }, 2000);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handlePartialProgress = async (progress: number, partialData?: Record<string, unknown>) => {
    if (!user) return;

    try {
      const progressRef = doc(db, 'userProgress', user.uid, 'empires', 'mesopotamia');
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
          empireId: 'mesopotamia',
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
        <div className="text-6xl animate-glow">𒀭</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F4A460] to-[#DEB887] py-8">
      {missionId === 'mapa-rios-eternos' && (
        <Fase1MapaRios
          onComplete={(data) => {
            handleComplete(data);
          }}
          onProgressUpdate={(progress, data) => {
            handlePartialProgress(progress, data);
          }}
          savedProgress={savedProgress}
        />
      )}

      {missionId === 'guardianes-saber' && (
        <Fase2GuardianesSaber
          onComplete={(data) => {
            handleComplete({
              score: data.score,
              correctAnswers: data.correctClassifications,
              totalQuestions: data.totalRelics,
            });
          }}
          onProgressUpdate={(progress, data) => {
            handlePartialProgress(progress, data);
          }}
          savedProgress={savedProgress}
        />
      )}

      {missionId === 'linea-tiempo-perdida' && (
        <Fase3LineaTiempo
          onComplete={(data) => {
            handleComplete(data);
          }}
          onProgressUpdate={(progress, data) => {
            handlePartialProgress(progress, data);
          }}
          savedProgress={savedProgress}
        />
      )}

      {missionId === 'legado-eterno' && (
        <Fase4LegadoEterno
          onComplete={(data) => {
            handleComplete(data);
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
