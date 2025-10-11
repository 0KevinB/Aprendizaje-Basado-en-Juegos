'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Fase4Props {
  onComplete: (data: { score: number; correctAnswers: number; totalQuestions: number }) => void;
  onProgressUpdate?: (progress: number, data?: Record<string, unknown>) => void;
  savedProgress?: Record<string, unknown> | null;
}

interface BingoItem {
  id: string;
  text: string;
  clue: string;
  category: 'politica' | 'economia' | 'cultura' | 'tecnologia';
  isMarked: boolean;
}

// 40 aportes culturales de Mesopotamia según la planificación
const bingoItems: BingoItem[] = [
  // CULTURA (escritura, religión, arte, literatura)
  { id: 'b1', text: 'Escritura cuneiforme', clue: 'Sistema de símbolos que usaban los escribas para registrar en tablillas de arcilla', category: 'cultura', isMarked: false },
  { id: 'b2', text: 'Zigurat', clue: 'Monumento religioso en forma de torre escalonada en honor a los dioses', category: 'cultura', isMarked: false },
  { id: 'b3', text: 'Epopeya de Gilgamesh', clue: 'Primer poema épico de la humanidad sobre un rey sumerio', category: 'cultura', isMarked: false },
  { id: 'b4', text: 'Enuma Elish', clue: 'Narración mitológica sobre el origen de los dioses y el universo', category: 'cultura', isMarked: false },
  { id: 'b5', text: 'Sello cilíndrico', clue: 'Elemento cilíndrico usado para sellar documentos con imágenes', category: 'cultura', isMarked: false },
  { id: 'b6', text: 'Tablillas de arcilla', clue: 'Material donde se escribía con estilete la escritura cuneiforme', category: 'cultura', isMarked: false },
  { id: 'b7', text: 'Lamassu', clue: 'Figura mítica con cuerpo de toro, alas de águila y rostro humano', category: 'cultura', isMarked: false },
  { id: 'b8', text: 'Marduk', clue: 'Dios principal de Babilonia, asociado con la justicia y el orden', category: 'cultura', isMarked: false },
  { id: 'b9', text: 'Ishtar/Inanna', clue: 'Diosa del amor y la guerra en la mitología mesopotámica', category: 'cultura', isMarked: false },
  { id: 'b10', text: 'Estilete', clue: 'Instrumento que usaban los escribas para escribir sobre arcilla', category: 'cultura', isMarked: false },

  // POLÍTICA (leyes, gobierno, ciudades)
  { id: 'b11', text: 'Código de Hammurabi', clue: 'Primeras leyes escritas de la humanidad grabadas en piedra', category: 'politica', isMarked: false },
  { id: 'b12', text: 'Teocracia', clue: 'Organización social donde el rey y los sacerdotes tenían el mayor poder', category: 'politica', isMarked: false },
  { id: 'b13', text: 'Ciudad-estado Uruk', clue: 'Primera gran ciudad considerada cuna del urbanismo', category: 'politica', isMarked: false },
  { id: 'b14', text: 'Imperio Acadio', clue: 'Primer estado centralizado creado por Sargón de Acad', category: 'politica', isMarked: false },
  { id: 'b15', text: 'Ciudad-estado', clue: 'Forma de organización política con ciudades independientes como Ur, Lagash y Uruk', category: 'politica', isMarked: false },
  { id: 'b16', text: 'Sumerios', clue: 'Pueblo considerado uno de los primeros en formar ciudades-estado', category: 'politica', isMarked: false },
  { id: 'b17', text: 'Asirios', clue: 'Pueblo guerrero que construyó un imperio con capital en Nínive', category: 'politica', isMarked: false },
  { id: 'b18', text: 'Babilonia', clue: 'Gran ciudad capital del imperio de Hammurabi', category: 'politica', isMarked: false },

  // ECONOMÍA (agricultura, comercio, inventos económicos)
  { id: 'b19', text: 'Canales de irrigación', clue: 'Sistema para aprovechar el agua de los ríos y distribuirla hacia los campos', category: 'economia', isMarked: false },
  { id: 'b20', text: 'Agricultura (cebada y trigo)', clue: 'Cultivo básico usado para hacer pan y cerveza', category: 'economia', isMarked: false },
  { id: 'b21', text: 'Trueque y comercio', clue: 'Sistema de intercambio de productos en mercados', category: 'economia', isMarked: false },
  { id: 'b22', text: 'Arado', clue: 'Herramienta agrícola para labrar la tierra', category: 'economia', isMarked: false },
  { id: 'b23', text: 'Ríos Tigris y Éufrates', clue: 'Fuentes de agua y barro fértil que permitían la agricultura', category: 'economia', isMarked: false },
  { id: 'b24', text: 'Cerveza', clue: 'Bebida fermentada elaborada con cebada', category: 'economia', isMarked: false },
  { id: 'b25', text: 'Comercio a larga distancia', clue: 'Intercambio de productos con regiones lejanas', category: 'economia', isMarked: false },

  // TECNOLOGÍA Y CIENCIA (inventos, matemáticas, astronomía)
  { id: 'b26', text: 'La rueda', clue: 'Invento para transporte de mercancías y producción', category: 'tecnologia', isMarked: false },
  { id: 'b27', text: 'Sistema sexagesimal', clue: 'División del tiempo en unidades de 60 que aún usamos hoy (minutos, segundos)', category: 'tecnologia', isMarked: false },
  { id: 'b28', text: 'Astronomía', clue: 'Ciencia usada por los sacerdotes para observar los astros', category: 'tecnologia', isMarked: false },
  { id: 'b29', text: 'Calendario lunar', clue: 'Sistema basado en las fases de la luna para medir el tiempo', category: 'tecnologia', isMarked: false },
  { id: 'b30', text: 'Álgebra y geometría', clue: 'Matemáticas avanzadas para cálculos y construcción', category: 'tecnologia', isMarked: false },
  { id: 'b31', text: 'Vidrio', clue: 'Material transparente usado en recipientes y adornos', category: 'tecnologia', isMarked: false },
  { id: 'b32', text: 'Metalurgia (bronce)', clue: 'Técnica para trabajar metales como el cobre y el bronce', category: 'tecnologia', isMarked: false },
  { id: 'b33', text: 'Arquitectura monumental', clue: 'Construcción de grandes edificios como zigurats y palacios', category: 'tecnologia', isMarked: false },
  { id: 'b34', text: 'Barcos de vela', clue: 'Embarcaciones para navegar por los ríos', category: 'tecnologia', isMarked: false },
  { id: 'b35', text: 'Medicina herbolaria', clue: 'Uso de plantas para curar enfermedades', category: 'tecnologia', isMarked: false },
  { id: 'b36', text: 'Mapas y cartografía', clue: 'Primeros mapas del mundo conocido grabados en arcilla', category: 'tecnologia', isMarked: false },
  { id: 'b37', text: 'Sistema de pesas y medidas', clue: 'Estandarización de unidades para el comercio', category: 'tecnologia', isMarked: false },
  { id: 'b38', text: 'Horno de ladrillos', clue: 'Tecnología para fabricar ladrillos cocidos para construcción', category: 'tecnologia', isMarked: false },
  { id: 'b39', text: 'Arco arquitectónico', clue: 'Técnica de construcción que permite sostener estructuras', category: 'tecnologia', isMarked: false },
  { id: 'b40', text: 'Sistema de escritura y archivo', clue: 'Primer sistema organizado para guardar registros escritos', category: 'tecnologia', isMarked: false },
];

