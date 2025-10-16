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
    id: 'valle-indo',
    title: 'La Civilización del Valle del Indo',
    description: 'Una de las primeras y más misteriosas civilizaciones urbanas',
    icon: '🌊',
    content: `La Civilización del Valle del Indo (c. 3300-1300 a.C.) fue una de las tres cunas de la civilización en el Viejo Mundo, junto con Egipto y Mesopotamia.

CIUDADES PLANIFICADAS: Sus principales ciudades, Harappa y Mohenjo-Daro, muestran una increíble planificación urbana con calles en cuadrícula, sistemas de alcantarillado y edificios de ladrillo estandarizados.

ESCRITURA NO DESCIFRADA: Desarrollaron un sistema de escritura que, hasta hoy, no ha podido ser descifrado, lo que añade un gran misterio a su cultura.

COMERCIO: Eran grandes comerciantes, con evidencia de intercambio con Mesopotamia. Exportaban algodón, joyas y cerámica.

DECLIVE: Su declive es un enigma. Se cree que pudo ser por cambios climáticos que afectaron los ríos, terremotos o la llegada de nuevos pueblos.`,
  },
  {
    id: 'hinduismo-budismo',
    title: 'Hinduismo y Budismo',
    description: 'Dos de las religiones más influyentes nacidas en la India',
    icon: '🕉️',
    content: `HINDUISMO:
- Origen: Se considera la religión más antigua del mundo, sin un único fundador.
- Textos: Los Vedas, Upanishads, Puranas, Ramayana, Mahabharata, Bhagavad Gita.
- Creencias clave: Dharma (deber moral), Karma (ley de causa y efecto), Samsara (reencarnación) y Moksha (liberación).
- Dioses: La trinidad principal (Trimurti) es Brahma (creador), Vishnu (preservador) y Shiva (destructor).

BUDISMO:
- Fundador: Siddhartha Gautama, el Buda (siglo V a.C.).
- Principio: Se basa en las Cuatro Nobles Verdades sobre el sufrimiento y el Noble Camino Óctuple para superarlo.
- Objetivo: Alcanzar el Nirvana, la liberación del ciclo de sufrimiento y reencarnación.
- Expansión: Se extendió por toda Asia, convirtiéndose en una de las religiones más importantes del mundo.`,
  },
  {
    id: 'matematicas-cero',
    title: 'Matemáticas y el Número Cero',
    description: 'La invención que revolucionó las matemáticas y la ciencia',
    icon: '🔢',
    content: `La antigua India hizo contribuciones revolucionarias a las matemáticas.

EL CERO: El concepto del cero como un número y no solo como un marcador de posición fue desarrollado en la India. El matemático Brahmagupta (siglo VII d.C.) estableció las reglas para operar con el cero.

SISTEMA DECIMAL: Perfeccionaron el sistema de numeración decimal posicional (base 10), que es el que usamos hoy en día.

NÚMEROS "ARÁBIGOS": Los números que usamos (1, 2, 3, etc.) se originaron en la India y fueron transmitidos a Europa por los árabes.

ÁLGEBRA Y TRIGONOMETRÍA: Matemáticos como Aryabhata hicieron grandes avances, calculando el valor de Pi (π) con gran precisión y desarrollando las funciones seno y coseno.`,
  },
  {
    id: 'sistema-castas',
    title: 'El Sistema de Castas',
    description: 'Una estructura social jerárquica y compleja',
    icon: '👥',
    content: `El sistema de castas es una forma de estratificación social que dividía a la sociedad hindú en grupos jerárquicos.

LAS CUATRO VARNAS PRINCIPALES:
1. BRAHMANES: Sacerdotes, maestros y eruditos. La casta más alta.
2. KSHATRIYAS: Gobernantes y guerreros. Responsables de la protección y administración.
3. VAISHYAS: Comerciantes, terratenientes y agricultores.
4. SHUDRAS: Artesanos, obreros y sirvientes.

FUERA DEL SISTEMA: Los "intocables" o Dalits, que realizaban los trabajos considerados impuros.

CARACTERÍSTICAS: La pertenencia a una casta era hereditaria, determinaba la profesión, el matrimonio y las interacciones sociales. Aunque oficialmente abolido en la India moderna, su influencia persiste.`,
  },
  {
    id: 'ajedrez',
    title: 'El Origen del Ajedrez',
    description: 'El juego de estrategia que conquistó el mundo',
    icon: '♟️',
    content: `El ajedrez se originó en la India alrededor del siglo VI d.C. con el nombre de "Chaturanga".

CHATURANGA: Su nombre significa "cuatro divisiones" y representaba las cuatro ramas del ejército indio: infantería (peones), caballería (caballos), elefantes (alfiles) y carros (torres).

EVOLUCIÓN: El juego viajó a Persia, donde se llamó "Shatranj". Luego, los árabes lo llevaron a Europa, donde evolucionó hasta convertirse en el ajedrez moderno.

PROPÓSITO: No era solo un juego, sino una herramienta para enseñar estrategia militar y pensamiento táctico a los príncipes y nobles.`,
  },
  {
    id: 'medicina-ayurveda',
    title: 'Medicina Ayurveda',
    description: 'Un sistema de sanación holístico y milenario',
    icon: '🌿',
    content: `Ayurveda, que significa "la ciencia de la vida" en sánscrito, es uno de los sistemas de medicina más antiguos del mundo, con más de 5,000 años de historia.

HOLÍSTICO: Trata al individuo como un todo (cuerpo, mente y espíritu) y busca el equilibrio.

DOSHAS: Se basa en la idea de tres energías vitales o "doshas" (Vata, Pitta, Kapha). La enfermedad se considera un desequilibrio de estas energías.

TRATAMIENTOS: Utiliza dietas, hierbas medicinales, masajes, meditación y yoga para restaurar el equilibrio.

CIRUGÍA: Textos antiguos como el "Sushruta Samhita" describen procedimientos quirúrgicos complejos, incluyendo las primeras formas de cirugía plástica (rinoplastia).`,
  },
];

