import '@testing-library/jest-native/extend-expect';

jest.mock('expo-font');
jest.mock('expo-linking');
jest.mock('expo-blur', () => ({ BlurView: 'BlurView' }));