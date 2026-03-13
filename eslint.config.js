import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import betterTailwind from 'eslint-plugin-better-tailwindcss'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config(
  { ignores: ['**/dist', '.yarn/releases'] },

  // ── 공통 규칙: seller + admin + packages 모두 적용 ──
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    files: ['apps/**/*.{ts,tsx}', 'packages/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'better-tailwindcss': betterTailwind,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...betterTailwind.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': ['warn'],
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      'no-console': ['warn', { allow: ['error'] }],
      'import/no-unresolved': 'off',
      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // node:fs, node:path 등
            'external', // react, axios, @tanstack/... 등
            'internal', // @/components, @/hooks 등 (경로 별칭)
            ['parent', 'sibling', 'index'],
            'object',
            'type', // import type {...}
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: [],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-duplicates': 'warn',
      'import/no-cycle': 'warn',
      'import/no-extraneous-dependencies': [
        'off',
        {
          devDependencies: [
            '**/.storybook/**', // Storybook 설정 파일
            '**/*.test.{ts,tsx}', // 테스트 파일 (향후 대비)
            '**/*.spec.{ts,tsx}',
          ],
        },
      ],
      'sort-imports': [
        'warn',
        {
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
        },
      ],
    },
  },

  // ── seller 전용: tsconfig 경로 + CSS 진입점 ──
  {
    files: ['apps/seller/**/*.{ts,tsx}'],
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './apps/seller/tsconfig.json',
        },
      },
      'better-tailwindcss': {
        entryPoint: `${import.meta.dirname}/apps/seller/src/styles/index.css`,
      },
    },
  },

  // ── seller 전용: tsconfig 경로 + CSS 진입점 ──
  {
    files: ['apps/admin/**/*.{ts,tsx}'],
    // settings: {
    //   'import/resolver': {
    //     typescript: {
    //       alwaysTryTypes: true,
    //       project: './apps/admin/tsconfig.json',
    //     },
    //   },
    //   'better-tailwindcss': {
    //     entryPoint: './apps/admin/src/styles/index.css',
    //   },
    // },
  },

  // ── packages/ui 전용: tsconfig 경로 + CSS 진입점 ──
  {
    files: ['packages/ui/**/*.{ts,tsx}'],
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './packages/ui/tsconfig.json',
        },
      },
      'better-tailwindcss': {
        entryPoint: `${import.meta.dirname}/packages/ui/src/styles/index.css`,
      },
    },
  },
)
