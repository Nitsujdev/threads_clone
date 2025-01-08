import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules",
      ".next",
      "build",
      "dist",
      ".vscode",
      ".env",
      ".env.local",
      ".env.development",
      ".env.production",
      ".env.test",
    ],
  },
  ...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off",
    },
    settings: {
      tailwindcss: {
        callees: ["cn", "clsx", "twMerge"],
        config: "tailwind.config.ts",
      },
    },
  },
];

export default eslintConfig;
