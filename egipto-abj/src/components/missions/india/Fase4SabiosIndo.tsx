'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Fase4Props {
  onComplete: (score: number) => void;
  onProgressUpdate?: (progress: number, data?: Record<string, unknown>) => void;
  savedProgress?: Record<string, unknown> | null;
}

const boardSize = 36; // 6x6 board

// Ladders (shortcuts to enlightenment)
const ladders = {
  3: 14,
  8: 19,
  11: 26,
  16: 30,
};

// Snakes (obstacles on the path)
const snakes = {
  33: 12,
  27: 9,
  21: 5,
};

const questions = [
  // Religión
  {
    category: 'Religión',
    question: '🕉️ ¿Qué significa "Buda"?',
    options: ['El iluminado', 'El poderoso', 'El sabio', 'El guerrero'],
    correct: 0,
  },
  {
    category: 'Religión',
    question: '🕉️ ¿Cuántos dioses principales tiene el hinduismo?',
    options: ['1', '3', '7', '12'],
    correct: 1,
  },
  {
    category: 'Religión',
    question: '🕉️ ¿Qué busca el budismo?',
    options: ['Riqueza', 'Poder', 'Iluminación', 'Gloria'],
    correct: 2,
  },
  {
    category: 'Religión',
    question: '🕉️ ¿Qué ríos son sagrados en India?',
    options: ['Nilo y Tigris', 'Indo y Ganges', 'Amazonas y Misisipi', 'Danubio y Rin'],
    correct: 1,
  },
  {
    category: 'Religión',
    question: '🕉️ ¿Qué representa el karma en el hinduismo?',
    options: ['La suerte', 'Las acciones y sus consecuencias', 'El destino fijo', 'La reencarnación'],
    correct: 1,
  },
  // Ciencia
  {
    category: 'Ciencia',
    question: '🔢 ¿Quién inventó el cero?',
    options: ['Griegos', 'Romanos', 'Indios', 'Árabes'],
    correct: 2,
  },
  {
    category: 'Ciencia',
    question: '🔢 La medicina ayurvédica busca equilibrio entre...',
    options: ['Cuerpo y mente', 'Rico y pobre', 'Cielo y tierra', 'Sol y luna'],
    correct: 0,
  },
  {
    category: 'Ciencia',
    question: '🔢 ¿Qué permite el sistema decimal?',
    options: ['Contar hasta 10', 'Representar cualquier número', 'Multiplicar', 'Dividir'],
    correct: 1,
  },
  {
    category: 'Ciencia',
    question: '🔢 ¿Qué avance matemático desarrollaron los indios antiguos?',
    options: ['Geometría básica', 'Álgebra y trigonometría', 'Cálculo', 'Estadística'],
    correct: 1,
  },
  {
    category: 'Ciencia',
    question: '🔢 ¿Qué práctica médica se originó en India?',
    options: ['Acupuntura', 'Homeopatía', 'Ayurveda', 'Quiropráctica'],
    correct: 2,
  },
  // Sociedad
  {
    category: 'Sociedad',
    question: '👥 ¿Cuántas castas principales había?',
    options: ['2', '4', '6', '8'],
    correct: 1,
  },
  {
    category: 'Sociedad',
    question: '👥 ¿Qué emperador expandió el budismo?',
    options: ['Ashoka', 'César', 'Alejandro', 'Ciro'],
    correct: 0,
  },
  {
    category: 'Sociedad',
    question: '👥 Las ciudades de Harappa y Mohenjo-Daro tenían...',
    options: ['Pirámides', 'Sistemas de drenaje', 'Murallas', 'Coliseos'],
    correct: 1,
  },
  {
    category: 'Sociedad',
    question: '👥 ¿Cuál era la casta más alta en el sistema social?',
    options: ['Guerreros', 'Brahmanes (sacerdotes)', 'Comerciantes', 'Agricultores'],
    correct: 1,
  },
  {
    category: 'Sociedad',
    question: '👥 ¿Qué civilización floreció en el valle del Indo?',
    options: ['Sumeria', 'Egipcia', 'Harappa', 'Babilónica'],
    correct: 2,
  },
  // Cultura
  {
    category: 'Cultura',
    question: '🎨 El yoga es una práctica...',
    options: ['Guerrera', 'Espiritual y física', 'Comercial', 'Agrícola'],
    correct: 1,
  },
  {
    category: 'Cultura',
    question: '🎨 Los mandalas representan...',
    options: ['Mapas', 'Equilibrio cósmico', 'Calendarios', 'Escritura'],
    correct: 1,
  },
  {
    category: 'Cultura',
    question: '🎨 ¿Qué lengua se usaba en textos sagrados?',
    options: ['Hindi', 'Sánscrito', 'Árabe', 'Persa'],
    correct: 1,
  },
  {
    category: 'Cultura',
    question: '🎨 El Chaturanga era un juego de...',
    options: ['Cartas', 'Estrategia militar', 'Dados', 'Deportes'],
    correct: 1,
  },
  {
    category: 'Cultura',
    question: '🎨 ¿Qué texto sagrado contiene himnos y rituales védicos?',
    options: ['El Corán', 'La Biblia', 'Los Vedas', 'El Tao Te Ching'],
    correct: 2,
  },
];

