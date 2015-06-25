/**
 * @ngdoc service
 * @name ng-puremodels.service:sortable
 *
 * @description
 * wrap selectable array with sorting functionality
 **/
angular.module('ng-puremodels').factory('sortable', ['$parse', 'selectable', 'sorting', function ($parse, selectable, sorting) {
    var result = function (someList, names) {
        var _this = this;

        var selectableList = new selectable(someList);
        var sorter = new sorting(names);

        var getters = {};


        sorter.onChange = function () {

            selectableList.list.sort(function (a, b) {
                for (var i = 0; i < sorter.statusesOrderedFifo.length; i++) {

                    var pname = sorter.statusesOrderedFifo[i];
                    if (getters[pname] === undefined) {
                        getters[pname] = $parse('obj.' + pname);
                    }

                    var status = sorter.statuses[pname];

                    if (status === undefined) {
                        console.log('null for:', pname);
                    }
                    if (status.sortDir === 0) {
                        continue;
                    }

                    //var va = a[pname];
                    var context = {obj: a};
                    var va = getters[pname](context);

                    //var vb = b[pname];
                    var context = {obj: b};
                    var vb = getters[pname](context);

                    //console.log('va:', va, ' vb:', vb);

                    if (va === vb) {
                        continue;
                    }
                    if (va === undefined) {
                        return status.sortDir * -1;
                    }
                    if (vb === undefined) {
                        return status.sortDir * 1;
                    }

                    if (angular.isFunction(va.localeCompare)) {
                        var res = va.localeCompare(vb) * status.sortDir;
                    } else {
                        if (va == vb) {
                            return 0;
                        }

                        var res = va > vb ? status.sortDir : -1 * status.sortDir;
                    }


                    return res;
                }
                return 0;
            });

            selectableList.restoreSelection();
        }

        // public properties

        /**
         * @ngdoc method
         * @name list
         * @propertyOf ng-puremodels.service:sortable
         *
         * @description
         * list of objects
         */
        this.list = selectableList.list;

        /**
         * @ngdoc method
         * @name selectable
         * @propertyOf ng-puremodels.service:sortable
         *
         * @description
         * selectable, so all methods of selectable can be accessed
         */
        this.selectable = selectableList;

        /**
         * @ngdoc method
         * @name sorting
         * @propertyOf ng-puremodels.service:sortable
         *
         * @description
         * sorting
         */
        this.sorting = sorter;

    }
    return result;
}]);

