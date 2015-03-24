angular.module('ng-puremodels').factory('sortable', ['selectable', 'sorting', function (selectable, sorting) {
    var result = function (someList, names) {
        var _this = this;

        var selectableList = new selectable(someList);
        var sorter = new sorting(names);

        sorter.onChange = function () {

            selectableList.list.sort(function (a, b) {
                for (var i = 0; i < sorter.statusesOrderedFifo.length; i++) {

                    var pname = sorter.statusesOrderedFifo[i];

                    var status = sorter.statuses[pname];

                    //console.log('in sort', pname, 'status:', status);
                    if (status === undefined) {
                        console.log('null for:', pname);
                    }
                    if (status.sortDir === 0) {
                        continue;
                    }

                    var va = a[pname];
                    var vb = b[pname];

                    if (va === vb) {
                        continue;
                    }
                    if (va === undefined) {
                        return status.sortDir * -1;
                    }
                    if (vb === undefined) {
                        return status.sortDir * 1;
                    }

                    var res = va.localeCompare(vb) * status.sortDir;

                    return res;
                }
                return 0;
            });

            selectableList.restoreSelection();
        }


        this.list = selectableList.list;
        this.selectable = selectableList;
        this.sorting = sorter;
    }
    return result;
}]);

