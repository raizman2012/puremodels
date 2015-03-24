'use strict';

angular.module('examples').controller('SortableController', ['$scope', 'sortable',
    function ($scope, sortable) {

        var nameAndPhone = new sortable([
            {
                name: 'daniel1',
                lastname: 'stark0',
                city : 'Ramat Gan',
                phone: '34-56-00000-89'
            }, {
                name: 'daniel1',
                lastname: 'stark1',
                city : 'Tel Aviv',
                phone: '34-56-11111-89'
            }, {
                name: 'daniel2',
                lastname: 'stark2',
                city : 'Lod',
                phone: '34-56-22222-89'
            }, {
                name: 'daniel3',
                lastname: 'stark3',
                city : 'Rehovot',
                phone: '34-56-22222-89'
            }, {
                name: 'daniel4',
                lastname: 'stark4',
                city : 'Lod',
                phone: '34-56-22222-89'
            }]);

        $scope.nameAndPhone = nameAndPhone;

    }
]);