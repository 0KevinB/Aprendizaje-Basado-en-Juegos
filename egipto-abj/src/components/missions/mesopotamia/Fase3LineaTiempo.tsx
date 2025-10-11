'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Fase3Props {
  onComplete: (data: { score: number; correctAnswers: number; totalQuestions: number }) => void;
  onProgressUpdate?: (progress: number, data?: Record<string, unknown>) => void;
  savedProgress?: Record<string, unknown> | null;
}

interface DominoPiece {
  id: string;
  leftSide: string;  // Date or event name
  rightSide: string; // Date or event name
  leftType: 'date' | 'event';
  rightType: 'date' | 'event';
  matchesLeft?: string | null;  // ID of domino that matches on left
  matchesRight?: string | null; // ID of domino that matches on right
  isPlaced: boolean;
  position?: number;
}

const dominoPieces: DominoPiece[] = [
  { id: 'd1', leftSide: '~3500 a.C.', rightSide: 'Llegada de los sumerios', leftType: 'date', rightType: 'event', isPlaced: false, matchesLeft: null, matchesRight: 'd2' },
  { id: 'd2', leftSide: 'Llegada de los sumerios', rightSide: '~3200 a.C.', leftType: 'event', rightType: 'date', isPlaced: false, matchesLeft: 'd1', matchesRight: 'd3' },
  { id: 'd3', leftSide: '~3200 a.C.', rightSide: 'Invención de la escritura cuneiforme', leftType: 'date', rightType: 'event', isPlaced: false, matchesLeft: 'd2', matchesRight: 'd4' },
  { id: 'd4', leftSide: 'Invención de la escritura cuneiforme', rightSide: '~2900 a.C.', leftType: 'event', rightType: 'date', isPlaced: false, matchesLeft: 'd3', matchesRight: 'd5' },
  { id: 'd5', leftSide: '~2900 a.C.', rightSide: 'Fundación de Uruk por Enmerkar', leftType: 'date', rightType: 'event', isPlaced: false, matchesLeft: 'd4', matchesRight: 'd6' },
  { id: 'd6', leftSide: 'Fundación de Uruk por Enmerkar', rightSide: '~2500 a.C.', leftType: 'event', rightType: 'date', isPlaced: false, matchesLeft: 'd5', matchesRight: 'd7' },
  { id: 'd7', leftSide: '~2500 a.C.', rightSide: 'Reino de Lagash', leftType: 'date', rightType: 'event', isPlaced: false, matchesLeft: 'd6', matchesRight: 'd8' },
  { id: 'd8', leftSide: 'Reino de Lagash', rightSide: '~2334 a.C.', leftType: 'event', rightType: 'date', isPlaced: false, matchesLeft: 'd7', matchesRight: 'd9' },
  { id: 'd9', leftSide: '~2334 a.C.', rightSide: 'Imperio Acadio de Sargón', leftType: 'date', rightType: 'event', isPlaced: false, matchesLeft: 'd8', matchesRight: 'd10' },
  { id: 'd10', leftSide: 'Imperio Acadio de Sargón', rightSide: '~2100 a.C.', leftType: 'event', rightType: 'date', isPlaced: false, matchesLeft: 'd9', matchesRight: 'd11' },
  { id: 'd11', leftSide: '~2100 a.C.', rightSide: 'Zigurat de Ur y Epopeya de Gilgamesh', leftType: 'date', rightType: 'event', isPlaced: false, matchesLeft: 'd10', matchesRight: 'd12' },
  { id: 'd12', leftSide: 'Zigurat de Ur y Epopeya de Gilgamesh', rightSide: '1792 a.C.', leftType: 'event', rightType: 'date', isPlaced: false, matchesLeft: 'd11', matchesRight: 'd13' },
  { id: 'd13', leftSide: '1792 a.C.', rightSide: 'Hammurabi rey de Babilonia', leftType: 'date', rightType: 'event', isPlaced: false, matchesLeft: 'd12', matchesRight: 'd14' },
  { id: 'd14', leftSide: 'Hammurabi rey de Babilonia', rightSide: '~1750 a.C.', leftType: 'event', rightType: 'date', isPlaced: false, matchesLeft: 'd13', matchesRight: 'd15' },
  { id: 'd15', leftSide: '~1750 a.C.', rightSide: 'Código de Hammurabi', leftType: 'date', rightType: 'event', isPlaced: false, matchesLeft: 'd14', matchesRight: null },
];

