'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Fase1Props {
  onComplete: (data: { score: number; correctSelections: number; totalCorrect: number }) => void;
  onProgressUpdate?: (progress: number, data?: Record<string, unknown>) => void;
  savedProgress?: Record<string, unknown> | null;
}

interface Cartilla {
  id: number;
  title: string;
  description: string;
  icon: string;
  isFromChina: boolean;
  civilization?: string;
}

const allCartillas: Cartilla[] = [
  // Aportes de China (correctas)
  { id: 1, title: 'Seda', description: 'Tejido fino para comercio', icon: '🧵', isFromChina: true },
  { id: 2, title: 'Pólvora', description: 'Transformó la guerra', icon: '💥', isFromChina: true },
  { id: 3, title: 'Papel', description: 'Preservar la memoria', icon: '📄', isFromChina: true },
  { id: 4, title: 'Brújula', description: 'Guiar a navegantes', icon: '🧭', isFromChina: true },
  { id: 5, title: 'Porcelana', description: 'Cerámica fina', icon: '🏺', isFromChina: true },
  { id: 6, title: 'Confucianismo', description: 'Filosofía de armonía', icon: '☯️', isFromChina: true },
  { id: 7, title: 'Gran Muralla', description: 'Defensa monumental', icon: '🏮', isFromChina: true },
  { id: 8, title: 'Imprenta', description: 'Difusión del conocimiento', icon: '🖨️', isFromChina: true },
  { id: 9, title: 'Té', description: 'Bebida milenaria', icon: '🍵', isFromChina: true },
  { id: 10, title: 'Acupuntura', description: 'Medicina tradicional', icon: '💉', isFromChina: true },

  // Distractores de otras civilizaciones
  { id: 11, title: 'Pirámides', description: 'Tumbas monumentales', icon: '🔺', isFromChina: false, civilization: 'Egipto' },
  { id: 12, title: 'Jeroglíficos', description: 'Escritura sagrada', icon: '𓂀', isFromChina: false, civilization: 'Egipto' },
  { id: 13, title: 'Yoga', description: 'Disciplina mente-cuerpo', icon: '🧘', isFromChina: false, civilization: 'India' },
  { id: 14, title: 'Sistema Decimal', description: 'Números y cero', icon: '🔢', isFromChina: false, civilization: 'India' },
  { id: 15, title: 'Código de Hammurabi', description: 'Leyes escritas', icon: '⚖️', isFromChina: false, civilization: 'Mesopotamia' },
  { id: 16, title: 'Escritura Cuneiforme', description: 'Primeras palabras', icon: '📜', isFromChina: false, civilization: 'Mesopotamia' },
];

const roleDescriptions = [
  { role: '🧭 Explorador', description: 'Busca y examina todas las cartillas presentadas' },
  { role: '📚 Historiador', description: 'Analiza el contexto histórico de cada aporte' },
  { role: '✍️ Escriba', description: 'Registra y documenta las selecciones del equipo' },
  { role: '🎨 Artista', description: 'Identifica símbolos y características visuales' },
];

