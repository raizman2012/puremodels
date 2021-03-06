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
            state('resources_server', {
                url: '/resources_server',
                templateUrl: '/modules/core/views/resources.server.view.html'
            }).
            state('resource_client', {
                url: '/resources_client',
                templateUrl: '/modules/core/views/resources.client.view.html'
            }).
            state('selection', {
                url: '/selection',
                templateUrl: '/modules/core/views/selection.client.view.html'
            }).
            state('sorting', {
                url: '/sorting',
                templateUrl: '/modules/core/views/sorting.client.view.html'
            }).
            state('recursion', {
                url: '/recursion',
                templateUrl: '/modules/core/views/recursion.client.view.html'
            }).
            state('grouping', {
                url: '/grouping',
                templateUrl: '/modules/core/views/grouping.client.view.html'
            }).
            state('events', {
                url: '/events',
                templateUrl: '/modules/core/views/pubsub.client.view.html'
            }).
            state('documentum', {
                url: '/documentum',
                templateUrl: '/modules/core/views/documentum.client.view.html'
            }).
            state('search', {
                url: "/search/:tags",
                templateUrl: '/modules/core/views/snippets.client.view.html'
            }).
            state('boolean', {
                url: "/boolean",
                templateUrl: '/modules/core/views/boolean.client.view.html'
            });
    }
]);
