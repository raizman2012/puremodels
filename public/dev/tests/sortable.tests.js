'use strict';

(function() {
    // Controller Spec
    describe('sortable', function() {
        // Initialize global variables
        var scope,
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


        }));


        it('test  sorting ', inject(function(sortable, namesAndPhones) {
            var sortableList = new sortable(namesAndPhones.array);
            expect(sortableList).not.toBe(undefined);

            sortableList.sorting.sortToggle('name');
            expect(sortableList.list[0].name).toBe(namesAndPhones.array[2].name);
            sortableList.sorting.sortToggle('name');
            expect(sortableList.list[0].name).toBe(namesAndPhones.array[0].name);
        }));

        it('test  sorting and selection', inject(function(sortable, namesAndPhones) {
            var sortableList = new sortable(namesAndPhones.array);

            sortableList.sorting.sortToggle('name');
            expect(sortableList.list[0].name).toBe(namesAndPhones.array[2].name);
            sortableList.selectable.selectIndex(0);
            expect(sortableList.selectable.getSelectedObject().name).toBe(namesAndPhones.array[2].name);

            sortableList.sorting.sortToggle('name');
            expect(sortableList.selectable.getSelectedIndex()).toBe(2);

            sortableList.sorting.sortToggle('name');
            expect(sortableList.selectable.getSelectedIndex()).toBe(0);

            // now check multiselection
            sortableList.selectable.multiSelect(0);
            sortableList.selectable.multiSelect(1);

            sortableList.sorting.sortToggle('name');
            expect(sortableList.selectable.multiSelections[1]).toBe(true);
            expect(sortableList.selectable.multiSelections[2]).toBe(true);
        }));
    });
}());