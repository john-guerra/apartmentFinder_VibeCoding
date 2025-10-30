import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierConfig from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  prettierConfig,
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
  {
    rules: {
      // Enforce double quotes
      quotes: ["error", "double", { avoidEscape: true }],

      // Enforce semicolons
      semi: ["error", "always"],

      // Disallow var, prefer const/let
      "no-var": "error",
      "prefer-const": "error",

      // Prefer template literals
      "prefer-template": "error",

      // Enforce proper naming conventions
      camelcase: [
        "error",
        {
          properties: "never",
          ignoreDestructuring: true,
          ignoreImports: true,
        },
      ],

      // Require error handling
      "no-throw-literal": "error",

      // Modern JavaScript
      "prefer-arrow-callback": "error",
      "prefer-destructuring": [
        "error",
        {
          array: false,
          object: true,
        },
      ],

      // Code quality
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default eslintConfig;
