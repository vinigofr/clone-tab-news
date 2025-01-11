const nextJest = require("next/jest");
require("./tests/jest.setup");

const createJestConfig = nextJest();

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
