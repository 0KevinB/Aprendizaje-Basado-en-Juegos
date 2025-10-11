import { GameQuestion, GameType } from '@/types';

// Función para mezclar arrays
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ============================================================================
// MISIÓN 1 - AVENTURA/EXPERIENCIA: El secreto del Nilo
// Actividad: Alfabeto egipcio (escribir nombre) + 4 preguntas reflexivas
// ============================================================================
export function generateSecretoNiloQuestions(count: number = 5): GameQuestion[] {
  const questions: GameQuestion[] = [
    // Actividad 1: Escribir nombre con alfabeto egipcio (tipo fill-blank)
    {
      id: 'alfabeto-egipcio',
      type: 'fill-blank',
      question: 'Usando el alfabeto egipcio, escribe tu nombre de equipo en jeroglíficos y explica qué representa dentro de la cultura del Antiguo Egipto',
      correctAnswer: '', // Se valida manualmente
      points: 25,
      hint: 'Consulta la tabla del alfabeto egipcio proporcionada',
    },
    // Las 4 preguntas EXACTAS de la planificación ERCA - EXPERIENCIA
    {
      id: 'experiencia-1',
      type: 'multiple-choice',
      question: '¿Por qué creen que una gran civilización pudo surgir en medio del desierto alrededor del río Nilo?',
      options: [
        'Porque el desierto tenía mucho oro',
        'Porque el Nilo inundaba los campos dejando barro fértil que permitía cosechas abundantes',
        'Porque había muchas montañas',
        'Porque estaba cerca del mar'
      ],
      correctAnswer: 'Porque el Nilo inundaba los campos dejando barro fértil que permitía cosechas abundantes',
      points: 20,
      hint: 'El Nilo era la clave de la vida y la riqueza',
    },
    {
      id: 'experiencia-2',
      type: 'multiple-choice',
      question: 'Al observar las pirámides, ¿qué piensan que motivaba a los egipcios a construir obras tan enormes?',
      options: [
        'Solo querían mostrar riqueza',
        'El deseo de trascender, símbolos de poder y eternidad, homenaje a sus dioses',
        'Para guardar alimentos',
        'Como refugios en caso de guerra'
      ],
      correctAnswer: 'El deseo de trascender, símbolos de poder y eternidad, homenaje a sus dioses',
      points: 20,
      hint: 'Cada piedra colocada era una promesa de vida eterna para su rey',
    },
    {
      id: 'experiencia-3',
      type: 'multiple-choice',
      question: '¿Qué sentimientos o ideas creen que despertaba el faraón en su pueblo al ser considerado un "dios en la tierra"?',
      options: [
        'Solo miedo',
        'Respeto, miedo y devoción como mediador entre el cielo y los hombres',
        'Indiferencia',
        'Odio y rechazo'
      ],
      correctAnswer: 'Respeto, miedo y devoción como mediador entre el cielo y los hombres',
      points: 20,
      hint: 'Los campesinos lo veían como protector; los sacerdotes lo veneraban',
    },
    {
      id: 'experiencia-4',
      type: 'multiple-choice',
      question: '¿Qué nos dice la práctica de la momificación sobre la forma en que los egipcios entendían la vida y la muerte?',
      options: [
        'Creían que la muerte era el final',
        'Creían que la vida no terminaba con la muerte, el alma viajaba a otro mundo',
        'Solo era una costumbre sin significado',
        'Solo momificaban animales'
      ],
      correctAnswer: 'Creían que la vida no terminaba con la muerte, el alma viajaba a otro mundo',
      points: 20,
      hint: 'El cuerpo debía conservarse intacto para que el alma pudiera viajar',
    },
  ];

  return questions.slice(0, count);
}

