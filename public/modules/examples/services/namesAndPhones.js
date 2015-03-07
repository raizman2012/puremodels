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

    }
]);
