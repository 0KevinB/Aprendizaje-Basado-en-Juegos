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
        title: 'El Valle del Indo',
        description: 'Una de las civilizaciones más antiguas del mundo, surgida alrededor del río Indo.',
        content: [
          'Harappa y Mohenjo-Daro fueron las ciudades principales',
          'Desarrollaron un sistema avanzado de planificación urbana',
          'Construyeron sistemas de drenaje y alcantarillado sofisticados',
          'La civilización floreció entre 3300 y 1300 a.C.',
        ],
      },
      {
        title: 'Geografía de la India Antigua',
        description: 'La geografía jugó un papel fundamental en el desarrollo de la civilización india.',
        content: [
          'Ríos sagrados: Indo, Ganges, Yamuna, Brahmaputra',
          'Cordillera del Himalaya al norte',
          'Clima monzónico que permitió la agricultura',
          'Península rodeada por el Océano Índico',
        ],
      },
    ],
  },
  {
    category: 'Religión y Filosofía',
    icon: '☸️',
    items: [
      {
        title: 'Hinduismo',
        description: 'Una de las religiones más antiguas del mundo, con una rica tradición de textos sagrados.',
        content: [
          'Textos sagrados: Vedas, Upanishads, Bhagavad Gita',
          'Trinidad hindú: Brahma (creador), Vishnu (preservador), Shiva (destructor)',
          'Concepto de karma y reencarnación',
          'Sistema de castas basado en el dharma',
        ],
      },
      {
        title: 'Budismo',
        description: 'Fundado por Siddhartha Gautama (Buda) en el siglo VI a.C.',
        content: [
          'Las Cuatro Nobles Verdades sobre el sufrimiento',
          'El Noble Camino Óctuple hacia la iluminación',
          'Concepto de nirvana (liberación del ciclo de reencarnación)',
          'Meditación y mindfulness como prácticas centrales',
        ],
      },
      {
        title: 'Yoga y Espiritualidad',
        description: 'Disciplina milenaria para el equilibrio del cuerpo, mente y espíritu.',
        content: [
          'Desarrollo de posturas (asanas) y técnicas de respiración',
          'Búsqueda de la unión entre cuerpo y mente',
          'Diferentes caminos: Raja Yoga, Karma Yoga, Bhakti Yoga',
          'Influencia mundial en prácticas de bienestar',
        ],
      },
    ],
  },
  {
    category: 'Ciencia y Tecnología',
    icon: '🔢',
    items: [
      {
        title: 'Matemáticas',
        description: 'Los matemáticos indios hicieron contribuciones fundamentales a las matemáticas.',
        content: [
          'Invención del número CERO (0) por Brahmagupta',
          'Desarrollo del sistema decimal posicional',
          'Creación de los números "arábigos" (originalmente indios)',
          'Avances en álgebra y trigonometría',
        ],
      },
      {
        title: 'Astronomía',
        description: 'Observación avanzada de los astros y cálculos astronómicos precisos.',
        content: [
          'Aryabhata calculó el valor de π (pi) con precisión',
          'Reconocieron que la Tierra gira sobre su eje',
          'Desarrollaron calendarios lunares y solares',
          'Observatorios astronómicos antiguos',
        ],
      },
      {
        title: 'Medicina Ayurvédica',
        description: 'Sistema de medicina tradicional con más de 5000 años de antigüedad.',
        content: [
          'Enfoque holístico: equilibrio de cuerpo, mente y espíritu',
          'Uso de hierbas medicinales y tratamientos naturales',
          'Cirugías plásticas tempranas documentadas',
          'Textos médicos: Charaka Samhita y Sushruta Samhita',
        ],
      },
    ],
  },
  {
    category: 'Sociedad y Cultura',
    icon: '🏛️',
    items: [
      {
        title: 'Sistema de Castas',
        description: 'Estructura social jerárquica basada en el hinduismo.',
        content: [
          'Brahmanes: sacerdotes y maestros',
          'Kshatriyas: guerreros y gobernantes',
          'Vaishyas: comerciantes y agricultores',
          'Shudras: trabajadores y sirvientes',
          'Intocables: fuera del sistema (Dalits)',
        ],
      },
      {
        title: 'Arte y Arquitectura',
        description: 'Expresiones artísticas y arquitectónicas únicas de la India.',
        content: [
          'Templos con torres (shikhara) y esculturas detalladas',
          'Mandalas: representaciones del universo',
          'Estupas budistas para reliquias sagradas',
          'Arte en textiles, cerámica y metalurgia',
        ],
      },
      {
        title: 'Lengua y Literatura',
        description: 'Desarrollo del sánscrito y una rica tradición literaria.',
        content: [
          'Sánscrito: lengua sagrada de los textos antiguos',
          'Escritura Brahmi, antecesora de muchas escrituras asiáticas',
          'Epopeyas: Mahabharata y Ramayana',
          'Fábulas del Panchatantra',
        ],
      },
    ],
  },
  {
    category: 'Aportes al Mundo',
    icon: '🌍',
    items: [
      {
        title: 'Juegos y Entretenimiento',
        description: 'Invenciones que se convirtieron en juegos populares mundialmente.',
        content: [
          'Chaturanga: precursor del ajedrez moderno',
          'Parchís: juego de tablero estratégico',
          'Serpientes y Escaleras: juego con lecciones morales',
          'Kabaddi y otros deportes tradicionales',
        ],
      },
      {
        title: 'Agricultura y Comercio',
        description: 'Innovaciones en cultivos y rutas comerciales.',
        content: [
          'Cultivo de arroz, algodón, especias y caña de azúcar',
          'Ruta de las Especias conectaba India con el mundo',
          'Domesticación del búfalo de agua',
          'Técnicas avanzadas de riego',
        ],
      },
      {
        title: 'Filosofía y Pensamiento',
        description: 'Ideas filosóficas que influenciaron el pensamiento mundial.',
        content: [
          'Concepto de ahimsa (no violencia) influenció a Gandhi y MLK',
          'Meditación y mindfulness adoptados globalmente',
          'Karma y dharma como principios éticos universales',
          'Debate y lógica en las escuelas filosóficas',
        ],
      },
    ],
  },
];

