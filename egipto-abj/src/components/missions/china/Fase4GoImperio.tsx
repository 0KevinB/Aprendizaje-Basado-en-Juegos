'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateGoImperioQuestions } from '@/lib/gameGenerators';

interface Fase4Props {
  onComplete: (score: number) => void;
  onProgressUpdate?: (progress: number, data?: Record<string, unknown>) => void;
  savedProgress?: Record<string, unknown> | null;
}

type Stone = 'black' | 'white' | null;
type Team = 'black' | 'white';

interface BoardPosition {
  row: number;
  col: number;
}

const BOARD_SIZE = 9; // 9x9 Go board as per ABJ document
const MIN_STONES_TO_WIN = 15; // Minimum stones placed to complete the mission

const roleDescriptions = [
  { role: '🎖️ Estratega', description: 'Decide dónde colocar las piedras en el tablero' },
  { role: '🧠 Sabio', description: 'Responde las preguntas sobre China' },
  { role: '✍️ Escriba', description: 'Registra las piedras colocadas y puntos' },
  { role: '🛡️ Guardián', description: 'Coordina al equipo y verifica las jugadas' },
];

export function Fase4GoImperio({ onComplete, onProgressUpdate, savedProgress }: Fase4Props) {
  const [questions] = useState(() => generateGoImperioQuestions(30));
  const [board, setBoard] = useState<Stone[][]>(() =>
    Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))
  );
  const [currentTeam, setCurrentTeam] = useState<Team>('black');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<BoardPosition | null>(null);
  const [blackScore, setBlackScore] = useState(0);
  const [whiteScore, setWhiteScore] = useState(0);
  const [blackStones, setBlackStones] = useState(0);
  const [whiteStones, setWhiteStones] = useState(0);
  const [showNarrative, setShowNarrative] = useState(true);
  const [gamePhase, setGamePhase] = useState<'selecting' | 'answering' | 'result' | 'completed'>('selecting');
  const [hoveredPosition, setHoveredPosition] = useState<BoardPosition | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const totalStones = blackStones + whiteStones;

  // Load saved progress on mount
  useEffect(() => {
    if (savedProgress) {
      if (savedProgress.board) {
        setBoard(savedProgress.board as Stone[][]);
      }
      if (savedProgress.currentTeam) {
        setCurrentTeam(savedProgress.currentTeam as Team);
      }
      if (savedProgress.currentQuestionIndex !== undefined) {
        setCurrentQuestionIndex(savedProgress.currentQuestionIndex as number);
      }
      if (savedProgress.blackScore !== undefined) {
        setBlackScore(savedProgress.blackScore as number);
      }
      if (savedProgress.whiteScore !== undefined) {
        setWhiteScore(savedProgress.whiteScore as number);
      }
      if (savedProgress.blackStones !== undefined) {
        setBlackStones(savedProgress.blackStones as number);
      }
      if (savedProgress.whiteStones !== undefined) {
        setWhiteStones(savedProgress.whiteStones as number);
      }
      setShowNarrative(false);
    }
  }, [savedProgress]);

  // Auto-save progress
  useEffect(() => {
    const progressPercentage = Math.min(100, (totalStones / MIN_STONES_TO_WIN) * 100);

    if (onProgressUpdate && totalStones > 0 && gamePhase !== 'completed') {
      onProgressUpdate(progressPercentage, {
        board,
        currentTeam,
        currentQuestionIndex,
        blackScore,
        whiteScore,
        blackStones,
        whiteStones,
      });
    }
  }, [board, currentTeam, currentQuestionIndex, blackScore, whiteScore, blackStones, whiteStones, totalStones, gamePhase, onProgressUpdate]);

  const handlePositionClick = (row: number, col: number) => {
    if (gamePhase !== 'selecting') return;
    if (board[row][col] !== null) return; // Position already occupied

    setSelectedPosition({ row, col });
    setGamePhase('answering');
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
    setGamePhase('result');

    if (correct && selectedPosition) {
      // Place stone on board
      const newBoard = board.map(row => [...row]);
      newBoard[selectedPosition.row][selectedPosition.col] = currentTeam;
      setBoard(newBoard);

      // Update scores
      const points = currentQuestion.points || 20;
      if (currentTeam === 'black') {
        setBlackScore(blackScore + points);
        setBlackStones(blackStones + 1);
      } else {
        setWhiteScore(whiteScore + points);
        setWhiteStones(whiteStones + 1);
      }
    }

    // Move to next question after delay
    setTimeout(() => {
      nextTurn(correct);
    }, 3000);
  };

  const nextTurn = (wasCorrect: boolean) => {
    // Switch teams
    setCurrentTeam(currentTeam === 'black' ? 'white' : 'black');

    // Move to next question
    setCurrentQuestionIndex((currentQuestionIndex + 1) % questions.length);

    // Reset state
    setSelectedAnswer(null);
    setShowResult(false);
    setSelectedPosition(null);
    setGamePhase('selecting');

    // Check if mission complete
    if (totalStones + (wasCorrect ? 1 : 0) >= MIN_STONES_TO_WIN) {
      setGamePhase('completed');
    }
  };

  const handleComplete = () => {
    const finalScore = blackScore + whiteScore;
    onComplete(finalScore);
  };

  const renderBoard = () => {
    const cells = [];

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const stone = board[row][col];
        const isSelected = selectedPosition?.row === row && selectedPosition?.col === col;
        const isHovered = hoveredPosition?.row === row && hoveredPosition?.col === col;
        const canPlace = gamePhase === 'selecting' && stone === null;

        cells.push(
          <div
            key={`${row}-${col}`}
            className={`
              relative aspect-square flex items-center justify-center
              border border-[#8B4513]
              ${canPlace ? 'cursor-pointer hover:bg-[#FFE4B5]' : 'cursor-not-allowed'}
              ${isSelected ? 'bg-[#FFD700] ring-2 ring-[#DC143C]' : 'bg-[#DEB887]'}
              ${isHovered && canPlace ? 'bg-[#FFE4B5]' : ''}
              transition-all duration-200
            `}
            onClick={() => handlePositionClick(row, col)}
            onMouseEnter={() => setHoveredPosition({ row, col })}
            onMouseLeave={() => setHoveredPosition(null)}
          >
            {/* Show preview of stone on hover */}
            {isHovered && canPlace && gamePhase === 'selecting' && (
              <div
                className={`absolute w-[70%] h-[70%] rounded-full opacity-50 ${
                  currentTeam === 'black' ? 'bg-black' : 'bg-white border-2 border-gray-400'
                }`}
              />
            )}

            {/* Placed stones */}
            {stone === 'black' && (
              <div className="absolute w-[80%] h-[80%] rounded-full bg-black shadow-lg" />
            )}
            {stone === 'white' && (
              <div className="absolute w-[80%] h-[80%] rounded-full bg-white border-2 border-gray-400 shadow-lg" />
            )}

            {/* Star points (traditional Go board markings) */}
            {((row === 2 || row === 6) && (col === 2 || col === 6)) && stone === null && (
              <div className="absolute w-2 h-2 rounded-full bg-[#8B4513]" />
            )}
            {row === 4 && col === 4 && stone === null && (
              <div className="absolute w-2 h-2 rounded-full bg-[#8B4513]" />
            )}
          </div>
        );
      }
    }

    return cells;
  };

  if (gamePhase === 'completed') {
    const winner = blackScore > whiteScore ? 'Equipo Negro' : whiteScore > blackScore ? 'Equipo Blanco' : 'Empate';
    const totalScore = blackScore + whiteScore;

    return (
      <div className="max-w-4xl mx-auto p-4">
        <Card className="border-4 border-[#FFD700] bg-gradient-to-br from-[#FFF9E6] to-[#FFE4B5]">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="text-8xl">🐉</div>
            <h1 className="text-5xl font-serif font-bold text-[#8B0000]">
              ¡Partida Completada!
            </h1>
            <h2 className="text-3xl font-serif font-bold text-[#DC143C]">
              Has obtenido el Sello de los Grandes Estrategas del Dragón
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white p-6 rounded-lg border-4 border-black">
                <div className="text-4xl mb-2">⚫</div>
                <div className="text-3xl font-bold text-black mb-2">{blackScore}</div>
                <div className="text-lg text-[#8B0000] font-semibold">Equipo Negro</div>
                <div className="text-sm text-[#DC143C]">{blackStones} piedras colocadas</div>
              </div>

              <div className="bg-white p-6 rounded-lg border-4 border-gray-400">
                <div className="text-4xl mb-2">⚪</div>
                <div className="text-3xl font-bold text-gray-700 mb-2">{whiteScore}</div>
                <div className="text-lg text-[#8B0000] font-semibold">Equipo Blanco</div>
                <div className="text-sm text-[#DC143C]">{whiteStones} piedras colocadas</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#DC143C] to-[#8B0000] p-6 rounded-lg border-2 border-[#FFD700]">
              <div className="text-2xl font-bold text-white mb-2">
                🏆 {winner === 'Empate' ? '¡Empate Estratégico!' : `Ganador: ${winner}`}
              </div>
              <div className="text-4xl font-bold text-[#FFD700]">{totalScore} puntos totales</div>
            </div>

            <p className="text-xl text-[#8B0000] max-w-2xl mx-auto leading-relaxed">
              ¡Felicidades! Ambos equipos han demostrado sabiduría estratégica y conocimiento profundo de la China antigua.
              Ahora son <strong>Grandes Estrategas del Dragón</strong>, guardianes del legado imperial de China.
              Como decía Sun Tzu: <em>&quot;Vencer sin luchar es la suprema excelencia.&quot;</em>
            </p>

            <Button
              onClick={handleComplete}
              className="bg-gradient-to-r from-[#DC143C] to-[#8B0000] hover:from-[#8B0000] hover:to-[#DC143C] text-white text-2xl py-8 px-12 font-bold border-2 border-[#FFD700]"
            >
              Completar Misión Final
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
              <span className="text-3xl">{currentTeam === 'black' ? '⚫' : '⚪'}</span>
              <span className="font-extrabold text-xl text-[#8B0000]">
                Turno: {currentTeam === 'black' ? 'Equipo Negro' : 'Equipo Blanco'}
              </span>
            </div>
            <div className="bg-gradient-to-r from-[#DC143C] to-[#8B0000] px-5 py-2 rounded-full border-3 border-[#FFD700] shadow-md">
              <span className="font-extrabold text-2xl text-white">
                {totalStones} / {MIN_STONES_TO_WIN} piedras
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="h-8 bg-white rounded-full border-4 border-[#8B0000] overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[#DC143C] via-[#8B0000] to-[#FFD700] transition-all duration-300 ease-out flex items-center justify-end pr-3 shadow-lg"
                style={{ width: `${Math.min(100, (totalStones / MIN_STONES_TO_WIN) * 100)}%` }}
              >
                {totalStones > 2 && (
                  <span className="text-sm font-extrabold text-white drop-shadow-md">
                    {Math.round((totalStones / MIN_STONES_TO_WIN) * 100)}%
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="text-center bg-gradient-to-br from-black to-gray-800 rounded-lg py-3 border-3 border-[#FFD700] shadow-md">
              <span className="text-xl font-extrabold text-white">⚫ {blackScore} pts</span>
              <div className="text-sm text-white mt-1">{blackStones} piedras</div>
            </div>
            <div className="text-center bg-gradient-to-br from-white to-gray-200 rounded-lg py-3 border-3 border-[#8B0000] shadow-md">
              <span className="text-xl font-extrabold text-[#8B0000]">⚪ {whiteScore} pts</span>
              <div className="text-sm text-[#8B0000] mt-1">{whiteStones} piedras</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Narrative */}
      {showNarrative && (
        <Card className="border-4 border-[#DC143C] bg-gradient-to-br from-[#FFF9E6] to-[#FFE4B5]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-serif text-[#8B0000]">
                🐉 FASE 4 - CONQUISTA: El Go del Imperio
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowNarrative(false)} className="text-[#8B0000]">
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[#5C0000]">
            <p className="text-lg leading-relaxed">
              Hace más de 2.500 años, en la época de la dinastía Zhou, los sabios de la corte imperial
              crearon el <strong>Weiqi</strong> (conocido como <strong>Go</strong>), el primer gran juego de estrategia
              de la historia. El emperador Yao mandó crear este juego para instruir a su hijo en el arte de la
              disciplina y la visión de futuro.
            </p>
            <p className="text-lg leading-relaxed">
              El tablero del Go simboliza la China misma: un espacio donde dos fuerzas opuestas, el <strong>yin y el yang</strong>,
              luchan por dominar territorios. Cada piedra colocada no es solo un movimiento, sino una decisión que
              afecta todo el tablero, como las decisiones de un emperador podían transformar el destino de su pueblo.
            </p>
            <div className="bg-gradient-to-r from-[#DC143C] to-[#8B0000] p-6 rounded-lg border-2 border-[#FFD700]">
              <p className="text-xl font-bold text-white text-center">
                🏺 <strong>DESAFÍO:</strong> Jugarán en dos equipos (Negro vs Blanco). Cada vez que un equipo quiera
                colocar una piedra en el tablero, deberá responder una pregunta sobre China. Si responde correctamente,
                la piedra queda en el tablero y suma puntos. Si falla, el turno pasa al otro equipo sin colocar la piedra.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-[#8B0000]">
              <h3 className="font-bold text-[#8B0000] mb-2">📋 Reglas del Juego:</h3>
              <ul className="list-disc list-inside text-sm text-[#5C0000] space-y-1">
                <li>Dos equipos: Negro (juega primero) y Blanco (juega segundo)</li>
                <li>Selecciona un punto vacío del tablero donde colocar tu piedra</li>
                <li>Responde correctamente la pregunta: tu piedra se coloca y sumas puntos</li>
                <li>Responde incorrectamente: pierdes el turno y no se coloca la piedra</li>
                <li>Completa al menos {MIN_STONES_TO_WIN} piedras entre ambos equipos para terminar</li>
                <li>Gana el equipo con más puntos al final</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-[#FFE4B5] to-[#FFF9E6] p-4 rounded-lg border-2 border-[#DC143C]">
              <h3 className="font-bold text-[#8B0000] mb-2">📚 Filosofía del Go:</h3>
              <p className="text-sm text-[#5C0000] italic">
                &quot;El Go enseña a vencer sin luchar, rodear sin atacar, y pensar siempre en el todo antes que en la parte.
                Como escribió Sun Tzu en el Arte de la Guerra: la suprema excelencia consiste en vencer al enemigo sin
                combatir.&quot;
              </p>
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
            ⚫ Tablero del Go Imperial (9x9) ⚪
          </CardTitle>
        </CardHeader>
        <CardContent>
          {gamePhase === 'selecting' && (
            <div className="mb-4 text-center bg-gradient-to-r from-[#FFD700] to-[#FFA500] p-4 rounded-lg border-2 border-[#8B0000]">
              <p className="text-lg font-bold text-[#8B0000]">
                🎯 {currentTeam === 'black' ? 'Equipo Negro' : 'Equipo Blanco'}:
                Selecciona una intersección vacía del tablero para colocar tu piedra
              </p>
            </div>
          )}

          <div className="grid grid-cols-9 gap-0 max-w-2xl mx-auto border-4 border-[#8B4513] bg-[#DEB887]">
            {renderBoard()}
          </div>

          <div className="mt-4 text-center text-sm text-[#5C0000]">
            <p>⚫ Piedras negras: {blackStones} | ⚪ Piedras blancas: {whiteStones}</p>
            <p className="mt-2 text-xs italic">
              Tablero de Go simplificado 9x9 - Los puntos • marcan las posiciones estratégicas tradicionales
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      {(gamePhase === 'answering' || gamePhase === 'result') && (
        <Card className="border-4 border-[#DC143C] bg-white">
          <CardHeader>
            <div className="text-center space-y-2">
              <div className="text-5xl mb-3">
                {currentTeam === 'black' ? '⚫' : '⚪'}
              </div>
              <CardTitle className="text-2xl font-serif text-[#8B0000]">
                {currentQuestion.question}
              </CardTitle>
              {selectedPosition && (
                <p className="text-sm text-[#DC143C]">
                  Posición seleccionada: Fila {selectedPosition.row + 1}, Columna {selectedPosition.col + 1}
                </p>
              )}
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
                        ? 'bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white border-2 border-[#FFD700]'
                        : 'bg-white border-2 border-[#DC143C] text-[#8B0000] hover:bg-gradient-to-r hover:from-[#FFF9E6] hover:to-[#FFE4B5]'
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
                    <div className="mt-2">La piedra {currentTeam === 'black' ? 'negra ⚫' : 'blanca ⚪'} se coloca en el tablero</div>
                  </>
                ) : (
                  <>
                    <div className="text-5xl mb-3">❌</div>
                    <div>Incorrecto</div>
                    <div className="text-sm mt-2">Respuesta correcta: {currentQuestion.correctAnswer as string}</div>
                    <div className="mt-2">El turno pasa al otro equipo sin colocar la piedra</div>
                  </>
                )}
              </div>
            )}

            {!showResult && (
              <Button
                onClick={handleAnswer}
                disabled={selectedAnswer === null || selectedAnswer === ''}
                className="w-full bg-gradient-to-r from-[#DC143C] to-[#8B0000] hover:from-[#8B0000] hover:to-[#DC143C] text-white text-xl py-7 font-bold border-3 border-[#FFD700] disabled:opacity-50"
              >
                {selectedAnswer === null || selectedAnswer === ''
                  ? 'Selecciona/Escribe una respuesta'
                  : `⚫ Confirmar Respuesta y Colocar Piedra ${currentTeam === 'black' ? '⚫' : '⚪'}`
                }
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
