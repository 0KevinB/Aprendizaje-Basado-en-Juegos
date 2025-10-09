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
  { id: 'secreto-nilo', title: 'Sello del Escriba', description: 'Completa la Fase 1: El Secreto del Nilo', icon: '🏺', unlocked: false },
  { id: 'consejo-faraon', title: 'Sello del Consejo', description: 'Completa la Fase 2: Consejo del Faraón', icon: '👑', unlocked: false },
  { id: 'secretos-nilo', title: 'Sello del Guardián', description: 'Completa la Fase 3: Secretos del Nilo', icon: '🏺', unlocked: false },
  { id: 'gran-reto-nilo', title: 'Sello Eterno', description: 'Completa la Fase 4: Gran Reto del Nilo', icon: '⚱️', unlocked: false },
];

export default function EgiptoProgresoPage() {
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
      const progressDoc = await getDoc(doc(db, 'userProgress', user.uid, 'empires', 'egipto'));
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
    if (points >= 400) return 'Maestro Egipcio';
    if (points >= 300) return 'Faraón Experto';
    if (points >= 200) return 'Sacerdote Avanzado';
    if (points >= 100) return 'Escriba Intermedio';
    if (points >= 50) return 'Aprendiz';
    return 'Iniciado';
  };

  const totalPoints = userProgress?.totalPoints || 0;
  const completedMissions = userProgress?.completedMissions || [];
  const currentLevel = getLevel(totalPoints);

  // Actualizar logros desbloqueados
  const unlockedAchievements = achievements.map((achievement) => ({
    ...achievement,
    unlocked: completedMissions.includes(achievement.id),
  }));

  const progressPercentage = (completedMissions.length / 4) * 100;

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <div className="text-7xl mb-4">𓂀</div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[var(--dark-blue)] mb-4">
          Tu Progreso en Egipto
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
            <p className="text-sm text-gray-600 mt-2">de 400 puntos posibles</p>
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
              {completedMissions.length}/4
            </div>
            <Progress value={progressPercentage} className="mt-4 h-3" />
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
            <div className="text-2xl font-bold text-[#8B5A2B]">{currentLevel}</div>
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
              { name: 'Iniciado', min: 0, max: 50 },
              { name: 'Aprendiz', min: 50, max: 100 },
              { name: 'Escriba Intermedio', min: 100, max: 200 },
              { name: 'Sacerdote Avanzado', min: 200, max: 300 },
              { name: 'Faraón Experto', min: 300, max: 400 },
              { name: 'Maestro Egipcio', min: 400, max: 400 },
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

      {/* Achievements - Sellos */}
      <Card className="border-4 border-[#FFD700] bg-white/90 backdrop-blur mb-12">
        <CardHeader>
          <CardTitle className="text-3xl font-serif text-[#0f1e30] text-center">
            Sellos Obtenidos
          </CardTitle>
          <CardDescription className="text-center text-lg">
            {unlockedAchievements.filter((a) => a.unlocked).length} de {achievements.length} sellos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {unlockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-6 rounded-xl border-4 text-center transition-all ${
                  achievement.unlocked
                    ? 'border-[#FFD700] bg-gradient-to-br from-yellow-50 to-yellow-100 hover:scale-105 shadow-lg'
                    : 'border-gray-300 bg-gray-100 opacity-40'
                }`}
              >
                <div className="text-6xl mb-3">{achievement.icon}</div>
                <div className="font-bold text-base text-[#0f1e30] mb-1">
                  {achievement.title}
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  {achievement.description}
                </div>
                {achievement.unlocked && (
                  <Badge className="mt-2 bg-green-500 text-white">✓ Desbloqueado</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mission Details */}
      {userProgress && Object.keys(userProgress.missionProgress || {}).length > 0 && (
        <Card className="border-4 border-[#40E0D0] bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-[#0f1e30] text-center">
              Detalles de Misiones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(userProgress.missionProgress || {}).map(([missionId, progress]) => (
                <div
                  key={missionId}
                  className="p-6 rounded-lg border-3 border-[#C19A6B] bg-gradient-to-br from-white to-[#FFF8DC]"
                >
                  <h3 className="font-bold text-xl text-[#0f1e30] mb-3 capitalize">
                    {missionId.replace(/-/g, ' ')}
                  </h3>
                  <div className="space-y-3 text-base">
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#0f1e30]">Puntuación:</span>
                      <span className="font-bold text-[#B8860B]">{progress.score} pts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#0f1e30]">Progreso:</span>
                      <span className="font-bold text-[#0f1e30]">{Math.round(progress.progress)}%</span>
                    </div>
                    <Progress value={progress.progress} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#0f1e30]">Estado:</span>
                      <Badge className={completedMissions.includes(missionId) ? 'bg-green-500' : 'bg-yellow-500'}>
                        {completedMissions.includes(missionId) ? '✓ Completada' : '⏳ En progreso'}
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
