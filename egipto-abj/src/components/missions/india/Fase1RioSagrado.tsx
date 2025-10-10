'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Fase1Props {
  onComplete: (data: { score: number; matchedPairs: number; totalPairs: number }) => void;
  onProgressUpdate?: (progress: number, data?: Record<string, unknown>) => void;
  savedProgress?: Record<string, unknown> | null;
}

interface MemoryCard {
  id: number;
  concept: string;
  description: string;
  isCorrect: boolean;
  type: 'concept' | 'description';
  pairId: number;
}

const correctPairs = [
  { concept: 'Hinduismo', description: 'Religión más antigua' },
  { concept: 'Budismo', description: 'Enseñanzas de Buda' },
  { concept: 'Sistema de Castas', description: 'Organización social' },
  { concept: 'Sistema Decimal', description: 'Matemáticas' },
  { concept: 'Número Cero', description: 'Invento matemático' },
  { concept: 'Medicina Ayurvédica', description: 'Equilibrio cuerpo-mente' },
  { concept: 'Yoga', description: 'Disciplina espiritual' },
  { concept: 'Chaturanga', description: 'Origen del ajedrez' },
  { concept: 'Arquitectura de Templos', description: 'Arcos y cúpulas' },
  { concept: 'Mandalas', description: 'Símbolos sagrados' },
];

const distractorPairs = [
  { concept: 'Pirámides', description: 'Egipto' },
  { concept: 'Brújula', description: 'China' },
  { concept: 'Escritura Cuneiforme', description: 'Mesopotamia' },
];

const roleDescriptions = [
  { role: '🧭 Explorador', description: 'Busca y descubre las contribuciones de India' },
  { role: '📚 Historiador', description: 'Investiga el contexto histórico de cada contribución' },
  { role: '✍️ Escriba', description: 'Documenta los hallazgos y conexiones encontradas' },
  { role: '🎨 Artista', description: 'Visualiza y organiza las parejas encontradas' },
];

