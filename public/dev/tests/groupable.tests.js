'use strict';

(function() {
    // Controller Spec
    describe('SimpleController', function() {
        // Initialize global variables
        var groupingData;


        // Then we can start by loading the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service but then attach it to a variable
        // with the same name as the service.
        beforeEach(inject(function(_groupingData_) {
            // Set a new global scope
            groupingData = _groupingData_;

        }));

        //console.log('SimpleController', SimpleController);
        it('test group by property', inject(function(groupable) {
            expect(groupingData).not.toBe(undefined);
            expect(groupingData.customers.length).not.toBe(0);

            var list = new groupable(groupingData.customers, _.keys(groupingData.customers[0]));

            // Test service
            expect(list).not.toBe(undefined);
            expect(list.groups).toBe(undefined);

            list.groupBy('address');
            expect(list.groups).not.toBe(undefined);
            expect(_.keys(list.groups).length).toBe(2);
        }));

    });
}());