const roleDescriptions = [
  { role: '🗺️ Explorador', description: 'Mueve las fichas en el tablero' },
  { role: '🧙 Sabio', description: 'Organiza al grupo para responder' },
  { role: '📝 Escriba', description: 'Toma notas de los avances' },
  { role: '📣 Vocero', description: 'Presenta las respuestas del equipo' },
];

export function Fase4SabiosIndo({ onComplete, onProgressUpdate, savedProgress }: Fase4Props) {
  const [playerPosition, setPlayerPosition] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showNarrative, setShowNarrative] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Load saved progress on mount
  useEffect(() => {
    if (savedProgress) {
      if (savedProgress.playerPosition !== undefined) {
        setPlayerPosition(savedProgress.playerPosition as number);
      }
      if (savedProgress.currentQuestionIndex !== undefined) {
        setCurrentQuestionIndex(savedProgress.currentQuestionIndex as number);
      }
      if (savedProgress.score !== undefined) {
        setScore(savedProgress.score as number);
      }
      if (savedProgress.correctAnswers !== undefined) {
        setCorrectAnswers(savedProgress.correctAnswers as number);
      }
      if (savedProgress.totalAnswered !== undefined) {
        setTotalAnswered(savedProgress.totalAnswered as number);
      }
      setShowNarrative(false);
    }
  }, [savedProgress]);

  // Auto-save progress when position changes
  useEffect(() => {
    const progressPercentage = (playerPosition / boardSize) * 100;

    if (onProgressUpdate && playerPosition > 1 && playerPosition < boardSize) {
      onProgressUpdate(progressPercentage, {
        playerPosition,
        currentQuestionIndex,
        score,
        correctAnswers,
        totalAnswered,
      });
    }
  }, [playerPosition, currentQuestionIndex, score, correctAnswers, totalAnswered, onProgressUpdate]);

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === currentQuestion.correct;
    setIsCorrect(correct);
    setShowResult(true);
    setTotalAnswered(totalAnswered + 1);

    if (correct) {
      setCorrectAnswers(correctAnswers + 1);
      setScore(score + 20);
    }

    // Roll dice with animation
    setIsRolling(true);
    const roll = Math.floor(Math.random() * 6) + 1;

    setTimeout(() => {
      setDiceRoll(roll);
      setIsRolling(false);
    }, 1000);

    // Move after showing result
    setTimeout(() => {
      movePlayer(correct ? roll : -1);
      nextQuestion();
    }, 3500);
  };

  const movePlayer = (spaces: number) => {
    let newPosition = playerPosition;

    if (spaces === -1) {
      // Wrong answer: go back 1 space
      newPosition = Math.max(1, playerPosition - 1);
    } else {
      // Correct answer: move forward
      newPosition = playerPosition + spaces;
    }

    // Check if won
    if (newPosition >= boardSize) {
      newPosition = boardSize;
      setPlayerPosition(newPosition);

      // Check if passed with 70% accuracy
      const accuracy = ((correctAnswers + (spaces > 0 ? 1 : 0)) / (totalAnswered + 1)) * 100;
      if (accuracy >= 70) {
        setGameWon(true);
      } else {
        // Not enough accuracy, show message and continue
        setTimeout(() => {
          alert(`Necesitas al menos 70% de respuestas correctas. Tienes ${accuracy.toFixed(0)}%. ¡Sigue intentando!`);
          setPlayerPosition(boardSize - 3); // Move back a bit
        }, 1000);
      }
      return;
    }

    setPlayerPosition(newPosition);

    // Check for ladder after position is set
    if (ladders[newPosition as keyof typeof ladders]) {
      setTimeout(() => {
        setPlayerPosition(ladders[newPosition as keyof typeof ladders]);
      }, 600);
      return;
    }

    // Check for snake after position is set
    if (snakes[newPosition as keyof typeof snakes]) {
      setTimeout(() => {
        setPlayerPosition(snakes[newPosition as keyof typeof snakes]);
      }, 600);
      return;
    }
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((currentQuestionIndex + 1) % questions.length);
    setSelectedAnswer(null);
    setShowResult(false);
    setDiceRoll(null);
  };

  const renderBoard = () => {
    const cells = [];
    const rows = 6;
    const cols = 6;

    for (let row = rows - 1; row >= 0; row--) {
      for (let col = 0; col < cols; col++) {
        const cellNumber = row * cols + col + 1;
        const isPlayerHere = playerPosition === cellNumber;
        const isLadder = ladders[cellNumber as keyof typeof ladders];
        const isSnake = snakes[cellNumber as keyof typeof snakes];
        const isStart = cellNumber === 1;
        const isEnd = cellNumber === boardSize;

        cells.push(
          <div
            key={cellNumber}
            className={`
              aspect-square flex flex-col items-center justify-center text-xs font-bold border-2 relative
              ${isStart ? 'bg-orange-200 border-orange-600' : ''}
              ${isEnd ? 'bg-gradient-to-br from-[#F7931E] to-[#FF6B35] border-[#8B4000]' : ''}
              ${isLadder && !isStart && !isEnd ? 'bg-blue-100 border-blue-500' : ''}
              ${isSnake ? 'bg-red-100 border-red-500' : ''}
              ${!isStart && !isEnd && !isLadder && !isSnake ? 'bg-gradient-to-br from-[#FFF8E7] to-[#FFE4B5] border-[#CD853F]' : ''}
              ${isPlayerHere ? 'ring-4 ring-[#FF6B35] scale-110' : ''}
              transition-all duration-300
            `}
          >
            <div className="text-[10px] text-[#8B4000] font-semibold">{cellNumber}</div>
            {isPlayerHere && <div className="text-2xl">🧘</div>}
            {isLadder && !isPlayerHere && <div className="text-xl">🪜</div>}
            {isSnake && !isPlayerHere && <div className="text-xl">🐍</div>}
            {isEnd && !isPlayerHere && <div className="text-xl">🕉️</div>}
            {isStart && !isPlayerHere && <div className="text-sm">▶️</div>}
          </div>
        );
      }
    }
    return cells;
  };

  const accuracy = totalAnswered > 0 ? (correctAnswers / totalAnswered) * 100 : 0;

  if (gameWon) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Card className="border-4 border-[#FF6B35] bg-gradient-to-br from-orange-50 to-amber-100">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="text-8xl">🕉️</div>
            <h1 className="text-5xl font-serif font-bold text-[#8B4000]">
              ¡Iluminación Alcanzada!
            </h1>
            <h2 className="text-3xl font-serif font-bold text-orange-800">
              Has obtenido el Sello de los Sabios del Indo
            </h2>
            <div className="bg-white p-8 rounded-lg border-4 border-[#FF6B35]">
              <div className="text-6xl font-bold text-[#FF6B35] mb-2">{score}</div>
              <div className="text-2xl text-[#8B4000] font-semibold">Puntos Totales</div>
              <div className="text-lg text-orange-700 mt-4">
                Precisión: {accuracy.toFixed(0)}% ({correctAnswers}/{totalAnswered} correctas)
              </div>
            </div>
            <p className="text-xl text-[#8B4000] max-w-2xl mx-auto leading-relaxed">
              ¡Felicidades! Has recorrido el camino del conocimiento y alcanzado la iluminación.
              Ahora eres un <strong>Sabio del Indo</strong>, guardián de la sabiduría ancestral de la India.
            </p>
            <Button
              onClick={() => onComplete(score)}
              className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-white text-2xl py-8 px-12 font-bold border-2 border-[#8B4000]"
            >
              Completar Misión
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* Progress */}
      <Card className="border-4 border-[#FF6B35] bg-gradient-to-br from-[#FFF8E7] to-[#FFE4B5] shadow-xl">
        <CardContent className="pt-6 pb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧘</span>
              <span className="font-extrabold text-xl text-[#8B4000]">Camino a la Iluminación</span>
            </div>
            <div className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] px-5 py-2 rounded-full border-3 border-[#8B4000] shadow-md">
              <span className="font-extrabold text-2xl text-white">{playerPosition} / {boardSize}</span>
            </div>
          </div>
          <div className="relative">
            <div className="h-8 bg-white rounded-full border-4 border-[#8B4000] overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[#FF6B35] via-[#F7931E] to-[#FFD700] transition-all duration-300 ease-out flex items-center justify-end pr-3 shadow-lg"
                style={{ width: `${(playerPosition / boardSize) * 100}%` }}
              >
                {playerPosition > 3 && (
                  <span className="text-sm font-extrabold text-white drop-shadow-md">
                    {Math.round((playerPosition / boardSize) * 100)}%
                  </span>
                )}
              </div>
            </div>
            {/* Milestones */}
            <div className="flex justify-between mt-2 px-1 text-xs text-[#8B4000] font-bold">
              <span>▶️ 1</span>
              <span>🪜 14</span>
              <span>🪜 26</span>
              <span>🕉️ {boardSize}</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="text-center bg-white rounded-full py-3 border-3 border-[#8B4000] shadow-md">
              <span className="text-xl font-extrabold text-[#8B4000]">💎 {score} puntos</span>
            </div>
            <div className="text-center bg-white rounded-full py-3 border-3 border-[#8B4000] shadow-md">
              <span className="text-xl font-extrabold text-[#8B4000]">
                ✓ {accuracy.toFixed(0)}% precisión
              </span>
            </div>
          </div>
          <div className="mt-3 text-center text-sm text-[#8B4000] font-semibold">
            Necesitas 70% de respuestas correctas para alcanzar la iluminación
          </div>
        </CardContent>
      </Card>

      {/* Narrative */}
      {showNarrative && (
        <Card className="border-4 border-[#FF6B35] bg-gradient-to-br from-[#FFF8E7] to-[#FFE4B5]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-serif text-[#8B4000]">
                🕉️ FASE 4 - CONQUISTA: Los Sabios del Indo
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowNarrative(false)} className="text-[#8B4000]">
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[#5D4037]">
            <p className="text-lg leading-relaxed">
              En las tierras sagradas del valle del Indo, los antiguos sabios buscaban la iluminación
              a través del conocimiento y la reflexión. Su sabiduría abarcaba la religión, la ciencia,
              la sociedad y la cultura.
            </p>
            <p className="text-lg leading-relaxed">
              Ahora es tu turno de seguir este camino místico. En cada casilla del tablero encontrarás
              preguntas que pondrán a prueba tu comprensión de la civilización india antigua. Solo
              aquellos que demuestren verdadera sabiduría alcanzarán la iluminación.
            </p>
            <div className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] p-6 rounded-lg border-2 border-[#8B4000]">
              <p className="text-xl font-bold text-white text-center">
                🏺 <strong>DESAFÍO:</strong> Recorre el tablero de Parchís, responde las preguntas
                y alcanza el espacio 36 con al menos <strong>70% de precisión</strong> para obtener el
                <strong> Sello de los Sabios del Indo</strong>.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-[#CD853F]">
              <h3 className="font-bold text-[#8B4000] mb-2">📋 Reglas del Juego:</h3>
              <ul className="list-disc list-inside text-sm text-[#5D4037] space-y-1">
                <li>Responde correctamente: tira el dado (1-6) y avanza esas casillas + 20 puntos</li>
                <li>Responde incorrectamente: retrocedes 1 casilla (no pierdes puntos)</li>
                <li>🪜 Escaleras: te impulsan hacia adelante en el camino</li>
                <li>🐍 Serpientes: representan obstáculos que te hacen retroceder</li>
                <li>Llega a la casilla 36 con 70% o más de respuestas correctas para ganar</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border-2 border-[#CD853F]">
              <h3 className="font-bold text-[#8B4000] mb-2">📚 Categorías de Preguntas:</h3>
              <div className="grid md:grid-cols-2 gap-2 text-sm text-[#5D4037]">
                <div>🕉️ Religión (hinduismo, budismo)</div>
                <div>🔢 Ciencia (decimal, cero, medicina)</div>
                <div>👥 Sociedad (castas, emperadores)</div>
                <div>🎨 Cultura (yoga, sánscrito, mandalas)</div>
              </div>
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
                className="bg-gradient-to-r from-[#FFF8E7] to-[#FFE4B5] p-4 rounded-lg border-2 border-[#CD853F]"
              >
                <h3 className="font-bold text-lg text-[#8B4000]">{roleInfo.role}</h3>
                <p className="text-sm text-[#5D4037]">{roleInfo.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Game Board */}
      <Card className="border-4 border-[#FF6B35] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#8B4000] text-center">
            🎲 Tablero de Parchís de la Sabiduría
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-1 max-w-2xl mx-auto">
            {renderBoard()}
          </div>
          <div className="mt-4 text-center text-sm text-[#5D4037]">
            <p>🪜 Escaleras (Atajos): 3→14, 8→19, 11→26, 16→30</p>
            <p>🐍 Serpientes (Obstáculos): 33→12, 27→9, 21→5</p>
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="border-4 border-[#FF6B35] bg-white">
        <CardHeader>
          <div className="text-center space-y-2">
            <div className="inline-block bg-gradient-to-r from-[#FF6B35] to-[#F7931E] px-4 py-2 rounded-full">
              <span className="text-sm font-bold text-white">{currentQuestion.category}</span>
            </div>
            <CardTitle className="text-2xl font-serif text-[#8B4000]">
              {currentQuestion.question}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => setSelectedAnswer(index)}
              disabled={showResult}
              className={`w-full text-lg py-6 transition-all font-semibold text-left justify-start ${
                showResult
                  ? index === currentQuestion.correct
                    ? 'bg-green-600 text-white'
                    : index === selectedAnswer
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                  : selectedAnswer === index
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white border-2 border-[#8B4000]'
                  : 'bg-white border-2 border-[#CD853F] text-[#8B4000] hover:bg-gradient-to-r hover:from-[#FFF8E7] hover:to-[#FFE4B5]'
              }`}
            >
              {option}
            </Button>
          ))}

          {showResult && (
            <div
              className={`p-6 rounded-lg text-center text-lg font-bold border-4 ${
                isCorrect
                  ? 'bg-green-50 text-green-900 border-green-700'
                  : 'bg-red-50 text-red-900 border-red-700'
              }`}
            >
              {isCorrect ? (
                <>
                  {isRolling ? (
                    <div className="text-5xl mb-3 animate-bounce">🎲</div>
                  ) : (
                    <div className="text-5xl mb-3">🎲 {diceRoll}</div>
                  )}
                  <div>✅ ¡Correcto! (+20 puntos)</div>
                  {diceRoll && <div>Avanzas {diceRoll} casillas</div>}
                </>
              ) : (
                <>
                  <div className="text-5xl mb-3">❌</div>
                  <div>Incorrecto</div>
                  <div className="text-sm mt-2">Respuesta correcta: {currentQuestion.options[currentQuestion.correct]}</div>
                  <div className="mt-2">Retrocedes 1 casilla</div>
                </>
              )}
            </div>
          )}

          {!showResult && (
            <Button
              onClick={handleAnswer}
              disabled={selectedAnswer === null}
              className="w-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-white text-xl py-7 font-bold border-3 border-[#8B4000] disabled:opacity-50"
            >
              {selectedAnswer === null ? 'Selecciona una respuesta' : '🎲 Confirmar Respuesta y Tirar Dado'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
