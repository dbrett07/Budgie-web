import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // 1. Tell ESLint to ignore build and dependency folders
  { 
    ignores: ['dist/', 'node_modules/'] 
  },
  
  // 2. Base JavaScript configurations
  js.configs.recommended,
  
  // 3. TypeScript configurations
  ...tseslint.configs.recommended,
  
  // 4. Custom Node.js configuration rules
  {
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: 'module',
      globals: {
        ...globals.node, // 🚀 Enables Node.js global variables like 'process'
      },
    },
    rules: {
      // Custom backend adjustments
      '@typescript-eslint/no-explicit-any': 'warn',     // Warn instead of error for 'any' types
      '@typescript-eslint/no-unused-vars': ['error', { 
        'argsIgnorePattern': '^_',                       // Allows unused Express args if prefixed with _ (e.g., _next)
        'varsIgnorePattern': '^_' 
      }],
      'no-console': 'off',                               // Allowed because backends rely on console.log for server logs
    },
  }
);
