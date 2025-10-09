'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Fase4Props {
  onComplete: (score: number) => void;
}

const boardSize = 36; // 6x6 board

const snakes = {
  32: 10,
  25: 7,
  19: 4,
};

const ladders = {
  3: 14,
  8: 18,
  12: 24,
  17: 28,
};

const questions = [
  {
    question: '🎲 ¿Dónde se formaron las primeras poblaciones del Antiguo Egipto?',
    options: ['En valles del desierto', 'En las orillas del río Nilo', 'En oasis dispersos', 'En costas del mar'],
    correct: 1,
  },
  {
    question: '🎲 ¿Qué permitía el Nilo para el desarrollo de Egipto?',
    options: ['Comunicación entre ciudades', 'Agricultura, pesca y transporte', 'Defensa natural del territorio', 'Comercio con otros imperios'],
    correct: 1,
  },
  {
    question: '🎲 ¿Qué representaba el faraón en la sociedad egipcia?',
    options: [
      'Líder militar supremo',
      'Dios viviente y autoridad absoluta',
      'Rey elegido por nobles',
      'Sacerdote principal'
    ],
    correct: 1,
  },
  {
    question: '🎲 ¿Cuál era la base de la economía egipcia?',
    options: ['El comercio de minerales', 'La agricultura del Nilo', 'La construcción de templos', 'El tributo de conquistas'],
    correct: 1,
  },
  {
    question: '🎲 ¿Qué era el papiro y para qué se usaba?',
    options: [
      'Planta para medicina',
      'Planta para escribir y embarcaciones',
      'Material de construcción',
      'Alimento básico egipcio'
    ],
    correct: 1,
  },
  {
    question: '🎲 ¿Qué sistema de transporte desarrollaron?',
    options: [
      'Carros tirados por bueyes',
      'Barcos de vela y remo',
      'Caravanas de camellos',
      'Caminos pavimentados'
    ],
    correct: 1,
  },
  {
    question: '🎲 ¿Qué logro astronómico alcanzaron los egipcios?',
    options: [
      'Mapas estelares precisos',
      'Calendario de 365 días y 24 horas',
      'Predicción de eclipses',
      'Alineación de templos'
    ],
    correct: 1,
  },
  {
    question: '🎲 ¿Qué avances médicos desarrollaron?',
    options: [
      'Cirugía avanzada',
      'Anatomía y técnicas de momificación',
      'Medicina herbal completa',
      'Tratamiento de fracturas'
    ],
    correct: 1,
  },
  {
    question: '🎲 ¿Qué tipo de religión practicaban los egipcios?',
    options: [
      'Adoración a un dios único',
      'Politeísta con múltiples dioses',
      'Veneración de ancestros',
      'Culto a la naturaleza'
    ],
    correct: 1,
  },
  {
    question: '🎲 ¿Por qué momificaban a los muertos?',
    options: [
      'Para preservar su memoria',
      'Para conservar el cuerpo para la vida eterna',
      'Como ritual de despedida',
      'Por respeto a tradiciones'
    ],
    correct: 1,
  },
  {
    question: '🎲 ¿Qué construcciones arquitectónicas destacan en Egipto?',
    options: [
      'Palacios fortificados',
      'Pirámides y templos monumentales',
      'Ciudades amuralladas',
      'Acueductos y canales'
    ],
    correct: 1,
  },
  {
    question: '🎲 ¿Qué significaban las pirámides?',
    options: [
      'Tumbas de faraones',
      'Símbolos de poder y eternidad',
      'Templos religiosos',
      'Observatorios astronómicos'
    ],
    correct: 1,
  },
];

const roleDescriptions = [
  { role: '🗺️ Explorador', description: 'Mueve las fichas en el tablero' },
  { role: '🧙 Sabio', description: 'Organiza al grupo para responder' },
  { role: '📝 Escriba', description: 'Toma notas de los avances' },
  { role: '🛡️ Guardián', description: 'Defiende en caso de empate' },
];

