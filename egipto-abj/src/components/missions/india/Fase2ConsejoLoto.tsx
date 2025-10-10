'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Fase2Props {
  onComplete: (score: number) => void;
  onProgressUpdate?: (progress: number, data?: Record<string, unknown>) => void;
  savedProgress?: Record<string, unknown> | null;
}

interface Position {
  row: number;
  col: number;
}

interface WordPlacement {
  word: string;
  start: Position;
  end: Position;
  direction: 'horizontal' | 'vertical' | 'diagonal';
}

const WORDS_TO_FIND = [
  'HARAPPA',
  'MOHENJODARO',
  'GANGES',
  'INDO',
  'HINDUISMO',
  'BUDISMO',
  'BRAHMA',
  'VISHNU',
  'SHIVA',
  'BUDA',
  'CASTAS',
  'DECIMAL',
  'CERO',
  'AYURVEDA',
  'YOGA',
  'MANDALAS',
  'SANSCRITO',
  'CHATURANGA',
];

const roleDescriptions = [
  { role: '🔍 Explorador', description: 'Busca palabras en el tablero' },
  { role: '🧠 Sabio', description: 'Conoce el significado de las palabras' },
  { role: '✍️ Escriba', description: 'Marca y registra los hallazgos' },
  { role: '📢 Vocero', description: 'Coordina al equipo y presenta resultados' },
];

