// Karma configuration

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: __dirname,


    // frameworks to use
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      'src/*.spec.ts',
      'src/**/*.spec.ts'
    ],


    // preprocess matching files before serving them to the browser
    preprocessors: {
      'src/*.spec.ts': ['webpack'],
      'src/**/*.spec.ts': ['webpack']
    },


    webpack: require('./webpack/test'),


    webpackMiddleware: {
        noInfo: true,
        stats: 'errors-only'
    },


    // start these browsers
    browsers: ['PhantomJS']
  })
}