// ============================================================================
// MISIÓN 2 - EXPLORACIÓN/REFLEXIÓN: El consejo del Faraón
// Actividades: Arrastrar y soltar, trivias, ordenación, crucigrama
// ============================================================================
export function generateConsejoFaraonQuestions(count: number = 15): GameQuestion[] {
  const questions: GameQuestion[] = [
    // ACTIVIDAD 1: ARRASTRAR Y SOLTAR - Pirámide Social
    {
      id: 'piramide-social',
      type: 'drag-drop',
      question: 'Arrastra y organiza la estructura social egipcia de arriba (más poder) hacia abajo (menos poder)',
      options: [
        'Faraón (rey y dios viviente)',
        'Sacerdotes',
        'Escribas',
        'Artesanos y mercaderes',
        'Campesinos'
      ],
      correctAnswer: [
        'Faraón (rey y dios viviente)',
        'Sacerdotes',
        'Escribas',
        'Artesanos y mercaderes',
        'Campesinos'
      ],
      points: 25,
      hint: 'El faraón está en la cúspide de la pirámide social',
    },

    // ACTIVIDAD 2: ORDENACIÓN DE IDEAS - Etapas de Egipto
    {
      id: 'ordenacion-etapas',
      type: 'ordering',
      question: 'Ordena cronológicamente las etapas de la civilización egipcia',
      options: [
        'Imperio Antiguo',
        'Imperio Medio',
        'Imperio Nuevo',
        'Decadencia'
      ],
      correctAnswer: [
        'Imperio Antiguo',
        'Imperio Medio',
        'Imperio Nuevo',
        'Decadencia'
      ],
      points: 20,
    },

    // ACTIVIDAD 3: CRUCIGRAMA - Palabras clave del texto
    {
      id: 'crucigrama-1',
      type: 'fill-blank',
      question: 'El ____ era considerado un dios en la tierra y representaba la máxima autoridad política y militar',
      correctAnswer: 'faraón',
      points: 10,
    },
    {
      id: 'crucigrama-2',
      type: 'fill-blank',
      question: 'Los ____ administraban los templos y eran la máxima autoridad religiosa',
      correctAnswer: 'sacerdotes',
      points: 10,
    },
    {
      id: 'crucigrama-3',
      type: 'fill-blank',
      question: 'Los ____ formaban escuelas y se dedicaban a la enseñanza',
      correctAnswer: 'escribas',
      points: 10,
    },
    {
      id: 'crucigrama-4',
      type: 'fill-blank',
      question: 'El material sobre el que escribían los egipcios era el ____',
      correctAnswer: 'papiro',
      points: 10,
    },
    {
      id: 'crucigrama-5',
      type: 'fill-blank',
      question: 'La escritura ____ era pictográfica y la primera conocida en Egipto',
      correctAnswer: 'jeroglífica',
      points: 10,
    },
    {
      id: 'crucigrama-6',
      type: 'fill-blank',
      question: 'El gobierno egipcio era de tipo ____ teocrático',
      correctAnswer: 'monárquico',
      points: 10,
    },

    // ACTIVIDAD 4: TRIVIAS sobre estructura social y aportes
    {
      id: 'trivia-1',
      type: 'multiple-choice',
      question: '¿Cuál era la base de la economía egipcia según el texto?',
      options: [
        'El comercio de oro',
        'La agricultura (el Nilo), pesca y planta del papiro',
        'La guerra',
        'La minería'
      ],
      correctAnswer: 'La agricultura (el Nilo), pesca y planta del papiro',
      points: 15,
    },
    {
      id: 'trivia-2',
      type: 'multiple-choice',
      question: '¿Dónde vivían los artesanos, mercaderes y campesinos?',
      options: [
        'En palacios',
        'En templos',
        'En ciudades o aldeas pequeñas',
        'En pirámides'
      ],
      correctAnswer: 'En ciudades o aldeas pequeñas',
      points: 10,
    },
    {
      id: 'trivia-3',
      type: 'multiple-choice',
      question: '¿Para qué se utilizaba el papiro además de escribir?',
      options: [
        'Solo para escribir',
        'Construir embarcaciones, elaborar cestos y sandalias',
        'Como alimento',
        'Para hacer ropa'
      ],
      correctAnswer: 'Construir embarcaciones, elaborar cestos y sandalias',
      points: 15,
    },
    {
      id: 'trivia-4',
      type: 'multiple-choice',
      question: '¿Qué tipo de gobierno tenía Egipto?',
      options: [
        'Democracia',
        'Monárquico teocrático (el faraón hijo de los dioses)',
        'República',
        'Anarquía'
      ],
      correctAnswer: 'Monárquico teocrático (el faraón hijo de los dioses)',
      points: 15,
    },
    {
      id: 'trivia-5',
      type: 'multiple-choice',
      question: '¿Cuántas etapas principales tuvo la civilización egipcia?',
      options: [
        'Una',
        'Tres (Imperio Antiguo, Imperio Medio, Imperio Nuevo)',
        'Cinco',
        'Dos'
      ],
      correctAnswer: 'Tres (Imperio Antiguo, Imperio Medio, Imperio Nuevo)',
      points: 15,
    },

    // ACTIVIDAD: ORGANIZADOR GRÁFICO (implementado como matching)
    {
      id: 'organizador-aportes',
      type: 'matching',
      question: 'Relaciona cada aporte egipcio con su descripción',
      options: [
        'Escritura jeroglífica',
        'Papiro',
        'Agricultura',
        'Navegación',
        'Gobierno teocrático'
      ],
      correctAnswer: [
        'Primera escritura pictográfica conocida en Egipto',
        'Material para escribir y construir embarcaciones',
        'Base de la economía gracias al Nilo',
        'Sistema de transporte con barcos de vela y remo',
        'El faraón como hijo de los dioses'
      ],
      points: 20,
    },
  ];

  return shuffle(questions).slice(0, count);
}

