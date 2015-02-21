'use strict';

angular.module('examples').controller('TreeTableController', ['$scope', 'tree',
    function ($scope, tree) {

        $scope.treemodel = {
            name: 'Naomi',
            address: '1600 Amphitheatre',
            children: [
                {
                    name: 'n0',
                    address: 'a0',
                    children: [{
                        name: 'n00',
                        address: 'a00'
                    }, {
                        name: 'n01',
                        address: 'a01'
                    }, {
                        name: 'n02',
                        address: 'a02',
                        children: [{
                            name: 'n000',
                            address: 'a00'
                        }, {
                            name: 'n01',
                            address: 'a001'
                        }]
                    }
                    ]
                },
                {
                    name: 'n1',
                    address: 'a1',
                    children: [{
                        name: 'n10',
                        address: 'a10'
                    }, {
                        name: 'n11',
                        address: 'a11'
                    }, {
                        name: 'n12',
                        address: 'a12'
                    }
                    ]
                }
            ]
        };

        $scope.treeFromData = new tree($scope.treemodel);
        $scope.treeFromData.expandNode($scope.treeFromData.rootNode);
        $scope.treeFromData.selectNode($scope.treeFromData.rootNode);

    }
]);