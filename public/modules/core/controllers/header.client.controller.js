'use strict';

angular.module('core').controller('HeaderController', ['$cookies', '$cookieStore', '$scope',  '$translate', 'Menus',
	function($cookies, $cookieStore, $scope, $translate, Menus) {
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		console.log($cookies);
		if ($cookies['language'] === undefined) {
			$cookies['language'] =  'english';
		}
		$scope.language  = $cookies['language'];
		$translate.use($scope.language);
		//console.log('on load ', $scope.language);

		$scope.toogleHebrewEnglish = function()  {
			//console.log('was ', $scope.language);
			if ($scope.language === 'hebrew') {
				$scope.language = 'english';
				//$cookieStore.put('language', "english");
			} else {
				$scope.language = 'hebrew';
				//$cookieStore.put('language', "hebrew");
			}
			//console.log('set to ', $scope.language);
			$cookies["language"] = $scope.language;
			//$cookies.language = $scope.language;
			//$cookieStore.put('language', $scope.language);
			//console.log('reload, cookies:', $cookies);
			window.location.reload();
		}
	}
]);