// ============================================================================
// MISIÓN 3 - DOMINIO/CONCEPTUALIZACIÓN: Los Secretos del Nilo
// Actividades: Video + Cofres digitales (quizzes interactivos)
// ============================================================================
export function generateSecretosNiloQuestions(count: number = 10): GameQuestion[] {
  // Cofres digitales: preguntas con texto e imágenes basadas en el video
  const questions: GameQuestion[] = [
    // COFRE 1: Importancia del Nilo
    {
      id: 'cofre-nilo-1',
      type: 'multiple-choice',
      question: '🎁 COFRE 1: ¿Qué importancia tuvo el río Nilo para el surgimiento y desarrollo de Egipto?',
      options: [
        'Solo servía para beber agua',
        'Fue fundamental: recurso económico (agricultura, pesca, papiro), transporte, barro fértil de inundaciones',
        'No tuvo importancia',
        'Solo era decorativo'
      ],
      correctAnswer: 'Fue fundamental: recurso económico (agricultura, pesca, papiro), transporte, barro fértil de inundaciones',
      points: 30,
      hint: 'El ciclo de trabajo: labrar después de la crecida, sembrar en limo, cosechar',
    },
    {
      id: 'cofre-nilo-2',
      type: 'multiple-choice',
      question: '🎁 COFRE 1: ¿Qué dejaban las inundaciones anuales del Nilo?',
      options: [
        'Arena',
        'Barro fértil para la agricultura',
        'Piedras',
        'Sal'
      ],
      correctAnswer: 'Barro fértil para la agricultura',
      points: 15,
    },
    {
      id: 'cofre-nilo-3',
      type: 'multiple-choice',
      question: '🎁 COFRE 1: ¿Cuál era el ciclo de trabajo agrícola regular?',
      options: [
        'Sembrar, regar, cosechar',
        'Labrar después de la crecida del río, sembrar en limo depositado, cosechar',
        'Solo cosechar',
        'No había ciclo regular'
      ],
      correctAnswer: 'Labrar después de la crecida del río, sembrar en limo depositado, cosechar',
      points: 20,
    },

    // COFRE 2: Pirámides y Momificaciones
    {
      id: 'cofre-piramides-1',
      type: 'multiple-choice',
      question: '🎁 COFRE 2: ¿Qué significado tenían las pirámides para los egipcios?',
      options: [
        'Solo eran decoración',
        'Tumbas monumentales y símbolos de eternidad para que el faraón alcanzara la vida eterna',
        'Eran almacenes de alimentos',
        'No tenían significado especial'
      ],
      correctAnswer: 'Tumbas monumentales y símbolos de eternidad para que el faraón alcanzara la vida eterna',
      points: 30,
    },
    {
      id: 'cofre-piramides-2',
      type: 'multiple-choice',
      question: '🎁 COFRE 2: ¿Por qué momificaban a sus muertos?',
      options: [
        'Por tradición sin sentido',
        'Para conservar el cuerpo intacto y permitir que el alma viajara a la vida eterna',
        'Solo por higiene',
        'Para estudiarlos'
      ],
      correctAnswer: 'Para conservar el cuerpo intacto y permitir que el alma viajara a la vida eterna',
      points: 30,
    },
    {
      id: 'cofre-piramides-3',
      type: 'fill-blank',
      question: '🎁 COFRE 2: Los egipcios creían en la vida ____ después de la muerte',
      correctAnswer: 'eterna',
      points: 15,
    },

    // COFRE 3: Avances científicos y culturales
    {
      id: 'cofre-avances-1',
      type: 'multiple-choice',
      question: '🎁 COFRE 3: ¿Qué avances en medicina desarrollaron los egipcios?',
      options: [
        'Ninguno',
        'Técnicas de momificación, conocimientos de anatomía, métodos como inhalaciones',
        'Solo cirugías modernas',
        'Vacunas'
      ],
      correctAnswer: 'Técnicas de momificación, conocimientos de anatomía, métodos como inhalaciones',
      points: 25,
    },
    {
      id: 'cofre-avances-2',
      type: 'multiple-choice',
      question: '🎁 COFRE 3: ¿Qué permitieron los cálculos matemáticos y observaciones astronómicas?',
      options: [
        'Nada importante',
        'Medir el periodo solar de 365 días y dividir el día en 24 horas',
        'Solo contar personas',
        'Predecir el clima'
      ],
      correctAnswer: 'Medir el periodo solar de 365 días y dividir el día en 24 horas',
      points: 25,
    },
    {
      id: 'cofre-avances-3',
      type: 'multiple-choice',
      question: '🎁 COFRE 3: ¿Qué minerales distinguieron los egipcios?',
      options: [
        'Solo hierro',
        'Oro, plata, aleación de cobre, bronce, plomo, hierro',
        'Diamantes',
        'Uranio'
      ],
      correctAnswer: 'Oro, plata, aleación de cobre, bronce, plomo, hierro',
      points: 20,
    },
    {
      id: 'cofre-avances-4',
      type: 'multiple-choice',
      question: '🎁 COFRE 3: ¿Qué artes desarrollaron los egipcios?',
      options: [
        'Solo pintura',
        'Pintura, escultura sobre piedra (ultratumba), arquitectura (pirámides, templos, tumbas)',
        'Solo música',
        'Teatro moderno'
      ],
      correctAnswer: 'Pintura, escultura sobre piedra (ultratumba), arquitectura (pirámides, templos, tumbas)',
      points: 20,
    },
  ];

  return questions.slice(0, count);
}

