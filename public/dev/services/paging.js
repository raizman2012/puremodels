angular.module('ng-puremodels').factory('paging', function () {
        var res = function (totalItems, pageSize) {
            var _this = this;

            this.totalItems = totalItems;
            this.currentPage = 0;
            this.currentOffset = 0;
            this.limitTo = 0;
            this.pageNumbers = [];
            this.visitedPages = {};
            this.needPaging = true;

            this.itemsPerPage = pageSize !== undefined ? pageSize : 4;
            this.maxPagesInView = 5;

            function clearArray(array) {
                while (array.length) {
                    array.pop();
                }
            }

            this.hasNext = function () {
                if ((_this.currentPage + 1) * _this.itemsPerPage > _this.totalItems) {
                    return false;
                }
                return true;
            }

            this.more = function () {
                _this.next();
            };

            this.next = function () {
                _this.setPage(_this.currentPage + 1);
            };

            this.hasPrev = function () {
                if ((_this.currentPage - 1) * _this.itemsPerPage < 0) {
                    return false;
                }
                return true;
            };

            this.prev = function () {
                if (!_this.hasPrev()) {
                    return;
                }
                _this.setPage(_this.currentPage - 1);
            };

            this.home = function () {
                _this.setPage(0);
            };

            this.hasEnd = function () {
                if (_this.totalItems === -1) {
                    return false;
                }
                return true;
            };


            this.all = function () {
                _this.itemsPerPage = _this.totalItems;
                _this.needPaging= false;
                _this.setPage(0);
            };

            this.end = function () {
                _this.itemsPerPage =
                _this.setPage(0);
            };

            this.setPage = function (pageNo) {
                _this.currentPage = pageNo;

                // recompute some variables
                _this.limitTo = (_this.currentPage + 1) * _this.itemsPerPage;
                _this.currentOffset = _this.currentPage * _this.itemsPerPage;

                clearArray(_this.pageNumbers);

                for (var i = 0; i < _this.maxPagesInView; i++) {
                    if ( i  * _this.itemsPerPage <= _this.totalItems) {
                        _this.pageNumbers.push(i);
                    } else {

                    }

                }
            };

            this.pageChanged = function () {
                //$log.log('Page changed to: ' + $scope.currentPage);
            };



            this.setPage(0);
        }
        return res;
    }
);