// Generate word search grid
function generateWordSearchGrid(): { grid: string[][]; placements: WordPlacement[] } {
  const GRID_SIZE = 15;
  const grid: string[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
  const placements: WordPlacement[] = [];

  // Helper function to check if word can be placed
  const canPlaceWord = (word: string, row: number, col: number, dRow: number, dCol: number): boolean => {
    for (let i = 0; i < word.length; i++) {
      const newRow = row + i * dRow;
      const newCol = col + i * dCol;
      if (newRow < 0 || newRow >= GRID_SIZE || newCol < 0 || newCol >= GRID_SIZE) {
        return false;
      }
      if (grid[newRow][newCol] !== '' && grid[newRow][newCol] !== word[i]) {
        return false;
      }
    }
    return true;
  };

  // Helper function to place word
  const placeWord = (word: string, row: number, col: number, dRow: number, dCol: number): void => {
    const start: Position = { row, col };
    const end: Position = { row: row + (word.length - 1) * dRow, col: col + (word.length - 1) * dCol };

    for (let i = 0; i < word.length; i++) {
      grid[row + i * dRow][col + i * dCol] = word[i];
    }

    let direction: 'horizontal' | 'vertical' | 'diagonal';
    if (dRow === 0) direction = 'horizontal';
    else if (dCol === 0) direction = 'vertical';
    else direction = 'diagonal';

    placements.push({ word, start, end, direction });
  };

  // Predefined placements to ensure all words fit
  const predefinedPlacements: Array<[string, number, number, number, number]> = [
    ['MOHENJODARO', 0, 0, 0, 1],     // Horizontal
    ['HINDUISMO', 1, 0, 0, 1],       // Horizontal
    ['SANSCRITO', 2, 0, 0, 1],       // Horizontal
    ['CHATURANGA', 3, 0, 0, 1],      // Horizontal
    ['HARAPPA', 4, 0, 0, 1],         // Horizontal
    ['AYURVEDA', 5, 0, 0, 1],        // Horizontal
    ['MANDALAS', 6, 0, 0, 1],        // Horizontal
    ['GANGES', 0, 0, 1, 0],          // Vertical
    ['BUDISMO', 0, 2, 1, 0],         // Vertical
    ['DECIMAL', 0, 4, 1, 0],         // Vertical
    ['BRAHMA', 0, 6, 1, 0],          // Vertical
    ['VISHNU', 0, 8, 1, 0],          // Vertical
    ['CASTAS', 0, 10, 1, 0],         // Vertical
    ['SHIVA', 7, 0, 1, 1],           // Diagonal
    ['YOGA', 8, 3, 1, 1],            // Diagonal
    ['BUDA', 9, 6, 1, 1],            // Diagonal
    ['CERO', 10, 9, 1, 1],           // Diagonal
    ['INDO', 11, 11, 1, 1],          // Diagonal
  ];

  // Place all words
  for (const [word, row, col, dRow, dCol] of predefinedPlacements) {
    if (canPlaceWord(word, row, col, dRow, dCol)) {
      placeWord(word, row, col, dRow, dCol);
    }
  }

  // Fill empty cells with random letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] === '') {
        grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return { grid, placements };
}

export function Fase2ConsejoLoto({ onComplete, onProgressUpdate, savedProgress }: Fase2Props) {
  const [showNarrative, setShowNarrative] = useState(true);
  const [grid] = useState(() => generateWordSearchGrid().grid);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [currentSelection, setCurrentSelection] = useState<Position[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Load saved progress
  useEffect(() => {
    if (savedProgress) {
      if (savedProgress.foundWords) {
        setFoundWords(new Set(savedProgress.foundWords as string[]));
      }
      if (savedProgress.selectedCells) {
        setSelectedCells(new Set(savedProgress.selectedCells as string[]));
      }
      if (savedProgress.elapsedTime) {
        setElapsedTime(savedProgress.elapsedTime as number);
      }
      setShowNarrative(false);
    }
  }, [savedProgress]);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  // Auto-save progress
  useEffect(() => {
    if (onProgressUpdate && foundWords.size > 0 && foundWords.size < WORDS_TO_FIND.length) {
      const progressPercentage = (foundWords.size / WORDS_TO_FIND.length) * 100;
      onProgressUpdate(progressPercentage, {
        foundWords: Array.from(foundWords),
        selectedCells: Array.from(selectedCells),
        elapsedTime,
      });
    }
  }, [foundWords, selectedCells, elapsedTime, onProgressUpdate]);

  const cellKey = (row: number, col: number) => `${row}-${col}`;

  const checkSelection = useCallback(() => {
    if (currentSelection.length < 2) return;

    const selectedText = currentSelection
      .map(pos => grid[pos.row][pos.col])
      .join('');

    const reversedText = selectedText.split('').reverse().join('');

    const matchedWord = WORDS_TO_FIND.find(
      word => word === selectedText || word === reversedText
    );

    if (matchedWord && !foundWords.has(matchedWord)) {
      // Word found!
      const newFoundWords = new Set(foundWords);
      newFoundWords.add(matchedWord);
      setFoundWords(newFoundWords);

      const newSelectedCells = new Set(selectedCells);
      currentSelection.forEach(pos => {
        newSelectedCells.add(cellKey(pos.row, pos.col));
      });
      setSelectedCells(newSelectedCells);

      setNotification({
        type: 'success',
        message: `¡Excelente! Encontraste: ${matchedWord}`
      });
      setTimeout(() => setNotification(null), 3000);
    }

    setCurrentSelection([]);
  }, [currentSelection, grid, foundWords, selectedCells]);

  const handleMouseDown = (row: number, col: number) => {
    setIsSelecting(true);
    setCurrentSelection([{ row, col }]);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isSelecting) return;

    const last = currentSelection[currentSelection.length - 1];
    if (!last) return;

    // Check if movement is valid (straight line: horizontal, vertical, or diagonal)
    const rowDiff = Math.abs(row - currentSelection[0].row);
    const colDiff = Math.abs(col - currentSelection[0].col);

    // Must be on same row, column, or diagonal
    const isValidLine = rowDiff === 0 || colDiff === 0 || rowDiff === colDiff;

    if (isValidLine) {
      // Build path from start to current position
      const start = currentSelection[0];
      const path: Position[] = [];

      const rowStep = row === start.row ? 0 : (row > start.row ? 1 : -1);
      const colStep = col === start.col ? 0 : (col > start.col ? 1 : -1);

      let currentRow = start.row;
      let currentCol = start.col;

      while (currentRow !== row || currentCol !== col) {
        path.push({ row: currentRow, col: currentCol });
        if (currentRow !== row) currentRow += rowStep;
        if (currentCol !== col) currentCol += colStep;
      }
      path.push({ row, col });

      setCurrentSelection(path);
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    checkSelection();
  };

  const isCellInCurrentSelection = (row: number, col: number) => {
    return currentSelection.some(pos => pos.row === row && pos.col === col);
  };

  const handleComplete = () => {
    const timeBonus = Math.max(0, 100 - Math.floor(elapsedTime / 10));
    const score = 100;
    onComplete(score);
  };

  const progress = (foundWords.size / WORDS_TO_FIND.length) * 100;
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
            <span className="text-4xl">{notification.type === 'success' ? '✓' : '✗'}</span>
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

      {/* Progress */}
      <Card className="border-4 border-[#F7931E] bg-gradient-to-br from-[#FFF5E6] to-[#FFE4B5] shadow-xl">
        <CardContent className="pt-6 pb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🪷</span>
              <span className="font-extrabold text-xl text-[#8B4000]">Progreso del Loto</span>
            </div>
            <div className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] px-5 py-2 rounded-full border-3 border-[#8B4000] shadow-md">
              <span className="font-extrabold text-2xl text-white">{Math.round(progress)}%</span>
            </div>
          </div>
          <div className="relative">
            <div className="h-8 bg-white rounded-full border-4 border-[#8B4000] overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[#FF6B35] via-[#F7931E] to-[#FFD700] transition-all duration-500 ease-out flex items-center justify-end pr-3 shadow-lg"
                style={{ width: `${progress}%` }}
              >
                {progress > 10 && (
                  <span className="text-sm font-extrabold text-white drop-shadow-sm">
                    {foundWords.size} / {WORDS_TO_FIND.length}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-2 text-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⏱️</span>
                <span className="font-bold text-lg text-[#8B4000]">{formatTime(elapsedTime)}</span>
              </div>
              <div className="text-lg font-bold text-[#8B4000]">
                Palabras: {foundWords.size}/{WORDS_TO_FIND.length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Narrative */}
      {showNarrative && (
        <Card className="border-4 border-[#F7931E] bg-gradient-to-br from-[#FFF5E6] to-[#FFE4B5]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-serif text-[#8B4000]">
                🪷 FASE 2 - EXPLORACIÓN: El Consejo del Loto
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowNarrative(false)} className="text-[#8B4000]">
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[#5D4037]">
            <p className="text-lg leading-relaxed">
              En las orillas sagradas del <strong>Ganges</strong>, los sabios de la Antigua India han ocultado
              palabras clave de su civilización en un <strong>mandala de letras</strong>. Solo aquellos que
              puedan descifrar este enigma serán dignos de formar parte del <strong>Consejo del Loto</strong>.
            </p>
            <div className="bg-[#FF6B35] p-6 rounded-lg border-2 border-[#8B4000]">
              <p className="text-xl font-bold text-white text-center">
                🔍 <strong>DESAFÍO:</strong> Encuentra las {WORDS_TO_FIND.length} palabras sagradas escondidas
                en el tablero. Están ocultas horizontal, vertical y diagonalmente. ¡Demuestra tu sabiduría y
                obtén el <strong>Sello del Consejo del Loto</strong>!
              </p>
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
                className="bg-gradient-to-r from-[#FFF5E6] to-[#FFE4B5] p-4 rounded-lg border-2 border-[#8B4000]"
              >
                <h3 className="font-bold text-lg text-[#8B4000]">{roleInfo.role}</h3>
                <p className="text-sm text-[#5D4037]">{roleInfo.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Word Search Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Grid */}
        <Card className="lg:col-span-2 border-4 border-[#F7931E] bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#8B4000]">
              🔍 Tablero de Búsqueda - Mandala de Palabras
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div
                className="inline-grid gap-1 select-none"
                style={{ gridTemplateColumns: `repeat(15, minmax(0, 1fr))` }}
                onMouseLeave={() => {
                  if (isSelecting) {
                    setIsSelecting(false);
                    checkSelection();
                  }
                }}
              >
                {grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => {
                    const key = cellKey(rowIndex, colIndex);
                    const isFound = selectedCells.has(key);
                    const isCurrentlySelected = isCellInCurrentSelection(rowIndex, colIndex);

                    return (
                      <div
                        key={key}
                        className={`
                          w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center
                          font-bold text-sm sm:text-base cursor-pointer
                          border-2 transition-all duration-150
                          ${isFound
                            ? 'bg-gradient-to-br from-[#FF6B35] to-[#F7931E] text-white border-[#8B4000] shadow-md'
                            : isCurrentlySelected
                            ? 'bg-[#FFD700] text-[#8B4000] border-[#8B4000] scale-110'
                            : 'bg-white text-[#8B4000] border-[#8B4000] hover:bg-[#FFF5E6]'
                          }
                        `}
                        onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                        onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                        onMouseUp={handleMouseUp}
                      >
                        {cell}
                      </div>
                    );
                  })
                )}
              </div>
              <p className="mt-4 text-sm text-[#5D4037] text-center font-medium">
                Haz clic y arrastra para seleccionar palabras (horizontal, vertical o diagonal)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Words List */}
        <Card className="border-4 border-[#F7931E] bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#8B4000]">
              📜 Palabras por Encontrar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {WORDS_TO_FIND.map((word) => {
                const found = foundWords.has(word);
                return (
                  <div
                    key={word}
                    className={`p-3 rounded-lg border-2 font-bold text-sm transition-all ${
                      found
                        ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-600 text-green-900 line-through'
                        : 'bg-[#FFF5E6] border-[#8B4000] text-[#8B4000]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{word}</span>
                      {found && <span className="text-2xl">✓</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complete Mission */}
      {foundWords.size === WORDS_TO_FIND.length && (
        <Card className="border-4 border-green-600 bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="text-6xl">🪷</div>
            <h2 className="text-3xl font-serif font-bold text-green-900">
              ¡Has obtenido el Sello del Consejo del Loto!
            </h2>
            <p className="text-xl text-green-800">
              Tiempo completado: {formatTime(elapsedTime)}
            </p>
            <p className="text-lg text-green-700">
              Has encontrado todas las palabras sagradas de la Antigua India.
              ¡Tu sabiduría es digna del Consejo del Loto!
            </p>
            <Button
              onClick={handleComplete}
              className="bg-green-600 hover:bg-green-700 text-white text-xl py-7 px-10 font-bold"
            >
              Completar Misión
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
