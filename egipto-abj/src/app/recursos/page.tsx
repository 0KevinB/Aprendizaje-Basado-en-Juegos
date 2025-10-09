'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface Resource {
  id: string;
  title: string;
  description: string;
  content: string;
  icon: string;
}

const bibliotecaRecursos: Resource[] = [
  {
    id: 'jeroglificos',
    title: 'Los Jeroglíficos Egipcios',
    description: 'El sistema de escritura del Antiguo Egipto',
    icon: '📝',
    content: `Los jeroglíficos eran el sistema de escritura sagrado de Egipto. Este sistema combinaba símbolos fonéticos (que representan sonidos) y pictóricos (que representan objetos o ideas).

El alfabeto jeroglífico contenía 28 consonantes básicas, aunque el sistema completo incluía más de 700 símbolos diferentes. Solo los escribas, que pasaban años en entrenamiento, aprendían a leerlos y escribirlos, lo que les daba un estatus especial en la sociedad egipcia.

Los jeroglíficos se usaban principalmente en templos, tumbas y monumentos, mientras que para documentos cotidianos se usaba una escritura más simple llamada hierática. La Piedra Rosetta, descubierta en 1799, fue clave para descifrar este antiguo sistema de escritura.`,
  },
  {
    id: 'faraon-sociedad',
    title: 'El Faraón y la Sociedad Egipcia',
    description: 'Estructura social del Antiguo Egipto',
    icon: '👑',
    content: `La sociedad egipcia estaba organizada en una rígida pirámide social:

1. FARAÓN: En la cima, considerado un dios viviente. Era el líder político, militar y religioso.

2. SACERDOTES Y NOBLES: Administraban templos, tierras y el gobierno. Vivían en palacios y tenían gran poder.

3. ESCRIBAS: Eran los letrados de la sociedad. Registraban impuestos, llevaban cuentas y escribían documentos importantes.

4. ARTESANOS Y COMERCIANTES: Creaban objetos, joyas, herramientas y comerciaban con otros pueblos.

5. CAMPESINOS: La mayoría de la población. Trabajaban la tierra durante las inundaciones del Nilo.

6. ESCLAVOS: Generalmente prisioneros de guerra, realizaban trabajos forzados.

Esta estructura se mantuvo casi sin cambios durante más de 3,000 años.`,
  },
  {
    id: 'nilo',
    title: 'El Río Nilo',
    description: 'La fuente de vida del Antiguo Egipto',
    icon: '🌊',
    content: `El Río Nilo, con aproximadamente 6,850 km de longitud, fue absolutamente fundamental para el desarrollo de la civilización egipcia. Sin el Nilo, Egipto habría sido solo desierto.

INUNDACIONES ANUALES: Cada año, entre junio y septiembre, el Nilo se desbordaba e inundaba los campos. Cuando las aguas retrocedían, dejaban una capa de limo negro muy fértil que permitía cultivar trigo, cebada, lino y papiro.

GEOGRAFÍA: El Nilo nace en el lago Victoria (África central) y fluye hacia el norte, desembocando en el Mar Mediterráneo formando un gran delta. Los egipcios llamaban a su tierra "Kemet" (tierra negra) por el color del suelo fértil, y al desierto "Deshret" (tierra roja).

TRANSPORTE: El Nilo era la principal autopista de Egipto. Los barcos navegaban río abajo con la corriente y río arriba aprovechando los vientos del norte.`,
  },
  {
    id: 'dioses',
    title: 'Los Dioses del Antiguo Egipto',
    description: 'Religión y creencias egipcias',
    icon: '🏺',
    content: `Los egipcios adoraban a más de 1,500 dioses diferentes. Aquí están los más importantes:

RA: El dios del sol, representado con cabeza de halcón. Era el creador del universo y navegaba por el cielo en su barca solar.

OSIRIS: Dios del inframundo y la resurrección. Juez de los muertos y símbolo de la vida eterna.

ISIS: Diosa de la magia y la maternidad. Esposa de Osiris y madre de Horus. Protectora de los niños.

ANUBIS: Dios de la momificación, con cabeza de chacal. Guiaba a las almas al más allá y presidía el pesaje del corazón.

HORUS: Dios del cielo con cabeza de halcón. Hijo de Osiris e Isis, protector de los faraones.

THOTH: Dios de la sabiduría y la escritura, representado como un ibis. Inventor de los jeroglíficos.

BASTET: Diosa con forma de gato, protectora del hogar y la fertilidad.`,
  },
  {
    id: 'momificacion',
    title: 'El Proceso de Momificación',
    description: 'Preparación para la vida eterna',
    icon: '⚰️',
    content: `Los egipcios creían que para alcanzar la vida eterna, el cuerpo debía preservarse. El proceso de momificación tomaba 70 días:

DÍAS 1-4: Se lavaba el cuerpo con agua del Nilo y vino de palma. Se extraían los órganos internos excepto el corazón (considerado centro del alma).

DÍAS 5-40: El cuerpo se cubría con natrón (una sal natural) para secarlo completamente.

DÍAS 41-60: Se rellenaba el cuerpo con lino, aserrín y especias aromáticas. Se aplicaban aceites y resinas.

DÍAS 61-70: Se envolvía el cuerpo con vendas de lino (hasta 375 m²). Entre las vendas se colocaban amuletos protectores. Se colocaba una máscara sobre la cara.

Los órganos extraídos se guardaban en 4 vasos canopos, cada uno protegido por un dios diferente. Solo los ricos podían permitirse este elaborado proceso.`,
  },
  {
    id: 'piramides',
    title: 'Las Pirámides de Egipto',
    description: 'Tumbas monumentales de los faraones',
    icon: '🔺',
    content: `Las pirámides son las estructuras más emblemáticas del Antiguo Egipto. Servían como tumbas para los faraones y símbolos de su poder divino.

LA GRAN PIRÁMIDE DE KEOPS (Giza): La más grande de todas. Construida alrededor del 2560 a.C., tiene 146 metros de altura (originalmente) y está compuesta por aproximadamente 2.3 millones de bloques de piedra caliza, cada uno pesando entre 2 y 15 toneladas.

CONSTRUCCIÓN: Contrario al mito popular, las pirámides NO fueron construidas por esclavos, sino por trabajadores egipcios pagados. Se estima que 100,000 trabajadores participaron en turnos rotatorios. Usaban rampas, palancas, trineos y trabajo organizado.

PROPÓSITO: Además de tumba, las pirámides eran máquinas de ascensión. Los egipcios creían que el faraón muerto ascendería al cielo para unirse con Ra, el dios sol.

Se construyeron más de 130 pirámides en Egipto, pero las tres de Giza son las más famosas.`,
  },
];

