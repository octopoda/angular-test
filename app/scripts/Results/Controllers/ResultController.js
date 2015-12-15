(function() {
    'use strict';

    angular
        .module('willowtree.results')
        .controller('ResultsController', ResultsController);

    /* @ngInject */
    function ResultsController($state, cookieService) {
        var vm = this;
        vm.title = 'ResultsController';
        vm.Previous;
        vm.Current;

        vm.playAgain = playAgain;

        activate();

        ////////////////

        /**
         * Activate the Controller (Get the Cookie and display results)
         * @return 
         */
        function activate() {
            var cookie = cookieService.getCookie();
            vm.Current = cookie.currentGame;
            vm.Previous = cookie.games;
        }



        /**
         * End the Current Game in the Cookie
         * @return 
         */
        function endGame() {
            cookieService.endCurrentGame();
        }


        /**
         * Play the Game Again
         * @return {$state} 
         */
        function playAgain() {
            endGame();
            return $state.transitionTo('intro');
        }

    }
})();