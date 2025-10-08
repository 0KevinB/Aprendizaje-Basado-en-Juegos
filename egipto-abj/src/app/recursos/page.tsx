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
