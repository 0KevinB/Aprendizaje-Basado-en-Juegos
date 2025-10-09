'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RecursosRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/imperios/egipto/recursos');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-6xl animate-glow">𓂀</div>
    </div>
  );
}
