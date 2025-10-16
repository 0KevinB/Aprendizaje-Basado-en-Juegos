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
    id: 'gran-muralla',
    title: 'La Gran Muralla China',
    description: 'Una de las maravillas del mundo antiguo',
    icon: '🏮',
    content: `La Gran Muralla China es una de las construcciones más impresionantes de la humanidad. Se extiende por más de 21,000 kilómetros a través de montañas, desiertos y llanuras del norte de China.

CONSTRUCCIÓN: Su construcción comenzó en el siglo VII a.C. y continuó durante más de 2,000 años. La mayoría de la muralla que vemos hoy fue construida durante la dinastía Ming (1368-1644 d.C.).

PROPÓSITO: Fue construida principalmente para proteger a China de las invasiones de los pueblos nómadas del norte, especialmente los mongoles. También servía como ruta de comunicación y control de comercio.

CARACTERÍSTICAS: La muralla tiene entre 6 y 7 metros de altura, con torres de vigilancia cada 200-300 metros. En algunos puntos alcanza hasta 8 metros de ancho, permitiendo que marcharan 5 caballos en paralelo.

MATERIALES: Se construyó con piedra, ladrillo, tierra apisonada y madera. Se estima que más de 1 millón de trabajadores participaron en su construcción a lo largo de los siglos.

MITO: Contrario al mito popular, la Gran Muralla NO es visible desde el espacio a simple vista.`,
  },
  {
    id: 'inventos-chinos',
    title: 'Los Cuatro Grandes Inventos',
    description: 'Innovaciones que cambiaron el mundo',
    icon: '🧧',
    content: `China es responsable de cuatro inventos fundamentales que transformaron la civilización mundial:

1. PAPEL (105 d.C.): Inventado por Cai Lun durante la dinastía Han. Antes, se escribía en bambú, seda o huesos. El papel era más barato, ligero y fácil de producir. Su invención revolucionó la transmisión del conocimiento.

2. IMPRENTA (868 d.C.): Los chinos desarrollaron la impresión con bloques de madera (xilografía) y luego con tipos móviles de cerámica (1040 d.C.). El libro impreso más antiguo es el "Sutra del Diamante" (868 d.C.).

3. PÓLVORA (Siglo IX): Inicialmente buscaban el elixir de la inmortalidad. La pólvora se usó primero en fuegos artificiales y luego en armas. Transformó completamente la guerra medieval.

4. BRÚJULA (Siglo XI): La primera brújula china usaba una piedra imán flotante. Permitió la navegación marítima de larga distancia y el descubrimiento de nuevas rutas comerciales.

Estos inventos llegaron a Europa a través de la Ruta de la Seda y tuvieron un impacto revolucionario en el desarrollo de la civilización occidental.`,
  },
  {
    id: 'confucio',
    title: 'Confucio y su Filosofía',
    description: 'El pensamiento que guió imperios',
    icon: '☯️',
    content: `Confucio (551-479 a.C.) fue el filósofo más influyente de China. Sus enseñanzas moldearon la cultura china durante más de 2,500 años.

PRINCIPIOS FUNDAMENTALES:

REN (仁): Benevolencia, humanidad y amor al prójimo. Es la virtud más importante.

LI (礼): Rituales, modales y comportamiento apropiado. Respeto por la tradición y las costumbres.

XIAO (孝): Piedad filial. Respeto y devoción a los padres y ancestros.

JUNZI (君子): El "hombre superior" o "caballero". Persona virtuosa que cultiva la moral y el conocimiento.

ENSEÑANZAS CLAVE:
• "No hagas a otros lo que no quieres que te hagan a ti" (Regla de Oro)
• La educación es el camino hacia la virtud
• El ejemplo del gobernante debe ser virtuoso
• Importancia de las relaciones sociales: gobernante-súbdito, padre-hijo, hermano mayor-hermano menor, esposo-esposa, amigo-amigo

LEGADO: El confucianismo fue la filosofía oficial del gobierno chino por más de 2,000 años. Enfatiza la armonía social, el respeto a la autoridad, la educación y la virtud moral.`,
  },
  {
    id: 'dinastias',
    title: 'Las Dinastías Imperiales',
    description: 'Línea de gobernantes que forjaron China',
    icon: '👑',
    content: `China fue gobernada por dinastías imperiales durante más de 2,000 años. Aquí están las más importantes:

DINASTÍA QIN (221-206 a.C.):
• Primer emperador: Qin Shi Huang
• Unificó China por primera vez
• Estandarizó moneda, escritura y medidas
• Construyó la Gran Muralla
• Creó el Ejército de Terracota

DINASTÍA HAN (206 a.C.-220 d.C.):
• Edad de Oro de China
• Estableció la Ruta de la Seda
• Confucianismo como filosofía oficial
• Invención del papel
• Expansión territorial

DINASTÍA TANG (618-907 d.C.):
• Apogeo cultural y artístico
• Poesía clásica (Li Bai, Du Fu)
• Inventos: imprenta, pólvora
• Cosmopolita y tolerante
• Capital: Chang'an (ciudad más grande del mundo)

DINASTÍA SONG (960-1279):
• Renacimiento económico y tecnológico
• Brújula magnética
• Papel moneda
• Filosofía neoconfuciana
• Avances en astronomía y matemáticas

DINASTÍA YUAN (1271-1368):
• Fundada por Kublai Khan (mongol)
• Marco Polo visitó China
• Gran canal completado
• Teatro chino se desarrolla

DINASTÍA MING (1368-1644):
• Reconstrucción de la Gran Muralla
• Ciudad Prohibida en Beijing
• Expediciones marítimas de Zheng He
• Porcelana fina
• Aislamiento del extranjero

DINASTÍA QING (1644-1912):
• Última dinastía imperial
• Máxima expansión territorial
• Invasiones occidentales
• Guerras del Opio
• Caída del sistema imperial`,
  },
  {
    id: 'seda',
    title: 'La Ruta de la Seda',
    description: 'Red comercial que conectó civilizaciones',
    icon: '🐫',
    content: `La Ruta de la Seda fue una red de rutas comerciales que conectó China con Europa y África durante más de 1,500 años (desde el siglo II a.C. hasta el siglo XV d.C.).

ORIGEN: Establecida durante la dinastía Han (206 a.C.-220 d.C.) por el explorador Zhang Qian.

EXTENSIÓN: Abarcaba más de 6,400 kilómetros desde Xi'an (China) hasta el Mediterráneo, cruzando Asia Central.

PRODUCTOS COMERCIADOS:

De China a Occidente:
• Seda (el producto más preciado)
• Porcelana
• Té
• Papel
• Pólvora
• Especias

De Occidente a China:
• Oro y plata
• Piedras preciosas
• Lana y lino
• Vidrio
• Caballos

IMPORTANCIA:
• No solo comercio, sino intercambio cultural
• Transmisión de religiones (budismo, islamismo)
• Intercambio de tecnologías e ideas
• Difusión de idiomas y arte
• Mezcla de culturas

DECLIVE: Con el auge del comercio marítimo en el siglo XV y la inestabilidad política, la Ruta de la Seda perdió importancia.

HOY: China ha revivido el concepto con la "Nueva Ruta de la Seda" (Belt and Road Initiative), un proyecto de infraestructura moderna.`,
  },
  {
    id: 'filosofias',
    title: 'Taoísmo y Legismo',
    description: 'Otras corrientes filosóficas de China',
    icon: '🎋',
    content: `Además del confucianismo, China desarrolló otras filosofías importantes:

TAOÍSMO (道教):

Fundador: Lao-Tsé (siglo VI a.C.)
Texto sagrado: "Tao Te Ching" (Libro del Camino y la Virtud)

Principios:
• TAO (道): "El Camino". Fuerza universal que fluye por todo
• WU WEI (无为): "No acción" o acción sin esfuerzo. Fluir con la naturaleza
• YIN-YANG (阴阳): Balance de opuestos complementarios
• Vivir en armonía con la naturaleza
• Simplicidad y espontaneidad

Enseñanzas:
• "El viaje de mil millas comienza con un paso"
• Cuanto menos interfiramos, mejor fluyen las cosas
• El agua vence a la piedra por su flexibilidad
• Buscar la inmortalidad a través de la alquimia y meditación

LEGISMO (法家):

Filósofo principal: Han Feizi (280-233 a.C.)

Principios:
• Gobierno por leyes estrictas, no por moral
• Castigos severos para mantener orden
• El gobernante debe ser fuerte y temido
• Pragmatismo sobre idealismo
• Control total del estado

Aplicación:
• Qin Shi Huang usó el legismo para unificar China
• Sistema de recompensas y castigos
• Quema de libros confucianos
• Control absoluto del emperador

DIFERENCIAS:
• Confucianismo: gobierno moral, educación, virtud
• Taoísmo: armonía natural, no interferencia, espiritualidad
• Legismo: leyes estrictas, autoridad, control

Las tres filosofías coexistieron e influyeron en la cultura china.`,
  },
];

