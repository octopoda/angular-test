/*
|--------------------------------------------------------------------------
| Task to watch the files
|--------------------------------------------------------------------------
|
| These task are creepy
| 
|
*/
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var browserSync = require('browser-sync');



/*
| Methods
|--------------------------------------------------------------------------
*/

/**
 * Check for Event Type
 * @param  {event}  event 
 * @return {Boolean}       
 */
function isOnlyChange(event) {
  return event.type === 'changed';
}




/*
| Tasks
|--------------------------------------------------------------------------
*/

gulp.task('watch', ['scripts:watch', 'inject'], function () {

    /** Watch Main Files */
    gulp.watch([path.join(conf.paths.app, '/*.html'), 'bower.json'],  ['inject-reload']);

    /** Watch SASS Files */
    gulp.watch([
      path.join(conf.paths.css, '/**/*.scss'),
      path.join(conf.paths.css, '/**/*.css'),
    ], function (event) {
      if (isOnlyChange(event)) {
        gulp.start('sass-reload');
      } else {
        gulp.start('inject-reload');
      }
    });


    /** Watch Template Files */
    gulp.watch(
      path.join(conf.paths.templates, '/**/*.html'), function (event) {
        browserSync.reload(event.path);
      }
    )
});