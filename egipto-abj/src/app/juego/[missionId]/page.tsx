'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Fase1AlphabetoEgipcio } from '@/components/missions/Fase1AlphabetoEgipcio';
import { Fase2ConsejoFaraon } from '@/components/missions/Fase2ConsejoFaraon';
import { Fase3SecretosNilo } from '@/components/missions/Fase3SecretosNilo';
import { Fase4GranRetoNilo } from '@/components/missions/Fase4GranRetoNilo';

export default function JuegoPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const missionId = params.missionId as string;

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
  }, [user, router]);

  const handleComplete = async (score: number, extraData?: Record<string, unknown>) => {
    if (!user) return;

    try {
      const progressRef = doc(db, 'userProgress', user.uid);
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
          lastUpdated: new Date(),
        });
      }

      // Redirect to missions page
      setTimeout(() => {
        router.push('/misiones');
      }, 2000);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-6xl animate-glow">𓂀</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#faf9f7] to-[#E6D5B8] py-8">
      {missionId === 'secreto-nilo' && (
        <Fase1AlphabetoEgipcio
          onComplete={(data) => {
            handleComplete(100, {
              teamName: data.teamName,
              hieroglyphics: data.hieroglyphics,
              explanation: data.explanation,
            });
          }}
        />
      )}

      {missionId === 'consejo-faraon' && (
        <Fase2ConsejoFaraon
          onComplete={(score) => {
            handleComplete(score);
          }}
        />
      )}

      {missionId === 'secretos-nilo' && (
        <Fase3SecretosNilo
          onComplete={(score) => {
            handleComplete(score);
          }}
        />
      )}

      {missionId === 'gran-reto-nilo' && (
        <Fase4GranRetoNilo
          onComplete={(score) => {
            handleComplete(score);
          }}
        />
      )}
    </main>
  );
}
