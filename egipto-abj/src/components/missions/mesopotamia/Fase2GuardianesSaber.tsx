'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Fase2Props {
  onComplete: (data: { score: number; correctClassifications: number; totalRelics: number }) => void;
  onProgressUpdate?: (progress: number, data?: Record<string, unknown>) => void;
  savedProgress?: Record<string, unknown> | null;
}

interface Relic {
  id: string;
  name: string;
  category: 'politica' | 'economia' | 'cultura';
  classified: boolean;
  classifiedCategory?: string;
  icon: string;
}

const relics: Relic[] = [
  // Política
  { id: 'hammurabi', name: 'Código de Hammurabi', category: 'politica', classified: false, icon: '⚖️' },
  { id: 'rey-sacerdote', name: 'Rey-Sacerdote', category: 'politica', classified: false, icon: '👑' },
  { id: 'estela', name: 'Estela de leyes', category: 'politica', classified: false, icon: '📜' },
  { id: 'zigurat', name: 'Zigurat (templo-poder)', category: 'politica', classified: false, icon: '🏛️' },

  // Economía
  { id: 'rueda', name: 'La Rueda', category: 'economia', classified: false, icon: '⚙️' },
  { id: 'arado', name: 'El Arado', category: 'economia', classified: false, icon: '🌾' },
  { id: 'comercio', name: 'Rutas Comerciales', category: 'economia', classified: false, icon: '🛤️' },
  { id: 'riego', name: 'Sistemas de Riego', category: 'economia', classified: false, icon: '💧' },
  { id: 'bronce', name: 'Trabajo en Bronce', category: 'economia', classified: false, icon: '🔨' },

  // Cultura
  { id: 'cuneiforme', name: 'Escritura Cuneiforme', category: 'cultura', classified: false, icon: '✍️' },
  { id: 'epopeya-gilgamesh', name: 'Epopeya de Gilgamesh', category: 'cultura', classified: false, icon: '📖' },
  { id: 'astronomia', name: 'Astronomía', category: 'cultura', classified: false, icon: '🌟' },
  { id: 'matematicas', name: 'Sistema Sexagesimal', category: 'cultura', classified: false, icon: '🔢' },
];

const categories = [
  { id: 'politica', name: 'Política', color: 'from-[#8B4513] to-[#A0522D]', icon: '👑' },
  { id: 'economia', name: 'Economía', color: 'from-[#D2691E] to-[#CD853F]', icon: '💰' },
  { id: 'cultura', name: 'Cultura', color: 'from-[#DEB887] to-[#F4A460]', icon: '📚' },
];

const roleDescriptions = [
  { role: '📜 Lector', description: 'Lee las reliquias y sus descripciones' },
  { role: '🔍 Investigador', description: 'Investiga a qué categoría pertenece cada reliquia' },
  { role: '🗂️ Clasificador', description: 'Clasifica las reliquias arrastrándolas a las categorías' },
  { role: '🎤 Expositor', description: 'Justifica las clasificaciones al equipo' },
];

