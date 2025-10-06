import { GameQuestion, GameType } from '@/types';

// Datos base para generar preguntas dinámicas
const hieroglyphicsData = [
  { symbol: '𓀀', meaning: 'hombre', category: 'persona' },
  { symbol: '𓁐', meaning: 'mujer', category: 'persona' },
  { symbol: '𓃀', meaning: 'buey', category: 'animal' },
  { symbol: '𓄀', meaning: 'ave', category: 'animal' },
  { symbol: '𓂀', meaning: 'ojo', category: 'cuerpo' },
  { symbol: '𓃒', meaning: 'cabra', category: 'animal' },
  { symbol: '𓆓', meaning: 'serpiente', category: 'animal' },
  { symbol: '𓇳', meaning: 'sol', category: 'naturaleza' },
  { symbol: '𓈖', meaning: 'agua', category: 'naturaleza' },
  { symbol: '𓊪', meaning: 'casa', category: 'construcción' },
];

const pharaohsData = [
  { name: 'Tutankamón', era: 'Imperio Nuevo', known: 'su tumba intacta', years: '1332-1323 a.C.' },
  { name: 'Ramsés II', era: 'Imperio Nuevo', known: 'sus grandes construcciones', years: '1279-1213 a.C.' },
  { name: 'Cleopatra VII', era: 'Periodo Ptolemaico', known: 'su alianza con Roma', years: '51-30 a.C.' },
  { name: 'Keops', era: 'Imperio Antiguo', known: 'la Gran Pirámide', years: '2589-2566 a.C.' },
  { name: 'Hatshepsut', era: 'Imperio Nuevo', known: 'ser mujer faraón', years: '1479-1458 a.C.' },
  { name: 'Akhenaton', era: 'Imperio Nuevo', known: 'el monoteísmo', years: '1353-1336 a.C.' },
];

const godsData = [
  { name: 'Ra', domain: 'Sol', symbol: '☀️', role: 'Dios supremo del sol' },
  { name: 'Anubis', domain: 'Muerte', symbol: '🐺', role: 'Dios de la momificación' },
  { name: 'Osiris', domain: 'Inframundo', symbol: '👑', role: 'Dios del inframundo' },
  { name: 'Isis', domain: 'Magia', symbol: '✨', role: 'Diosa de la magia y fertilidad' },
  { name: 'Horus', domain: 'Cielo', symbol: '🦅', role: 'Dios del cielo' },
  { name: 'Thoth', domain: 'Sabiduría', symbol: '📚', role: 'Dios de la sabiduría' },
  { name: 'Bastet', domain: 'Hogar', symbol: '🐱', role: 'Diosa protectora del hogar' },
];

const pyramidFacts = [
  { fact: 'La Gran Pirámide tiene', answer: '146 metros de altura', options: ['100 metros de altura', '146 metros de altura', '200 metros de altura'] },
  { fact: 'Las pirámides se construyeron con', answer: 'bloques de piedra caliza', options: ['ladrillos de barro', 'bloques de piedra caliza', 'madera'] },
  { fact: 'La Gran Pirámide se construyó en aproximadamente', answer: '20 años', options: ['5 años', '10 años', '20 años'] },
  { fact: 'Las pirámides servían como', answer: 'tumbas para faraones', options: ['templos', 'tumbas para faraones', 'palacios'] },
];

const dailyLifeFacts = [
  { topic: 'Alimentación', fact: 'Los egipcios comían principalmente pan y cerveza' },
  { topic: 'Vestimenta', fact: 'Usaban ropas de lino blanco por el calor' },
  { topic: 'Escritura', fact: 'Los escribas eran muy respetados en la sociedad' },
  { topic: 'Agricultura', fact: 'Dependían de las inundaciones del Nilo' },
];

// Función para mezclar arrays
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Generadores de preguntas para cada tipo de juego
export function generateHieroglyphicsQuestions(count: number = 5): GameQuestion[] {
  const questions: GameQuestion[] = [];
  const shuffledData = shuffle(hieroglyphicsData);

  for (let i = 0; i < Math.min(count, shuffledData.length); i++) {
    const item = shuffledData[i];
    const wrongOptions = shuffle(
      hieroglyphicsData.filter((h) => h.symbol !== item.symbol)
    ).slice(0, 3);

    questions.push({
      id: `hieroglyph-${i}`,
      type: 'multiple-choice',
      question: `¿Qué significa este jeroglífico: ${item.symbol}?`,
      options: shuffle([item.meaning, ...wrongOptions.map((w) => w.meaning)]),
      correctAnswer: item.meaning,
      points: 10,
      hint: `Es parte de la categoría: ${item.category}`,
    });
  }

  return questions;
}

