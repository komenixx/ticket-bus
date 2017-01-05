var gulp = require('gulp');
var Karma = require('karma').Server;
var karmaParseConfig = require('karma/lib/config').parseConfig;
var yargs = require('yargs');

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    var conf = getKarmaConfiguration(yargs.argv);
    conf.singleRun = true;
    new Karma(conf, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
    var conf = getKarmaConfiguration(yargs.argv);
    new Karma(conf, done).start();
});

function getKarmaConfiguration(commandArgs) {
    var configFilePath = __dirname + '/../../karma.conf.js';
    var config = karmaParseConfig(configFilePath, {});
    var files = getTestFiles(commandArgs.context, config.files);

    return {
        configFile: configFilePath,
        files: files
    }
}

function getConfigFilesPath(configFiles) {
    var files = [];
    var l = configFiles.length;

    for (var i = 0; i < l; i++) {
        files.push(configFiles[i].pattern);
    }

    return files;
}

function getTestFiles(context, configFiles) {
    var files = getConfigFilesPath(configFiles);

    if (isContextExistsInCommand(context)) {
        files.push('test/unit/' + context + '/*.spec.ts');
        files.push('test/unit/' + context + '/**/*.spec.ts');
    } else {
        files.push('test/unit/*.spec.ts');
        files.push('test/unit/**/*.spec.ts');
    }

    return files;
}

function isContextExistsInCommand(context) {
    if (context) {
        if (context.length) {
            return true;
        }
    }

    return false;
}
