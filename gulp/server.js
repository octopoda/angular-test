gulp/*
|--------------------------------------------------------------------------
| Task to Run the Server
|--------------------------------------------------------------------------
|
|
*/
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');
var util = require('util');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');


/*
| Methods
|--------------------------------------------------------------------------
*/

/**
 * initalize browser sync
 * @param  {string} baseDirectory 
 * @param  {string} browser       
 * @return {browserSync.instance}               
 */
function browserSyncInit(baseDirectory, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if (baseDirectory === conf.paths.app || (util.isArray(baseDirectory) && baseDirectory.indexOf(conf.paths.app) !== -1)) {
    routes =  {
      '/bower_components' : 'bower_components'
    }
  }

  var server =  {
    baseDir: baseDirectory,
    routes: routes
  };

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser
  });

}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'
}));




/*
| Tasks
|--------------------------------------------------------------------------
*/

/** Start the Server */
gulp.task('serve', ['watch'], function () {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.app]);
});

/** Start the Server with Build Configuration */
gulp.task('serve:dist', ['build'], function () {
  browserSyncInit(conf.paths.dist);
})