export function Fase2GuardianesSaber({ onComplete, onProgressUpdate, savedProgress }: Fase2Props) {
  const [relicList, setRelicList] = useState<Relic[]>(relics);
  const [draggedRelic, setDraggedRelic] = useState<string | null>(null);
  const [showNarrative, setShowNarrative] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (savedProgress && savedProgress.relicList) {
      setRelicList(savedProgress.relicList as Relic[]);
      setScore((savedProgress.score as number) || 0);
      setShowNarrative(false);
    }
  }, [savedProgress]);

  useEffect(() => {
    const classifiedCount = relicList.filter(r => r.classified).length;
    const progress = Math.min((classifiedCount / relicList.length) * 100, 99);

    if (onProgressUpdate && progress > 0 && progress < 100) {
      onProgressUpdate(progress, { relicList, score });
    }
  }, [relicList, score, onProgressUpdate]);

  const handleDragStart = (relicId: string) => {
    setDraggedRelic(relicId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (categoryId: string) => {
    if (!draggedRelic) return;

    const relic = relicList.find(r => r.id === draggedRelic);
    if (!relic || relic.classified) return;

    const isCorrect = relic.category === categoryId;
    const pointsForRelic = 15;
    const newScore = isCorrect ? score + pointsForRelic : score;

    const updatedRelics = relicList.map(r =>
      r.id === draggedRelic
        ? { ...r, classified: true, classifiedCategory: categoryId }
        : r
    );

    setRelicList(updatedRelics);
    setScore(newScore);
    setDraggedRelic(null);

    // Check if all relics are classified
    if (updatedRelics.every(r => r.classified)) {
      setTimeout(() => setShowCompletion(true), 500);
    }
  };

  const resetGame = () => {
    setRelicList(relics.map(r => ({ ...r, classified: false, classifiedCategory: undefined })));
    setScore(0);
    setShowCompletion(false);
  };

  const handleComplete = () => {
    const correctClassifications = relicList.filter(r => r.classifiedCategory === r.category).length;
    onComplete({
      score,
      correctClassifications,
      totalRelics: relicList.length,
    });
  };

  const correctClassifications = relicList.filter(r => r.classifiedCategory === r.category).length;
  const passPercentage = (correctClassifications / relicList.length) * 100;
  const hasPassed = passPercentage >= 70;

  const getRelicsInCategory = (categoryId: string) => {
    return relicList.filter(r => r.classified && r.classifiedCategory === categoryId);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      {/* Narrative */}
      {showNarrative && (
        <Card className="border-4 border-[#8B4513] bg-gradient-to-br from-[#F4A460] to-[#DEB887]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-serif text-[#2C1810]">
                📚 FASE 2 - EXPLORACIÓN: Los Guardianes del Saber
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowNarrative(false)} className="text-[#2C1810]">
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[#2C1810]">
            <div className="bg-[#F5DEB3] p-6 rounded-lg border-2 border-[#8B4513]">
              <p className="text-lg leading-relaxed font-serif italic">
                &quot;En las ruinas polvorientas de la majestuosa <strong>Babilonia</strong>, bajo capas de arena acumuladas por los siglos,
                yacen las huellas de una de las civilizaciones más antiguas del mundo. Tres guardianes invisibles protegen el conocimiento:
                el <strong>Guardián de la Política</strong>, el <strong>Guardián de la Economía</strong> y el <strong>Guardián de la Cultura</strong>.&quot;
              </p>
            </div>
            <p className="text-lg leading-relaxed">
              Tu misión es <strong>clasificar correctamente las reliquias</strong> de Mesopotamia en tres categorías: Política, Economía y Cultura.
              Cada reliquia pertenece a una de estas tres fuerzas que construyeron la civilización.
            </p>
            <div className="bg-[#D2691E] p-6 rounded-lg border-2 border-[#8B4513]">
              <p className="text-xl font-bold text-white text-center">
                🏺 <strong>DESAFÍO:</strong> Arrastra cada reliquia a la categoría correcta. Necesitas clasificar al menos el 70%
                correctamente para obtener el <strong>Sello del Saber</strong>.
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

      {/* Score Display */}
      <Card className="border-4 border-[#8B4513] bg-white">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-gradient-to-br from-[#8B4513] to-[#D2691E] p-4 rounded-lg">
              <p className="text-sm font-bold text-white">Reliquias Clasificadas</p>
              <p className="text-3xl font-extrabold text-white">
                {relicList.filter(r => r.classified).length}/{relicList.length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#D2691E] to-[#CD853F] p-4 rounded-lg">
              <p className="text-sm font-bold text-white">Puntuación</p>
              <p className="text-3xl font-extrabold text-white">{score}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Board */}
      <div className="grid gap-6">
        {/* Unclassified Relics */}
        <Card className="border-4 border-[#8B4513] bg-gradient-to-br from-white to-[#F5DEB3]">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#2C1810]">
              🏺 Reliquias por Clasificar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {relicList.filter(r => !r.classified).length === 0 ? (
                <p className="col-span-full text-center text-[#5D3A1A] py-8">¡Todas las reliquias han sido clasificadas!</p>
              ) : (
                relicList
                  .filter(r => !r.classified)
                  .map(relic => (
                    <div
                      key={relic.id}
                      draggable
                      onDragStart={() => handleDragStart(relic.id)}
                      className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] p-4 rounded-lg border-3 border-[#2C1810] cursor-move hover:shadow-xl transition-all hover:scale-105"
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-2">{relic.icon}</div>
                        <p className="text-white font-bold text-sm">{relic.name}</p>
                      </div>
                    </div>
                  ))
              )}
            </div>
            {relicList.filter(r => !r.classified).length > 0 && (
              <p className="text-sm text-[#5D3A1A] italic text-center mt-4">
                💡 Arrastra cada reliquia a su categoría correcta
              </p>
            )}
          </CardContent>
        </Card>

        {/* Category Drop Zones */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map(category => {
            const relicsInCategory = getRelicsInCategory(category.id);
            return (
              <div
                key={category.id}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(category.id)}
                className="min-h-[300px]"
              >
                <Card className={`border-4 border-[#8B4513] bg-gradient-to-br ${category.color} h-full`}>
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-white text-center">
                      {category.icon} {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {relicsInCategory.length === 0 ? (
                      <div className="bg-white/20 border-2 border-dashed border-white rounded-lg p-8 text-center">
                        <p className="text-white font-bold">Arrastra reliquias aquí</p>
                      </div>
                    ) : (
                      relicsInCategory.map(relic => {
                        const isCorrect = relic.category === category.id;
                        return (
                          <div
                            key={relic.id}
                            className={`p-3 rounded-lg border-3 ${
                              isCorrect
                                ? 'bg-green-500 border-green-700'
                                : 'bg-red-500 border-red-700'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{relic.icon}</span>
                              <p className="text-white font-bold text-sm flex-1">{relic.name}</p>
                              <span className="text-xl">{isCorrect ? '✓' : '✗'}</span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset Button */}
      <Button
        onClick={resetGame}
        className="w-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white text-lg py-6 font-bold border-3 border-[#2C1810] hover:shadow-xl"
      >
        🔄 Reiniciar Clasificación
      </Button>

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
                    <div className="text-6xl mb-4">📚</div>
                    <p className="text-2xl font-bold text-[#2C1810]">
                      Has obtenido el Sello del Saber
                    </p>
                    <p className="text-lg text-[#5D3A1A]">
                      Has clasificado correctamente las reliquias y reconstruido el legado de Mesopotamia.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-4">🔄</div>
                    <p className="text-2xl font-bold text-[#2C1810]">
                      Necesitas al menos 70% de precisión
                    </p>
                    <p className="text-lg text-[#5D3A1A]">
                      Clasificaste correctamente {correctClassifications} de {relicList.length} reliquias ({passPercentage.toFixed(0)}%).
                    </p>
                  </>
                )}

                <div className="bg-white p-6 rounded-lg border-2 border-[#8B4513]">
                  <p className="text-sm font-bold text-[#5D3A1A]">Puntuación Final</p>
                  <p className="text-4xl font-extrabold text-[#D2691E]">{score} pts</p>
                  <p className="text-lg font-bold text-[#8B4513] mt-2">{passPercentage.toFixed(0)}% de precisión</p>
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
                  {hasPassed ? '📚 Continuar a la Siguiente Fase' : '⚠️ Necesitas 70% para continuar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
