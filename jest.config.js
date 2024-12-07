module.exports = {
  preset: 'react-native',
  coveragePathIgnorePatterns: ['/node_modules/', 'index'],
  collectCoverageFrom: ['src/{components,utils}/**/*.{js,jsx,ts,tsx}'],
};