// ============================================================================
// MISIÓN 4 - CONQUISTA/APLICACIÓN: El Gran Reto del Nilo
// Actividad: Juego estilo serpientes y escaleras con preguntas y respuestas
// ============================================================================
export function generateGranRetoNiloQuestions(count: number = 20): GameQuestion[] {
  const questions: GameQuestion[] = [
    // PREGUNTAS DEL JUEGO SERPIENTES Y ESCALERAS
    // (Integración de toda la historia de Egipto y su legado cultural)

    // Geografía y Nilo
    {
      id: 'serpientes-1',
      type: 'multiple-choice',
      question: '🎲 ¿Dónde se formaron las primeras poblaciones del Antiguo Egipto?',
      options: [
        'En las montañas',
        'En las orillas del río Nilo',
        'En el desierto',
        'En el mar'
      ],
      correctAnswer: 'En las orillas del río Nilo',
      points: 10,
    },
    {
      id: 'serpientes-2',
      type: 'multiple-choice',
      question: '🎲 ¿Qué permitía el Nilo para el desarrollo de Egipto?',
      options: [
        'Solo transporte',
        'Agricultura (barro fértil), pesca, papiro y transporte',
        'Solo pesca',
        'Nada importante'
      ],
      correctAnswer: 'Agricultura (barro fértil), pesca, papiro y transporte',
      points: 15,
    },

    // Periodos históricos
    {
      id: 'serpientes-3',
      type: 'multiple-choice',
      question: '🎲 ¿Cuándo se inició el periodo de esplendor de la civilización egipcia?',
      options: [
        'En el año 1000 a.C.',
        'A partir del milenio a.C.',
        'En el año 2000 d.C.',
        'Hace 100 años'
      ],
      correctAnswer: 'A partir del milenio a.C.',
      points: 10,
    },
    {
      id: 'serpientes-4',
      type: 'ordering',
      question: '🎲 Ordena las etapas de la civilización egipcia',
      options: [
        'Imperio Antiguo',
        'Imperio Medio',
        'Imperio Nuevo',
        'Decadencia'
      ],
      correctAnswer: [
        'Imperio Antiguo',
        'Imperio Medio',
        'Imperio Nuevo',
        'Decadencia'
      ],
      points: 20,
    },

    // Estructura social
    {
      id: 'serpientes-5',
      type: 'multiple-choice',
      question: '🎲 ¿Qué representaba el faraón en la sociedad egipcia?',
      options: [
        'Solo un líder militar',
        'Un dios en la tierra, máxima autoridad política, militar y religiosa',
        'Un comerciante rico',
        'Un escriba importante'
      ],
      correctAnswer: 'Un dios en la tierra, máxima autoridad política, militar y religiosa',
      points: 15,
    },
    {
      id: 'serpientes-6',
      type: 'drag-drop',
      question: '🎲 Organiza la pirámide social de mayor a menor jerarquía',
      options: [
        'Faraón',
        'Sacerdotes',
        'Escribas',
        'Artesanos',
        'Campesinos'
      ],
      correctAnswer: [
        'Faraón',
        'Sacerdotes',
        'Escribas',
        'Artesanos',
        'Campesinos'
      ],
      points: 20,
    },

    // Economía y agricultura
    {
      id: 'serpientes-7',
      type: 'fill-blank',
      question: '🎲 La base de la economía egipcia era la ____ gracias al río Nilo',
      correctAnswer: 'agricultura',
      points: 10,
    },
    {
      id: 'serpientes-8',
      type: 'multiple-choice',
      question: '🎲 ¿Cuál era el ciclo de trabajo agrícola?',
      options: [
        'Solo sembrar y cosechar',
        'Labrar después de la crecida, sembrar en limo, cosechar',
        'Regar constantemente',
        'No había ciclo definido'
      ],
      correctAnswer: 'Labrar después de la crecida, sembrar en limo, cosechar',
      points: 15,
    },

    // Escritura y cultura
    {
      id: 'serpientes-9',
      type: 'fill-blank',
      question: '🎲 La escritura ____ era la primera forma de escritura conocida en Egipto',
      correctAnswer: 'jeroglífica',
      points: 10,
    },
    {
      id: 'serpientes-10',
      type: 'multiple-choice',
      question: '🎲 ¿Qué era el papiro y para qué se usaba?',
      options: [
        'Solo para escribir',
        'Planta del Nilo usada para escribir, hacer embarcaciones, cestos y sandalias',
        'Un tipo de piedra',
        'Un alimento'
      ],
      correctAnswer: 'Planta del Nilo usada para escribir, hacer embarcaciones, cestos y sandalias',
      points: 15,
    },

    // Tecnología
    {
      id: 'serpientes-11',
      type: 'multiple-choice',
      question: '🎲 ¿Qué sistema de transporte desarrollaron?',
      options: [
        'Carros de caballos',
        'Navegación con barcos de vela y remo por el Nilo',
        'Camellos',
        'No tenían transporte'
      ],
      correctAnswer: 'Navegación con barcos de vela y remo por el Nilo',
      points: 15,
    },
    {
      id: 'serpientes-12',
      type: 'multiple-choice',
      question: '🎲 ¿Qué minerales distinguieron y trabajaron los egipcios?',
      options: [
        'Solo oro',
        'Oro, plata, cobre, bronce, plomo y hierro',
        'Diamantes',
        'Ninguno'
      ],
      correctAnswer: 'Oro, plata, cobre, bronce, plomo y hierro',
      points: 10,
    },

    // Ciencia
    {
      id: 'serpientes-13',
      type: 'multiple-choice',
      question: '🎲 ¿Qué logro astronómico alcanzaron los egipcios?',
      options: [
        'Viajes espaciales',
        'Calendario solar de 365 días y división del día en 24 horas',
        'Telescopios',
        'Nada importante'
      ],
      correctAnswer: 'Calendario solar de 365 días y división del día en 24 horas',
      points: 20,
    },
    {
      id: 'serpientes-14',
      type: 'multiple-choice',
      question: '🎲 ¿Qué avances médicos desarrollaron?',
      options: [
        'Vacunas',
        'Momificación, anatomía, inhalaciones y otros tratamientos',
        'Cirugía láser',
        'Ninguno'
      ],
      correctAnswer: 'Momificación, anatomía, inhalaciones y otros tratamientos',
      points: 15,
    },

    // Religión y creencias
    {
      id: 'serpientes-15',
      type: 'multiple-choice',
      question: '🎲 ¿Qué tipo de religión practicaban los egipcios?',
      options: [
        'Monoteísta',
        'Politeísta (múltiples dioses: Ra, Horus, Isis, Osiris, etc.)',
        'Ateísmo',
        'Budismo'
      ],
      correctAnswer: 'Politeísta (múltiples dioses: Ra, Horus, Isis, Osiris, etc.)',
      points: 10,
    },
    {
      id: 'serpientes-16',
      type: 'multiple-choice',
      question: '🎲 ¿Por qué momificaban a los muertos?',
      options: [
        'Por higiene',
        'Creían en la vida eterna y el cuerpo debía conservarse para el viaje del alma',
        'Solo tradición',
        'Para estudiarlos'
      ],
      correctAnswer: 'Creían en la vida eterna y el cuerpo debía conservarse para el viaje del alma',
      points: 15,
    },

    // Arte y arquitectura
    {
      id: 'serpientes-17',
      type: 'multiple-choice',
      question: '🎲 ¿Qué construcciones arquitectónicas destacan en Egipto?',
      options: [
        'Solo casas',
        'Pirámides, templos y tumbas monumentales',
        'Rascacielos',
        'Puentes'
      ],
      correctAnswer: 'Pirámides, templos y tumbas monumentales',
      points: 15,
    },
    {
      id: 'serpientes-18',
      type: 'multiple-choice',
      question: '🎲 ¿Qué significaban las pirámides?',
      options: [
        'Solo tumbas',
        'Símbolos de poder, eternidad y lugares para alcanzar la vida eterna',
        'Almacenes',
        'Fortalezas'
      ],
      correctAnswer: 'Símbolos de poder, eternidad y lugares para alcanzar la vida eterna',
      points: 20,
    },

    // Legado cultural
    {
      id: 'serpientes-19',
      type: 'fill-blank',
      question: '🎲 Egipto es considerado la ____ de la humanidad por sus aportes',
      correctAnswer: 'cuna',
      points: 15,
    },
    {
      id: 'serpientes-20',
      type: 'matching',
      question: '🎲 Relaciona cada aporte egipcio con su área',
      options: [
        'Calendario de 365 días',
        'Jeroglíficos',
        'Momificación',
        'Pirámides',
        'Navegación por el Nilo'
      ],
      correctAnswer: [
        'Astronomía y matemáticas',
        'Escritura y cultura',
        'Medicina y religión',
        'Arquitectura y arte',
        'Tecnología y transporte'
      ],
      points: 25,
    },
  ];

  return shuffle(questions).slice(0, count);
}

