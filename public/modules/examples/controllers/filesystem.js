'use strict';

angular.module('examples').controller('FilesystemController', ['$scope', 'tree', 'filesystemData',
    function ($scope, tree, filesystemData) {
        console.log('filesystem');

        $scope.treeFromData = new tree(filesystemData.files);

        $scope.treeFromData.expandNode($scope.treeFromData.rootNode);
        $scope.treeFromData.selectNode($scope.treeFromData.rootNode);
    }]);
