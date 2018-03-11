module.exports = config =>
  config.set({
    frameworks: ['browserify', 'kocha'],
    files: ['test.js'],
    preprocessors: { 'test.js': 'browserify' },
    browserify: {
      debug: true,
      transform: [['babelify', { plugins: ['istanbul', 'transform-decorators-legacy'] }]]
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: { type: 'lcov' },
    browsers: ['Chrome'],
    singleRun: true
  })