export function Fase1MandatoCielo({ onComplete, onProgressUpdate, savedProgress }: Fase1Props) {
  const [cartillas, setCartillas] = useState<Cartilla[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showNarrative, setShowNarrative] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutos
  const [timerActive, setTimerActive] = useState(false);

  // Initialize cartillas
  useEffect(() => {
    if (savedProgress && savedProgress.selectedIds) {
      setSelectedIds(savedProgress.selectedIds as number[]);
      setHasSubmitted(savedProgress.hasSubmitted as boolean || false);
      setTimeRemaining(savedProgress.timeRemaining as number || 180);
      setShowNarrative(false);
    }

    // Shuffle cartillas
    const shuffled = [...allCartillas].sort(() => Math.random() - 0.5);
    setCartillas(shuffled);
  }, [savedProgress]);

  // Timer
  useEffect(() => {
    if (!timerActive || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  // Auto-save progress
  useEffect(() => {
    if (onProgressUpdate && selectedIds.length > 0 && !hasSubmitted) {
      const progress = Math.min((selectedIds.length / 10) * 50, 50); // Max 50% before submission
      onProgressUpdate(progress, {
        selectedIds,
        hasSubmitted,
        timeRemaining,
      });
    }
  }, [selectedIds, hasSubmitted, timeRemaining, onProgressUpdate]);

  const startGame = () => {
    setShowNarrative(false);
    setTimerActive(true);
  };

  const toggleSelection = (id: number) => {
    if (hasSubmitted) return;

    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selId) => selId !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
    setTimerActive(false);

    // Calculate results
    const correctFromChina = cartillas.filter(c => c.isFromChina);
    const correctSelections = selectedIds.filter(id => {
      const cartilla = cartillas.find(c => c.id === id);
      return cartilla?.isFromChina;
    }).length;

    const incorrectSelections = selectedIds.filter(id => {
      const cartilla = cartillas.find(c => c.id === id);
      return !cartilla?.isFromChina;
    }).length;

    const missedCorrect = correctFromChina.length - correctSelections;

    // Calculate score
    const baseScore = correctSelections * 10;
    const penalty = (incorrectSelections * 5) + (missedCorrect * 3);
    const finalScore = Math.max(0, baseScore - penalty);

    // Check if passed (80% accuracy)
    const accuracy = (correctSelections / correctFromChina.length) * 100;
    const hasPassed = accuracy >= 80 && incorrectSelections <= 2;

    setTimeout(() => {
      if (hasPassed) {
        onComplete({
          score: finalScore,
          correctSelections,
          totalCorrect: correctFromChina.length,
        });
      }
      setShowCompletion(true);
    }, 500);
  };

  const resetGame = () => {
    setSelectedIds([]);
    setHasSubmitted(false);
    setShowCompletion(false);
    setTimeRemaining(180);
    setTimerActive(false);

    // Re-shuffle
    const shuffled = [...allCartillas].sort(() => Math.random() - 0.5);
    setCartillas(shuffled);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const correctFromChina = cartillas.filter(c => c.isFromChina);
  const correctSelections = selectedIds.filter(id => {
    const cartilla = cartillas.find(c => c.id === id);
    return cartilla?.isFromChina;
  }).length;

  const incorrectSelections = selectedIds.filter(id => {
    const cartilla = cartillas.find(c => c.id === id);
    return !cartilla?.isFromChina;
  }).length;

  const accuracy = correctFromChina.length > 0 ? (correctSelections / correctFromChina.length) * 100 : 0;
  const hasPassed = accuracy >= 80 && incorrectSelections <= 2;

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* Narrative */}
      {showNarrative && (
        <Card className="border-4 border-[#DC143C] bg-gradient-to-br from-[#FFF9E6] to-[#FFE4B5]">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-[#8B0000]">
              🐉 FASE 1 - AVENTURA: El Mandato del Cielo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#5C0000]">
            <p className="text-lg leading-relaxed">
              <strong>Hace miles de años</strong>, en las fértiles orillas del río Amarillo,
              nació una de las civilizaciones más poderosas de la historia: la China antigua.
            </p>
            <p className="text-lg leading-relaxed">
              Bajo el resplandor del sol naciente, los emperadores afirmaban que su autoridad
              provenía directamente de los dioses. Este principio sagrado fue conocido como el
              <strong> Mandato del Cielo</strong>: la creencia de que el gobernante debía garantizar
              la paz, la armonía y la prosperidad de su pueblo.
            </p>
            <p className="text-lg leading-relaxed">
              China nos regaló inventos que cambiaron el mundo: la <strong>seda</strong>, la <strong>pólvora</strong>,
              el <strong>papel</strong>, la <strong>brújula</strong>, la <strong>porcelana</strong>,
              y el <strong>confucianismo</strong> que enseñó el valor del respeto y la armonía.
            </p>
            <div className="bg-[#DC143C] p-6 rounded-lg border-2 border-[#FFD700]">
              <p className="text-xl font-bold text-white text-center mb-4">
                🏛️ <strong>DESAFÍO DEL EQUIPO:</strong>
              </p>
              <p className="text-lg text-white leading-relaxed">
                Se les presentará un conjunto de cartillas con aportes de diferentes civilizaciones.
                Su misión es <strong>identificar y seleccionar ÚNICAMENTE los aportes que pertenecen a China</strong>.
              </p>
              <p className="text-lg text-white leading-relaxed mt-3">
                ⚠️ <strong>Cuidado:</strong> Algunas cartillas son de Egipto, India o Mesopotamia (distractores).
              </p>
              <p className="text-lg text-white leading-relaxed mt-3">
                ✅ Necesitan identificar al menos <strong>80% de los aportes chinos correctamente</strong> para
                obtener el <strong>Sello del Mandato del Cielo</strong>.
              </p>
              <p className="text-lg text-white leading-relaxed mt-3">
                ⏱️ Tienen <strong>3 minutos</strong> para completar la misión.
              </p>
            </div>
            <Button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white text-xl py-8 font-bold border-3 border-[#FFD700] hover:shadow-xl transition-all"
            >
              🐉 Comenzar Misión
            </Button>
          </CardContent>
        </Card>
      )}

      {!showNarrative && (
        <>
          {/* Roles */}
          <Card className="border-4 border-[#FFD700] bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-[#8B0000]">
                👥 Distribución de Roles del Equipo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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

          {/* Timer and Stats */}
          <Card className="border-4 border-[#DC143C] bg-white">
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gradient-to-br from-[#DC143C] to-[#8B0000] p-4 rounded-lg border-2 border-[#FFD700]">
                  <p className="text-sm font-bold text-white">⏱️ Tiempo</p>
                  <p className={`text-3xl font-extrabold ${timeRemaining <= 30 ? 'text-yellow-300 animate-pulse' : 'text-white'}`}>
                    {formatTime(timeRemaining)}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] p-4 rounded-lg border-2 border-[#8B0000]">
                  <p className="text-sm font-bold text-[#8B0000]">✅ Seleccionadas</p>
                  <p className="text-3xl font-extrabold text-[#8B0000]">{selectedIds.length}</p>
                </div>
                <div className="bg-gradient-to-br from-[#8B0000] to-[#5C0000] p-4 rounded-lg border-2 border-[#FFD700]">
                  <p className="text-sm font-bold text-white">🎯 Objetivo</p>
                  <p className="text-3xl font-extrabold text-white">10</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          {!hasSubmitted && (
            <Card className="border-4 border-[#FFD700] bg-gradient-to-r from-[#FFF9E6] to-[#FFE4B5]">
              <CardContent className="pt-6">
                <p className="text-center text-lg font-bold text-[#8B0000]">
                  📝 Haz clic en las cartillas que consideres que son aportes de CHINA. Evita seleccionar las de otras civilizaciones.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Cartillas Grid */}
          <Card className="border-4 border-[#FFD700] bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-[#8B0000] text-center">
                🎴 Cartillas de Aportes de Civilizaciones Antiguas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cartillas.map((cartilla) => {
                  const isSelected = selectedIds.includes(cartilla.id);
                  const showResult = hasSubmitted;
                  const isCorrectSelection = isSelected && cartilla.isFromChina;
                  const isWrongSelection = isSelected && !cartilla.isFromChina;
                  const isMissed = !isSelected && cartilla.isFromChina;

                  return (
                    <button
                      key={cartilla.id}
                      onClick={() => toggleSelection(cartilla.id)}
                      disabled={hasSubmitted}
                      className={`
                        p-6 rounded-lg border-4 transition-all transform hover:scale-105
                        ${!showResult && isSelected ? 'border-[#DC143C] bg-gradient-to-br from-[#DC143C] to-[#8B0000] shadow-xl scale-105' : ''}
                        ${!showResult && !isSelected ? 'border-[#8B0000] bg-white hover:border-[#DC143C]' : ''}
                        ${showResult && isCorrectSelection ? 'border-green-600 bg-gradient-to-br from-green-50 to-green-100' : ''}
                        ${showResult && isWrongSelection ? 'border-red-600 bg-gradient-to-br from-red-50 to-red-100' : ''}
                        ${showResult && isMissed ? 'border-yellow-600 bg-gradient-to-br from-yellow-50 to-yellow-100' : ''}
                        ${showResult && !isSelected && !cartilla.isFromChina ? 'border-gray-400 bg-gray-50 opacity-50' : ''}
                        disabled:cursor-not-allowed
                      `}
                    >
                      <div className="text-center space-y-2">
                        <div className="text-5xl mb-2">{cartilla.icon}</div>
                        <h3 className={`font-bold text-lg ${isSelected && !showResult ? 'text-white' : 'text-[#8B0000]'}`}>
                          {cartilla.title}
                        </h3>
                        <p className={`text-sm ${isSelected && !showResult ? 'text-white' : 'text-[#5C0000]'}`}>
                          {cartilla.description}
                        </p>

                        {showResult && (
                          <div className="mt-3">
                            {isCorrectSelection && (
                              <Badge className="bg-green-600 text-white">✓ Correcta</Badge>
                            )}
                            {isWrongSelection && (
                              <Badge className="bg-red-600 text-white">✗ {cartilla.civilization}</Badge>
                            )}
                            {isMissed && (
                              <Badge className="bg-yellow-600 text-white">⚠️ Omitida</Badge>
                            )}
                            {!isSelected && cartilla.isFromChina && (
                              <Badge className="bg-yellow-600 text-white">Faltó seleccionar</Badge>
                            )}
                          </div>
                        )}

                        {!showResult && isSelected && (
                          <div className="mt-2">
                            <Badge className="bg-white text-[#8B0000]">✓ Seleccionada</Badge>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {!hasSubmitted && (
                <div className="mt-6 space-y-4">
                  <Button
                    onClick={handleSubmit}
                    disabled={selectedIds.length === 0}
                    className="w-full bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white text-xl py-8 font-bold border-3 border-[#FFD700] hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ✅ Verificar Selección
                  </Button>
                  <p className="text-center text-sm text-[#5C0000]">
                    Has seleccionado {selectedIds.length} cartillas. Recuerda: solo debes seleccionar las de China.
                  </p>
                </div>
              )}

              {hasSubmitted && !showCompletion && (
                <div className="mt-6">
                  <Button
                    onClick={resetGame}
                    className="w-full bg-gradient-to-r from-[#8B0000] to-[#5C0000] text-white text-lg py-6 font-bold border-3 border-[#FFD700] hover:shadow-xl transition-all"
                  >
                    🔄 Reiniciar Juego
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Summary (after submission) */}
          {hasSubmitted && !showCompletion && (
            <Card className="border-4 border-[#FFD700] bg-gradient-to-br from-[#FFF9E6] to-[#FFE4B5]">
              <CardHeader>
                <CardTitle className="text-3xl font-serif text-[#8B0000] text-center">
                  📊 Resumen de Resultados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div className="bg-green-100 p-4 rounded-lg border-2 border-green-600">
                    <p className="text-sm font-bold text-green-800">✓ Correctas</p>
                    <p className="text-4xl font-extrabold text-green-600">{correctSelections}</p>
                    <p className="text-xs text-green-700">de 10</p>
                  </div>
                  <div className="bg-red-100 p-4 rounded-lg border-2 border-red-600">
                    <p className="text-sm font-bold text-red-800">✗ Incorrectas</p>
                    <p className="text-4xl font-extrabold text-red-600">{incorrectSelections}</p>
                    <p className="text-xs text-red-700">distractores</p>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-lg border-2 border-yellow-600">
                    <p className="text-sm font-bold text-yellow-800">⚠️ Omitidas</p>
                    <p className="text-4xl font-extrabold text-yellow-600">
                      {correctFromChina.length - correctSelections}
                    </p>
                    <p className="text-xs text-yellow-700">faltaron</p>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg border-2 border-blue-600">
                    <p className="text-sm font-bold text-blue-800">🎯 Precisión</p>
                    <p className="text-4xl font-extrabold text-blue-600">{accuracy.toFixed(0)}%</p>
                    <p className="text-xs text-blue-700">objetivo: 80%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Completion Modal */}
      {showCompletion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="border-4 border-[#FFD700] bg-gradient-to-br from-[#FFF9E6] to-[#FFE4B5] max-w-2xl w-full">
            <CardHeader>
              <CardTitle className="text-3xl font-serif text-[#8B0000] text-center">
                {hasPassed ? '🎉 ¡Felicitaciones!' : '⚠️ Intenta de Nuevo'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                {hasPassed ? (
                  <>
                    <div className="text-6xl mb-4">🐉</div>
                    <p className="text-2xl font-bold text-[#8B0000]">
                      Has obtenido el Sello del Mandato del Cielo
                    </p>
                    <p className="text-lg text-[#5C0000]">
                      Has identificado correctamente los aportes de la China antigua con {accuracy.toFixed(0)}% de precisión.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-4">🔄</div>
                    <p className="text-2xl font-bold text-[#8B0000]">
                      Necesitas al menos 80% de precisión
                    </p>
                    <p className="text-lg text-[#5C0000]">
                      Has identificado {correctSelections} de {correctFromChina.length} aportes chinos ({accuracy.toFixed(0)}%).
                      {incorrectSelections > 0 && ` Seleccionaste ${incorrectSelections} distractores.`}
                    </p>
                  </>
                )}

                <div className="bg-white p-6 rounded-lg border-2 border-[#8B0000] space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-bold text-[#5C0000]">✓ Correctas</p>
                      <p className="text-3xl font-extrabold text-green-600">{correctSelections}/10</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#5C0000]">✗ Incorrectas</p>
                      <p className="text-3xl font-extrabold text-red-600">{incorrectSelections}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#5C0000]">🎯 Precisión</p>
                      <p className="text-3xl font-extrabold text-[#DC143C]">{accuracy.toFixed(0)}%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                {!hasPassed && (
                  <Button
                    onClick={() => {
                      setShowCompletion(false);
                      resetGame();
                      setShowNarrative(true);
                    }}
                    className="flex-1 bg-gradient-to-r from-[#8B0000] to-[#5C0000] text-white text-lg py-6 font-bold border-3 border-[#FFD700] hover:shadow-xl transition-all"
                  >
                    🔄 Intentar de Nuevo
                  </Button>
                )}
                {hasPassed && (
                  <Button
                    onClick={() => {
                      onComplete({
                        score: correctSelections * 10,
                        correctSelections,
                        totalCorrect: correctFromChina.length,
                      });
                    }}
                    className="w-full bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white text-lg py-6 font-bold border-3 border-[#FFD700] hover:shadow-xl transition-all"
                  >
                    🐉 Continuar a la Siguiente Fase
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