// ============================================================================
// MESOPOTAMIA - MISIÓN 1: Mapa de los ríos eternos (AVENTURA)
// Actividad: Rompecabezas + ubicación geográfica + preguntas reflexivas
// ============================================================================
export function generateMapaRiosEternosQuestions(count: number = 5): GameQuestion[] {
  const questions: GameQuestion[] = [
    {
      id: 'ubicacion-mesopotamia',
      type: 'fill-blank',
      question: 'Usando el mapa armado, marca correctamente la ubicación de Mesopotamia y dibuja los ríos Tigris y Éufrates. Identifica las ciudades: Uruk, Lagash y Ur.',
      correctAnswer: '', // Validación manual
      points: 30,
      hint: 'Mesopotamia significa "tierra entre ríos"',
    },
    {
      id: 'aventura-meso-1',
      type: 'multiple-choice',
      question: '¿Por qué crees que los ríos Tigris y Éufrates fueron clave para el surgimiento de Mesopotamia?',
      options: [
        'Porque eran bonitos',
        'Porque proporcionaban agua para riego, transporte y barro fértil para la agricultura',
        'Porque había muchos peces',
        'Porque separaban territorios'
      ],
      correctAnswer: 'Porque proporcionaban agua para riego, transporte y barro fértil para la agricultura',
      points: 20,
      hint: 'El agua era vida en medio del desierto',
    },
    {
      id: 'aventura-meso-2',
      type: 'multiple-choice',
      question: '¿Qué permitió que Mesopotamia fuera llamada "cuna de la humanidad"?',
      options: [
        'Por tener muchas pirámides',
        'Por desarrollar la primera escritura, leyes codificadas y ciudades organizadas',
        'Por ser muy grande',
        'Por tener oro'
      ],
      correctAnswer: 'Por desarrollar la primera escritura, leyes codificadas y ciudades organizadas',
      points: 20,
      hint: 'Fue pionera en muchos aspectos de la civilización',
    },
    {
      id: 'aventura-meso-3',
      type: 'multiple-choice',
      question: '¿Qué papel jugaban las ciudades-estado como Uruk, Ur y Lagash en Mesopotamia?',
      options: [
        'Eran solo pueblos pequeños',
        'Eran centros políticos, económicos y religiosos independientes',
        'No tenían importancia',
        'Eran colonias de Egipto'
      ],
      correctAnswer: 'Eran centros políticos, económicos y religiosos independientes',
      points: 20,
      hint: 'Cada ciudad tenía su propio gobierno y dios protector',
    },
  ];

  return questions.slice(0, count);
}

