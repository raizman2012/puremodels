/**
 * @ngdoc service
 * @name ng-puremodels.service:flags
 *
 * @description
 * provide common simple functionality on selection on string values
 * can be seen as collection of boolean values with event on change
 *
 **/
angular.module('ng-puremodels').factory('flags', [
    function () {
        var result = function (stringsArray, initialValue, initialSelected) {
            var _this = this;

            var initValueBoolean = initialValue == true ? true : false;

            _this.list = stringsArray !== undefined ? stringsArray.slice(0) : [];

            _this.names = {};

            _this.selected = undefined;

            function set(name, value) {
                var oldValue = _this.names[name];


                if (oldValue !== value) {
                    _this.selected = undefined;
                    if (value === true) {
                        _this.selected = name;
                    }
                    _this.names[name] = value;
                    if (_this.fireChangeSelectionEvent !== undefined) {
                        _this.fireChangeSelectionEvent(name, value);
                    }
                }
            }

            function setAll(value, exludeName) {
                for (var i = 0; i < _this.list.length; i++) {
                    var name = _this.list[i];
                    if (name === exludeName) {
                        continue;
                    }

                    _this.names[name] = value;
                }
            }

            function fireChangeSelectionEventDefault(name, value) {
                console.log('flags change event:', name, '=', value);
            }

            setAll(initValueBoolean);

            /**
             * @ngdoc method
             * @name unselectAll
             * @methodOf ng-puremodels.service:flags
             *
             * @description
             * unselect all
             *
             *
             */
            _this.unselectAll = function() {
                setAll(false);

                if (fireChangeSelectionEvent !== undefined) {
                    fireChangeSelectionEvent(undefined, value);
                }
            }

            /**
             * @ngdoc method
             * @name selectAll
             * @methodOf ng-puremodels.service:flags
             *
             * @description
             * select all
             *
             *
             */
            _this.selectAll = function() {
                setAll(true);
                fireChangeSelectionEvent(undefined, value);
            }

            /**
             * @ngdoc method
             * @name select
             * @methodOf ng-puremodels.service:flags
             *
             * @description
             * mark 'name' with true
             *
             *
             */
            _this.select = function(name) {
                set(name, true);
            }

            /**
             * @ngdoc method
             * @name selectOne
             * @methodOf ng-puremodels.service:flags
             *
             * @description
             * mark 'name' with true, and others with false
             *
             *
             */
            _this.selectOne = function(name) {
                setAll(false, name);
                set(name, true);
            }

            /**
             * @ngdoc method
             * @name unselect
             * @methodOf ng-puremodels.service:flags
             *
             * @description
             * mark 'name' with true
             *
             *
             */
            _this.unselect = function(name) {
                set(name, false);
            }

            /**
             * @ngdoc method
             * @name toggle
             * @methodOf ng-puremodels.service:flags
             *
             * @description
             * mark 'name' with true if false and false if true
             *
             *
             */
            _this.toggle = function(name) {
               set(name, !_this.names[name]);
            }

            _this.fireChangeSelectionEvent = fireChangeSelectionEventDefault;

            if (initialSelected !== undefined) {
                _this.selectOne(initialSelected);
            }
        };
        return result;
    }]);