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
    id: 'mapa-rios-eternos',
    title: 'Sello del Mapa Eterno',
    icon: '🗺️',
    description: 'Dominaste la geografía de Mesopotamia',
  },
  {
    id: 'guardianes-saber',
    title: 'Sello del Saber',
    icon: '📚',
    description: 'Clasificaste correctamente las reliquias mesopotámicas',
  },
  {
    id: 'linea-tiempo-perdida',
    title: 'Sello de la Historia',
    icon: '⏳',
    description: 'Reconstruiste la línea del tiempo de Mesopotamia',
  },
  {
    id: 'legado-eterno',
    title: 'Sello del Legado',
    icon: '🏺',
    description: 'Completaste el bingo del legado mesopotámico',
  },
];

const missions = [
  { id: 'mapa-rios-eternos', title: 'Mapa de los Ríos Eternos', maxPoints: 90 },
  { id: 'guardianes-saber', title: 'Los Guardianes del Saber', maxPoints: 195 },
  { id: 'linea-tiempo-perdida', title: 'La Línea del Tiempo Perdida', maxPoints: 160 },
  { id: 'legado-eterno', title: 'El Legado Eterno', maxPoints: 330 },
];

export default function MesopotamiaProgresoPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [userProgress, setUserProgress] = useState<{
    totalPoints: number;
    completedMissions: string[];
    missionProgress: Record<string, { progress: number; score?: number }>;
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
      const progressDoc = await getDoc(doc(db, 'userProgress', user.uid, 'empires', 'mesopotamia'));
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
        <div className="text-6xl animate-glow">𒀭</div>
      </div>
    );
  }

  const completedMissionsCount = userProgress?.completedMissions?.length || 0;
  const totalPoints = userProgress?.totalPoints || 0;
  const overallProgress = (completedMissionsCount / missions.length) * 100;

  const getLevel = (points: number) => {
    if (points >= 700) return { name: 'Guardián del Legado Eterno', icon: '🏆', color: 'from-[#FFD700] to-[#FFA500]' };
    if (points >= 500) return { name: 'Maestro de Mesopotamia', icon: '👑', color: 'from-[#8B4513] to-[#D2691E]' };
    if (points >= 300) return { name: 'Explorador Avanzado', icon: '🎖️', color: 'from-[#D2691E] to-[#CD853F]' };
    if (points >= 100) return { name: 'Aprendiz', icon: '📜', color: 'from-[#CD853F] to-[#DEB887]' };
    return { name: 'Novato', icon: '🌟', color: 'from-[#8B4513] to-[#A0522D]' };
  };

  const currentLevel = getLevel(totalPoints);

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="text-7xl mb-4">📊</div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#2C1810] mb-4">
          Tu Progreso en Mesopotamia
        </h1>
        <p className="text-xl text-[#2C1810]">
          Visualiza tus logros y avances en las misiones de la Antigua Mesopotamia
        </p>
      </section>

      {/* Overall Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
        <Card className="border-4 border-[#8B4513] bg-gradient-to-br from-white to-[#F4A460]">
          <CardHeader className="text-center">
            <div className="text-6xl mb-2">{currentLevel.icon}</div>
            <CardTitle className="text-3xl font-serif text-[#2C1810]">Nivel Actual</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`bg-gradient-to-r ${currentLevel.color} text-white px-6 py-3 rounded-full font-bold text-xl inline-block`}>
              {currentLevel.name}
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-[#8B4513] bg-gradient-to-br from-white to-[#F4A460]">
          <CardHeader className="text-center">
            <div className="text-6xl mb-2">💎</div>
            <CardTitle className="text-3xl font-serif text-[#2C1810]">Puntos Totales</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-5xl font-bold text-[#D2691E]">{totalPoints}</div>
            <p className="text-sm text-[#2C1810] mt-2">de 775 puntos posibles</p>
          </CardContent>
        </Card>

        <Card className="border-4 border-[#8B4513] bg-gradient-to-br from-white to-[#F4A460]">
          <CardHeader className="text-center">
            <div className="text-6xl mb-2">✅</div>
            <CardTitle className="text-3xl font-serif text-[#2C1810]">Misiones Completadas</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-5xl font-bold text-[#D2691E]">
              {completedMissionsCount}/{missions.length}
            </div>
            <Progress value={overallProgress} className="mt-4 h-3" />
          </CardContent>
        </Card>
      </div>

      {/* Seals/Achievements */}
      <section className="mb-12 max-w-5xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-[#2C1810] mb-6 text-center">
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
                    ? 'border-[#FFD700] bg-gradient-to-br from-[#F4A460] to-[#DEB887] shadow-xl'
                    : 'border-gray-400 bg-gray-100 opacity-60'
                }`}
              >
                <CardHeader>
                  <div className={`text-7xl mb-3 text-center ${isUnlocked ? '' : 'grayscale'}`}>
                    {seal.icon}
                  </div>
                  <CardTitle className="text-xl font-serif text-[#2C1810] text-center">
                    {seal.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-[#2C1810] font-medium">
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
        <h2 className="text-4xl font-serif font-bold text-[#2C1810] mb-6 text-center">
          📋 Detalle de Misiones
        </h2>
        <div className="space-y-4">
          {missions.map((mission) => {
            const completed = userProgress?.completedMissions?.includes(mission.id);
            const missionProg = userProgress?.missionProgress?.[mission.id];
            const progress = missionProg?.progress || 0;
            const score = missionProg?.score || 0;

            return (
              <Card
                key={mission.id}
                className={`border-4 ${
                  completed ? 'border-green-600 bg-green-50' : 'border-[#8B4513] bg-white'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-serif font-bold text-[#2C1810]">
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
                          <span className="font-semibold text-[#2C1810]">Progreso</span>
                          <span className="text-[#D2691E] font-bold">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between text-sm mt-2">
                          <span className="font-semibold text-[#2C1810]">Puntos obtenidos</span>
                          <span className="text-[#D2691E] font-bold">
                            {score} / {mission.maxPoints}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Link href={`/imperios/mesopotamia/juego/${mission.id}`}>
                        <Button
                          className={`${
                            completed
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-gradient-to-r from-[#8B4513] to-[#D2691E] hover:shadow-lg'
                          } text-white font-bold px-6 py-3 border-2 border-[#2C1810]`}
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
        <Card className="border-4 border-[#8B4513] bg-gradient-to-r from-[#F4A460] to-[#DEB887]">
          <CardHeader>
            <div className="text-7xl mb-3">🚀</div>
            <CardTitle className="text-3xl font-serif text-[#2C1810]">
              ¡Continúa tu Aventura!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xl text-[#2C1810] font-semibold">
              Completa todas las misiones para convertirte en un verdadero Guardián del Legado Eterno
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/imperios/mesopotamia/misiones">
                <Button className="bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white hover:shadow-xl text-xl px-8 py-6 font-bold border-2 border-[#2C1810]">
                  🎮 Ver Misiones
                </Button>
              </Link>
              <Link href="/imperios/mesopotamia/recursos">
                <Button className="bg-gradient-to-r from-[#D2691E] to-[#CD853F] text-white hover:shadow-xl text-xl px-8 py-6 font-bold border-2 border-[#2C1810]">
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
