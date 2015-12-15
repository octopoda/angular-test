/*
|--------------------------------------------------------------------------
| Script Gulp Task
|--------------------------------------------------------------------------
|
| Gulp tasks to handle the angular and other scripts 
| of the site. 
| 
|
*/
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var browserSync = require('browser-sync');
var webpack = require('webpack-stream');

var plugins = require('gulp-load-plugins')();



/*
| Methods
|--------------------------------------------------------------------------
*/

/**
 * Wrap Webpack around the script call
 * @param  {boolean}   watch 
 * @param  {boolean}   test  
 * @param  {Function} cb    
 * @return {gulp.src}         
 */
function webpackWrapper(watch, test, cb) {
  
  /** @type {object} Setup Options for Webpack */
  var webpackOptions = {
    watch: watch,
    module: {
      preLoaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader'}],
      loaders: [{ test: /\.js$/, exclude: /node_modules/, loaders: ['ng-annotate', 'babel-loader']}] 
    },
    output: { filename: 'app.module.js'}
  };


  if (watch) {
    webpackOptions.devtool = "inline-source-map";
  }

  /** Change Handlers  */
  var webpackChangeHandler = function (error, stats) {
    if (error) {
      conf.errorHandler('webpack')(error);
    }

    plugins.util.log(stats.toString({
      colors: plugins.util.colors.supportsColor,
      chunks: false,
      hash: false,
      version: true
    }));

    browserSync.reload();

    if (watch) {
      watch = false;
      cb();
    }
  };

  
  return gulp.src([
    path.join(conf.paths.scripts, '**/*.module.js'),
    path.join(conf.paths.scripts, '**/*.js')
  ])
    .pipe(webpack(webpackOptions, null, webpackChangeHandler))
    .pipe(gulp.dest(path.join(conf.paths.tmp, 'serve/assets/scripts')));
} 



/*
| Tasks
|--------------------------------------------------------------------------
*/


gulp.task('scripts', function () {
  return webpackWrapper(false, false);
});


gulp.task('scripts:watch', ['scripts'], function (callback) {
  return webpackWrapper(true, false, callback);
});


