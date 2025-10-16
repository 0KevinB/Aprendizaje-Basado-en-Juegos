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
    id: 'mandato-cielo',
    title: 'Sello del Mandato del Cielo',
    icon: '🐉',
    description: 'Dominaste los pares de los aportes de China',
  },
  {
    id: 'consejo-dragon',
    title: 'Sello del Consejo del Dragón',
    icon: '🏯',
    description: 'Encontraste todas las palabras sagradas',
  },
  {
    id: 'secretos-gran-muralla',
    title: 'Sello de los Secretos de la Gran Muralla',
    icon: '🏮',
    description: 'Recorriste la Gran Muralla con sabiduría',
  },
  {
    id: 'go-imperio',
    title: 'Sello del Go del Imperio',
    icon: '⚫',
    description: 'Dominaste la estrategia ancestral del Go',
  },
];

const missions = [
  { id: 'mandato-cielo', title: 'El Mandato del Cielo', maxPoints: 100 },
  { id: 'consejo-dragon', title: 'El Consejo del Dragón', maxPoints: 100 },
  { id: 'secretos-gran-muralla', title: 'Los Secretos de la Gran Muralla', maxPoints: 100 },
  { id: 'go-imperio', title: 'El Go del Imperio', maxPoints: 100 },
];

export default function ChinaProgresoPage() {
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

  const completedMissionsCount = userProgress?.completedMissions?.length || 0;
  const totalPoints = userProgress?.totalPoints || 0;
  const overallProgress = (completedMissionsCount / missions.length) * 100;

  const getLevel = (points: number) => {
    if (points >= 350) return { name: 'Maestro del Imperio', icon: '🏆', color: 'from-[#FFD700] to-[#FFA500]' };
    if (points >= 250) return { name: 'Emperador del Dragón', icon: '👑', color: 'from-[#DC143C] to-[#8B0000]' };
    if (points >= 150) return { name: 'Guardián de la Muralla', icon: '🎖️', color: 'from-[#8B0000] to-[#DC143C]' };
    if (points >= 50) return { name: 'Aprendiz Confuciano', icon: '📜', color: 'from-[#D2691E] to-[#DC143C]' };
    return { name: 'Iniciado', icon: '🌟', color: 'from-[#8B4000] to-[#D2691E]' };
  };

  const currentLevel = getLevel(totalPoints);

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="text-7xl mb-4">📊</div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#8B0000] mb-4">
          Tu Progreso en China
        </h1>
        <p className="text-xl text-[#8B0000]">
          Visualiza tus logros y avances en las misiones de la Antigua China
        </p>
      </section>

      {/* Overall Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
        <Card className="border-4 border-[#DC143C] bg-gradient-to-br from-white to-[#FFF9E6]">
          <CardHeader className="text-center">
            <div className="text-6xl mb-2">{currentLevel.icon}</div>
            <CardTitle className="text-3xl font-serif text-[#8B0000]">Nivel Actual</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`bg-gradient-to-r ${currentLevel.color} text-white px-6 py-3 rounded-full font-bold text-xl inline-block`}>
              {currentLevel.name}
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-[#DC143C] bg-gradient-to-br from-white to-[#FFF9E6]">
          <CardHeader className="text-center">
            <div className="text-6xl mb-2">💎</div>
            <CardTitle className="text-3xl font-serif text-[#8B0000]">Puntos Totales</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-5xl font-bold text-[#DC143C]">{totalPoints}</div>
            <p className="text-sm text-[#8B0000] mt-2">de 400 puntos posibles</p>
          </CardContent>
        </Card>

        <Card className="border-4 border-[#DC143C] bg-gradient-to-br from-white to-[#FFF9E6]">
          <CardHeader className="text-center">
            <div className="text-6xl mb-2">✅</div>
            <CardTitle className="text-3xl font-serif text-[#8B0000]">Misiones Completadas</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-5xl font-bold text-[#DC143C]">
              {completedMissionsCount}/{missions.length}
            </div>
            <Progress value={overallProgress} className="mt-4 h-3" />
          </CardContent>
        </Card>
      </div>

      {/* Level Progress Bar */}
      <section className="mb-12 max-w-5xl mx-auto">
        <Card className="border-4 border-[#FFD700] bg-gradient-to-br from-[#FFF9E6] to-[#FFE4B5]">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-[#8B0000] text-center">
              🎯 Progreso de Nivel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: 'Iniciado', min: 0, max: 50, icon: '🌟' },
              { name: 'Aprendiz Confuciano', min: 50, max: 150, icon: '📜' },
              { name: 'Guardián de la Muralla', min: 150, max: 250, icon: '🎖️' },
              { name: 'Emperador del Dragón', min: 250, max: 350, icon: '👑' },
              { name: 'Maestro del Imperio', min: 350, max: 400, icon: '🏆' },
            ].map((level) => {
              const progress =
                totalPoints < level.min
                  ? 0
                  : totalPoints >= level.max
                  ? 100
                  : ((totalPoints - level.min) / (level.max - level.min)) * 100;

              const isCurrent = currentLevel.name === level.name;

              return (
                <div
                  key={level.name}
                  className={isCurrent ? 'bg-white p-4 rounded-lg border-2 border-[#DC143C]' : 'p-2'}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{level.icon}</span>
                      <span
                        className={`font-bold ${
                          isCurrent ? 'text-[#DC143C] text-xl' : 'text-[#8B0000] text-base'
                        }`}
                      >
                        {level.name} {isCurrent && '← Estás aquí'}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-semibold ${isCurrent ? 'text-[#8B0000]' : 'text-gray-600'}`}
                    >
                      {level.min} - {level.max} pts
                    </span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>

      {/* Seals/Achievements */}
      <section className="mb-12 max-w-5xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-[#8B0000] mb-6 text-center">
          🏺 Tus Sellos Imperiales
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seals.map((seal) => {
            const isUnlocked = userProgress?.completedMissions?.includes(seal.id);
            return (
              <Card
                key={seal.id}
                className={`border-4 transition-all ${
                  isUnlocked
                    ? 'border-[#FFD700] bg-gradient-to-br from-[#FFF9E6] to-[#FFE4B5] shadow-xl'
                    : 'border-gray-400 bg-gray-100 opacity-60'
                }`}
              >
                <CardHeader>
                  <div className={`text-7xl mb-3 text-center ${isUnlocked ? '' : 'grayscale'}`}>
                    {seal.icon}
                  </div>
                  <CardTitle className="text-xl font-serif text-[#8B0000] text-center">
                    {seal.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-[#8B0000] font-medium">
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
        <h2 className="text-4xl font-serif font-bold text-[#8B0000] mb-6 text-center">
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
                  completed ? 'border-green-600 bg-green-50' : 'border-[#DC143C] bg-white'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-serif font-bold text-[#8B0000]">
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
                          <span className="font-semibold text-[#8B0000]">Progreso</span>
                          <span className="text-[#DC143C] font-bold">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between text-sm mt-2">
                          <span className="font-semibold text-[#8B0000]">Puntos obtenidos</span>
                          <span className="text-[#DC143C] font-bold">
                            {score} / {mission.maxPoints}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Link href={`/imperios/china/juego/${mission.id}`}>
                        <Button
                          className={`${
                            completed
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-gradient-to-r from-[#DC143C] to-[#8B0000] hover:shadow-lg'
                          } text-white font-bold px-6 py-3 border-2 border-[#FFD700]`}
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

      {/* Fun Facts Section */}
      <section className="mb-12 max-w-5xl mx-auto">
        <Card className="border-4 border-[#FFD700] bg-gradient-to-r from-[#DC143C] to-[#8B0000]">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-[#FFD700] text-center">
              💡 ¿Sabías que...?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/90 rounded-lg p-4 border-2 border-[#FFD700]">
                <div className="text-3xl mb-2 text-center">🏮</div>
                <p className="text-[#8B0000] font-semibold text-center">
                  La Gran Muralla China es visible desde la órbita terrestre baja, ¡pero no desde la Luna!
                </p>
              </div>
              <div className="bg-white/90 rounded-lg p-4 border-2 border-[#FFD700]">
                <div className="text-3xl mb-2 text-center">🧧</div>
                <p className="text-[#8B0000] font-semibold text-center">
                  El papel fue inventado en China hace más de 2,000 años y revolucionó el mundo
                </p>
              </div>
              <div className="bg-white/90 rounded-lg p-4 border-2 border-[#FFD700]">
                <div className="text-3xl mb-2 text-center">⚔️</div>
                <p className="text-[#8B0000] font-semibold text-center">
                  El Ejército de Terracota tiene más de 8,000 guerreros únicos con expresiones diferentes
                </p>
              </div>
              <div className="bg-white/90 rounded-lg p-4 border-2 border-[#FFD700]">
                <div className="text-3xl mb-2 text-center">☯️</div>
                <p className="text-[#8B0000] font-semibold text-center">
                  Confucio vivió hace 2,500 años y sus enseñanzas siguen influyendo en China hoy
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="text-center max-w-3xl mx-auto">
        <Card className="border-4 border-[#DC143C] bg-gradient-to-r from-[#FFF9E6] to-[#FFE4B5]">
          <CardHeader>
            <div className="text-7xl mb-3">🚀</div>
            <CardTitle className="text-3xl font-serif text-[#8B0000]">
              ¡Continúa tu Aventura!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xl text-[#8B0000] font-semibold">
              Completa todas las misiones para convertirte en un verdadero Maestro del Imperio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/imperios/china/misiones">
                <Button className="bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white hover:shadow-xl text-xl px-8 py-6 font-bold border-2 border-[#FFD700]">
                  🎮 Ver Misiones
                </Button>
              </Link>
              <Link href="/imperios/china/recursos">
                <Button className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B0000] hover:shadow-xl text-xl px-8 py-6 font-bold border-2 border-[#8B0000]">
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
