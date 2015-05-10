'use strict';

(function() {
    // Controller Spec
    describe('Pager', function() {
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


        it('test  sorting status change', inject(function(paging) {
            var pager = new paging();

            console.log('pager');
            expect(pager.currentPage).toEqual(0);

            expect(pager.hasPrev()).toBeFalsy();

        }));


    });
}());