export function generatePyramidsQuestions(count: number = 4): GameQuestion[] {
  const questions: GameQuestion[] = [];
  const shuffledFacts = shuffle(pyramidFacts);

  shuffledFacts.slice(0, count).forEach((fact, i) => {
    questions.push({
      id: `pyramid-${i}`,
      type: 'multiple-choice',
      question: fact.fact,
      options: shuffle(fact.options),
      correctAnswer: fact.answer,
      points: 15,
    });
  });

  return questions;
}

export function generatePharaohsQuestions(count: number = 5): GameQuestion[] {
  const questions: GameQuestion[] = [];
  const shuffledPharaohs = shuffle(pharaohsData);

  shuffledPharaohs.slice(0, count).forEach((pharaoh, i) => {
    const questionTypes = [
      {
        question: `¿En qué periodo gobernó ${pharaoh.name}?`,
        answer: pharaoh.era,
        options: shuffle([...new Set([pharaoh.era, ...pharaohsData.map((p) => p.era)])]).slice(0, 4),
      },
      {
        question: `¿Por qué es conocido ${pharaoh.name}?`,
        answer: pharaoh.known,
        options: shuffle([pharaoh.known, ...pharaohsData.filter((p) => p.name !== pharaoh.name).map((p) => p.known)]).slice(0, 4),
      },
    ];

    const selectedQuestion = questionTypes[Math.floor(Math.random() * questionTypes.length)];

    questions.push({
      id: `pharaoh-${i}`,
      type: 'multiple-choice',
      question: selectedQuestion.question,
      options: selectedQuestion.options,
      correctAnswer: selectedQuestion.answer,
      points: 15,
      hint: `Gobernó durante ${pharaoh.years}`,
    });
  });

  return questions;
}

export function generateGodsQuestions(count: number = 5): GameQuestion[] {
  const questions: GameQuestion[] = [];
  const shuffledGods = shuffle(godsData);

  shuffledGods.slice(0, count).forEach((god, i) => {
    const questionTypes = [
      {
        question: `¿Cuál era el dominio de ${god.name}?`,
        answer: god.domain,
        options: shuffle([...new Set([god.domain, ...godsData.map((g) => g.domain)])]).slice(0, 4),
      },
      {
        question: `¿Qué dios/diosa tiene el símbolo ${god.symbol}?`,
        answer: god.name,
        options: shuffle([god.name, ...godsData.filter((g) => g.name !== god.name).map((g) => g.name)]).slice(0, 4),
      },
    ];

    const selectedQuestion = questionTypes[Math.floor(Math.random() * questionTypes.length)];

    questions.push({
      id: `god-${i}`,
      type: 'multiple-choice',
      question: selectedQuestion.question,
      options: selectedQuestion.options,
      correctAnswer: selectedQuestion.answer,
      points: 12,
      hint: god.role,
    });
  });

  return questions;
}

export function generateDailyLifeQuestions(count: number = 4): GameQuestion[] {
  const questions: GameQuestion[] = [];
  const shuffledFacts = shuffle(dailyLifeFacts);

  shuffledFacts.slice(0, count).forEach((item, i) => {
    questions.push({
      id: `daily-${i}`,
      type: 'fill-blank',
      question: `Sobre ${item.topic}: ${item.fact.split(' ').slice(0, -3).join(' ')} ___`,
      correctAnswer: item.fact.split(' ').slice(-3).join(' '),
      points: 10,
    });
  });

  return questions;
}

export function generateMummificationQuestions(): GameQuestion[] {
  const steps = [
    'Extraer los órganos internos',
    'Secar el cuerpo con natrón',
    'Envolver el cuerpo con vendas',
    'Colocar amuletos protectores',
    'Poner el cuerpo en el sarcófago',
  ];

  return [
    {
      id: 'mummy-order',
      type: 'ordering',
      question: 'Ordena los pasos del proceso de momificación',
      correctAnswer: steps,
      points: 20,
      hint: 'Piensa en el orden lógico del proceso',
    },
  ];
}

// Función principal para generar preguntas según el tipo de juego
export function generateGameQuestions(gameType: GameType, count?: number): GameQuestion[] {
  switch (gameType) {
    case 'hieroglyphics':
      return generateHieroglyphicsQuestions(count);
    case 'pyramids':
      return generatePyramidsQuestions(count);
    case 'pharaohs':
      return generatePharaohsQuestions(count);
    case 'gods':
      return generateGodsQuestions(count);
    case 'daily-life':
      return generateDailyLifeQuestions(count);
    case 'mummification':
      return generateMummificationQuestions();
    default:
      return [];
  }
}
