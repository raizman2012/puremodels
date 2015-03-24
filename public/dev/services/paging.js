angular.module('ng-puremodels').factory('paging', function () {
        var res = function () {
            this.totalItems = 10;
            this.currentPage = 1;

            this.setPage = function (pageNo) {
                this.currentPage = pageNo;
            };

            this.pageChanged = function () {
                //$log.log('Page changed to: ' + $scope.currentPage);
            };

            this.itemsPerPage = 4;
            this.maxSize = 5;
        }
        return res;
    }
);