// ============================================================================
// MESOPOTAMIA - MISIÓN 2: Los guardianes del saber (EXPLORACIÓN)
// Actividad: Clasificación de reliquias en categorías (política, economía, cultura)
// ============================================================================
export function generateGuardianesSaberQuestions(count: number = 15): GameQuestion[] {
  const questions: GameQuestion[] = [
    // Clasificación: POLÍTICA
    {
      id: 'clasificacion-politica-1',
      type: 'multiple-choice',
      question: '📜 Clasifica: El Código de Hammurabi pertenece a la categoría de...',
      options: ['Política', 'Economía', 'Cultura', 'Ninguna'],
      correctAnswer: 'Política',
      points: 15,
      hint: 'Es un conjunto de leyes y normas de gobierno',
    },
    {
      id: 'clasificacion-politica-2',
      type: 'multiple-choice',
      question: '📜 Clasifica: El gobierno teocrático (rey como representante divino) es...',
      options: ['Política', 'Economía', 'Cultura', 'Ninguna'],
      correctAnswer: 'Política',
      points: 15,
    },
    {
      id: 'clasificacion-politica-3',
      type: 'multiple-choice',
      question: '📜 Clasifica: Sargón de Acad y la unificación del imperio es...',
      options: ['Política', 'Economía', 'Cultura', 'Ninguna'],
      correctAnswer: 'Política',
      points: 15,
      hint: 'Fue el primer gran conquistador mesopotámico',
    },

    // Clasificación: ECONOMÍA
    {
      id: 'clasificacion-economia-1',
      type: 'multiple-choice',
      question: '💰 Clasifica: Los canales de irrigación pertenecen a...',
      options: ['Política', 'Economía', 'Cultura', 'Ninguna'],
      correctAnswer: 'Economía',
      points: 15,
      hint: 'Permitían la agricultura y el comercio',
    },
    {
      id: 'clasificacion-economia-2',
      type: 'multiple-choice',
      question: '💰 Clasifica: El comercio en mercados y el trueque es...',
      options: ['Política', 'Economía', 'Cultura', 'Ninguna'],
      correctAnswer: 'Economía',
      points: 15,
    },
    {
      id: 'clasificacion-economia-3',
      type: 'multiple-choice',
      question: '💰 Clasifica: La agricultura de cebada y trigo es...',
      options: ['Política', 'Economía', 'Cultura', 'Ninguna'],
      correctAnswer: 'Economía',
      points: 15,
    },
    {
      id: 'clasificacion-economia-4',
      type: 'fill-blank',
      question: '💰 La base de la economía mesopotámica era la ____ gracias a los ríos',
      correctAnswer: 'agricultura',
      points: 10,
    },

    // Clasificación: CULTURA
    {
      id: 'clasificacion-cultura-1',
      type: 'multiple-choice',
      question: '🎨 Clasifica: La escritura cuneiforme pertenece a...',
      options: ['Política', 'Economía', 'Cultura', 'Ninguna'],
      correctAnswer: 'Cultura',
      points: 15,
      hint: 'Es un sistema de escritura en tablillas de arcilla',
    },
    {
      id: 'clasificacion-cultura-2',
      type: 'multiple-choice',
      question: '🎨 Clasifica: Los zigurats (templos escalonados) son...',
      options: ['Política', 'Economía', 'Cultura', 'Ninguna'],
      correctAnswer: 'Cultura',
      points: 15,
    },
    {
      id: 'clasificacion-cultura-3',
      type: 'multiple-choice',
      question: '🎨 Clasifica: La Epopeya de Gilgamesh es...',
      options: ['Política', 'Economía', 'Cultura', 'Ninguna'],
      correctAnswer: 'Cultura',
      points: 15,
      hint: 'Es el primer poema épico de la humanidad',
    },
    {
      id: 'clasificacion-cultura-4',
      type: 'fill-blank',
      question: '🎨 Los ____ eran escribas que dominaban la escritura cuneiforme',
      correctAnswer: 'escribas',
      points: 10,
    },
    {
      id: 'clasificacion-cultura-5',
      type: 'multiple-choice',
      question: '🎨 ¿Qué dioses principales adoraban en Mesopotamia?',
      options: [
        'Ra y Osiris',
        'Marduk, Ishtar (Inanna), Anu y Enlil',
        'Zeus y Hera',
        'Ninguno'
      ],
      correctAnswer: 'Marduk, Ishtar (Inanna), Anu y Enlil',
      points: 20,
    },

    // Frase final
    {
      id: 'frase-legado',
      type: 'fill-blank',
      question: 'Completa la frase del legado: "El legado eterno de ____"',
      correctAnswer: 'Mesopotamia',
      points: 25,
    },
  ];

  return shuffle(questions).slice(0, count);
}

