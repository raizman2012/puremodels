'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider','$stateProvider', '$urlRouterProvider',
	function($locationProvider, $stateProvider, $urlRouterProvider) {
		$locationProvider.hashPrefix('!');

	}
]);

// integrate 'postal' bus
angular.module(ApplicationConfiguration.applicationModuleName)
	.config(['$provide', function ($provide) {
		$provide.decorator('$rootScope', [
			'$delegate', function ($delegate) {
				Object.defineProperty($delegate.constructor.prototype,
					'$bus', {
						value: postal,
						enumerable: false
					});

				return $delegate;
			}]);
	}]);


//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});