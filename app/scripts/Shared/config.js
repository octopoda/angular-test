/*
|--------------------------------------------------------------------------
| Application Configuation
|--------------------------------------------------------------------------
|
| Description 1
|  Description 2
| 
|
*/
(function () {
	'use strict';

	var shared = angular.module('willowtree.shared');

	var config = {
		appErrorPrefix: '[WillowTree NameGame Website Error]',
		appTitle: 'namegame.willowtree.com',
		version: '0.1.0'
	}

	shared.value('config', config);
	share.config(configure)

  configure.$inject = ['$logProvider', 'exceptionHandlerProvider', '$httpProvider', 'toastr'];

	/** @ngInject */
	function configure($logProvider, exceptionHandlerProvider, $httpProvider, toastr) {
		//Turn debugging off/on (no info or warn);
		if ($logProvider.debugEnabled) {
			$logProvider.debugEnabled(true);
		}

		//Configure the common exception handler
		exceptionHandlerProvider.configure(config.appErrorPrefix);


		$httpProvider.defaults.headers.post['Content-Type'] = config.header;
    $httpProvider.defaults.transformRequest = [function(data) {
      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];

    //Toastr Config
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
	}



});