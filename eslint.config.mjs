// ESLint flat config. Two tiers:
// - error: real bugs and unsafe patterns that must never ship;
// - warn: size budgets that push refactoring without blocking.
// Formatting belongs to Prettier (see .prettierrc.json); no style rules here.
// App source rules (TypeScript, framework plugins, architecture boundaries) are added when the stack is chosen.
import { createRequire } from 'node:module';
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

const require = createRequire(import.meta.url);
const local = { rules: { 'max-file-lines': require('./eslint-rules/max-file-lines.cjs') } };

export default defineConfig([
  globalIgnores([
    'dist/**',
    'node_modules/**',
    'coverage/**',
    'test-results/**',
    'playwright-report/**',
    '.agents/skills/**', // third-party agent skills vendored verbatim
    '.claude/**', // mirror of .agents/skills for Claude Code
    'graphify-out/**', // generated knowledge graph
    'scratch/**',
  ]),

  js.configs.recommended,

  {
    plugins: { local },
    languageOptions: { globals: { ...globals.node } },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none' }],
      'local/max-file-lines': ['warn', { max: 350 }],
    },
  },

  // CommonJS: local ESLint rules
  {
    files: ['eslint-rules/**/*.cjs'],
    languageOptions: { sourceType: 'commonjs' },
  },
]);
