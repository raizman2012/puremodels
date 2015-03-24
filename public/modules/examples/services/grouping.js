'use strict';

//Menu service used for managing  menus
angular.module('core').service('groupingData', [
    function () {
        this.customers = [
            {
                'id': '0000',
                'name' : 'Ivanov0 Leonid0',
                'age' : 42,
                'address' : 'Ramat Gan',
                'status' : 'married',
                'work' : 'ORACLE',
                'income' : 10000,
                'valid' : true,
                'registrated_date' : '01/01/2005',
                'about' : 'wants to by bike, needs a loan, looks for startup to invest',
                'likes' : 'computers music opera vine ski'
            },
            {
                'id': '0001',
                'name' : 'Ivanov1 Leonid1',
                'age' : 42,
                'address' : 'Tel Aviv',
                'status' : 'married',
                'work' : 'ORACLE',
                'valid' : true,
                'income' : 11000,
                'registrated_date' : '01/02/2005',
                'about' : 'wants to by bike, needs a loan, looks for startup to invest',
                'likes' : 'opera vine ski'
            },
            {
                'id': '0002',
                'name' : 'Ivanov2 Leonid2',
                'age' : 42,
                'address' : 'Ramat Gan',
                'status' : 'single',
                'work' : 'ORACLE',
                'valid' : true,
                'income' : 12000,
                'registrated_date' : '01/03/2005',
                'about' : 'wants to by bike, needs a loan, looks for startup to invest',
                'likes' : 'computers music opera vine'
            },
            {
                'id': '0003',
                'name' : 'Ivanov3 Leonid3',
                'age' : 42,
                'address' : 'Tel Aviv',
                'status' : 'single',
                'work' : 'ORACLE',
                'valid' : false,
                'income' : 13000,
                'registrated_date' : '01/02/2006',
                'about' : 'wants to by bike, needs a loan, looks for startup to invest',
                'likes' : 'computers music shopping'
            },
            {
                'id': '0004',
                'name' : 'Ivanov4 Leonid4',
                'age' : 44,
                'address' : 'Ramat Gan',
                'status' : 'single',
                'work' : 'IBM',
                'valid' : false,
                'income' : 14000,
                'registrated_date' : '01/02/2006',
                'about' : 'wants to by bike, needs a loan, looks for startup to invest',
                'likes' : 'games music opera vine'
            },
            {
                'id': '0005',
                'name' : 'Ivanov5 Leonid5',
                'age' : 44,
                'address' : 'Tel Aviv',
                'status' : 'divorced',
                'work' : 'IBM',
                'valid' : false,
                'income' : 15000,
                'registrated_date' : '01/04/2006',
                'about' : 'wants to by bike, needs a loan, looks for startup to invest',
                'likes' : 'computers music opera vine'
            },
            {
                'id': '0006',
                'name' : 'Ivanov6 Leonid6',
                'age' : 44,
                'address' : 'Ramat Gan',
                'status' : 'divorced',
                'work' : 'IBM',
                'valid' : false,
                'income' : 16000,
                'registrated_date' : '01/04/2005',
                'about' : 'wants to by bike, needs a loan, looks for startup to invest',
                'likes' : 'computers music opera vine sun sea sand'
            },
            {
                'id': '0007',
                'name' : 'Ivanov7 Leonid7',
                'age' : 45,
                'address' : 'Tel Aviv',
                'status' : 'divorced',
                'work' : 'IBM',
                'valid' : false,
                'income' : 17000,
                'registrated_date' : '01/02/2005',
                'about' : 'wants to by bike, needs a loan, looks for startup to invest',
                'likes' : 'computers music opera vine cats '
            },
            {
                'id': '0008',
                'name' : 'Ivanov8 Leonid8',
                'age' : 65,
                'address' : 'Ramat Gan',
                'status' : 'divorced',
                'work' : 'IBM',
                'valid' : false,
                'income' : 18000,
                'registrated_date' : '01/02/2005',
                'about' : 'wants to by bike, needs a loan, looks for startup to invest',
                'likes' : 'computers music opera vine dogs'
            },
            {
                'id': '0009',
                'name' : 'Ivanov9 Leonid9',
                'age' : 35,
                'address' : 'Tel Aviv',
                'status' : 'divorced',
                'work' : 'IBM',
                'valid' : false,
                'income' : 19000,
                'registrated_date' : '01/02/2005',
                'about' : 'wants to by bike, needs a loan, looks for startup to invest',
                'likes' : 'computers music opera vine dogs'
            }
        ];
    }
]);