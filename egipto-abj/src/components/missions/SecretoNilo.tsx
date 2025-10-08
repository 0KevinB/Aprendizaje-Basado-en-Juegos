'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SecretoNiloProps {
  onComplete: (data: { teamName: string; motto: string; hieroglyphics: string }) => void;
}

const egyptianAlphabet: Record<string, string> = {
  'a': '𓄿', 'b': '𓃀', 'c': '𓍿', 'd': '𓂧', 'e': '𓇋', 'f': '𓆑',
  'g': '𓎼', 'h': '𓉔', 'i': '𓇋', 'j': '𓆓', 'k': '𓎡', 'l': '𓃭',
  'm': '𓅓', 'n': '𓈖', 'o': '𓅱', 'p': '𓊪', 'q': '𓏘', 'r': '𓂋',
  's': '𓋴', 't': '𓏏', 'u': '𓅱', 'v': '𓆑', 'w': '𓅱', 'x': '𓎡𓋴',
  'y': '𓏭', 'z': '𓊃',
  ' ': '  '
};

const roleDescriptions = [
  { role: 'Escriba', description: 'Transcribe el nombre del equipo en jeroglíficos', icon: '✍️' },
  { role: 'Diseñador', description: 'Crea el diseño visual del cartucho', icon: '🎨' },
  { role: 'Narrador', description: 'Explica el significado del nombre elegido', icon: '📢' },
  { role: 'Historiador', description: 'Investiga y contextualiza la cultura egipcia', icon: '📚' },
];

