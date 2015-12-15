
/*
|--------------------------------------------------------------------------
| Controller for Intro Page
|--------------------------------------------------------------------------
|
| Handle all of the Controls for the Intro Page
|
*/

(function() {
    'use strict';

    angular
        .module('willowtree.intro')
        .controller('IntroController', IntroController);
 
    IntroController.$inject = ['$rootScope', '$state', '$window', 'cookieService', 'modeModel'];

    /* @ngInject */
    function IntroController($rootScope, $state, $window, cookieService, modeModel) {
        var vm = this;
        vm.title = 'IntroController';
        vm.Data = {};
        vm.resume = false;
        vm.noCookie = false;

        //dev mode?
        vm.dev = true;

        /** Scope Vars */
        vm.setGameMode = setGameMode;
        vm.goToGame = goToGame;
        vm.newGame = newGame;
        vm.deleteCookie = deleteCookie;
        
        activate();

        ////////////////
        
        /*
        |--------------------------------------------------------------------------
        | Controller Methods
        |--------------------------------------------------------------------------
        |
        | Methods for the Controller to Activate
        | 
        |
        */

        function activate() {
            //Check if user has cookie?
            if (!cookieService.checkForCookie()) {
                vm.noCookie = true;
                vm.Data = {}
            } else {
                vm.Data = cookieService.getCookie()    
            } 
            
            console.dir(vm.Data);
            
            inGame();
            return vm.Data;
        }   


        /**
         * Are the in the middle of a game
         * @return {boolean} 
         */
        function inGame() {
            if (!vm.noCookie) {
                vm.resume = (vm.Data.currentGame !== null) ? true : false;    
            } 
        }	


        

        /*
        |--------------------------------------------------------------------------
        | Scope Methods
        |--------------------------------------------------------------------------
        |
        | Methods for interaction with the Scope
        |
        */


        /**
         * Set the Game Mode
         * @param {int} gameMode
         */
        function setGameMode(gameMode) {
            var modeTitle = modeModel.getModeModel(gameMode);

            vm.Data.currentGame = {
                score: 0,
                round:0,
                mode: modeTitle.id,
                modeTitle: modeTitle.name,
                modeNumber: modeTitle.number
            }

            cookieService.storeCookie(vm.Data);
            
            goToGame();
        }	


        /**
         * Go to the Game State in the Router
         * @return 
         */
        function goToGame() {
            $state.transitionTo('game');
        }


        /**
         * Start a new Game
         * @return {boolean} 
         */
        function newGame() {
            vm.resume = false;
            return vm.resume;
        }


            
        /**
         * Dele the cookie In Dev Mode.
         * @return location/reload
         */
        function deleteCookie() {
            cookieService.deleteCookie();
            location.reload();
        }


      

    


    }
})();