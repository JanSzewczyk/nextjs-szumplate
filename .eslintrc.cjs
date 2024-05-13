/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  extends: [
    "next",
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:playwright/recommended",
    "plugin:testing-library/react"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  plugins: ["react", "@typescript-eslint", "unused-imports", "testing-library", "import"],
  rules: {
    "react/react-in-jsx-scope": "off",

    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true
      }
    ],

    "unused-imports/no-unused-imports": "error",

    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        disallowTypeAnnotations: true,
        fixStyle: "inline-type-imports"
      }
    ],

    //--- IMPORT ---//
    "import/no-unresolved": ["error", { commonjs: true, amd: true }],
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/named": "warn",
    "import/namespace": "warn",
    "import/default": "off",
    "import/export": "warn",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", ["parent", "sibling"], "type"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before"
          }
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        }
      }
    ]
  }
};
