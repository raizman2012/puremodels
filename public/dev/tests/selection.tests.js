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
        console.log('testing:', ApplicationConfiguration.applicationModuleName);
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
            SimpleController = $controller('SimpleController', {
                $scope: scope
            });

            console.log('SimpleController', SimpleController);
        }));

        console.log('SimpleController', SimpleController);
        it('test creation', inject(function(selectableList) {
            var list = new selectableList(['0','1']);

            // Test service
            expect(list.getSelectedIndex()).toEqual(-1);

            list.selectIndex(0);
            expect(list.getSelectedIndex()).toEqual(0);

            list.selectIndex(1);
            expect(list.getSelectedIndex()).toEqual(1);

            // check controller
            expect(scope.nameAndPhone).not.toEqual(undefined);
        }));
    });
}());