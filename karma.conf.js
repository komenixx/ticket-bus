module.exports = function (config) {
    config.set({
        basePath: './',
        frameworks: ['jasmine', 'sinon', 'karma-typescript'],
        files: [
            { pattern: "src/**/*.ts" },
            'node_modules/async/dist/async.min.js',
            'node_modules/lodash/lodash.js'
        ],
        preprocessors: {
            "**/*.ts": ["karma-typescript"]
        },
        exclude: [],
        reporters: ['mocha'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chromium'],
        singleRun: false
    });
};
