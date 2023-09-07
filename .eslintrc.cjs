module.exports = {
  parser: '@babel/eslint-parser', // Use Babel parser for modern JavaScript syntax
  extends: [
    'eslint:recommended', // Use ESLint recommended rules
    'plugin:react/recommended', // Use React recommended rules
  ],
  plugins: ['react'], // Enable the React plugin
  env: {
    browser: true, // Enable browser environment
    es2021: true, // Allow ES2021 features
  },
  parserOptions: {
    ecmaVersion: 2021, // Use ES2021
    sourceType: 'module', // Use ECMAScript modules
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect React version
    },
  },
  rules: {
    // Add your project-specific ESLint rules here
  },
};
