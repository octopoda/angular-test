/*
|--------------------------------------------------------------------------
| Title Directive
|--------------------------------------------------------------------------
|
| Give a name to the tiel based on state change success
|
*/
(function() {
    'use strict';

    angular
        .module('willowtree.shared')
        .directive('fillTitle', fillTitle);

    fillTitle.$inject = ['$rootScope', '$timeout'];

    /* @ngInject */
    function fillTitle ($rootScope, $timeout) {
        // Usage:
        // <title updateTitle></title>
        var directive = {
            link: link,
            restrict: 'A',
        };
        
        return directive;

        function link(scope, element, attrs) {
     		
        	/**
        	 * Listen To State Change
        	 * @param  {event} event   
        	 * @param  {$stateChange} toState 
        	 * @return {string} 
        	 */
     		function listener (event, toState) {
     			var title = "Willow Tree Name Game"; //Default Name
     			if (toState.title) title = toState.title + ' ' +  title;

     			$timeout(function () {
     				element.text(title);
     			}, 0, false);
     		};

     		/**
     		 * Root Scopr
     		 */
     		$rootScope.$on('$stateChangeSuccess', listener); 
        }
    }

    
})();