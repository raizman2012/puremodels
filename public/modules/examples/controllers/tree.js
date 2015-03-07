'use strict';

angular.module('examples').controller('TreeController', ['$scope', 'tree',
    function ($scope, tree) {

        $scope.treemodel = {
            name: 'root',
            address: 'aroot',
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
                            name: 'n001',
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

        $scope.selectNext = function() {
            $scope.treeFromData.nextNode($scope.treeFromData.getSelectedNode(), function(node) {
                $scope.treeFromData.selectNode(node);
            });
        }

        $scope.expandAll = function() {
            $scope.treeFromData.expandAllAsync($scope.treeFromData.getSelectedNode(), function() {});
        }

        $scope.collapseAll = function() {
            $scope.treeFromData.collapseAll($scope.treeFromData.getSelectedNode());
        }
        $scope.treeFromData = new tree($scope.treemodel);
        $scope.treeFromData.expandNode($scope.treeFromData.rootNode);
        $scope.treeFromData.selectNode($scope.treeFromData.rootNode);


    }
]);