interface VideoResource extends Resource {
  videoUrl: string;
  duration?: string;
}

const videosEducativos: VideoResource[] = [
  {
    id: 'video-antiguo-egipto',
    title: 'EL ANTIGUO EGIPTO | Vídeos Educativos para Niños',
    description: 'Introducción completa al Antiguo Egipto',
    icon: '🎥',
    videoUrl: 'https://www.youtube.com/embed/5qXgipbSuYY',
    duration: '5:39',
    content: 'Video educativo que explica de manera didáctica la importancia del Río Nilo como fuente de vida, los faraones, la construcción de pirámides, los dioses egipcios como Bastet y el dios Halcón, y la organización social de esta fascinante civilización.',
  },
  {
    id: 'video-jeroglificos',
    title: 'Jeroglíficos Egipcios - Cómo Funcionaban',
    description: 'Descubre el sistema de escritura egipcio',
    icon: '📜',
    videoUrl: 'https://www.youtube.com/embed/zOwP0KUlnZg',
    duration: '10:24',
    content: 'Explicación detallada sobre cómo funcionaban los jeroglíficos egipcios, incluyendo el alfabeto jeroglífico, símbolos fonéticos y pictóricos, y el papel fundamental de los escribas en la sociedad del Antiguo Egipto.',
  },
  {
    id: 'video-nilo',
    title: 'El Río Nilo - Geografía del Antiguo Egipto',
    description: 'La importancia del Nilo para Egipto',
    icon: '🌊',
    videoUrl: 'https://www.youtube.com/embed/lCv_MLla4gA',
    duration: '8:15',
    content: 'Documental educativo sobre el Río Nilo, sus inundaciones anuales, cómo el limo fértil permitía la agricultura, y por qué los egipcios llamaban a su tierra "Kemet" (tierra negra). Incluye información sobre geografía y transporte fluvial.',
  },
  {
    id: 'video-piramides',
    title: 'Las Pirámides de Egipto - Construcción',
    description: 'Cómo se construyeron las pirámides',
    icon: '🔺',
    videoUrl: 'https://www.youtube.com/embed/TJEhRB7prqI',
    duration: '12:30',
    content: 'Video que explica el proceso de construcción de las pirámides, desmintiendo mitos sobre esclavos y mostrando las técnicas reales utilizadas: rampas, palancas, trineos y organización laboral. Incluye datos sobre la Gran Pirámide de Keops.',
  },
  {
    id: 'video-dioses',
    title: 'Dioses Egipcios - Mitología',
    description: 'Los principales dioses del Antiguo Egipto',
    icon: '🏺',
    videoUrl: 'https://www.youtube.com/embed/fZlMIb9DYAE',
    duration: '15:20',
    content: 'Recorrido por los principales dioses egipcios: Ra (dios del sol), Osiris (inframundo), Isis (magia), Anubis (momificación), Horus (cielo), Thoth (sabiduría) y Bastet (protección del hogar). Explica sus roles y representaciones.',
  },
  {
    id: 'video-momificacion',
    title: 'Momificación en el Antiguo Egipto',
    description: 'El proceso de preservación de los cuerpos',
    icon: '⚰️',
    videoUrl: 'https://www.youtube.com/embed/JACoS_OxwAY',
    duration: '11:45',
    content: 'Explicación paso a paso del proceso de momificación que tomaba 70 días. Incluye información sobre la extracción de órganos, el uso de natrón, el vendaje del cuerpo, los vasos canopos y las creencias egipcias sobre la vida eterna.',
  },
  {
    id: 'video-faraones',
    title: 'Los Faraones y la Pirámide Social Egipcia',
    description: 'Estructura social del Antiguo Egipto',
    icon: '👑',
    videoUrl: 'https://www.youtube.com/embed/VN7qCe9Uqfc',
    duration: '9:30',
    content: 'Video educativo sobre la organización social egipcia en forma de pirámide: faraón, sacerdotes y nobles, escribas, artesanos y comerciantes, campesinos y esclavos. Explica el rol divino del faraón y la rigidez de la estructura social.',
  },
  {
    id: 'video-vida-cotidiana',
    title: 'La Vida Cotidiana en el Antiguo Egipto',
    description: 'Cómo vivían los egipcios',
    icon: '🏠',
    videoUrl: 'https://www.youtube.com/embed/2hi08tOUkUM',
    duration: '13:15',
    content: 'Documental sobre la vida diaria de los egipcios: sus casas, alimentación, vestimenta, juegos, educación y trabajo. Muestra las diferencias entre la vida de nobles y campesinos, y costumbres como el uso de maquillaje y pelucas.',
  },
];