// ============================================================================
// MESOPOTAMIA - MISIÓN 3: La línea del tiempo perdida (DOMINIO)
// Actividad: Dominó cronológico con eventos históricos
// ============================================================================
export function generateLineaTiempoPerdidaQuestions(count: number = 10): GameQuestion[] {
  const questions: GameQuestion[] = [
    {
      id: 'cronologia-1',
      type: 'ordering',
      question: '📅 Ordena cronológicamente los siguientes eventos de Mesopotamia',
      options: [
        'Llegada de los sumerios (3500 a.C.)',
        'Fundación de Uruk por Enmerkar',
        'Invención de la escritura cuneiforme (3200 a.C.)',
        'Imperio de Sargón de Acad (2334 a.C.)',
        'Código de Hammurabi (1750 a.C.)'
      ],
      correctAnswer: [
        'Llegada de los sumerios (3500 a.C.)',
        'Fundación de Uruk por Enmerkar',
        'Invención de la escritura cuneiforme (3200 a.C.)',
        'Imperio de Sargón de Acad (2334 a.C.)',
        'Código de Hammurabi (1750 a.C.)'
      ],
      points: 30,
      hint: 'Los sumerios fueron los primeros',
    },
    {
      id: 'cronologia-2',
      type: 'multiple-choice',
      question: '¿Quién fue Enmerkar?',
      options: [
        'Un escriba famoso',
        'Fundador de Uruk y constructor de templos para Inanna',
        'Un comerciante',
        'Un agricultor'
      ],
      correctAnswer: 'Fundador de Uruk y constructor de templos para Inanna',
      points: 15,
    },
    {
      id: 'cronologia-3',
      type: 'fill-blank',
      question: 'La ____ cuneiforme fue el primer sistema de escritura del mundo',
      correctAnswer: 'escritura',
      points: 10,
    },
    {
      id: 'cronologia-4',
      type: 'multiple-choice',
      question: '¿Quién fue Sargón de Acad?',
      options: [
        'Un poeta',
        'El rey de los cuatro confines que unificó Mesopotamia bajo un imperio',
        'Un sacerdote',
        'Un escultor'
      ],
      correctAnswer: 'El rey de los cuatro confines que unificó Mesopotamia bajo un imperio',
      points: 20,
      hint: 'Creó el primer estado centralizado',
    },
    {
      id: 'cronologia-5',
      type: 'multiple-choice',
      question: '¿Qué estableció el Código de Hammurabi?',
      options: [
        'Recetas de cocina',
        'Leyes escritas en piedra que establecían justicia según la escala social',
        'Instrucciones de construcción',
        'Oraciones religiosas'
      ],
      correctAnswer: 'Leyes escritas en piedra que establecían justicia según la escala social',
      points: 20,
    },
    {
      id: 'cronologia-6',
      type: 'multiple-choice',
      question: '¿Qué inventos tecnológicos desarrollaron los mesopotámicos?',
      options: [
        'Solo la escritura',
        'La rueda, sistemas de irrigación, sello cilíndrico, astronomía y álgebra',
        'El teléfono',
        'La electricidad'
      ],
      correctAnswer: 'La rueda, sistemas de irrigación, sello cilíndrico, astronomía y álgebra',
      points: 25,
    },
    {
      id: 'cronologia-7',
      type: 'fill-blank',
      question: 'Las ciudades mesopotámicas como Ur, Lagash y ____ eran ciudades-estado independientes',
      correctAnswer: 'Nippur',
      points: 10,
    },
    {
      id: 'cronologia-8',
      type: 'multiple-choice',
      question: '¿Qué calendario desarrollaron los mesopotámicos?',
      options: [
        'Calendario solar',
        'Calendario lunar que regulaba los rituales',
        'No tenían calendario',
        'Calendario actual'
      ],
      correctAnswer: 'Calendario lunar que regulaba los rituales',
      points: 15,
    },
  ];

  return questions.slice(0, count);
}

