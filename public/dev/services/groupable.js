angular.module('ng-puremodels').factory('groupable', ['selectable', function (selectable) {
    var res = function (someList, propertiesArray) {
        var _this = this;

        var list = someList === undefined ? [] : someList.slice(0);

        function default_schema_info_provider() {
            this.getPropertyType = function (schemaName, propertyName, propertyValue) {
                if (propertyValue === undefined) {
                    return 'object';
                }

                var res = typeof propertyValue;
                if (res === 'object') {
                    if (Object.prototype.toString.call(propertyValue) === '[object Array]') {
                        res = 'array';
                    }
                }
                return res;
            }
        }

        var schema_info_provider = new default_schema_info_provider();

        var properties = _.map(propertiesArray, function(name) {
            var type = typeof list[0][name];
            return { 'name' : name, 'type' : type};
        });
        properties.splice(0, 0, { 'name' : '__none__'});


        var indexedProperties = _.indexBy(properties, 'name');

        var selectableProperties = new selectable(properties);

        selectableProperties.selectIndex(0); // by default its not grouped

        function groupBy(name) {
            _this.groups = _.chain(list)
                .groupBy(name, indexedProperties[name].iteratee)
                .value();

        };

        selectableProperties.fireChangeSelectionEvent = function() {
            var name = _this.selectableProperties.getSelectedObject().name;
            if (name === 'none') {
                _this.groups = undefined;
                return;
            }

            groupBy(name);
        }



        this.groupBy = groupBy;
        this.selectableProperties = selectableProperties;
    }
    return res;
}]);
