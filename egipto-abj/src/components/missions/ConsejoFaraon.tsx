'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface ConsejoFaraonProps {
  onComplete: (score: number) => void;
}

const socialPyramid = [
  { level: 1, class: 'Faraón', description: 'Dios viviente, gobernante supremo' },
  { level: 2, class: 'Sacerdotes y Nobles', description: 'Administraban templos y gobernaban provincias' },
  { level: 3, class: 'Escribas', description: 'Llevaban registros y documentos oficiales' },
  { level: 4, class: 'Artesanos y Comerciantes', description: 'Fabricaban productos y comerciaban' },
  { level: 5, class: 'Campesinos', description: 'Mayoría de la población, trabajaban la tierra' },
];

const crosswordClues = [
  { question: 'Gobernante supremo de Egipto (6 letras)', answer: 'FARAON', id: 1 },
  { question: 'Sistema de escritura egipcio (12 letras)', answer: 'JEROGLIFICOS', id: 2 },
  { question: 'Material vegetal para escribir (6 letras)', answer: 'PAPIRO', id: 3 },
  { question: 'Estructura monumental funeraria (8 letras)', answer: 'PIRAMIDE', id: 4 },
];

const triviaQuestions = [
  {
    question: '¿Quién estaba en la cima de la pirámide social?',
    options: ['Sacerdotes', 'Faraón', 'Escribas', 'Nobles'],
    correct: 1,
  },
  {
    question: '¿Qué clase social llevaba los registros del reino?',
    options: ['Artesanos', 'Campesinos', 'Escribas', 'Comerciantes'],
    correct: 2,
  },
  {
    question: '¿Cuál era la actividad principal de los campesinos?',
    options: ['Comerciar', 'Escribir', 'Trabajar la tierra', 'Construir templos'],
    correct: 2,
  },
];

