'use strict';

angular.module('examples').controller('PubSubController', ['$scope', 'namesAndPhones', 'selectable',
    function ($scope, namesAndPhones, selectable) {

        $scope.listOfEvents = [];
        $scope.list = new selectable(namesAndPhones.array);

        $scope.list.fireChangeSelectionEvent =
            function (oldSelectedObject, newSelectedObject, oldSelectedIndex, newSelectedIndex) {
                $scope.$bus.publish({
                    channel: 'orders',
                    topic: 'order.new',
                    data: {
                        'oldSelectedObject': oldSelectedObject,
                        'newSelectedObject': newSelectedObject,
                        'oldSelectedIndex': oldSelectedIndex,
                        'newSelectedIndex': newSelectedIndex
                    }
                });
            };


        $scope.$bus.subscribe({
            channel: 'orders',
            topic: 'order.new',
            callback: function (data) {
                $scope.listOfEvents.push(data);
            }
        });
    }
]);