interface VideoResource extends Resource {
  videoUrl: string;
  duration?: string;
}

const videosEducativos: VideoResource[] = [
  {
    id: 'video-resumen',
    title: 'La historia de CHINA en 15 minutos | Resumen rápido y fácil',
    description: 'Un resumen dinámico y completo de la historia china.',
    icon: '▶️',
    videoUrl: 'https://www.youtube.com/embed/3HSYMpj7j70',
    duration: '14:11',
    content: 'Un excelente y rápido resumen para comprender los momentos clave de una de las civilizaciones más longevas del planeta, el gigante asiático: China.',
  },
  {
    id: 'video-documental-completo',
    title: 'La HISTORIA COMPLETA de China | Antigüedad hasta hoy (Documental 4k)',
    description: 'Un documental exhaustivo que recorre toda la historia de China.',
    icon: '🎬',
    videoUrl: 'https://www.youtube.com/embed/uVuVayDGr6M',
    duration: '2:50:45',
    content: 'Un viaje desde la antigüedad hasta la edad moderna para entender en profundidad la civilización más longeva del planeta, que ha resistido y moldeado la historia durante 5,000 años.',
  },
];

const actividadesInteractivas: Resource[] = [
  {
    id: 'timeline-china',
    title: 'Línea de Tiempo de China',
    description: 'Cronología de las dinastías imperiales',
    icon: '📅',
    content: `La historia imperial de China abarca más de 2,000 años (desde 221 a.C. hasta 1912 d.C.):

DINASTÍA QIN (221-206 a.C.):
• Unificación de China bajo Qin Shi Huang
• Construcción de la Gran Muralla
• Estandarización de escritura, moneda y medidas
• Ejército de Terracota

DINASTÍA HAN (206 a.C.-220 d.C.):
• Edad de Oro de China
• Establecimiento de la Ruta de la Seda
• Confucianismo como ideología oficial
• Invención del papel (105 d.C.)
• Expansión territorial

PERIODO DE LOS TRES REINOS (220-280):
• División de China en tres estados
• Guerras constantes
• Base de muchas leyendas chinas

DINASTÍA TANG (618-907):
• Apogeo cultural y artístico
• Poesía clásica
• Invención de la pólvora e imprenta
• Capital Chang'an: ciudad más grande del mundo
• Cosmopolita: comercio con Persia, India, Japón

DINASTÍA SONG (960-1279):
• Renacimiento económico
• Brújula magnética
• Primer papel moneda del mundo
• Neoconfucianismo
• Avances científicos

DINASTÍA YUAN (1271-1368):
• Fundada por Kublai Khan (mongol)
• Marco Polo visitó China
• Gran Canal completado
• Integración de culturas

DINASTÍA MING (1368-1644):
• Expulsión de los mongoles
• Reconstrucción de la Gran Muralla (forma actual)
• Ciudad Prohibida en Beijing
• Expediciones marítimas de Zheng He
• Porcelana fina y cerámica

DINASTÍA QING (1644-1912):
• Última dinastía (manchú)
• Máxima expansión territorial
• Guerras del Opio (1839-1860)
• Rebelión Taiping
• Fin del sistema imperial (1912)

REPÚBLICA DE CHINA (1912-1949):
• Caída del último emperador (Puyi)
• Era moderna comienza`,
  },
  {
    id: 'geografia-china',
    title: 'Geografía de la Antigua China',
    description: 'Ubicación y características del territorio',
    icon: '🗺️',
    content: `China está ubicada en el este de Asia y es uno de los países más grandes del mundo.

CARACTERÍSTICAS GEOGRÁFICAS:

RÍOS PRINCIPALES:
• RÍO AMARILLO (Huang He): Cuna de la civilización china. Llamado así por el limo amarillo que transporta. 5,464 km de longitud.
• RÍO YANGTSÉ (Chang Jiang): El río más largo de China (6,300 km). Vital para agricultura y transporte.

MONTAÑAS Y FRONTERAS:
• Himalaya al suroeste (incluye el Monte Everest)
• Desierto de Gobi al norte
• Montañas Tian Shan al oeste
• Océano Pacífico al este

REGIONES:
• NORTE: Llanura del Río Amarillo, cultivo de trigo y mijo
• SUR: Valle del Yangtsé, cultivo de arroz
• OESTE: Montañas y mesetas (Tibet)
• ESTE: Costa marítima, comercio

CIUDADES HISTÓRICAS:
• XI'AN (Chang'an): Capital antigua, inicio de la Ruta de la Seda
• BEIJING (Pekín): Capital desde dinastía Yuan
• LUOYANG: Capital de varias dinastías
• NANJING (Nanking): Capital del sur
• SHANGHAI: Puerto comercial importante

BARRERAS NATURALES:
China estaba naturalmente protegida:
• Montañas al oeste y sur
• Desiertos al norte
• Océano al este

Esto permitió el desarrollo de una civilización única y aislada por mucho tiempo.

CLIMA:
• Norte: continental, frío y seco
• Sur: monzónico, cálido y húmedo
• Variedad de climas permite diversos cultivos`,
  },
  {
    id: 'inventos-impacto',
    title: 'Inventos Chinos y su Impacto',
    description: 'Contribuciones a la civilización mundial',
    icon: '💡',
    content: `Los chinos realizaron numerosas innovaciones que usamos hasta hoy:

LOS CUATRO GRANDES INVENTOS:

1. PAPEL (105 d.C.):
• Revolucionó la transmisión del conocimiento
• Más barato y accesible que el papiro
• Permitió la expansión de la educación
• Base de la imprenta

2. IMPRENTA (868 d.C.):
• Primera: bloques de madera (xilografía)
• Luego: tipos móviles (1040 d.C.)
• Aceleró la difusión de libros
• Gutenberg la adaptó en Europa (1450)

3. PÓLVORA (Siglo IX):
• Buscaban elixir de inmortalidad
• Primero: fuegos artificiales
• Luego: armas de fuego
• Cambió la guerra mundial

4. BRÚJULA (Siglo XI):
• Primero para feng shui
• Luego para navegación
• Permitió exploraciones marítimas
• Era de los descubrimientos

OTROS INVENTOS IMPORTANTES:

AGRICULTURA:
• Arado de hierro
• Sistemas de irrigación
• Cultivo en terrazas
• Molinos de agua

TECNOLOGÍA:
• Papel moneda (primer uso mundial)
• Porcelana fina
• Seda (proceso secreto)
• Fuegos artificiales
• Cometa
• Paraguas

MEDICINA:
• Acupuntura
• Medicina herbal
• Cirugía temprana
• Primeras vacunas (variolización)

NAVEGACIÓN:
• Timón de popa
• Compartimentos estancos en barcos
• Velas múltiples

VIDA COTIDIANA:
• Té (cultivo y ceremonia)
• Fideos
• Palillos chinos
• Carretilla
• Sismógrafo

JUEGOS:
• Mahjong
• Go (juego de estrategia)
• Juegos de cartas

Muchos de estos inventos llegaron a Occidente a través de la Ruta de la Seda y transformaron la civilización europea.`,
  },
  {
    id: 'arte-arquitectura',
    title: 'Arte y Arquitectura China',
    description: 'Expresiones culturales únicas',
    icon: '🎨',
    content: `El arte y arquitectura chinos tienen características distintivas y milenarias:

ARQUITECTURA:

PALACIOS Y TEMPLOS:
• Techos curvos con esquinas hacia arriba (ahuyentar espíritus malignos)
• Uso de madera como material principal
• Colores simbólicos: rojo (suerte), amarillo (emperador), verde (armonía)
• Simetría perfecta

CIUDAD PROHIBIDA (Beijing):
• Palacio imperial más grande del mundo
• 980 edificios, 8,704 habitaciones
• Construida en dinastía Ming (1406-1420)
• Centro del poder imperial

PAGODAS:
• Torres budistas de múltiples niveles
• Número impar de pisos (3, 5, 7, 9)
• Influencia de arquitectura india
• Muchas aún en pie después de siglos

JARDINES CHINOS:
• Diseño paisajístico armonioso
• Rocas, agua, plantas, pabellones
• Representan la naturaleza en miniatura
• Filosofía taoísta del equilibrio

ARTE:

PINTURA:
• Tinta sobre seda o papel
• Paisajes (montañas y agua)
• Caligrafía como forma de arte
• Bambú, flores de ciruelo (símbolos)

CALIGRAFÍA:
• Considerada la forma de arte más elevada
• Requiere años de práctica
• Estilos: sello, clerical, regular, cursivo, hierba
• Expresa personalidad del artista

PORCELANA:
• Cerámica fina y translúcida
• Técnica secreta por siglos
• Dinastía Ming y Qing: apogeo
• Porcelana azul y blanca famosa mundial

ESCULTURA:
• Ejército de Terracota (8,000 guerreros únicos)
• Estatuas de Buda
• Jade tallado (piedra preciosa)
• Dragones (símbolo imperial)

ÓPERA CHINA:
• Combina canto, danza, acrobacia, artes marciales
• Maquillaje elaborado (cada color significa algo)
• Trajes coloridos y máscaras
• Historias épicas e históricas

DRAGÓN Y FÉNIX:
• Dragón: emperador, poder, buena suerte (5 garras imperial)
• Fénix: emperatriz, virtud, gracia
• Presentes en arte, arquitectura, textiles`,
  },
  {
    id: 'sociedad-china',
    title: 'Estructura Social y Familia',
    description: 'Organización de la sociedad china',
    icon: '👥',
    content: `La sociedad china antigua tenía una estructura jerárquica clara:

JERARQUÍA SOCIAL:

1. EMPERADOR (天子 - Hijo del Cielo):
• Considerado intermediario entre cielo y tierra
• Poder absoluto (Mandato del Cielo)
• Si gobernaba mal, perdía el mandato (revueltas)
• Vivía en la Ciudad Prohibida

2. NOBLEZA Y MANDARINES:
• Funcionarios del gobierno
• Pasaban exámenes imperiales (muy difíciles)
• Administraban provincias
• Clase educada (confucianismo)

3. CAMPESINOS (农):
• 90% de la población
• Cultivaban arroz, trigo, mijo
• Respetados (producían alimento)
• Pagaban impuestos en grano o trabajo

4. ARTESANOS (工):
• Creaban herramientas, armas, porcelana
• Habilidades especializadas
• Status medio-bajo

5. COMERCIANTES (商):
• Paradójicamente, status más bajo
• Aunque ricos, vistos como no productivos
• Confucianismo los desaprobaba

6. ESCLAVOS:
• Pocos en comparación con otras civilizaciones
• Generalmente prisioneros de guerra
• Trabajos domésticos o forzados

FAMILIA:

SISTEMA PATRIARCAL:
• Padre: autoridad absoluta
• Hijo mayor: heredero principal
• Mujeres: subordinadas a hombres

PIEDAD FILIAL (孝):
• Valor confuciano fundamental
• Respeto absoluto a padres y ancestros
• Cuidar padres en vejez
• Honrar ancestros después de muerte

MATRIMONIO:
• Arreglado por familias
• Objetivo: continuar linaje familiar
• Mujer se unía a familia del esposo
• Poligamia permitida para ricos (concubinas)

EDUCACIÓN:
• Niños estudiaban confucianismo y caligrafía
• Exámenes imperiales: única forma de ascenso social
• Memorización de clásicos
• Niñas: educadas en casa (bordar, música, moral)

CULTO A ANCESTROS:
• Fundamental en religión china
• Altares familiares
• Ofrendas de comida e incienso
• Creencia: ancestros protegen familia`,
  },
  {
    id: 'festivales',
    title: 'Festivales y Tradiciones',
    description: 'Celebraciones de la cultura china',
    icon: '🏮',
    content: `Los festivales chinos combinan tradición, familia y celebración:

PRINCIPALES FESTIVALES:

AÑO NUEVO CHINO (春节):
• Festival más importante
• Inicio del calendario lunar (enero-febrero)
• Dura 15 días
• Limpieza de casas (eliminar mala suerte)
• Sobres rojos con dinero (hongbao)
• Fuegos artificiales y dragones
• Comida especial: dumplings, pescado
• Cada año: animal del zodiaco

FESTIVAL DE LOS FAROLES:
• Día 15 del Año Nuevo (luna llena)
• Faroles de papel decorados
• Adivinanzas en faroles
• Comida: tangyuan (bolas de arroz dulces)
• Danzas del dragón y león

FESTIVAL QINGMING (清明):
• Día de Barrer Tumbas (abril)
• Honrar ancestros
• Limpiar tumbas y hacer ofrendas
• Volar cometas
• Paseos primaverales

FESTIVAL DEL BOTE DRAGÓN:
• Día 5 del 5º mes lunar (junio)
• Conmemora al poeta Qu Yuan
• Carreras de botes dragón
• Comer zongzi (arroz envuelto en hojas)

FESTIVAL DEL MEDIO OTOÑO:
• Día 15 del 8º mes lunar (septiembre)
• Celebración de cosecha
• Luna llena
• Comer pasteles de luna (mooncakes)
• Leyenda de Chang'e (diosa de la luna)

FESTIVAL DEL DOBLE NUEVE:
• Día 9 del 9º mes (octubre)
• Subir montañas
• Beber vino de crisantemo
• Honrar ancianos

TRADICIONES:

FENG SHUI (风水):
• Arte de armonizar espacios
• Equilibrio de energías (qi)
• Dirección de edificios y muebles
• Cinco elementos: madera, fuego, tierra, metal, agua

MEDICINA TRADICIONAL:
• Equilibrio de yin y yang
• Acupuntura
• Hierbas medicinales
• Qi (energía vital)

TÉ (茶):
• Bebida nacional desde hace 5,000 años
• Ceremonia del té
• Verde, negro, oolong, blanco, pu-erh
• Beneficios medicinales

ZODIACO CHINO:
• 12 animales en ciclo de 60 años
• Rata, Buey, Tigre, Conejo, Dragón, Serpiente, Caballo, Cabra, Mono, Gallo, Perro, Cerdo
• Determina personalidad y destino`,
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
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#8B0000] mb-4">
          Recursos Educativos - China
        </h1>
        <p className="text-xl text-[#8B0000]">
          Profundiza tu conocimiento sobre la Antigua China
        </p>
      </section>

      <Tabs defaultValue="biblioteca" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-transparent p-0 gap-2 h-auto">
          <TabsTrigger
            value="biblioteca"
            className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-[#8B0000] data-[state=active]:border-[#FFD700] bg-[#DC143C] text-white text-lg font-bold transition-all py-4 rounded-lg border-4 border-transparent hover:border-[#FFD700] hover:bg-[#C41E3A]"
          >
            📖 Biblioteca
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-[#8B0000] data-[state=active]:border-[#FFD700] bg-[#DC143C] text-white text-lg font-bold transition-all py-4 rounded-lg border-4 border-transparent hover:border-[#FFD700] hover:bg-[#C41E3A]"
          >
            🎥 Videos
          </TabsTrigger>
          <TabsTrigger
            value="actividades"
            className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-[#8B0000] data-[state=active]:border-[#FFD700] bg-[#DC143C] text-white text-lg font-bold transition-all py-4 rounded-lg border-4 border-transparent hover:border-[#FFD700] hover:bg-[#C41E3A]"
          >
            🎮 Actividades
          </TabsTrigger>
        </TabsList>

        {/* Biblioteca */}
        <TabsContent value="biblioteca">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bibliotecaRecursos.map((resource) => (
              <Card
                key={resource.id}
                className="border-4 border-[#DC143C] hover:shadow-2xl transition-all hover:scale-105 bg-white"
              >
                <CardHeader>
                  <div className="text-6xl mb-4 text-center">{resource.icon}</div>
                  <CardTitle className="text-2xl font-serif text-[#8B0000] text-center font-bold">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-center text-base text-[#8B0000] font-medium">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => openResource(resource)}
                    className="w-full bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white font-bold hover:shadow-lg border-2 border-[#FFD700]"
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
                className="border-4 border-[#FFD700] bg-white"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{video.icon}</div>
                      <div>
                        <CardTitle className="text-2xl font-serif text-[#8B0000] font-bold">
                          {video.title}
                        </CardTitle>
                        <CardDescription className="text-base text-[#8B0000] font-medium">
                          {video.description}
                        </CardDescription>
                      </div>
                    </div>
                    {video.duration && (
                      <div className="bg-[#FFD700] text-[#8B0000] px-3 py-1 rounded-full font-bold text-sm">
                        ⏱️ {video.duration}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video w-full rounded-lg overflow-hidden border-4 border-[#DC143C] shadow-lg">
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
                  <div className="bg-gradient-to-r from-[#FFF9E6] to-[#FFE4B5] p-4 rounded-lg border-2 border-[#DC143C]">
                    <p className="text-base text-[#8B0000] leading-relaxed font-medium">
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
                className="border-4 border-[#FFD700] hover:shadow-2xl transition-all hover:scale-105 bg-white"
              >
                <CardHeader>
                  <div className="text-6xl mb-4 text-center">{resource.icon}</div>
                  <CardTitle className="text-2xl font-serif text-[#8B0000] text-center font-bold">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-center text-base text-[#8B0000] font-medium">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => openResource(resource)}
                    className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B0000] font-bold hover:shadow-lg border-2 border-[#8B0000]"
                  >
                    Explorar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog para mostrar contenido */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl border-4 border-[#FFD700] bg-white max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="text-6xl text-center mb-4">{selectedResource?.icon}</div>
            <DialogTitle className="text-3xl font-serif text-[#8B0000] text-center font-bold">
              {selectedResource?.title}
            </DialogTitle>
            <DialogDescription className="text-lg text-center text-[#8B0000] font-semibold">
              {selectedResource?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <p className="text-base leading-relaxed text-[#8B0000] font-medium whitespace-pre-line">
              {selectedResource?.content}
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#DC143C] to-[#8B0000] p-4 rounded-lg text-center border-2 border-[#FFD700]">
            <p className="text-white font-bold text-lg">
              💡 ¡Sigue explorando para aprender más sobre la Antigua China!
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Carrusel de datos curiosos */}
      <section className="mt-16">
        <h2 className="text-4xl font-serif font-bold text-[#8B0000] text-center mb-8">
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
              { icon: '🏮', fact: 'La Gran Muralla China tiene más de 21,000 km de longitud, cruzando montañas y desiertos' },
              { icon: '🧧', fact: 'El papel fue inventado en China en el año 105 d.C. por Cai Lun' },
              { icon: '🎆', fact: 'Los fuegos artificiales fueron inventados en China hace más de 2,000 años' },
              { icon: '🍜', fact: 'Los fideos se inventaron en China hace más de 4,000 años' },
              { icon: '⚔️', fact: 'El Ejército de Terracota tiene más de 8,000 guerreros únicos' },
              { icon: '🐉', fact: 'El dragón chino tiene 5 garras cuando representa al emperador' },
              { icon: '🏛️', fact: 'La Ciudad Prohibida tiene 9,999 habitaciones y medio (solo el cielo tiene 10,000)' },
              { icon: '🧭', fact: 'La brújula fue inventada en China y primero se usó para feng shui' },
              { icon: '📜', fact: 'El libro impreso más antiguo del mundo es chino: el Sutra del Diamante (868 d.C.)' },
              { icon: '🎋', fact: 'El bambú crece tan rápido que se puede escuchar su crecimiento' },
              { icon: '🍵', fact: 'El té se consume en China desde hace 5,000 años' },
              { icon: '🏮', fact: 'Los faroles de papel se inventaron en China hace más de 2,000 años' },
              { icon: '🥋', fact: 'Las artes marciales chinas (kung fu) tienen más de 4,000 años de antigüedad' },
              { icon: '🎨', fact: 'La porcelana china era tan valiosa que se pagaba con su peso en oro' },
              { icon: '⚱️', fact: 'La seda se producía en China desde el 3000 a.C. y su técnica era secreta' },
            ].map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="border-3 border-[#DC143C] bg-white hover:shadow-lg transition-all">
                    <CardContent className="p-6 text-center flex flex-col items-center justify-center min-h-[180px]">
                      <div className="text-5xl mb-4">{item.icon}</div>
                      <p className="text-sm text-[#8B0000] font-semibold leading-relaxed">{item.fact}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-3 border-[#FFD700] text-[#8B0000] hover:bg-[#FFD700] hover:text-white font-bold -left-4 md:-left-12" />
          <CarouselNext className="border-3 border-[#FFD700] text-[#8B0000] hover:bg-[#FFD700] hover:text-white font-bold -right-4 md:-right-12" />
        </Carousel>
      </section>
    </main>
  );
}
