'use strict';

angular.module('examples').controller('BooleanController', ['$scope', 'flags',
    function ($scope, flags) {

        $scope.state = new flags(['available'], true);

        $scope.states1 = new flags(['married', 'single', 'divorced', 'engaged'], false, 'enabled');

        $scope.states2 = new flags(['bold', 'italic', 'underscore', 'strike']);

    }
]);