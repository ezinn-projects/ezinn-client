import next from 'eslint-config-next/core-web-vitals';

// Apply Next.js flat config with Core Web Vitals rules
const config = [
  ...next,
  {
    rules: {
      // Allow simple client-side flags set in effects
      'react-hooks/set-state-in-effect': 'off',
    },
    // Keep tools from traversing dependencies in flat config mode
    ignores: ['**/node_modules/**'],
  },
];

export default config;
