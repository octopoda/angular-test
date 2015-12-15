/*
|--------------------------------------------------------------------------
| Mode Model
|--------------------------------------------------------------------------
|
| Return the details of the mode object From and Id
|
*/

(function() {
    'use strict';

    angular
        .module('global.model')
        .factory('modeModel', modeModel);

    /* @ngInject */
    function modeModel() {
        var service = {
            getModeModel: getModeModel
        };

        return service;

        ////////////////

        /**
         * Get the Mode 
         * @param  {int} mode 
         * @return {object}      
         */
        function  getModeModel(mode) {
            var modeObject = {};

            switch (mode) {
                case 1: 
                    modeObject = {
                        id: 1,
                        name: 'new-guy',
                        number: '4'
                    };
                    break;
                case 2: 
                    modeObject = {
                        id: 2,
                        name: 'training',
                        number: '8'
                    };
                    break;
                case 3: 
                    modeObject = {
                        id: 3,
                        name: 'pro',
                        number: '12'
                    };
                    break;
                case 4: 
                    modeObject = {
                        id: 4,
                        name: 'God',
                        number: '24'
                    };
                    break;
            }

            return  modeObject;
        }
    }
})();