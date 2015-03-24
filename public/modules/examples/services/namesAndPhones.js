'use strict';

//Menu service used for managing  menus
angular.module('core').service('namesAndPhones', [
    function () {
        this.array = [
            {
                name: 'daniel0',
                lastname: 'stark0',
                phone: '34-56-00000-89'
            }, {
                name: 'daniel1',
                lastname: 'stark1',
                phone: '34-56-11111-89'
            }, {
                name: 'daniel2',
                lastname: 'stark2',
                phone: '34-56-22222-89'
            }];

        this.arrayLong = [
            {
                name: 'daniel0',
                lastname: 'stark0',
                phone: '34-56-00000-89'
            }, {
                name: 'daniel1',
                lastname: 'stark1',
                phone: '34-56-11111-89'
            }, {
                name: 'daniel2',
                lastname: 'stark2',
                phone: '34-56-22222-89'
            }, {
                name: 'daniel3',
                lastname: 'stark3',
                phone: '34-56-22222-89'
            }, {
                name: 'daniel4',
                lastname: 'stark4',
                phone: '34-56-22222-89'
            }, {
                name: 'daniel5',
                lastname: 'stark5',
                phone: '34-56-22222-89'
            }, {
                name: 'daniel6',
                lastname: 'stark6',
                phone: '34-56-22222-89'
            }, {
                name: 'daniel7',
                lastname: 'stark7',
                phone: '34-56-22222-89'
            }];
    }
]);