const actividadesInteractivas: Resource[] = [
  {
    id: 'timeline',
    title: 'Línea de Tiempo del Antiguo Egipto',
    description: 'Cronología de 3,000 años de historia',
    icon: '📅',
    content: `La historia del Antiguo Egipto abarca aproximadamente 3,000 años (desde el 3100 a.C. hasta el 30 a.C.) y se divide en periodos principales:

PERIODO PREDINÁSTICO (5500-3100 a.C.): Primeros asentamientos a orillas del Nilo.

PERIODO DINÁSTICO TEMPRANO (3100-2686 a.C.): Unificación del Alto y Bajo Egipto por el faraón Narmer. Primeras dinastías I y II.

REINO ANTIGUO (2686-2181 a.C.): Época de las grandes pirámides (Keops, Kefrén, Micerinos). Dinastías III a VI. Capital: Menfis.

PRIMER PERIODO INTERMEDIO (2181-2055 a.C.): Crisis política y fragmentación.

REINO MEDIO (2055-1650 a.C.): Reunificación de Egipto. Expansión territorial. Dinastías XI y XII. Capital: Tebas.

SEGUNDO PERIODO INTERMEDIO (1650-1550 a.C.): Invasión de los hicsos.

REINO NUEVO (1550-1077 a.C.): Apogeo del imperio egipcio. Faraones famosos: Hatshepsut, Tutankamón, Ramsés II. Valle de los Reyes. Dinastías XVIII a XX.

TERCER PERIODO INTERMEDIO (1077-664 a.C.): Decadencia y divisiones.

PERIODO TARDÍO (664-332 a.C.): Invasiones asirias y persas.

PERIODO PTOLEMAICO (332-30 a.C.): Conquista de Alejandro Magno. Dinastía ptolemaica. Cleopatra VII, última faraona.`,
  },
  {
    id: 'geografia',
    title: 'Geografía del Antiguo Egipto',
    description: 'Mapa y ubicación geográfica',
    icon: '🗺️',
    content: `El Antiguo Egipto se ubicaba en el noreste de África, a lo largo del río Nilo.

DIVISIONES GEOGRÁFICAS:

ALTO EGIPTO: Región sur, desde Asuán hasta El Cairo. Estrecha franja de tierra fértil entre desiertos. Corona blanca (Hedyet).

BAJO EGIPTO: Región norte, el Delta del Nilo. Tierra muy fértil donde el Nilo se divide en varios brazos. Corona roja (Deshret).

CIUDADES PRINCIPALES:

MENFIS: Capital del Reino Antiguo. Centro político y religioso. Cerca de las pirámides de Giza.

TEBAS (Luxor): Capital del Reino Medio y Nuevo. Templos de Karnak y Luxor. Valle de los Reyes.

ALEJANDRÍA: Fundada por Alejandro Magno en 332 a.C. Faro de Alejandría (una de las 7 maravillas). Biblioteca más famosa del mundo antiguo.

ABU SIMBEL: Templos monumentales de Ramsés II tallados en roca.

GIZA: Complejo de las tres grandes pirámides.

LÍMITES NATURALES: Egipto estaba protegido por desiertos al este y oeste, el Mar Mediterráneo al norte, y cataratas del Nilo al sur.`,
  },
  {
    id: 'inventos',
    title: 'Inventos y Aportes Egipcios',
    description: 'Contribuciones a la civilización',
    icon: '💡',
    content: `Los egipcios realizaron innovaciones que usamos hasta hoy:

MATEMÁTICAS Y ARQUITECTURA:
• Sistema decimal y fracciones
• Geometría aplicada a construcción
• Medición de tierras (agrimensura)
• Nivel de agua para construcción

MEDICINA:
• Primeras cirugías documentadas
• Tratamientos para fracturas
• Conocimiento de anatomía
• Uso de vendajes y férulas
• Antibióticos naturales (miel, moho)

CALENDARIO Y TIEMPO:
• Calendario solar de 365 días
• División del año en 12 meses
• Semanas de 10 días
• Relojes de sol y agua

ESCRITURA Y PAPEL:
• Sistema de escritura jeroglífica
• Papiro (precursor del papel)
• Tinta hecha de carbón y goma

AGRICULTURA:
• Sistemas de irrigación
• Arado tirado por bueyes
• Silos para almacenar grano
• Cultivo de trigo y cebada

VIDA COTIDIANA:
• Pasta de dientes y cepillos
• Maquillaje y cosméticos
• Pelucas elaboradas
• Cerveza y pan con levadura
• Anillos de boda
• Juegos de mesa (Senet)`,
  },
  {
    id: 'arte-arquitectura',
    title: 'Arte y Arquitectura Egipcia',
    description: 'Características del arte egipcio',
    icon: '🎨',
    content: `El arte egipcio tiene características únicas y distintivas:

PRINCIPIOS DEL ARTE EGIPCIO:

CANON DE PROPORCIONES: Figuras humanas seguían reglas estrictas. La altura debía ser 18 veces el tamaño del puño.

LEY DE LA FRONTALIDAD: Cabeza y piernas de perfil, ojos y torso de frente. Esto permitía mostrar el mayor detalle posible.

JERARQUÍA DE TAMAÑO: Personas importantes (faraones, dioses) se representaban más grandes que personas comunes.

ARQUITECTURA MONUMENTAL:

PIRÁMIDES: Tumbas masivas de piedra. Evolución desde mastabas (rectangulares) a pirámides escalonadas (Zoser) y verdaderas pirámides (Keops).

TEMPLOS: Estructuras masivas con columnas gigantes. Templos de Karnak, Luxor, Abu Simbel. Muros cubiertos de jeroglíficos y relieves.

OBELISCOS: Pilares de piedra de una sola pieza con punta piramidal. Cubiertos de jeroglíficos.

ESCULTURA: Estatuas monumentales de faraones y dioses. Esfinge de Giza (cuerpo de león, cabeza humana).

PINTURA MURAL: Decoración de tumbas y templos. Escenas de vida cotidiana, rituales religiosos, el viaje al más allá.

MATERIALES: Piedra caliza, granito, basalto, oro, lapislázuli, turquesa.`,
  },
  {
    id: 'escritura-lengua',
    title: 'Sistemas de Escritura',
    description: 'Jeroglífica, Hierática y Demótica',
    icon: '✍️',
    content: `Los egipcios desarrollaron tres sistemas de escritura principales:

1. JEROGLÍFICA (3200 a.C. - 400 d.C.):
• Sistema más antiguo y formal
• Más de 700 símbolos diferentes
• Usada en monumentos, templos y tumbas
• Escritura sagrada ("palabras de dios")
• Se leía de arriba abajo y de derecha a izquierda (o izquierda a derecha)
• Combinaba ideogramas (símbolos=ideas) y fonogramas (símbolos=sonidos)

2. HIERÁTICA (3000 a.C. - 600 a.C.):
• Versión cursiva simplificada de los jeroglíficos
• Usada por escribas para documentos cotidianos
• Escrita con caña y tinta sobre papiro
• Más rápida de escribir
• Usada en textos administrativos, cartas, literatura

3. DEMÓTICA (650 a.C. - 450 d.C.):
• Sistema aún más simplificado
• Escritura del pueblo común
• Usada en contratos, documentos legales
• Última fase de la escritura egipcia antigua

LA PIEDRA ROSETTA:
Descubierta en 1799, contenía el mismo texto en tres escrituras: jeroglífica, demótica y griego antiguo. Esto permitió a Jean-François Champollion descifrar los jeroglíficos en 1822.

MATERIALES DE ESCRITURA:
• Papiro: hojas hechas de la planta de papiro
• Óstraca: fragmentos de cerámica o piedra caliza
• Cañas de junco como plumas
• Tinta negra (carbón) y roja (ocre)`,
  },
  {
    id: 'comercio-economia',
    title: 'Comercio y Economía',
    description: 'Sistema económico del Antiguo Egipto',
    icon: '💰',
    content: `La economía egipcia se basaba en la agricultura y el comercio:

AGRICULTURA (Base de la economía):
• Cultivos principales: trigo, cebada, lino, papiro
• Hortalizas: cebollas, ajos, lechugas, pepinos
• Frutas: dátiles, higos, uvas, granadas
• Ganadería: vacas, ovejas, cabras, cerdos
• Pesca en el Nilo

SISTEMA DE IMPUESTOS:
• Los campesinos pagaban impuestos al faraón
• Se pagaba con parte de la cosecha
• Escribas medían y registraban las tierras
• Durante inundaciones, trabajaban en proyectos del faraón

COMERCIO:
• Comercio interno: trueque (intercambio directo)
• No usaban monedas hasta el periodo tardío
• Unidad de valor: "deben" (peso de cobre/plata)
• Comercio exterior con Nubia, Punt, Fenicia, Mesopotamia

PRODUCTOS EXPORTADOS:
• Papiro (único en Egipto)
• Lino y tejidos
• Grano excedente
• Objetos de oro y joyas

PRODUCTOS IMPORTADOS:
• Madera (cedro del Líbano)
• Incienso y mirra (de Punt)
• Lapislázuli (de Afganistán)
• Marfil y ébano (de África)
• Plata (de Asia Menor)

PROFESIONES:
Campesinos, pescadores, panaderos, cerveceros, tejedores, alfareros, carpinteros, joyeros, orfebres, escultores, pintores, escribas, sacerdotes, soldados, médicos.`,
  },
];