// ============================================================================
// MESOPOTAMIA - MISIÓN 4: El legado eterno (CONQUISTA)
// Actividad: Bingo mesopotámico con aportes culturales
// ============================================================================
export function generateLegadoEternoQuestions(count: number = 20): GameQuestion[] {
  const questions: GameQuestion[] = [
    // Basado en el listado de 40 aportes del documento
    {
      id: 'bingo-1',
      type: 'multiple-choice',
      question: '🎲 Sistema de símbolos que usaban los escribas para registrar en tablillas de arcilla',
      options: ['Jeroglíficos', 'Escritura cuneiforme', 'Alfabeto latino', 'Números romanos'],
      correctAnswer: 'Escritura cuneiforme',
      points: 15,
    },
    {
      id: 'bingo-2',
      type: 'multiple-choice',
      question: '🎲 Monumento religioso en forma de torre escalonada en honor a los dioses',
      options: ['Pirámide', 'Zigurat', 'Templo griego', 'Catedral'],
      correctAnswer: 'Zigurat',
      points: 15,
    },
    {
      id: 'bingo-3',
      type: 'fill-blank',
      question: '🎲 Antiguo conjunto de normas legales grabadas en piedra por Hammurabi: Código de ____',
      correctAnswer: 'Hammurabi',
      points: 10,
    },
    {
      id: 'bingo-4',
      type: 'multiple-choice',
      question: '🎲 Primer poema épico de la humanidad sobre un rey sumerio',
      options: ['La Ilíada', 'Epopeya de Gilgamesh', 'La Odisea', 'Beowulf'],
      correctAnswer: 'Epopeya de Gilgamesh',
      points: 20,
    },
    {
      id: 'bingo-5',
      type: 'fill-blank',
      question: '🎲 Pueblo mesopotámico considerado uno de los primeros en formar ciudades-estado: ____',
      correctAnswer: 'Sumerios',
      points: 10,
    },
    {
      id: 'bingo-6',
      type: 'multiple-choice',
      question: '🎲 Sistema para aprovechar el agua de los ríos y distribuirla hacia los campos',
      options: ['Acueductos', 'Canales de irrigación', 'Pozos', 'Represas'],
      correctAnswer: 'Canales de irrigación',
      points: 15,
    },
    {
      id: 'bingo-7',
      type: 'multiple-choice',
      question: '🎲 Ciencia usada por los sacerdotes para observar los astros',
      options: ['Astrología', 'Astronomía', 'Geografía', 'Meteorología'],
      correctAnswer: 'Astronomía',
      points: 15,
    },
    {
      id: 'bingo-8',
      type: 'fill-blank',
      question: '🎲 Dios principal de Babilonia, asociado con la justicia y el orden: ____',
      correctAnswer: 'Marduk',
      points: 10,
    },
    {
      id: 'bingo-9',
      type: 'multiple-choice',
      question: '🎲 División del tiempo en unidades de 60 que aún usamos hoy',
      options: ['Sistema decimal', 'Sistema sexagesimal', 'Sistema binario', 'Sistema métrico'],
      correctAnswer: 'Sistema sexagesimal',
      points: 20,
    },
    {
      id: 'bingo-10',
      type: 'fill-blank',
      question: '🎲 Cultivo básico de Mesopotamia usado para hacer pan y cerveza: ____',
      correctAnswer: 'Cebada',
      points: 10,
    },
    {
      id: 'bingo-11',
      type: 'multiple-choice',
      question: '🎲 Figura mítica con cuerpo de toro, alas de águila y rostro humano',
      options: ['Esfinge', 'Lamassu', 'Minotauro', 'Quimera'],
      correctAnswer: 'Lamassu',
      points: 20,
    },
    {
      id: 'bingo-12',
      type: 'multiple-choice',
      question: '🎲 Organización social donde el rey y los sacerdotes tenían el mayor poder',
      options: ['Democracia', 'Teocracia', 'República', 'Monarquía simple'],
      correctAnswer: 'Teocracia',
      points: 15,
    },
    {
      id: 'bingo-13',
      type: 'fill-blank',
      question: '🎲 Elemento cilíndrico usado para sellar documentos con imágenes: Sello ____',
      correctAnswer: 'cilíndrico',
      points: 10,
    },
    {
      id: 'bingo-14',
      type: 'multiple-choice',
      question: '🎲 Diosa del amor y la guerra en la mitología mesopotámica',
      options: ['Afrodita', 'Ishtar', 'Venus', 'Atenea'],
      correctAnswer: 'Ishtar',
      points: 15,
    },
    {
      id: 'bingo-15',
      type: 'multiple-choice',
      question: '🎲 Ciudad-estado considerada cuna de la civilización y del urbanismo',
      options: ['Babilonia', 'Uruk', 'Atenas', 'Roma'],
      correctAnswer: 'Uruk',
      points: 15,
    },
    {
      id: 'bingo-16',
      type: 'fill-blank',
      question: '🎲 Instrumento que usaban los escribas para escribir sobre arcilla: ____',
      correctAnswer: 'estilete',
      points: 10,
    },
    {
      id: 'bingo-17',
      type: 'multiple-choice',
      question: '🎲 Narración mitológica sobre el origen de los dioses y el universo',
      options: ['Génesis', 'Enuma Elish', 'Rig Veda', 'Teogonía'],
      correctAnswer: 'Enuma Elish',
      points: 20,
    },
    {
      id: 'bingo-18',
      type: 'multiple-choice',
      question: '🎲 Pueblo guerrero que construyó un imperio con capital en Nínive',
      options: ['Babilonios', 'Asirios', 'Persas', 'Hititas'],
      correctAnswer: 'Asirios',
      points: 15,
    },
    {
      id: 'bingo-19',
      type: 'matching',
      question: '🎲 Relaciona cada invento mesopotámico con su uso',
      options: [
        'Escritura cuneiforme',
        'Rueda',
        'Sistema de irrigación',
        'Código de Hammurabi',
        'Zigurat'
      ],
      correctAnswer: [
        'Registrar leyes, historias y economía',
        'Transporte de mercancías y producción',
        'Distribución de agua para agricultura',
        'Primeras leyes escritas de la humanidad',
        'Templo para adorar a los dioses'
      ],
      points: 25,
    },
    {
      id: 'bingo-20',
      type: 'multiple-choice',
      question: '🎲 ¿Cuál es el legado más importante de Mesopotamia?',
      options: [
        'Solo sus edificios',
        'Ser la cuna de la escritura, las leyes, las ciudades organizadas y el pensamiento científico',
        'Sus guerras',
        'Su riqueza en oro'
      ],
      correctAnswer: 'Ser la cuna de la escritura, las leyes, las ciudades organizadas y el pensamiento científico',
      points: 30,
    },
  ];

  return shuffle(questions).slice(0, count);
}

// Función principal para generar preguntas según el tipo de juego
export function generateGameQuestions(gameType: GameType, count?: number): GameQuestion[] {
  switch (gameType) {
    case 'secreto-nilo':
      return generateSecretoNiloQuestions(count || 5);
    case 'consejo-faraon':
      return generateConsejoFaraonQuestions(count || 15);
    case 'secretos-nilo':
      return generateSecretosNiloQuestions(count || 10);
    case 'gran-reto-nilo':
      return generateGranRetoNiloQuestions(count || 20);
    case 'mapa-rios-eternos':
      return generateMapaRiosEternosQuestions(count || 5);
    case 'guardianes-saber':
      return generateGuardianesSaberQuestions(count || 15);
    case 'linea-tiempo-perdida':
      return generateLineaTiempoPerdidaQuestions(count || 10);
    case 'legado-eterno':
      return generateLegadoEternoQuestions(count || 20);
    default:
      return [];
  }
}
