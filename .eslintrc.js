module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "plugin:react/recommended",
    "standard"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: [
    "react"
  ],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "eol-last": ["error", "always"],
    "max-len": [2, 80, 4]
  }
};
