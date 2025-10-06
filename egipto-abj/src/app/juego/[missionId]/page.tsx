'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { GameQuestion, GameType } from '@/types';
import { generateGameQuestions } from '@/lib/gameGenerators';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function JuegoPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const missionId = params.missionId as GameType;

  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }

    // Generar preguntas dinámicas
    const generatedQuestions = generateGameQuestions(missionId);
    setQuestions(generatedQuestions);
  }, [user, missionId]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = () => {
    if (!selectedAnswer) return;

    const isCorrect =
      Array.isArray(currentQuestion.correctAnswer)
        ? currentQuestion.correctAnswer.includes(selectedAnswer)
        : selectedAnswer.toLowerCase().trim() ===
          currentQuestion.correctAnswer.toLowerCase().trim();

    if (isCorrect) {
      setScore(score + currentQuestion.points);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer('');
        setShowResult(false);
        setShowHint(false);
      } else {
        finishGame();
      }
    }, 2000);
  };

  const finishGame = async () => {
    setGameFinished(true);

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
            },
          },
          lastUpdated: new Date(),
        });
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-6xl animate-glow">𓂀</div>
      </div>
    );
  }

  if (gameFinished) {
    const maxScore = questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / maxScore) * 100);

    return (
      <main className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto border-4 border-[#FFD700] bg-white">
          <CardHeader className="text-center">
            <div className="text-8xl mb-4">
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '🥈' : '🥉'}
            </div>
            <CardTitle className="text-4xl font-serif text-[#0f1e30] font-bold">
              ¡Misión Completada!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-[#B8860B] mb-2">{score}</div>
              <div className="text-2xl text-[#0f1e30] font-semibold">puntos ganados</div>
              <div className="text-lg text-[#1e3a5f] font-semibold mt-2">
                {percentage}% de precisión
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] rounded-lg p-6 text-center border-2 border-[#B8860B]">
              <p className="text-xl font-bold text-[#0f1e30]">
                {percentage >= 80
                  ? '¡Excelente trabajo! Eres un verdadero experto en la cultura egipcia.'
                  : percentage >= 60
                  ? '¡Buen trabajo! Sigues aprendiendo sobre el Antiguo Egipto.'
                  : '¡Sigue practicando! Cada intento te acerca más al conocimiento.'}
              </p>
            </div>

            <div className="flex gap-4 flex-col sm:flex-row">
              <Button
                onClick={() => router.push('/misiones')}
                className="flex-1 bg-gradient-to-r from-[#40E0D0] to-[#20B2AA] text-[#0f1e30] text-lg py-6 font-bold border-2 border-[#20B2AA]"
              >
                Ver Misiones
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="flex-1 border-3 border-[#1e3a5f] text-[#1e3a5f] text-lg py-6 font-bold hover:bg-[#1e3a5f] hover:text-white"
              >
                Jugar de Nuevo
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  const isCorrect =
    Array.isArray(currentQuestion.correctAnswer)
      ? currentQuestion.correctAnswer.includes(selectedAnswer)
      : selectedAnswer.toLowerCase().trim() ===
        currentQuestion.correctAnswer.toLowerCase().trim();

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-bold text-[#0f1e30] text-base">
              Pregunta {currentQuestionIndex + 1} de {questions.length}
            </span>
            <span className="font-bold text-[#B8860B] text-base">💎 {score} puntos</span>
          </div>
          <Progress
            value={((currentQuestionIndex + 1) / questions.length) * 100}
            className="h-3"
          />
        </div>

        {/* Question Card */}
        <Card className="border-4 border-[#FFD700] bg-white">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-serif text-[#0f1e30] text-center font-bold">
              {currentQuestion.question}
            </CardTitle>
            <CardDescription className="text-center text-base text-[#1e3a5f] font-semibold">
              Vale {currentQuestion.points} puntos
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Multiple Choice */}
            {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
              <div className="grid gap-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => setSelectedAnswer(option)}
                    disabled={showResult}
                    className={`text-lg py-6 transition-all font-semibold ${
                      showResult
                        ? option === currentQuestion.correctAnswer
                          ? 'bg-green-600 text-white'
                          : option === selectedAnswer
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-300 text-gray-600'
                        : selectedAnswer === option
                        ? 'bg-[#FFD700] text-[#0f1e30] border-2 border-[#B8860B]'
                        : 'bg-white border-2 border-[#C19A6B] text-[#0f1e30] hover:bg-[#E6D5B8] hover:border-[#FFD700]'
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {/* Fill in the Blank */}
            {currentQuestion.type === 'fill-blank' && (
              <div className="space-y-4">
                <Input
                  type="text"
                  value={selectedAnswer}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  placeholder="Escribe tu respuesta aquí"
                  disabled={showResult}
                  className="text-lg p-6 border-3 border-[#C19A6B] text-[#0f1e30] font-semibold placeholder:text-[#6B5B4A] focus:border-[#FFD700]"
                />
              </div>
            )}

            {/* Result Feedback */}
            {showResult && (
              <div
                className={`p-5 rounded-lg text-center text-lg font-bold border-3 ${
                  isCorrect ? 'bg-green-50 text-green-900 border-green-700' : 'bg-red-50 text-red-900 border-red-700'
                }`}
              >
                {isCorrect ? '✅ ¡Correcto!' : `❌ Incorrecto. La respuesta es: ${currentQuestion.correctAnswer}`}
              </div>
            )}

            {/* Hint */}
            {currentQuestion.hint && !showResult && (
              <div className="text-center">
                {showHint ? (
                  <div className="bg-blue-50 p-5 rounded-lg text-blue-900 font-bold text-base border-3 border-blue-700">
                    💡 {currentQuestion.hint}
                  </div>
                ) : (
                  <Button
                    onClick={() => setShowHint(true)}
                    variant="outline"
                    className="border-3 border-blue-700 text-blue-900 hover:bg-blue-700 hover:text-white font-bold text-base"
                  >
                    💡 Ver Pista
                  </Button>
                )}
              </div>
            )}

            {/* Submit Button */}
            {!showResult && (
              <Button
                onClick={handleAnswer}
                disabled={!selectedAnswer}
                className="w-full bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#0f1e30] text-xl py-7 hover:shadow-xl transition-all font-bold border-3 border-[#B8860B] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Responder
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
