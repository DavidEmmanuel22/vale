const RULES = {
  OFF: 'off',
  ERROR: 'error',
  WARN: 'warn'
}
module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['plugin:react/recommended', 'standard', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': RULES.OFF,
    'no-unused-vars': 'off',
    'spaced-comment': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
