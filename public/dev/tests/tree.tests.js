'use strict';

(function() {
    // Controller Spec
    describe('SimpleController', function() {
        // Initialize global variables
        var SimpleController,
            scope,
            $httpBackend,
            $stateParams,
            $location;


        // Then we can start by loading the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service but then attach it to a variable
        // with the same name as the service.
        beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
            // Set a new global scope
            scope = $rootScope.$new();

            // Point global variables to injected services
            $stateParams = _$stateParams_;
            $httpBackend = _$httpBackend_;
            $location = _$location_;

            // Initialize the Articles controller.
            //SimpleController = $controller('SimpleController', {
            //    $scope: scope
            //});

            //console.log('SimpleController', SimpleController);
        }));


        it('test creation', inject(function(tree) {

            var data = {
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
                                address: 'a000'
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

            var treeFromData = new tree(data);
            expect(treeFromData.rootNode.data.address).toEqual('aroot');

            expect(treeFromData.rootNode.expanded).toEqual(false);
            expect(treeFromData.rootNode.children).toEqual(undefined);

            treeFromData.expandNode(treeFromData.rootNode);
            expect(treeFromData.rootNode.expanded).toEqual(true);
            expect(treeFromData.rootNode.children.length).toEqual(data.children.length);

            treeFromData.selectNode(treeFromData.rootNode.children[0]);
            expect(treeFromData.getSelectedNode().path.length).toEqual(1);
            expect(treeFromData.getSelectedNode().id).toEqual('0');

            treeFromData.expandNode(treeFromData.getSelectedNode());
            treeFromData.selectNode(treeFromData.rootNode.children[0].children[0]);
            expect(treeFromData.getSelectedNode().path.length).toEqual(2);

            //console.log('selected:', treeFromData.getSelectedNode());
            treeFromData.expandAllAsync(treeFromData.rootNode, function() {
                console.log('expanded');

                treeFromData.collapseAll();

                expect(treeFromData.rootNode.expanded).toEqual(true);
                expect(treeFromData.rootNode.children[0].expanded).toEqual(false);
            });

            function traverseNode(node) {
                if (node === undefined) {
                    return;
                }
                console.log('next node:', node.id);
                treeFromData.nextNode(node, function(nextNode) {
                    traverseNode(nextNode);
                });
            }

            traverseNode(treeFromData.rootNode);
        }));
    });
}());