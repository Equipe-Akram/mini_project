import globals from "globals";
import js from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node, // Include Node.js globals (e.g., process, require)
        ...globals.es2021 // Include ES2021 globals
      },
      ecmaVersion: 12,
      sourceType: "module" // Use ES modules
    },
    rules: {
      ...js.configs.recommended.rules, // Merge recommended rules
      "no-undef": "warn", // Undefined variables as warnings
      "no-unused-vars": "warn", // Unused variables as warnings
      "quotes": ["warn", "single"], // Style rule as warning
      
    }
  }
];