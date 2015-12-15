/*
|--------------------------------------------------------------------------
| Gulp File for Project
|--------------------------------------------------------------------------
|
| All gulpfiles located in gulp folder.  
| Configuration of Gulp project located gulp/config.js
| 
|
*/


/*
| Sass/CSS Tasks
|--------------------------------------------------------------------------
|
| All tasks located in style.js
| Tasks:
| gulp sass-reload
| gulp sass
*/


/*
| Script/Angular Tasks
|--------------------------------------------------------------------------
|
| All tasks located in script.js
| Tasks:
| gulp scripts
| gulp scripts:watch
*/


/*
| Injection Tasks
|--------------------------------------------------------------------------
|
| All tasks located in inject.js
| Tasks:
| gulp inject
| gulp inject-reload
*/


/*
| Watch Tasks
|--------------------------------------------------------------------------
|
| All tasks located in inject.js
| Tasks:
| gulp watch
| 
*/


/*
| Dev Server Tasks
|--------------------------------------------------------------------------
|
| All tasks located in inject.js
| Tasks:
| gulp serve
| gulp serve:dist
*/


/*
| Build Tasks
|--------------------------------------------------------------------------
|
| All tasks located in inject.js
| Tasks:
| gulp clean
| gulp templates
| gulp html
| gulp other
| gulp build
 scripts*/


'use strict';

var gulp = require('gulp'),
    wrench = require('wrench');



 /**
  * This will load all JS files in the gulp directory
  * in order to  load all Gulp Task
  */
 wrench.readdirSyncRecursive('./gulp').filter(function (file) {
  	return (/\.(js)$/i).test(file);
 }).map(function (file) {
  require('./gulp/' + file);
 });


 