export default function IndiaRecursosPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="text-7xl mb-4">📚</div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#8B4000] mb-4">
          Recursos Educativos - India
        </h1>
        <p className="text-xl text-[#8B4000] max-w-3xl mx-auto">
          Explora el conocimiento de la Antigua India: desde sus aportes matemáticos hasta su rica espiritualidad
        </p>
      </section>

      {/* Quick Links */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {recursos.map((recurso) => (
          <a
            key={recurso.category}
            href={`#${recurso.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition-all border-2 border-[#8B4000]"
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
            <h2 className="text-4xl font-serif font-bold text-[#8B4000] mb-8 text-center">
              {categoria.icon} {categoria.category}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {categoria.items.map((item, idx) => (
                <Card
                  key={idx}
                  className="border-4 border-[#FF6B35] bg-white hover:shadow-2xl transition-all"
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-[#8B4000]">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-base text-[#8B4000] font-medium">
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
                          <span className="text-[#FF6B35] text-xl flex-shrink-0 mt-0.5">
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
        <Card className="border-4 border-[#FFD700] bg-gradient-to-br from-[#FFE5B4] to-[#FFDAB9]">
          <CardHeader>
            <div className="text-7xl text-center mb-3">📖</div>
            <CardTitle className="text-4xl font-serif text-[#8B4000] text-center">
              Datos Fascinantes de la India Antigua
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/70 rounded-lg p-5 border-2 border-[#FF6B35]">
                <h3 className="font-bold text-lg text-[#8B4000] mb-2">🎓 Educación</h3>
                <p className="text-[#1e3a5f]">
                  La Universidad de Nalanda (siglo V) fue una de las primeras universidades del mundo,
                  con miles de estudiantes de toda Asia.
                </p>
              </div>
              <div className="bg-white/70 rounded-lg p-5 border-2 border-[#FF6B35]">
                <h3 className="font-bold text-lg text-[#8B4000] mb-2">💎 Riquezas</h3>
                <p className="text-[#1e3a5f]">
                  India fue la única fuente de diamantes hasta el siglo XVIII y era conocida como
                  la tierra de las especias y las joyas.
                </p>
              </div>
              <div className="bg-white/70 rounded-lg p-5 border-2 border-[#FF6B35]">
                <h3 className="font-bold text-lg text-[#8B4000] mb-2">🔤 Lenguas</h3>
                <p className="text-[#1e3a5f]">
                  El sánscrito es considerado la "madre de todas las lenguas" y ha influenciado
                  muchos idiomas europeos y asiáticos.
                </p>
              </div>
              <div className="bg-white/70 rounded-lg p-5 border-2 border-[#FF6B35]">
                <h3 className="font-bold text-lg text-[#8B4000] mb-2">🌾 Agricultura</h3>
                <p className="text-[#1e3a5f]">
                  Los agricultores indios fueron los primeros en cultivar algodón y producir
                  telas de algodón hace más de 5000 años.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="mt-16 text-center max-w-3xl mx-auto">
        <Card className="border-4 border-[#FF6B35] bg-gradient-to-r from-white to-[#FFE5B4]">
          <CardHeader>
            <div className="text-7xl mb-3">🎮</div>
            <CardTitle className="text-3xl font-serif text-[#8B4000]">
              ¡Pon a Prueba tu Conocimiento!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xl text-[#8B4000] font-semibold">
              Ahora que conoces más sobre la Antigua India, completa las misiones y conviértete en un Sabio del Indo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/imperios/india/misiones">
                <Button className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white hover:shadow-xl text-xl px-8 py-6 font-bold border-2 border-[#8B4000]">
                  🎮 Ir a Misiones
                </Button>
              </Link>
              <Link href="/imperios/india/progreso">
                <Button className="bg-gradient-to-r from-[#F7931E] to-[#FFD700] text-[#8B4000] hover:shadow-xl text-xl px-8 py-6 font-bold border-2 border-[#8B4000]">
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
