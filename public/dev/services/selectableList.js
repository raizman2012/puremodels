/**
 * Created by Leonid Raizman on 28/01/2015.
 */

angular.module('ng-puremodels').factory('selectableList', function () {
    var res = function (someList) {
        var _this = this;
        var list = someList.slice(0);

        var selectedIndex = -1;
        var selectedObject = undefined;


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

        function fireChangeSelectionEventDefault(oldSelectedObject, newSelectedObject, oldSelectedIndex, newSelectedIndex) {
            console.log('selection:', oldSelectedObject, ';', newSelectedObject, ';', oldSelectedIndex, ';', newSelectedIndex);
        }

        // public methods
        this.getSelectedIndex = getSelectedIndex;
        this.getList = getList;
        this.selectIndex = selectIndex;
        this.unselectIndex = unselectIndex;
        this.toggleIndex = toggleIndex;
        this.fireChangeSelectionEvent = fireChangeSelectionEventDefault;

    }

    return res;
});

