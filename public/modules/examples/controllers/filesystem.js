'use strict';

angular.module('examples').controller('FilesystemController', ['$scope', 'tree', 'selectable', 'filesystemData',
    function ($scope, tree, selectable, filesystemData) {
        console.log('filesystem');

        $scope.treeFromData = new tree(filesystemData.files);

        $scope.treeFromData.expandNode($scope.treeFromData.rootNode);
        $scope.treeFromData.selectNode($scope.treeFromData.rootNode);

        $scope.menuFile = new selectable(filesystemData.menuDetails);
        $scope.menuFile.selectIndex(0);

        $scope.menuNewFile = new selectable(filesystemData.menuNewFile);
        $scope.menuNewFile.selectIndex(0);
    }]);
