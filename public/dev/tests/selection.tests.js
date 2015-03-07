/**
 * Created by leonid.raizmen on 16/02/2015.
 */
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
            //
            //console.log('SimpleController', SimpleController);
        }));

        //console.log('SimpleController', SimpleController);
        it('test single select', inject(function(selectableList) {
            var list = new selectableList(['0','1']);

            // Test service
            expect(list.getSelectedIndex()).toEqual(-1);

            list.selectIndex(0);
            expect(list.getSelectedIndex()).toEqual(0);

            list.selectIndex(1);
            expect(list.getSelectedIndex()).toEqual(1);

        }));

        it('test multi select', inject(function(selectableList) {
            var list = new selectableList(['0','1', '2', '3']);

            list.multiSelect(0);
            list.multiSelect(2);
            expect(list.multiSelectedIndexes.length).toEqual(2);
            expect(list.multiSelectedObjects.length).toEqual(2);

            expect(list.multiSelectedIndexes[0]).toEqual(0);
            expect(list.multiSelectedIndexes[1]).toEqual(2);

            list.multiSelect(3);
            expect(list.multiSelectedIndexes[2]).toEqual(3);

            list.unselectAll();
            expect(list.multiSelectedIndexes.length).toEqual(0);

            list.selectAll();
            expect(list.multiSelectedIndexes.length).toEqual(list.getList().length);
            expect(list.multiSelectedObjects.length).toEqual(list.getList().length);
        }));
    });
}());