'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

const seals = [
  {
    id: 'rio-sagrado',
    title: 'Sello del Río Sagrado',
    icon: '🏛️',
    description: 'Dominaste los pares de los aportes de la India',
  },
  {
    id: 'consejo-loto',
    title: 'Sello del Consejo del Loto',
    icon: '🪷',
    description: 'Encontraste todas las palabras sagradas',
  },
  {
    id: 'ajedrez-sabios',
    title: 'Sello del Ajedrez de los Sabios',
    icon: '♟️',
    description: 'Demostraste tu conocimiento sobre la India',
  },
  {
    id: 'sabios-indo',
    title: 'Sello de los Sabios del Indo',
    icon: '🎲',
    description: 'Completaste el viaje por el tablero del Indo',
  },
];

const missions = [
  { id: 'rio-sagrado', title: 'El Río Sagrado', maxPoints: 100 },
  { id: 'consejo-loto', title: 'El Consejo del Loto', maxPoints: 100 },
  { id: 'ajedrez-sabios', title: 'El Ajedrez de los Sabios', maxPoints: 100 },
  { id: 'sabios-indo', title: 'Los Sabios del Indo', maxPoints: 100 },
];

export default function IndiaProgresoPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [userProgress, setUserProgress] = useState<{
    totalPoints: number;
    completedMissions: string[];
    missionProgress: Record<string, { progress: number; points?: number }>;
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
  }, [user, loading]);

  const loadUserProgress = async () => {
    if (!user) return;

    try {
      const progressDoc = await getDoc(doc(db, 'userProgress', user.uid, 'empires', 'india'));
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
        <div className="text-6xl animate-glow">🕉️</div>
      </div>
    );
  }

  const completedMissionsCount = userProgress?.completedMissions?.length || 0;
  const totalPoints = userProgress?.totalPoints || 0;
  const overallProgress = (completedMissionsCount / missions.length) * 100;

  const getLevel = (points: number) => {
    if (points >= 350) return { name: 'Sabio del Indo', icon: '🏆', color: 'from-[#FFD700] to-[#FFA500]' };
    if (points >= 250) return { name: 'Maestro de India', icon: '👑', color: 'from-[#FF6B35] to-[#F7931E]' };
    if (points >= 150) return { name: 'Explorador Avanzado', icon: '🎖️', color: 'from-[#F7931E] to-[#FFD700]' };
    if (points >= 50) return { name: 'Aprendiz', icon: '📜', color: 'from-[#D2691E] to-[#FF6B35]' };
    return { name: 'Novato', icon: '🌟', color: 'from-[#8B4000] to-[#D2691E]' };
  };

  const currentLevel = getLevel(totalPoints);

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="text-7xl mb-4">📊</div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#8B4000] mb-4">
          Tu Progreso en India
        </h1>
        <p className="text-xl text-[#8B4000]">
          Visualiza tus logros y avances en las misiones de la Antigua India
        </p>
      </section>

      {/* Overall Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
        <Card className="border-4 border-[#FF6B35] bg-gradient-to-br from-white to-[#FFE5B4]">
          <CardHeader className="text-center">
            <div className="text-6xl mb-2">{currentLevel.icon}</div>
            <CardTitle className="text-3xl font-serif text-[#8B4000]">Nivel Actual</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`bg-gradient-to-r ${currentLevel.color} text-white px-6 py-3 rounded-full font-bold text-xl inline-block`}>
              {currentLevel.name}
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-[#FF6B35] bg-gradient-to-br from-white to-[#FFE5B4]">
          <CardHeader className="text-center">
            <div className="text-6xl mb-2">💎</div>
            <CardTitle className="text-3xl font-serif text-[#8B4000]">Puntos Totales</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-5xl font-bold text-[#FF6B35]">{totalPoints}</div>
            <p className="text-sm text-[#8B4000] mt-2">de 400 puntos posibles</p>
          </CardContent>
        </Card>

        <Card className="border-4 border-[#FF6B35] bg-gradient-to-br from-white to-[#FFE5B4]">
          <CardHeader className="text-center">
            <div className="text-6xl mb-2">✅</div>
            <CardTitle className="text-3xl font-serif text-[#8B4000]">Misiones Completadas</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-5xl font-bold text-[#FF6B35]">
              {completedMissionsCount}/{missions.length}
            </div>
            <Progress value={overallProgress} className="mt-4 h-3" />
          </CardContent>
        </Card>
      </div>

      {/* Seals/Achievements */}
      <section className="mb-12 max-w-5xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-[#8B4000] mb-6 text-center">
          🏺 Tus Sellos Sagrados
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seals.map((seal) => {
            const isUnlocked = userProgress?.completedMissions?.includes(seal.id);
            return (
              <Card
                key={seal.id}
                className={`border-4 transition-all ${
                  isUnlocked
                    ? 'border-[#FFD700] bg-gradient-to-br from-[#FFE5B4] to-[#FFDAB9] shadow-xl'
                    : 'border-gray-400 bg-gray-100 opacity-60'
                }`}
              >
                <CardHeader>
                  <div className={`text-7xl mb-3 text-center ${isUnlocked ? '' : 'grayscale'}`}>
                    {seal.icon}
                  </div>
                  <CardTitle className="text-xl font-serif text-[#8B4000] text-center">
                    {seal.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-[#8B4000] font-medium">
                    {seal.description}
                  </CardDescription>
                  {isUnlocked ? (
                    <div className="mt-4 text-center">
                      <Badge className="bg-green-600 text-white text-base px-4 py-1 font-bold">
                        ✓ Desbloqueado
                      </Badge>
                    </div>
                  ) : (
                    <div className="mt-4 text-center">
                      <Badge className="bg-gray-500 text-white text-base px-4 py-1 font-bold">
                        🔒 Bloqueado
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Mission Details */}
      <section className="mb-12 max-w-5xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-[#8B4000] mb-6 text-center">
          📋 Detalle de Misiones
        </h2>
        <div className="space-y-4">
          {missions.map((mission) => {
            const completed = userProgress?.completedMissions?.includes(mission.id);
            const missionProg = userProgress?.missionProgress?.[mission.id];
            const progress = missionProg?.progress || 0;
            const points = missionProg?.points || 0;

            return (
              <Card
                key={mission.id}
                className={`border-4 ${
                  completed ? 'border-green-600 bg-green-50' : 'border-[#FF6B35] bg-white'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-serif font-bold text-[#8B4000]">
                          {mission.title}
                        </h3>
                        {completed && (
                          <Badge className="bg-green-600 text-white text-sm px-3 py-1 font-bold">
                            ✓ Completada
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-[#8B4000]">Progreso</span>
                          <span className="text-[#FF6B35] font-bold">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between text-sm mt-2">
                          <span className="font-semibold text-[#8B4000]">Puntos obtenidos</span>
                          <span className="text-[#FF6B35] font-bold">
                            {points} / {mission.maxPoints}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Link href={`/imperios/india/juego/${mission.id}`}>
                        <Button
                          className={`${
                            completed
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:shadow-lg'
                          } text-white font-bold px-6 py-3 border-2 border-[#8B4000]`}
                        >
                          {completed ? '🔄 Jugar de nuevo' : '🎮 Jugar'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center max-w-3xl mx-auto">
        <Card className="border-4 border-[#FF6B35] bg-gradient-to-r from-[#FFE5B4] to-[#FFDAB9]">
          <CardHeader>
            <div className="text-7xl mb-3">🚀</div>
            <CardTitle className="text-3xl font-serif text-[#8B4000]">
              ¡Continúa tu Aventura!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xl text-[#8B4000] font-semibold">
              Completa todas las misiones para convertirte en un verdadero Sabio del Indo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/imperios/india/misiones">
                <Button className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white hover:shadow-xl text-xl px-8 py-6 font-bold border-2 border-[#8B4000]">
                  🎮 Ver Misiones
                </Button>
              </Link>
              <Link href="/imperios/india/recursos">
                <Button className="bg-gradient-to-r from-[#F7931E] to-[#FFD700] text-[#8B4000] hover:shadow-xl text-xl px-8 py-6 font-bold border-2 border-[#8B4000]">
                  📚 Recursos Educativos
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
