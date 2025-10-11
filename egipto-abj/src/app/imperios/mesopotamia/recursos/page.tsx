'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const recursos = [
  {
    category: 'Geografía y Civilización',
    icon: '🗺️',
    items: [
      {
        title: 'Entre Dos Ríos',
        description: 'Mesopotamia significa "tierra entre ríos" en griego, ubicada entre el Tigris y el Éufrates.',
        content: [
          'Tigris y Éufrates: ríos que dieron vida a la civilización',
          'Región conocida como la Media Luna Fértil',
          'Territorio actual de Irak, Kuwait y partes de Siria y Turquía',
          'Clima cálido y seco que requirió sistemas de irrigación avanzados',
        ],
      },
      {
        title: 'Ciudades-Estado',
        description: 'Mesopotamia se organizaba en ciudades-estado independientes con gobiernos propios.',
        content: [
          'Uruk: una de las primeras ciudades del mundo (c. 4000 a.C.)',
          'Ur, Babilonia, Nínive y Assur fueron ciudades importantes',
          'Cada ciudad tenía su propio zigurat y deidad protectora',
          'Competencia y comercio entre las ciudades-estado',
        ],
      },
    ],
  },
  {
    category: 'Política y Leyes',
    icon: '⚖️',
    items: [
      {
        title: 'El Código de Hammurabi',
        description: 'Uno de los primeros conjuntos de leyes escritas de la historia (c. 1750 a.C.).',
        content: [
          'Contiene 282 leyes grabadas en una estela de piedra',
          'Principio de "ojo por ojo, diente por diente"',
          'Regulaba comercio, propiedad, familia y justicia',
          'Las penas variaban según la clase social del infractor',
        ],
      },
      {
        title: 'Reyes y Gobernantes',
        description: 'Mesopotamia tuvo grandes reyes que expandieron imperios y consolidaron el poder.',
        content: [
          'Sargón de Acad: fundó el primer imperio mesopotámico unificado',
          'Hammurabi: rey de Babilonia, famoso por su código de leyes',
          'Nabucodonosor II: construyó los Jardines Colgantes de Babilonia',
          'Ashurbanipal: rey asirio conocido por su gran biblioteca',
        ],
      },
    ],
  },
  {
    category: 'Economía y Comercio',
    icon: '💰',
    items: [
      {
        title: 'Agricultura Avanzada',
        description: 'La agricultura fue la base de la economía mesopotámica.',
        content: [
          'Cultivo de cebada, trigo, dátiles y legumbres',
          'Sistemas de canales y diques para riego artificial',
          'Uso del arado tirado por bueyes',
          'Domesticación de ovejas, cabras, cerdos y ganado',
        ],
      },
      {
        title: 'Comercio y Rutas',
        description: 'Mesopotamia fue un centro comercial que conectaba distintas regiones.',
        content: [
          'Intercambio de granos, textiles, metales y cerámica',
          'Rutas comerciales hacia Egipto, India y Anatolia',
          'Uso de sellos cilíndricos para marcar propiedad',
          'Primeros sistemas de trueque y luego monedas de plata',
        ],
      },
    ],
  },
  {
    category: 'Cultura y Religión',
    icon: '🏛️',
    items: [
      {
        title: 'Religión Politeísta',
        description: 'Los mesopotámicos adoraban a múltiples dioses relacionados con la naturaleza.',
        content: [
          'Anu (dios del cielo), Enlil (dios del viento), Ea (dios del agua)',
          'Ishtar (diosa del amor y la guerra)',
          'Marduk: dios patrón de Babilonia',
          'Creían que los dioses controlaban todos los aspectos de la vida',
        ],
      },
      {
        title: 'Los Ziggurats',
        description: 'Templos escalonados que servían como centros religiosos y administrativos.',
        content: [
          'Estructuras piramidales con múltiples niveles',
          'Construidos con ladrillos de adobe',
          'El Zigurat de Ur es uno de los mejor conservados',
          'Torre de Babel: posiblemente inspirada en un zigurat',
        ],
      },
      {
        title: 'Epopeya de Gilgamesh',
        description: 'Una de las obras literarias más antiguas de la humanidad.',
        content: [
          'Relata las aventuras del rey Gilgamesh de Uruk',
          'Temas de amistad, mortalidad y búsqueda de la inmortalidad',
          'Contiene una versión antigua del mito del diluvio universal',
          'Escrita en tablillas de arcilla con escritura cuneiforme',
        ],
      },
    ],
  },
  {
    category: 'Aportes a la Humanidad',
    icon: '📜',
    items: [
      {
        title: 'La Escritura Cuneiforme',
        description: 'El primer sistema de escritura desarrollado por los sumerios (c. 3200 a.C.).',
        content: [
          'Signos en forma de cuña grabados en tablillas de arcilla',
          'Inicialmente pictográfica, luego evolucionó a fonética',
          'Usada para registros administrativos, literatura y leyes',
          'Base para otros sistemas de escritura del Cercano Oriente',
        ],
      },
      {
        title: 'Matemáticas y Astronomía',
        description: 'Los mesopotámicos hicieron grandes avances en matemáticas y observación celeste.',
        content: [
          'Sistema sexagesimal (base 60): 60 minutos, 60 segundos',
          'División del círculo en 360 grados',
          'Cálculos de áreas, volúmenes y operaciones básicas',
          'Observación de planetas y predicción de eclipses',
        ],
      },
      {
        title: 'La Rueda',
        description: 'Invención revolucionaria que transformó el transporte y la producción.',
        content: [
          'Primero usada para alfarería (rueda de alfarero)',
          'Posteriormente adaptada para vehículos y carros',
          'Facilitó el transporte de mercancías y personas',
          'Fundamental para el desarrollo tecnológico posterior',
        ],
      },
      {
        title: 'El Calendario',
        description: 'Los mesopotámicos desarrollaron un calendario lunar para organizar el tiempo.',
        content: [
          'Calendario de 12 meses lunares (354 días)',
          'Agregaban un mes extra periódicamente para ajustar el año solar',
          'Dividieron el día en 24 horas',
          'Base para los calendarios modernos',
        ],
      },
    ],
  },
];

