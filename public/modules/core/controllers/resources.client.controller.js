'use strict';


angular.module('core').controller('ResourcesController', ['$scope', '$location', '$anchorScroll',
    function ($scope, $location, $anchorScroll) {


        $scope.scrollTo = function (id) {
            $location.hash(id);
            $anchorScroll();
        };

        $scope.test = function (id) {
            alert(id);
        };
    }
]);
