/*
|--------------------------------------------------------------------------
| CSS/Sass Gulp Tasks
|--------------------------------------------------------------------------
|
*/

'use strict';

/**
 * Vars
*/
var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var browserSync = require('browser-sync');
var plugins = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');



/*
| Method
|--------------------------------------------------------------------------
*/

/**
 * Build out the Styles
 * @return {gulp.src} 
 */
var buildOutStyles = function () {
  var sassOptions = {
    style: "expanded"
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.css, '/**/*.scss'),
    path.join('!' + conf.paths.css, '/app.scss')
  ], { read:false });


  var injectOptions = {
    transform: function (filePath) {
      filePath = filePath.replace(conf.paths.css + '/app', '');
      return '@import "' + filePath + '";';
    },
    starttag: "// injector",
    endtag: "// endinjector",
    addRootSlash: false 
  };

  return gulp.src([
    path.join(conf.paths.css, 'app.scss')
  ])
    // .pipe(plugins.inject(injectFiles, injectOptions))
    // .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe(plugins.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/assets/css')));

}


/*
| Tasks
|--------------------------------------------------------------------------
*/

/**
 * Reload the Sass Styles
 */
gulp.task('sass-reload', ['sass'], function () {
  return buildOutStyles()
    .pipe(browserSync.stream());
});


/**
 * Run Sass for First Time
 */
gulp.task('sass', function () {
  return buildOutStyles();
})