interface VideoResource extends Resource {
  videoUrl: string;
  duration?: string;
}

const videosEducativos: VideoResource[] = [
  {
    id: 'video-resumen',
    title: 'Historia de la ANTIGUA INDIA - Resumen',
    description: 'Un resumen de la historia, organización y legado de la Antigua India.',
    icon: '▶️',
    videoUrl: 'https://www.youtube.com/embed/2togva9WM6I',
    duration: '8:56',
    content: 'Un video que explora los orígenes de la civilización india, su organización política, social y económica, y el importante legado que ha dejado en el mundo.',
  },
  {
    id: 'video-documental-completo',
    title: 'Toda la historia de la India antigua | Documental',
    description: 'Un documental completo para sumergirse en la historia de la India.',
    icon: '🎬',
    videoUrl: 'https://www.youtube.com/embed/EmDcnpP46EM',
    duration: '1:41:15',
    content: 'Un documental exhaustivo que recorre la historia de la Antigua India, desde sus primeras civilizaciones hasta la consolidación de sus grandes imperios y filosofías.',
  },
];

const actividadesInteractivas: Resource[] = [
  {
    id: 'timeline-india',
    title: 'Línea de Tiempo de la Antigua India',
    description: 'Cronología de las civilizaciones y imperios',
    icon: '📅',
    content: `La historia de la Antigua India es vasta y compleja:

CIVILIZACIÓN DEL VALLE DEL INDO (c. 3300-1300 a.C.): Primeras ciudades planificadas como Harappa y Mohenjo-Daro.

PERIODO VÉDICO (c. 1500-500 a.C.): Llegada de los pueblos arios. Composición de los Vedas. Desarrollo del sistema de castas.

NACIMIENTO DEL BUDISMO Y JAINISMO (c. 500 a.C.): Siddhartha Gautama (Buda) y Mahavira predican nuevas filosofías.

IMPERIO MAURYA (322-185 a.C.): Primer gran imperio unificado de la India. El emperador Ashoka se convierte al budismo y promueve la paz.

IMPERIO GUPTA (c. 320-550 d.C.): Considerada la "Edad de Oro" de la India. Grandes avances en ciencia, matemáticas, arte y literatura. Invención del cero.`,
  },
  {
    id: 'mapa-india',
    title: 'Geografía de la Antigua India',
    description: 'Los ríos y montañas que dieron forma a una civilización',
    icon: '🗺️',
    content: `La geografía de la India es diversa y ha jugado un papel crucial en su historia.

RÍOS SAGRADOS: El Indo y el Ganges son los más importantes. Proporcionaron agua para la agricultura y fueron centros de desarrollo espiritual.

BARRERAS NATURALES: La Cordillera del Himalaya al norte y el Océano Índico al sur aislaron y protegieron a la civilización, permitiendo un desarrollo cultural único.

CLIMA MONZÓNICO: Las lluvias monzónicas anuales son vitales para la agricultura, pero también pueden causar inundaciones devastadoras.`,
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
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#FF671F] mb-4">
          Recursos Educativos - India
        </h1>
        <p className="text-xl text-[#046A38]">
          Profundiza tu conocimiento sobre la Antigua India
        </p>
      </section>

      <Tabs defaultValue="biblioteca" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-transparent p-0 gap-2 h-auto">
          <TabsTrigger
            value="biblioteca"
            className="data-[state=active]:bg-[#FF9933] data-[state=active]:text-white data-[state=active]:border-[#FF9933] bg-[#046A38] text-white text-lg font-bold transition-all py-4 rounded-lg border-4 border-transparent hover:border-[#FF9933] hover:bg-[#059033]"
          >
            📖 Biblioteca
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            className="data-[state=active]:bg-[#FF9933] data-[state=active]:text-white data-[state=active]:border-[#FF9933] bg-[#046A38] text-white text-lg font-bold transition-all py-4 rounded-lg border-4 border-transparent hover:border-[#FF9933] hover:bg-[#059033]"
          >
            🎥 Videos
          </TabsTrigger>
          <TabsTrigger
            value="actividades"
            className="data-[state=active]:bg-[#FF9933] data-[state=active]:text-white data-[state=active]:border-[#FF9933] bg-[#046A38] text-white text-lg font-bold transition-all py-4 rounded-lg border-4 border-transparent hover:border-[#FF9933] hover:bg-[#059033]"
          >
            🎮 Actividades
          </TabsTrigger>
        </TabsList>

        <TabsContent value="biblioteca">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bibliotecaRecursos.map((resource) => (
              <Card
                key={resource.id}
                className="border-4 border-[#046A38] hover:shadow-2xl transition-all hover:scale-105 bg-white"
              >
                <CardHeader>
                  <div className="text-6xl mb-4 text-center">{resource.icon}</div>
                  <CardTitle className="text-2xl font-serif text-[#046A38] text-center font-bold">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-center text-base text-[#059033] font-medium">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => openResource(resource)}
                    className="w-full bg-gradient-to-r from-[#FF9933] to-[#FF671F] text-white font-bold hover:shadow-lg border-2 border-[#046A38]"
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
                className="border-4 border-[#138808] bg-white"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{video.icon}</div>
                      <div>
                        <CardTitle className="text-2xl font-serif text-[#046A38] font-bold">
                          {video.title}
                        </CardTitle>
                        <CardDescription className="text-base text-[#059033] font-medium">
                          {video.description}
                        </CardDescription>
                      </div>
                    </div>
                    {video.duration && (
                      <div className="bg-[#FF9933] text-white px-3 py-1 rounded-full font-bold text-sm">
                        ⏱️ {video.duration}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video w-full rounded-lg overflow-hidden border-4 border-[#046A38] shadow-lg">
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
                  <div className="bg-gradient-to-r from-[#f5f5f5] to-[#e0e0e0] p-4 rounded-lg border-2 border-[#138808]">
                    <p className="text-base text-[#046A38] leading-relaxed font-medium">
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
                className="border-4 border-[#FF9933] hover:shadow-2xl transition-all hover:scale-105 bg-white"
              >
                <CardHeader>
                  <div className="text-6xl mb-4 text-center">{resource.icon}</div>
                  <CardTitle className="text-2xl font-serif text-[#046A38] text-center font-bold">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-center text-base text-[#059033] font-medium">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => openResource(resource)}
                    className="w-full bg-gradient-to-r from-[#138808] to-[#046A38] text-white font-bold hover:shadow-lg border-2 border-[#FF9933]"
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
        <DialogContent className="max-w-2xl border-4 border-[#FF9933] bg-white max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="text-6xl text-center mb-4">{selectedResource?.icon}</div>
            <DialogTitle className="text-3xl font-serif text-[#046A38] text-center font-bold">
              {selectedResource?.title}
            </DialogTitle>
            <DialogDescription className="text-lg text-center text-[#059033] font-semibold">
              {selectedResource?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <p className="text-base leading-relaxed text-[#046A38] font-medium whitespace-pre-line">
              {selectedResource?.content}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <section className="mt-16">
        <h2 className="text-4xl font-serif font-bold text-[#046A38] text-center mb-8">
          ¿Sabías que...?
        </h2>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {[ 
              { icon: '🔢', fact: 'El concepto del número cero es uno de los mayores regalos de la India al mundo de las matemáticas.' },
              { icon: '♟️', fact: 'El ajedrez se inventó en la India con el nombre de \'Chaturanga\', que representaba al ejército.' },
              { icon: '🌿', fact: 'La medicina Ayurveda, con más de 5,000 años, es uno de los sistemas de sanación más antiguos del mundo.' },
              { icon: '💎', fact: 'Hasta el siglo XVIII, la India era la única fuente de diamantes del mundo.' },
              { icon: '🎓', fact: 'La Universidad de Nalanda fue una de las primeras grandes universidades de la historia, atrayendo a eruditos de toda Asia.' },
            ].map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="border-3 border-[#138808] bg-white hover:shadow-lg transition-all">
                    <CardContent className="p-6 text-center flex flex-col items-center justify-center min-h-[180px]">
                      <div className="text-5xl mb-4">{item.icon}</div>
                      <p className="text-sm text-[#046A38] font-semibold leading-relaxed">{item.fact}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-3 border-[#FF9933] text-[#046A38] hover:bg-[#FF9933] -left-4 md:-left-12" />
          <CarouselNext className="border-3 border-[#FF9933] text-[#046A38] hover:bg-[#FF9933] -right-4 md:-right-12" />
        </Carousel>
      </section>
    </main>
  );
}