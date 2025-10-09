'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function IndiaHome() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-16 max-w-4xl mx-auto">
        <div className="text-9xl mb-8">🕉️</div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#8B4000] mb-6">
          Antigua India
        </h1>
        <Card className="border-4 border-[#FF6B35] bg-gradient-to-br from-[#FFE5B4] to-[#FFDAB9]">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-[#8B4000]">
              🚧 Próximamente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-xl text-[#8B4000] font-semibold">
              La aventura en la Antigua India está en desarrollo. Pronto podrás explorar:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="text-3xl mb-2">📿</div>
                <h3 className="font-bold text-[#8B4000] mb-1">Civilización del Indo</h3>
                <p className="text-sm text-[#8B4000]">Descubre las ciudades antiguas</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="text-3xl mb-2">🔢</div>
                <h3 className="font-bold text-[#8B4000] mb-1">Matemáticas y Astronomía</h3>
                <p className="text-sm text-[#8B4000]">El origen del sistema decimal</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="text-3xl mb-2">🏛️</div>
                <h3 className="font-bold text-[#8B4000] mb-1">Arquitectura Védica</h3>
                <p className="text-sm text-[#8B4000]">Templos y monumentos históricos</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="text-3xl mb-2">📖</div>
                <h3 className="font-bold text-[#8B4000] mb-1">Filosofía y Religión</h3>
                <p className="text-sm text-[#8B4000]">Hinduismo y Budismo</p>
              </div>
            </div>
            <Link href="/imperios">
              <Button className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white hover:shadow-xl text-lg px-8 py-6 font-bold">
                ← Volver a Imperios
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
