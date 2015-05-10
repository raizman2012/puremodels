'use strict';

angular.module('examples').controller('SplitController', ['$scope', 'selectable',
    function ($scope, selectable) {

        var dates = [];
        for (var i = 0; i < 31; i++) {
            dates.push(''+i);
        }

        $scope.selectedDate = 'nothing';
        $scope.selectableDates = new selectable(dates);


        var pageSize = 7;
        var arrayToReturn = _.reduce(dates, function(result, value) {
            //console.log(value);
            if (result.length === 0) {
                result.push([]);
            }
            if (result[result.length-1].length === pageSize) {
                result.push([]);
            }
            result[result.length-1].push(value);
            return result;
        }, []);

        $scope.clickOnDate = function(i, j) {
            //console.log($scope.arrayToReturn[i][j]);
            $scope.selectableDates.selectIndex(i*pageSize+j);
        }
        //console.log('arrayToReturn:', arrayToReturn);
        $scope.arrayToReturn = arrayToReturn;
        $scope.pageSize = pageSize;

        var maxDays = 38;

        $scope.header = [];
        for (var j = 0; j < maxDays; j++) {
            $scope.header.push(j % 7);
        }
        var months = [];
        for (var month = 1; month <= 12; month++) {
            var days = [];
            var daysInMonth = new Date(2015, month, 0).getDate();
            for (var j = 0; j < maxDays; j++) {
                days.push(0);
            }

            var offset = new Date(2015, month-1, 1).getDay();
            console.log(''+new Date(2015, month-1, 1)+' m:'+month+' off:'+offset+' daysInMonth:'+daysInMonth);

            for (var day = 1; day <= daysInMonth; day++) {
                var date = new Date(2015, month-1, day);
                var oo = {
                    dd : date.getDate(),
                    day : date.getDay()
                };


                days[day+offset-1] = oo;

            }

            months.push(days);
        }
        $scope.months = months;

        $scope.clickOnDateInYear = function(month, day) {
            $scope.selectedDay = day;
            $scope.selectedMonth = month;

        }
    }
]);