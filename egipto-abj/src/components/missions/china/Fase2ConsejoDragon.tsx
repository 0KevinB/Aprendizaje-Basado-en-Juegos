'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Fase2Props {
  onComplete: (score: number) => void;
  onProgressUpdate?: (progress: number, data?: Record<string, unknown>) => void;
  savedProgress?: Record<string, unknown> | null;
}

const roleDescriptions = [
  { role: '🧭 Explorador', description: 'Lee y explora el texto en busca de información relevante' },
  { role: '🧙 Sabio', description: 'Analiza el significado profundo de las palabras clave' },
  { role: '✍️ Escriba', description: 'Registra las palabras identificadas y coordina el tablero' },
  { role: '🎤 Vocero', description: 'Comunica las decisiones del equipo y presenta resultados' },
];

const storyText = `En las antiguas tierras del Imperio del Medio, el DRAGÓN era el símbolo sagrado de poder y sabiduría.
Los emperadores gobernaban bajo el MANDATO del Cielo, una autoridad divina que les otorgaba el derecho de reinar.

La civilización china floreció a orillas del RÍO AMARILLO, donde surgieron las primeras dinastías. La dinastía QIN
unificó por primera vez los reinos bajo un solo emperador, construyendo la majestuosa GRAN MURALLA para proteger
el imperio de las invasiones del norte.

Los chinos inventaron el PAPEL, revolucionando la forma de preservar el conocimiento. La PÓLVORA transformó la guerra,
mientras que la BRÚJULA permitió a los navegantes explorar nuevos horizontes. La IMPRENTA facilitó la difusión de
libros y conocimiento por todo el imperio.

El filósofo CONFUCIO enseñó los valores de la armonía, el respeto y la virtud. Su filosofía, el CONFUCIANISMO,
moldeó la sociedad china durante milenios. El concepto del YIN YANG representaba el equilibrio entre opuestos
complementarios: luz y oscuridad, masculino y femenino.

La SEDA era tan valiosa que se creó una red comercial conocida como la RUTA DE LA SEDA, conectando China con
Occidente. Los mercaderes transportaban PORCELANA fina, TÉ aromático y otros tesoros chinos.

La DINASTÍA TANG fue considerada la edad de oro de China, donde las artes, la poesía y la cultura florecieron.
Los emperadores construyeron magníficos TEMPLOS y palacios, incluida la Ciudad Prohibida.

El TAOÍSMO, otra filosofía importante, enseñaba vivir en armonía con el TAO, el camino natural del universo.
La medicina tradicional china, incluyendo la ACUPUNTURA, buscaba el equilibrio de la energía vital.`;

const keyWords = [
  'DRAGÓN', 'MANDATO', 'RÍO', 'AMARILLO', 'QIN', 'GRAN', 'MURALLA',
  'PAPEL', 'PÓLVORA', 'BRÚJULA', 'IMPRENTA', 'CONFUCIO', 'CONFUCIANISMO',
  'YIN', 'YANG', 'SEDA', 'RUTA', 'PORCELANA', 'TÉ', 'DINASTÍA',
  'TANG', 'TEMPLOS', 'TAOÍSMO', 'TAO', 'ACUPUNTURA'
];

interface WordPlacement {
  word: string;
  row: number;
  col: number;
  direction: 'horizontal' | 'vertical';
}