export function ConsejoFaraon({ onComplete }: ConsejoFaraonProps) {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [crosswordAnswers, setCrosswordAnswers] = useState<string[]>(Array(4).fill(''));
  const [triviaAnswers, setTriviaAnswers] = useState<number[]>(Array(3).fill(-1));
  const [activityCompleted, setActivityCompleted] = useState<boolean[]>(Array(4).fill(false));
  const [showNarrative, setShowNarrative] = useState(true);

  const activities = [
    'Lectura del Papiro',
    'Arrastrar y Soltar: Pirámide Social',
    'Crucigrama Egipcio',
    'Trivia del Consejo',
  ];

  // const handlePyramidDrop = (classIndex: number, position: number) => {
  //   const newOrder = [...pyramidOrder];
  //   newOrder[position] = classIndex;
  //   setPyramidOrder(newOrder);
  // };

  // const checkPyramidOrder = () => {
  //   const correct = pyramidOrder.every((val, idx) => val === idx);
  //   if (correct) {
  //     const newCompleted = [...activityCompleted];
  //     newCompleted[1] = true;
  //     setActivityCompleted(newCompleted);
  //   }
  //   return correct;
  // };

  const checkCrossword = () => {
    const allCorrect = crosswordClues.every(
      (clue, idx) => crosswordAnswers[idx].toUpperCase() === clue.answer
    );
    if (allCorrect) {
      const newCompleted = [...activityCompleted];
      newCompleted[2] = true;
      setActivityCompleted(newCompleted);
    }
    return allCorrect;
  };

  const checkTrivia = () => {
    const allCorrect = triviaQuestions.every(
      (q, idx) => triviaAnswers[idx] === q.correct
    );
    if (allCorrect) {
      const newCompleted = [...activityCompleted];
      newCompleted[3] = true;
      setActivityCompleted(newCompleted);
    }
    return allCorrect;
  };

  const handleComplete = () => {
    const score = activityCompleted.filter(Boolean).length * 25;
    onComplete(score);
  };

  const progress = (activityCompleted.filter(Boolean).length / activities.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <Card className="border-4 border-[#FFD700] bg-white">
        <CardContent className="pt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-bold text-[#0f1e30]">Progreso de la Misión</span>
            <span className="font-bold text-[#B8860B]">{Math.round(progress)}%</span>
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
                👑 MISIÓN 2: El Consejo del Faraón
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
              En las salas ocultas del templo de Karnak se encuentra un <strong>papiro sagrado</strong> que
              describe cómo estaba organizado el Imperio Egipcio. El joven faraón necesita recuperar esa
              información para gobernar con sabiduría.
            </p>
            <div className="bg-[#FFD700] p-6 rounded-lg border-2 border-[#B8860B]">
              <p className="text-xl font-bold text-[#0f1e30] text-center">
                Solo los equipos que logren descifrar las pistas del papiro, subrayar sus palabras sagradas
                y reconstruir la pirámide social podrán ser aceptados como miembros del
                <strong> Consejo del Faraón</strong>.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

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
                    : activityCompleted[idx]
                    ? 'bg-green-600 text-white'
                    : 'bg-white border-2 border-[#C19A6B] text-[#0f1e30] hover:bg-[#E6D5B8]'
                }`}
              >
                {activityCompleted[idx] && '✓ '}
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
              📜 El Papiro Sagrado de la Organización Social
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#1e3a5f] text-lg leading-relaxed">
            <p>
              El <strong>Antiguo Egipto</strong> era una sociedad altamente jerarquizada. En la cima se
              encontraba el <strong>faraón</strong>, considerado un dios viviente y mediador entre los
              dioses y los hombres. Su palabra era ley absoluta.
            </p>
            <p>
              Bajo el faraón estaban los <strong>sacerdotes</strong> y <strong>nobles</strong>.
              Los sacerdotes administraban los templos y realizaban los rituales religiosos. Los nobles
              gobernaban las provincias en nombre del faraón y controlaban grandes extensiones de tierra.
            </p>
            <p>
              Los <strong>escribas</strong> eran altamente respetados porque dominaban la escritura
              jeroglífica. Llevaban los registros del reino, redactaban documentos oficiales y preservaban
              el conocimiento. No todos podían ser escribas; era una profesión que requería años de estudio.
            </p>
            <p>
              Los <strong>artesanos y comerciantes</strong> fabricaban productos y los intercambiaban.
              Creaban joyas, cerámica, muebles y otros bienes. Algunos comerciantes viajaban a tierras
              lejanas para traer productos exóticos.
            </p>
            <p>
              En la base de la pirámide social estaban los <strong>campesinos</strong>, que representaban
              la mayoría de la población. Trabajaban la tierra durante la mayor parte del año y también
              participaban en la construcción de grandes obras cuando el Nilo inundaba los campos.
            </p>
            <Button
              onClick={() => {
                const newCompleted = [...activityCompleted];
                newCompleted[0] = true;
                setActivityCompleted(newCompleted);
                setCurrentActivity(1);
              }}
              className="w-full bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#0f1e30] text-lg py-6 font-bold"
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
              🔺 Reconstruye la Pirámide Social
            </CardTitle>
            <CardDescription className="text-base text-[#1e3a5f]">
              Ordena las clases sociales desde la cima (Faraón) hasta la base (Campesinos)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {socialPyramid.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-[#FFD700] to-[#E6BE8A] p-4 rounded-lg border-2 border-[#B8860B]"
                  style={{ width: `${100 - idx * 15}%`, margin: '0 auto' }}
                >
                  <div className="text-center">
                    <div className="font-bold text-lg text-[#0f1e30]">{item.class}</div>
                    <div className="text-sm text-[#1e3a5f]">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              onClick={() => {
                const newCompleted = [...activityCompleted];
                newCompleted[1] = true;
                setActivityCompleted(newCompleted);
              }}
              className="w-full bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#0f1e30] text-lg py-6 font-bold"
            >
              ✓ Completar Actividad
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Activity 2: Crossword */}
      {currentActivity === 2 && (
        <Card className="border-4 border-[#FFD700] bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#0f1e30]">
              📝 Crucigrama Egipcio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {crosswordClues.map((clue, idx) => (
              <div key={idx} className="space-y-2">
                <label className="text-base font-semibold text-[#0f1e30]">
                  {idx + 1}. {clue.question}
                </label>
                <input
                  type="text"
                  value={crosswordAnswers[idx]}
                  onChange={(e) => {
                    const newAnswers = [...crosswordAnswers];
                    newAnswers[idx] = e.target.value;
                    setCrosswordAnswers(newAnswers);
                  }}
                  className="w-full p-3 border-2 border-[#C19A6B] rounded-lg text-lg"
                  placeholder="Escribe tu respuesta"
                />
              </div>
            ))}
            <Button
              onClick={() => {
                if (checkCrossword()) {
                  alert('¡Excelente! Todas las respuestas son correctas.');
                } else {
                  alert('Algunas respuestas son incorrectas. Inténtalo de nuevo.');
                }
              }}
              className="w-full bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#0f1e30] text-lg py-6 font-bold"
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
              🎯 Trivia del Consejo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {triviaQuestions.map((q, qIdx) => (
              <div key={qIdx} className="space-y-3">
                <h3 className="text-lg font-bold text-[#0f1e30]">{q.question}</h3>
                <div className="grid gap-2">
                  {q.options.map((option, oIdx) => (
                    <Button
                      key={oIdx}
                      onClick={() => {
                        const newAnswers = [...triviaAnswers];
                        newAnswers[qIdx] = oIdx;
                        setTriviaAnswers(newAnswers);
                      }}
                      className={`text-left justify-start p-4 ${
                        triviaAnswers[qIdx] === oIdx
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
              onClick={() => {
                if (checkTrivia()) {
                  alert('¡Perfecto! Has completado la trivia correctamente.');
                } else {
                  alert('Algunas respuestas son incorrectas. Revisa tus elecciones.');
                }
              }}
              className="w-full bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#0f1e30] text-lg py-6 font-bold"
            >
              Verificar Respuestas
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Complete Mission */}
      {activityCompleted.every(Boolean) && (
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
