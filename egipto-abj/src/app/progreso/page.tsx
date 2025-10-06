'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserProgress, Achievement } from '@/types';

const achievements: Achievement[] = [
  { id: 'scribe', title: 'Escriba', description: 'Completa la misión de Jeroglíficos', icon: '🏺', unlocked: false },
  { id: 'builder', title: 'Constructor', description: 'Completa la misión de Pirámides', icon: '🏗️', unlocked: false },
  { id: 'pharaoh', title: 'Faraón Junior', description: 'Completa la misión de Faraones', icon: '👑', unlocked: false },
  { id: 'priest', title: 'Sacerdote', description: 'Completa la misión de Dioses', icon: '🐱', unlocked: false },
  { id: 'historian', title: 'Historiador', description: 'Completa la misión de Vida Cotidiana', icon: '📚', unlocked: false },
  { id: 'embalmer', title: 'Momificador', description: 'Completa la misión de Momificación', icon: '⚰️', unlocked: false },
];

export default function ProgresoPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
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
        setUserProgress(progressDoc.data() as UserProgress);
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

  const getLevel = (points: number) => {
    if (points >= 250) return 'Maestro Egipcio';
    if (points >= 180) return 'Experto';
    if (points >= 120) return 'Avanzado';
    if (points >= 60) return 'Intermedio';
    if (points >= 20) return 'Aprendiz';
    return 'Iniciado';
  };

  const totalPoints = userProgress?.totalPoints || 0;
  const completedMissions = userProgress?.completedMissions || [];
  const currentLevel = getLevel(totalPoints);

  // Actualizar logros desbloqueados
  const unlockedAchievements = achievements.map((achievement) => {
    const missionId = achievement.id === 'scribe' ? 'hieroglyphics'
      : achievement.id === 'builder' ? 'pyramids'
      : achievement.id === 'pharaoh' ? 'pharaohs'
      : achievement.id === 'priest' ? 'gods'
      : achievement.id === 'historian' ? 'daily-life'
      : 'mummification';

    return {
      ...achievement,
      unlocked: completedMissions.includes(missionId),
    };
  });

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[var(--dark-blue)] mb-4">
          Tu Progreso
        </h1>
        <p className="text-xl text-[var(--dark-blue)]">
          Sigue tu aventura a través del Antiguo Egipto
        </p>
      </section>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="border-4 border-[#FFD700] bg-white text-center">
          <CardHeader>
            <div className="text-6xl mb-3">🏆</div>
            <CardTitle className="text-3xl font-serif text-[#0f1e30] font-bold">
              Puntos Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-[#B8860B]">{totalPoints}</div>
          </CardContent>
        </Card>

        <Card className="border-4 border-[#40E0D0] bg-white text-center">
          <CardHeader>
            <div className="text-6xl mb-3">⭐</div>
            <CardTitle className="text-3xl font-serif text-[#0f1e30] font-bold">
              Misiones Completadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-[#1e7a6f]">
              {completedMissions.length}/6
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-[#CD7F32] bg-white text-center">
          <CardHeader>
            <div className="text-6xl mb-3">🎖️</div>
            <CardTitle className="text-3xl font-serif text-[#0f1e30] font-bold">
              Nivel Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#8B5A2B]">{currentLevel}</div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="mb-12 border-4 border-[#FFD700] bg-white">
        <CardHeader>
          <CardTitle className="text-3xl font-serif text-[#0f1e30] text-center font-bold">
            Progreso de Nivel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Iniciado', min: 0, max: 20 },
              { name: 'Aprendiz', min: 20, max: 60 },
              { name: 'Intermedio', min: 60, max: 120 },
              { name: 'Avanzado', min: 120, max: 180 },
              { name: 'Experto', min: 180, max: 250 },
              { name: 'Maestro Egipcio', min: 250, max: 300 },
            ].map((level) => {
              const progress =
                totalPoints < level.min
                  ? 0
                  : totalPoints >= level.max
                  ? 100
                  : ((totalPoints - level.min) / (level.max - level.min)) * 100;

              const isCurrent = currentLevel === level.name;

              return (
                <div key={level.name} className={isCurrent ? 'bg-[#FFF9E6] p-4 rounded-lg border-2 border-[#FFD700]' : 'p-2'}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-bold ${isCurrent ? 'text-[#B8860B] text-xl' : 'text-[#1e3a5f] text-base'}`}>
                      {level.name} {isCurrent && '← Estás aquí'}
                    </span>
                    <span className={`text-sm font-semibold ${isCurrent ? 'text-[#0f1e30]' : 'text-[#4a5568]'}`}>
                      {level.min} - {level.max} pts
                    </span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-4 border-[var(--gold)] bg-white/90 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-3xl font-serif text-[var(--dark-blue)] text-center">
            Logros Desbloqueados
          </CardTitle>
          <CardDescription className="text-center text-lg">
            {unlockedAchievements.filter((a) => a.unlocked).length} de {achievements.length} logros
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {unlockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border-4 text-center transition-all ${
                  achievement.unlocked
                    ? 'border-[var(--gold)] bg-gradient-to-br from-yellow-50 to-yellow-100 hover:scale-105 shadow-lg'
                    : 'border-gray-300 bg-gray-100 opacity-40'
                }`}
              >
                <div className="text-5xl mb-2">{achievement.icon}</div>
                <div className="font-semibold text-sm text-[var(--dark-blue)]">
                  {achievement.title}
                </div>
                {achievement.unlocked && (
                  <Badge className="mt-2 bg-green-500 text-white">✓</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mission Details */}
      {userProgress && Object.keys(userProgress.missionProgress || {}).length > 0 && (
        <Card className="mt-12 border-4 border-[var(--turquoise)] bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-[var(--dark-blue)] text-center">
              Detalles de Misiones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(userProgress.missionProgress || {}).map(([missionId, progress]) => (
                <div
                  key={missionId}
                  className="p-4 rounded-lg border-2 border-[var(--sand)] bg-white"
                >
                  <h3 className="font-semibold text-lg text-[var(--dark-blue)] mb-2 capitalize">
                    {missionId.replace('-', ' ')}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Puntuación:</span>
                      <span className="font-bold text-[var(--gold)]">{progress.score} pts</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Intentos:</span>
                      <span className="font-bold">{progress.attempts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estado:</span>
                      <Badge className={progress.completed ? 'bg-green-500' : 'bg-yellow-500'}>
                        {progress.completed ? 'Completada' : 'En progreso'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
