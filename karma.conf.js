// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    reporters: ['progress', 'junit', 'coverage'],

    // the default configuration
    junitReporter: {
      outputFile: 'test-results.xml',
      suite: ''
    },

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/jquery/jquery.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/bower_components/angular-loading-bar/src/loading-bar.js',
      'app/bower_components/angular-ui-utils/ui-utils.js',
      '.tmp/.tmpReady/sac-metatemplate/camaleonBridge.js',
      'app/scripts/**/*.js',
      'test/spec/**/*.js',
      'http://jsuol.com.br/bk/validation/v0.0.14/validation-all.js',
      'http://jsuol.com.br/bk/cadastro/validation/desPassword.js',
      'http://jsuol.com.br/bk/sac/uol/fixtures.js?cacheSlayer=016173020'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8085,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    preprocessors: {
      'app/scripts/**/*.js': ['coverage']
    },

    coverageReporter: {
      type : 'cobertura',
      dir : 'coverage/',
      file : 'coverage.xml'
    },


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
