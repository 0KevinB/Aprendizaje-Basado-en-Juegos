'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';

interface Fase2Props {
  onComplete: (score: number) => void;
}

const socialClasses = [
  { id: 1, name: 'Faraón (rey y dios viviente)', correctPosition: 1 },
  { id: 2, name: 'Sacerdotes', correctPosition: 2 },
  { id: 3, name: 'Escribas', correctPosition: 3 },
  { id: 4, name: 'Artesanos y mercaderes', correctPosition: 4 },
  { id: 5, name: 'Campesinos', correctPosition: 5 },
];

const crosswordQuestions = [
  { question: 'El ____ era considerado un dios en la tierra y representaba la máxima autoridad', answer: 'FARAON', hint: '6 letras' },
  { question: 'Los ____ administraban los templos y eran la máxima autoridad religiosa', answer: 'SACERDOTES', hint: '11 letras' },
  { question: 'Los ____ formaban escuelas y se dedicaban a la enseñanza', answer: 'ESCRIBAS', hint: '8 letras' },
  { question: 'El material sobre el que escribían los egipcios era el ____', answer: 'PAPIRO', hint: '6 letras' },
  { question: 'La escritura ____ era pictográfica y la primera conocida en Egipto', answer: 'JEROGLIFÍCA', hint: '11 letras (sin acento)' },
  { question: 'El gobierno egipcio era de tipo ____ teocrático', answer: 'MONÁRQUICO', hint: '10 letras (sin acento)' },
];

const triviaQuestions = [
  {
    question: '¿Cuál era la base de la economía egipcia según el texto?',
    options: [
      'El comercio de oro',
      'La agricultura (el Nilo), pesca y planta del papiro',
      'La guerra',
      'La minería'
    ],
    correct: 1,
  },
  {
    question: '¿Dónde vivían los artesanos, mercaderes y campesinos?',
    options: [
      'En palacios',
      'En templos',
      'En ciudades o aldeas pequeñas',
      'En pirámides'
    ],
    correct: 2,
  },
  {
    question: '¿Para qué se utilizaba el papiro además de escribir?',
    options: [
      'Solo para escribir',
      'Construir embarcaciones, elaborar cestos y sandalias',
      'Como alimento',
      'Para hacer ropa'
    ],
    correct: 1,
  },
  {
    question: '¿Qué tipo de gobierno tenía Egipto?',
    options: [
      'Democracia',
      'Monárquico teocrático (el faraón hijo de los dioses)',
      'República',
      'Anarquía'
    ],
    correct: 1,
  },
];

const roleDescriptions = [
  { role: '💻 Escriba Digital', description: 'Maneja la plataforma digital' },
  { role: '📚 Historiador', description: 'Lee y comprende los textos' },
  { role: '🎨 Diseñador', description: 'Organiza la información visualmente' },
  { role: '📢 Vocero', description: 'Presenta las respuestas del equipo' },
];

