export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
}

export interface UserProgress {
  userId: string;
  totalPoints: number;
  completedMissions: string[];
  currentLevel: string;
  achievements: string[];
  missionProgress: Record<string, MissionProgress>;
  lastUpdated: Date;
}

export interface MissionProgress {
  missionId: string;
  progress: number;
  completed: boolean;
  score: number;
  attempts: number;
  lastAttempt: Date;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: number;
  locked: boolean;
  requiredPoints: number;
  maxPoints: number;
  gameType: GameType;
}

export type GameType =
  | 'secreto-nilo'
  | 'consejo-faraon'
  | 'secretos-nilo'
  | 'gran-reto-nilo'
  | 'mapa-rios-eternos'
  | 'guardianes-saber'
  | 'linea-tiempo-perdida'
  | 'legado-eterno'
  | 'mandato-cielo'
  | 'consejo-dragon'
  | 'secretos-gran-muralla'
  | 'go-imperio';

export interface GameQuestion {
  id: string;
  type: 'multiple-choice' | 'matching' | 'ordering' | 'fill-blank' | 'drag-drop';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  points: number;
  hint?: string;
  media?: {
    type: 'image' | 'video';
    url: string;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'interactive' | 'quiz';
  content: string;
  thumbnailUrl?: string;
}
