import coreWebVitals from "eslint-config-next/core-web-vitals";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  ...coreWebVitals,
  {
    rules: {
      // Cho phép pattern isClient / animation mount phổ biến; nâng lên error khi refactor
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default eslintConfig;