const roleDescriptions = [
  { role: '📜 Lector', description: 'Lee las pistas del bingo mesopotámico' },
  { role: '✍️ Escritor', description: 'Documenta los aportes identificados' },
  { role: '🎯 Armador', description: 'Marca los aportes en el tablero' },
  { role: '🎤 Expositor', description: 'Explica el impacto de cada aporte' },
];

export function Fase4LegadoEterno({ onComplete, onProgressUpdate, savedProgress }: Fase4Props) {
  const [items, setItems] = useState<BingoItem[]>([]);
  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const [shuffledClues, setShuffledClues] = useState<BingoItem[]>([]);
  const [showNarrative, setShowNarrative] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (savedProgress && savedProgress.items) {
      setItems(savedProgress.items as BingoItem[]);
      setShuffledClues(savedProgress.shuffledClues as BingoItem[]);
      setCurrentClueIndex((savedProgress.currentClueIndex as number) || 0);
      setScore((savedProgress.score as number) || 0);
      setShowNarrative(false);
    } else {
      const shuffled = [...bingoItems].sort(() => Math.random() - 0.5);
      setItems(bingoItems);
      setShuffledClues(shuffled);
    }
  }, [savedProgress]);

  useEffect(() => {
    if (items.length > 0) {
      const markedCount = items.filter(item => item.isMarked).length;
      const progress = Math.min((markedCount / items.length) * 99, 99);
      if (onProgressUpdate && progress > 0) {
        onProgressUpdate(progress, { items, shuffledClues, currentClueIndex, score });
      }
    }
  }, [items, shuffledClues, currentClueIndex, score, onProgressUpdate]);

  const currentClue = shuffledClues[currentClueIndex];

  const handleMarkItem = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item || item.isMarked) return;

    // Check if this is the correct item for the current clue
    const isCorrect = currentClue && item.id === currentClue.id;

    const updatedItems = items.map(i =>
      i.id === itemId ? { ...i, isMarked: true } : i
    );

    setItems(updatedItems);

    if (isCorrect) {
      setScore(score + 25); // 25 points per correct item
      if (currentClueIndex < shuffledClues.length - 1) {
        setCurrentClueIndex(currentClueIndex + 1);
      } else {
        // All clues completed
        setTimeout(() => setShowCompletion(true), 500);
      }
    }
  };

  const handleComplete = () => {
    const markedItems = items.filter(i => i.isMarked).length;
    onComplete({
      score,
      correctAnswers: markedItems,
      totalQuestions: items.length,
    });
  };

  const resetGame = () => {
    const shuffled = [...bingoItems].sort(() => Math.random() - 0.5);
    setItems(bingoItems);
    setShuffledClues(shuffled);
    setCurrentClueIndex(0);
    setScore(0);
    setShowCompletion(false);
  };

  const markedCount = items.filter(i => i.isMarked).length;
  const passPercentage = items.length > 0 ? (markedCount / items.length) * 100 : 0;
  const hasPassed = passPercentage >= 70;

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(i => i.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cultura': return 'bg-purple-100 border-purple-500 text-purple-900';
      case 'politica': return 'bg-blue-100 border-blue-500 text-blue-900';
      case 'economia': return 'bg-green-100 border-green-500 text-green-900';
      case 'tecnologia': return 'bg-orange-100 border-orange-500 text-orange-900';
      default: return 'bg-gray-100 border-gray-500 text-gray-900';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cultura': return '🎨';
      case 'politica': return '⚖️';
      case 'economia': return '💰';
      case 'tecnologia': return '🔧';
      default: return '📋';
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      {/* Narrative */}
      {showNarrative && (
        <Card className="border-4 border-[#8B4513] bg-gradient-to-br from-[#F4A460] to-[#DEB887]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-serif text-[#2C1810]">
                🏺 FASE 4 - CONQUISTA: Bingo Mesopotámico - El Legado Eterno
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowNarrative(false)} className="text-[#2C1810]">
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[#2C1810]">
            <div className="bg-[#F5DEB3] p-6 rounded-lg border-2 border-[#8B4513]">
              <p className="text-lg leading-relaxed font-serif italic">
                "El sol nace sobre las murallas esmaltadas de <strong>Babilonia</strong> y enciende las losas del camino procesional.
                El <strong>Gran Consejo de Sabios</strong> se reúne a la sombra del zigurat para celebrar el <strong>Festival del Legado</strong>,
                la ceremonia donde se reconoce a quienes comprenden lo que Mesopotamia dio al mundo."
              </p>
            </div>
            <p className="text-lg leading-relaxed">
              Cada aprendiz recibe un <strong>Tablero del Destino</strong> con 40 aportes culturales de Mesopotamia.
              Deberán identificar los grandes legados: la escritura, la justicia, la rueda, el arado, los números, el sello cilíndrico y más.
              <strong> Lee las pistas, identifica el aporte correcto y márcalo en tu tablero.</strong>
            </p>
            <div className="bg-[#D2691E] p-6 rounded-lg border-2 border-[#8B4513]">
              <p className="text-xl font-bold text-white text-center">
                🎯 <strong>DESAFÍO:</strong> Identifica correctamente los aportes culturales de Mesopotamia según las pistas.
                Marca al menos 70% de los aportes para obtener el <strong>Sello del Legado</strong>. ¡Quien entiende el pasado, conquista el futuro!
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

      {/* Current Clue */}
      {!showCompletion && currentClue && (
        <Card className="border-4 border-[#8B4513] bg-gradient-to-br from-[#FFD700] to-[#FFA500]">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#2C1810] text-center">
              🔍 Pista {currentClueIndex + 1} de {shuffledClues.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-6 rounded-lg border-2 border-[#8B4513]">
              <p className="text-2xl font-bold text-[#2C1810] text-center">
                {currentClue.clue}
              </p>
              <p className="text-center text-[#5D3A1A] mt-4">
                Marca el aporte correcto en el tablero
              </p>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm font-bold text-[#2C1810]">
                Puntuación actual: <span className="text-2xl text-[#D2691E]">{score} pts</span>
              </p>
              <p className="text-sm text-[#5D3A1A]">
                Aportes marcados: {markedCount} / {items.length}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Filter */}
      {!showCompletion && (
        <Card className="border-4 border-[#8B4513] bg-white">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                onClick={() => setSelectedCategory('all')}
                className={`${selectedCategory === 'all' ? 'bg-[#8B4513]' : 'bg-[#D2691E]'} text-white`}
              >
                📋 Todos
              </Button>
              <Button
                onClick={() => setSelectedCategory('cultura')}
                className={`${selectedCategory === 'cultura' ? 'bg-purple-600' : 'bg-purple-400'} text-white`}
              >
                🎨 Cultura
              </Button>
              <Button
                onClick={() => setSelectedCategory('politica')}
                className={`${selectedCategory === 'politica' ? 'bg-blue-600' : 'bg-blue-400'} text-white`}
              >
                ⚖️ Política
              </Button>
              <Button
                onClick={() => setSelectedCategory('economia')}
                className={`${selectedCategory === 'economia' ? 'bg-green-600' : 'bg-green-400'} text-white`}
              >
                💰 Economía
              </Button>
              <Button
                onClick={() => setSelectedCategory('tecnologia')}
                className={`${selectedCategory === 'tecnologia' ? 'bg-orange-600' : 'bg-orange-400'} text-white`}
              >
                🔧 Tecnología
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bingo Board */}
      {!showCompletion && (
        <Card className="border-4 border-[#D2691E] bg-gradient-to-br from-white to-[#F5DEB3]">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#2C1810] text-center">
              🎯 Tablero del Legado Mesopotámico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMarkItem(item.id)}
                  disabled={item.isMarked}
                  className={`
                    p-3 rounded-lg border-3 transition-all font-semibold text-sm
                    ${item.isMarked
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-700 cursor-default'
                      : `${getCategoryColor(item.category)} border-2 hover:scale-105 hover:shadow-xl cursor-pointer`
                    }
                  `}
                >
                  <div className="text-2xl mb-2">{getCategoryIcon(item.category)}</div>
                  <p className="text-xs leading-tight">{item.text}</p>
                  {item.isMarked && (
                    <div className="text-3xl mt-2">✓</div>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
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
                    <div className="text-6xl mb-4">🏺</div>
                    <p className="text-2xl font-bold text-[#2C1810]">
                      Has obtenido el Sello del Legado
                    </p>
                    <p className="text-lg text-[#5D3A1A]">
                      Has completado todas las fases de Mesopotamia. ¡Eres un Guardián del Legado Eterno!
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-4">🔄</div>
                    <p className="text-2xl font-bold text-[#2C1810]">
                      Necesitas al menos 70% para continuar
                    </p>
                    <p className="text-lg text-[#5D3A1A]">
                      Has identificado {markedCount} de {items.length} aportes ({passPercentage.toFixed(0)}%).
                    </p>
                  </>
                )}

                <div className="bg-white p-6 rounded-lg border-2 border-[#8B4513]">
                  <p className="text-sm font-bold text-[#5D3A1A]">Puntuación Final</p>
                  <p className="text-4xl font-extrabold text-[#D2691E]">{score} pts</p>
                  <p className="text-lg font-bold text-[#8B4513] mt-2">{passPercentage.toFixed(0)}%</p>
                </div>
              </div>

              <div className="flex gap-4">
                {!hasPassed && (
                  <Button
                    onClick={() => {
                      setShowCompletion(false);
                      resetGame();
                    }}
                    className="flex-1 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white text-lg py-6 font-bold border-3 border-[#2C1810] hover:shadow-xl transition-all"
                  >
                    🔄 Intentar de Nuevo
                  </Button>
                )}
                <Button
                  onClick={handleComplete}
                  disabled={!hasPassed}
                  className={`
                    ${hasPassed ? 'w-full' : 'flex-1'} bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white text-lg py-6 font-bold
                    border-3 border-[#2C1810] hover:shadow-xl transition-all
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {hasPassed ? '🏺 Completar Mesopotamia' : '⚠️ Necesitas 70% para continuar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
