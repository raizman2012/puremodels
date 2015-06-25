/**
 * @ngdoc service
 * @name ng-puremodels.service:sorting
 *
 * @description
 * provide metadata for sort functionality.
 * The concept of sort itself and metadata is separated becouse sometimes sorting
 * performed on server , not on client
 **/
angular.module('ng-puremodels').factory('sorting', function () {
    var res = function (names) {
        var _this = this;
        var names = names !== undefined ? names : [];

        var statuses = {};
        var statusesOrderedFifo = [];

        function init() {
            for (var i = 0; i < names.length; i++) {
                var sortMeta = {
                    name: names[i],
                    defaultSortDir: 0,
                    sortDir: 0
                };
                statuses[names[i]] = sortMeta;

            }
        }

        function createMeta(name) {
            var sortMeta = {
                name: name,
                defaultSortDir: 0,
                sortDir: 0
            };
            return sortMeta;
        }

        function moveToHead(name) {
            var i = findIndexForName(name, statusesOrderedFifo);
            if (i === -1) {
                // first time
                statusesOrderedFifo.splice(0, 0, name);
                names.splice(0, 0, name);
            } else {
                // found
                statusesOrderedFifo.splice(i, 1);
                statusesOrderedFifo.splice(0, 0, name);

            }
        }

        function findIndexForName(name, array) {
            for (var i = 0; i < array.length; i++) {
                var curr = array[i];
                if (curr === name) {
                    return i;
                }
            }
            return -1;
        }



        function getStatus(pname) {
            if (statuses[pname] === undefined) {
                statuses[pname] = createMeta(pname);
            }
            return statuses[pname];
        }

        function defaultOnChange(pname, oldDir, newDir) {
            //console.log('pname:', pname, ' oldDir:', oldDir, ' newDir:', newDir);
        }

        function changeStatus(pname, dir) {
            if (statuses[pname] === undefined) {
                statuses[pname] = createMeta(pname);
            }

            statuses[pname].sortDir = dir;
            moveToHead(pname);
            _this.onChange();
        }

        init();

        // public methods
        /**
         * @ngdoc method
         * @name sortUp
         * @methodOf ng-puremodels.service:sorting
         *
         * @param {pname} string name of property
         * @description
         * change meta data to reflect sort up
         */
        this.sortUp = function (pname) {
            changeStatus(pname, 1);
        }

        /**
         * @ngdoc method
         * @name sortDown
         * @methodOf ng-puremodels.service:sorting
         *
         * @param {pname} string name of property
         *
         * @description
         * change meta data to reflect sort down
         */
        this.sortDown = function (pname) {
            changeStatus(pname, -1);
        }

        /**
         * @ngdoc method
         * @name sortToggle
         * @methodOf ng-puremodels.service:sorting
         *
         * @param {pname} string name of property
         *
         * @description
         * toogle meta data to reflect up or down
         */
        this.sortToggle = function (pname) {
            var status = getStatus(pname);
            //console.log('pname:', pname, ' status:', status);
            if (getStatus(pname).sortDir === 0) {
                _this.sortDown(pname);
                return;
            }
            changeStatus(pname, status.sortDir * -1);
        }

        /**
         * @ngdoc method
         * @name sortReset
         * @methodOf ng-puremodels.service:sorting
         *
         * @param {pname} string name of property
         *
         * @description
         * reset meta data to default
         */
        this.sortReset = function (pname) {
            changeStatus(pname, getStatus(pname).defaultSortDir);
        }

        /**
         * @ngdoc method
         * @name sortAllReset
         * @methodOf ng-puremodels.service:sorting
         *
         *
         * @description
         * reset all meta data to default
         */
        this.sortAllReset = function () {
            for (var i = 0; i < names.length; i++) {
                var status = getStatus(names[i]);
                status.sortDir = status.defaultSortDir;
            }
            _this.onChange();
        }

        /**
         * @ngdoc method
         * @name getStatusVerbose
         * @methodOf ng-puremodels.service:sorting
         *
         *
         * @description
         * return status translated to human readable string. good for mapping to css classes
         */
        this.getStatusVerbose = function(pname, translation) {
            if (translation === undefined) {
                translation = ['sort-asc', 'sort', 'sort-desc'];
            }

            var status = getStatus(pname);

            return translation[status.sortDir+1];
        }

        /**
         * @ngdoc method
         * @name onChange
         * @methodOf ng-puremodels.service:sorting
         *
         *
         * @description
         * method to call when sort changed. Use it for server side sorting
         */
        this.onChange = defaultOnChange;

        // public properties
        this.statuses = statuses;
        this.statusesOrderedFifo = statusesOrderedFifo;
        this.names = names;


    }
    return res;
});