'use strict';

angular.module('examples').controller('GroupingController', ['$scope', 'selectable', 'sortable', 'groupingData', 'paging',
    function ($scope, selectable, sortable, groupingData, paging) {

        $scope.customers = new sortable(groupingData.customers);

        var pNames = _.keys(groupingData.customers[0]);
        var properties = _.map(pNames, function(name) {
            var type = typeof groupingData.customers[0][name];
            return { 'pname' : name, 'type' : type};
        });
        properties.splice(0, 0, { 'pname' : 'none'});
        console.log('properties', properties);

        $scope.customerGrouped = undefined;
        $scope.propertiesGrouping = new selectable(properties);
        $scope.propertiesGrouping.selectIndex(0);

        $scope.propertiesGrouping.fireChangeSelectionEvent = function() {
            var pname = $scope.propertiesGrouping.getSelectedObject().pname;
            if (pname === 'none') {
                $scope.customerGrouped = undefined;
                return;
            }


            $scope.customerGrouped = _.chain(groupingData.customers)
                .groupBy(pname)
                .value();

            console.log('$scope.customerGrouped:', $scope.customerGrouped);
        }


        $scope.pager = new paging();

        function sum(numbers) {
            return _.reduce(numbers, function(result, current) {
                return result + parseFloat(current);
            }, 0);
        }

        function count(values) {
            return _.reduce(values, function(result, current) {
                var key = ''+current;
                if (result[key] === undefined) {
                    result[key] = 1;
                } else {
                    result[key] = result[key]+1;
                }
                return result;
            }, {});
        }

        function countWordsStrict(values) {
            return _.reduce(values, function(result, current) {
                var words = current.split(" ");
                _.each(words, function(word) {
                    if (word.length === 0) {
                        return;
                    }
                    var key = word;
                    if (result[key] === undefined) {
                        result[key] = 1;
                    } else {
                        result[key] = result[key]+1;
                    }
                });

                return result;
            }, {});
        }

        function range(values, too_small, start, end, too_big, step) {
            return _.reduce(values, function(result, current) {
                var key = 'unknown';

                if (current < too_small) {
                    key = 'not valid, too small';
                } else if (too_small < current && current < start) {
                    key = 'less then '+start;
                } else if (end < current && current < too_big) {
                    key = 'more then '+start;
                } else if (too_big < current) {
                    key = 'not valid, too big';
                } else {
                    key = ''+(start+Math.floor((current - start) / step) * step) + '+';
                }


                if (result[key] === undefined) {
                    result[key] = 1;
                } else {
                    result[key] = result[key]+1;
                }
                return result;
            }, {});
        }


        var result = _.chain(groupingData.customers)
            .groupBy("work1")
            .map(function(value, key) {
                return {
                    work : count(_.pluck(value, "work")),
                    address : count(_.pluck(value, "address")),
                    status : count(_.pluck(value, "status")),
                    income : _.pluck(value, "income"),
                    age : range(_.pluck(value, "age"), 1, 10, 100, 200, 10),
                    likes : countWordsStrict(_.pluck(value, "likes"))
                }
            })
            .value();

        console.log(result);
        $scope.result = result[0];


    }
]);