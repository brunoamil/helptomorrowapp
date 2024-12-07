module.exports = {
  preset: 'react-native',
  coveragePathIgnorePatterns: ['/node_modules/', 'index'],
  collectCoverageFrom: ['src/{components,utils}/**/*.{js,jsx,ts,tsx}'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleDirectories: ['node_modules', './src/test'],
};
