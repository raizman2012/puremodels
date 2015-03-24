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

        //jqyoui-droppable="{index: {{$index}}, onDrop:'dropCallback',onOver: 'overCallback', onOut: 'outCallback'}"

        $scope.startCallback = function(event, ui, node) {
            //console.log('You started draggin, node' , node);
            $scope.draggedNode = node;
            $scope.dropNodes = [];
        };
        $scope.stopCallback = function(event, ui) {
            console.log('Why did you stop draggin me?', $scope.draggedNode);

            if ($scope.dropNodes === undefined || $scope.dropNodes.length === 0) {
                console.log('no drop');
                return;
            }

            var lastNode = $scope.dropNodes[$scope.dropNodes.length-1];


            console.log('hey, you drop me:' , $scope.draggedNode.path, ' on ', lastNode.path);
            $scope.treeFromData.dropNodeOnAnotherNode($scope.draggedNode, lastNode);
            $scope.$apply();

        };
        $scope.dragCallback = function(event, ui) {
            //console.log('hey, look I`m flying node:', $scope.node);
        };
        $scope.dropCallback = function(event, ui, node, index) {
            console.log('hey, you drop me:' , $scope.draggedNode.path, ' on ', node.path, ' index:', index);


            var nodeParent =  $scope.treeFromData.getParent(node);
            var draggedNodeParent =  $scope.treeFromData.getParent($scope.draggedNode);

            if ($scope.draggedNode === node) {
                console.log('drop on myself is not valid, filtered');
                return;
            }
            if (draggedNodeParent === node) {
                console.log('drop on parent is not valid, filtered');
                return;
            }

            $scope.dropNodes.push(node);
            var curr = draggedNodeParent;
            while (curr !== undefined) {
                if (curr === node) {
                    // drop on parent is not valid
                    console.log('drop on parent is not valid');
                    return;
                }
                curr = $scope.treeFromData.getParent(curr);
                //console.log('curr', curr.id);
            }

            //console.log('hey, you drop me:' , $scope.draggedNode.path, ' on ', node.path);
            //$scope.treeFromData.dropNodeOnAnotherNode($scope.draggedNode, node);

            //var parent = $scope.treeFromData.getParent(node);
            //console.log('hey, parent: ', parent);

        };
        $scope.overCallback = function(event, ui) {
            console.log('Look, I`m over you');
        };
        $scope.outCallback = function(event, ui) {
            console.log('I`m not, hehe');
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