export function Fase2ConsejoDragon({ onComplete, onProgressUpdate, savedProgress }: Fase2Props) {
  const [currentPhase, setCurrentPhase] = useState<'narrative' | 'reading' | 'identifying' | 'scrabble' | 'completion'>('narrative');
  const [identifiedWords, setIdentifiedWords] = useState<string[]>([]);
  const [placedWords, setPlacedWords] = useState<WordPlacement[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const BOARD_SIZE = 15;

  useEffect(() => {
    if (savedProgress) {
      setCurrentPhase((savedProgress.currentPhase as typeof currentPhase) || 'narrative');
      setIdentifiedWords((savedProgress.identifiedWords as string[]) || []);
      setPlacedWords((savedProgress.placedWords as WordPlacement[]) || []);
      setScore((savedProgress.score as number) || 0);
    }
  }, [savedProgress]);

  useEffect(() => {
    if (onProgressUpdate && identifiedWords.length > 0) {
      const progress = Math.min((identifiedWords.length / keyWords.length) * 50 + (placedWords.length / identifiedWords.length) * 50, 99);
      onProgressUpdate(progress, {
        currentPhase,
        identifiedWords,
        placedWords,
        score,
      });
    }
  }, [identifiedWords, placedWords, currentPhase, score, onProgressUpdate]);

  const highlightWords = (text: string) => {
    let highlightedText = text;
    keyWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      if (identifiedWords.includes(word.toUpperCase())) {
        highlightedText = highlightedText.replace(
          regex,
          `<span class="bg-green-300 font-bold text-green-900 px-1 rounded">${word}</span>`
        );
      }
    });
    return highlightedText;
  };

  const toggleWordIdentification = (word: string) => {
    const upperWord = word.toUpperCase();
    setIdentifiedWords(prev =>
      prev.includes(upperWord)
        ? prev.filter(w => w !== upperWord)
        : [...prev, upperWord]
    );
  };

  const startScrabblePhase = () => {
    // Calculate score for identified words
    const correctlyIdentified = identifiedWords.filter(w => keyWords.includes(w)).length;
    const identificationScore = Math.floor((correctlyIdentified / keyWords.length) * 50);
    setScore(identificationScore);
    setCurrentPhase('scrabble');
  };

  const canPlaceWord = (word: string, row: number, col: number, direction: 'horizontal' | 'vertical'): boolean => {
    // Check if word fits on board
    if (direction === 'horizontal' && col + word.length > BOARD_SIZE) return false;
    if (direction === 'vertical' && row + word.length > BOARD_SIZE) return false;

    // Check for conflicts with existing words
    for (let i = 0; i < word.length; i++) {
      const checkRow = direction === 'vertical' ? row + i : row;
      const checkCol = direction === 'horizontal' ? col + i : col;

      const existingLetter = placedWords.find(pw => {
        if (pw.direction === 'horizontal') {
          return pw.row === checkRow && checkCol >= pw.col && checkCol < pw.col + pw.word.length;
        } else {
          return pw.col === checkCol && checkRow >= pw.row && checkRow < pw.row + pw.word.length;
        }
      });

      if (existingLetter) {
        const letterIndex = direction === 'horizontal'
          ? checkCol - (existingLetter.direction === 'horizontal' ? existingLetter.col : 0)
          : checkRow - (existingLetter.direction === 'vertical' ? existingLetter.row : 0);

        if (existingLetter.direction === 'horizontal' && direction === 'horizontal') return false;
        if (existingLetter.direction === 'vertical' && direction === 'vertical') return false;

        // Allow crossing if letters match
        const existingChar = existingLetter.direction === 'horizontal'
          ? existingLetter.word[checkCol - existingLetter.col]
          : existingLetter.word[checkRow - existingLetter.row];

        if (existingChar !== word[i]) return false;
      }
    }

    return true;
  };

  const placeWord = (row: number, col: number, direction: 'horizontal' | 'vertical') => {
    if (!selectedWord) return;

    if (canPlaceWord(selectedWord, row, col, direction)) {
      setPlacedWords(prev => [...prev, { word: selectedWord, row, col, direction }]);
      setIdentifiedWords(prev => prev.filter(w => w !== selectedWord));
      setScore(prev => prev + 10);
      setSelectedWord(null);
    }
  };

  const handleComplete = () => {
    const finalScore = score + (placedWords.length >= 5 ? 50 : 0);
    setCurrentPhase('completion');
    setTimeout(() => {
      onComplete(finalScore);
    }, 2000);
  };

  const getLetterAt = (row: number, col: number): string => {
    for (const placement of placedWords) {
      if (placement.direction === 'horizontal' && placement.row === row) {
        if (col >= placement.col && col < placement.col + placement.word.length) {
          return placement.word[col - placement.col];
        }
      }
      if (placement.direction === 'vertical' && placement.col === col) {
        if (row >= placement.row && row < placement.row + placement.word.length) {
          return placement.word[row - placement.row];
        }
      }
    }
    return '';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* Narrative */}
      {currentPhase === 'narrative' && (
        <Card className="border-4 border-[#DC143C] bg-gradient-to-br from-[#FFF9E6] to-[#FFE4B5]">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-[#8B0000]">
              🏯 FASE 2 - EXPLORACIÓN: El Consejo del Dragón
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#5C0000]">
            <p className="text-lg leading-relaxed">
              En las profundidades del palacio imperial, existe una cámara secreta conocida como
              <strong> El Consejo del Dragón</strong>. Aquí, los sabios más respetados del imperio
              se reunían para discutir los asuntos más importantes de China.
            </p>
            <p className="text-lg leading-relaxed">
              En las paredes de esta cámara sagrada, están escritas las historias y conocimientos
              más valiosos de la civilización china. Pero no cualquiera puede comprender estos textos:
              solo aquellos que pueden <strong>identificar las palabras clave</strong> y comprender
              su significado pueden descifrar los secretos del imperio.
            </p>
            <div className="bg-[#DC143C] p-6 rounded-lg border-2 border-[#FFD700]">
              <p className="text-xl font-bold text-white text-center mb-4">
                🐉 <strong>DESAFÍO DEL EQUIPO:</strong>
              </p>
              <p className="text-lg text-white leading-relaxed">
                <strong>PARTE 1:</strong> Lean el texto sagrado y trabajen en equipo para identificar
                todas las palabras clave relacionadas con China (están en MAYÚSCULAS).
              </p>
              <p className="text-lg text-white leading-relaxed mt-3">
                <strong>PARTE 2:</strong> Una vez identificadas, deberán colocar estas palabras en un
                tablero estilo Scrabble, formando cruces y conexiones entre ellas.
              </p>
              <p className="text-lg text-white leading-relaxed mt-3">
                ✅ Solo obtendrán el <strong>Sello del Consejo del Dragón</strong> si completan
                ambas partes de la actividad con éxito.
              </p>
            </div>
            <Button
              onClick={() => setCurrentPhase('reading')}
              className="w-full bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white text-xl py-8 font-bold border-3 border-[#FFD700] hover:shadow-xl transition-all"
            >
              🏯 Comenzar Misión
            </Button>
          </CardContent>
        </Card>
      )}

      {(currentPhase === 'reading' || currentPhase === 'identifying') && (
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

          {/* Reading Text */}
          <Card className="border-4 border-[#DC143C] bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-[#8B0000]">
                📜 Texto Sagrado del Imperio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="text-base leading-relaxed text-[#5C0000] space-y-4 whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: highlightWords(storyText) }}
              />
            </CardContent>
          </Card>

          {/* Word Identification */}
          {currentPhase === 'reading' && (
            <Card className="border-4 border-[#FFD700] bg-gradient-to-r from-[#FFF9E6] to-[#FFE4B5]">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-[#8B0000]">
                  🔍 Instrucciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-[#5C0000] font-semibold">
                  1️⃣ Lean el texto completo en equipo<br/>
                  2️⃣ Identifiquen todas las palabras en MAYÚSCULAS que son conceptos clave de China<br/>
                  3️⃣ El Escriba debe registrar cada palabra identificada<br/>
                  4️⃣ Cuando estén listos, presionen el botón para pasar a la siguiente fase
                </p>
                <Button
                  onClick={() => setCurrentPhase('identifying')}
                  className="w-full bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white text-xl py-6 font-bold border-3 border-[#FFD700] hover:shadow-xl transition-all"
                >
                  ✅ Pasar a Identificar Palabras
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Word Selection */}
          {currentPhase === 'identifying' && (
            <>
              <Card className="border-4 border-[#FFD700] bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-[#8B0000] text-center">
                    ✅ Selecciona las Palabras Clave Identificadas
                  </CardTitle>
                  <p className="text-center text-[#5C0000] font-semibold">
                    Has identificado: {identifiedWords.length} / {keyWords.length} palabras
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {keyWords.map(word => (
                      <button
                        key={word}
                        onClick={() => toggleWordIdentification(word)}
                        className={`
                          p-4 rounded-lg border-3 font-bold text-sm transition-all transform hover:scale-105
                          ${identifiedWords.includes(word)
                            ? 'bg-gradient-to-br from-green-500 to-green-600 text-white border-green-700'
                            : 'bg-white text-[#8B0000] border-[#8B0000] hover:bg-[#FFF9E6]'
                          }
                        `}
                      >
                        {identifiedWords.includes(word) && '✓ '}
                        {word}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Button
                      onClick={startScrabblePhase}
                      disabled={identifiedWords.length < 10}
                      className="w-full bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white text-xl py-8 font-bold border-3 border-[#FFD700] hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {identifiedWords.length < 10
                        ? `Necesitas identificar al menos 10 palabras (${identifiedWords.length}/10)`
                        : '🎮 Pasar al Tablero Scrabble'
                      }
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </>
      )}

      {/* Scrabble Phase */}
      {currentPhase === 'scrabble' && (
        <>
          <Card className="border-4 border-[#FFD700] bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-[#8B0000] text-center">
                🎲 Tablero Scrabble - Forma Palabras Cruzadas
              </CardTitle>
              <p className="text-center text-[#5C0000]">
                Coloca al menos 5 palabras en el tablero formando cruces
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gradient-to-br from-[#DC143C] to-[#8B0000] p-3 rounded-lg border-2 border-[#FFD700]">
                  <p className="text-xs font-bold text-white">Palabras Colocadas</p>
                  <p className="text-2xl font-extrabold text-white">{placedWords.length}</p>
                </div>
                <div className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] p-3 rounded-lg border-2 border-[#8B0000]">
                  <p className="text-xs font-bold text-[#8B0000]">Puntuación</p>
                  <p className="text-2xl font-extrabold text-[#8B0000]">{score}</p>
                </div>
                <div className="bg-gradient-to-br from-[#8B0000] to-[#5C0000] p-3 rounded-lg border-2 border-[#FFD700]">
                  <p className="text-xs font-bold text-white">Disponibles</p>
                  <p className="text-2xl font-extrabold text-white">{identifiedWords.length}</p>
                </div>
              </div>

              {/* Available Words */}
              <div className="bg-[#FFF9E6] p-4 rounded-lg border-2 border-[#DC143C]">
                <h4 className="font-bold text-[#8B0000] mb-3">📝 Palabras Disponibles (haz clic para seleccionar):</h4>
                <div className="flex flex-wrap gap-2">
                  {identifiedWords.map(word => (
                    <button
                      key={word}
                      onClick={() => setSelectedWord(word)}
                      className={`
                        px-4 py-2 rounded-lg font-bold border-2 transition-all
                        ${selectedWord === word
                          ? 'bg-[#DC143C] text-white border-[#FFD700] scale-110'
                          : 'bg-white text-[#8B0000] border-[#8B0000] hover:bg-[#FFE4B5]'
                        }
                      `}
                    >
                      {word}
                    </button>
                  ))}
                </div>
                {selectedWord && (
                  <p className="mt-3 text-sm text-[#8B0000] font-semibold">
                    ✨ Palabra seleccionada: <strong>{selectedWord}</strong>.
                    Haz clic en el tablero para colocarla (H = horizontal, V = vertical)
                  </p>
                )}
              </div>

              {/* Scrabble Board */}
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                  {Array.from({ length: BOARD_SIZE }).map((_, row) => (
                    <div key={row} className="flex">
                      {Array.from({ length: BOARD_SIZE }).map((_, col) => {
                        const letter = getLetterAt(row, col);
                        return (
                          <div
                            key={`${row}-${col}`}
                            className="relative group"
                          >
                            <div
                              className={`
                                w-8 h-8 border border-gray-400 flex items-center justify-center text-xs font-bold
                                ${letter ? 'bg-[#DC143C] text-white' : 'bg-white hover:bg-[#FFE4B5]'}
                                transition-all
                              `}
                            >
                              {letter || ''}
                            </div>
                            {selectedWord && !letter && (
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex gap-0.5 items-center justify-center">
                                <button
                                  onClick={() => placeWord(row, col, 'horizontal')}
                                  className="bg-blue-500 text-white text-[8px] px-1 rounded hover:bg-blue-600"
                                  title="Horizontal"
                                >
                                  H
                                </button>
                                <button
                                  onClick={() => placeWord(row, col, 'vertical')}
                                  className="bg-green-500 text-white text-[8px] px-1 rounded hover:bg-green-600"
                                  title="Vertical"
                                >
                                  V
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm text-[#5C0000] bg-yellow-50 p-3 rounded-lg border-2 border-yellow-600">
                <p className="font-bold">💡 Instrucciones:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Selecciona una palabra de la lista</li>
                  <li>Haz clic en una casilla del tablero</li>
                  <li>Elige H (horizontal) o V (vertical)</li>
                  <li>Las palabras deben cruzarse compartiendo letras comunes</li>
                  <li>Coloca al menos 5 palabras para completar la misión</li>
                </ul>
              </div>

              <Button
                onClick={handleComplete}
                disabled={placedWords.length < 5}
                className="w-full bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white text-xl py-8 font-bold border-3 border-[#FFD700] hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {placedWords.length < 5
                  ? `Coloca al menos 5 palabras (${placedWords.length}/5)`
                  : '✅ Completar Misión'
                }
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      {/* Completion */}
      {currentPhase === 'completion' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="border-4 border-[#FFD700] bg-gradient-to-br from-[#FFF9E6] to-[#FFE4B5] max-w-2xl w-full">
            <CardHeader>
              <CardTitle className="text-3xl font-serif text-[#8B0000] text-center">
                🎉 ¡Felicitaciones!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4">🏯</div>
                <p className="text-2xl font-bold text-[#8B0000]">
                  Has obtenido el Sello del Consejo del Dragón
                </p>
                <p className="text-lg text-[#5C0000]">
                  Has completado exitosamente la lectura guiada, identificado las palabras clave
                  y creado un tablero Scrabble con las palabras de China.
                </p>

                <div className="bg-white p-6 rounded-lg border-2 border-[#8B0000] space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-bold text-[#5C0000]">Palabras Identificadas</p>
                      <p className="text-3xl font-extrabold text-green-600">{keyWords.length}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#5C0000]">Palabras Colocadas</p>
                      <p className="text-3xl font-extrabold text-blue-600">{placedWords.length}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#5C0000]">Puntuación Final</p>
                      <p className="text-3xl font-extrabold text-[#DC143C]">{score}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => onComplete(score)}
                className="w-full bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white text-lg py-6 font-bold border-3 border-[#FFD700] hover:shadow-xl transition-all"
              >
                🏯 Continuar a la Siguiente Fase
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