export default function RecursosPage() {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openResource = (resource: Resource) => {
    setSelectedResource(resource);
    setDialogOpen(true);
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <div className="text-6xl mb-4">📚</div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[var(--dark-blue)] mb-4">
          Recursos Educativos
        </h1>
        <p className="text-xl text-[var(--dark-blue)]">
          Profundiza tu conocimiento sobre la cultura egipcia
        </p>
      </section>

      <Tabs defaultValue="biblioteca" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-transparent p-0 gap-2 h-auto">
          <TabsTrigger
            value="biblioteca"
            className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-[#0f1e30] data-[state=active]:border-[#FFD700] bg-[#C19A6B] text-white text-lg font-bold transition-all py-4 rounded-lg border-4 border-transparent hover:border-[#FFD700] hover:bg-[#D4A76A]"
          >
            📖 Biblioteca
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-[#0f1e30] data-[state=active]:border-[#FFD700] bg-[#C19A6B] text-white text-lg font-bold transition-all py-4 rounded-lg border-4 border-transparent hover:border-[#FFD700] hover:bg-[#D4A76A]"
          >
            🎥 Videos
          </TabsTrigger>
          <TabsTrigger
            value="actividades"
            className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-[#0f1e30] data-[state=active]:border-[#FFD700] bg-[#C19A6B] text-white text-lg font-bold transition-all py-4 rounded-lg border-4 border-transparent hover:border-[#FFD700] hover:bg-[#D4A76A]"
          >
            🎮 Actividades
          </TabsTrigger>
          <TabsTrigger
            value="objetivos"
            className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-[#0f1e30] data-[state=active]:border-[#FFD700] bg-[#C19A6B] text-white text-lg font-bold transition-all py-4 rounded-lg border-4 border-transparent hover:border-[#FFD700] hover:bg-[#D4A76A]"
          >
            🎯 Objetivos
          </TabsTrigger>
        </TabsList>

        {/* Biblioteca */}
        <TabsContent value="biblioteca">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bibliotecaRecursos.map((resource) => (
              <Card
                key={resource.id}
                className="border-4 border-[#FFD700] hover:shadow-2xl transition-all hover:scale-105 bg-white"
              >
                <CardHeader>
                  <div className="text-6xl mb-4 text-center">{resource.icon}</div>
                  <CardTitle className="text-2xl font-serif text-[#0f1e30] text-center font-bold">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-center text-base text-[#1e3a5f] font-medium">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => openResource(resource)}
                    className="w-full bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#0f1e30] font-bold hover:shadow-lg border-2 border-[#B8860B]"
                  >
                    Leer más
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Videos */}
        <TabsContent value="videos">
          <div className="grid gap-6">
            {videosEducativos.map((video) => (
              <Card
                key={video.id}
                className="border-4 border-[#40E0D0] bg-white"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{video.icon}</div>
                      <div>
                        <CardTitle className="text-2xl font-serif text-[#0f1e30] font-bold">
                          {video.title}
                        </CardTitle>
                        <CardDescription className="text-base text-[#1e3a5f] font-medium">
                          {video.description}
                        </CardDescription>
                      </div>
                    </div>
                    {video.duration && (
                      <div className="bg-[#40E0D0] text-[#0f1e30] px-3 py-1 rounded-full font-bold text-sm">
                        ⏱️ {video.duration}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video w-full rounded-lg overflow-hidden border-4 border-[#8B6F47] shadow-lg">
                    <iframe
                      width="100%"
                      height="100%"
                      src={video.videoUrl}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="bg-gradient-to-r from-[#f5f1e8] to-[#E6D5B8] p-4 rounded-lg border-2 border-[#C19A6B]">
                    <p className="text-base text-[#0f1e30] leading-relaxed font-medium">
                      {video.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Actividades */}
        <TabsContent value="actividades">
          <div className="grid md:grid-cols-2 gap-6">
            {actividadesInteractivas.map((resource) => (
              <Card
                key={resource.id}
                className="border-4 border-[#CD7F32] hover:shadow-2xl transition-all hover:scale-105 bg-white"
              >
                <CardHeader>
                  <div className="text-6xl mb-4 text-center">{resource.icon}</div>
                  <CardTitle className="text-2xl font-serif text-[#0f1e30] text-center font-bold">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-center text-base text-[#1e3a5f] font-medium">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => openResource(resource)}
                    className="w-full bg-gradient-to-r from-[#CD7F32] to-[#A0522D] text-white font-bold hover:shadow-lg border-2 border-[#A0522D]"
                  >
                    Explorar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Objetivos Educativos */}
        <TabsContent value="objetivos">
          <div className="space-y-8">
            {/* Información Institucional */}
            <Card className="border-4 border-[#FFD700] bg-gradient-to-br from-[#f5f1e8] to-[#E6BE8A]">
              <CardHeader>
                <CardTitle className="text-3xl font-serif text-[#0f1e30] text-center">
                  📋 Información del Programa Educativo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border-2 border-[#C19A6B]">
                    <h3 className="font-bold text-lg text-[#0f1e30] mb-2">Institución</h3>
                    <p className="text-[#1e3a5f]">UNIDADES EDUCATIVAS MUNICIPALES DE LOJA</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-2 border-[#C19A6B]">
                    <h3 className="font-bold text-lg text-[#0f1e30] mb-2">Área</h3>
                    <p className="text-[#1e3a5f]">Ciencias Sociales</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-2 border-[#C19A6B]">
                    <h3 className="font-bold text-lg text-[#0f1e30] mb-2">Grado</h3>
                    <p className="text-[#1e3a5f]">Octavo Año EGB</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-2 border-[#C19A6B]">
                    <h3 className="font-bold text-lg text-[#0f1e30] mb-2">Asignatura</h3>
                    <p className="text-[#1e3a5f]">Estudios Sociales</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Objetivo de la Unidad */}
            <Card className="border-4 border-[#40E0D0] bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-[#0f1e30]">
                  🎯 Objetivo de la Unidad Didáctica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-[#f5f1e8] to-[#E6D5B8] p-6 rounded-lg border-2 border-[#C19A6B]">
                  <p className="text-lg text-[#0f1e30] font-semibold leading-relaxed">
                    Conocer los aportes culturales de las primeras civilizaciones y su influencia en la actualidad.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Destreza con Criterio de Desempeño */}
            <Card className="border-4 border-[#FFD700] bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-[#0f1e30]">
                  📚 Destreza con Criterio de Desempeño
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-[#FFD700] to-[#E6BE8A] p-6 rounded-lg border-2 border-[#B8860B]">
                  <div className="mb-3">
                    <span className="font-bold text-[#0f1e30] text-lg">CS.H.5.1.16.</span>
                  </div>
                  <p className="text-base text-[#0f1e30] font-semibold leading-relaxed">
                    Describir y valorar los grandes aportes de la cultura de Egipto al desarrollo tecnológico,
                    económico y científico desde la perspectiva de su condición de &quot;cuna de la humanidad&quot;.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Indicador de Evaluación */}
            <Card className="border-4 border-[#CD7F32] bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-[#0f1e30]">
                  ✅ Indicador de Evaluación de la Unidad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-[#CD7F32] to-[#D4A76A] p-6 rounded-lg border-2 border-[#A0522D]">
                  <div className="mb-3">
                    <span className="font-bold text-white text-lg">I.CS.H.5.5.1.</span>
                  </div>
                  <p className="text-base text-white font-semibold leading-relaxed">
                    Describe los aportes tecnológicos, económicos y científicos de la cultura de Egipto
                    y su impacto en el mundo contemporáneo. (J.1., J.4., I.1.)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Aportes del Antiguo Egipto */}
            <Card className="border-4 border-[#40E0D0] bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-[#0f1e30]">
                  💡 Principales Aportes del Antiguo Egipto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-[#f5f1e8] to-[#E6D5B8] p-5 rounded-lg border-2 border-[#C19A6B]">
                    <div className="text-4xl mb-3 text-center">🏗️</div>
                    <h3 className="font-bold text-lg text-[#0f1e30] mb-2">Tecnológicos</h3>
                    <ul className="list-disc list-inside text-[#1e3a5f] space-y-1">
                      <li>Construcción con piedra tallada</li>
                      <li>Sistemas de riego y agricultura</li>
                      <li>Navegación fluvial</li>
                      <li>Técnicas de momificación</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-r from-[#f5f1e8] to-[#E6D5B8] p-5 rounded-lg border-2 border-[#C19A6B]">
                    <div className="text-4xl mb-3 text-center">💰</div>
                    <h3 className="font-bold text-lg text-[#0f1e30] mb-2">Económicos</h3>
                    <ul className="list-disc list-inside text-[#1e3a5f] space-y-1">
                      <li>Sistema de comercio organizado</li>
                      <li>Agricultura planificada</li>
                      <li>Primeras formas de impuestos</li>
                      <li>Especialización laboral</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-r from-[#f5f1e8] to-[#E6D5B8] p-5 rounded-lg border-2 border-[#C19A6B]">
                    <div className="text-4xl mb-3 text-center">🔬</div>
                    <h3 className="font-bold text-lg text-[#0f1e30] mb-2">Científicos</h3>
                    <ul className="list-disc list-inside text-[#1e3a5f] space-y-1">
                      <li>Medicina avanzada y cirugía</li>
                      <li>Astronomía y calendario solar</li>
                      <li>Matemáticas y geometría</li>
                      <li>Química y embalsamamiento</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-r from-[#f5f1e8] to-[#E6D5B8] p-5 rounded-lg border-2 border-[#C19A6B]">
                    <div className="text-4xl mb-3 text-center">📖</div>
                    <h3 className="font-bold text-lg text-[#0f1e30] mb-2">Culturales</h3>
                    <ul className="list-disc list-inside text-[#1e3a5f] space-y-1">
                      <li>Sistema de escritura (jeroglíficos)</li>
                      <li>Papiro (precursor del papel)</li>
                      <li>Arte y arquitectura monumental</li>
                      <li>Literatura y poesía</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Metodología ABJ */}
            <Card className="border-4 border-[#FFD700] bg-gradient-to-r from-green-50 to-green-100">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-green-900">
                  🎮 Metodología: Aprendizaje Basado en Juegos (ABJ)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base text-green-800 leading-relaxed">
                  Esta plataforma utiliza la metodología de <strong>Aprendizaje Basado en Juegos</strong>,
                  que combina elementos de gamificación con objetivos educativos claros para:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border-2 border-green-600">
                    <div className="text-3xl mb-2 text-center">🧠</div>
                    <h4 className="font-bold text-green-900 mb-2 text-center">Motivar</h4>
                    <p className="text-sm text-green-800 text-center">
                      Aumentar el engagement y la participación activa
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-2 border-green-600">
                    <div className="text-3xl mb-2 text-center">👥</div>
                    <h4 className="font-bold text-green-900 mb-2 text-center">Colaborar</h4>
                    <p className="text-sm text-green-800 text-center">
                      Fomentar el trabajo en equipo y roles definidos
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-2 border-green-600">
                    <div className="text-3xl mb-2 text-center">📈</div>
                    <h4 className="font-bold text-green-900 mb-2 text-center">Evaluar</h4>
                    <p className="text-sm text-green-800 text-center">
                      Medir el progreso de forma continua y formativa
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog para mostrar contenido */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl border-4 border-[#FFD700] bg-white">
          <DialogHeader>
            <div className="text-6xl text-center mb-4">{selectedResource?.icon}</div>
            <DialogTitle className="text-3xl font-serif text-[#0f1e30] text-center font-bold">
              {selectedResource?.title}
            </DialogTitle>
            <DialogDescription className="text-lg text-center text-[#1e3a5f] font-semibold">
              {selectedResource?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <p className="text-base leading-relaxed text-[#1e3a5f] font-medium">
              {selectedResource?.content}
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] p-4 rounded-lg text-center border-2 border-[#B8860B]">
            <p className="text-[#0f1e30] font-bold text-lg">
              💡 ¡Sigue explorando para aprender más sobre el Antiguo Egipto!
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Carrusel de datos curiosos */}
      <section className="mt-16">
        <h2 className="text-4xl font-serif font-bold text-[#0f1e30] text-center mb-8">
          ¿Sabías que...?
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {[
              { icon: '📏', fact: 'La Gran Pirámide fue la estructura más alta del mundo durante 3,800 años' },
              { icon: '🐱', fact: 'Los gatos eran considerados animales sagrados y protegidos por ley' },
              { icon: '💄', fact: 'Tanto hombres como mujeres usaban maquillaje, especialmente delineador de ojos' },
              { icon: '📅', fact: 'El calendario egipcio tenía 365 días, divididos en 12 meses de 30 días' },
              { icon: '⚖️', fact: 'Las mujeres egipcias tenían derechos legales, podían poseer propiedades y divorciarse' },
              { icon: '🪥', fact: 'Los egipcios inventaron la pasta de dientes, hecha de sal, menta, pimienta y flores secas' },
              { icon: '🔺', fact: 'Se necesitaron aproximadamente 20 años y 100,000 trabajadores para construir la Gran Pirámide' },
              { icon: '📖', fact: 'Los egipcios usaban papiro para escribir, el predecesor del papel moderno' },
              { icon: '⚰️', fact: 'El proceso de momificación podía tomar hasta 70 días en completarse' },
              { icon: '👨‍⚕️', fact: 'Los egipcios realizaban cirugías complejas, incluyendo operaciones cerebrales' },
              { icon: '🎭', fact: 'Cleopatra era griega, no egipcia. Fue la última faraona de Egipto' },
              { icon: '🌾', fact: 'Los egipcios fueron los primeros en hacer pan con levadura y cerveza' },
              { icon: '💍', fact: 'Los anillos de boda se originaron en el Antiguo Egipto, simbolizando eternidad' },
              { icon: '⚗️', fact: 'La palabra "química" proviene de "Kemet", el nombre egipcio para su tierra' },
              { icon: '🎯', fact: 'Los egipcios jugaban bolos hace más de 5,000 años' },
            ].map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="border-3 border-[#C19A6B] bg-white hover:shadow-lg transition-all">
                    <CardContent className="p-6 text-center flex flex-col items-center justify-center min-h-[180px]">
                      <div className="text-5xl mb-4">{item.icon}</div>
                      <p className="text-sm text-[#1e3a5f] font-semibold leading-relaxed">{item.fact}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-3 border-[#FFD700] text-[#0f1e30] hover:bg-[#FFD700] hover:text-[#0f1e30] font-bold -left-4 md:-left-12" />
          <CarouselNext className="border-3 border-[#FFD700] text-[#0f1e30] hover:bg-[#FFD700] hover:text-[#0f1e30] font-bold -right-4 md:-right-12" />
        </Carousel>
      </section>
    </main>
  );
}
