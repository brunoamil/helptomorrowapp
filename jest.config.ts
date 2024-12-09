// module.exports = {
//   preset: 'react-native',
//   coveragePathIgnorePatterns: ['/node_modules/', 'index'],
//   collectCoverageFrom: [
//     'src/{components,utils,hooks,domain}/**/*.{js,jsx,ts,tsx}',
//   ],
//   setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
//   moduleDirectories: ['node_modules', './src/test'],
//   modulePathIgnorePatterns: ['.*/mockedData/.*'],
//   setupFiles: ['<rootDir>/src/test/jestSetup.ts'],
//   transformIgnorePatterns: [
//     'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-safe-area-context)/)',
//   ],
// };
import type {Config} from 'jest';

const config: Config = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/src/test/jestSetup.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleDirectories: ['node_modules', './src/test'],
  modulePathIgnorePatterns: ['.*/mockedData/.*'],
  collectCoverageFrom: [
    'src/{components,utils,hooks,domain,screens}/**/*.{js,jsx,ts,tsx}',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', 'index'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-safe-area-context)/)',
  ],
};

export default config;
