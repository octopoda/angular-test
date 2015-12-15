/*
|--------------------------------------------------------------------------
| Cookie Service for Namegame
|--------------------------------------------------------------------------
|
| Keep some things here to help the gameplay a little

*/
(function() {
    'use strict';

    angular
        .module('willowtree.api')
        .factory('cookieService', cookieService);

    cookieService.$inject = ['$cookies', 'errors'];

    /* @ngInject */
    function cookieService($cookies, errors) {
        var now = new Date();

        var service = {
            checkForCookie : checkForCookie, 
            getCookie : getCookie,
            storeCookie : storeCookie,
            deleteCookie : deleteCookie,
            endCurrentGame : endCurrentGame
        };

		//Cookie Structure
        /*
        var cookie = {
        	games: [
        		{
        			score: 25,
                    mode: 'training'
        		},
        		{
        			score: 10,
                    mode: 'pro'
        		},
        		{
        			score: 12,
                    mode: 'pro'
        		}
        	],
        	currentGame: {
                score: 12,
                round:3,
                mode: 1,
                modeTitle: 'pro',
                modeNumber: '12'
            }
		};
        */
        
        return service;

        ////////////////


        /**
         * Check for the Cookie
         * @return {boolean} 
         */
        function checkForCookie() {
            return ($cookies.get('gameData') != undefined || $cookies.get('gameData') != null) ? true : false;
        }

        /**
         * Get the Cookie
         * @return {object} 
         */
        function getCookie() {
            // return cookie;
            var data = $cookies.get('gameData');
            if (data == null) return;
            return JSON.parse(data);
        }


        /**
         * Store the Cookie
         * @return 
         */
        function storeCookie(data) {
            // return;
            var exp = new Date(now.getFullYear(), now.getMonth()+ 3, now.getDate());
            var json = JSON.stringify(data);

            return $cookies.put('gameData', json, {
                path: '/',
                expires: exp
            });
        }

        /**
         * Delete the Cookie From Store
         * @return {} 
         */
        function deleteCookie() {
            // return;
            var exp = new Date(now.getFullYear(), now.getMonth(), now.getDate()-1);
            
            var data = {
                games: null,
                currentGame: null
            };

            var json = JSON.stringify(data);

            return $cookies.put('gameData', json,  {
                path:  '/',
                expires: exp
            });
        }


        /**
         * End the Current Game and Place it in storage
         * @return {null} 
         */
        function endCurrentGame() {
            var data = getCookie();
            var games = [];

            if (data.games !== undefined) {
               games = data.games;
            }

            var newData = {
                games: games,
                currentGame: null
            }

            newData.games.push(data.currentGame);
            storeCookie(newData);
        }


        
        /**
         * Is there a current Game Going
         * @return {Boolean} 
         */
        function isCurrentGame() {
            var data= $cookies.get('gameData');
            if (data.currentGame !== null) {
                return true;
            } 
            return false;
        }


      


    }
})();