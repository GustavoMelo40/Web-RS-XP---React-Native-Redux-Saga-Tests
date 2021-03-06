import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

// jest.mock('react-native-firebase', () => {
//   return {
//     messaging: jest.fn(() => {
//       return {
//         hasPermission: jest.fn(() => Promise.resolve(true)),
//         subscribeToTopic: jest.fn(),
//         unsubscribeFromTopic: jest.fn(),
//         requestPermission: jest.fn(() => Promise.resolve(true)),
//         getToken: jest.fn(() => Promise.resolve('myMockToken')),
//       };
//     }),
//     notifications: jest.fn(() => {
//       return {
//         onNotification: jest.fn(),
//         onNotificationDisplayed: jest.fn(),
//       };
//     }),
//   };
// });

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('react-native-device-info', () => {
  return {
    getModel: jest.fn(),
  };
});
