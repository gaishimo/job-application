module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    node: true,
    es6: true,
  },
  plugins: ["@typescript-eslint", "node", "react-hooks"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    node: {
      tryExtensions: [".ts", ".tsx", ".js", "jsx", ".json", ".node"],
    },
    react: {
      version: "detect",
    },
  },
  globals: {
    document: true,
    window: true,
  },
  rules: {
    "node/no-missing-import": "error",
    "no-empty": "off",
    "react/display-name": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
}
