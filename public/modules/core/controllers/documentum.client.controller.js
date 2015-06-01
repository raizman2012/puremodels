'use strict';


angular.module('core').controller('DocumentumController', ['$scope', '$http', '$stateParams', 'tree',
    function ($scope, $http, $stateParams, tree) {

        console.log('$stateParams:', $stateParams);
        $scope.stateParams = $stateParams;

        var snippets = {
            "documents": [
                "documents_table",
                "documents_search",
                "documents_folders_table",
                "documents_upload"
            ],
            "dialogs": [
                "document_dialog_upload",
                "document_properties_popup"
            ],
            "forms": [
                "document_properties_input",
                "folder_properties_input"
            ],
            "pages": [
                "tree_folder",
                "tree_search",
                "tree_folder_toolbar_table",
                "tree_dnd",
                "tree_viewer"
            ]
        };

        var menuData = {children: []};
        _.each(snippets, function (value, key) {
            var child = {name: key, children: value};
            menuData.children.push(child);
        });

        console.log('menuData:',menuData);
        $scope.menuTree = new tree(menuData);
        $scope.menuTree.expandAllAsync($scope.menuTree.rootNode, function() {});
        $scope.menuTree.selectNode($scope.menuTree.rootNode.children[3].children[2]);
        console.log('$scope.menuTree.rootNode:', $scope.menuTree.rootNode);
        function load() {

        };

        load();

        $scope.currentInclude = function() {
            var menuName = $scope.menuTree.getParent($scope.menuTree.getSelectedNode()).data.name;

            var include =  '/modules/documentum/views/'+menuName+'/'+$scope.menuTree.getSelectedNode().data+'.html';
            console.log(include);
            return include;
        }
    }
]);
