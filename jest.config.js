module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageReporters: ['text'],
  roots: ['<rootDir>/src'],
  transform: {
    '.ts': 'ts-jest'
  }
};
