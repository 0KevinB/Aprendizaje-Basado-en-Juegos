'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function IndiaHome() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFE5B4] to-[#FFDAB9]">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="text-9xl mb-6 animate-pulse">🕉️</div>
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#8B4000] mb-4">
          Antigua India
        </h1>
        <p className="text-2xl text-[#8B4000] max-w-3xl mx-auto font-semibold">
          Descubre la cuna del hinduismo, el budismo y los aportes científicos que cambiaron el mundo
        </p>
      </section>

      {/* Intro Cards */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-4 border-[#FF6B35] bg-white hover:scale-105 transition-all">
            <CardHeader>
              <div className="text-6xl mb-3 text-center">🏛️</div>
              <CardTitle className="text-center font-serif text-[#8B4000]">
                Harappa y Mohenjo-Daro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#8B4000] text-center">
                Ciudades planificadas con calles rectas y sistemas de drenaje avanzados
              </p>
            </CardContent>
          </Card>

          <Card className="border-4 border-[#FF6B35] bg-white hover:scale-105 transition-all">
            <CardHeader>
              <div className="text-6xl mb-3 text-center">☸️</div>
              <CardTitle className="text-center font-serif text-[#8B4000]">
                Hinduismo y Budismo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#8B4000] text-center">
                Dos de las religiones más influyentes que nacieron en esta tierra sagrada
              </p>
            </CardContent>
          </Card>

          <Card className="border-4 border-[#FF6B35] bg-white hover:scale-105 transition-all">
            <CardHeader>
              <div className="text-6xl mb-3 text-center">🔢</div>
              <CardTitle className="text-center font-serif text-[#8B4000]">
                Sistema Decimal y Cero
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#8B4000] text-center">
                Inventos matemáticos que transformaron la ciencia mundial
              </p>
            </CardContent>
          </Card>

          <Card className="border-4 border-[#FF6B35] bg-white hover:scale-105 transition-all">
            <CardHeader>
              <div className="text-6xl mb-3 text-center">🧘</div>
              <CardTitle className="text-center font-serif text-[#8B4000]">
                Yoga y Ayurveda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#8B4000] text-center">
                Disciplinas milenarias para el equilibrio del cuerpo y la mente
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <Card className="border-4 border-[#FF6B35] bg-gradient-to-br from-white to-[#FFE5B4] max-w-2xl mx-auto">
            <CardHeader>
              <div className="text-7xl mb-3">📜</div>
              <CardTitle className="text-4xl font-serif text-[#8B4000]">
                ¡Tu aventura comienza aquí!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-xl text-[#8B4000] font-semibold">
                Explora las misiones, descubre los aportes de la Antigua India y conviértete en un Sabio del Indo
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/imperios/india/misiones">
                  <Button className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white hover:shadow-xl text-xl px-8 py-6 font-bold border-2 border-[#8B4000]">
                    🎮 Comenzar Misiones
                  </Button>
                </Link>
                <Link href="/imperios/india/recursos">
                  <Button className="bg-gradient-to-r from-[#F7931E] to-[#FFD700] text-[#8B4000] hover:shadow-xl text-xl px-8 py-6 font-bold border-2 border-[#8B4000]">
                    📚 Ver Recursos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