export default function MesopotamiaRecursosPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="text-7xl mb-4">📚</div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#2C1810] mb-4">
          Recursos Educativos - Mesopotamia
        </h1>
        <p className="text-xl text-[#2C1810] max-w-3xl mx-auto">
          Explora el conocimiento de la Cuna de la Civilización: desde la escritura cuneiforme hasta el Código de Hammurabi
        </p>
      </section>

      {/* Quick Links */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {recursos.map((recurso) => (
          <a
            key={recurso.category}
            href={`#${recurso.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition-all border-2 border-[#2C1810]"
          >
            {recurso.icon} {recurso.category}
          </a>
        ))}
      </div>

      {/* Resource Sections */}
      <div className="space-y-16 max-w-6xl mx-auto">
        {recursos.map((categoria) => (
          <section
            key={categoria.category}
            id={categoria.category.toLowerCase().replace(/\s+/g, '-')}
            className="scroll-mt-8"
          >
            <h2 className="text-4xl font-serif font-bold text-[#2C1810] mb-8 text-center">
              {categoria.icon} {categoria.category}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {categoria.items.map((item, idx) => (
                <Card
                  key={idx}
                  className="border-4 border-[#8B4513] bg-white hover:shadow-2xl transition-all"
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-[#2C1810]">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-base text-[#3D2817] font-medium">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {item.content.map((point, pointIdx) => (
                        <li
                          key={pointIdx}
                          className="flex items-start gap-3 text-[#1e3a5f]"
                        >
                          <span className="text-[#D2691E] text-xl flex-shrink-0 mt-0.5">
                            ✦
                          </span>
                          <span className="font-medium leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Additional Resources */}
      <section className="mt-16 max-w-4xl mx-auto">
        <Card className="border-4 border-[#FFD700] bg-gradient-to-br from-[#F4A460] to-[#DEB887]">
          <CardHeader>
            <div className="text-7xl text-center mb-3">📖</div>
            <CardTitle className="text-4xl font-serif text-[#2C1810] text-center">
              Datos Fascinantes de Mesopotamia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/70 rounded-lg p-5 border-2 border-[#8B4513]">
                <h3 className="font-bold text-lg text-[#2C1810] mb-2">🏙️ Primera Ciudad</h3>
                <p className="text-[#1e3a5f]">
                  Uruk fue una de las primeras ciudades del mundo, con una población estimada
                  de 50,000 habitantes alrededor del año 3000 a.C.
                </p>
              </div>
              <div className="bg-white/70 rounded-lg p-5 border-2 border-[#8B4513]">
                <h3 className="font-bold text-lg text-[#2C1810] mb-2">🍺 Cerveza Antigua</h3>
                <p className="text-[#1e3a5f]">
                  Los sumerios elaboraban cerveza desde el 4000 a.C. y tenían una diosa
                  de la cerveza llamada Ninkasi. ¡Incluso tenían recetas en tablillas!
                </p>
              </div>
              <div className="bg-white/70 rounded-lg p-5 border-2 border-[#8B4513]">
                <h3 className="font-bold text-lg text-[#2C1810] mb-2">📚 Bibliotecas</h3>
                <p className="text-[#1e3a5f]">
                  La biblioteca de Ashurbanipal en Nínive contenía más de 30,000 tablillas
                  de arcilla, preservando conocimiento sobre literatura, medicina y astronomía.
                </p>
              </div>
              <div className="bg-white/70 rounded-lg p-5 border-2 border-[#8B4513]">
                <h3 className="font-bold text-lg text-[#2C1810] mb-2">🌾 Jardines Colgantes</h3>
                <p className="text-[#1e3a5f]">
                  Los Jardines Colgantes de Babilonia, una de las Siete Maravillas del Mundo
                  Antiguo, fueron construidos por Nabucodonosor II para su esposa.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="mt-16 text-center max-w-3xl mx-auto">
        <Card className="border-4 border-[#8B4513] bg-gradient-to-r from-white to-[#F4A460]">
          <CardHeader>
            <div className="text-7xl mb-3">🎮</div>
            <CardTitle className="text-3xl font-serif text-[#2C1810]">
              ¡Pon a Prueba tu Conocimiento!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xl text-[#2C1810] font-semibold">
              Ahora que conoces más sobre Mesopotamia, completa las misiones y conviértete en un Guardián del Legado Eterno
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/imperios/mesopotamia/misiones">
                <Button className="bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white hover:shadow-xl text-xl px-8 py-6 font-bold border-2 border-[#2C1810]">
                  🎮 Ir a Misiones
                </Button>
              </Link>
              <Link href="/imperios/mesopotamia/progreso">
                <Button className="bg-gradient-to-r from-[#D2691E] to-[#CD853F] text-white hover:shadow-xl text-xl px-8 py-6 font-bold border-2 border-[#2C1810]">
                  📊 Ver Progreso
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
