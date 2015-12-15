/*
|--------------------------------------------------------------------------
| Factory to show Toatr Flash and log in console.
|--------------------------------------------------------------------------
|
|
*/

(function() {
    'use strict';

    angular
        .module('global.flash')
        .factory('flash', flash);

    flash.$inject = ['$log', '$rootScope', 'toastr'];

    /* @ngInject */
    function flash($log, $rootScope, toastr) {
        
        var service = {
            error: error,
            info: info,
            success: success,
            warning: warning,

            //Skip Modal and go to console
            log: $log.log
        };
        return service;

        ////////////////


        function error(message, data, title) {
            toastr.error(message, title);
            $log.error('Error: ' + message, data);
            $rootScope.$emit('flash.error', message);
        }

        function info(message, data, title) {
        	toastr.info(message, title);
            $log.info('Info: ' + message, data);
            $rootScope.$emit('flash.info', message);
        }

        function success(message, data, title) {
        	toastr.success(message, title);
            $log.info('Success: ' + message, data);
            $rootScope.$emit('flash.success', message);
        }

        function warning(message, data, title) {
        	toastr.warn(message, title);
            $log.warn('Warning: ' + message, data);
            $rootScope.$emit('flash.warning', message);
        }
    }
})();