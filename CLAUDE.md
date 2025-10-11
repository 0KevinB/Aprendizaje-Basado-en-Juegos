# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Aprendizaje Basado en Juegos (ABJ)** - Educational game-based learning platform for teaching ancient civilizations to students (~12 years old). The platform features multiple ancient civilizations (Egypt, Mesopotamia, India, China) with interactive missions, dynamic question generation, progress tracking, and Firebase authentication.

## Technology Stack

- **Next.js 15** with App Router and Turbopack
- **TypeScript** with strict mode
- **Tailwind CSS 4** with PostCSS
- **shadcn/ui** for component library
- **Firebase** for authentication and Firestore database
- **React 19**

## Development Commands

### Running the App

```bash
npm run dev        # Start development server with Turbopack
npm run build      # Production build with Turbopack
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Working with Firebase

The app requires Firebase configuration in `.env.local`:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

Refer to `.env.local.example` for the template.

## Architecture

### Route Structure

The app uses Next.js App Router with a nested civilization-based structure:

```
/                           # Home page with AuthForm (if not logged in)
/imperios                   # Civilization selection page
/imperios/[empireId]        # Empire-specific home (egipto, india, mesopotamia, china)
/imperios/[empireId]/misiones       # Mission selection for that empire
/imperios/[empireId]/juego/[missionId]  # Dynamic game component for specific mission
/imperios/[empireId]/progreso       # User progress page
/imperios/[empireId]/recursos       # Educational resources
```

**Legacy routes** (egipto-specific, kept for backwards compatibility):

- `/misiones`, `/juego/[missionId]`, `/progreso`, `/recursos`

### Authentication Flow

1. **AuthContext** (`src/contexts/AuthContext.tsx`): Global authentication state using Firebase Auth

   - Manages user authentication state
   - Creates user profiles in Firestore on signup
   - Initializes user progress tracking

2. All pages check `useAuth()` hook for authentication
3. Unauthenticated users are redirected to home page with `AuthForm`
4. User data stored in two Firestore collections:
   - `users/{userId}` - user profile
   - `userProgress/{userId}` - game progress, points, levels, achievements

### Game System Architecture

**Mission Components**:

- Egypt: `ConsejoFaraon.tsx`, `SecretoNilo.tsx`, `SecretosNilo.tsx`, `GranRetoNilo.tsx`
- Egypt (Phase-based): `Fase1AlphabetoEgipcio.tsx`, `Fase2ConsejoFaraon.tsx`, `Fase3SecretosNilo.tsx`, `Fase4GranRetoNilo.tsx`
- India: `Fase1RioSagrado.tsx`, `Fase2ConsejoLoto.tsx`, `Fase3AjedrezSabios.tsx`, `Fase4SabiosIndo.tsx`

### Multi-Empire System

The codebase is structured to support multiple civilizations:

**Implemented Empires**:

- **Egipto** (Egyptian) - Fully implemented with 4 missions
- **India** (Indian) - Fully implemented with 4 missions

**Pending Empires**:

- **Mesopotamia** - Landing page only, missions not implemented
- **China** - Landing page only, missions not implemented

Each empire has:

- Unique theme colors and styling (defined in page components)
- Custom mission components (`src/components/missions/[empire]/`)
- Dedicated route structure under `/imperios/[empireId]`
- Separate game generators (for India, separate generators needed)

### Firebase Collections Structure

**users** collection:

- `uid`, `email`, `displayName`, `photoURL`, `createdAt`

**userProgress** collection:

- `userId`, `totalPoints`, `completedMissions[]`, `currentLevel`
- `achievements[]`, `missionProgress{}`, `lastUpdated`

### Component Organization

- **UI Components** (`src/components/ui/`): shadcn/ui components
- **Auth Components**: `AuthForm.tsx` - Login/signup form
- **Navigation**: `Navbar.tsx`, `EmpireNavbar.tsx` - Context-aware navigation
- **Mission Components** (`src/components/missions/`): Game implementations
  - Egypt missions in root `missions/` folder
  - Empire-specific missions in `missions/[empire]/` subfolders

## Key Patterns

### Adding New Questions

Edit `src/lib/gameGenerators.ts` and add to the corresponding mission's question array. The `shuffle()` function randomizes question order for REFLEXIÓN and APLICACIÓN missions.

### Adding New Missions

1. Create mission type in `src/types/index.ts` under `GameType`
2. Add question generator in `src/lib/gameGenerators.ts`
3. Create mission component in `src/components/missions/[empire]/`
4. Add route handler in `src/app/imperios/[empire]/juego/[missionId]/page.tsx`
5. Update mission list in `/imperios/[empire]/misiones/page.tsx`

### Adding New Empires

1. Add empire definition to `empires` array in `src/app/imperios/page.tsx`
2. Create empire folder structure:
   - `src/app/imperios/[empireId]/`
   - `src/components/missions/[empireId]/`
3. Implement empire-specific pages (page.tsx, misiones/page.tsx, etc.)
4. Create empire-specific game generators if needed
5. Set `available: true` in empires array when ready

### Styling Conventions

- Each empire has dedicated color schemes defined inline using Tailwind
- Egyptian theme: Gold (#FFD700), dark blue (#1e3a5f)
- Indian theme: Orange (#FF6B35), brown (#8B4000), beige backgrounds
- Font: `font-serif` for headings to match ancient theme
- Animations: `animate-float`, `animate-glow`, `animate-pulse` for thematic effects

## Important Notes

- **Turbopack is enabled** for both dev and build commands
- All client components must use `'use client'` directive
- Path alias `@/*` maps to `./src/*`
- Firebase is initialized with singleton pattern to prevent re-initialization
- ESLint configured with Next.js core-web-vitals and TypeScript rules

## Firebase Rules

Firestore security rules should enforce:

- Users can only read/write their own user document
- Users can only read/write their own progress document
- Authentication required for all operations

## Development Workflow

1. When adding educational content, ensure it's age-appropriate (~12 years old)
2. Questions should be based on ERCA methodology (Experiencia, Reflexión, Conceptualización, Aplicación)
3. Test question generation randomness by refreshing mission pages
4. Verify Firebase writes for progress tracking after completing missions
5. Check responsive design on mobile (students use tablets/phones)
