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
    features: ['4 Misiones Épicas', 'Código de Hammurabi', 'Escritura Cuneiforme'],
    available: true,
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
    features: ['4 Misiones Épicas', 'Hinduismo y Budismo', 'Sistema Decimal y Cero'],
    available: true,
  },
  {
    id: 'china',
    name: 'Antigua China',
    icon: '🐉',
    color: 'from-[#DC143C] to-[#8B0000]',
    borderColor: 'border-[#DC143C]',
    bgColor: 'bg-gradient-to-br from-[#FFF9E6] to-[#FFE4B5]',
    textColor: 'text-[#6B0000]',
    buttonTextColor: 'text-white',
    description: 'Conoce la tierra del dragón y la Gran Muralla',
    features: ['4 Misiones Épicas', 'Inventos Chinos', 'Filosofía Confuciana'],
    available: true,
  },
];

const upcomingEmpires = [
  {
    name: 'Persia',
    icon: '🏺',
    color: 'from-[#9B59B6] to-[#8E44AD]',
  },
  {
    name: 'Fenicia',
    icon: '⛵',
    color: 'from-[#3498DB] to-[#2980B9]',
  },
  {
    name: 'Grecia',
    icon: '🏛️',
    color: 'from-[#1E90FF] to-[#4169E1]',
  },
  {
    name: 'Roma',
    icon: '🏟️',
    color: 'from-[#E74C3C] to-[#C0392B]',
  },
  {
    name: 'Inca',
    icon: '⛰️',
    color: 'from-[#F39C12] to-[#E67E22]',
  },
  {
    name: 'Maya',
    icon: '🗿',
    color: 'from-[#16A085] to-[#138D75]',
  },
  {
    name: 'Azteca',
    icon: '🦅',
    color: 'from-[#E67E22] to-[#D35400]',
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
                    className={`w-full bg-gradient-to-r ${empire.color} ${empire.buttonTextColor || empire.textColor} text-lg py-6 font-bold border-3 ${empire.borderColor} hover:shadow-xl transition-all`}
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

      {/* Coming Soon Section */}
      <section className="mb-12 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0f1e30] mb-4">
            🚧 Próximas Civilizaciones 🚧
          </h2>
          <p className="text-lg md:text-xl text-[#1e3a5f] font-semibold">
            ¡Estamos trabajando para traerte más imperios fascinantes!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {upcomingEmpires.map((empire, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-3 border-gray-300 hover:border-gray-400 transition-all hover:scale-105 flex flex-col items-center justify-center min-h-[140px] shadow-lg">
                <div className="text-5xl mb-2 opacity-50 group-hover:opacity-70 transition-opacity">
                  {empire.icon}
                </div>
                <h3 className="font-serif font-bold text-sm text-center text-gray-700 mb-2">
                  {empire.name}
                </h3>
                <div className={`w-full h-1.5 rounded-full bg-gradient-to-r ${empire.color} opacity-50`}></div>
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold shadow-md">
                Pronto
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-block bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 border-2 border-[#FFD700] shadow-lg">
            <p className="text-[#0f1e30] font-semibold flex items-center gap-2">
              <span className="text-2xl">⏳</span>
              <span>Estamos construyendo estas aventuras educativas para ti</span>
              <span className="text-2xl">⚒️</span>
            </p>
          </div>
        </div>
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
