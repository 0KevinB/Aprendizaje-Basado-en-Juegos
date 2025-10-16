'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateSecretosGranMurallaQuestions } from '@/lib/gameGenerators';

interface Fase3Props {
  onComplete: (score: number) => void;
  onProgressUpdate?: (progress: number, data?: Record<string, unknown>) => void;
  savedProgress?: Record<string, unknown> | null;
}

type CartillaColor = 'red' | 'blue' | 'green' | 'yellow';

interface ColoredSquare {
  number: number;
  color: CartillaColor;
  colorName: string;
  category: string;
}

const boardSize = 36; // 6x6 board representing the Great Wall

// Color-coded cartillas system as per ABJ document
const colorCategories = {
  red: { name: 'Rojo', category: 'Inventos y Tecnología', emoji: '💡', bg: 'bg-red-500', border: 'border-red-700', text: 'text-red-900' },
  blue: { name: 'Azul', category: 'Dinastías e Historia', emoji: '👑', bg: 'bg-blue-500', border: 'border-blue-700', text: 'text-blue-900' },
  green: { name: 'Verde', category: 'Filosofía y Cultura', emoji: '☯️', bg: 'bg-green-500', border: 'border-green-700', text: 'text-green-900' },
  yellow: { name: 'Amarillo', category: 'Geografía y Comercio', emoji: '🗺️', bg: 'bg-yellow-500', border: 'border-yellow-700', text: 'text-yellow-900' },
};

// Generate color pattern for board squares
const generateColoredSquares = (): ColoredSquare[] => {
  const colors: CartillaColor[] = ['red', 'blue', 'green', 'yellow'];
  const squares: ColoredSquare[] = [];

  for (let i = 1; i <= boardSize; i++) {
    // Distribute colors evenly across the board
    const colorIndex = (i - 1) % colors.length;
    const color = colors[colorIndex];
    squares.push({
      number: i,
      color,
      colorName: colorCategories[color].name,
      category: colorCategories[color].category,
    });
  }

  return squares;
};

const roleDescriptions = [
  { role: '📖 Lector', description: 'Lee las preguntas y las cartillas al equipo' },
  { role: '✍️ Escritor', description: 'Anota las respuestas y el progreso en el tablero' },
  { role: '🎲 Armador', description: 'Lanza el dado y mueve las fichas en el tablero' },
  { role: '📢 Vocero', description: 'Presenta las respuestas finales y coordina' },
];

