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
    id: 'nilo',
    title: 'El Río Nilo',
    description: 'La fuente de vida del Antiguo Egipto',
    icon: '🌊',
    content: `El Río Nilo fue fundamental para el desarrollo de la civilización egipcia. Sus inundaciones anuales depositaban limo fértil en las orillas, permitiendo la agricultura. Los egipcios llamaban a su tierra "Kemet" (tierra negra) por el color del suelo fértil.`,
  },
  {
    id: 'piramides-construccion',
    title: 'Construcción de Pirámides',
    description: 'Cómo se construyeron las maravillas',
    icon: '🔺',
    content: `Las pirámides se construyeron usando millones de bloques de piedra caliza. Los trabajadores (no esclavos) usaban rampas, palancas y trabajo en equipo. La Gran Pirámide de Giza tiene más de 2.3 millones de bloques.`,
  },
  {
    id: 'escritura',
    title: 'Sistema de Escritura',
    description: 'Los jeroglíficos egipcios',
    icon: '📝',
    content: `Los jeroglíficos eran el sistema de escritura sagrado de Egipto. Combinaban símbolos fonéticos y pictóricos. Solo los escribas aprendían a leerlos y escribirlos, lo que les daba un estatus especial.`,
  },
];

const videosEducativos: Resource[] = [
  {
    id: 'video-piramides',
    title: 'Las Pirámides de Giza',
    description: 'Documental sobre las grandes pirámides',
    icon: '🎥',
    content: 'Las tres pirámides principales de Giza fueron construidas por los faraones Keops, Kefrén y Micerinos. Son las únicas de las Siete Maravillas del Mundo Antiguo que aún existen.',
  },
  {
    id: 'video-tutankamon',
    title: 'El Tesoro de Tutankamón',
    description: 'Descubrimiento de la tumba intacta',
    icon: '🎬',
    content: 'En 1922, Howard Carter descubrió la tumba de Tutankamón casi intacta. Contenía más de 5,000 objetos, incluyendo la famosa máscara de oro del faraón.',
  },
];

const actividadesInteractivas: Resource[] = [
  {
    id: 'timeline',
    title: 'Línea de Tiempo',
    description: 'Explora las dinastías egipcias',
    icon: '📅',
    content: 'La historia del Antiguo Egipto se divide en tres periodos principales: Reino Antiguo (pirámides), Reino Medio (expansión) y Reino Nuevo (apogeo del imperio).',
  },
  {
    id: 'map',
    title: 'Mapa del Antiguo Egipto',
    description: 'Geografía y ciudades importantes',
    icon: '🗺️',
    content: 'El Antiguo Egipto se extendía a lo largo del río Nilo. Ciudades importantes incluían Menfis (capital del Reino Antiguo), Tebas (capital del Reino Nuevo) y Alejandría (periodo helenístico).',
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
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-transparent p-0 gap-2 h-auto">
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
          <div className="grid md:grid-cols-2 gap-6">
            {videosEducativos.map((resource) => (
              <Card
                key={resource.id}
                className="border-4 border-[#40E0D0] hover:shadow-2xl transition-all hover:scale-105 bg-white"
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
                    className="w-full bg-gradient-to-r from-[#40E0D0] to-[#20B2AA] text-[#0f1e30] font-bold hover:shadow-lg border-2 border-[#20B2AA]"
                  >
                    Ver información
                  </Button>
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
