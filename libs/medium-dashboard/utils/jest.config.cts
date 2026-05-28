module.exports = {
  displayName: 'medium-dashboard-utils',
  preset: '../../../jest.preset.js',
  coverageDirectory: '../../../coverage/libs/medium-dashboard/utils',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
};