export function Fase3SecretosGranMuralla({ onComplete, onProgressUpdate, savedProgress }: Fase3Props) {
  const [questions] = useState(() => generateSecretosGranMurallaQuestions(20));
  const [coloredSquares] = useState(() => generateColoredSquares());
  const [playerPosition, setPlayerPosition] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showNarrative, setShowNarrative] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [showingCartilla, setShowingCartilla] = useState(false);
  const [currentCartillaColor, setCurrentCartillaColor] = useState<CartillaColor | null>(null);

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

  const handleRollDice = () => {
    if (isRolling || showingCartilla) return;

    setIsRolling(true);
    const roll = Math.floor(Math.random() * 6) + 1;

    setTimeout(() => {
      setDiceRoll(roll);
      setIsRolling(false);

      // Move player
      const newPosition = Math.min(playerPosition + roll, boardSize);
      setPlayerPosition(newPosition);

      // Check if won
      if (newPosition >= boardSize) {
        const accuracy = totalAnswered > 0 ? (correctAnswers / totalAnswered) * 100 : 0;
        if (accuracy >= 60) { // 60% to win
          setGameWon(true);
        } else {
          setTimeout(() => {
            alert(`Necesitas al menos 60% de respuestas correctas. Tienes ${accuracy.toFixed(0)}%. ¡Continúa respondiendo preguntas!`);
            setPlayerPosition(newPosition - 3); // Move back
          }, 1000);
        }
        return;
      }

      // Show cartilla for this square
      const square = coloredSquares[newPosition - 1];
      setCurrentCartillaColor(square.color);
      setShowingCartilla(true);
    }, 1000);
  };

  const handleAnswer = () => {
    if (selectedAnswer === null || selectedAnswer === '') return;

    let correct = false;
    if (currentQuestion.type === 'multiple-choice') {
      const correctAnswerText = currentQuestion.correctAnswer as string;
      const selectedAnswerText = currentQuestion.options?.[selectedAnswer as number];
      correct = selectedAnswerText === correctAnswerText;
    } else if (currentQuestion.type === 'fill-blank') {
      correct = (selectedAnswer as string).toLowerCase().trim() === (currentQuestion.correctAnswer as string).toLowerCase().trim();
    }

    setIsCorrect(correct);
    setShowResult(true);
    setTotalAnswered(totalAnswered + 1);

    if (correct) {
      setScore(score + (currentQuestion.points || 20));
      setCorrectAnswers(correctAnswers + 1);
    }

    // Move to next question after delay
    setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((currentQuestionIndex + 1) % questions.length);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowingCartilla(false);
    setCurrentCartillaColor(null);
    setDiceRoll(null);
  };

  const renderBoard = () => {
    const cells = [];
    const rows = 6;
    const cols = 6;

    for (let row = rows - 1; row >= 0; row--) {
      for (let col = 0; col < cols; col++) {
        const cellNumber = row * cols + col + 1;
        const square = coloredSquares[cellNumber - 1];
        const isPlayerHere = playerPosition === cellNumber;
        const isStart = cellNumber === 1;
        const isEnd = cellNumber === boardSize;
        const colorInfo = colorCategories[square.color];

        cells.push(
          <div
            key={cellNumber}
            className={`
              aspect-square flex flex-col items-center justify-center text-xs font-bold border-2 relative
              ${isStart ? 'bg-green-200 border-green-600' : ''}
              ${isEnd ? 'bg-gradient-to-br from-[#FFD700] to-[#FFA500] border-[#8B0000]' : ''}
              ${!isStart && !isEnd ? `${colorInfo.bg} ${colorInfo.border}` : ''}
              ${isPlayerHere ? 'ring-4 ring-[#FFD700] scale-110' : ''}
              transition-all duration-300
            `}
          >
            <div className="text-[10px] text-white font-bold bg-black/30 px-1 rounded">{cellNumber}</div>
            {isPlayerHere && <div className="text-3xl mt-1">🚶</div>}
            {!isPlayerHere && !isStart && !isEnd && (
              <div className="text-xl mt-1">{colorInfo.emoji}</div>
            )}
            {isEnd && !isPlayerHere && <div className="text-2xl">🐉</div>}
            {isStart && !isPlayerHere && <div className="text-xl">▶️</div>}
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
        <Card className="border-4 border-green-600 bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="text-8xl">🏯</div>
            <h1 className="text-5xl font-serif font-bold text-green-900">
              ¡Victoria Legendaria!
            </h1>
            <h2 className="text-3xl font-serif font-bold text-green-800">
              Has obtenido el Sello del Guardián del Dragón
            </h2>
            <div className="bg-white p-8 rounded-lg border-4 border-green-600">
              <div className="text-6xl font-bold text-green-700 mb-2">{score}</div>
              <div className="text-2xl text-green-900 font-semibold">Puntos Totales</div>
              <div className="text-lg text-green-700 mt-4">
                Precisión: {accuracy.toFixed(0)}% ({correctAnswers}/{totalAnswered} correctas)
              </div>
            </div>
            <p className="text-xl text-green-800 max-w-2xl mx-auto leading-relaxed">
              ¡Felicidades! Has recorrido toda la Gran Muralla y demostrado tu dominio
              del conocimiento de la China antigua. Ahora eres un <strong>Guardián del Dragón</strong>.
            </p>
            <Button
              onClick={() => onComplete(score)}
              className="bg-green-600 hover:bg-green-700 text-white text-2xl py-8 px-12 font-bold"
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
      <Card className="border-4 border-[#DC143C] bg-gradient-to-br from-[#FFF9E6] to-[#FFE4B5] shadow-xl">
        <CardContent className="pt-6 pb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🚶</span>
              <span className="font-extrabold text-xl text-[#8B0000]">Recorriendo la Gran Muralla</span>
            </div>
            <div className="bg-gradient-to-r from-[#DC143C] to-[#8B0000] px-5 py-2 rounded-full border-3 border-[#FFD700] shadow-md">
              <span className="font-extrabold text-2xl text-white">{playerPosition} / {boardSize}</span>
            </div>
          </div>
          <div className="relative">
            <div className="h-8 bg-white rounded-full border-4 border-[#8B0000] overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[#32CD32] via-[#228B22] to-[#006400] transition-all duration-300 ease-out flex items-center justify-end pr-3 shadow-lg"
                style={{ width: `${(playerPosition / boardSize) * 100}%` }}
              >
                {playerPosition > 3 && (
                  <span className="text-sm font-extrabold text-white drop-shadow-md">
                    {Math.round((playerPosition / boardSize) * 100)}%
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="text-center bg-white rounded-full py-3 border-3 border-[#8B0000] shadow-md">
              <span className="text-xl font-extrabold text-[#8B0000]">⭐ {score} puntos</span>
            </div>
            <div className="text-center bg-white rounded-full py-3 border-3 border-[#8B0000] shadow-md">
              <span className="text-xl font-extrabold text-[#8B0000]">
                ✓ {accuracy.toFixed(0)}% precisión
              </span>
            </div>
          </div>
          <div className="mt-3 text-center text-sm text-[#8B0000] font-semibold">
            Necesitas 60% de respuestas correctas para completar la misión
          </div>
        </CardContent>
      </Card>

      {/* Narrative */}
      {showNarrative && (
        <Card className="border-4 border-[#DC143C] bg-gradient-to-br from-[#FFF9E6] to-[#FFE4B5]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-serif text-[#8B0000]">
                🏯 FASE 3 - DOMINIO: Los Secretos de la Gran Muralla
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowNarrative(false)} className="text-[#8B0000]">
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[#5C0000]">
            <p className="text-lg leading-relaxed">
              El viento sopla fuerte sobre las colinas del norte de China. Ante sus ojos se extiende la
              construcción más imponente jamás levantada por manos humanas: la <strong>Gran Muralla China</strong>.
            </p>
            <p className="text-lg leading-relaxed">
              El Emperador los ha convocado a ustedes, jóvenes aprendices de la corte imperial, para una misión
              especial. Deberán recorrer paso a paso la Gran Muralla representada en esta maqueta. Cada casilla
              que avancen es un bloque de conocimiento, y en cada tramo deberán enfrentarse a un reto: preguntas,
              enigmas y pruebas que pondrán a prueba su ingenio y su memoria.
            </p>
            <div className="bg-[#DC143C] p-6 rounded-lg border-2 border-[#FFD700]">
              <p className="text-xl font-bold text-white text-center">
                🏺 <strong>DESAFÍO:</strong> Solo aquellos que recorran toda la muralla, resolviendo pruebas,
                llegarán a la Torre del Dragón y recibirán el <strong>Sello del Guardián del Dragón</strong>.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-[#8B0000]">
              <h3 className="font-bold text-[#8B0000] mb-2">📋 Reglas del Juego:</h3>
              <ul className="list-disc list-inside text-sm text-[#5C0000] space-y-1">
                <li>Lanza el dado (1-6) y avanza por el tablero</li>
                <li>Al caer en una casilla de color, toma una cartilla de ese color</li>
                <li>Responde la pregunta de la cartilla para ganar puntos</li>
                <li>Cada color representa una categoría diferente de conocimiento</li>
                <li>Llega a la casilla 36 con al menos 60% de respuestas correctas para ganar</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-[#8B0000]">
              <h3 className="font-bold text-[#8B0000] mb-2">🎨 Categorías de Cartillas por Color:</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(colorCategories).map(([key, info]) => (
                  <div key={key} className={`p-2 rounded ${info.bg} border-2 ${info.border}`}>
                    <div className="text-white font-bold text-sm">
                      {info.emoji} {info.name}: {info.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Roles */}
      <Card className="border-4 border-[#FFD700] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#8B0000]">👥 Roles del Equipo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {roleDescriptions.map((roleInfo, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-[#FFF9E6] to-[#FFE4B5] p-4 rounded-lg border-2 border-[#DC143C]"
              >
                <h3 className="font-bold text-lg text-[#8B0000]">{roleInfo.role}</h3>
                <p className="text-sm text-[#5C0000]">{roleInfo.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Game Board */}
      <Card className="border-4 border-[#DC143C] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#8B0000] text-center">
            🎲 Tablero de la Gran Muralla
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-1 max-w-2xl mx-auto">
            {renderBoard()}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-[#5C0000] mb-3">
              Cada color representa una categoría de cartillas con preguntas sobre China
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dice Roll Section */}
      {!showingCartilla && (
        <Card className="border-4 border-[#DC143C] bg-white">
          <CardContent className="pt-8 pb-8 text-center space-y-6">
            <div className="text-center">
              {isRolling ? (
                <div className="text-8xl animate-bounce">🎲</div>
              ) : diceRoll ? (
                <div className="text-8xl">{['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][diceRoll - 1]}</div>
              ) : (
                <div className="text-8xl opacity-30">🎲</div>
              )}
              {diceRoll && !isRolling && (
                <div className="text-2xl font-bold text-[#8B0000] mt-4">
                  Resultado: {diceRoll}
                </div>
              )}
            </div>
            <Button
              onClick={handleRollDice}
              disabled={isRolling || showingCartilla}
              className="bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white text-2xl py-8 px-12 font-bold border-3 border-[#FFD700] disabled:opacity-50"
            >
              {isRolling ? '🎲 Lanzando...' : '🎲 Lanzar Dado'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Cartilla and Question Card */}
      {showingCartilla && currentCartillaColor && (
        <Card className="border-4 border-[#DC143C] bg-white">
          <CardHeader>
            <div className="text-center space-y-4">
              <div className={`inline-block px-8 py-4 rounded-lg ${colorCategories[currentCartillaColor].bg} border-4 ${colorCategories[currentCartillaColor].border}`}>
                <div className="text-4xl mb-2">{colorCategories[currentCartillaColor].emoji}</div>
                <div className="text-2xl font-bold text-white">
                  Cartilla {colorCategories[currentCartillaColor].name}
                </div>
                <div className="text-lg text-white font-semibold">
                  {colorCategories[currentCartillaColor].category}
                </div>
              </div>
              <CardTitle className="text-2xl font-serif text-[#8B0000]">
                {currentQuestion.question}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
              <>
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => setSelectedAnswer(index)}
                    disabled={showResult}
                    className={`w-full text-lg py-6 transition-all font-semibold text-left justify-start ${
                      showResult
                        ? option === currentQuestion.correctAnswer
                          ? 'bg-green-600 text-white'
                          : index === selectedAnswer
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-300 text-gray-600'
                        : selectedAnswer === index
                        ? 'bg-[#FFD700] text-[#8B0000] border-2 border-[#8B0000]'
                        : 'bg-white border-2 border-[#DC143C] text-[#8B0000] hover:bg-[#FFE4B5]'
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </>
            )}

            {currentQuestion.type === 'fill-blank' && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={selectedAnswer as string || ''}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  disabled={showResult}
                  placeholder="Escribe tu respuesta aquí..."
                  className="w-full p-4 text-lg border-4 border-[#DC143C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] disabled:bg-gray-100"
                />
              </div>
            )}

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
                    <div className="text-5xl mb-3">✅</div>
                    <div>¡Correcto! (+{currentQuestion.points} puntos)</div>
                  </>
                ) : (
                  <>
                    <div className="text-5xl mb-3">❌</div>
                    <div>Incorrecto</div>
                    <div className="text-sm mt-2">Respuesta correcta: {currentQuestion.correctAnswer as string}</div>
                  </>
                )}
              </div>
            )}

            {!showResult && (
              <Button
                onClick={handleAnswer}
                disabled={selectedAnswer === null || selectedAnswer === ''}
                className="w-full bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white text-xl py-7 font-bold border-3 border-[#FFD700] disabled:opacity-50"
              >
                {selectedAnswer === null || selectedAnswer === '' ? 'Selecciona/Escribe una respuesta' : '✅ Confirmar Respuesta'}
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
