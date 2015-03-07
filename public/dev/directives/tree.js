angular.module('ng-puremodels').directive('test', function () {
    return {
        template: 'Name: {{customer.name}} Address: {{customer.address}}'
    };
});