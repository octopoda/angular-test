
/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

/**
 * Paths to Project
 * @type {object}
 */
exports.paths = {
	//Paths
	app: 'app',
	dist: 'dist',
	tmp: '.tmp',
	//Assets
	css: './app/sass/',
	scripts: './app/scripts/',
	assets: './app/assets/',
	templates: './app/templates/',
};

exports.wiredep = {
	exclude: [/jquery/],
	directory: 'bower_components'
}

/**
 * Error Handler
 * @param  {string} title 
 * @return {callback}       
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};