export function Fase2ConsejoFaraon({ onComplete }: Fase2Props) {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [pyramidOrder, setPyramidOrder] = useState<number[]>([1, 2, 3, 4, 5]);
  const [crosswordAnswers, setCrosswordAnswers] = useState<string[]>(Array(6).fill(''));
  const [triviaAnswers, setTriviaAnswers] = useState<number[]>(Array(4).fill(-1));
  const [activitiesCompleted, setActivitiesCompleted] = useState<boolean[]>([false, false, false, false]);
  const [showNarrative, setShowNarrative] = useState(true);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const activities = [
    '📜 Lectura del Papiro',
    '🔺 Pirámide Social',
    '📝 Crucigrama Egipcio',
    '🎯 Trivia del Consejo',
  ];

  const movePyramidItem = (fromIndex: number, direction: 'up' | 'down') => {
    const newOrder = [...pyramidOrder];
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex >= 0 && toIndex < newOrder.length) {
      [newOrder[fromIndex], newOrder[toIndex]] = [newOrder[toIndex], newOrder[fromIndex]];
      setPyramidOrder(newOrder);
    }
  };

  const checkPyramid = () => {
    const correct = pyramidOrder.every((id, idx) => id === idx + 1);
    if (correct) {
      const newCompleted = [...activitiesCompleted];
      newCompleted[1] = true;
      setActivitiesCompleted(newCompleted);
      setNotification({ type: 'success', message: '✅ ¡Excelente! Has ordenado correctamente la pirámide social.' });
    } else {
      setNotification({ type: 'error', message: '❌ El orden no es correcto. Recuerda: Faraón arriba, Campesinos abajo.' });
    }
    setTimeout(() => setNotification(null), 5000);
  };

  const checkCrossword = () => {
    const allCorrect = crosswordQuestions.every(
      (q, idx) => crosswordAnswers[idx].toUpperCase().replace(/[ÁÉ ÍÓÚ]/g, (c) =>
        ({ 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' }[c] || c)
      ) === q.answer
    );

    if (allCorrect) {
      const newCompleted = [...activitiesCompleted];
      newCompleted[2] = true;
      setActivitiesCompleted(newCompleted);
      setNotification({ type: 'success', message: '✅ ¡Perfecto! Has completado el crucigrama correctamente.' });
    } else {
      setNotification({ type: 'error', message: '❌ Algunas respuestas son incorrectas. Revisa el texto del papiro.' });
    }
    setTimeout(() => setNotification(null), 5000);
  };

  const checkTrivia = () => {
    const allCorrect = triviaQuestions.every((q, idx) => triviaAnswers[idx] === q.correct);

    if (allCorrect) {
      const newCompleted = [...activitiesCompleted];
      newCompleted[3] = true;
      setActivitiesCompleted(newCompleted);
      setNotification({ type: 'success', message: '✅ ¡Excelente! Has respondido todas las trivias correctamente.' });
    } else {
      setNotification({ type: 'error', message: '❌ Algunas respuestas son incorrectas. Revisa tus elecciones.' });
    }
    setTimeout(() => setNotification(null), 5000);
  };

  const handleComplete = () => {
    const score = activitiesCompleted.filter(Boolean).length * 25;
    onComplete(score);
  };

  const progress = (activitiesCompleted.filter(Boolean).length / activities.length) * 100;

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
            <span className="text-4xl">{notification.type === 'success' ? '✅' : '❌'}</span>
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
              <span className="text-3xl">📊</span>
              <span className="font-extrabold text-xl text-[#000000]">Progreso de la Misión</span>
            </div>
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] px-5 py-2 rounded-full border-3 border-[#8B6F47] shadow-md">
              <span className="font-extrabold text-2xl text-[#000000]">{Math.round(progress)}%</span>
            </div>
          </div>
          <div className="relative">
            <div className="h-8 bg-white rounded-full border-4 border-[#8B6F47] overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[#FFD700] via-[#F4C430] to-[#DAA520] transition-all duration-500 ease-out flex items-center justify-end pr-3 shadow-lg"
                style={{ width: `${progress}%` }}
              >
                {progress > 10 && (
                  <span className="text-sm font-extrabold text-[#000000] drop-shadow-sm">
                    {activitiesCompleted.filter(Boolean).length} / {activities.length}
                  </span>
                )}
              </div>
            </div>
            {/* Egyptian decorative elements */}
            <div className="flex justify-between mt-2 px-1">
              {activities.map((_, idx) => (
                <div
                  key={idx}
                  className={`text-2xl transform transition-all duration-300 ${
                    activitiesCompleted[idx] ? 'scale-110' : 'scale-90 opacity-50'
                  }`}
                >
                  {activitiesCompleted[idx] ? '⭐' : '🔒'}
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
                👑 FASE 2 - EXPLORACIÓN: El Consejo del Faraón
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowNarrative(false)} className="text-[#0f1e30]">
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[#1e3a5f]">
            <p className="text-lg leading-relaxed">
              En las salas ocultas del templo de Karnak se encuentra un <strong>papiro sagrado</strong> que
              describe cómo estaba organizado el Imperio Egipcio. El joven faraón necesita recuperar esa
              información para gobernar con sabiduría.
            </p>
            <div className="bg-[#FFD700] p-6 rounded-lg border-2 border-[#B8860B]">
              <p className="text-xl font-bold text-[#0f1e30] text-center">
                🏺 <strong>DESAFÍO:</strong> Solo los equipos que logren descifrar las pistas del papiro,
                subrayar sus palabras sagradas y reconstruir la pirámide social podrán ser aceptados como
                miembros del <strong>Consejo del Faraón</strong>.
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

      {/* Activity Navigation */}
      <Card className="border-4 border-[#40E0D0] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#0f1e30]">Actividades del Consejo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {activities.map((activity, idx) => (
              <Button
                key={idx}
                onClick={() => setCurrentActivity(idx)}
                className={`py-6 text-sm font-bold transition-all ${
                  currentActivity === idx
                    ? 'bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#0f1e30]'
                    : activitiesCompleted[idx]
                    ? 'bg-green-600 text-white'
                    : 'bg-white border-2 border-[#C19A6B] text-[#0f1e30] hover:bg-[#E6D5B8]'
                }`}
              >
                {activitiesCompleted[idx] && '✓ '}
                {activity}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity 0: Reading */}
      {currentActivity === 0 && (
        <Card className="border-4 border-[#FFD700] bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#0f1e30]">
              📜 El Papiro Sagrado: Organización Social del Antiguo Egipto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#000000] text-lg leading-relaxed font-medium">
            <p>
              El <strong>Antiguo Egipto</strong> era una sociedad altamente jerarquizada. En la cima se
              encontraba el <strong>faraón</strong>, considerado un dios viviente y mediador entre los
              dioses y los hombres. Su palabra era ley absoluta.
            </p>
            <p>
              Bajo el faraón estaban los <strong>sacerdotes</strong> y <strong>nobles</strong>.
              Los sacerdotes administraban los templos y realizaban los rituales religiosos. Los nobles
              gobernaban las provincias en nombre del faraón.
            </p>
            <p>
              Los <strong>escribas</strong> eran altamente respetados porque dominaban la escritura
              jeroglífica. Llevaban los registros del reino, redactaban documentos oficiales y preservaban
              el conocimiento en <strong>papiro</strong>.
            </p>
            <p>
              Los <strong>artesanos y comerciantes</strong> fabricaban productos y los intercambiaban.
              Creaban joyas, cerámica, muebles y otros bienes.
            </p>
            <p>
              En la base estaban los <strong>campesinos</strong>, que representaban la mayoría de la población.
              Trabajaban la tierra durante la mayor parte del año.
            </p>
            <p>
              El gobierno egipcio era <strong>monárquico teocrático</strong>, con el faraón como hijo de los dioses.
              La economía se basaba en la <strong>agricultura</strong> gracias al Nilo.
            </p>
            <Button
              onClick={() => {
                const newCompleted = [...activitiesCompleted];
                newCompleted[0] = true;
                setActivitiesCompleted(newCompleted);
                setCurrentActivity(1);
              }}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#000000] text-xl py-7 font-extrabold mt-6 shadow-lg border-3 border-[#8B6F47]"
            >
              ✓ Lectura Completada - Continuar
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Activity 1: Drag and Drop Pyramid */}
      {currentActivity === 1 && (
        <Card className="border-4 border-[#FFD700] bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#0f1e30]">
              🔺 Arrastra y Organiza la Pirámide Social
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-[#000000] mb-6 font-bold text-center">
              Ordena las clases sociales desde arriba (más poder) hasta abajo (menos poder)
            </p>
            {pyramidOrder.map((classId, position) => {
              const classInfo = socialClasses.find(c => c.id === classId)!;
              return (
                <div
                  key={classId}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#E6BE8A] p-5 rounded-lg border-3 border-[#8B6F47] flex items-center justify-between shadow-md"
                  style={{ width: `${100 - position * 12}%`, margin: '0 auto' }}
                >
                  <span className="font-extrabold text-xl text-[#000000]">{classInfo.name}</span>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => movePyramidItem(position, 'up')}
                      disabled={position === 0}
                      className="bg-white text-[#000000] border-3 border-[#8B6F47] disabled:opacity-30 font-bold hover:bg-[#FFF8DC] shadow-sm"
                      size="sm"
                    >
                      ⬆️
                    </Button>
                    <Button
                      onClick={() => movePyramidItem(position, 'down')}
                      disabled={position === pyramidOrder.length - 1}
                      className="bg-white text-[#000000] border-3 border-[#8B6F47] disabled:opacity-30 font-bold hover:bg-[#FFF8DC] shadow-sm"
                      size="sm"
                    >
                      ⬇️
                    </Button>
                  </div>
                </div>
              );
            })}
            <Button
              onClick={checkPyramid}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#000000] text-xl py-7 font-extrabold shadow-lg border-3 border-[#8B6F47]"
            >
              Verificar Orden
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Activity 2: Crossword */}
      {currentActivity === 2 && (
        <Card className="border-4 border-[#FFD700] bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#0f1e30]">
              📝 Crucigrama: Completa las Palabras Clave
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {crosswordQuestions.map((clue, idx) => (
              <div key={idx} className="space-y-3 bg-[#FFF8DC] p-4 rounded-lg border-2 border-[#8B6F47]">
                <label className="text-lg font-bold text-[#000000] block">
                  {idx + 1}. {clue.question} <span className="text-[#8B4513]">({clue.hint})</span>
                </label>
                <Input
                  type="text"
                  value={crosswordAnswers[idx]}
                  onChange={(e) => {
                    const newAnswers = [...crosswordAnswers];
                    newAnswers[idx] = e.target.value;
                    setCrosswordAnswers(newAnswers);
                  }}
                  className="text-xl p-5 border-3 border-[#8B6F47] font-bold text-[#000000] uppercase placeholder:text-[#666666] bg-white shadow-sm"
                  placeholder="RESPUESTA"
                />
              </div>
            ))}
            <Button
              onClick={checkCrossword}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#000000] text-xl py-7 font-extrabold shadow-lg border-3 border-[#8B6F47]"
            >
              Verificar Respuestas
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Activity 3: Trivia */}
      {currentActivity === 3 && (
        <Card className="border-4 border-[#FFD700] bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#0f1e30]">
              🎯 Trivia: Demuestra tu Conocimiento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {triviaQuestions.map((q, qIdx) => (
              <div key={qIdx} className="space-y-3 bg-[#FFF8DC] p-5 rounded-lg border-2 border-[#8B6F47]">
                <h3 className="text-xl font-extrabold text-[#000000]">{qIdx + 1}. {q.question}</h3>
                <div className="grid gap-3">
                  {q.options.map((option, oIdx) => (
                    <Button
                      key={oIdx}
                      onClick={() => {
                        const newAnswers = [...triviaAnswers];
                        newAnswers[qIdx] = oIdx;
                        setTriviaAnswers(newAnswers);
                      }}
                      className={`text-left justify-start p-5 text-base font-bold shadow-sm ${
                        triviaAnswers[qIdx] === oIdx
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#000000] border-3 border-[#8B6F47] shadow-md'
                          : 'bg-white border-3 border-[#8B6F47] text-[#000000] hover:bg-[#FFF8DC]'
                      }`}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
            <Button
              onClick={checkTrivia}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#000000] text-xl py-7 font-extrabold shadow-lg border-3 border-[#8B6F47]"
            >
              Verificar Respuestas
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Complete Mission */}
      {activitiesCompleted.every(Boolean) && (
        <Card className="border-4 border-green-600 bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="text-6xl">👑</div>
            <h2 className="text-3xl font-serif font-bold text-green-900">
              ¡Has obtenido el Sello del Consejo del Faraón!
            </h2>
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
