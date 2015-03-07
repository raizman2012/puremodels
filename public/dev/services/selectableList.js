/**
 * @ngdoc service
 * @name ng-puremodels.service:selectableList
 *
 * @description
 * wrap array with select-unselect-event on select functionality
 * selection can be 'single' : only one index can be selected,
 * and 'multi' when number of elements are selected.
 *
 * Two modules of selection are not affecting each other.
 **/
angular.module('ng-puremodels').factory('selectableList', function () {
    var res = function (someList) {
        var _this = this;
        var list = someList.slice(0);

        // for single selection
        var selectedIndex = -1;
        var selectedObject = undefined;

        // for 'multi' selection
        var multiSelections = [];
        var multiSelectedObjects = [];
        var multiSelectedIndexes = [];

        // init multi selection with no one selected
        for (var i = 0; i < list.length; i++) {
            multiSelections.push(false);
        }

        function clearArray (array) {
            while (array.length) {
                array.pop();
            }
        }

        function rebuildMultiSelectionArrays() {
            clearArray(multiSelectedObjects);
            clearArray(multiSelectedIndexes);

            for (var i = 0; i < list.length; i++) {
                if (multiSelections[i] === true) {
                    multiSelectedObjects.push(list[i]);
                    multiSelectedIndexes.push(i);
                }
            }
        }

        function unselectAll() {
            var changed = false;
            for (var i = 0; i < list.length; i++) {
                if (multiSelections[i] === true) {
                    changed = true;
                }
                multiSelections[i] = false;
            }

            if (changed)
                fireChangeMultiSelectionEvent(-1, false);
        }

        function selectAll() {
            var changed = false;

            for (var i = 0; i < list.length; i++) {
                if (multiSelections[i] === false) {
                    changed = true;
                }
                multiSelections[i] = true;
            }

            if (changed)
                fireChangeMultiSelectionEvent(-1, true);
        }

        function toggleAll() {
            for (var i = 0; i < list.length; i++) {

                multiSelections[i] = !multiSelections[i];
            }

            fireChangeMultiSelectionEvent(-1, undefined);
        }

        // private method
        // set selected value and fire event if value was changed
        function multiSetSelection(i, value) {
            var oldValue = multiSelections[i];
            multiSelections[i] = value;
            console.log('oldValue:', oldValue, 'value :', value);
            if (oldValue !== value) {
                fireChangeMultiSelectionEvent(i, value);
            }
        }

        function fireChangeMultiSelectionEvent(index, newValue) {
            rebuildMultiSelectionArrays();
            try {
                if (_this.fireChangeMultiSelectionEvent !== undefined) {
                    _this.fireChangeMultiSelectionEvent(index, newValue);
                }
            } catch (err) {
                console.log(err);
            }
        }

        function multiSelect(i) {
            multiSetSelection(i, true);
        }

        function multiUnselect(i) {
            multiSetSelection(i, false);
        }

        function multiToggleSelect(i) {
            multiSetSelection(i, !multiSelections[i]);
        }

        function getMultiSelectedIndexes() {
            return multiSelections;
        }

        // single selection methods
        function getSelectedIndex() {
            return selectedIndex;
        }

        function setSelectedAndFireChangeEvent(i) {
            if (selectedIndex === i) {
                return;
            }
            else {
                var oldSelectedIndex = selectedIndex;
                var oldSelectedObject = selectedObject;

                if (i < -1 || i >= list.length) {
                    return;
                }

                selectedIndex = i;
                if (i === -1) {
                    selectedObject = undefined;
                } else {
                    selectedObject = list[i];
                }

                // fire event
                fireChangeSelectionEvent(oldSelectedObject, selectedObject, oldSelectedIndex, selectedIndex);
            }
        }

        function fireChangeSelectionEvent(oldSelectedObject, newSelectedObject, oldSelectedIndex, newSelectedIndex) {
            try {
                if (_this.fireChangeSelectionEvent !== undefined) {
                    _this.fireChangeSelectionEvent(oldSelectedObject, selectedObject, oldSelectedIndex, selectedIndex);
                }
            } catch (err) {
                console.log(err);
            }
        }

        function getList() {
            return list;
        }

        function selectIndex(i) {
            setSelectedAndFireChangeEvent(i);
        }

        function unselectIndex(i) {
            setSelectedAndFireChangeEvent(-1);
        }

        function toggleIndex(i) {
            if (selectedIndex === i) {
                setSelectedAndFireChangeEvent(-1);
            } else {
                setSelectedAndFireChangeEvent(i);
            }
        }

        function fireChangeMultiSelectionEventDefault(index, newValue) {
            console.log('multi selection:', index, ';', newValue);
        }

        function fireChangeSelectionEventDefault(oldSelectedObject, newSelectedObject, oldSelectedIndex, newSelectedIndex) {
            console.log('selection:', oldSelectedObject, ';', newSelectedObject, ';', oldSelectedIndex, ';', newSelectedIndex);
        }


        /**
         * @ngdoc method
         * @name getSelectedIndex
         * @methodOf ng-puremodels.service:selectableList
         *
         * @description
         * return selected index in the array, or -1 if nothing selected
         *
         *
         */
        this.getSelectedIndex = getSelectedIndex;


        /**
         * @ngdoc method
         * @name selectIndex
         * @methodOf ng-puremodels.service:selectableList
         *
         * @description
         * change selected index and fire event if index was changed
         *
         * @param {integer} index value of index to select
         */
        this.selectIndex = selectIndex;

        /**
         * @ngdoc method
         * @name unselectIndex
         * @methodOf ng-puremodels.service:selectableList
         *
         * @description
         * unselect index and fire event if index was changed
         *
         *
         */
        this.unselectIndex = unselectIndex;

        /**
         * @ngdoc method
         * @name unselectIndex
         * @methodOf ng-puremodels.service:selectableList
         *
         * @description
         * toggle selection and fire event if index was changed
         *
         *
         */
        this.toggleIndex = toggleIndex;

        /**
         * @ngdoc method
         * @name fireChangeSelectionEvent
         * @propertyOf ng-puremodels.service:selectableList
         *
         * @description
         * function to invoke on change selection event
         */
        this.fireChangeSelectionEvent = fireChangeSelectionEventDefault;

        /**
         * @ngdoc method
         * @name fireChangeMultiSelectionEvent
         * @propertyOf ng-puremodels.service:selectableList
         *
         * @description
         * function to invoke on change multi selection event
         */
        this.fireChangeMultiSelectionEvent = fireChangeMultiSelectionEventDefault;

        // multi selection

        /**
         * @ngdoc method
         * @name unselectAll
         * @methodOf ng-puremodels.service:selectableList
         *
         * @description
         * unselect all objects
         */
        this.unselectAll = unselectAll;

        /**
         * @ngdoc method
         * @name selectAll
         * @methodOf ng-puremodels.service:selectableList
         *
         * @description
         * select all objects
         */
        this.selectAll = selectAll;

        /**
         * @ngdoc method
         * @name toggleAll
         * @methodOf ng-puremodels.service:selectableList
         *
         * @description
         * toggle  all objects multi selection
         */
        this.toggleAll = toggleAll;

        /**
         * @ngdoc method
         * @name multiSelect
         * @methodOf ng-puremodels.service:selectableList
         *
         * @description
         * select object in multi selection
         *
         * @param {integer} index value of index to select
         */
        this.multiSelect = multiSelect;

        /**
         * @ngdoc method
         * @name multiUnselect
         * @methodOf ng-puremodels.service:selectableList
         *
         * @description
         * unselect object in multi selection
         *
         * @param {integer} index value of index to select
         */
        this.multiUnselect = multiUnselect;

        /**
         * @ngdoc method
         * @name multiToggleSelect
         * @methodOf ng-puremodels.service:selectableList
         *
         * @description
         * toggleSelect selection on object
         *
         * @param {integer} index value of index to select
         */
        this.multiToggleSelect = multiToggleSelect;

        /**
         * @ngdoc method
         * @name multiSelections
         * @propertyOf ng-puremodels.service:selectableList
         *
         * @description
         * array of booleans for selected states
         */
        this.multiSelections = multiSelections;

        /**
         * @ngdoc method
         * @name multiSelectedObjects
         * @propertyOf ng-puremodels.service:selectableList
         *
         * @description
         * array selected objects
         */
        this.multiSelectedObjects = multiSelectedObjects;

        /**
         * @ngdoc method
         * @name multiSelectedIndexes
         * @propertyOf ng-puremodels.service:selectableList
         *
         * @description
         * array selected indexes
         */
        this.multiSelectedIndexes = multiSelectedIndexes;
        /**
         * @ngdoc method
         * @name getList
         * @methodOf ng-puremodels.service:selectableList
         *
         * @description
         * return array of objects
         */
        this.getList = getList;

        /**
         * @ngdoc method
         * @name list
         * @propertyOf ng-puremodels.service:selectableList
         *
         * @description
         * array of objects
         */
        this.list = list;

    }

    return res;
});

