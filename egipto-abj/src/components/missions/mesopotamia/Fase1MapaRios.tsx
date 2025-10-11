'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Fase1Props {
  onComplete: (data: { score: number; correctAnswers: number; totalQuestions: number }) => void;
  onProgressUpdate?: (progress: number, data?: Record<string, unknown>) => void;
  savedProgress?: Record<string, unknown> | null;
}

interface MapPiece {
  id: string;
  name: string;
  type: 'river' | 'city' | 'region';
  correctZone: string;
  placed: boolean;
  placedZone?: string;
}

const mapPieces: MapPiece[] = [
  { id: 'tigris', name: '🌊 Río Tigris', type: 'river', correctZone: 'river-east', placed: false },
  { id: 'eufrates', name: '🌊 Río Éufrates', type: 'river', correctZone: 'river-west', placed: false },
  { id: 'uruk', name: '🏛️ Uruk', type: 'city', correctZone: 'city-south', placed: false },
  { id: 'ur', name: '🏛️ Ur', type: 'city', correctZone: 'city-southeast', placed: false },
  { id: 'lagash', name: '🏛️ Lagash', type: 'city', correctZone: 'city-center', placed: false },
  { id: 'babilonia', name: '👑 Babilonia', type: 'city', correctZone: 'city-central', placed: false },
];

const roleDescriptions = [
  { role: '📜 Lector', description: 'Lee la narrativa y las instrucciones del mapa' },
  { role: '🗺️ Cartógrafo', description: 'Ubica ríos y ciudades en el mapa' },
  { role: '✍️ Escriba', description: 'Documenta las ubicaciones correctas' },
  { role: '🎤 Expositor', description: 'Explica la geografía de Mesopotamia' },
];

