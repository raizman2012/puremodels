angular.module('ng-puremodels').directive('iconGroupButton', function () {
    return {
        restrict: 'AEC',
        scope: {
            actions: '=',
            btnGroupClasses : '='
        },
        link : function(scope, element, attrs) {

        },
        templateUrl: 'dev/directives/group_button.html'
    }
});

angular.module('ng-puremodels').directive('iconButton', function () {
    return {
        restrict: 'AEC',
        scope: {
            action: '=',
            btnClasses: '=',
            iconClasses: '='
        },
        link : function(scope, element, attrs) {

            //console.log('in link: controller:', scope);
        },
        templateUrl: 'dev/directives/button.html'
    }
});
