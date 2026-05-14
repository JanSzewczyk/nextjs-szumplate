import szumConfig from "@szum-tech/eslint-config";

export default [
  {
    ignores: ["coverage/**", "coverage-unit/**", "coverage-storybook/**"]
  },
  ...szumConfig
];
