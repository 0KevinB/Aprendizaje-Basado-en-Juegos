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
    id: 'escritura-cuneiforme',
    title: 'La Escritura Cuneiforme',
    description: 'El primer sistema de escritura de la humanidad',
    icon: '📜',
    content: `La escritura cuneiforme, inventada por los sumerios alrededor del 3200 a.C., es el sistema de escritura más antiguo conocido. Su nombre significa "en forma de cuña".

DESARROLLO: Comenzó como un sistema de pictogramas (dibujos) y evolucionó hacia un sistema de signos abstractos que representaban sonidos.

MATERIALES: Se escribía sobre tablillas de arcilla húmeda con un estilete de caña. Luego, las tablillas se secaban al sol o se cocían para endurecerlas.

USO: Se utilizó para registrar leyes (como el Código de Hammurabi), transacciones comerciales, literatura (como la Epopeya de Gilgamesh) y registros administrativos.

DESCIFRAMIENTO: Fue descifrada en el siglo XIX gracias a inscripciones trilingües como la Inscripción de Behistún.`,
  },
  {
    id: 'codigo-hammurabi',
    title: 'El Código de Hammurabi',
    description: 'Uno de los primeros conjuntos de leyes escritas',
    icon: '⚖️',
    content: `El Código de Hammurabi, creado alrededor del 1750 a.C. por el rey de Babilonia, es una de las colecciones de leyes más antiguas y mejor conservadas.

ESTRUCTURA: Contiene 282 leyes grabadas en una estela de diorita de más de 2 metros de altura. En la parte superior, se ve al dios Shamash entregando las leyes a Hammurabi.

PRINCIPIO: Se basa en la Ley del Talión ("ojo por ojo, diente por diente"), aunque las penas variaban según la clase social.

REGULACIÓN: Cubría aspectos de la vida cotidiana como el comercio, la propiedad, la familia, el trabajo y la justicia penal.

LEGADO: Estableció el principio de que la ley debe ser escrita y pública, y que el gobierno es responsable de impartir justicia.`,
  },
  {
    id: 'zigurats',
    title: 'Los Zigurats',
    description: 'Templos escalonados hacia el cielo',
    icon: '🏛️',
    content: `Los zigurats eran enormes templos en forma de pirámide escalonada, construidos en las principales ciudades de Mesopotamia.

PROPÓSITO: No eran lugares de culto público, sino la morada de los dioses. Se creía que conectaban el cielo y la tierra.

ESTRUCTURA: Tenían una base rectangular o cuadrada y se elevaban en varios niveles o terrazas, con un santuario en la cima. Se accedía a través de rampas o escaleras.

CONSTRUCCIÓN: Estaban hechos de ladrillos de adobe secados al sol, con una capa exterior de ladrillos cocidos más resistentes.

EJEMPLOS: El Zigurat de Ur es uno de los mejor conservados. La famosa Torre de Babel de la Biblia probablemente se inspiró en el zigurat de Babilonia.`,
  },
  {
    id: 'ciudades-estado',
    title: 'Ciudades-Estado Sumerias',
    description: 'Las primeras ciudades organizadas del mundo',
    icon: '🏙️',
    content: `Los sumerios, en el sur de Mesopotamia, crearon las primeras ciudades-estado alrededor del 4000 a.C.

ORGANIZACIÓN: Cada ciudad era políticamente independiente, con su propio gobierno, dios patrón y ejército. Las más importantes fueron Uruk, Ur, Lagash y Eridu.

ESTRUCTURA URBANA: Las ciudades estaban amuralladas y organizadas en torno al zigurat y el palacio. Tenían calles, mercados y barrios residenciales.

INNOVACIONES: Fueron pioneras en la escritura, la rueda, la irrigación, las leyes y la administración centralizada, sentando las bases de la civilización.`,
  },
  {
    id: 'epopeya-gilgamesh',
    title: 'La Epopeya de Gilgamesh',
    description: 'La primera gran obra literaria de la historia',
    icon: '📖',
    content: `La Epopeya de Gilgamesh es un poema épico que narra las aventuras del rey Gilgamesh de Uruk.

TEMAS: Aborda temas universales como la amistad, la búsqueda de la inmortalidad, el miedo a la muerte y el significado de la vida.

HISTORIA: Relata la amistad entre Gilgamesh y Enkidu, su lucha contra monstruos y el viaje de Gilgamesh para encontrar el secreto de la vida eterna tras la muerte de su amigo.

IMPORTANCIA: Contiene una de las versiones más antiguas del mito del diluvio universal, anterior a la historia bíblica de Noé. Fue escrita en escritura cuneiforme en tablillas de arcilla.`,
  },
  {
    id: 'inventos-mesopotamia',
    title: 'Grandes Inventos Mesopotámicos',
    description: 'Innovaciones que cambiaron el curso de la historia',
    icon: '💡',
    content: `Mesopotamia es conocida como la "Cuna de la Civilización" por sus numerosas invenciones:

LA RUEDA (c. 3500 a.C.): Primero utilizada para la alfarería y luego adaptada para carros y transporte.

LA ESCRITURA (c. 3200 a.C.): El sistema cuneiforme permitió registrar información y conocimiento.

MATEMÁTICAS Y ASTRONOMÍA: Desarrollaron el sistema sexagesimal (base 60), que usamos hoy para medir el tiempo (60 segundos, 60 minutos) y los ángulos (360 grados). Crearon el primer calendario lunar.

SISTEMAS DE IRRIGACIÓN: Construyeron canales y diques para controlar los ríos y regar los cultivos, permitiendo la agricultura a gran escala.

LA VELA: Inventaron la vela para barcos, lo que revolucionó el transporte y el comercio fluvial.`,
  },
];

