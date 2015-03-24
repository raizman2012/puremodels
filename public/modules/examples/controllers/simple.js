'use strict';

angular.module('examples').controller('SimpleController', ['$scope', 'selectable', 'tree',
    function ($scope, selectable, tree) {

        var nameAndPhone = new selectable([
            {
                name: 'daniel01',
                lastname: 'stark0',
                phone: '34-56-00000-89'
            }, {
                name: 'daniel1',
                lastname: 'stark1',
                phone: '34-56-11111-89'
            }, {
                name: 'daniel2',
                lastname: 'stark2',
                phone: '34-56-22222-89'
            }]);

        $scope.nameAndPhone = nameAndPhone;

    }
]);