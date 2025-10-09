'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function JuegoPage() {
  const router = useRouter();
  const params = useParams();
  const missionId = params.missionId as string;

  useEffect(() => {
    // Redirect to new empire structure
    router.push(`/imperios/egipto/juego/${missionId}`);
  }, [router, missionId]);

  // This page should not render any content - it only redirects
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-6xl animate-glow">𓂀</div>
    </div>
  );
}