export function SecretoNilo({ onComplete }: SecretoNiloProps) {
  const [teamName, setTeamName] = useState('');
  const [motto, setMotto] = useState('');
  const [hieroglyphics, setHieroglyphics] = useState('');
  const [showNarrative, setShowNarrative] = useState(true);

  const convertToHieroglyphics = (text: string) => {
    return text
      .toLowerCase()
      .split('')
      .map(char => egyptianAlphabet[char] || char)
      .join('');
  };

  const handleNameChange = (value: string) => {
    setTeamName(value);
    setHieroglyphics(convertToHieroglyphics(value));
  };

  const handleSubmit = () => {
    if (teamName && motto && hieroglyphics) {
      onComplete({ teamName, motto, hieroglyphics });
    }
  };

  return (
    <div className="space-y-6">
      {/* Narrative Section */}
      {showNarrative && (
        <Card className="border-4 border-[#FFD700] bg-gradient-to-br from-[#f5f1e8] to-[#E6BE8A]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-serif text-[#0f1e30]">
                📜 MISIÓN 1: El Secreto del Nilo
              </CardTitle>
              <Button
                variant="ghost"
                onClick={() => setShowNarrative(false)}
                className="text-[#0f1e30]"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-[#1e3a5f]">
            <p className="text-lg leading-relaxed">
              <strong>Hace más de cuatro mil años</strong>, en medio de desiertos interminables y dunas doradas,
              se alzó una civilización que deslumbró al mundo: el Antiguo Egipto. Muchos se preguntan cómo fue
              posible que en un lugar tan árido naciera una cultura tan poderosa. <strong>La respuesta se
              encuentra en un río inmenso y generoso: el Nilo.</strong>
            </p>
            <p className="text-lg leading-relaxed">
              Cada año, sus aguas crecían e inundaban los campos, dejando tras de sí un barro fértil que
              alimentaba a los campesinos y permitía cosechas abundantes. Así, en medio del desierto, los
              egipcios hallaron la clave de la vida y la riqueza.
            </p>
            <p className="text-lg leading-relaxed">
              Pero Egipto no solo vivía de sus cosechas. Sus reyes, llamados <strong>faraones</strong>,
              ordenaron construir obras colosales que aún hoy se levantan hacia el cielo: las <strong>pirámides</strong>.
              Estos monumentos no eran simples tumbas, sino símbolos de poder y eternidad.
            </p>
            <p className="text-lg leading-relaxed">
              El faraón no era un gobernante común: era considerado un <strong>dios en la tierra</strong>,
              el mediador entre el cielo y los hombres. Su sola presencia inspiraba respeto, miedo y devoción.
            </p>
            <p className="text-lg leading-relaxed">
              La obsesión por la eternidad se expresaba también en la <strong>momificación</strong>. Los egipcios
              creían que la vida no terminaba con la muerte, sino que el alma viajaba a otro mundo. Para que ese
              viaje fuera posible, el cuerpo debía conservarse intacto.
            </p>
            <div className="bg-[#FFD700] p-6 rounded-lg border-2 border-[#B8860B] mt-6">
              <p className="text-xl font-bold text-[#0f1e30] text-center">
                Ahora, jóvenes exploradores, el destino los convoca: deben descifrar las huellas de esta
                civilización milenaria. Solo si logran comprender los secretos del Nilo obtendrán el
                <strong> Sello del Escriba</strong>.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Roles Distribution */}
      <Card className="border-4 border-[#40E0D0] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#0f1e30]">
            Distribución de Roles del Equipo
          </CardTitle>
          <CardDescription className="text-base text-[#1e3a5f]">
            Cada miembro del equipo tiene una responsabilidad importante
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {roleDescriptions.map((roleInfo, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-[#f5f1e8] to-[#E6D5B8] p-4 rounded-lg border-2 border-[#C19A6B]"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{roleInfo.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg text-[#0f1e30]">{roleInfo.role}</h3>
                    <p className="text-sm text-[#1e3a5f]">{roleInfo.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Activity */}
      <Card className="border-4 border-[#FFD700] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#0f1e30]">
            Crea Tu Cartucho Egipcio
          </CardTitle>
          <CardDescription className="text-base text-[#1e3a5f]">
            Escribe el nombre de tu equipo y obsérvalo transformarse en jeroglíficos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Team Name Input */}
          <div className="space-y-2">
            <Label htmlFor="teamName" className="text-lg font-semibold text-[#0f1e30]">
              Nombre del Equipo
            </Label>
            <Input
              id="teamName"
              value={teamName}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Ej: Guardianes del Nilo"
              className="text-lg p-6 border-3 border-[#C19A6B]"
            />
          </div>

          {/* Hieroglyphics Display */}
          {hieroglyphics && (
            <div className="bg-gradient-to-r from-[#E6BE8A] to-[#C19A6B] p-8 rounded-lg border-4 border-[#B8860B]">
              <h3 className="text-lg font-bold text-[#0f1e30] mb-4 text-center">
                Tu Cartucho en Jeroglíficos:
              </h3>
              <div className="bg-white p-6 rounded-lg">
                <p className="text-5xl text-center font-serif text-[#0f1e30] tracking-wider">
                  {hieroglyphics}
                </p>
              </div>
            </div>
          )}

          {/* Motto Input */}
          <div className="space-y-2">
            <Label htmlFor="motto" className="text-lg font-semibold text-[#0f1e30]">
              Lema del Equipo
            </Label>
            <Input
              id="motto"
              value={motto}
              onChange={(e) => setMotto(e.target.value)}
              placeholder="Ej: Por la eternidad y el conocimiento"
              className="text-lg p-6 border-3 border-[#C19A6B]"
            />
            <p className="text-sm text-[#1e3a5f]">
              Explica por qué eligieron este nombre y qué representa dentro de la cultura del Antiguo Egipto
            </p>
          </div>

          {/* Alphabet Reference */}
          <div className="bg-[#f5f1e8] p-6 rounded-lg border-2 border-[#C19A6B]">
            <h4 className="font-bold text-[#0f1e30] mb-3">📖 Alfabeto Egipcio de Referencia:</h4>
            <div className="grid grid-cols-6 md:grid-cols-13 gap-2 text-center">
              {Object.entries(egyptianAlphabet).slice(0, 26).map(([letter, hieroglyph]) => (
                <div key={letter} className="flex flex-col items-center">
                  <span className="text-2xl">{hieroglyph}</span>
                  <span className="text-xs font-semibold text-[#1e3a5f] uppercase">{letter}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!teamName || !motto || !hieroglyphics}
            className="w-full bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#0f1e30] text-xl py-7 font-bold border-3 border-[#B8860B] hover:shadow-2xl transition-all disabled:opacity-50"
          >
            🏺 Obtener el Sello del Escriba
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
