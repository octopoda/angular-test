(function() {
    'use strict';

    angular
        .module('global.errors')
        .factory('errors', errors);

    /* @ngInject */
    function errors(flash) {
        var service = {
            catcher: catcher
        };
        
        return service;

        ////////////////

        function catcher(message) {
        	return function (reason) {
        		flash.error(message, reason);
        	}
        }
    }
})();