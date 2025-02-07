import js from "@eslint/js"
import globals from "globals"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import importPlugin from "eslint-plugin-import"
import prettier from "eslint-plugin-prettier"
import jsxA11y from "eslint-plugin-jsx-a11y"

export default [
  { ignores: ["dist", "node_modules", "build"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        ...globals.browser,
        module: true,
      },
      parserOptions: {
        ecmaVersion: 12,
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: { version: "18.3" },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          moduleDirectory: ["node_modules", "src/"],
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
      jsxA11y,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react/prop-types": "off",
      indent: ["off"],
      "linebreak-style": [0, "unix"],
      quotes: ["error", "double", { allowTemplateLiterals: true }],
      semi: ["error", "never"],
      "import/no-unresolved": [2, { caseSensitive: false }],
      "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
      "import/order": [
        2,
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
        },
      ],
    },
  },
]
