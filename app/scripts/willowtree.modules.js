/*
|--------------------------------------------------------------------------
| Application Modeuls
|--------------------------------------------------------------------------
|
| Call only application specific/user created modules here
| All global/angular/third-party modules are called in 
| app/scripts/shared/shared.module.js
|
*/
(function() {
    'use strict';


	angular
        .module('willowtree', [
            'willowtree.shared',
            'willowtree.api',
            'willowtree.intro',
            'willowtree.game',
            'willowtree.results'
		]);
})();