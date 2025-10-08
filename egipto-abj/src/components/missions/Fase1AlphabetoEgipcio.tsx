'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface Fase1Props {
  onComplete: (data: { teamName: string; hieroglyphics: string; explanation: string }) => void;
}

const egyptianAlphabet = [
  { letter: 'A', hieroglyph: '𓄿', name: 'Buitre egipcio' },
  { letter: 'B', hieroglyph: '𓃀', name: 'Pierna' },
  { letter: 'C', hieroglyph: '𓍿', name: 'Cesta' },
  { letter: 'D', hieroglyph: '𓂧', name: 'Mano' },
  { letter: 'E', hieroglyph: '𓇋', name: 'Junco' },
  { letter: 'F', hieroglyph: '𓆑', name: 'Víbora cornuda' },
  { letter: 'G', hieroglyph: '𓎼', name: 'Soporte de jarra' },
  { letter: 'H', hieroglyph: '𓉔', name: 'Patio' },
  { letter: 'I', hieroglyph: '𓇋', name: 'Junco' },
  { letter: 'J', hieroglyph: '𓆓', name: 'Cobra' },
  { letter: 'K', hieroglyph: '𓎡', name: 'Colina' },
  { letter: 'L', hieroglyph: '𓃭', name: 'León' },
  { letter: 'M', hieroglyph: '𓅓', name: 'Búho' },
  { letter: 'N', hieroglyph: '𓈖', name: 'Agua' },
  { letter: 'O', hieroglyph: '𓅱', name: 'Codorniz' },
  { letter: 'P', hieroglyph: '𓊪', name: 'Estera' },
  { letter: 'Q', hieroglyph: '𓏘', name: 'Pendiente de colina' },
  { letter: 'R', hieroglyph: '𓂋', name: 'Boca' },
  { letter: 'S', hieroglyph: '𓋴', name: 'Tela doblada' },
  { letter: 'T', hieroglyph: '𓏏', name: 'Pan' },
  { letter: 'U', hieroglyph: '𓅱', name: 'Codorniz' },
  { letter: 'V', hieroglyph: '𓆑', name: 'Víbora cornuda' },
  { letter: 'W', hieroglyph: '𓅱', name: 'Codorniz' },
  { letter: 'X', hieroglyph: '𓎡𓋴', name: 'K+S' },
  { letter: 'Y', hieroglyph: '𓏭', name: 'Dos juncos' },
  { letter: 'Z', hieroglyph: '𓊃', name: 'Cerrojo' },
];

const roleDescriptions = [
  { role: '✍️ Escriba', description: 'Transcribe el nombre del equipo en jeroglíficos' },
  { role: '🎨 Diseñador', description: 'Crea el diseño visual del cartucho' },
  { role: '📢 Narrador', description: 'Explica el significado del nombre elegido' },
  { role: '📚 Historiador', description: 'Investiga y contextualiza la cultura egipcia' },
];

