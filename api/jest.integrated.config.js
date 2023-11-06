module.exports = {
  clearMocks: true,
  testMatch: ["**/integrated-test/**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "dist"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>"],
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/"],
  collectCoverage: false,
};
