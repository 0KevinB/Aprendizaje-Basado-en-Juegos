'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ChinaHome() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFF9E6] to-[#FFE4B5]">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="text-9xl mb-6 animate-pulse">🐉</div>
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#8B0000] mb-4">
          Antigua China
        </h1>
        <p className="text-2xl text-[#8B0000] max-w-3xl mx-auto font-semibold">
          Descubre la tierra del dragón, los grandes inventos y la sabiduría milenaria
        </p>
      </section>

      {/* Intro Cards */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-4 border-[#DC143C] bg-white hover:scale-105 transition-all">
            <CardHeader>
              <div className="text-6xl mb-3 text-center">🏯</div>
              <CardTitle className="text-center font-serif text-[#8B0000]">
                Dinastías Imperiales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#8B0000] text-center">
                Desde Qin hasta Ming, explora las dinastías que forjaron un imperio milenario
              </p>
            </CardContent>
          </Card>

          <Card className="border-4 border-[#DC143C] bg-white hover:scale-105 transition-all">
            <CardHeader>
              <div className="text-6xl mb-3 text-center">🧧</div>
              <CardTitle className="text-center font-serif text-[#8B0000]">
                Grandes Inventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#8B0000] text-center">
                Papel, brújula, pólvora e imprenta: inventos que cambiaron el mundo
              </p>
            </CardContent>
          </Card>

          <Card className="border-4 border-[#DC143C] bg-white hover:scale-105 transition-all">
            <CardHeader>
              <div className="text-6xl mb-3 text-center">🏮</div>
              <CardTitle className="text-center font-serif text-[#8B0000]">
                La Gran Muralla
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#8B0000] text-center">
                Una maravilla del mundo antiguo que se extiende por miles de kilómetros
              </p>
            </CardContent>
          </Card>

          <Card className="border-4 border-[#DC143C] bg-white hover:scale-105 transition-all">
            <CardHeader>
              <div className="text-6xl mb-3 text-center">☯️</div>
              <CardTitle className="text-center font-serif text-[#8B0000]">
                Filosofía China
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#8B0000] text-center">
                Confucianismo, Taoísmo y el arte de la estrategia que guió imperios
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <Card className="border-4 border-[#DC143C] bg-gradient-to-br from-white to-[#FFF9E6] max-w-2xl mx-auto">
            <CardHeader>
              <div className="text-7xl mb-3">📜</div>
              <CardTitle className="text-4xl font-serif text-[#8B0000]">
                ¡Tu aventura comienza aquí!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-xl text-[#8B0000] font-semibold">
                Explora las misiones, descubre los aportes de la Antigua China y conviértete en un Maestro del Imperio
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/imperios/china/misiones">
                  <Button className="bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white hover:shadow-xl text-xl px-8 py-6 font-bold border-2 border-[#FFD700]">
                    🎮 Comenzar Misiones
                  </Button>
                </Link>
                <Link href="/imperios/china/recursos">
                  <Button className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B0000] hover:shadow-xl text-xl px-8 py-6 font-bold border-2 border-[#8B0000]">
                    📚 Ver Recursos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-[#8B0000] to-[#DC143C] rounded-3xl p-8 md:p-12 text-white border-4 border-[#FFD700]">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-8 text-[#FFD700]">
            Tu Aventura China Te Espera
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/15 rounded-2xl p-6 backdrop-blur border-2 border-white/20 hover:bg-white/25 transition-all">
              <div className="text-5xl mb-3">📚</div>
              <div className="text-4xl font-bold text-[#FFD700] mb-2">4</div>
              <div className="text-lg font-semibold text-white">Fases Épicas</div>
            </div>
            <div className="bg-white/15 rounded-2xl p-6 backdrop-blur border-2 border-white/20 hover:bg-white/25 transition-all">
              <div className="text-5xl mb-3">🎯</div>
              <div className="text-4xl font-bold text-[#FFD700] mb-2">20+</div>
              <div className="text-lg font-semibold text-white">Preguntas</div>
            </div>
            <div className="bg-white/15 rounded-2xl p-6 backdrop-blur border-2 border-white/20 hover:bg-white/25 transition-all">
              <div className="text-5xl mb-3">⭐</div>
              <div className="text-4xl font-bold text-[#FFD700] mb-2">400</div>
              <div className="text-lg font-semibold text-white">Puntos Máximos</div>
            </div>
            <div className="bg-white/15 rounded-2xl p-6 backdrop-blur border-2 border-white/20 hover:bg-white/25 transition-all">
              <div className="text-5xl mb-3">🐉</div>
              <div className="text-4xl font-bold text-[#FFD700] mb-2">4</div>
              <div className="text-lg font-semibold text-white">Misiones Únicas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#8B0000] text-center mb-12">
          ¿Qué aprenderás?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border-4 border-[#DC143C] bg-white hover:shadow-2xl transition-all hover:scale-105">
            <CardHeader>
              <div className="text-6xl mb-4 text-center">🎮</div>
              <CardTitle className="font-serif text-2xl text-[#8B0000] text-center font-bold">
                Juegos Interactivos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-center text-[#8B0000] font-medium leading-relaxed">
                Memoramas, sopas de letras, tableros y el legendario juego de Go adaptado para aprender
              </p>
            </CardContent>
          </Card>

          <Card className="border-4 border-[#DC143C] bg-white hover:shadow-2xl transition-all hover:scale-105">
            <CardHeader>
              <div className="text-6xl mb-4 text-center">📖</div>
              <CardTitle className="font-serif text-2xl text-[#8B0000] text-center font-bold">
                Historia y Cultura
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-center text-[#8B0000] font-medium leading-relaxed">
                Conoce los aportes científicos, filosóficos y culturales de China a la humanidad
              </p>
            </CardContent>
          </Card>

          <Card className="border-4 border-[#DC143C] bg-white hover:shadow-2xl transition-all hover:scale-105">
            <CardHeader>
              <div className="text-6xl mb-4 text-center">🏆</div>
              <CardTitle className="font-serif text-2xl text-[#8B0000] text-center font-bold">
                Progreso y Logros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-center text-[#8B0000] font-medium leading-relaxed">
                Gana puntos, desbloquea misiones y rastrea tu progreso mientras te conviertes en un experto
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#8B0000] mb-6">
          ¿Listo para la Aventura China?
        </h2>
        <p className="text-xl text-[#8B0000] font-semibold mb-8">
          Explora las misiones y comienza tu viaje a la Antigua China
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/imperios/china/misiones">
            <Button className="bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white hover:shadow-xl transition-all hover:scale-105 text-lg px-8 py-6 font-bold border-3 border-[#FFD700]">
              Ver Misiones
            </Button>
          </Link>
          <Link href="/imperios/china/recursos">
            <Button variant="outline" className="border-3 border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white text-lg px-8 py-6 font-bold">
              Explorar Recursos
            </Button>
          </Link>
          <Link href="/imperios/china/progreso">
            <Button variant="outline" className="border-3 border-[#FFD700] text-[#8B0000] hover:bg-[#FFD700] text-lg px-8 py-6 font-bold">
              Ver Mi Progreso
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
