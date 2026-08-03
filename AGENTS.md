# AGENTS.md — память проекта для ИИ-ассистентов

## Проект
Неофициальный ПК-порт приложения Anixart (anime-стриминг). Vite + React 19 + TypeScript, FSD-архитектура, Tailwind v4, zustand, react-query, react-router v7, axios, shadcn/ui (Radix).

## Команды
- `npm run dev` — dev-сервер
- `npm run build` — tsc -b && vite build
- `npm run lint` — eslint (СЛЕДИТ за FSD-слоями через `import/no-restricted-paths` и `import/no-internal-modules`!)
- Менеджер пакетов: npm (yarn.lock удалён из git)

## Архитектура (Feature-Sliced Design)
Слои: `app → pages → widgets → features → entities → shared`. Импорты строго вниз по иерархии (shared ничего не импортирует из проекта).
Структура модуля: `index.ts` (публичный API), `ui/`, `model/`, `api/`, `lib/`, `types.ts`, `const/`.
Папки компонентов — PascalCase, файлы-компоненты — PascalCase.tsx, утилиты/hooks — camelCase.ts.
Подробности и правила — в README.md (документ Naming & Conventions).

## Ключевые пути
- `src/app/` — провайдеры, роутер, layout
- `src/pages/` — страницы (Home, AnimeList/*, ReleaseDetails, Auth)
- `src/widgets/Anime/` — AnimeList, Release (страница релиза)
- `src/features/Auth/` — вход (useSignIn + LoginForm)
- `src/entities/anime/` — типы, const-фильтры, хуки, api
- `src/entities/User/` — userStore (zustand + persist, ключ localStorage `user-storage`)
- `src/shared/api/` — axios-клиент, auth, config
- `src/shared/lib/` — const (API_URLS, configKeys), utils, hooks

## API Anixart (снят через Charles Proxy)
- Базовый URL: `https://api-s.anixsekai.com` (env `VITE_BASE_URL`)
- Авторизация: `POST /auth/signIn?login=&password=` → `{code, profile, profileToken:{id,token}}` (0=OK, 2=нет аккаунта, 3=неверный пароль). Ещё: `signUp`, `verify`, `restore`, `restore/verify`.
- Все запросы кроме auth: `?token=<session_token>` (apiKey в query). Клиент `shared/api/client.ts` сам подставляет токен из localStorage `user-storage` (fallback — `VITE_TOKEN` из .env).
- Заголовок `User-Agent: AnixartApp/9.0 BETA 9-25110702 (Android 16; ...)` ставится клиентом автоматически.
- Ключевые эндпоинты: `/filter/{page}` (POST, тело-фильтр, `extended_mode`), `/release/{id}?extended_mode`, `/episode/{id}`, `/discover/*`, `/notification/count`, `/profile/{id}`, `/profile/info`, `/config/{urls,toggles}`, `/search/releases/{page}` (POST, v2).
- Ответ `/release/{id}`: `{code, release: AnimeItem}` — содержит poster/image, названия (ru/alt/original), description, genres (строка), status/category, rating/grade + голоса 1..5, counts (watching/favorites/comments...), screenshots/screenshot_images, related_releases/recommended_releases, video_banners, episode_last_update, age_rating (1..5 → 0+..18+), duration, season, broadcast, dates (aired_on_date, release_date).
- CORS на API открыт полностью (Allow-Origin: *).
- Полная OpenAPI-спека: https://openanix.ru/anixart-api-docs/openapi.yaml

## .env (VITE_*)
`VITE_BASE_URL`, `VITE_TOKEN` (гостевой/фолбэк), `VITE_EXTENDED_MODE=1`, `VITE_VERSION_CODE=25110702`, `VITE_IS_BETA=true`, `VITE_IS_API_ALT=false`, `VITE_USER_AGENT`.

## Текущее состояние
- Вход по логину/паролю работает, сессия живёт в userStore (persist). ProtectedRoute пускает только авторизованных, `/auth` — отдельная страница без лейаута.
- Вкладки в топбаре синхронизированы с URL (управляемый Tabs).
- Страница релиза `/release/{id}` — полная (hero, описание, инфо, кадры, похожие).
- НЕ реализовано: плеер эпизодов, поиск, профиль `/profile`, уведомления, коллекции, голосование/отметки, вход по токену из Charles (нужен id из URL `/profile/{id}`).

## Советы
- Не нарушать FSD-слои — линт это блокирует.
- Данные из API могут приходить с полями в snake_case.
- Изображения постеров/скриншотов — прямые URL, рендерить через `<img>`.
