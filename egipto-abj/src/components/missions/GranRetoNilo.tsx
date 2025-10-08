'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { generateGranRetoNiloQuestions } from '@/lib/gameGenerators';
import { GameQuestion } from '@/types';

interface GranRetoNiloProps {
  onComplete: (score: number) => void;
}

const boardSize = 30;
const snakes = {
  17: 7,
  24: 11,
  28: 8,
};

const ladders = {
  3: 14,
  9: 18,
  12: 22,
  15: 26,
};

const roleDescriptions = [
  { role: 'Explorador', description: 'Mueve las fichas en el tablero', icon: '🗺️' },
  { role: 'Sabio', description: 'Organiza al grupo para responder', icon: '🧙' },
  { role: 'Escriba', description: 'Toma notas de los avances', icon: '📝' },
  { role: 'Guardián', description: 'Defiende en caso de empate', icon: '🛡️' },
];

export function GranRetoNilo({ onComplete }: GranRetoNiloProps) {
  const [playerPosition, setPlayerPosition] = useState(1);
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<GameQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [score, setScore] = useState(0);
  const [showNarrative, setShowNarrative] = useState(true);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const generatedQuestions = generateGranRetoNiloQuestions(20);
    setQuestions(generatedQuestions);
    setCurrentQuestion(generatedQuestions[0]);
  }, []);

  // const rollDice = () => {
  //   if (!currentQuestion || showResult) return;
  //   // En lugar de tirar un dado, avanzamos según la respuesta correcta
  //   // Esto hace el juego más educativo
  // };

  const handleAnswer = () => {
    if (!selectedAnswer || !currentQuestion) return;

    const correct = Array.isArray(currentQuestion.correctAnswer)
      ? currentQuestion.correctAnswer.includes(selectedAnswer)
      : selectedAnswer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(score + currentQuestion.points);

      // Avanzar en el tablero
      setTimeout(() => {
        let newPosition = playerPosition + 3; // Avanza 3 casillas por respuesta correcta

        // Verificar escaleras
        if (ladders[newPosition as keyof typeof ladders]) {
          newPosition = ladders[newPosition as keyof typeof ladders];
        }

        // Verificar serpientes
        if (snakes[newPosition as keyof typeof snakes]) {
          newPosition = snakes[newPosition as keyof typeof snakes];
        }

        // Verificar victoria
        if (newPosition >= boardSize) {
          newPosition = boardSize;
          setGameWon(true);
        }

        setPlayerPosition(newPosition);
        nextQuestion();
      }, 2000);
    } else {
      // Avanzar solo 1 casilla por respuesta incorrecta
      setTimeout(() => {
        let newPosition = playerPosition + 1;

        // Verificar serpientes
        if (snakes[newPosition as keyof typeof snakes]) {
          newPosition = snakes[newPosition as keyof typeof snakes];
        }

        setPlayerPosition(newPosition);
        nextQuestion();
      }, 2000);
    }
  };

  const nextQuestion = () => {
    const nextIndex = questionsAnswered + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestion(questions[nextIndex]);
      setQuestionsAnswered(nextIndex);
    } else {
      setCurrentQuestion(questions[0]);
      setQuestionsAnswered(0);
    }
    setSelectedAnswer('');
    setShowResult(false);
  };

  const renderBoard = () => {
    const cells = [];
    for (let i = boardSize; i >= 1; i--) {
      const isPlayerHere = playerPosition === i;
      const isLadder = ladders[i as keyof typeof ladders];
      const isSnake = snakes[i as keyof typeof snakes];
      const isStart = i === 1;
      const isEnd = i === boardSize;

      cells.push(
        <div
          key={i}
          className={`
            aspect-square flex items-center justify-center text-sm font-bold border-2
            ${isStart ? 'bg-green-200 border-green-600' : ''}
            ${isEnd ? 'bg-gold-200 border-[#FFD700]' : ''}
            ${isLadder ? 'bg-blue-100 border-blue-500' : ''}
            ${isSnake ? 'bg-red-100 border-red-500' : ''}
            ${!isStart && !isEnd && !isLadder && !isSnake ? 'bg-[#E6BE8A] border-[#C19A6B]' : ''}
            ${isPlayerHere ? 'ring-4 ring-[#FFD700] scale-110' : ''}
            transition-all duration-300
          `}
        >
          <div className="text-center">
            <div className="text-xs text-[#0f1e30]">{i}</div>
            {isPlayerHere && <div className="text-2xl">🚶</div>}
            {isLadder && !isPlayerHere && <div className="text-xl">🪜</div>}
            {isSnake && !isPlayerHere && <div className="text-xl">🐍</div>}
            {isEnd && !isPlayerHere && <div className="text-xl">🏆</div>}
          </div>
        </div>
      );
    }
    return cells;
  };

  if (gameWon) {
    return (
      <Card className="border-4 border-green-600 bg-gradient-to-r from-green-50 to-green-100 max-w-2xl mx-auto">
        <CardContent className="pt-12 pb-12 text-center space-y-6">
          <div className="text-8xl">⚱️</div>
          <h1 className="text-5xl font-serif font-bold text-green-900">
            ¡Victoria Legendaria!
          </h1>
          <h2 className="text-3xl font-serif font-bold text-green-800">
            Has obtenido el Sello de los Guardianes Eternos
          </h2>
          <div className="bg-white p-8 rounded-lg border-4 border-green-600">
            <div className="text-6xl font-bold text-green-700 mb-2">{score}</div>
            <div className="text-2xl text-green-900 font-semibold">Puntos Totales</div>
          </div>
          <p className="text-xl text-green-800 max-w-2xl mx-auto leading-relaxed">
            ¡Felicidades, joven explorador! Has completado todas las misiones y demostrado tu dominio
            del conocimiento del Antiguo Egipto. Ahora eres un <strong>Guardián Eterno del Nilo</strong>.
          </p>
          <Button
            onClick={() => onComplete(score)}
            className="bg-green-600 hover:bg-green-700 text-white text-2xl py-8 px-12 font-bold"
          >
            Completar Aventura
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <Card className="border-4 border-[#FFD700] bg-white">
        <CardContent className="pt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-bold text-[#0f1e30]">Posición en el Tablero</span>
            <span className="font-bold text-[#B8860B]">{playerPosition} / {boardSize}</span>
          </div>
          <Progress value={(playerPosition / boardSize) * 100} className="h-3" />
          <div className="mt-4 text-center">
            <span className="text-2xl font-bold text-[#0f1e30]">💎 {score} puntos</span>
          </div>
        </CardContent>
      </Card>

      {/* Narrative */}
      {showNarrative && (
        <Card className="border-4 border-[#FFD700] bg-gradient-to-br from-[#f5f1e8] to-[#E6BE8A]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-serif text-[#0f1e30]">
                ⚱️ MISIÓN 4: El Gran Reto del Nilo
              </CardTitle>
              <Button
                variant="ghost"
                onClick={() => setShowNarrative(false)}
                className="text-[#0f1e30]"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[#1e3a5f]">
            <p className="text-lg leading-relaxed">
              Tras superar las pruebas del faraón, descifrar los jeroglíficos y desbloquear los cofres
              sagrados, ha llegado el momento del <strong>desafío final</strong>.
            </p>
            <p className="text-lg leading-relaxed">
              Los antiguos sabios han preparado un tablero místico que representa el viaje del alma hacia
              la eternidad. Deberás responder preguntas que abarcan todo tu conocimiento del Antiguo Egipto
              para avanzar por el camino sagrado.
            </p>
            <div className="bg-[#FFD700] p-6 rounded-lg border-2 border-[#B8860B]">
              <p className="text-xl font-bold text-[#0f1e30] text-center">
                Solo los más sabios alcanzarán la meta y obtendrán el
                <strong> Sello de los Guardianes Eternos del Nilo</strong>.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Roles */}
      <Card className="border-4 border-[#40E0D0] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#0f1e30]">Roles del Equipo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {roleDescriptions.map((roleInfo, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-[#f5f1e8] to-[#E6D5B8] p-4 rounded-lg border-2 border-[#C19A6B]"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{roleInfo.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg text-[#0f1e30]">{roleInfo.role}</h3>
                    <p className="text-sm text-[#1e3a5f]">{roleInfo.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Game Board */}
      <Card className="border-4 border-[#FFD700] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#0f1e30]">
            Tablero del Nilo
          </CardTitle>
          <CardDescription className="text-base text-[#1e3a5f]">
            🪜 Escaleras te impulsan hacia arriba | 🐍 Serpientes te hacen retroceder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-1">
            {renderBoard()}
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      {currentQuestion && (
        <Card className="border-4 border-[#FFD700] bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#0f1e30] text-center">
              {currentQuestion.question}
            </CardTitle>
            <CardDescription className="text-center text-base text-[#1e3a5f]">
              Vale {currentQuestion.points} puntos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                        : 'bg-white border-2 border-[#C19A6B] text-[#0f1e30] hover:bg-[#E6D5B8]'
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {showResult && (
              <div
                className={`p-5 rounded-lg text-center text-lg font-bold border-3 ${
                  isCorrect
                    ? 'bg-green-50 text-green-900 border-green-700'
                    : 'bg-red-50 text-red-900 border-red-700'
                }`}
              >
                {isCorrect
                  ? '✅ ¡Correcto! Avanzas 3 casillas'
                  : `❌ Incorrecto. Avanzas 1 casilla. La respuesta correcta es: ${currentQuestion.correctAnswer}`}
              </div>
            )}

            {!showResult && (
              <Button
                onClick={handleAnswer}
                disabled={!selectedAnswer}
                className="w-full bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#0f1e30] text-xl py-7 font-bold border-3 border-[#B8860B] disabled:opacity-50"
              >
                Responder y Avanzar
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
