module.exports = function(config) {
  config.set({
    frameworks: ["jasmine", "sinon", "karma-typescript"],
    files: [
      { pattern: "test/**/*.ts" },
      { pattern: "src/**/*.ts" },
    ],
    preprocessors: {
      "**/*.ts": ["karma-typescript"]
    },
    reporters: ["mocha", "karma-typescript"],
    browsers: ["Chromium"],
    colors: true,
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.json'
    },
    singleRun: true
  });
};
