'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface SecretosNiloProps {
  onComplete: (score: number) => void;
}

const treasureChests = [
  {
    id: 1,
    timestamp: '2:30',
    title: 'Cofre del Nilo',
    questions: [
      {
        question: '¿Por qué el Nilo era fundamental para la agricultura egipcia?',
        options: [
          'Porque proporcionaba agua de riego todo el año',
          'Porque sus inundaciones dejaban limo fértil',
          'Porque ahuyentaba a las plagas',
          'Porque permitía el comercio'
        ],
        correct: 1,
      },
      {
        question: '¿Qué cultivaban principalmente los egipcios?',
        options: [
          'Arroz y maíz',
          'Trigo y cebada',
          'Papa y yuca',
          'Café y cacao'
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 2,
    timestamp: '5:45',
    title: 'Cofre de la Sabiduría',
    questions: [
      {
        question: '¿Qué aportes científicos hicieron los egipcios?',
        options: [
          'Descubrieron la electricidad',
          'Desarrollaron la medicina y astronomía',
          'Inventaron la imprenta',
          'Crearon la química moderna'
        ],
        correct: 1,
      },
      {
        question: '¿Qué calendario desarrollaron los antiguos egipcios?',
        options: [
          'Calendario lunar de 12 meses',
          'Calendario solar de 365 días',
          'Calendario azteca',
          'Calendario gregoriano'
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 3,
    timestamp: '8:20',
    title: 'Cofre de la Eternidad',
    questions: [
      {
        question: '¿Por qué momificaban a los muertos?',
        options: [
          'Para conservar el cuerpo para la vida eterna',
          'Por tradición religiosa solamente',
          'Para estudiar anatomía',
          'Para prevenir enfermedades'
        ],
        correct: 0,
      },
      {
        question: '¿Qué estructura arquitectónica es símbolo del Antiguo Egipto?',
        options: [
          'Los templos griegos',
          'Las pirámides',
          'Los acueductos',
          'Los zigurats'
        ],
        correct: 1,
      },
    ],
  },
];

export function SecretosNilo({ onComplete }: SecretosNiloProps) {
  const [currentChest, setCurrentChest] = useState<number | null>(null);
  const [chestAnswers, setChestAnswers] = useState<Record<number, number[]>>({});
  const [completedChests, setCompletedChests] = useState<number[]>([]);
  const [showNarrative, setShowNarrative] = useState(true);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const handleAnswer = (chestId: number, questionIdx: number, answerIdx: number) => {
    setChestAnswers(prev => ({
      ...prev,
      [chestId]: {
        ...prev[chestId],
        [questionIdx]: answerIdx,
      },
    }));
  };

  const checkChest = (chestId: number) => {
    const chest = treasureChests.find(c => c.id === chestId);
    if (!chest) return false;

    const userAnswers = chestAnswers[chestId] || {};
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
      alert('🎉 ¡Cofre desbloqueado! Has respondido correctamente todas las preguntas.');
    } else {
      alert('❌ Algunas respuestas son incorrectas. Revisa el video y vuelve a intentarlo.');
    }
  };

  const handleComplete = () => {
    const score = completedChests.length * 33.33;
    onComplete(Math.round(score));
  };

  const progress = (completedChests.length / treasureChests.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <Card className="border-4 border-[#FFD700] bg-white">
        <CardContent className="pt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-bold text-[#0f1e30]">Cofres Desbloqueados</span>
            <span className="font-bold text-[#B8860B]">
              {completedChests.length} / {treasureChests.length}
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </CardContent>
      </Card>

      {/* Narrative */}
      {showNarrative && (
        <Card className="border-4 border-[#FFD700] bg-gradient-to-br from-[#f5f1e8] to-[#E6BE8A]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-serif text-[#0f1e30]">
                🏺 MISIÓN 3: Los Secretos del Nilo
              </CardTitle>
              <Button
                variant="ghost"
                onClick={() => setShowNarrative(false)}
                className="text-[#0f1e30]"
              >
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
              Cada cofre solo se abre si logran responder con sabiduría y demostrar lo que comprendieron
              del legado del Antiguo Egipto.
            </p>
            <div className="bg-[#FFD700] p-6 rounded-lg border-2 border-[#B8860B]">
              <p className="text-xl font-bold text-[#0f1e30] text-center">
                Quien consiga descifrar los tres cofres será reconocido como
                <strong> Guardián del Conocimiento del Nilo</strong>.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Roles */}
      <Card className="border-4 border-[#40E0D0] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#0f1e30]">
            Roles del Equipo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-[#f5f1e8] to-[#E6D5B8] p-4 rounded-lg border-2 border-[#C19A6B]">
              <div className="flex items-start gap-3">
                <span className="text-3xl">📖</span>
                <div>
                  <h3 className="font-bold text-lg text-[#0f1e30]">Lector</h3>
                  <p className="text-sm text-[#1e3a5f]">Sigue el video y toma notas</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#f5f1e8] to-[#E6D5B8] p-4 rounded-lg border-2 border-[#C19A6B]">
              <div className="flex items-start gap-3">
                <span className="text-3xl">✍️</span>
                <div>
                  <h3 className="font-bold text-lg text-[#0f1e30]">Escritor</h3>
                  <p className="text-sm text-[#1e3a5f]">Registra las respuestas</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#f5f1e8] to-[#E6D5B8] p-4 rounded-lg border-2 border-[#C19A6B]">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🧩</span>
                <div>
                  <h3 className="font-bold text-lg text-[#0f1e30]">Armador</h3>
                  <p className="text-sm text-[#1e3a5f]">Organiza las ideas del grupo</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#f5f1e8] to-[#E6D5B8] p-4 rounded-lg border-2 border-[#C19A6B]">
              <div className="flex items-start gap-3">
                <span className="text-3xl">📢</span>
                <div>
                  <h3 className="font-bold text-lg text-[#0f1e30]">Vocero</h3>
                  <p className="text-sm text-[#1e3a5f]">Presenta las conclusiones</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Section */}
      <Card className="border-4 border-[#FFD700] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#0f1e30]">
            📺 Video: Los Secretos del Antiguo Egipto
          </CardTitle>
          <CardDescription className="text-base text-[#1e3a5f]">
            Observa atentamente el video. Los cofres aparecerán en momentos clave.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full">
            <iframe
              ref={videoRef}
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/6a_gIpv_XD4"
              title="El Antiguo Egipto"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </CardContent>
      </Card>

      {/* Treasure Chests */}
      <Card className="border-4 border-[#FFD700] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#0f1e30]">
            🎁 Cofres del Conocimiento
          </CardTitle>
          <CardDescription className="text-base text-[#1e3a5f]">
            Abre cada cofre respondiendo correctamente las preguntas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {treasureChests.map((chest) => (
            <div key={chest.id}>
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
                    <div className="text-sm opacity-90">Aparece en: {chest.timestamp}</div>
                  </div>
                </div>
                <span className="text-2xl">{currentChest === chest.id ? '▲' : '▼'}</span>
              </Button>

              {currentChest === chest.id && (
                <Card className="mt-4 border-3 border-[#B8860B] bg-gradient-to-br from-[#f5f1e8] to-[#E6BE8A]">
                  <CardContent className="pt-6 space-y-6">
                    {chest.questions.map((q, qIdx) => (
                      <div key={qIdx} className="space-y-3">
                        <h3 className="text-lg font-bold text-[#0f1e30]">
                          {qIdx + 1}. {q.question}
                        </h3>
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
                      disabled={completedChests.includes(chest.id)}
                    >
                      {completedChests.includes(chest.id) ? '✓ Cofre Desbloqueado' : 'Abrir Cofre'}
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
