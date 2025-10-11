'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

const missions = [
  {
    id: 'mapa-rios-eternos',
    title: 'Fase 1: Mapa de los Ríos Eternos',
    description:
      'Arma el rompecabezas geográfico y ubica Mesopotamia entre el Tigris y el Éufrates',
    icon: '🗺️',
    level: 1,
    phase: 'AVENTURA',
    points: 90,
    color: 'from-[#8B4513] to-[#D2691E]',
  },
  {
    id: 'guardianes-saber',
    title: 'Fase 2: Los Guardianes del Saber',
    description: 'Clasifica las reliquias en política, economía y cultura para descifrar el legado',
    icon: '📚',
    level: 2,
    phase: 'EXPLORACIÓN',
    points: 195,
    color: 'from-[#D2691E] to-[#CD853F]',
  },
  {
    id: 'linea-tiempo-perdida',
    title: 'Fase 3: La Línea del Tiempo Perdida',
    description:
      'Reconstruye la cronología desde Enmerkar hasta Hammurabi ordenando eventos históricos',
    icon: '⏳',
    level: 3,
    phase: 'DOMINIO',
    points: 160,
    color: 'from-[#CD853F] to-[#DEB887]',
  },
  {
    id: 'legado-eterno',
    title: 'Fase 4: El Legado Eterno',
    description: 'Completa el bingo mesopotámico identificando los grandes aportes a la humanidad',
    icon: '🏺',
    level: 4,
    phase: 'CONQUISTA',
    points: 330,
    color: 'from-[#8B4513] to-[#A0522D]',
  },
];

export default function MesopotamiaMissionsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [missionProgress, setMissionProgress] = useState<Record<string, { completed: boolean; score: number; progress: number }>>({});
  const [progressLoading, setProgressLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      if (!user) return;

      try {
        const progressDoc = await getDoc(doc(db, 'userProgress', user.uid, 'empires', 'mesopotamia'));
        if (progressDoc.exists()) {
          const data = progressDoc.data();
          const progress: Record<string, { completed: boolean; score: number; progress: number }> = {};

          // Load completion status for each mission
          missions.forEach(mission => {
            const missionData = data.missionProgress?.[mission.id];
            if (missionData) {
              progress[mission.id] = {
                completed: data.completedMissions?.includes(mission.id) || false,
                score: missionData.score || 0,
                progress: missionData.progress || 0
              };
            } else {
              progress[mission.id] = {
                completed: false,
                score: 0,
                progress: 0
              };
            }
          });

          setMissionProgress(progress);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        setProgressLoading(false);
      }
    };

    if (user) {
      loadProgress();
    }
  }, [user]);

  if (loading || progressLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-6xl animate-glow">𒀭</div>
      </div>
    );
  }

  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F4A460] to-[#DEB887] py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-8xl mb-6">𒀭</div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#2C1810] mb-4">
            Misiones de Mesopotamia
          </h1>
          <p className="text-xl text-[#2C1810] font-semibold max-w-3xl mx-auto">
            Completa las 4 fases basadas en la metodología ABJ y conviértete en un Guardián del Legado Eterno
          </p>
        </div>

        {/* Missions Grid */}
        <div className="grid gap-6 max-w-5xl mx-auto">
          {missions.map((mission, index) => {
            const isCompleted = missionProgress[mission.id]?.completed || false;
            const userScore = missionProgress[mission.id]?.score || 0;
            const progressPercent = missionProgress[mission.id]?.progress || 0;

            return (
              <Card
                key={mission.id}
                className={`border-4 ${isCompleted ? 'border-green-500 bg-green-50' : 'border-[#8B4513] bg-white'} hover:shadow-2xl transition-all hover:scale-102`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-6xl">{mission.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white px-3 py-1 rounded-full text-sm font-bold">
                            {mission.phase}
                          </span>
                          <span className="bg-[#F4A460] text-[#2C1810] px-3 py-1 rounded-full text-sm font-bold">
                            Nivel {mission.level}
                          </span>
                          {isCompleted && (
                            <Badge className="bg-green-500 text-white hover:bg-green-600">
                              ✓ Completada
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-2xl font-serif text-[#2C1810]">
                          {mission.title}
                        </CardTitle>
                        <CardDescription className="text-[#3D2817] text-base mt-2">
                          {mission.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-bold text-[#2C1810]">Progreso</span>
                      <span className="font-bold text-[#D2691E]">{Math.round(progressPercent)}%</span>
                    </div>
                    <Progress value={progressPercent} className="h-3" />
                  </div>

                  {/* Score and Button */}
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-sm font-bold text-[#3D2817]">Puntos obtenidos</p>
                      <p className="text-3xl font-extrabold text-[#D2691E]">
                        {userScore} / {mission.points}
                      </p>
                    </div>
                    <Link href={`/imperios/mesopotamia/juego/${mission.id}`}>
                      <Button
                        className={`bg-gradient-to-r ${mission.color} text-white text-lg px-8 py-6 font-bold border-3 border-[#2C1810] hover:shadow-xl transition-all`}
                      >
                        {isCompleted ? '🔄 Jugar de nuevo' : '🎮 Jugar Ahora'}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="border-4 border-[#8B4513] bg-gradient-to-br from-white to-[#F4A460]">
            <CardHeader>
              <CardTitle className="text-3xl font-serif text-[#2C1810] text-center">
                🎮 Aprendizaje Basado en Juegos (ABJ)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#F5DEB3] p-4 rounded-lg border-2 border-[#8B4513]">
                  <h3 className="font-bold text-lg text-[#2C1810] mb-2">🗺️ FASE 1: AVENTURA</h3>
                  <p className="text-sm text-[#3D2817]">
                    Explora el territorio y conecta con la geografía de Mesopotamia mediante un rompecabezas interactivo
                  </p>
                </div>
                <div className="bg-[#F5DEB3] p-4 rounded-lg border-2 border-[#8B4513]">
                  <h3 className="font-bold text-lg text-[#2C1810] mb-2">📚 FASE 2: EXPLORACIÓN</h3>
                  <p className="text-sm text-[#3D2817]">
                    Clasifica las reliquias mesopotámicas jugando a descubrir el legado cultural, político y económico
                  </p>
                </div>
                <div className="bg-[#F5DEB3] p-4 rounded-lg border-2 border-[#8B4513]">
                  <h3 className="font-bold text-lg text-[#2C1810] mb-2">⏳ FASE 3: DOMINIO</h3>
                  <p className="text-sm text-[#3D2817]">
                    Reconstruye la línea del tiempo jugando a ordenar eventos desde Enmerkar hasta Hammurabi
                  </p>
                </div>
                <div className="bg-[#F5DEB3] p-4 rounded-lg border-2 border-[#8B4513]">
                  <h3 className="font-bold text-lg text-[#2C1810] mb-2">🏺 FASE 4: CONQUISTA</h3>
                  <p className="text-sm text-[#3D2817]">
                    Completa el bingo mesopotámico identificando todos los aportes a la humanidad
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link href="/imperios/mesopotamia">
            <Button className="bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white text-lg px-8 py-4 font-bold border-2 border-[#2C1810]">
              ← Volver a Mesopotamia
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
