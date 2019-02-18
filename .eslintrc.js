module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["airbnb"],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  parser: "babel-eslint",
  rules: {
    "react/prop-types": 0,
    "react/jsx-uses-vars": [2],
    "no-console": 0,
    "react/destructuring-assignment": 0,
    "react/default-props-match-prop-types": 0,
    "react/require-default-props": 0,
    "react/forbid-prop-types": 0,
  }
};
