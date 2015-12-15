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