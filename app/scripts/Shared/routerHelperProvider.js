/*
|--------------------------------------------------------------------------
| Router Helper Provider
|--------------------------------------------------------------------------
|
| Provider to Help Route each module
|
*/

angular
    .module('willowtree.shared')
    .provider('routerHelper', routerHelperProvider);

routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

/* @ngInject */
function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
    /* jshint validthis:true */
    this.$get = RouterHelper;

    var config = {
        docTitle: undefined,
        resolveAlways: {}
    };

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    
    this.configure = function (cfg) {
        angular.extend(config, cfg);
    }

    RouterHelper.$inject = ['$location', '$rootScope', '$state'];
    
    /* @ngInject */
    function RouterHelper($location, $rootScope, $state) {
        var handlingStateChangeError = false;
        var hasOtherwise = false;
        
        var stateCounts = {
            errors: 0,
            changes: 0
        }

        var service = {
            configureStates: configureStates,
            getStates: getStates,
            stateCounts : stateCounts
        };

        init()

        return service;

        ///////////////


        /**
         * Initalize the Helpers
         * @return mixed
         */
        function init() {
            handleRoutingErrors();
            updateDocTitle();
        }


        
        /**
         * Configure the states
         * @param  {array} states        
         * @param  {string} otherwisePath 
         * @return {$stateProvider}               
         */
        function configureStates(states, otherwisePath) {
            states.forEach(function(state) {
                state.config.resolve = angular.extend(state.config.resolve || {}, config.resolveAlways);
                $stateProvider.state(state.state, state.config);
            });
            
            if (otherwisePath && !hasOtherwise) {
                hasOtherwise = true;
                $urlRouterProvider.otherwise(otherwisePath);
            }
        }


        /**
         * Handle Routing Errors
         * @return {$location.path} 
         */
        function handleRoutingErrors() {
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                if (handlingStateChangeError) return;

                stateCount.errors++;
                handlingStateChangeError = true;
                var destination = (toState && (toState.title || toState.name || toState.loadedTemplateUrl )) || 'unknown target';
                var msg = 'Error routing to ' + destination + '. ' + (error.data || '') + '. <br>' + (error.statusText || '') + ': ' + (error.status || '');
                console.log(msg, error);
                $location.path('/');
            });
        }

        /**
         * Get the State
         * @return {$stateProvider.state}  
         */
        function getStates() { return $state.get(); }

        

        /**
         * Update the Document Title
         * @return {string} 
         */
        function updateDocTitle() {
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                stateCounts.changes++;
                handlingStateChangeError = false;
                var title = config.docTitle + ' ' + (toState.title || '');
                $rootScope.title = title;
            });
        }

        
    }
}