angular.module('ng-puremodels').directive('sortTh', function () {
    return {
        scope: {
            sorting: '=',
            pname : '='
        },
        templateUrl: 'dev/directives/sort-th.html'
    }
});
