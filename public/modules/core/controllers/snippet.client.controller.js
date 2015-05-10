'use strict';


angular.module('core').controller('SnippetController', ['$scope', '$http', '$stateParams',
    function ($scope, $http, $stateParams) {

        console.log('$stateParams:', $stateParams);
        $scope.stateParams = $stateParams;

        $scope.snippetResource == undefined;

        function load() {
            $http.get('/snippet/'+$stateParams.snippetId).
                success(function (data, status, headers, config) {
                    console.log('ok data:', data);
                    $scope.snippetResource = data;



                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log('error data:', data);
                });
        };

        load();

    }
]);