const roleDescriptions = [
  { role: '📜 Lector', description: 'Lee las fichas de dominó con eventos y fechas' },
  { role: '🧩 Armador', description: 'Conecta las fichas en orden cronológico' },
  { role: '✍️ Escriba', description: 'Documenta el orden cronológico formado' },
  { role: '🎤 Expositor', description: 'Explica la secuencia histórica al equipo' },
];

export function Fase3LineaTiempo({ onComplete, onProgressUpdate, savedProgress }: Fase3Props) {
  const [dominos, setDominos] = useState<DominoPiece[]>([]);
  const [placedChain, setPlacedChain] = useState<DominoPiece[]>([]);
  const [selectedDomino, setSelectedDomino] = useState<DominoPiece | null>(null);
  const [showNarrative, setShowNarrative] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (savedProgress && savedProgress.dominos) {
      setDominos(savedProgress.dominos as DominoPiece[]);
      setPlacedChain((savedProgress.placedChain as DominoPiece[]) || []);
      setScore((savedProgress.score as number) || 0);
      setIsSubmitted((savedProgress.isSubmitted as boolean) || false);
      setShowNarrative(false);
    } else {
      // Shuffle dominos for initial state
      const shuffled = [...dominoPieces].sort(() => Math.random() - 0.5);
      setDominos(shuffled);
      setPlacedChain([]);
    }
  }, [savedProgress]);

  useEffect(() => {
    if (dominos.length > 0 && !isSubmitted) {
      const progress = Math.min((placedChain.length / dominos.length) * 99, 99);
      if (onProgressUpdate && progress > 0) {
        onProgressUpdate(progress, { dominos, placedChain, score, isSubmitted });
      }
    }
  }, [dominos, placedChain, score, isSubmitted, onProgressUpdate]);

  const canPlaceDomino = (domino: DominoPiece): 'start' | 'end' | 'both' | 'none' => {
    if (placedChain.length === 0) return 'start';

    const firstDomino = placedChain[0];
    const lastDomino = placedChain[placedChain.length - 1];

    const canPlaceAtStart = domino.rightSide === firstDomino.leftSide;
    const canPlaceAtEnd = domino.leftSide === lastDomino.rightSide;

    if (canPlaceAtStart && canPlaceAtEnd) return 'both';
    if (canPlaceAtStart) return 'start';
    if (canPlaceAtEnd) return 'end';
    return 'none';
  };

  const placeDomino = (domino: DominoPiece, position: 'start' | 'end') => {
    const updatedDomino = { ...domino, isPlaced: true };
    const newPlacedChain = position === 'start'
      ? [updatedDomino, ...placedChain]
      : [...placedChain, updatedDomino];

    setPlacedChain(newPlacedChain);
    setDominos(dominos.map(d => d.id === domino.id ? updatedDomino : d));
    setSelectedDomino(null);
  };

  const handleSubmit = () => {
    // Check if dominos are in correct order
    let correctMatches = 0;
    let totalScore = 0;

    // Verify the chain is correct
    const isChainCorrect = placedChain.length === dominoPieces.length;

    if (isChainCorrect) {
      for (let i = 0; i < placedChain.length - 1; i++) {
        if (placedChain[i].rightSide === placedChain[i + 1].leftSide) {
          correctMatches++;
          totalScore += 10;
        }
      }
      // Bonus for completing the chain
      if (correctMatches === placedChain.length - 1) {
        totalScore += 50;
      }
    }

    setScore(totalScore);
    setIsSubmitted(true);
    setTimeout(() => setShowCompletion(true), 500);
  };

  const resetGame = () => {
    const shuffled = [...dominoPieces].sort(() => Math.random() - 0.5);
    setDominos(shuffled);
    setPlacedChain([]);
    setSelectedDomino(null);
    setScore(0);
    setIsSubmitted(false);
    setShowCompletion(false);
  };

  const handleComplete = () => {
    const correctMatches = placedChain.length > 0 ? placedChain.length - 1 : 0;
    onComplete({
      score,
      correctAnswers: correctMatches,
      totalQuestions: dominos.length,
    });
  };

  const unplacedDominos = dominos.filter(d => !d.isPlaced);
  const allPlaced = unplacedDominos.length === 0;
  const passPercentage = allPlaced && placedChain.length === dominoPieces.length ? 100 : 0;
  const hasPassed = passPercentage >= 70;

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      {/* Narrative */}
      {showNarrative && (
        <Card className="border-4 border-[#8B4513] bg-gradient-to-br from-[#F4A460] to-[#DEB887]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-serif text-[#2C1810]">
                🎲 FASE 3 - DOMINIO: Dominó Cronológico
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowNarrative(false)} className="text-[#2C1810]">
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[#2C1810]">
            <div className="bg-[#F5DEB3] p-6 rounded-lg border-2 border-[#8B4513]">
              <p className="text-lg leading-relaxed font-serif italic">
                "Los sabios de Mesopotamia han dejado fragmentos de su historia grabados en fichas de dominó de arcilla.
                Cada pieza contiene una fecha y un evento histórico. Para descubrir el <strong>Sello del Tiempo</strong>,
                deberás conectar las fichas correctamente, formando una cadena cronológica perfecta desde los
                <strong> sumerios</strong> hasta el gran <strong>Código de Hammurabi</strong>."
              </p>
            </div>
            <p className="text-lg leading-relaxed">
              Tu misión es <strong>armar el dominó cronológico</strong> conectando cada ficha con la siguiente.
              Las fechas deben coincidir con los eventos correspondientes. ¡Organiza la historia de Mesopotamia
              pieza por pieza!
            </p>
            <div className="bg-[#D2691E] p-6 rounded-lg border-2 border-[#8B4513]">
              <p className="text-xl font-bold text-white text-center">
                🎲 <strong>DESAFÍO:</strong> Conecta todas las fichas de dominó en el orden cronológico correcto.
                Completa la cadena histórica para obtener el <strong>Sello del Tiempo</strong>.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Roles */}
      <Card className="border-4 border-[#D2691E] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#2C1810]">
            👥 Distribución de Roles del Equipo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {roleDescriptions.map((roleInfo, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-[#F4A460] to-[#DEB887] p-4 rounded-lg border-2 border-[#8B4513]"
              >
                <h3 className="font-bold text-lg text-[#2C1810]">{roleInfo.role}</h3>
                <p className="text-sm text-[#3D2817]">{roleInfo.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Display */}
      {!isSubmitted && (
        <Card className="border-4 border-[#8B4513] bg-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-lg font-bold text-[#2C1810] mb-4">
                🎲 Selecciona una ficha de dominó y colócala en la cadena cronológica
              </p>
              <p className="text-sm text-[#5D3A1A]">
                Fichas colocadas: {placedChain.length} / {dominoPieces.length}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Domino Chain Area */}
      <Card className="border-4 border-[#D2691E] bg-gradient-to-br from-white to-[#F5DEB3]">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#2C1810] text-center">
            🎲 Cadena Cronológica de Mesopotamia
          </CardTitle>
          <p className="text-center text-[#5D3A1A] mt-2">
            {placedChain.length === 0 ? 'Selecciona la primera ficha para comenzar' : 'Conecta las fichas de izquierda a derecha'}
          </p>
        </CardHeader>
        <CardContent className="min-h-[200px]">
          {placedChain.length === 0 ? (
            <div className="flex items-center justify-center h-40 border-4 border-dashed border-[#8B4513] rounded-lg">
              <p className="text-[#8B4513] text-lg font-bold">Comienza aquí tu cadena cronológica</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 justify-center">
              {placedChain.map((domino, index) => (
                <div
                  key={domino.id}
                  className="flex items-center"
                >
                  {/* Domino Piece */}
                  <div className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] border-4 border-[#2C1810] rounded-lg p-3 min-w-[200px]">
                    <div className="flex items-center gap-2 divide-x-4 divide-[#2C1810]">
                      {/* Left side */}
                      <div className="flex-1 text-center pr-2">
                        <p className={`text-xs font-bold ${domino.leftType === 'date' ? 'text-yellow-300' : 'text-white'}`}>
                          {domino.leftType === 'date' ? '📅' : '📜'}
                        </p>
                        <p className="text-xs text-white font-semibold mt-1 break-words">
                          {domino.leftSide}
                        </p>
                      </div>
                      {/* Right side */}
                      <div className="flex-1 text-center pl-2">
                        <p className={`text-xs font-bold ${domino.rightType === 'date' ? 'text-yellow-300' : 'text-white'}`}>
                          {domino.rightType === 'date' ? '📅' : '📜'}
                        </p>
                        <p className="text-xs text-white font-semibold mt-1 break-words">
                          {domino.rightSide}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Connector arrow */}
                  {index < placedChain.length - 1 && (
                    <div className="text-2xl text-[#8B4513] mx-1">→</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Dominos */}
      {!isSubmitted && unplacedDominos.length > 0 && (
        <Card className="border-4 border-[#8B4513] bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#2C1810]">
              🎲 Fichas de Dominó Disponibles ({unplacedDominos.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unplacedDominos.map((domino) => {
                const placement = canPlaceDomino(domino);
                const canPlace = placement !== 'none';

                return (
                  <button
                    key={domino.id}
                    onClick={() => canPlace && setSelectedDomino(domino)}
                    disabled={!canPlace}
                    className={`
                      bg-gradient-to-r from-[#F4A460] to-[#DEB887] border-4 rounded-lg p-4 transition-all
                      ${canPlace
                        ? 'border-[#8B4513] hover:scale-105 hover:shadow-xl cursor-pointer'
                        : 'border-gray-400 opacity-50 cursor-not-allowed'
                      }
                      ${selectedDomino?.id === domino.id ? 'ring-4 ring-[#D2691E] scale-105' : ''}
                    `}
                  >
                    <div className="flex items-center gap-2 divide-x-4 divide-[#2C1810]">
                      {/* Left side */}
                      <div className="flex-1 text-center pr-2">
                        <p className={`text-sm font-bold ${domino.leftType === 'date' ? 'text-orange-600' : 'text-[#2C1810]'}`}>
                          {domino.leftType === 'date' ? '📅' : '📜'}
                        </p>
                        <p className="text-xs text-[#2C1810] font-semibold mt-1 break-words">
                          {domino.leftSide}
                        </p>
                      </div>
                      {/* Right side */}
                      <div className="flex-1 text-center pl-2">
                        <p className={`text-sm font-bold ${domino.rightType === 'date' ? 'text-orange-600' : 'text-[#2C1810]'}`}>
                          {domino.rightType === 'date' ? '📅' : '📜'}
                        </p>
                        <p className="text-xs text-[#2C1810] font-semibold mt-1 break-words">
                          {domino.rightSide}
                        </p>
                      </div>
                    </div>
                    {canPlace && (
                      <p className="text-xs text-green-700 font-bold mt-2">
                        {placement === 'both' ? '✓ Al inicio o al final' : placement === 'start' ? '✓ Al inicio' : '✓ Al final'}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Place Domino Buttons */}
            {selectedDomino && (
              <div className="mt-6 flex gap-4 justify-center">
                {canPlaceDomino(selectedDomino) === 'both' && (
                  <>
                    <Button
                      onClick={() => placeDomino(selectedDomino, 'start')}
                      className="bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white font-bold px-8 py-4"
                    >
                      ⬅️ Colocar al Inicio
                    </Button>
                    <Button
                      onClick={() => placeDomino(selectedDomino, 'end')}
                      className="bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white font-bold px-8 py-4"
                    >
                      Colocar al Final ➡️
                    </Button>
                  </>
                )}
                {canPlaceDomino(selectedDomino) === 'start' && (
                  <Button
                    onClick={() => placeDomino(selectedDomino, 'start')}
                    className="bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white font-bold px-8 py-4"
                  >
                    ⬅️ Colocar al Inicio
                  </Button>
                )}
                {canPlaceDomino(selectedDomino) === 'end' && (
                  <Button
                    onClick={() => placeDomino(selectedDomino, 'end')}
                    className="bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white font-bold px-8 py-4"
                  >
                    Colocar al Final ➡️
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Submit/Reset Buttons */}
      {!isSubmitted ? (
        <Button
          onClick={handleSubmit}
          disabled={!allPlaced}
          className="w-full bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white text-xl py-8 font-bold border-4 border-[#2C1810] hover:shadow-xl disabled:opacity-50"
        >
          {allPlaced ? '✅ Verificar Cadena Cronológica' : `⏳ Coloca todas las fichas (${placedChain.length}/${dominoPieces.length})`}
        </Button>
      ) : (
        <Button
          onClick={resetGame}
          className="w-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white text-lg py-6 font-bold border-3 border-[#2C1810] hover:shadow-xl"
        >
          🔄 Reiniciar Dominó
        </Button>
      )}

      {/* Completion Modal */}
      {showCompletion && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#F4A460] to-[#DEB887] flex items-center justify-center z-50 p-4">
          <Card className="border-4 border-[#8B4513] bg-gradient-to-br from-[#FFF8F0] to-[#F5DEB3] max-w-2xl w-full">
            <CardHeader>
              <CardTitle className="text-3xl font-serif text-[#2C1810] text-center">
                {hasPassed ? '🎉 ¡Felicitaciones!' : '⚠️ Intenta de Nuevo'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                {hasPassed ? (
                  <>
                    <div className="text-6xl mb-4">🎲</div>
                    <p className="text-2xl font-bold text-[#2C1810]">
                      Has obtenido el Sello del Tiempo
                    </p>
                    <p className="text-lg text-[#5D3A1A]">
                      Has conectado correctamente todas las fichas del dominó cronológico de Mesopotamia.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-4">🔄</div>
                    <p className="text-2xl font-bold text-[#2C1810]">
                      La cadena cronológica no está correcta
                    </p>
                    <p className="text-lg text-[#5D3A1A]">
                      Revisa las conexiones entre las fichas de dominó e inténtalo de nuevo.
                    </p>
                  </>
                )}

                <div className="bg-white p-6 rounded-lg border-2 border-[#8B4513]">
                  <p className="text-sm font-bold text-[#5D3A1A]">Puntuación Final</p>
                  <p className="text-4xl font-extrabold text-[#D2691E]">{score} pts</p>
                  <p className="text-lg font-bold text-[#8B4513] mt-2">
                    {allPlaced ? 'Cadena completada' : 'Cadena incompleta'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                {!hasPassed && (
                  <Button
                    onClick={() => {
                      setShowCompletion(false);
                      resetGame();
                    }}
                    className="flex-1 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white text-lg py-6 font-bold border-3 border-[#2C1810] hover:shadow-xl"
                  >
                    🔄 Intentar de Nuevo
                  </Button>
                )}
                <Button
                  onClick={handleComplete}
                  disabled={!hasPassed}
                  className={`
                    ${hasPassed ? 'w-full' : 'flex-1'} bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white text-lg py-6 font-bold
                    border-3 border-[#2C1810] hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {hasPassed ? '⏳ Continuar a la Siguiente Fase' : '⚠️ Necesitas 70% para continuar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
