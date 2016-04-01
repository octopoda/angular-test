/*
|--------------------------------------------------------------------------
| Game Route
|--------------------------------------------------------------------------
|
|
*/

(function() {
    'use strict';

    angular
        .module('willowtree')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
    	routerHelper.configureStates(getStates(), '/');    
    }


    function getStates() {
    	return [
    		{
    			state: 'game',
    			config: {
    				url: '/game', 
    				templateUrl: './templates/Game/index.html',
                    controller: 'NameGameController',
    				controllerAs: 'vm',
                    title: "Do you know who they are?"
    			}
    		}
    	];
    }
})();