export function Fase1MapaRios({ onComplete, onProgressUpdate, savedProgress }: Fase1Props) {
  const [pieces, setPieces] = useState<MapPiece[]>(mapPieces);
  const [draggedPiece, setDraggedPiece] = useState<string | null>(null);
  const [showNarrative, setShowNarrative] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (savedProgress && savedProgress.pieces) {
      setPieces(savedProgress.pieces as MapPiece[]);
      setScore((savedProgress.score as number) || 0);
      setShowNarrative(false);
    }
  }, [savedProgress]);

  useEffect(() => {
    const placedCount = pieces.filter(p => p.placed).length;
    const progress = Math.min((placedCount / pieces.length) * 100, 99);

    if (onProgressUpdate && progress > 0 && progress < 100) {
      onProgressUpdate(progress, { pieces, score });
    }
  }, [pieces, score, onProgressUpdate]);

  const handleDragStart = (pieceId: string) => {
    setDraggedPiece(pieceId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (zone: string) => {
    if (!draggedPiece) return;

    const piece = pieces.find(p => p.id === draggedPiece);
    if (!piece || piece.placed) return;

    const isCorrect = piece.correctZone === zone;
    const newScore = isCorrect ? score + 15 : score;

    const updatedPieces = pieces.map(p =>
      p.id === draggedPiece
        ? { ...p, placed: true, placedZone: zone }
        : p
    );

    setPieces(updatedPieces);
    setScore(newScore);
    setDraggedPiece(null);

    // Check if all pieces are placed
    if (updatedPieces.every(p => p.placed)) {
      setTimeout(() => setShowCompletion(true), 500);
    }
  };

  const resetGame = () => {
    setPieces(mapPieces.map(p => ({ ...p, placed: false, placedZone: undefined })));
    setScore(0);
    setShowCompletion(false);
  };

  const handleComplete = () => {
    const correctPlacements = pieces.filter(p => p.placedZone === p.correctZone).length;
    onComplete({
      score,
      correctAnswers: correctPlacements,
      totalQuestions: pieces.length,
    });
  };

  const correctPlacements = pieces.filter(p => p.placedZone === p.correctZone).length;
  const passPercentage = (correctPlacements / pieces.length) * 100;
  const hasPassed = passPercentage >= 70;

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      {/* Narrative */}
      {showNarrative && (
        <Card className="border-4 border-[#8B4513] bg-gradient-to-br from-[#F4A460] to-[#DEB887]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-serif text-[#2C1810]">
                𒀭 FASE 1 - AVENTURA: Mapa de los Ríos Eternos
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowNarrative(false)} className="text-[#2C1810]">
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[#2C1810]">
            <div className="bg-[#F5DEB3] p-6 rounded-lg border-2 border-[#8B4513]">
              <p className="text-lg leading-relaxed font-serif italic">
                "En el albor de los tiempos, cuando los dioses aún caminaban entre los hombres, una vasta tierra surgió entre
                dos ríos sagrados: el <strong>Tigris</strong> y el <strong>Éufrates</strong>. Aquella región fértil, donde el limo
                danzaba con el agua y la vida brotaba sin cesar, fue llamada <strong>'Mesopotamia'</strong>, la tierra entre ríos."
              </p>
            </div>
            <p className="text-lg leading-relaxed">
              Tu misión es reconstruir el mapa sagrado. <strong>Arrastra cada elemento desde la izquierda</strong> hacia las zonas
              correctas del mapa. Debes ubicar los ríos Tigris y Éufrates en sus cauces, y colocar las ciudades antiguas
              (Uruk, Ur, Lagash y Babilonia) en sus posiciones geográficas correctas. <strong>¡Piensa bien antes de soltar!</strong>
            </p>
            <div className="bg-[#8B4513]/20 p-4 rounded-lg border-2 border-[#8B4513]">
              <p className="text-sm font-bold text-[#2C1810] mb-2">💡 Pistas:</p>
              <ul className="text-sm text-[#3D2817] space-y-1 list-disc list-inside">
                <li>Los ríos fluyen de norte a sur hacia el Golfo Pérsico</li>
                <li>El Éufrates está al oeste (izquierda), el Tigris al este (derecha)</li>
                <li>Las ciudades estaban entre los ríos, en la Media Luna Fértil</li>
                <li>Babilonia era la capital más importante del centro-norte</li>
              </ul>
            </div>
            <div className="bg-[#D2691E] p-6 rounded-lg border-2 border-[#8B4513]">
              <p className="text-xl font-bold text-white text-center">
                🗺️ <strong>DESAFÍO:</strong> Ubica correctamente todos los elementos geográficos. Necesitas al menos 70% de
                precisión para obtener el <strong>Sello del Territorio</strong>.
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
              <p className="text-sm font-bold text-white">Elementos Ubicados</p>
              <p className="text-3xl font-extrabold text-white">
                {pieces.filter(p => p.placed).length}/{pieces.length}
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
      <div className="grid md:grid-cols-2 gap-6">
        {/* Available Pieces */}
        <Card className="border-4 border-[#8B4513] bg-gradient-to-br from-white to-[#F5DEB3]">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#2C1810]">
              📦 Elementos para Ubicar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pieces.filter(p => !p.placed).length === 0 ? (
              <p className="text-center text-[#5D3A1A] py-8">¡Todos los elementos han sido ubicados!</p>
            ) : (
              pieces
                .filter(p => !p.placed)
                .map(piece => (
                  <div
                    key={piece.id}
                    draggable
                    onDragStart={() => handleDragStart(piece.id)}
                    className="bg-gradient-to-r from-[#D2691E] to-[#CD853F] p-4 rounded-lg border-3 border-[#8B4513] cursor-move hover:shadow-xl transition-all hover:scale-105"
                  >
                    <p className="text-white font-bold text-center">{piece.name}</p>
                  </div>
                ))
            )}
            {pieces.filter(p => !p.placed).length > 0 && (
              <p className="text-sm text-[#5D3A1A] italic text-center mt-4">
                💡 Arrastra cada elemento al mapa
              </p>
            )}
          </CardContent>
        </Card>

        {/* Map Drop Zones */}
        <Card className="border-4 border-[#D2691E] bg-gradient-to-br from-[#F5DEB3] to-[#DEB887]">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#2C1810]">
              🗺️ Mapa de Mesopotamia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gradient-to-br from-[#E8D4A0] via-[#DEB887] to-[#D2B48C] p-4 rounded-lg border-4 border-[#8B4513] min-h-[600px] overflow-hidden">
              {/* Background terrain effect */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grain" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                      <rect fill="#8B4513" x="0" y="0" width="1" height="1"/>
                    </pattern>
                  </defs>
                  <rect fill="url(#grain)" x="0" y="0" width="100%" height="100%"/>
                </svg>
              </div>

              {/* Enhanced map visualization */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 650">
                <defs>
                  {/* Gradientes para los ríos */}
                  <linearGradient id="riverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#5BA3E0" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#2E7BB4" stopOpacity="0.5"/>
                  </linearGradient>

                  {/* Patrón de agua */}
                  <pattern id="waterPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M0,5 Q2.5,3 5,5 T10,5" stroke="#4A90E2" strokeWidth="0.5" fill="none" opacity="0.3"/>
                  </pattern>

                  {/* Montañas del norte (Zagros) */}
                  <pattern id="mountains" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
                    <path d="M0,20 L10,5 L20,20 L30,5 L40,20" fill="#8B7355" opacity="0.3"/>
                  </pattern>
                </defs>

                {/* Montañas Zagros (noreste) */}
                <rect x="450" y="0" width="150" height="120" fill="url(#mountains)" opacity="0.4"/>

                {/* Montañas Tauro (noroeste) */}
                <rect x="20" y="0" width="150" height="100" fill="url(#mountains)" opacity="0.3"/>

                {/* Desierto sirio (oeste) */}
                <ellipse cx="50" cy="300" rx="60" ry="200" fill="#D4A76A" opacity="0.15"/>

                {/* Desierto arábigo (sur-oeste) */}
                <ellipse cx="150" cy="500" rx="80" ry="100" fill="#D4A76A" opacity="0.15"/>

                {/* Media Luna Fértil (zona central) */}
                <path
                  d="M 100 100 Q 300 120, 500 100 Q 520 300, 400 450 Q 300 520, 200 450 Q 100 350, 100 100"
                  fill="#9DBF9E"
                  opacity="0.12"
                />

                {/* Río Éufrates (izquierda) - más realista */}
                <path
                  d="M 90 30 Q 85 80, 92 130 Q 88 180, 95 230 Q 85 280, 90 330 Q 80 380, 95 430 Q 90 480, 100 530 L 120 590"
                  stroke="url(#riverGradient)"
                  strokeWidth="28"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.5"
                />
                {/* Sombra del Éufrates */}
                <path
                  d="M 90 30 Q 85 80, 92 130 Q 88 180, 95 230 Q 85 280, 90 330 Q 80 380, 95 430 Q 90 480, 100 530 L 120 590"
                  stroke="#1E5A7D"
                  strokeWidth="32"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.15"
                  transform="translate(2, 2)"
                />

                {/* Río Tigris (derecha) - más realista */}
                <path
                  d="M 510 20 Q 505 70, 512 120 Q 518 170, 510 220 Q 520 270, 515 320 Q 525 370, 518 420 Q 515 470, 505 520 L 490 590"
                  stroke="url(#riverGradient)"
                  strokeWidth="28"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.5"
                />
                {/* Sombra del Tigris */}
                <path
                  d="M 510 20 Q 505 70, 512 120 Q 518 170, 510 220 Q 520 270, 515 320 Q 525 370, 518 420 Q 515 470, 505 520 L 490 590"
                  stroke="#1E5A7D"
                  strokeWidth="32"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.15"
                  transform="translate(2, 2)"
                />

                {/* Afluentes menores */}
                <path d="M 450 150 Q 480 160, 510 180" stroke="#4A90E2" strokeWidth="6" opacity="0.2" fill="none"/>
                <path d="M 140 200 Q 110 210, 95 230" stroke="#4A90E2" strokeWidth="6" opacity="0.2" fill="none"/>

                {/* Golfo Pérsico */}
                <ellipse cx="300" cy="600" rx="250" ry="50" fill="#2E7BB4" opacity="0.25"/>
                <ellipse cx="300" cy="600" rx="250" ry="50" fill="url(#waterPattern)" opacity="0.4"/>

                {/* Confluencia de ríos (Shatt al-Arab) */}
                <path
                  d="M 120 590 Q 200 595, 300 600 M 490 590 Q 400 595, 300 600"
                  stroke="url(#riverGradient)"
                  strokeWidth="20"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.4"
                />

                {/* Texto geográfico sutil */}
                <text x="30" y="60" fill="#8B4513" fontSize="10" opacity="0.3" fontStyle="italic">Montes Tauro</text>
                <text x="470" y="50" fill="#8B4513" fontSize="10" opacity="0.3" fontStyle="italic">Montes Zagros</text>
                <text x="240" y="620" fill="#1E5A7D" fontSize="11" opacity="0.4" fontWeight="bold">Golfo Pérsico</text>
              </svg>

              {/* River Drop Zones */}
              <div
                onDragOver={handleDragOver}
                onDrop={() => handleDrop('river-west')}
                className="absolute top-12 left-16 w-20 h-80 bg-blue-300/30 border-4 border-blue-500 border-dashed rounded-lg flex items-center justify-center hover:bg-blue-400/40 transition-colors cursor-pointer group"
                style={{ transform: 'rotate(-5deg)' }}
              >
                {!pieces.find(p => p.placedZone === 'river-west') && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold text-blue-700 bg-white/90 px-2 py-1 rounded">Zona de río</span>
                  </div>
                )}
                {pieces.find(p => p.id === 'eufrates' && p.placedZone === 'river-west') && (
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 border-4 border-blue-800 rounded-lg flex items-center justify-center shadow-xl">
                    <span className="text-white text-3xl">🌊</span>
                  </div>
                )}
                {pieces.find(p => p.placedZone === 'river-west' && p.id !== 'eufrates') && (
                  <div className="absolute inset-0 bg-gradient-to-b from-red-400 to-red-600 border-4 border-red-800 rounded-lg flex items-center justify-center shadow-xl">
                    <span className="text-white text-3xl">❌</span>
                  </div>
                )}
              </div>

              <div
                onDragOver={handleDragOver}
                onDrop={() => handleDrop('river-east')}
                className="absolute top-8 right-16 w-20 h-80 bg-blue-300/30 border-4 border-blue-500 border-dashed rounded-lg flex items-center justify-center hover:bg-blue-400/40 transition-colors cursor-pointer group"
                style={{ transform: 'rotate(5deg)' }}
              >
                {!pieces.find(p => p.placedZone === 'river-east') && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold text-blue-700 bg-white/90 px-2 py-1 rounded">Zona de río</span>
                  </div>
                )}
                {pieces.find(p => p.id === 'tigris' && p.placedZone === 'river-east') && (
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 border-4 border-blue-800 rounded-lg flex items-center justify-center shadow-xl">
                    <span className="text-white text-3xl">🌊</span>
                  </div>
                )}
                {pieces.find(p => p.placedZone === 'river-east' && p.id !== 'tigris') && (
                  <div className="absolute inset-0 bg-gradient-to-b from-red-400 to-red-600 border-4 border-red-800 rounded-lg flex items-center justify-center shadow-xl">
                    <span className="text-white text-3xl">❌</span>
                  </div>
                )}
              </div>

              {/* City Drop Zones with geographical accuracy */}

              {/* Babilonia - Centro-Norte entre ríos */}
              <div
                onDragOver={handleDragOver}
                onDrop={() => handleDrop('city-central')}
                className="absolute top-28 left-1/2 transform -translate-x-1/2 w-28 h-28 bg-amber-200/40 border-4 border-amber-600 border-dashed rounded-full flex items-center justify-center hover:bg-amber-300/50 transition-colors cursor-pointer group"
              >
                {!pieces.find(p => p.placedZone === 'city-central') && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold text-amber-700 bg-white/90 px-2 py-1 rounded">Zona de ciudad</span>
                  </div>
                )}
                {pieces.find(p => p.id === 'babilonia' && p.placedZone === 'city-central') && (
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 border-4 border-amber-800 rounded-full flex items-center justify-center shadow-2xl">
                    <span className="text-white text-4xl">👑</span>
                  </div>
                )}
                {pieces.find(p => p.placedZone === 'city-central' && p.id !== 'babilonia') && (
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 border-4 border-red-800 rounded-full flex items-center justify-center shadow-2xl">
                    <span className="text-white text-3xl">❌</span>
                  </div>
                )}
              </div>

              {/* Lagash - Centro entre ríos */}
              <div
                onDragOver={handleDragOver}
                onDrop={() => handleDrop('city-center')}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-yellow-200/40 border-4 border-yellow-600 border-dashed rounded-full flex items-center justify-center hover:bg-yellow-300/50 transition-colors cursor-pointer group"
              >
                {!pieces.find(p => p.placedZone === 'city-center') && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold text-yellow-700 bg-white/90 px-2 py-1 rounded">Zona de ciudad</span>
                  </div>
                )}
                {pieces.find(p => p.id === 'lagash' && p.placedZone === 'city-center') && (
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 border-4 border-yellow-800 rounded-full flex items-center justify-center shadow-2xl">
                    <span className="text-white text-3xl">🏛️</span>
                  </div>
                )}
                {pieces.find(p => p.placedZone === 'city-center' && p.id !== 'lagash') && (
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 border-4 border-red-800 rounded-full flex items-center justify-center shadow-2xl">
                    <span className="text-white text-3xl">❌</span>
                  </div>
                )}
              </div>

              {/* Uruk - Sur, entre ríos */}
              <div
                onDragOver={handleDragOver}
                onDrop={() => handleDrop('city-south')}
                className="absolute bottom-32 left-1/2 transform -translate-x-1/2 translate-x-[-30px] w-24 h-24 bg-yellow-200/40 border-4 border-yellow-600 border-dashed rounded-full flex items-center justify-center hover:bg-yellow-300/50 transition-colors cursor-pointer group"
              >
                {!pieces.find(p => p.placedZone === 'city-south') && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold text-yellow-700 bg-white/90 px-2 py-1 rounded">Zona de ciudad</span>
                  </div>
                )}
                {pieces.find(p => p.id === 'uruk' && p.placedZone === 'city-south') && (
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 border-4 border-yellow-800 rounded-full flex items-center justify-center shadow-2xl">
                    <span className="text-white text-3xl">🏛️</span>
                  </div>
                )}
                {pieces.find(p => p.placedZone === 'city-south' && p.id !== 'uruk') && (
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 border-4 border-red-800 rounded-full flex items-center justify-center shadow-2xl">
                    <span className="text-white text-3xl">❌</span>
                  </div>
                )}
              </div>

              {/* Ur - Sur-este, cerca del golfo */}
              <div
                onDragOver={handleDragOver}
                onDrop={() => handleDrop('city-southeast')}
                className="absolute bottom-28 right-32 w-24 h-24 bg-yellow-200/40 border-4 border-yellow-600 border-dashed rounded-full flex items-center justify-center hover:bg-yellow-300/50 transition-colors cursor-pointer group"
              >
                {!pieces.find(p => p.placedZone === 'city-southeast') && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold text-yellow-700 bg-white/90 px-2 py-1 rounded">Zona de ciudad</span>
                  </div>
                )}
                {pieces.find(p => p.id === 'ur' && p.placedZone === 'city-southeast') && (
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 border-4 border-yellow-800 rounded-full flex items-center justify-center shadow-2xl">
                    <span className="text-white text-3xl">🏛️</span>
                  </div>
                )}
                {pieces.find(p => p.placedZone === 'city-southeast' && p.id !== 'ur') && (
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 border-4 border-red-800 rounded-full flex items-center justify-center shadow-2xl">
                    <span className="text-white text-3xl">❌</span>
                  </div>
                )}
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg border-2 border-[#8B4513] text-xs">
                <p className="font-bold text-[#2C1810] mb-1">Leyenda:</p>
                <p className="text-[#4A90E2]">🌊 Ríos</p>
                <p className="text-[#D2691E]">🏛️ Ciudades</p>
                <p className="text-[#CD853F]">👑 Capital</p>
              </div>

              {/* Reference Links */}
              <div className="absolute bottom-4 right-4 bg-white/95 p-3 rounded-lg border-2 border-[#8B4513] text-xs max-w-[200px]">
                <p className="font-bold text-[#2C1810] mb-2 text-center">📚 Referencias</p>
                <div className="space-y-2">
                  <a
                    href="https://www.google.com/maps/place/Mesopotamia/@33.3123548,43.7793207,7z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#2E7BB4] hover:text-[#1E5A7D] underline transition-colors pointer-events-auto"
                  >
                    <span>🗺️</span>
                    <span className="text-[10px]">Ver en Google Maps</span>
                  </a>
                  <a
                    href="https://appangea.com/2023/11/09/mapa-de-historia-mesopotamia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#2E7BB4] hover:text-[#1E5A7D] underline transition-colors pointer-events-auto"
                  >
                    <span>🖼️</span>
                    <span className="text-[10px]">Mapa histórico</span>
                  </a>
                </div>
                <p className="text-[9px] text-[#5D3A1A] mt-2 italic text-center">
                  ¡Úsalas si necesitas ayuda!
                </p>
              </div>

              {/* Compass */}
              <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-full border-2 border-[#8B4513] w-12 h-12 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs font-bold text-[#2C1810]">N</p>
                  <p className="text-[10px] text-[#5D3A1A]">↑</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reset Button */}
      {pieces.filter(p => p.placed).length > 0 && (
        <Button
          onClick={resetGame}
          className="w-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white text-lg py-6 font-bold border-3 border-[#2C1810] hover:shadow-xl transition-all"
        >
          🔄 Reiniciar Mapa
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
                    <div className="text-6xl mb-4">𒀭</div>
                    <p className="text-2xl font-bold text-[#2C1810]">
                      Has obtenido el Sello del Territorio
                    </p>
                    <p className="text-lg text-[#5D3A1A]">
                      Has demostrado tu conocimiento sobre la geografía de Mesopotamia y sus ríos eternos.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-4">🔄</div>
                    <p className="text-2xl font-bold text-[#2C1810]">
                      Necesitas al menos 70% de precisión
                    </p>
                    <p className="text-lg text-[#5D3A1A]">
                      Ubicaste correctamente {correctPlacements} de {pieces.length} elementos ({passPercentage.toFixed(0)}%).
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
                  {hasPassed ? '𒀭 Continuar a la Siguiente Fase' : '⚠️ Necesitas 70% para continuar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
