angular.module('ng-puremodels').filter('pager', function(){

    return function(items, page, pageSize){

        var arrayToReturn = [];
        for (var i=0; i<items.length; i++){
            if (i >= page*pageSize && i < (page+1)*pageSize) {
                arrayToReturn.push(items[i]);
            }
        }

        return arrayToReturn;
    };
}).filter('limitTo', function(){

    return function(items, limitTo){

        var arrayToReturn = [];
        for (var i=0; i<items.length; i++){
            if (i < limitTo) {
                arrayToReturn.push(items[i]);
            }
        }

        return arrayToReturn;
    };
}).filter('range', function(){

    return function(items, from, to){

        var arrayToReturn = [];
        for (var i=0; i<items.length; i++){
            if (i >= from && i <= to) {
                arrayToReturn.push(items[i]);
            }
        }

        return arrayToReturn;
    };
}).filter('offset', function(){

    return function(items, offset, pageSize){

        var arrayToReturn = [];
        for (var i=0; i<items.length; i++){
            if (i >= offset && i <= offset+pageSize) {
                arrayToReturn.push(items[i]);
            }
        }

        return arrayToReturn;
    };
}).filter('last', function(){

    return function(items, last){

        var arrayToReturn = [];
        for (var i=0; i<items.length; i++){
            if (i > items.length - last) {
                arrayToReturn.push(items[i]);
            }
        }

        return arrayToReturn;
    };
});