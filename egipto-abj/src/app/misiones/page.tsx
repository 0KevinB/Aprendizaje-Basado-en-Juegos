'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Mission } from '@/types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

const missions: Mission[] = [
  {
    id: 'hieroglyphics',
    title: 'Los Jeroglíficos',
    description: 'Descifra el antiguo sistema de escritura egipcio',
    icon: '🏺',
    level: 1,
    locked: false,
    requiredPoints: 0,
    maxPoints: 50,
    gameType: 'hieroglyphics',
  },
  {
    id: 'pyramids',
    title: 'Las Pirámides',
    description: 'Descubre cómo se construyeron las maravillas del mundo',
    icon: '⚱️',
    level: 2,
    locked: false,
    requiredPoints: 30,
    maxPoints: 60,
    gameType: 'pyramids',
  },
  {
    id: 'pharaohs',
    title: 'Los Faraones',
    description: 'Conoce a los grandes gobernantes de Egipto',
    icon: '👑',
    level: 3,
    locked: false,
    requiredPoints: 60,
    maxPoints: 75,
    gameType: 'pharaohs',
  },
  {
    id: 'gods',
    title: 'Dioses y Mitología',
    description: 'Explora el mundo de los dioses egipcios',
    icon: '🐱',
    level: 4,
    locked: false,
    requiredPoints: 100,
    maxPoints: 60,
    gameType: 'gods',
  },
  {
    id: 'daily-life',
    title: 'Vida Cotidiana',
    description: 'Descubre cómo vivían los antiguos egipcios',
    icon: '📜',
    level: 5,
    locked: false,
    requiredPoints: 140,
    maxPoints: 40,
    gameType: 'daily-life',
  },
  {
    id: 'mummification',
    title: 'Momificación',
    description: 'Aprende el proceso de preservación egipcio',
    icon: '⚰️',
    level: 6,
    locked: false,
    requiredPoints: 160,
    maxPoints: 20,
    gameType: 'mummification',
  },
];

export default function MisionesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [userProgress, setUserProgress] = useState<{
    totalPoints: number;
    completedMissions: string[];
    missionProgress: Record<string, { progress: number }>;
  } | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
      return;
    }

    if (user) {
      loadUserProgress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const loadUserProgress = async () => {
    if (!user) return;

    try {
      const progressDoc = await getDoc(doc(db, 'userProgress', user.uid));
      if (progressDoc.exists()) {
        const data = progressDoc.data();
        setUserProgress({
          totalPoints: data.totalPoints || 0,
          completedMissions: data.completedMissions || [],
          missionProgress: data.missionProgress || {},
        });
      } else {
        setUserProgress({
          totalPoints: 0,
          completedMissions: [],
          missionProgress: {},
        });
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoadingProgress(false);
    }
  };

  if (loading || loadingProgress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-6xl animate-glow">𓂀</div>
      </div>
    );
  }

  const getMissionStatus = (mission: Mission) => {
    if (!userProgress) return { locked: mission.requiredPoints > 0, progress: 0 };

    const totalPoints = userProgress.totalPoints || 0;
    const missionProg = userProgress.missionProgress?.[mission.id];
    const progress = missionProg?.progress || 0;
    const locked = totalPoints < mission.requiredPoints;

    return { locked, progress };
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[var(--dark-blue)] mb-4">
          Misiones del Explorador
        </h1>
        <p className="text-xl text-[var(--dark-blue)]">
          Completa las misiones y desbloquea el conocimiento del Antiguo Egipto
        </p>
        {userProgress && (
          <div className="mt-6 inline-block bg-gradient-to-r from-[var(--gold)] to-[var(--dark-gold)] text-[var(--darker-blue)] px-6 py-3 rounded-full font-bold text-xl">
            💎 {userProgress.totalPoints || 0} Puntos Totales
          </div>
        )}
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {missions.map((mission) => {
          const { locked, progress } = getMissionStatus(mission);
          const completed = userProgress?.completedMissions?.includes(mission.id);

          return (
            <Card
              key={mission.id}
              className={`border-4 transition-all ${
                locked
                  ? 'border-gray-500 opacity-70 bg-gray-100'
                  : completed
                  ? 'border-green-600 bg-green-50'
                  : 'border-[#FFD700] hover:shadow-2xl hover:scale-105'
              } bg-white relative overflow-hidden`}
            >
              {completed && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-600 text-white text-base px-3 py-1 font-bold">
                    ✓ Completada
                  </Badge>
                </div>
              )}

              <CardHeader>
                <div className="text-6xl mb-4 text-center">{mission.icon}</div>
                <CardTitle className="font-serif text-2xl text-[#0f1e30] text-center font-bold">
                  {mission.title}
                </CardTitle>
                <CardDescription className="text-base text-center text-[#1e3a5f] font-medium">
                  {mission.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2 font-semibold">
                    <span className="text-[#0f1e30]">Progreso</span>
                    <span className="text-[#B8860B]">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="text-sm text-center">
                  <div className="font-bold text-[#B8860B] text-base">
                    {mission.maxPoints} puntos máximos
                  </div>
                  {locked && (
                    <div className="text-red-700 font-bold mt-2 text-base">
                      🔒 Requiere {mission.requiredPoints} puntos
                    </div>
                  )}
                </div>

                <Link href={`/juego/${mission.id}`}>
                  <Button
                    className={`w-full text-lg font-bold ${
                      locked
                        ? 'bg-gray-500 cursor-not-allowed text-gray-200'
                        : completed
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gradient-to-r from-[#40E0D0] to-[#20B2AA] hover:shadow-lg text-[#0f1e30] border-2 border-[#20B2AA]'
                    } transition-all`}
                    disabled={locked}
                  >
                    {locked ? '🔒 Bloqueada' : completed ? '🔄 Jugar de nuevo' : '🎮 Jugar'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
