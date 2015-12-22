/*
|--------------------------------------------------------------------------
| Shared Module
|--------------------------------------------------------------------------
|
| Add All angular, global and third party modules.  This way we can keep 
| all the extras here and not trash out the main application module will 
| will only call application specific modules.
|
*/
(function() {
    'use strict';

    angular
        .module('willowtree.shared', [
            //Angular 
            'ui.router', 'ngCookies',

            //Home Grown
            'global.errors', 'global.flash', 'global.model',

            //Third Party
            'toastr'
        ]);
})();