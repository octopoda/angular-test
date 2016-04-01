/*
|--------------------------------------------------------------------------
| Tasks to Build for Production
|--------------------------------------------------------------------------
|
*/

'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var optipng = require('imagemin-optipng');
var pngquant = require('imagemin-pngquant');

var plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files',  'del', 'csso']
});


/*
| Tasks
|--------------------------------------------------------------------------
*/


/**
 * Clean the Dist and Temp Folder
 */
gulp.task('clean', function (done) {
  return plugins.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')], done);
});

/**
 * Template Cache File
 */
gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.templates, '**/*.html')
  ])
    .pipe(plugins.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(plugins.angularTemplatecache('templateCacheHtml.js', {
      module: 'willowtree',
      root: './templates'
    }))
    
    .pipe(gulp.dest(conf.paths.tmp + '/partials'));
});

/**
 * Minify and Inject HTML
 */
gulp.task('html', ['clean', 'inject', 'partials'], function () {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCahceHtml.js'), { read:false });
  
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    relative: true,
    // ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter = plugins.filter('*.html', {restore:true});
  var jsFilter = plugins.filter('**/*.js', {restore:true});
  var cssFilter = plugins.filter('**/*.css', {restore:true});
  var assets;

  return gulp.src(path.join(conf.paths.tmp, 'serve/*.html'))
    
    .pipe(plugins.inject(partialsInjectFile, partialsInjectOptions))

    .pipe(assets = plugins.useref.assets())
    .pipe(plugins.rev())
    
    .pipe(jsFilter)
    // .pipe(plugins.sourcemaps.init())
    // .pipe(plugins.uglify({ preserveComments: plugins.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    // .pipe(plugins.sourcemaps.write('maps'))
    .pipe(jsFilter.restore)
    
    .pipe(cssFilter)
    // .pipe(plugins.sourcemaps.init())
    .pipe(plugins.csso())
    // .pipe(plugins.sourcemaps.write('maps'))
    .pipe(cssFilter.restore)
    
    

    .pipe(assets.restore())
    .pipe(plugins.useref())
    .pipe(plugins.revReplace())
    
    .pipe(htmlFilter)
    // .pipe(plugins.minifyHtml({
    //   empty: true,
    //   spare: true,
    //   quotes: true,
    //   conditionals: true
    // }))
    .pipe(htmlFilter.restore)
    
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe(plugins.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});


/** Get Other Files */
gulp.task('other', function () {
  var fileFilter = plugins.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.app, '/**/*'),
    path.join('!' + conf.paths.app, '/**/*.{html,css,js,scss}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});


/**
 * Move and flatten Fonts
 */
gulp.task('fonts', function () {
   return gulp.src(path.join(conf.paths.assets, "fonts/**/*.{eot,svg,ttf,woff,woff2}"))
     .pipe(plugins.flatten())
     .pipe(gulp.dest(path.join(conf.paths.dist, '/assets/fonts/')));
});

/**
 * Optimize images in /assets/images and place in min/image
*/
gulp.task('images', function() {
    return gulp.src(path.join(conf.paths.assets, 'images/**/*.{png,jpg,jpeg,gif,svg}'))
      .pipe(optipng({ optimizationLevel: 3 })())
      .pipe(pngquant({quality: '65-80', speed: 4})())
      .pipe(gulp.dest(path.join(conf.paths.dist, '/assets/images')))
      .pipe(plugins.size({showFiles: true}));
});



gulp.task('build', ['clean', 'html', 'other', 'fonts', 'images']);





