/**
 * @ngdoc service
 * @name ng-puremodels.service:tree
 *
 * @description
 * structure provider for any object, usefull for complex recurcive structures
 * like trees, file systems, data structure etc
 **/
angular.module('ng-puremodels').factory('tree', ['selectableList', function (selectableList) {
    var result = function (someObject, provider) {
        var _this = this;
        var root = someObject;
        var selectedNode = undefined;


        var provider = provider;
        if (provider === undefined) {
            provider = {
                isLeaf: function (obj) {
                    return obj.children === undefined;
                },
                getUid: function (obj) {
                    if (obj.id !== undefined) {
                        return obj.id;
                    }
                    if (obj.uid !== undefined) {
                        return obj.uid;
                    }
                    if (obj.name !== undefined) {
                        return obj.name;
                    }
                },
                getChildren: function (obj, success, failure) {
                    success(obj.children);
                }
            };
        }

        function createNode(index, parentNode, object) {
            var res = {path: [], parent: parentNode, data: object, leaf: true, loading: true, expanded: false};

            res.leaf = provider.isLeaf(object);


            if (parentNode === undefined) {
                return res;
            }

            res.path = parentNode.path.slice(0);
            res.path.push(index);

            res.id = res.path.join('-');
            return res;
        }

        function selectNode(node) {
            node.selected = true;
            selectedNode = node;


        }

        function selectNodeAndLoadChildren(node, callback) {
            node.selected = true;
            selectedNode = node;

            loadNodeChildrenAsync(node, callback);
        }

        function unselectNode(node) {
            node.selected = false;
        }

        function getSelectedNode() {
            return selectedNode;
        }

        function getSelectedNodeId() {
            return getSelectedNode() !== undefined ? getSelectedNode().id : '-1';
        }

        function getLastNodeByPath(pathAsArray) {
            var currNode = rootNode;
            for (var i = 0; i < pathAsArray.length; i++) {
                currNode = currNode.children[pathAsArray[i]];
            }
            return currNode;
        }

        function getNodesBySelectedPath() {
            if (getSelectedNode() === undefined) {
                return undefined;
            }
            var parents = getNodesByPath(getSelectedNode().path);
            return parents;
        }

        function getNodesByPath(pathAsArray) {
            var res = [rootNode];
            var currNode = rootNode;
            for (var i = 0; i < pathAsArray.length; i++) {
                currNode = currNode.children[pathAsArray[i]];
                res.push(currNode);
            }
            return res;
        }


        function expandNode(node) {
            expandNodeAsync(node, function(nn) {
                recomputeArrayOfVisibleNodes();
            });
        }

        function expandNodeAsync(node, callback) {
            node.expanded = true;
            loadNodeChildrenAsync(node, callback);
        }

        function loadNodeChildrenAsync(node, callback) {
            if (callback === undefined) {
                callback = function() {};
            }

            if (!node.leaf) {
                if (node.children === undefined) {
                    node.loading = true;
                    provider.getChildren(node.data, function (children) {
                        node.loading = false;
                        node.children = [];
                        for (var i = 0; i < children.length; i++) {
                            var newNode = createNode(i, node, children[i]);
                            node.children.push(newNode);
                        }


                        node.selectableChildren = new selectableList(node.children);

                        if (callback !== undefined) {
                            callback(node);
                        }
                    }, function (error) {
                        node.loading = false;
                        node.error = error;
                        node.children = undefined;

                        if (callback !== undefined) {
                            callback(node);
                        }
                    });
                } else {
                    // already expanded
                    if (callback !== undefined) {
                        callback(node);
                    }
                }


            }
        }

        function expandAllAsync(node, callback) {
            if (!node.leaf) {
                expandNodeAsync(node, function(nn) {
                    var count = 0;
                    for (var i = 0; i < nn.children.length; i++) {
                        var child = nn.children[i];
                        expandAllAsync(child, function() {
                            count++;
                            if (count === nn.children.length) {
                                callback();
                            }
                        });
                    }
                });

            } else {
                callback();
            }
        }

        function collapseAll(node) {
            if (node === undefined) {
                node = _this.rootNode;
            }
            console.log('collapse:', node.path);
            collapseAllPrivate(node);

            recomputeArrayOfVisibleNodes();
        }

        function collapseAllPrivate(node) {
            if (node.leaf) {
                return;
            }

            node.expanded = false;
            for (var i = 0; i < node.children.length; i++) {
                var child = node.children[i];

                collapseAllPrivate(child);
            }

        }

        // private
        function findNextInParent(nn) {
            var current = nn;
            var found = undefined;
            while (found === undefined) {
                var current = current.parent;
                if (current === undefined) {
                    break; // root node
                }

                var indexInParent = current.path[current.path.length-1];
                var nextIndexInParent = indexInParent+1;

                if (current.parent === undefined || current.parent.children.length === nextIndexInParent) {
                    continue;
                } else {
                    found = current.parent.children[nextIndexInParent];
                    break;
                }
            }
            return found;
        }


        function nextNode(node, callback) {
            if (node === undefined) {
                callback(rootNode);
                return;
            }

            if (node.leaf) {
                if (node.parent === undefined) {
                    callback(undefined); // root without an children
                    return;
                }
            }

            var indexInParent = node.path[node.path.length-1];
            var nextIndexInParent = indexInParent+1;
            if (node.leaf) {
                //console.log('leaf');
                if (node.parent.children.length === nextIndexInParent) {
                    callback(findNextInParent(node));
                } else {
                    // return next child
                    callback(node.parent.children[nextIndexInParent]);
                    return;
                }
            } else {
                // console.log('not leaf');
                // not leaf
                expandNodeAsync(node, function(nn){
                    if (nn.children !== undefined && nn.children.length > 0) {
                        // return first child
                        callback(nn.children[0]);
                        return;
                    }

                    // find next in parent
                    callback(findNextInParent(nn));
                });
            }

        }

        function collapseNode(node) {
            node.expanded = false;
            recomputeArrayOfVisibleNodes();
        }

        function toggleExpandNode(node) {
            if (node.expanded === false) {
                expandNode(node);
            } else {
                collapseNode(node);
            }
        }

        function toggleAndSelectExpandNode(node) {
            toggleExpandNode(node);
            selectNode(node);
        }

        function selectNodeAndExpandParent(node) {
            selectNode(node);
            expandNode(node.parent);
        }

        function collectExpandedNodesWithLeafs(currNode, resArray) {
            resArray.push(currNode);
            if (currNode.expanded) {
                for (var i = 0; i < currNode.children.length; i++) {
                    var node = currNode.children[i];
                    collectExpandedNodesWithLeafs(node, resArray);
                }
            }
        }

        function recomputeArrayOfVisibleNodes() {
            var res = [];
            collectExpandedNodesWithLeafs(rootNode, res);
            rootNode.expandedNodesAndLeafs = res;
            //console.log('res:',res);
            return res;
        }


        var rootNode = createNode(-1, undefined, root);

        recomputeArrayOfVisibleNodes();

        // public members


        this.rootNode = rootNode;


        // public methods

        /**
         * @ngdoc method
         * @name expandNode
         * @methodOf ng-puremodels.service:tree
         *
         * @description
         * expand node if it was not expanded
         *
         * @param {node} node to expand
         */
        this.expandNode = expandNode;


        /**
         * @ngdoc method
         * @name expandNode
         * @methodOf ng-puremodels.service:tree
         *
         * @description
         * collapse node if it was expanded
         */
        this.collapseNode = collapseNode;

        /**
         * @ngdoc method
         * @name toggleExpandNode
         * @methodOf ng-puremodels.service:tree
         *
         * @description
         * toggle collapse state
         */
        this.toggleExpandNode = toggleExpandNode;

        /**
         * @ngdoc method
         * @name selectNode
         * @methodOf ng-puremodels.service:tree
         *
         * @description
         * mark node as a selected
         *
         * @param {node} some node to select
         */
        this.selectNode = selectNode;

        /**
         * @ngdoc method
         * @name unselectNode
         * @methodOf ng-puremodels.service:tree
         *
         * @description
         * mark node as a unselect
         *
         * @param {node} some node to select
         */
        this.unselectNode = unselectNode;

        /**
         * @ngdoc method
         * @name getLastNodeByPath
         * @methodOf ng-puremodels.service:tree
         *
         * @description
         * return last node in path
         *
         * @param {array} path to node like [0, 2, 3]
         * @return {Object} tree node
         */
        this.getLastNodeByPath = getLastNodeByPath;

        /**
         * @ngdoc method
         * @name getNodesByPath
         * @methodOf ng-puremodels.service:tree
         *
         * @description
         * return all node in path
         *
         * @param {array} path to node like [0, 2, 3]
         * @return {array} tree node
         */
        this.getNodesByPath = getNodesByPath;

        /**
         * @ngdoc method
         * @name getNodesBySelectedPath
         * @methodOf ng-puremodels.service:tree
         *
         * @description
         * return all nodes in path to selected node
         *
         * @return {array} tree nodes
         */
        this.getNodesBySelectedPath = getNodesBySelectedPath;

        /**
         * @ngdoc method
         * @name toggleAndSelectExpandNode
         * @methodOf ng-puremodels.service:tree
         *
         * @description
         * convinience method: toggle and select node
         *
         * @param {node} node to toggle and select
         */
        this.toggleAndSelectExpandNode = toggleAndSelectExpandNode;

        /**
         * @ngdoc method
         * @name selectNodeAndLoadChildren
         * @methodOf ng-puremodels.service:tree
         *
         * @description
         * convinience method: select node and load its children if not yet loaded
         *
         * @param {node} node to toggle and select
         */
        this.selectNodeAndLoadChildren = selectNodeAndLoadChildren;

        /**
         * @ngdoc method
         * @name selectNodeAndExpandParent
         * @methodOf ng-puremodels.service:tree
         *
         * @description
         * convinience method: select node and expand parent
         *
         * @param {node} node to toggle and select
         */
        this.selectNodeAndExpandParent = selectNodeAndExpandParent;

        /**
         * @ngdoc method
         * @name selectNodeAndLoadChildren
         * @methodOf ng-puremodels.service:tree
         *
         * @description
         * convinience method: select node and load its children if not yet loaded
         *
         * @param {node} node to toggle and select
         * @param {callback} function to call when done
         */
        this.loadNodeChildrenAsync = loadNodeChildrenAsync;

        /**
         * @ngdoc method
         * @name getSelectedNode
         * @methodOf ng-puremodels.service:tree
         *
         * @description
         * return selected node or undefined
         *
         */
        this.getSelectedNode = getSelectedNode;

        /**
         * @ngdoc method
         * @name getSelectedNodeId
         * @methodOf ng-puremodels.service:tree
         *
         * @description
         * return selected node Id or undefined
         *
         */
        this.getSelectedNodeId = getSelectedNodeId;

        // utility methods
        /**
         * @ngdoc method
         * @name nextNode
         * @methodOf ng-puremodels.service:tree
         *
         * @description
         * go to next node, up to the tree. If current node has children, go to first child
         * if not, go next child in same parent node. When last child, return to node after parent node.
         * Usefull to traverse tree.
         *
         * @param {node} node to toggle and select
         * @param {callback} function to call when done with next node as a parameter
         */
        this.nextNode = nextNode;

        /**
         * @ngdoc method
         * @name expandAllAsync
         * @methodOf ng-puremodels.service:tree
         *
         * @description
         * expand all nodes. Should be used carefully due to performance
         *
         * @param {node} node to expand all sub nodes
         * @param {callback} function to call when done
         */
        this.expandAllAsync = expandAllAsync;

        this.collapseAll = collapseAll;
    }

    return result;
}]);
