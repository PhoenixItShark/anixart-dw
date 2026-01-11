// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  // --------------------------------------------------
  // IGNORE
  // --------------------------------------------------
  { ignores: ['dist', 'node_modules', '.vite'] },

  // --------------------------------------------------
  // BASE CONFIGS
  // --------------------------------------------------
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,

  // ==================================================
  // 1️⃣ FSD LAYER RULES (hierarchy)
  // ==================================================
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      // ---------- FSD hierarchy ----------
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/shared/**',
              from: './src/{entities,features,widgets,pages,app}/**',
            },
            {
              target: './src/entities/**',
              from: './src/{features,widgets,pages,app}/**',
            },
            {
              target: './src/features/**',
              from: './src/{widgets,pages,app}/**',
            },
            {
              target: './src/widgets/**',
              from: './src/{pages,app}/**',
            },
            {
              target: './src/pages/**',
              from: './src/app/**',
            },
          ],
        },
      ],
    },
  },

  // ==================================================
  // 2️⃣ PUBLIC API (НЕ для app)
  // ==================================================
  {
    files: ['src/{shared,entities,features,widgets,pages}/**/*.{ts,tsx}'],
    rules: {
      'import/no-internal-modules': [
        'error',
        {
          allow: [
            // shared
            'src/shared/*',
            'src/shared/*/index.ts',

            // entities
            'src/entities/*',
            'src/entities/*/index.ts',

            // features
            'src/features/*',
            'src/features/*/index.ts',

            // widgets
            'src/widgets/*',
            'src/widgets/*/index.ts',

            // pages
            'src/pages/*',
            'src/pages/*/index.ts',
          ],
        },
      ],
    },
  },

  // ==================================================
  // 3️⃣ INSIDE SLICES — ALLOW EVERYTHING
  // ==================================================
  {
    files: [
      'src/shared/*/**',
      'src/entities/*/**',
      'src/features/*/**',
      'src/widgets/*/**',
      'src/pages/*/**',
    ],
    rules: {
      'import/no-internal-modules': 'off',
    },
  },

  // ==================================================
  // 4️⃣ APP — NO LIMITS
  // ==================================================
  {
    files: ['src/app/**'],
    rules: {
      'import/no-internal-modules': 'off',
      'import/no-restricted-paths': 'off',
    },
  }
);
