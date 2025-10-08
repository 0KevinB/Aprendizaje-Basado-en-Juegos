'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Fase3Props {
  onComplete: (score: number) => void;
}

const treasureChests = [
  {
    id: 1,
    timestamp: '2:30',
    title: '🎁 COFRE 1: Importancia del Nilo',
    questions: [
      {
        question: '¿Qué importancia tuvo el río Nilo para el surgimiento y desarrollo de Egipto?',
        options: [
          'Solo servía para beber agua',
          'Fue fundamental: recurso económico (agricultura, pesca, papiro), transporte, barro fértil de inundaciones',
          'No tuvo importancia',
          'Solo era decorativo'
        ],
        correct: 1,
        hint: 'El ciclo de trabajo: labrar después de la crecida, sembrar en limo, cosechar'
      },
      {
        question: '¿Qué dejaban las inundaciones anuales del Nilo?',
        options: [
          'Arena',
          'Barro fértil para la agricultura',
          'Piedras',
          'Sal'
        ],
        correct: 1,
      },
      {
        question: '¿Cuál era el ciclo de trabajo agrícola regular?',
        options: [
          'Sembrar, regar, cosechar',
          'Labrar después de la crecida del río, sembrar en limo depositado, cosechar',
          'Solo cosechar',
          'No había ciclo regular'
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 2,
    timestamp: '5:45',
    title: '🎁 COFRE 2: Pirámides y Momificaciones',
    questions: [
      {
        question: '¿Qué significado tenían las pirámides para los egipcios?',
        options: [
          'Solo eran decoración',
          'Tumbas monumentales y símbolos de eternidad para que el faraón alcanzara la vida eterna',
          'Eran almacenes de alimentos',
          'No tenían significado especial'
        ],
        correct: 1,
      },
      {
        question: '¿Por qué momificaban a sus muertos?',
        options: [
          'Por tradición sin sentido',
          'Para conservar el cuerpo intacto y permitir que el alma viajara a la vida eterna',
          'Solo por higiene',
          'Para estudiarlos'
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 3,
    timestamp: '8:20',
    title: '🎁 COFRE 3: Avances Científicos y Culturales',
    questions: [
      {
        question: '¿Qué avances en medicina desarrollaron los egipcios?',
        options: [
          'Ninguno',
          'Técnicas de momificación, conocimientos de anatomía, métodos como inhalaciones',
          'Solo cirugías modernas',
          'Vacunas'
        ],
        correct: 1,
      },
      {
        question: '¿Qué permitieron los cálculos matemáticos y observaciones astronómicas?',
        options: [
          'Nada importante',
          'Medir el periodo solar de 365 días y dividir el día en 24 horas',
          'Solo contar personas',
          'Predecir el clima'
        ],
        correct: 1,
      },
      {
        question: '¿Qué minerales distinguieron los egipcios?',
        options: [
          'Solo hierro',
          'Oro, plata, aleación de cobre, bronce, plomo, hierro',
          'Diamantes',
          'Uranio'
        ],
        correct: 1,
      },
      {
        question: '¿Qué artes desarrollaron los egipcios?',
        options: [
          'Solo pintura',
          'Pintura, escultura sobre piedra (ultratumba), arquitectura (pirámides, templos, tumbas)',
          'Solo música',
          'Teatro moderno'
        ],
        correct: 1,
      },
    ],
  },
];

const roleDescriptions = [
  { role: '📖 Lector', description: 'Sigue el video y toma notas' },
  { role: '✍️ Escritor', description: 'Registra las respuestas' },
  { role: '🧩 Armador', description: 'Organiza las ideas del grupo' },
  { role: '📢 Vocero', description: 'Presenta las conclusiones' },
];

export function Fase3SecretosNilo({ onComplete }: Fase3Props) {
  const [currentChest, setCurrentChest] = useState<number | null>(null);
  const [chestAnswers, setChestAnswers] = useState<Record<number, Record<number, number>>>({});
  const [completedChests, setCompletedChests] = useState<number[]>([]);
  const [showNarrative, setShowNarrative] = useState(true);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleAnswer = (chestId: number, questionIdx: number, answerIdx: number) => {
    setChestAnswers(prev => ({
      ...prev,
      [chestId]: {
        ...(prev[chestId] || {}),
        [questionIdx]: answerIdx,
      },
    }));
  };

  const checkChest = (chestId: number) => {
    const chest = treasureChests.find(c => c.id === chestId);
    if (!chest) return false;

    const userAnswers = chestAnswers[chestId] || {};
    const allAnswered = chest.questions.every((_, idx) => userAnswers[idx] !== undefined);

    if (!allAnswered) {
      setNotification({ type: 'error', message: '⚠️ Debes responder todas las preguntas del cofre.' });
      setTimeout(() => setNotification(null), 5000);
      return false;
    }

    const allCorrect = chest.questions.every(
      (q, idx) => userAnswers[idx] === q.correct
    );

    if (allCorrect) {
      setCompletedChests(prev => [...new Set([...prev, chestId])]);
      setCurrentChest(null);
      return true;
    }
    return false;
  };

  const handleSubmitChest = (chestId: number) => {
    const isCorrect = checkChest(chestId);
    if (isCorrect) {
      setNotification({ type: 'success', message: '🎉 ¡Cofre desbloqueado! Has respondido correctamente todas las preguntas.' });
    } else {
      setNotification({ type: 'error', message: '❌ Algunas respuestas son incorrectas. Revisa el video y vuelve a intentarlo.' });
    }
    setTimeout(() => setNotification(null), 5000);
  };

  const handleComplete = () => {
    const score = Math.round((completedChests.length / treasureChests.length) * 100);
    onComplete(score);
  };

  const progress = (completedChests.length / treasureChests.length) * 100;

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
            <span className="text-4xl">{notification.type === 'success' ? '🎉' : '❌'}</span>
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
      <Card className="border-4 border-[#FFD700] bg-gradient-to-br from-[#FFF8DC] to-[#F0E68C] shadow-xl">
        <CardContent className="pt-6 pb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎁</span>
              <span className="font-extrabold text-xl text-[#000000]">Cofres Desbloqueados</span>
            </div>
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] px-5 py-2 rounded-full border-3 border-[#8B6F47] shadow-md">
              <span className="font-extrabold text-2xl text-[#000000]">
                {completedChests.length} / {treasureChests.length}
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="h-8 bg-white rounded-full border-4 border-[#8B6F47] overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#CD853F] transition-all duration-500 ease-out flex items-center justify-end pr-3 shadow-lg"
                style={{ width: `${progress}%` }}
              >
                {progress > 15 && (
                  <span className="text-sm font-extrabold text-white drop-shadow-md">
                    {Math.round(progress)}%
                  </span>
                )}
              </div>
            </div>
            {/* Treasure chest icons */}
            <div className="flex justify-between mt-2 px-1">
              {treasureChests.map((chest) => (
                <div
                  key={chest.id}
                  className={`text-3xl transform transition-all duration-300 ${
                    completedChests.includes(chest.id) ? 'scale-110 animate-bounce' : 'scale-90 opacity-50 grayscale'
                  }`}
                >
                  {completedChests.includes(chest.id) ? '💎' : '🎁'}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Narrative */}
      {showNarrative && (
        <Card className="border-4 border-[#FFD700] bg-gradient-to-br from-[#f5f1e8] to-[#E6BE8A]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-serif text-[#0f1e30]">
                🏺 FASE 3 - DOMINIO: Los Secretos del Nilo
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowNarrative(false)} className="text-[#0f1e30]">
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[#1e3a5f]">
            <p className="text-lg leading-relaxed">
              El Gran Consejo de los Sabios Egipcios ha convocado a los escribas aprendices. En el templo
              de Luxor se han hallado <strong>tres cofres sagrados</strong> con enigmas que revelan los
              secretos del Imperio.
            </p>
            <p className="text-lg leading-relaxed">
              Cada cofre solo se abre si logran responder con sabiduría y demostrar con imágenes y textos
              lo que comprendieron del legado del Antiguo Egipto.
            </p>
            <div className="bg-[#FFD700] p-6 rounded-lg border-2 border-[#B8860B]">
              <p className="text-xl font-bold text-[#0f1e30] text-center">
                🏺 <strong>DESAFÍO:</strong> Quien consiga descifrar los tres cofres será reconocido como
                <strong> Guardián del Conocimiento del Nilo</strong>.
              </p>
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

      {/* Video Section */}
      <Card className="border-4 border-[#FFD700] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#0f1e30]">
            📺 Video: Los Secretos del Antiguo Egipto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full rounded-lg border-4 border-[#B8860B]"
              src="https://www.youtube.com/embed/6a_gIpv_XD4"
              title="El Antiguo Egipto"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="mt-4 bg-[#f5f1e8] p-4 rounded-lg border-2 border-[#C19A6B]">
            <p className="text-base text-[#1e3a5f]">
              💡 <strong>Instrucciones:</strong> Observa atentamente el video. Los cofres aparecerán en momentos
              clave indicados por los timestamps. Toma notas y responde las preguntas de cada cofre.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Treasure Chests */}
      <Card className="border-4 border-[#FFD700] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#0f1e30]">
            🎁 Cofres del Conocimiento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {treasureChests.map((chest) => (
            <div key={chest.id} className="space-y-4">
              <Button
                onClick={() => setCurrentChest(currentChest === chest.id ? null : chest.id)}
                className={`w-full p-6 text-left justify-between ${
                  completedChests.includes(chest.id)
                    ? 'bg-green-600 text-white'
                    : currentChest === chest.id
                    ? 'bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#0f1e30]'
                    : 'bg-white border-2 border-[#C19A6B] text-[#0f1e30] hover:bg-[#E6D5B8]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">
                    {completedChests.includes(chest.id) ? '✅' : '🎁'}
                  </span>
                  <div>
                    <div className="text-xl font-bold">{chest.title}</div>
                    <div className="text-sm opacity-90">📍 Aparece en: {chest.timestamp}</div>
                  </div>
                </div>
                <span className="text-2xl">{currentChest === chest.id ? '▲' : '▼'}</span>
              </Button>

              {currentChest === chest.id && !completedChests.includes(chest.id) && (
                <Card className="border-3 border-[#B8860B] bg-gradient-to-br from-[#f5f1e8] to-[#E6BE8A]">
                  <CardContent className="pt-6 space-y-6">
                    {chest.questions.map((q, qIdx) => (
                      <div key={qIdx} className="space-y-3">
                        <h3 className="text-lg font-bold text-[#0f1e30]">
                          {qIdx + 1}. {q.question}
                        </h3>
                        {q.hint && (
                          <p className="text-sm text-[#1e3a5f] italic">💡 Pista: {q.hint}</p>
                        )}
                        <div className="grid gap-2">
                          {q.options.map((option, oIdx) => (
                            <Button
                              key={oIdx}
                              onClick={() => handleAnswer(chest.id, qIdx, oIdx)}
                              className={`text-left justify-start p-4 ${
                                chestAnswers[chest.id]?.[qIdx] === oIdx
                                  ? 'bg-[#FFD700] text-[#0f1e30] border-2 border-[#B8860B]'
                                  : 'bg-white border-2 border-[#C19A6B] text-[#0f1e30] hover:bg-[#E6D5B8]'
                              }`}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Button
                      onClick={() => handleSubmitChest(chest.id)}
                      className="w-full bg-gradient-to-r from-[#40E0D0] to-[#20B2AA] text-[#0f1e30] text-lg py-6 font-bold"
                    >
                      🔓 Intentar Abrir Cofre
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Complete Mission */}
      {completedChests.length === treasureChests.length && (
        <Card className="border-4 border-green-600 bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="text-6xl">🏺</div>
            <h2 className="text-3xl font-serif font-bold text-green-900">
              ¡Has obtenido el Sello del Guardián del Nilo!
            </h2>
            <p className="text-lg text-green-800">
              Has desbloqueado los tres cofres sagrados y demostrado tu sabiduría.
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
