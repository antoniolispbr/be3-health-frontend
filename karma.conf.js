// karma.conf.cjs
const path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {},
      clearContext: false // deixa o reporter HTML do Jasmine na tela
    },
    coverageReporter: {
      dir: path.join(__dirname, './coverage/be3-pacientes'),
      subdir: '.',
      reporters: [
        { type: 'html' },        // gera o index.html bonitão
        { type: 'text-summary' } // mostra o resumo no terminal
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
