/*
|--------------------------------------------------------------------------
| Service for connecting to the API provided by WillowTree
|--------------------------------------------------------------------------
|
*/
(function() {
    'use strict';

    angular
        .module('willowtree.api')
        .factory('willowTreeService', willowTreeService);

    willowTreeService.$inject = ['$http', 'errors']

    /* @ngInject */
    function willowTreeService($http) {
        var apiUrl = "http://namegame.willowtreemobile.com:2000"
        
        var service = {
            getWillowTreePeople: getWillowTreePeople
        };
        
        return service;

        ////////////////

        /**
         * Connect to the API provided by Willow Tree and retrieve the people
         * @return {object} 
         */
        function getWillowTreePeople() {
        	return $http.get(apiUrl)
        		.then(peopleComplete)
        		.catch(function (message) {
        			errors.catcher('cannot connect to API')(message);
        		})

        		function peopleComplete(data, status, headers, config) {
        			return data.data;
        		} 
        }
    }
})();