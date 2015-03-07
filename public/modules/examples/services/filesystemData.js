'use strict';

//Menu service used for managing  menus
angular.module('core').service('filesystemData', [
    function () {

        this.files = {
            name: 'root',
            children: [
                {name: 'n0', author : 'anonymous', modified : '12/01/2015'},
                {
                    name: 'n1',
                    children: [
                        {name: 'n10', author : 'anonymous', modified : '10/01/2015'},
                        {name: 'n11', author : 'anonymous', modified : '12/01/2015'},
                        {name: 'n12', author : 'anonymous', modified : '22/01/2015'},
                        {name: 'n13', author : 'anonymous', modified : '31/01/2015'},
                        {name: 'n14', author : 'anonymous', modified : '01/01/2015'},
                        {name: 'n15', author : 'anonymous', modified : '11/01/2015'}
                    ]
                },
                {name: 'n2'},
                {
                    name: 'n3',
                    children: [
                        {name: 'n30', author : 'anonymous', modified : '12/01/2015'},
                        {name: 'n31', author : 'anonymous', modified : '13/01/2015'},
                        {name: 'n32', author : 'anonymous', modified : '14/01/2015'},
                        {name: 'n33', author : 'anonymous', modified : '31/01/2015'},
                        {name: 'n34', author : 'anonymous', modified : '01/01/2015'},
                        {name: 'n35', author : 'anonymous', modified : '11/01/2015'},
                        {name: 'n36', author : 'anonymous', modified : '11/01/2015'},
                        {name: 'n37', author : 'anonymous', modified : '11/01/2015'}
                    ]
                },
                {name: 'n4'},
                {name: 'n5',
                    children: []
                }
            ]
        }
    }
]);
