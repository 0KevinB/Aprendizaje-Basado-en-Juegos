'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ChinaHome() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-16 max-w-4xl mx-auto">
        <div className="text-9xl mb-8">龍</div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#8B0000] mb-6">
          Antigua China
        </h1>
        <Card className="border-4 border-[#DC143C] bg-gradient-to-br from-[#FFE4E1] to-[#FFB6C1]">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-[#8B0000]">
              🚧 Próximamente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-xl text-[#8B0000] font-semibold">
              La aventura en la Antigua China está en desarrollo. Pronto podrás explorar:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="text-3xl mb-2">🏯</div>
                <h3 className="font-bold text-[#8B0000] mb-1">Dinastías Imperiales</h3>
                <p className="text-sm text-[#8B0000]">Desde Qin hasta Ming</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="text-3xl mb-2">🧧</div>
                <h3 className="font-bold text-[#8B0000] mb-1">Grandes Inventos</h3>
                <p className="text-sm text-[#8B0000]">Papel, brújula, pólvora e imprenta</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="text-3xl mb-2">🐉</div>
                <h3 className="font-bold text-[#8B0000] mb-1">La Gran Muralla</h3>
                <p className="text-sm text-[#8B0000]">Una maravilla del mundo antiguo</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="text-3xl mb-2">☯️</div>
                <h3 className="font-bold text-[#8B0000] mb-1">Filosofía China</h3>
                <p className="text-sm text-[#8B0000]">Confucianismo, Taoísmo y más</p>
              </div>
            </div>
            <Link href="/imperios">
              <Button className="bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white hover:shadow-xl text-lg px-8 py-6 font-bold">
                ← Volver a Imperios
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
