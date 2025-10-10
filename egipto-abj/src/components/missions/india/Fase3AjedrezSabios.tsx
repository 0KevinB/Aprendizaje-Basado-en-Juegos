'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Fase3Props {
  onComplete: (score: number) => void;
  onProgressUpdate?: (progress: number, data?: Record<string, unknown>) => void;
  savedProgress?: Record<string, unknown> | null;
}

interface Question {
  question: string;
  options: string[];
  correct: number;
  category: string;
}

const questions: Question[] = [
  // Religion (3 questions)
  {
    category: 'Religion',
    question: '¿Quién es el fundador del budismo?',
    options: ['Brahma', 'Siddhartha Gautama', 'Vishnu', 'Shiva'],
    correct: 1,
  },
  {
    category: 'Religion',
    question: '¿Cuál es la religión más antigua de India?',
    options: ['Budismo', 'Hinduismo', 'Jainismo', 'Sijismo'],
    correct: 1,
  },
  {
    category: 'Religion',
    question: '¿Cuáles son los tres dioses principales del hinduismo?',
    options: [
      'Brahma/Vishnu/Shiva',
      'Ra/Osiris/Horus',
      'Zeus/Poseidón/Hades',
      'Odin/Thor/Loki'
    ],
    correct: 0,
  },
  // Science (3 questions)
  {
    category: 'Ciencia',
    question: '¿Qué invención matemática india cambió el mundo?',
    options: ['El álgebra', 'El cero', 'La geometría', 'Los números romanos'],
    correct: 1,
  },
  {
    category: 'Ciencia',
    question: '¿Cómo se llama la medicina tradicional india?',
    options: ['Acupuntura', 'Ayurveda', 'Homeopatía', 'Herbolaria'],
    correct: 1,
  },
  {
    category: 'Ciencia',
    question: '¿Qué sistema numérico desarrollaron?',
    options: ['Binario', 'Hexadecimal', 'Decimal', 'Octal'],
    correct: 2,
  },
  // Society (3 questions)
  {
    category: 'Sociedad',
    question: '¿Cómo se llamaba el sistema de organización social?',
    options: ['Feudalismo', 'Sistema de castas', 'Esclavitud', 'Monarquía'],
    correct: 1,
  },
  {
    category: 'Sociedad',
    question: '¿Quiénes ocupaban la casta más alta?',
    options: ['Guerreros', 'Comerciantes', 'Brahmanes', 'Campesinos'],
    correct: 2,
  },
  {
    category: 'Sociedad',
    question: '¿Qué imperio indio fue famoso por su extensión?',
    options: ['Imperio Maurya', 'Imperio Romano', 'Imperio Persa', 'Imperio Mongol'],
    correct: 0,
  },
  // Culture (3 questions)
  {
    category: 'Cultura',
    question: '¿Qué disciplina india busca la unión cuerpo-mente?',
    options: ['Taichí', 'Yoga', 'Karate', 'Meditación'],
    correct: 1,
  },
  {
    category: 'Cultura',
    question: '¿Cuál es la lengua sagrada de la India?',
    options: ['Hindi', 'Árabe', 'Sánscrito', 'Pali'],
    correct: 2,
  },
  {
    category: 'Cultura',
    question: '¿Qué juego indio dio origen al ajedrez?',
    options: ['Chaturanga', 'Backgammon', 'Go', 'Damas'],
    correct: 0,
  },
];

const roleDescriptions = [
  { role: 'Estratega', description: 'Planifica las respuestas del equipo', icon: '♟️' },
  { role: 'Sabio', description: 'Aporta conocimiento y razonamiento', icon: '🧘' },
  { role: 'Escriba', description: 'Registra las decisiones del grupo', icon: '📜' },
  { role: 'Vocero', description: 'Presenta las respuestas finales', icon: '📢' },
];

