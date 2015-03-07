'use strict';


angular.module('core').controller('ResourcesController', ['$scope', '$location', '$anchorScroll', '$http',
    function ($scope, $location, $anchorScroll, $http) {

        $scope.info = {};
        $scope.packageJsonContent = '{ bla : \'ggg\'}';

        $scope.scrollTo = function (id) {
            $location.hash(id);
            $anchorScroll();
        };

        $scope.load = function () {
            $http.get('/resources').
                success(function (data, status, headers, config) {
                    console.log('ok data:', data);
                    $scope.info = data;
                    $scope.packageJsonContent = JSON.stringify($scope.info.packageJson, null, 2);
                    $scope.bowerJsonContent = JSON.stringify($scope.info.bowerJson, null, 2);
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log('error data:', data);
                });
        };

        $scope.load();
    }
]);
