(function() {
    'use strict';

    angular
        .module('willowtree.game')
        .factory('peopleModel', peopleModel);

    

    /* @ngInject */
    function peopleModel() {
        var service = {
            getRandomFromNumber : getRandomFromNumber,
            cleanItUp : cleanItUp,
            getRandomObject : getRandomObject
        };
        
        return service;

        ////////////////

        /**
         * Get a Random Number of People from the Data
         * @param {array} data 
         * @param {int} number
         * @return {array}      
         */
        function getRandomFromNumber(data, number) {
        	var peopleSort = data.sort(function () { 
        		return 0.5 - Math.random()
        	});

        	return peopleSort.slice(0, number);
        }

        /**
         * Get the Winner
         * @param  {array} data 
         * @return {object}      [description]
         */
        function getRandomObject(data) {
        	return data[Math.floor(Math.random() * (data.length-1))];
        }


        /**
         * Remove those unsightly numbers from people's names and add an Id so people can't cheat
         * @return {string} 
         */
        function cleanItUp(object) {
        	for (var i = 0; i < object.length; i++) {
        		object[i].name = object[i].name.replace(/[0-9]/g, '');
        		object[i].id = i;
        	}
        	
        	return object;
        }



    }
})();