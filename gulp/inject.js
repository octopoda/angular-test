/*
|--------------------------------------------------------------------------
| Injection Task 
|--------------------------------------------------------------------------
|
| gulp tasks to hande the injection process 
| of script and css files into the HTML files 
| 
|
*/

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

var wiredep = require('wiredep').stream;
var _ = require('lodash');



/*
| Tasks
|--------------------------------------------------------------------------
*/

/**
 * Inject Files into HTML
 */
gulp.task('inject', ['clean', 'partials', 'scripts', 'sass'], function () {
	
	var injectStyles = gulp.src([
		path.join(conf.paths.tmp, '/serve/assets/css/**/*.css'),
		path.join('!' + conf.paths.tmp, '/serve/assets/css/vendor.css')
	], { read: false });


	var injectScripts = gulp.src([
		path.join(conf.paths.tmp, '/serve/assets/**/*.module.js')
	], { read: false});

	var injectPartials = gulp.src([
		path.join(conf.paths.tmp, '/partials/**/*.js')
	], {read: false });


	var injectOptions = {
		ignorePath: [conf.paths.app, path.join(conf.paths.tmp, '/serve')],
		addRootSlash: false
	}

	var partialsInjectOptions = {
		starttag: '<!-- inject:partials -->',
		endtag: '<!-- endinject -->',
		ignorePath: path.join(conf.paths.tmp, '/partials'),
		addRootSlash: false
	}

	return gulp.src([
		path.join(conf.paths.app, '/*.html')
	])
		.pipe(plugins.inject(injectStyles, injectOptions))
	    .pipe(plugins.inject(injectScripts, injectOptions))
	    .pipe(plugins.inject(injectPartials, partialsInjectOptions))
	    .pipe(wiredep(_.extend({}, conf.wiredep)))
	    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));

});


gulp.task('inject-partials', ['partials'], function () {

	var injectPartials = gulp.src([
		path.join(conf.paths.tmp, '/partials/*.js')
	], {read: false });

	var partialsInjectOptions = {
		starttag: '<!-- inject:partials -->',
		// ignorePath: path.join(conf.paths.tmp, '/partials'), 
		addRootSlash: false
	}

	return gulp.src([
		path.join(conf.paths.app, '/*.html')
	])
		.pipe(plugins.inject(injectPartials, partialsInjectOptions))
		.pipe(wiredep(_.extend({}, conf.wiredep)))
	    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));

});


/**
 * Reload Browser after Injection
 */
gulp.task('inject-reload', ['inject'], function () {
	browserSync.reload();
})