export function Fase3AjedrezSabios({ onComplete, onProgressUpdate, savedProgress }: Fase3Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showNarrative, setShowNarrative] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Load saved progress on mount
  useEffect(() => {
    if (savedProgress) {
      if (savedProgress.currentQuestion !== undefined) {
        setCurrentQuestion(savedProgress.currentQuestion as number);
      }
      if (savedProgress.answers) {
        setAnswers(savedProgress.answers as Record<number, number>);
      }
      if (savedProgress.showResults !== undefined) {
        setShowResults(savedProgress.showResults as boolean);
      }
      setShowNarrative(false);
    }
  }, [savedProgress]);

  // Auto-save progress
  useEffect(() => {
    const answeredCount = Object.keys(answers).length;
    const progressPercentage = (answeredCount / questions.length) * 100;

    if (onProgressUpdate && answeredCount > 0 && answeredCount < questions.length) {
      onProgressUpdate(progressPercentage, {
        currentQuestion,
        answers,
        showResults,
      });
    }
  }, [answers, currentQuestion, showResults, onProgressUpdate]);

  const handleAnswer = (answerIdx: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIdx,
    }));
  };

  const handleNext = () => {
    if (answers[currentQuestion] === undefined) {
      setNotification({ type: 'error', message: '⚠️ Debes seleccionar una respuesta antes de continuar.' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // All questions answered, show results
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const handleComplete = () => {
    const correctAnswers = calculateScore();
    const scorePercentage = Math.round((correctAnswers / questions.length) * 100);
    onComplete(scorePercentage);
  };

  const correctAnswers = calculateScore();
  const isPassed = correctAnswers >= 8; // 67% (8/12)
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Board positions for visual progress
  const boardPositions = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-6 rounded-lg border-4 shadow-2xl max-w-2xl animate-in slide-in-from-top ${
            notification.type === 'success'
              ? 'bg-green-50 border-green-600 text-green-900'
              : 'bg-red-50 border-red-600 text-red-900'
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl">{notification.type === 'success' ? '🎉' : '❌'}</span>
            <p className="text-xl font-bold flex-1">{notification.message}</p>
            <Button
              onClick={() => setNotification(null)}
              variant="ghost"
              className={`text-2xl font-bold ${
                notification.type === 'success' ? 'text-green-900 hover:bg-green-100' : 'text-red-900 hover:bg-red-100'
              }`}
            >
              ✕
            </Button>
          </div>
        </div>
      )}

      {/* Progress Board */}
      {!showResults && (
        <Card className="border-4 border-[#FF6B35] bg-gradient-to-br from-[#FFF5E6] to-[#FFE4CC] shadow-xl">
          <CardContent className="pt-6 pb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">♟️</span>
                <span className="font-extrabold text-xl text-[#8B4000]">Tablero de Progreso</span>
              </div>
              <div className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] px-5 py-2 rounded-full border-3 border-[#8B4000] shadow-md">
                <span className="font-extrabold text-2xl text-white">
                  {Object.keys(answers).length} / {questions.length}
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="h-8 bg-white rounded-full border-4 border-[#8B4000] overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-[#FF6B35] via-[#F7931E] to-[#FFD700] transition-all duration-500 ease-out flex items-center justify-end pr-3 shadow-lg"
                  style={{ width: `${progress}%` }}
                >
                  {progress > 15 && (
                    <span className="text-sm font-extrabold text-white drop-shadow-md">
                      {Math.round(progress)}%
                    </span>
                  )}
                </div>
              </div>
              {/* Board positions */}
              <div className="grid grid-cols-12 gap-1 mt-3">
                {boardPositions.map((pos) => (
                  <div
                    key={pos}
                    className={`aspect-square rounded-md flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                      answers[pos] !== undefined
                        ? answers[pos] === questions[pos].correct
                          ? 'bg-green-500 text-white scale-110'
                          : 'bg-red-500 text-white scale-110'
                        : pos === currentQuestion
                        ? 'bg-[#F7931E] text-white border-2 border-[#8B4000] animate-pulse'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {answers[pos] !== undefined ? (
                      answers[pos] === questions[pos].correct ? '✓' : '✗'
                    ) : pos === currentQuestion ? (
                      '♟️'
                    ) : (
                      pos + 1
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Narrative */}
      {showNarrative && (
        <Card className="border-4 border-[#F7931E] bg-gradient-to-br from-[#FFF5E6] to-[#FFE4CC]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-serif text-[#8B4000]">
                ♟️ FASE 3: El Ajedrez de los Sabios
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowNarrative(false)} className="text-[#8B4000]">
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[#5D3A1A]">
            <p className="text-lg leading-relaxed">
              En el palacio del gran Imperio Maurya, los sabios de la India antigua han creado un tablero
              místico inspirado en el <strong>Chaturanga</strong>, el juego ancestral que dio origen al ajedrez.
            </p>
            <p className="text-lg leading-relaxed">
              Para avanzar en este tablero sagrado, deberán demostrar su conocimiento sobre la <strong>religión,
              ciencia, sociedad y cultura</strong> de la India antigua, respondiendo a los enigmas de los maestros.
            </p>
            <div className="bg-[#FF6B35] p-6 rounded-lg border-2 border-[#8B4000]">
              <p className="text-xl font-bold text-white text-center">
                ♟️ <strong>DESAFÍO:</strong> Responde correctamente al menos 8 de 12 preguntas para obtener el
                <strong> Sello del Ajedrez de los Sabios</strong>.
              </p>
            </div>
            <div className="bg-[#FFD700] p-4 rounded-lg border-2 border-[#8B4000]">
              <p className="text-base font-semibold text-[#8B4000]">
                📚 Las preguntas están organizadas en 4 categorías:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#5D3A1A]">
                <li><strong>Religión:</strong> Hinduismo, Budismo y los dioses de India</li>
                <li><strong>Ciencia:</strong> Sistema decimal, el cero y medicina ayurvédica</li>
                <li><strong>Sociedad:</strong> Sistema de castas, emperadores y vida cotidiana</li>
                <li><strong>Cultura:</strong> Sánscrito, mandalas, yoga y chaturanga</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Roles */}
      <Card className="border-4 border-[#F7931E] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#8B4000]">👥 Roles del Equipo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {roleDescriptions.map((roleInfo, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-[#FFF5E6] to-[#FFE4CC] p-4 rounded-lg border-2 border-[#FF6B35]"
              >
                <h3 className="font-bold text-lg text-[#8B4000]">
                  {roleInfo.icon} {roleInfo.role}
                </h3>
                <p className="text-sm text-[#5D3A1A]">{roleInfo.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      {!showResults && (
        <Card className="border-4 border-[#FF6B35] bg-white">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-serif text-[#8B4000]">
                Pregunta {currentQuestion + 1} de {questions.length}
              </CardTitle>
              <div className="bg-[#F7931E] px-4 py-2 rounded-full">
                <span className="text-sm font-bold text-white">
                  {questions[currentQuestion].category}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-br from-[#FFF5E6] to-[#FFE4CC] p-6 rounded-lg border-3 border-[#F7931E]">
              <h3 className="text-xl font-bold text-[#8B4000] mb-6">
                {questions[currentQuestion].question}
              </h3>
              <div className="grid gap-3">
                {questions[currentQuestion].options.map((option, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className={`text-left justify-start p-5 text-base transition-all duration-200 ${
                      answers[currentQuestion] === idx
                        ? 'bg-[#FF6B35] text-white border-3 border-[#8B4000] scale-105 shadow-lg'
                        : 'bg-white border-2 border-[#F7931E] text-[#8B4000] hover:bg-[#FFE4CC] hover:border-[#FF6B35]'
                    }`}
                  >
                    <span className="font-semibold mr-3">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="bg-gray-500 hover:bg-gray-600 text-white text-lg py-6 px-8 font-bold disabled:opacity-50"
              >
                ← Anterior
              </Button>
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-white text-lg py-6 px-8 font-bold flex-1"
              >
                {currentQuestion === questions.length - 1 ? 'Ver Resultados' : 'Siguiente →'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Summary */}
      {showResults && (
        <Card className={`border-4 ${isPassed ? 'border-green-600 bg-gradient-to-r from-green-50 to-green-100' : 'border-red-600 bg-gradient-to-r from-red-50 to-red-100'}`}>
          <CardContent className="pt-6 space-y-6">
            <div className="text-center space-y-4">
              <div className="text-6xl">{isPassed ? '♟️' : '❌'}</div>
              <h2 className={`text-3xl font-serif font-bold ${isPassed ? 'text-green-900' : 'text-red-900'}`}>
                {isPassed
                  ? '¡Has obtenido el Sello del Ajedrez de los Sabios!'
                  : '¡Sigue aprendiendo sobre la India antigua!'}
              </h2>
              <div className={`text-5xl font-extrabold ${isPassed ? 'text-green-700' : 'text-red-700'}`}>
                {correctAnswers} / {questions.length}
              </div>
              <p className={`text-lg ${isPassed ? 'text-green-800' : 'text-red-800'}`}>
                {isPassed
                  ? `Has respondido correctamente ${correctAnswers} preguntas. ¡Eres un verdadero sabio de la India!`
                  : `Necesitas al menos 8 respuestas correctas. Has logrado ${correctAnswers}.`}
              </p>
            </div>

            {/* Detailed Results */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-[#8B4000] mb-4">📊 Resultados Detallados:</h3>
              {questions.map((q, idx) => {
                const userAnswer = answers[idx];
                const isCorrect = userAnswer === q.correct;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-2 ${
                      isCorrect
                        ? 'bg-green-50 border-green-500'
                        : 'bg-red-50 border-red-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{isCorrect ? '✓' : '✗'}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-[#8B4000] mb-2">
                          {idx + 1}. {q.question}
                        </p>
                        <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          <strong>Tu respuesta:</strong> {q.options[userAnswer]}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-700 mt-1">
                            <strong>Respuesta correcta:</strong> {q.options[q.correct]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              {!isPassed && (
                <Button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers({});
                    setShowResults(false);
                  }}
                  className="bg-[#FF6B35] hover:bg-[#F7931E] text-white text-xl py-7 px-10 font-bold"
                >
                  🔄 Intentar de Nuevo
                </Button>
              )}
              <Button
                onClick={handleComplete}
                className={`${
                  isPassed
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-600 hover:bg-gray-700'
                } text-white text-xl py-7 px-10 font-bold`}
              >
                {isPassed ? 'Completar Misión ✓' : 'Continuar de Todos Modos'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
