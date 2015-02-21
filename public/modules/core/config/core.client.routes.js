'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        // Redirect to home view when route not found
        $urlRouterProvider.otherwise('/');

        // Home state routing
        $stateProvider.
            state('home', {
                url: '/',
                templateUrl: '/modules/core/views/home.client.view.html'
            }).
            state('resources', {
                url: '/resources',
                templateUrl: '/modules/core/views/resources.client.view.html'
            }).
            state('selection', {
                url: '/selection',
                templateUrl: '/modules/core/views/selection.client.view.html'
            }).
            state('recursion', {
                url: '/recursion',
                templateUrl: '/modules/core/views/recursion.client.view.html'
            }).
            state('events', {
                url: '/events',
                templateUrl: '/modules/core/views/pubsub.client.view.html'
            });
    }
]);
