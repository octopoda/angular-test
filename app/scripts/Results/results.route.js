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
    			state: 'results',
    			config: {
    				url: '/results', 
    				templateUrl: 'templates/Results/index.html',
                    controller: 'ResultsController',
    				controllerAs: 'vm',
                    title: "How did you do?"
    			}
    		}
    	];
    }
})();