/*
|--------------------------------------------------------------------------
| Startup Route
|--------------------------------------------------------------------------
|
| Send the to the introduction page. Yo!
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
    			state: 'intro',
    			config: {
    				url: '/', 
    				templateUrl: './templates/Intro/index.html',
                    controller: 'IntroController',
    				controllerAs: 'vm',
                    title: "Wanna Play a Game?"
    			}
    		}
    	];
    }
})();