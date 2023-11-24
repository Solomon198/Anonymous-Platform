import type {Config} from 'jest';

const config: Config = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '<rootDir>/setup-jest.ts',
    '<rootDir>/utils/test/test-setup.ts',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-vector-icons)/)',
  ],
};

export default config;
