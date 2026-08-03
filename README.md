# 🏗️ Project Structure & Naming Conventions

> Feature-Sliced Design (FSD) architecture with consistent naming patterns

## 📚 Table of Contents

- [Architecture Overview](#-architecture-overview)
- [Folder Structure](#-folder-structure)
- [Naming Conventions](#-naming-conventions)
- [Layer Guidelines](#-layer-guidelines)
- [Import Rules](#-import-rules)
- [Examples](#-examples)

---

## 🎯 Architecture Overview

This project follows **Feature-Sliced Design (FSD)** methodology - a architectural methodology for frontend projects that provides standardization and structure.

### Core Principles

1. **🔄 Unidirectional Data Flow** - lower layers can't import from upper layers
2. **📦 Isolation** - modules are independent and self-contained
3. **🎨 Public API** - each module exports through `index.ts`
4. **🧩 Composability** - complex features built from simple pieces

### Layer Hierarchy

```
app/          → Application initialization & providers
  ↓
pages/        → Full page components & routing
  ↓
widgets/      → Complex composite components
  ↓
features/     → User interactions & business logic
  ↓
entities/     → Business entities & domain logic
  ↓
shared/       → Reusable utilities & UI kit
```

---

## 📁 Folder Structure

### Root Structure

```
src/
├── app/                # Application layer
├── pages/              # Pages layer
├── widgets/            # Widgets layer
├── features/           # Features layer
├── entities/           # Entities layer
└── shared/             # Shared layer
```

### Segment Structure

Each module (entity/feature/widget) follows this structure:

```
ModuleName/
├── index.ts           # Public API
├── types.ts           # TypeScript types
├── constants.ts       # Constants
├── ui/                # React components
├── model/             # Business logic (stores, hooks)
├── api/               # API requests (if needed)
└── lib/               # Helper functions
```

---

## 🎨 Naming Conventions

### 📂 Folders - `PascalCase`

All folders use PascalCase to match React components and distinguish from files.

```
✅ Good
entities/Anime/
features/AddToCollection/
widgets/AnimeList/
pages/ReleaseDetails/

❌ Bad
entities/anime/
features/add-to-collection/
widgets/anime_list/
```

### 📄 Files by Type

#### React Components → `PascalCase.tsx`

```
✅ Good
AnimeCard.tsx
ReleaseHeader.tsx
SearchInput.tsx
UserAvatar.tsx

❌ Bad
animeCard.tsx
anime-card.tsx
Card.tsx           // too generic
Component.tsx      // meaningless
```

#### TypeScript Code → `camelCase.ts`

```
✅ Good
useAnimeList.ts       # hooks
formatDate.ts         # utilities
userStore.ts          # stores
constants.ts          # constants
types.ts              # types

❌ Bad
UseAnimeList.ts       # wrong case
format-date.ts        # wrong case
user.store.ts         # avoid dots
constants.const.ts    # redundant suffix
```

#### Special Files → `lowercase`

```
index.ts
index.css
readme.md
```

---

## 📋 Naming Patterns

### 1️⃣ Components - Nouns

Components should be **descriptive nouns** that clearly indicate what they render.

```typescript
// ✅ Good - Clear and specific
AnimeCard.tsx
ReleaseHeader.tsx
UserProfile.tsx
NotificationBell.tsx
SearchBar.tsx

// ❌ Bad - Too generic or unclear
Card.tsx              // What kind of card?
Header.tsx            // Which header?
Main.tsx              // Too vague
Component.tsx         // Meaningless
```

### 2️⃣ Utilities - Verbs

Utility functions should start with **action verbs**.

```typescript
// ✅ Good - Action-oriented
formatDate.ts
formatStatus.ts
parseAnimeData.ts
calculateRating.ts
validateForm.ts
sortByDate.ts

// ❌ Bad - Unclear purpose
date.ts               // What about dates?
status.ts             // Format? Parse? Check?
utils.ts              // Too generic
helpers.ts            // Too vague
```

### 3️⃣ Hooks - `use` + Action/Entity

Custom hooks always start with `use` followed by what they do or manage.

```typescript
// ✅ Good - Clear purpose
useAnimeList.ts       // Fetches anime list
useRelease.ts         // Fetches single release
useAuth.ts            // Handles authentication
useDebounce.ts        // Debounces value
useScrollRestoration.ts

// ❌ Bad - Breaks conventions
getAnimeList.ts       // Not a hook (missing 'use')
animeHook.ts          // Unclear what it does
useAnimeList.query.ts // Redundant suffix
hook.ts               // Too generic
```

### 4️⃣ API Functions - Verb + Entity

API functions describe the action and resource.

```typescript
// shared/api/anime.ts
export const getAnimeList = async () => { }
export const getAnimeById = async (id: string) => { }
export const createAnime = async (data: AnimeData) => { }
export const updateAnime = async (id: string, data: AnimeData) => { }
export const deleteAnime = async (id: string) => { }

// ❌ Bad naming
getAnime.api.ts       // Redundant .api suffix
animeApi.ts           // Less clear than anime.ts in api/ folder
anime.ts              // In wrong folder
```

### 5️⃣ Types - Entity/Property Names

Types use clear, descriptive names without redundant suffixes.

```typescript
// types.ts
export interface Anime {
  id: string
  title: string
  status: AnimeStatus
}

export interface AnimeFilters {
  status?: AnimeStatus[]
  genres?: string[]
}

export interface AnimeListProps {
  items: Anime[]
  onItemClick?: (id: string) => void
}

export type AnimeStatus = 'ongoing' | 'completed' | 'announced'

// ❌ Bad - Redundant suffixes in file names
anime.type.ts
animeFilter.type.ts
getFilteredAnimeProps.type.ts
```

### 6️⃣ Constants - Descriptive Names

Constants use SCREAMING_SNAKE_CASE for values, descriptive names for files.

```typescript
// constants.ts
export const ANIME_FILTERS = {
  STATUS: ['ongoing', 'completed'],
  SORT: ['name', 'date']
}

export const API_ENDPOINTS = {
  ANIME: '/api/anime',
  USER: '/api/user'
}

export const DEFAULT_PAGE_SIZE = 20

// ❌ Bad file names
filters.const.ts      // Redundant .const suffix
configKeys.ts         // Unclear purpose
constants.config.ts   // Double suffix
```

### 7️⃣ Stores - Entity + Store

Store files clearly indicate they contain state management.

```typescript
// ✅ Good
userStore.ts
animeStore.ts
authStore.ts
themeStore.ts

// ❌ Bad
store.ts              // Which store?
user.ts               // Is this a store?
useUser.ts            // This looks like a hook
```

---

## 🏛️ Layer Guidelines

### `app/` - Application Layer

**Purpose**: Application initialization, global providers, routing

```
app/
├── providers/
│   ├── AppProvider.tsx        # Root provider composition
│   ├── QueryProvider.tsx      # React Query setup
│   └── InitProvider.tsx       # Initialization logic
│
├── routers/
│   ├── router.tsx             # Route configuration
│   ├── ProtectedRoute.tsx     # Auth guard
│   └── NotFoundPage.tsx       # 404 page
│
├── layouts/
│   ├── RootLayout.tsx         # Main app layout
│   └── AuthLayout.tsx         # Auth pages layout
│
└── main/
    ├── main.tsx               # Application entry
    ├── App.tsx                # Root component
    └── index.css              # Global styles
```

**Naming Rules**:
- Providers: `[Function]Provider.tsx`
- Layouts: `[Context]Layout.tsx`
- Routes: `[Feature]Route.tsx`

---

### `pages/` - Pages Layer

**Purpose**: Full-page components, URL routes, page composition

```
pages/
├── Home/
│   ├── index.ts              # Public API
│   └── Home.tsx              # Home page component
│
├── ReleaseDetails/
│   ├── index.ts
│   └── ReleaseDetails.tsx    # Release detail page
│
└── Auth/
    ├── index.ts
    └── Auth.tsx              # Authentication page
```

**Naming Rules**:
- Folder: `[PageName]/` (PascalCase, descriptive)
- Component: `[PageName].tsx` (matches folder)
- One page per folder
- Pages should compose widgets, not contain complex logic

**Example**:
```typescript
// pages/ReleaseDetails/ReleaseDetails.tsx
import { ReleaseHeader } from '@/widgets/ReleaseDetails'
import { ReleaseInfo } from '@/widgets/ReleaseDetails'

export const ReleaseDetails = () => {
  return (
    <div>
      <ReleaseHeader />
      <ReleaseInfo />
    </div>
  )
}
```

---

### `widgets/` - Widgets Layer

**Purpose**: Complex composite UI components, combining features and entities

```
widgets/
├── AnimeList/
│   ├── index.ts
│   ├── types.ts
│   │
│   ├── ui/
│   │   ├── AnimeList.tsx         # Main widget
│   │   ├── AnimeCard.tsx         # Card component
│   │   └── AnimeCardSkeleton.tsx # Loading state
│   │
│   └── lib/
│       └── formatEpisodes.ts     # Helper functions
│
├── ReleaseDetails/
│   ├── index.ts
│   │
│   ├── ui/
│   │   ├── ReleaseHeader.tsx
│   │   ├── ReleaseInfo.tsx
│   │   ├── ReleaseSidebar.tsx
│   │   └── ReleasePoster.tsx
│   │
│   └── lib/
│       ├── formatAgeRating.ts
│       └── formatEpisodes.ts
│
└── AppLayout/
    ├── index.ts
    │
    └── ui/
        ├── MainContent.tsx
        ├── Sidebar.tsx
        ├── TopBar.tsx
        └── SearchInput.tsx
```

**Naming Rules**:
- Folder: `[WidgetName]/` (descriptive, composite)
- Components: `[Component].tsx` (specific nouns)
- Utilities: `[verb][What].ts` (action verbs)

---

### `features/` - Features Layer

**Purpose**: User interactions, isolated business features

```
features/
├── AddToCollection/
│   ├── index.ts
│   │
│   ├── ui/
│   │   └── AddButton.tsx         # Action button
│   │
│   └── model/
│       └── useAddToCollection.ts # Feature logic
│
├── SearchAnime/
│   ├── index.ts
│   │
│   ├── ui/
│   │   └── SearchBar.tsx
│   │
│   └── model/
│       ├── useSearch.ts
│       └── searchStore.ts
│
└── ToggleFavorite/
    ├── index.ts
    │
    ├── ui/
    │   └── FavoriteButton.tsx
    │
    └── model/
        └── useToggleFavorite.ts
```

**Naming Rules**:
- Folder: `[Action][Entity]/` (verb + noun)
- UI Components: `[Action]Button.tsx`, `[Action]Form.tsx`
- Hooks: `use[Action].ts` or `use[Action][Entity].ts`

**Examples of good feature names**:
- `AddToCollection/` - adds items to collection
- `SearchAnime/` - searches through anime
- `ToggleFavorite/` - toggles favorite status
- `FilterAnimeList/` - filters anime list
- `SortByDate/` - sorts by date

---

### `entities/` - Entities Layer

**Purpose**: Business entities, domain models, core business logic

```
entities/
├── Anime/
│   ├── index.ts
│   ├── types.ts                 # All anime types
│   ├── constants.ts             # Anime constants
│   │
│   ├── model/
│   │   ├── useAnimeList.ts      # Fetch anime list
│   │   ├── useRelease.ts        # Fetch single release
│   │   └── animeStore.ts        # Anime state (if needed)
│   │
│   ├── ui/
│   │   └── AnimeCardBase.tsx    # Basic anime card
│   │
│   └── lib/
│       ├── formatStatus.ts      # Format anime status
│       └── formatEpisodes.ts    # Format episode info
│
└── User/
    ├── index.ts
    ├── types.ts
    │
    ├── model/
    │   └── userStore.ts         # User state management
    │
    └── ui/
        └── UserAvatar.tsx       # User avatar component
```

**Naming Rules**:
- Folder: `[Entity]/` (singular noun, PascalCase)
- Hooks: `use[Entity][Action].ts`
- Components: `[Entity][Component].tsx`
- Utilities: `format[Property].ts`, `parse[Property].ts`

**What belongs in entities**:
- ✅ Data fetching hooks
- ✅ Domain-specific formatting
- ✅ Entity state management
- ✅ Entity type definitions
- ✅ Basic entity UI components
- ❌ Business features (→ features/)
- ❌ Complex composite UI (→ widgets/)
- ❌ Page-specific logic (→ pages/)

---

### `shared/` - Shared Layer

**Purpose**: Reusable utilities, UI kit, configurations, truly shared code

```
shared/
├── api/
│   ├── index.ts
│   ├── client.ts              # Axios/fetch configuration
│   ├── anime.ts               # Anime API methods
│   └── user.ts                # User API methods
│
├── ui/
│   ├── index.ts
│   ├── Avatar.tsx             # Generic avatar
│   ├── Button.tsx             # Generic button
│   ├── Input.tsx              # Generic input
│   └── Tabs.tsx               # Generic tabs
│
├── lib/
│   ├── hooks/
│   │   ├── index.ts
│   │   ├── useDebounce.ts
│   │   ├── useScrollRestoration.ts
│   │   └── useSaveScroll.ts
│   │
│   ├── utils/
│   │   ├── index.ts
│   │   ├── cn.ts              # Classname utility
│   │   ├── formatDate.ts      # Generic date formatting
│   │   └── formatAiredInfo.ts
│   │
│   └── context/
│       ├── index.ts
│       └── Portal.tsx         # Portal context
│
├── config/
│   ├── index.ts
│   ├── routes.ts              # Route constants
│   ├── api.ts                 # API configuration
│   └── portals.ts             # Portal configuration
│
└── types/
    ├── index.ts
    └── common.ts              # Common type definitions
```

**Naming Rules**:
- API files: `[resource].ts` (anime.ts, user.ts)
- UI components: `[Component].tsx` (generic, reusable)
- Hooks: `use[Hook].ts` (no entity-specific logic)
- Utils: `[verb][What].ts` (generic operations)
- Config: `[what].ts` (descriptive)

**What belongs in shared**:
- ✅ Generic UI components (Button, Input, Modal)
- ✅ Generic hooks (useDebounce, useLocalStorage)
- ✅ Generic utilities (formatDate, cn, validators)
- ✅ API client configuration
- ✅ Common types and constants
- ❌ Business logic (→ entities/features)
- ❌ Entity-specific code (→ entities/)
- ❌ Feature-specific code (→ features/)

---

## 🔄 Import Rules

### Allowed Import Directions

```
app       → pages, widgets, features, entities, shared
pages     → widgets, features, entities, shared
widgets   → features, entities, shared
features  → entities, shared
entities  → shared
shared    → (nothing from project)
```

### Import Examples

```typescript
// ✅ Good - Following the rules
// pages/Home/Home.tsx
import { AnimeList } from '@/widgets/AnimeList'
import { useAnimeList } from '@/entities/Anime'
import { Button } from '@/shared/ui'

// widgets/AnimeList/ui/AnimeList.tsx
import { AddToCollection } from '@/features/AddToCollection'
import { useAnimeList } from '@/entities/Anime'
import { formatDate } from '@/shared/lib/utils'

// entities/Anime/model/useAnimeList.ts
import { getAnimeList } from '@/shared/api/anime'

// ❌ Bad - Breaking the rules
// entities/Anime/ui/AnimeCard.tsx
import { AddButton } from '@/features/AddToCollection' // ❌ Entity can't import feature

// shared/ui/Button.tsx
import { useAuth } from '@/entities/User' // ❌ Shared can't import entities
```

### Public API Pattern

Each module exports through `index.ts`:

```typescript
// entities/Anime/index.ts
export { useAnimeList, useRelease } from './model'
export { AnimeCardBase } from './ui'
export { formatStatus, formatEpisodes } from './lib'
export type { Anime, AnimeFilters, AnimeStatus } from './types'
export { ANIME_FILTERS, DEFAULT_FILTERS } from './constants'

// Import from public API
import { useAnimeList, Anime, formatStatus } from '@/entities/Anime'

// ❌ Don't import from internal structure
import { useAnimeList } from '@/entities/Anime/model/useAnimeList'
```

---

## 💡 Examples

### Example 1: Creating a New Feature

**Task**: Add ability to mark anime as favorite

**Step 1**: Create feature structure
```
features/ToggleFavorite/
├── index.ts
├── ui/
│   └── FavoriteButton.tsx
└── model/
    └── useToggleFavorite.ts
```

**Step 2**: Implement the feature
```typescript
// features/ToggleFavorite/model/useToggleFavorite.ts
import { useMutation } from '@tanstack/react-query'
import { toggleFavorite } from '@/shared/api/anime'

export const useToggleFavorite = () => {
  return useMutation({
    mutationFn: (animeId: string) => toggleFavorite(animeId),
  })
}

// features/ToggleFavorite/ui/FavoriteButton.tsx
import { useToggleFavorite } from '../model'

export const FavoriteButton = ({ animeId }: { animeId: string }) => {
  const { mutate } = useToggleFavorite()
  
  return (
    <button onClick={() => mutate(animeId)}>
      Add to Favorites
    </button>
  )
}

// features/ToggleFavorite/index.ts
export { FavoriteButton } from './ui/FavoriteButton'
export { useToggleFavorite } from './model/useToggleFavorite'
```

**Step 3**: Use in widget
```typescript
// widgets/AnimeList/ui/AnimeCard.tsx
import { FavoriteButton } from '@/features/ToggleFavorite'

export const AnimeCard = ({ anime }) => {
  return (
    <div>
      <h3>{anime.title}</h3>
      <FavoriteButton animeId={anime.id} />
    </div>
  )
}
```

---

### Example 2: Creating a New Entity

**Task**: Add Collection entity

**Step 1**: Create entity structure
```
entities/Collection/
├── index.ts
├── types.ts
├── constants.ts
├── model/
│   ├── useCollectionList.ts
│   └── collectionStore.ts
├── ui/
│   └── CollectionCard.tsx
└── lib/
    └── formatCollectionSize.ts
```

**Step 2**: Define types
```typescript
// entities/Collection/types.ts
export interface Collection {
  id: string
  name: string
  animeIds: string[]
  createdAt: string
  updatedAt: string
}

export interface CollectionFilters {
  search?: string
  sortBy?: 'name' | 'size' | 'date'
}
```

**Step 3**: Implement model
```typescript
// entities/Collection/model/useCollectionList.ts
import { useQuery } from '@tanstack/react-query'
import { getCollectionList } from '@/shared/api/collection'

export const useCollectionList = () => {
  return useQuery({
    queryKey: ['collections'],
    queryFn: getCollectionList,
  })
}
```

**Step 4**: Export public API
```typescript
// entities/Collection/index.ts
export { useCollectionList } from './model/useCollectionList'
export { CollectionCard } from './ui/CollectionCard'
export { formatCollectionSize } from './lib/formatCollectionSize'
export type { Collection, CollectionFilters } from './types'
```

---

### Example 3: Shared Utility

**Task**: Create a reusable date formatter

```typescript
// shared/lib/utils/formatDate.ts
export const formatDate = (date: string | Date): string => {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatRelativeTime = (date: string | Date): string => {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

// shared/lib/utils/index.ts
export { formatDate, formatRelativeTime } from './formatDate'
export { cn } from './cn'

// Usage anywhere in the project
import { formatDate } from '@/shared/lib/utils'

const formattedDate = formatDate(anime.createdAt)
```

---

## ✅ Checklist for New Code

Before creating a file or folder, ask yourself:

### Naming
- [ ] Does the name clearly describe its purpose?
- [ ] Is it following the correct case convention? (PascalCase for folders/components, camelCase for TS files)
- [ ] Does it avoid redundant suffixes? (no .api, .type, .query)
- [ ] Is it specific enough? (not too generic like `Component.tsx` or `utils.ts`)

### Structure
- [ ] Is it in the correct layer?
- [ ] Does it follow the import rules?
- [ ] Is it exported through `index.ts`?
- [ ] Does it have a single responsibility?

### Layer-Specific
- [ ] **Entity**: Is this truly a business entity?
- [ ] **Feature**: Is this a user interaction?
- [ ] **Widget**: Is this a complex composite component?
- [ ] **Shared**: Is this truly reusable across the entire app?

---

## 🔗 Resources

- [Feature-Sliced Design Documentation](https://feature-sliced.design/)
- [FSD Examples](https://github.com/feature-sliced/examples)
- [Project GitHub Repository](#)

---

## 📝 Notes

### When to Break the Rules

These conventions are guidelines, not absolute laws. You can break them when:

1. **Third-party libraries** require specific naming (e.g., Next.js `_app.tsx`)
2. **Build tools** expect certain patterns (e.g., Vite `vite.config.ts`)
3. **Team consensus** on a better approach for specific cases

### Maintaining Consistency

- Use linters and formatters (ESLint, Prettier)
- Conduct code reviews focusing on architecture
- Update this documentation as patterns evolve
- Refactor when patterns become unclear

---

**Last Updated**: December 2024  
**Maintainer**: Your Team  
**Version**: 1.0.0