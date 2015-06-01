'use strict';
console.log('here');
angular.module('snippets').controller('AngularPdfCtrl', ['$scope', function($scope) {
    console.log('here');
    $scope.pdfName = 'Relativity: The Special and General Theory by Albert Einstein';
    $scope.pdfUrl = 'partials/relativity.pdf';
    $scope.scroll = 0;
    $scope.loading = 'loading';

    $scope.getNavStyle = function(scroll) {
        if(scroll > 100) return 'pdf-controls fixed';
        else return 'pdf-controls';
    }

    $scope.onError = function(error) {
        console.log(error);
    }

    $scope.onLoad = function() {
        $scope.loading = '';
    }

    $scope.onProgress = function(progress) {
        console.log(progress);
    }

}]);