export function Fase4GranRetoNilo({ onComplete }: Fase4Props) {
  const [playerPosition, setPlayerPosition] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showNarrative, setShowNarrative] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const [diceRoll, setDiceRoll] = useState<number | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === currentQuestion.correct;
    setIsCorrect(correct);
    setShowResult(true);

    // Roll dice
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);

    if (correct) {
      setScore(score + 20);
    }

    // Move after showing result
    setTimeout(() => {
      movePlayer(correct ? roll : 1);
      nextQuestion();
    }, 3000);
  };

  const movePlayer = (spaces: number) => {
    let newPosition = playerPosition + spaces;

    // Check if won
    if (newPosition >= boardSize) {
      newPosition = boardSize;
      setGameWon(true);
      return;
    }

    // Check for ladder
    if (ladders[newPosition as keyof typeof ladders]) {
      setTimeout(() => {
        setPlayerPosition(ladders[newPosition as keyof typeof ladders]);
      }, 500);
      return;
    }

    // Check for snake
    if (snakes[newPosition as keyof typeof snakes]) {
      setTimeout(() => {
        setPlayerPosition(snakes[newPosition as keyof typeof snakes]);
      }, 500);
      return;
    }

    setPlayerPosition(newPosition);
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
              ${isStart ? 'bg-green-200 border-green-600' : ''}
              ${isEnd ? 'bg-[#FFD700] border-[#B8860B]' : ''}
              ${isLadder && !isStart && !isEnd ? 'bg-blue-100 border-blue-500' : ''}
              ${isSnake ? 'bg-red-100 border-red-500' : ''}
              ${!isStart && !isEnd && !isLadder && !isSnake ? 'bg-[#E6BE8A] border-[#C19A6B]' : ''}
              ${isPlayerHere ? 'ring-4 ring-[#FFD700] scale-110' : ''}
              transition-all duration-300
            `}
          >
            <div className="text-[10px] text-[#0f1e30] font-semibold">{cellNumber}</div>
            {isPlayerHere && <div className="text-2xl">🚶</div>}
            {isLadder && !isPlayerHere && <div className="text-xl">🪜</div>}
            {isSnake && !isPlayerHere && <div className="text-xl">🐍</div>}
            {isEnd && !isPlayerHere && <div className="text-xl">👑</div>}
            {isStart && !isPlayerHere && <div className="text-sm">▶️</div>}
          </div>
        );
      }
    }
    return cells;
  };

  if (gameWon) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Card className="border-4 border-green-600 bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="text-8xl">⚱️</div>
            <h1 className="text-5xl font-serif font-bold text-green-900">
              ¡Victoria Legendaria!
            </h1>
            <h2 className="text-3xl font-serif font-bold text-green-800">
              Has obtenido el Sello de los Guardianes Eternos del Nilo
            </h2>
            <div className="bg-white p-8 rounded-lg border-4 border-green-600">
              <div className="text-6xl font-bold text-green-700 mb-2">{score}</div>
              <div className="text-2xl text-green-900 font-semibold">Puntos Totales</div>
            </div>
            <p className="text-xl text-green-800 max-w-2xl mx-auto leading-relaxed">
              ¡Felicidades! Has completado todas las misiones y demostrado tu dominio
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
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* Progress */}
      <Card className="border-4 border-[#FFD700] bg-gradient-to-br from-[#FFF8DC] to-[#F0E68C] shadow-xl">
        <CardContent className="pt-6 pb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🚶</span>
              <span className="font-extrabold text-xl text-[#000000]">Posición en el Tablero</span>
            </div>
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] px-5 py-2 rounded-full border-3 border-[#8B6F47] shadow-md">
              <span className="font-extrabold text-2xl text-[#000000]">{playerPosition} / {boardSize}</span>
            </div>
          </div>
          <div className="relative">
            <div className="h-8 bg-white rounded-full border-4 border-[#8B6F47] overflow-hidden shadow-inner">
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
            {/* Milestones */}
            <div className="flex justify-between mt-2 px-1 text-xs text-[#666666] font-bold">
              <span>▶️ 1</span>
              <span>🪜 14</span>
              <span>🪜 24</span>
              <span>👑 {boardSize}</span>
            </div>
          </div>
          <div className="mt-4 text-center bg-white rounded-full py-3 border-3 border-[#8B6F47] shadow-md">
            <span className="text-2xl font-extrabold text-[#000000]">💎 {score} puntos</span>
          </div>
        </CardContent>
      </Card>

      {/* Narrative */}
      {showNarrative && (
        <Card className="border-4 border-[#FFD700] bg-gradient-to-br from-[#f5f1e8] to-[#E6BE8A]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-serif text-[#0f1e30]">
                ⚱️ FASE 4 - CONQUISTA: El Gran Reto del Nilo
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowNarrative(false)} className="text-[#0f1e30]">
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[#1e3a5f]">
            <p className="text-lg leading-relaxed">
              Tras superar las pruebas del faraón, ahora los escribas deben demostrar que dominan
              la historia del Imperio Egipcio y su legado cultural.
            </p>
            <p className="text-lg leading-relaxed">
              En la arena del conocimiento, cada equipo será puesto a prueba. Con astucia y memoria,
              responderán enigmas en un tablero místico que representa el viaje del alma hacia la eternidad.
            </p>
            <div className="bg-[#FFD700] p-6 rounded-lg border-2 border-[#B8860B]">
              <p className="text-xl font-bold text-[#0f1e30] text-center">
                🏺 <strong>DESAFÍO:</strong> Solo los más sabios alcanzarán la meta y obtendrán el
                <strong> Sello de los Guardianes Eternos del Nilo</strong>.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-[#C19A6B]">
              <h3 className="font-bold text-[#0f1e30] mb-2">📋 Reglas del Juego:</h3>
              <ul className="list-disc list-inside text-sm text-[#1e3a5f] space-y-1">
                <li>Responde correctamente: tira el dado (1-6) y avanza esas casillas + 20 puntos</li>
                <li>Responde incorrectamente: avanza solo 1 casilla</li>
                <li>🪜 Escaleras: te impulsan hacia arriba</li>
                <li>🐍 Serpientes: te hacen retroceder</li>
                <li>Llega a la casilla 36 para ganar</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Roles */}
      <Card className="border-4 border-[#40E0D0] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#0f1e30]">👥 Roles del Equipo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {roleDescriptions.map((roleInfo, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-[#f5f1e8] to-[#E6D5B8] p-4 rounded-lg border-2 border-[#C19A6B]"
              >
                <h3 className="font-bold text-lg text-[#0f1e30]">{roleInfo.role}</h3>
                <p className="text-sm text-[#1e3a5f]">{roleInfo.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Game Board */}
      <Card className="border-4 border-[#FFD700] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#0f1e30] text-center">
            🎲 Tablero Místico del Nilo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-1 max-w-2xl mx-auto">
            {renderBoard()}
          </div>
          <div className="mt-4 text-center text-sm text-[#1e3a5f]">
            <p>🪜 Escaleras: 3→14, 8→18, 12→24, 17→28</p>
            <p>🐍 Serpientes: 32→10, 25→7, 19→4</p>
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="border-4 border-[#FFD700] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#0f1e30] text-center">
            {currentQuestion.question}
          </CardTitle>
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
                  ? 'bg-[#FFD700] text-[#0f1e30] border-2 border-[#B8860B]'
                  : 'bg-white border-2 border-[#C19A6B] text-[#0f1e30] hover:bg-[#E6D5B8]'
              }`}
            >
              {option}
            </Button>
          ))}

          {showResult && diceRoll && (
            <div
              className={`p-6 rounded-lg text-center text-lg font-bold border-4 ${
                isCorrect
                  ? 'bg-green-50 text-green-900 border-green-700'
                  : 'bg-red-50 text-red-900 border-red-700'
              }`}
            >
              {isCorrect ? (
                <>
                  <div className="text-5xl mb-3">🎲 {diceRoll}</div>
                  <div>✅ ¡Correcto! (+20 puntos)</div>
                  <div>Avanzas {diceRoll} casillas</div>
                </>
              ) : (
                <>
                  <div>❌ Incorrecto</div>
                  <div className="text-sm mt-2">Respuesta correcta: {currentQuestion.options[currentQuestion.correct]}</div>
                  <div className="mt-2">Avanzas solo 1 casilla</div>
                </>
              )}
            </div>
          )}

          {!showResult && (
            <Button
              onClick={handleAnswer}
              disabled={selectedAnswer === null}
              className="w-full bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#0f1e30] text-xl py-7 font-bold border-3 border-[#B8860B] disabled:opacity-50"
            >
              {selectedAnswer === null ? 'Selecciona una respuesta' : '🎲 Tirar Dado y Avanzar'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
