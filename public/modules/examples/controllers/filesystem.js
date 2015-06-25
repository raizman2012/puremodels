'use strict';

angular.module('examples').controller('FilesystemController', ['$scope', 'tree', 'selectable', 'sortable', 'filesystemData',
    function ($scope, tree, selectable, sortable, filesystemData) {
        console.log('filesystem files:', filesystemData.files);

        $scope.treeFromData = new tree(filesystemData.files, undefined, function(node) {
            node.sortableChildren = new sortable(node.children);
        });

        //$scope.treeFromData.
        $scope.treeFromData.expandNode($scope.treeFromData.rootNode);
        $scope.treeFromData.selectNode($scope.treeFromData.rootNode);

        $scope.menuFile = new selectable(filesystemData.menuDetails);
        $scope.menuFile.selectIndex(0);

        $scope.menuNewFile = new selectable(filesystemData.menuNewFile);
        $scope.menuNewFile.selectIndex(0);
    }]);
