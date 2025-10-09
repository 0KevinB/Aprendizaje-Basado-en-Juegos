'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const empires = [
  {
    id: 'egipto',
    name: 'Antiguo Egipto',
    icon: '𓂀',
    color: 'from-[#FFD700] to-[#B8860B]',
    borderColor: 'border-[#FFD700]',
    bgColor: 'bg-gradient-to-br from-[#FFF8DC] to-[#F0E68C]',
    textColor: 'text-[#0f1e30]',
    description: 'Explora la tierra de los faraones, pirámides y jeroglíficos',
    features: ['4 Misiones Épicas', 'Jeroglíficos Reales', 'Cultura Milenaria'],
    available: true,
  },
  {
    id: 'mesopotamia',
    name: 'Mesopotamia',
    icon: '𒀭',
    color: 'from-[#8B4513] to-[#D2691E]',
    borderColor: 'border-[#8B4513]',
    bgColor: 'bg-gradient-to-br from-[#F4A460] to-[#DEB887]',
    textColor: 'text-[#2C1810]',
    description: 'Descubre la cuna de la civilización entre dos ríos',
    features: ['Escritura Cuneiforme', 'Código de Hammurabi', 'Ziggurats'],
    available: false,
  },
  {
    id: 'india',
    name: 'Antigua India',
    icon: '🕉️',
    color: 'from-[#FF6B35] to-[#F7931E]',
    borderColor: 'border-[#FF6B35]',
    bgColor: 'bg-gradient-to-br from-[#FFE5B4] to-[#FFDAB9]',
    textColor: 'text-[#8B4000]',
    description: 'Viaja al valle del Indo y sus grandes imperios',
    features: ['Filosofía Védica', 'Matemáticas', 'Arquitectura'],
    available: false,
  },
  {
    id: 'china',
    name: 'Antigua China',
    icon: '龍',
    color: 'from-[#DC143C] to-[#8B0000]',
    borderColor: 'border-[#DC143C]',
    bgColor: 'bg-gradient-to-br from-[#FFE4E1] to-[#FFB6C1]',
    textColor: 'text-[#8B0000]',
    description: 'Conoce la tierra del dragón y la Gran Muralla',
    features: ['Dinastías Imperiales', 'Inventos Antiguos', 'Filosofía'],
    available: false,
  },
];

export default function EmpiresPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-6xl animate-glow">🌍</div>
      </div>
    );
  }

  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center py-16 mb-12">
        <div className="inline-block mb-6">
          <span className="text-8xl animate-float">🌍</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#0f1e30] mb-6">
          Civilizaciones Antiguas
        </h1>
        <p className="text-xl md:text-2xl text-[#1e3a5f] font-semibold mb-8 max-w-3xl mx-auto leading-relaxed">
          Elige un imperio y embárcate en una aventura educativa a través de la historia
        </p>
      </section>

      {/* Empires Grid */}
      <section className="grid md:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
        {empires.map((empire) => (
          <Card
            key={empire.id}
            className={`border-4 ${empire.borderColor} ${empire.bgColor} hover:shadow-2xl transition-all ${
              empire.available ? 'hover:scale-105 cursor-pointer' : 'opacity-75'
            }`}
          >
            <CardHeader>
              <div className="text-7xl mb-4 text-center">{empire.icon}</div>
              <CardTitle className={`font-serif text-3xl ${empire.textColor} text-center font-bold`}>
                {empire.name}
              </CardTitle>
              {!empire.available && (
                <div className="text-center mt-2">
                  <span className="bg-gray-700 text-white px-4 py-1 rounded-full text-sm font-bold">
                    🔒 Próximamente
                  </span>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className={`text-base text-center ${empire.textColor} font-medium leading-relaxed`}>
                {empire.description}
              </CardDescription>

              {/* Features */}
              <div className="bg-white/50 rounded-lg p-4 space-y-2">
                {empire.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    <span className={`${empire.textColor} font-semibold text-sm`}>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              {empire.available ? (
                <Link href={`/imperios/${empire.id}`} className="block">
                  <Button
                    className={`w-full bg-gradient-to-r ${empire.color} ${empire.textColor} text-lg py-6 font-bold border-3 ${empire.borderColor} hover:shadow-xl transition-all`}
                  >
                    🚀 Explorar {empire.name}
                  </Button>
                </Link>
              ) : (
                <Button
                  disabled
                  className="w-full bg-gray-400 text-gray-700 text-lg py-6 font-bold cursor-not-allowed"
                >
                  🔒 Próximamente
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Info Section */}
      <section className="bg-gradient-to-r from-[#1e3a5f] to-[#0f1e30] rounded-3xl p-8 md:p-12 text-white border-4 border-[#FFD700] max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-6 text-[#FFD700]">
          ¿Por qué Civilizaciones Antiguas?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/15 rounded-2xl p-6 backdrop-blur border-2 border-white/20">
            <div className="text-4xl mb-3">🎓</div>
            <h3 className="text-xl font-bold mb-2">Aprende Jugando</h3>
            <p className="text-sm">Descubre la historia de manera interactiva y divertida</p>
          </div>
          <div className="bg-white/15 rounded-2xl p-6 backdrop-blur border-2 border-white/20">
            <div className="text-4xl mb-3">🌟</div>
            <h3 className="text-xl font-bold mb-2">Contenido Educativo</h3>
            <p className="text-sm">Material alineado con el curriculum escolar</p>
          </div>
          <div className="bg-white/15 rounded-2xl p-6 backdrop-blur border-2 border-white/20">
            <div className="text-4xl mb-3">👥</div>
            <h3 className="text-xl font-bold mb-2">Trabajo en Equipo</h3>
            <p className="text-sm">Fomenta la colaboración y comunicación</p>
          </div>
          <div className="bg-white/15 rounded-2xl p-6 backdrop-blur border-2 border-white/20">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-xl font-bold mb-2">Seguimiento</h3>
            <p className="text-sm">Visualiza tu progreso en tiempo real</p>
          </div>
        </div>
      </section>
    </main>
  );
}