export function Fase1RioSagrado({ onComplete, onProgressUpdate, savedProgress }: Fase1Props) {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [showNarrative, setShowNarrative] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Initialize cards
  useEffect(() => {
    if (savedProgress && savedProgress.cards) {
      setCards(savedProgress.cards as MemoryCard[]);
      setMatchedPairs((savedProgress.matchedPairs as number[]) || []);
      setScore((savedProgress.score as number) || 0);
      setAttempts((savedProgress.attempts as number) || 0);
      setShowNarrative(false);
    } else {
      initializeCards();
    }
  }, [savedProgress]);

  // Auto-save progress
  useEffect(() => {
    const totalPairs = correctPairs.length;
    const matchedCount = matchedPairs.length / 2;
    const progressPercentage = Math.min((matchedCount / totalPairs) * 100, 99);

    if (onProgressUpdate && progressPercentage > 0 && progressPercentage < 100) {
      onProgressUpdate(progressPercentage, {
        cards,
        matchedPairs,
        score,
        attempts,
      });
    }
  }, [matchedPairs, score, attempts, cards, onProgressUpdate]);

  const initializeCards = () => {
    // Combine correct and distractor pairs
    const allPairs = [...correctPairs, ...distractorPairs];

    // Create cards from pairs
    const newCards: MemoryCard[] = [];
    let cardId = 0;

    allPairs.forEach((pair, pairIndex) => {
      const isCorrect = pairIndex < correctPairs.length;

      // Add concept card
      newCards.push({
        id: cardId++,
        concept: pair.concept,
        description: '',
        isCorrect,
        type: 'concept',
        pairId: pairIndex,
      });

      // Add description card
      newCards.push({
        id: cardId++,
        concept: '',
        description: pair.description,
        isCorrect,
        type: 'description',
        pairId: pairIndex,
      });
    });

    // Shuffle cards
    const shuffled = newCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  const handleCardClick = (cardId: number) => {
    // Ignore if card is already matched or already flipped
    if (matchedPairs.includes(cardId) || flippedCards.includes(cardId)) {
      return;
    }

    // Ignore if two cards are already flipped
    if (flippedCards.length >= 2) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      setAttempts(attempts + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // Match found
        const newMatchedPairs = [...matchedPairs, firstId, secondId];
        setMatchedPairs(newMatchedPairs);

        // Add points only if it's a correct pair
        if (firstCard.isCorrect) {
          setScore(score + 10);
        }

        setFlippedCards([]);

        // Check if game is complete
        const totalCorrectCards = correctPairs.length * 2;
        const correctMatched = newMatchedPairs.filter(id => {
          const card = cards.find(c => c.id === id);
          return card?.isCorrect;
        }).length;

        if (correctMatched === totalCorrectCards) {
          setTimeout(() => {
            setShowCompletion(true);
          }, 500);
        }
      } else {
        // No match - flip cards back after delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setFlippedCards([]);
    setMatchedPairs([]);
    setScore(0);
    setAttempts(0);
    setShowCompletion(false);
    initializeCards();
  };

  const handleComplete = () => {
    const correctMatchedCount = matchedPairs.filter(id => {
      const card = cards.find(c => c.id === id);
      return card?.isCorrect;
    }).length / 2;

    onComplete({
      score,
      matchedPairs: correctMatchedCount,
      totalPairs: correctPairs.length,
    });
  };

  const isCardFlipped = (cardId: number) => {
    return flippedCards.includes(cardId) || matchedPairs.includes(cardId);
  };

  const getCardColor = (card: MemoryCard) => {
    if (matchedPairs.includes(card.id)) {
      return card.isCorrect
        ? 'bg-gradient-to-br from-[#FF6B35] to-[#F7931E] border-[#8B4000]'
        : 'bg-gradient-to-br from-gray-400 to-gray-500 border-gray-600';
    }
    return 'bg-gradient-to-br from-[#8B4000] to-[#6B3410] border-[#F7931E]';
  };

  const correctMatchedCount = matchedPairs.filter(id => {
    const card = cards.find(c => c.id === id);
    return card?.isCorrect;
  }).length / 2;

  const passPercentage = (correctMatchedCount / correctPairs.length) * 100;
  const hasPassed = passPercentage >= 80;

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* Narrative */}
      {showNarrative && (
        <Card className="border-4 border-[#FF6B35] bg-gradient-to-br from-[#FFF8F0] to-[#FFE4D1]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-serif text-[#8B4000]">
                🕉️ FASE 1 - AVENTURA: El Río Sagrado
              </CardTitle>
              <Button
                variant="ghost"
                onClick={() => setShowNarrative(false)}
                className="text-[#8B4000]"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[#5D3A1A]">
            <p className="text-lg leading-relaxed">
              <strong>Hace más de cinco mil años</strong>, en las orillas del río Indo y el Ganges,
              floreció una civilización que transformó el mundo con sus aportes a la ciencia, filosofía y espiritualidad.
            </p>
            <p className="text-lg leading-relaxed">
              La India antigua nos regaló conceptos que revolucionaron las matemáticas como el <strong>sistema decimal</strong> y
              el <strong>número cero</strong>. Sus sabios desarrollaron el <strong>yoga</strong> y la <strong>medicina ayurvédica</strong>,
              buscando el equilibrio entre cuerpo y mente. Las religiones del <strong>hinduismo</strong> y <strong>budismo</strong> nacieron
              en estas tierras sagradas, y su arquitectura de templos con arcos y cúpulas sigue asombrando al mundo.
            </p>
            <div className="bg-[#F7931E] p-6 rounded-lg border-2 border-[#8B4000]">
              <p className="text-xl font-bold text-[#8B4000] text-center">
                🏛️ <strong>DESAFÍO:</strong> En las aguas sagradas del río, encuentra las parejas que conectan
                las grandes contribuciones de la India antigua. Pero cuidado: algunas cartas son engañosas y pertenecen
                a otras civilizaciones. Necesitas al menos 8 de 10 parejas correctas para obtener el
                <strong> Sello del Río Sagrado</strong>.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Roles */}
      <Card className="border-4 border-[#F7931E] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#8B4000]">
            👥 Distribución de Roles del Equipo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {roleDescriptions.map((roleInfo, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-[#FFF8F0] to-[#FFE4D1] p-4 rounded-lg border-2 border-[#FF6B35]"
              >
                <h3 className="font-bold text-lg text-[#8B4000]">{roleInfo.role}</h3>
                <p className="text-sm text-[#5D3A1A]">{roleInfo.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Score Display */}
      <Card className="border-4 border-[#FF6B35] bg-white">
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gradient-to-br from-[#FF6B35] to-[#F7931E] p-4 rounded-lg border-2 border-[#8B4000]">
              <p className="text-sm font-bold text-white">Parejas Correctas</p>
              <p className="text-3xl font-extrabold text-white">{correctMatchedCount}/{correctPairs.length}</p>
            </div>
            <div className="bg-gradient-to-br from-[#F7931E] to-[#FF6B35] p-4 rounded-lg border-2 border-[#8B4000]">
              <p className="text-sm font-bold text-white">Puntuación</p>
              <p className="text-3xl font-extrabold text-white">{score}</p>
            </div>
            <div className="bg-gradient-to-br from-[#8B4000] to-[#6B3410] p-4 rounded-lg border-2 border-[#F7931E]">
              <p className="text-sm font-bold text-white">Intentos</p>
              <p className="text-3xl font-extrabold text-white">{attempts}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Memory Cards Grid */}
      <Card className="border-4 border-[#F7931E] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#8B4000] text-center">
            🎴 Encuentra las Parejas - Haz clic en las cartas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={matchedPairs.includes(card.id) || flippedCards.length >= 2}
                className={`
                  relative aspect-square p-3 rounded-lg border-4 transition-all duration-300 transform
                  ${getCardColor(card)}
                  ${isCardFlipped(card.id) ? 'rotate-0' : 'rotate-y-180'}
                  hover:scale-105 disabled:cursor-not-allowed
                  shadow-lg hover:shadow-xl
                `}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  {isCardFlipped(card.id) ? (
                    <div className="text-center">
                      <p className="text-xs font-bold text-white break-words leading-tight">
                        {card.type === 'concept' ? card.concept : card.description}
                      </p>
                    </div>
                  ) : (
                    <div className="text-4xl">
                      🕉️
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <Button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-[#8B4000] to-[#6B3410] text-white text-lg py-6 font-bold border-3 border-[#F7931E] hover:shadow-xl transition-all"
            >
              🔄 Reiniciar Juego
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Completion Modal */}
      {showCompletion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="border-4 border-[#F7931E] bg-gradient-to-br from-[#FFF8F0] to-[#FFE4D1] max-w-2xl w-full">
            <CardHeader>
              <CardTitle className="text-3xl font-serif text-[#8B4000] text-center">
                {hasPassed ? '🎉 ¡Felicitaciones!' : '⚠️ Intenta de Nuevo'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                {hasPassed ? (
                  <>
                    <div className="text-6xl mb-4">🕉️</div>
                    <p className="text-2xl font-bold text-[#8B4000]">
                      Has obtenido el Sello del Río Sagrado
                    </p>
                    <p className="text-lg text-[#5D3A1A]">
                      Has demostrado tu conocimiento sobre las grandes contribuciones de la India antigua.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-4">🔄</div>
                    <p className="text-2xl font-bold text-[#8B4000]">
                      Necesitas al menos 8 parejas correctas
                    </p>
                    <p className="text-lg text-[#5D3A1A]">
                      Has encontrado {correctMatchedCount} de {correctPairs.length} parejas correctas.
                    </p>
                  </>
                )}

                <div className="bg-white p-6 rounded-lg border-2 border-[#8B4000] space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-bold text-[#5D3A1A]">Parejas Correctas</p>
                      <p className="text-3xl font-extrabold text-[#FF6B35]">
                        {correctMatchedCount}/{correctPairs.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#5D3A1A]">Puntuación Final</p>
                      <p className="text-3xl font-extrabold text-[#F7931E]">{score}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#5D3A1A]">Precisión</p>
                    <p className="text-2xl font-extrabold text-[#8B4000]">
                      {passPercentage.toFixed(0)}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {!hasPassed && (
                  <Button
                    onClick={() => {
                      setShowCompletion(false);
                      resetGame();
                    }}
                    className="w-full bg-gradient-to-r from-[#8B4000] to-[#6B3410] text-white text-lg py-6 font-bold border-3 border-[#F7931E] hover:shadow-xl transition-all"
                  >
                    🔄 Intentar de Nuevo
                  </Button>
                )}
                <Button
                  onClick={handleComplete}
                  disabled={!hasPassed}
                  className={`
                    ${hasPassed ? 'col-span-2' : 'col-span-1'}
                    w-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white text-lg py-6 font-bold
                    border-3 border-[#8B4000] hover:shadow-xl transition-all
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {hasPassed ? '🕉️ Continuar a la Siguiente Fase' : '⚠️ Necesitas 80% para continuar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