interface VideoResource extends Resource {
  videoUrl: string;
  duration?: string;
}

const videosEducativos: VideoResource[] = [
  {
    id: 'video-sumerios',
    title: 'Los SUMERIOS, la primera civilización de la historia',
    description: 'Un vistazo a los pioneros de la civilización en Mesopotamia.',
    icon: '▶️',
    videoUrl: 'https://www.youtube.com/embed/ujnZmX9Cc1o',
    duration: '10:40',
    content: 'Descubre a los sumerios, la civilización que inventó la escritura, la rueda y las primeras ciudades en la fértil tierra entre los ríos Tigris y Éufrates.',
  },
  {
    id: 'video-documental-completo',
    title: 'La Épica Historia de la Antigua Mesopotamia | Documental Completo',
    description: 'Un documental que abarca toda la historia de Mesopotamia.',
    icon: '🎬',
    videoUrl: 'https://www.youtube.com/embed/b-RyhEv0M4A',
    duration: '1:10:31',
    content: 'Sumérgete en la historia completa de Mesopotamia, la cuna de la civilización, desde sus orígenes hasta su legado eterno, pasando por todos los grandes imperios que la habitaron.',
  },
];

const actividadesInteractivas: Resource[] = [
  {
    id: 'timeline-mesopotamia',
    title: 'Línea de Tiempo de Mesopotamia',
    description: 'Cronología de los imperios y eventos clave',
    icon: '📅',
    content: `La historia de Mesopotamia se extiende por más de 3,000 años:

PERIODO SUMERIO (3500-2334 a.C.): Invención de la escritura, la rueda y las ciudades-estado (Uruk, Ur).

IMPERIO ACADIO (2334-2193 a.C.): Sargón de Acad crea el primer imperio unificado.

RENACIMIENTO SUMERIO (2112-2004 a.C.): Resurgimiento de ciudades como Ur.

IMPERIO BABILÓNICO (1792-1595 a.C.): Hammurabi unifica la región y crea su famoso código de leyes.

IMPERIO ASIRIO (911-609 a.C.): Imperio militarista conocido por su crueldad y su gran biblioteca en Nínive.

IMPERIO NEOBABILÓNICO (626-539 a.C.): Nabucodonosor II reconstruye Babilonia y crea los Jardines Colgantes.

CONQUISTA PERSA (539 a.C.): Ciro el Grande conquista Babilonia, poniendo fin a la independencia de Mesopotamia.`,
  },
  {
    id: 'mapa-mesopotamia',
    title: 'Geografía de Mesopotamia',
    description: 'Ubicación y características de la Media Luna Fértil',
    icon: '🗺️',
    content: `Mesopotamia se encuentra en la región que hoy conocemos como Oriente Medio.

RÍOS: El Tigris y el Éufrates nacen en las montañas de Turquía, atraviesan Siria e Irak y desembocan en el Golfo Pérsico. Sus inundaciones depositaban limo fértil.

REGIONES:
- NORTE (Asiria): Zona montañosa con más lluvias.
- SUR (Caldea): Llanura aluvial muy fértil pero que dependía de la irrigación.

CIUDADES IMPORTANTES: Se ubicaban a lo largo de los ríos. Uruk, Ur, Babilonia, Nínive, Assur.

RECURSOS: La región era rica en arcilla (para construcción y escritura) y productos agrícolas, pero carecía de metales, madera y piedra, que debían importar.`,
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
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#4682B4] mb-4">
          Recursos Educativos - Mesopotamia
        </h1>
        <p className="text-xl text-[#2C3E50]">
          Profundiza tu conocimiento sobre la Cuna de la Civilización
        </p>
      </section>

      <Tabs defaultValue="biblioteca" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-transparent p-0 gap-2 h-auto">
          <TabsTrigger
            value="biblioteca"
            className="data-[state=active]:bg-[#D2B48C] data-[state=active]:text-[#2C1810] data-[state=active]:border-[#D2B48C] bg-[#8B4513] text-white text-lg font-bold transition-all py-4 rounded-lg border-4 border-transparent hover:border-[#D2B48C] hover:bg-[#A0522D]"
          >
            📖 Biblioteca
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            className="data-[state=active]:bg-[#D2B48C] data-[state=active]:text-[#2C1810] data-[state=active]:border-[#D2B48C] bg-[#8B4513] text-white text-lg font-bold transition-all py-4 rounded-lg border-4 border-transparent hover:border-[#D2B48C] hover:bg-[#A0522D]"
          >
            🎥 Videos
          </TabsTrigger>
          <TabsTrigger
            value="actividades"
            className="data-[state=active]:bg-[#D2B48C] data-[state=active]:text-[#2C1810] data-[state=active]:border-[#D2B48C] bg-[#8B4513] text-white text-lg font-bold transition-all py-4 rounded-lg border-4 border-transparent hover:border-[#D2B48C] hover:bg-[#A0522D]"
          >
            🎮 Actividades
          </TabsTrigger>
        </TabsList>

        <TabsContent value="biblioteca">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bibliotecaRecursos.map((resource) => (
              <Card
                key={resource.id}
                className="border-4 border-[#8B4513] hover:shadow-2xl transition-all hover:scale-105 bg-white"
              >
                <CardHeader>
                  <div className="text-6xl mb-4 text-center">{resource.icon}</div>
                  <CardTitle className="text-2xl font-serif text-[#2C1810] text-center font-bold">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-center text-base text-[#3D2817] font-medium">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => openResource(resource)}
                    className="w-full bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white font-bold hover:shadow-lg border-2 border-[#2C1810]"
                  >
                    Leer más
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos">
          <div className="grid gap-6">
            {videosEducativos.map((video) => (
              <Card
                key={video.id}
                className="border-4 border-[#4682B4] bg-white"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{video.icon}</div>
                      <div>
                        <CardTitle className="text-2xl font-serif text-[#2C1810] font-bold">
                          {video.title}
                        </CardTitle>
                        <CardDescription className="text-base text-[#3D2817] font-medium">
                          {video.description}
                        </CardDescription>
                      </div>
                    </div>
                    {video.duration && (
                      <div className="bg-[#D2B48C] text-[#2C1810] px-3 py-1 rounded-full font-bold text-sm">
                        ⏱️ {video.duration}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video w-full rounded-lg overflow-hidden border-4 border-[#8B4513] shadow-lg">
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
                  <div className="bg-gradient-to-r from-[#F5DEB3] to-[#DEB887] p-4 rounded-lg border-2 border-[#8B4513]">
                    <p className="text-base text-[#2C1810] leading-relaxed font-medium">
                      {video.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="actividades">
          <div className="grid md:grid-cols-2 gap-6">
            {actividadesInteractivas.map((resource) => (
              <Card
                key={resource.id}
                className="border-4 border-[#4682B4] hover:shadow-2xl transition-all hover:scale-105 bg-white"
              >
                <CardHeader>
                  <div className="text-6xl mb-4 text-center">{resource.icon}</div>
                  <CardTitle className="text-2xl font-serif text-[#2C1810] text-center font-bold">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-center text-base text-[#3D2817] font-medium">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => openResource(resource)}
                    className="w-full bg-gradient-to-r from-[#4682B4] to-[#5F9EA0] text-white font-bold hover:shadow-lg border-2 border-[#2C3E50]"
                  >
                    Explorar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl border-4 border-[#D2B48C] bg-white max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="text-6xl text-center mb-4">{selectedResource?.icon}</div>
            <DialogTitle className="text-3xl font-serif text-[#2C1810] text-center font-bold">
              {selectedResource?.title}
            </DialogTitle>
            <DialogDescription className="text-lg text-center text-[#3D2817] font-semibold">
              {selectedResource?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <p className="text-base leading-relaxed text-[#2C1810] font-medium whitespace-pre-line">
              {selectedResource?.content}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <section className="mt-16">
        <h2 className="text-4xl font-serif font-bold text-[#2C1810] text-center mb-8">
          ¿Sabías que...?
        </h2>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {[
              { icon: '📜', fact: 'La Epopeya de Gilgamesh contiene la historia de un diluvio universal, mucho antes que la Biblia.' },
              { icon: '🍺', fact: 'Los sumerios tenían más de 16 tipos de cerveza y la usaban como pago a los trabajadores.' },
              { icon: '⏰', fact: 'Dividieron la hora en 60 minutos y el minuto en 60 segundos, sistema que usamos hoy.' },
              { icon: '🦁', fact: 'Los reyes asirios cazaban leones como demostración de su poder y valentía.' },
              { icon: '🌱', fact: 'Los Jardines Colgantes de Babilonia son la única de las 7 Maravillas del Mundo Antiguo cuya existencia no se ha probado.' },
            ].map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="border-3 border-[#8B4513] bg-white hover:shadow-lg transition-all">
                    <CardContent className="p-6 text-center flex flex-col items-center justify-center min-h-[180px]">
                      <div className="text-5xl mb-4">{item.icon}</div>
                      <p className="text-sm text-[#3D2817] font-semibold leading-relaxed">{item.fact}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-3 border-[#D2B48C] text-[#2C1810] hover:bg-[#D2B48C] -left-4 md:-left-12" />
          <CarouselNext className="border-3 border-[#D2B48C] text-[#2C1810] hover:bg-[#D2B48C] -right-4 md:-right-12" />
        </Carousel>
      </section>
    </main>
  );
}