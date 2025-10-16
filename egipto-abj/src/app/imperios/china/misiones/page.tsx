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
    id: 'mandato-cielo',
    title: 'AVENTURA - El Mandato del Cielo',
    description: 'Encuentra los pares correctos de los aportes de la China Antigua',
    icon: '🐉',
    level: 1,
    locked: false,
    requiredPoints: 0,
    maxPoints: 100,
    gameType: 'mandato-cielo',
  },
  {
    id: 'consejo-dragon',
    title: 'EXPLORACIÓN - El Consejo del Dragón',
    description: 'Descubre las palabras clave de China en el pergamino encantado',
    icon: '🏯',
    level: 2,
    locked: false,
    requiredPoints: 50,
    maxPoints: 100,
    gameType: 'consejo-dragon',
  },
  {
    id: 'secretos-gran-muralla',
    title: 'DOMINIO - Los Secretos de la Gran Muralla',
    description: 'Recorre la Gran Muralla y responde preguntas sobre China Antigua',
    icon: '🏮',
    level: 3,
    locked: false,
    requiredPoints: 100,
    maxPoints: 100,
    gameType: 'secretos-gran-muralla',
  },
  {
    id: 'go-imperio',
    title: 'CONQUISTA - El Go del Imperio',
    description: 'Domina el tablero del Go y demuestra tu sabiduría estratégica',
    icon: '⚫',
    level: 4,
    locked: false,
    requiredPoints: 150,
    maxPoints: 100,
    gameType: 'go-imperio',
  },
];

export default function ChinaMisionesPage() {
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
  }, [user, loading, router]);

  const loadUserProgress = async () => {
    if (!user) return;

    try {
      const progressDoc = await getDoc(doc(db, 'userProgress', user.uid, 'empires', 'china'));
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
        <div className="text-6xl animate-glow">🐉</div>
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
        <div className="text-7xl mb-4">🐉</div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#8B0000] mb-4">
          Misiones de China
        </h1>
        <p className="text-xl text-[#8B0000]">
          Completa las misiones y desbloquea el conocimiento de la Antigua China
        </p>
        {userProgress && (
          <div className="mt-6 inline-block bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white px-6 py-3 rounded-full font-bold text-xl border-2 border-[#FFD700]">
            ⭐ {userProgress.totalPoints || 0} Puntos Totales
          </div>
        )}
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
                  : 'border-[#DC143C] hover:shadow-2xl hover:scale-105'
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
                <CardTitle className="font-serif text-2xl text-[#8B0000] text-center font-bold">
                  {mission.title}
                </CardTitle>
                <CardDescription className="text-base text-center text-[#8B0000] font-medium">
                  {mission.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2 font-semibold">
                    <span className="text-[#8B0000]">Progreso</span>
                    <span className="text-[#DC143C]">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="text-sm text-center">
                  <div className="font-bold text-[#DC143C] text-base">
                    {mission.maxPoints} puntos máximos
                  </div>
                  {locked && (
                    <div className="text-red-700 font-bold mt-2 text-base">
                      🔒 Requiere {mission.requiredPoints} puntos
                    </div>
                  )}
                </div>

                <Link href={`/imperios/china/juego/${mission.id}`}>
                  <Button
                    className={`w-full text-lg font-bold ${
                      locked
                        ? 'bg-gray-500 cursor-not-allowed text-gray-200'
                        : completed
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gradient-to-r from-[#DC143C] to-[#8B0000] hover:shadow-lg text-white border-2 border-[#FFD700]'
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
