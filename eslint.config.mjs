import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json', // Ensure to point to your TypeScript config
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Disable the rule to allow explicit any
    },
  },
];