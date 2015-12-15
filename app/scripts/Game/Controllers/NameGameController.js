(function() {
    'use strict';

    angular
        .module('willowtree.game')
        .controller('NameGameController', NameGameController);

    NameGameController.$inject = ['$rootScope', '$state', '$timeout', 'willowTreeService', 'peopleModel', 'cookieService'];

    /* @ngInject */
    function NameGameController($rootScope, $state, $timeout, willowTreeService, peopleModel, cookieService) {
        var vm = this;
        vm.title = 'NameGameController';
        vm.People = {};
        vm.GameCards = {};
        vm.Winner = {}
        vm.score = 0;
        vm.TotalScore = 0;
        vm.GameInfo = {};

        vm.lastWinnersName = '';
        vm.WinnerName = '';
        
        vm.Rounds = 1;
        vm.Interval;
        

        activate();

        ////////////////

        /**
         * Activate the Controller
         */
        function activate() {
            getPeople().then(function () {
                setupPeopleObject();
                getGameInformation();
                
                vm.Rounds = vm.GameInfo.round;
                vm.TotalScore = vm.GameInfo.score; 

                getNextRound();
            });
        }


/*
|--------------------------------------------------------------------------
| Game/Scope Methods
|--------------------------------------------------------------------------
|
|
*/
       
       /**
        * Get the Next Round of Game Cards
        * @return {object} 
        */
       function getNextRound() {
            vm.GameCards = peopleModel.getRandomFromNumber(vm.People, vm.GameInfo.modeNumber); 
            selectOne();

            vm.Rounds++;
            
            if (document.getElementById('modal')) {
                removeScore();    
            }
            
            
            return vm.GameCards;
       }

       function checkRound() {
            console.log(vm.Rounds);
            if (vm.Rounds >= 6) {
                vm.Rounds = 0;
                goToResults();
            }

            getNextRound();
       }


       /**
        * Select the Winner and Add to the GameCards
        * @return {object} 
        */
       function selectOne() {
            vm.Winner = peopleModel.getRandomObject(vm.GameCards);

            while(vm.Winner.name === vm.lastWinnersName) {
                vm.Winner = peopleModel.getRandomObject(vm.GameCards);
            }

            for(var i = 0; i < vm.GameCards.length; i++) {
                if (vm.GameCards[i].name == vm.Winner.name) {
                    vm.GameCards[i].winner = true;
                } else {
                    vm.GameCards[i].winner = false;
                }
            }

            return vm.Winner;
        }


        //Look for Winner Pieces Selected
        $rootScope.$on('game.winner', function handleSingleWinEvent(event) {  
            getScore(); //Get the Score
            showScore(); //Show it Off
            sendGameToCookie();

            
            $timeout(function () {
                checkRound();
                removeClasses('not-winner');
                removeClasses('winner');
            }, 3000);
            
        });

        


/*
|--------------------------------------------------------------------------
| Animation Methods
|--------------------------------------------------------------------------
|
|
*/


        /**
         * Show the Score and add some lightning!
         * @return {[type]} [description]
         */
        function showScore() {
            document.body.classList.toggle('lightning');
            document.getElementById('scoreWrapper').classList.add('active');
            document.getElementById('modal').classList.add('active');
        }

        /**
         * Remove the Score Modal
         * @return {[type]} [description]
         */
        function removeScore() {
            document.body.classList.remove('lightning');
            document.querySelector('.score-wrapper').classList.remove('active');
            document.querySelector('.modal-overlay').classList.remove('active');
        }


        /**
         * Remove the Classnames from the Object
         * @param  {string} classname 
         * @return null 
         */
        function removeClasses(classname) {
            var objects = document.querySelectorAll('.'+classname);
            
            for (var i=0; i < objects.length; i++) {
                objects[i].classList.remove(classname);
            }
        }
        


/*
|--------------------------------------------------------------------------
| State Methods
|--------------------------------------------------------------------------
|
|
*/


       /**
        * Go to the Results Page
        * @return {[type]} [description]
        */
       function goToResults() {
            //Add Score to Cookie
            return $state.transitionTo('results');
       }


/*
|--------------------------------------------------------------------------
| Data Methods
|--------------------------------------------------------------------------
|
| Get People Objects 
|
*/
      
        /**
         * Get the People from the Data Service
         * @return {array} 
         */
        function getPeople() {
            return willowTreeService.getWillowTreePeople().then(function (data) {
                vm.People = data;
                return vm.People;
            });
        }


        /**
         * Get the Cookie with the Game Information
         * @return {[type]} [description]
         */
        function getGameInformation() {
            var cookieInfo = cookieService.getCookie()    
            vm.GameInfo = cookieInfo.currentGame;
            return vm.GameInfo;
        }


        /**
         * Setup the People Object (Clean it up. Those names are dirty)
         * @return {a clean array} 
         */
        function setupPeopleObject() {
            vm.People = peopleModel.cleanItUp(vm.People);
        }



        /**
         * Select Random Number From Game Pieces. 
         * @return {object} 
         */
        function getRandomGamePeice() {
            var random = peopleModel.getRandomObject(vm.People);
        }


        /**
         * Get the total score by subtracting the gamecard length minus the amount of not winner classes in document.
         * @return {[type]} [description]
         */
        function getScore() {
            var notWinner = document.querySelectorAll('.not-winner');
            vm.Score =  (vm.GameCards.length - document.querySelectorAll('.not-winner').length);
            addTotal(vm.Score);
            return vm.Score;
        }


        /**
         * Add Up Total Score;
         * @param {[type]} score [description]
         */
        function addTotal(score) {
            vm.TotalScore += score;
            return vm.TotalScore;
        }


        /**
         * Save the Current Game to the cookie so user can resume game at any time.
         * @return {object}
         */
        function sendGameToCookie() {
            var cook = cookieService.getCookie();
            
            var data = {
                games: cook.games,
                currentGame: {
                    score: vm.TotalScore,
                    round: (vm.Rounds + 1),
                    modeNumber: vm.GameInfo.modeNumber,
                    modeTitle: vm.GameInfo.modeTitle,
                    mode: vm.GameInfo.mode
                }
            };
            
            
            cookieService.storeCookie(data);
        }


    }
})();