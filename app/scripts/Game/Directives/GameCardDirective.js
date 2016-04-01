/*
|--------------------------------------------------------------------------
| Game Car Directive
|--------------------------------------------------------------------------
|
| Used to Build the Game Card for the User
|
*/

(function() {
    'use strict';

    angular
        .module('willowtree.game')
        .directive('gameCard', gameCard);

    /* @ngInject */
    function gameCard () {
        // Usage:
        // <div game-card cards="{object}" winner="{object}"></div>
        var directive = {
            bindToController: true,
            controller: GameCardController,
            controllerAs: 'vm',
            restrict: 'EA',
            replace: true,
            templateUrl: './templates/Game/GameCard.html',
            scope: {
            	gameCards: "=",
            	winner: "="
            }
        };
        
        return directive;

        function link(scope, element, attrs) {
        
        }
    }

    
    GameCardController.$inject = ['$rootScope', '$timeout', '$scope', '$element'];

    /* @ngInject */
    function GameCardController ($rootScope, $timeout,  $scope, $element) {
    	var vm = this;
    	vm.title = "GameCardController";
    	vm.checkmark = "✓";
    	

    	vm.checkForWin = checkFoWin;



    	/////////////////////

    	/**
         * Check for the win FTW
         * @param  {int} id 
         * @return {DOM}    
         */
        function checkFoWin($event, id) {
            var target = $event.currentTarget;
            var text = target.querySelector('.overlay-text');


            if (id == vm.winner.id) {
                target.classList.add('winner');
                text.innerHTML = vm.checkmark;
                $rootScope.$emit('game.winner');
                
            } else {
                //Don't call them a loser.  That's just mean.
                target.classList.add('not-winner');
                text.innerHTML = "x";
            }

        }


    }
})();