'use strict';


angular.module('core').controller('HomeController', ['$scope', 'selectableList',
	function($scope, selectableList) {
		// This provides Authentication context.
		console.log(selectableList);
		var foo = new selectableList([0,1,2]);
		console.log(foo.getSelectedIndex());

		$scope.hello = 'hello';
	}
]);