export function Fase1AlphabetoEgipcio({ onComplete }: Fase1Props) {
  const [teamName, setTeamName] = useState('');
  const [selectedHieroglyphs, setSelectedHieroglyphs] = useState<string[]>([]);
  const [explanation, setExplanation] = useState('');
  const [showNarrative, setShowNarrative] = useState(true);

  const addHieroglyph = (hieroglyph: string, letter: string) => {
    setSelectedHieroglyphs([...selectedHieroglyphs, hieroglyph]);
    setTeamName(teamName + letter);
  };

  const clearLast = () => {
    setSelectedHieroglyphs(selectedHieroglyphs.slice(0, -1));
    setTeamName(teamName.slice(0, -1));
  };

  const clearAll = () => {
    setSelectedHieroglyphs([]);
    setTeamName('');
  };

  const addSpace = () => {
    setSelectedHieroglyphs([...selectedHieroglyphs, '  ']);
    setTeamName(teamName + ' ');
  };

  const handleSubmit = () => {
    if (teamName.trim() && selectedHieroglyphs.length > 0 && explanation.trim()) {
      onComplete({
        teamName,
        hieroglyphics: selectedHieroglyphs.join(''),
        explanation
      });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* Narrative */}
      {showNarrative && (
        <Card className="border-4 border-[#FFD700] bg-gradient-to-br from-[#f5f1e8] to-[#E6BE8A]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-serif text-[#0f1e30]">
                📜 FASE 1 - AVENTURA: El Secreto del Nilo
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
              se alzó una civilización que deslumbró al mundo: el Antiguo Egipto.
            </p>
            <p className="text-lg leading-relaxed">
              Cada año, el <strong>Nilo</strong> crecía e inundaba los campos, dejando tras de sí un barro fértil.
              Los <strong>faraones</strong> ordenaron construir las <strong>pirámides</strong>, símbolos de poder y eternidad.
              La <strong>momificación</strong> era su forma de alcanzar la vida eterna.
            </p>
            <div className="bg-[#FFD700] p-6 rounded-lg border-2 border-[#B8860B]">
              <p className="text-xl font-bold text-[#0f1e30] text-center">
                🏺 <strong>DESAFÍO:</strong> Usando el alfabeto egipcio, forma el nombre de tu equipo en jeroglíficos
                y explica qué representa dentro de la cultura del Antiguo Egipto. Solo así obtendrás el
                <strong> Sello del Escriba</strong>.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Roles */}
      <Card className="border-4 border-[#40E0D0] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#0f1e30]">
            👥 Distribución de Roles del Equipo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {roleDescriptions.map((roleInfo, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-[#f5f1e8] to-[#E6D5B8] p-4 rounded-lg border-2 border-[#C19A6B]"
              >
                <h3 className="font-bold text-lg text-[#0f1e30]">{roleInfo.role}</h3>
                <p className="text-sm text-[#1e3a5f]">{roleInfo.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cartucho Display */}
      <Card className="border-4 border-[#FFD700] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#0f1e30] text-center">
            🏺 Tu Cartucho Real
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-8 rounded-lg border-4 border-[#8B6F47] min-h-[150px] shadow-lg">
            <div className="bg-white p-6 rounded-lg border-3 border-[#8B6F47] min-h-[100px] flex items-center justify-center">
              {selectedHieroglyphs.length === 0 ? (
                <p className="text-[#666666] text-lg font-semibold">Selecciona los jeroglíficos para formar tu nombre...</p>
              ) : (
                <div className="space-y-2">
                  <p className="text-5xl text-center font-serif text-[#000000] tracking-wider break-all">
                    {selectedHieroglyphs.join('')}
                  </p>
                  <p className="text-2xl text-center text-[#000000] font-bold mt-4">
                    {teamName}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <Button
              onClick={addSpace}
              className="bg-[#2E8B57] hover:bg-[#228B22] text-white font-extrabold shadow-md border-2 border-[#1a5c3a]"
            >
              ➕ Espacio
            </Button>
            <Button
              onClick={clearLast}
              disabled={selectedHieroglyphs.length === 0}
              className="bg-[#FF8C00] hover:bg-[#FF7F00] text-white font-extrabold disabled:opacity-30 shadow-md border-2 border-[#CC6600]"
            >
              ⬅️ Borrar Último
            </Button>
            <Button
              onClick={clearAll}
              disabled={selectedHieroglyphs.length === 0}
              className="bg-[#DC143C] hover:bg-[#B22222] text-white font-extrabold disabled:opacity-30 shadow-md border-2 border-[#8B0000]"
            >
              🗑️ Borrar Todo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Egyptian Alphabet Selector */}
      <Card className="border-4 border-[#FFD700] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#0f1e30] text-center">
            📖 Alfabeto Egipcio - Haz clic en las letras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
            {egyptianAlphabet.map((item) => (
              <Button
                key={item.letter}
                onClick={() => addHieroglyph(item.hieroglyph, item.letter)}
                className="flex flex-col items-center p-4 h-auto bg-white border-3 border-[#8B6F47] hover:border-[#FFD700] hover:bg-[#FFF8DC] transition-all shadow-md hover:shadow-xl"
                title={item.name}
              >
                <span className="text-4xl mb-2 text-[#2C1810]">{item.hieroglyph}</span>
                <span className="text-base font-extrabold text-[#000000]">{item.letter}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Explanation */}
      <Card className="border-4 border-[#FFD700] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-[#0f1e30]">
            📝 Explica tu nombre
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label htmlFor="explanation" className="text-lg font-bold text-[#000000]">
            ¿Por qué eligieron este nombre y qué representa dentro de la cultura del Antiguo Egipto?
          </Label>
          <textarea
            id="explanation"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Ejemplo: Elegimos 'Guardianes del Nilo' porque el Nilo era sagrado y daba vida a Egipto. Como guardianes, protegeríamos el conocimiento de esta gran civilización..."
            className="w-full min-h-[150px] p-4 border-3 border-[#8B6F47] rounded-lg text-base resize-y text-[#000000] placeholder:text-[#666666] bg-white"
            rows={6}
          />

          <Button
            onClick={handleSubmit}
            disabled={!teamName.trim() || selectedHieroglyphs.length === 0 || !explanation.trim()}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#000000] text-xl py-8 font-extrabold border-3 border-[#8B6F47] hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {!teamName.trim() || selectedHieroglyphs.length === 0 || !explanation.trim()
              ? '⚠️ Completa el cartucho y la explicación'
              : '🏺 Obtener el Sello del Escriba'
            }
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
