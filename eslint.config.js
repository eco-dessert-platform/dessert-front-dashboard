import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import betterTailwind from 'eslint-plugin-better-tailwindcss'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config(
  { ignores: ['dist', '.yarn/releases'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
      'better-tailwindcss': {
        entryPoint: './src/styles/index.css',
      },
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
      'import/no-extraneous-dependencies': 'warn',
      'sort-imports': [
        'warn',
        {
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
        },
      ],
    },
  },
)
