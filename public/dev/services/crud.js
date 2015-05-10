angular.module('ng-puremodels').factory('crud', ['action', 'sortable', '$timeout', function (action, sortable, $timeout) {
    var result = function (someList, names, crudPermissions) {
        var _this = this;


        var sortableSelectableList = new sortable(someList, names);
        var itemInEdit = null;
        var itemIndexInEdit = -1;


        if (crudPermissions === undefined) {
            crudPermissions = {
                view: true,
                edit: true,
                add: true,
                remove: true
            }
        }


        function create(prototype) {
            return {};
        }

        function add() {
            _this.adding = true;

            recomputeActionsEnabledStates();
        }

        function close() {
            _this.adding = false;
            _this.editing = false;


            if (!_this.adding && !_this.editing) {
                if (_this.getSelectedIndex() !== -1) {
                    _this.toggleIndex(_this.getSelectedIndex());
                }
            }
            recomputeActionsEnabledStates();
        }

        function edit() {
            _this.adding = false;
            _this.editing = true;

            _this.itemInEditOriginal = sortableSelectableList.selectable.getSelectedObject();
            _this.itemInEdit = angular.copy(_this.itemInEditOriginal);

            recomputeActionsEnabledStates();
        }

        function persistAddDefault(success, error) {
            $timeout(function() {
                success(_this.itemInEdit);
            }, 1000);
        }

        function persistSaveDefault(success, error) {
            $timeout(function() {
                success(_this.itemInEdit);
            }, 1000);
        }

        function persistTrashDefault(success, error) {
            var selectedObject = sortableSelectableList.selectable.getSelectedObject();
            $timeout(function() {
                success(selectedObject);
            }, 1000);
        }

        function save() {
            // save acts differently when adding new
            if (_this.adding) {
                _this.error = undefined;
                _this.saving = true;

                _this.actions.save.processing();
                _this.persistAdd(function (newItem) {
                    sortableSelectableList.list.push(newItem);
                    sortableSelectableList.selectable.restoreSelection();

                    // sort again
                    sortableSelectableList.sorting.onChange();

                    _this.actions.save.finishing(true);
                    _this.saving = false;
                    $timeout(function() {
                        _this.actions.save.normal();

                        _this.adding = false;
                        _this.editing = false;

                        recomputeActionsEnabledStates();
                    }, 2000);


                }, function (error) {
                    _this.actions.save.normal();
                    _this.saving = false;
                    _this.error = error;
                    recomputeActionsEnabledStates();
                });
            }

            if (_this.editing) {
                _this.error = undefined;
                _this.saving = true;

                _this.actions.save.processing();

                _this.persistSave(function (updatedItem) {
                    angular.copy(updatedItem, _this.itemInEditOriginal);

                    _this.actions.save.finishing(true);
                    _this.saving = false;
                    $timeout(function() {
                        _this.actions.save.normal();

                        _this.adding = false;
                        _this.editing = false;

                        recomputeActionsEnabledStates();
                    }, 2000);


                }, function (error) {
                    _this.actions.save.normal();
                    _this.saving = false;
                    _this.error = error;
                    recomputeActionsEnabledStates();
                });
            }

        }

        function trash() {
            _this.persistTrash(function (deletedItem) {
                var indexOfDeletedItem = sortableSelectableList.selectable.indexOf(deletedItem);
                if (indexOfDeletedItem != -1) {
                    var removed = sortableSelectableList.list.splice(indexOfDeletedItem, 1);
                }

                sortableSelectableList.selectable.restoreSelection();

                // sort again
                sortableSelectableList.sorting.onChange();

                recomputeActionsEnabledStates();

            }, function (error) {
                _this.error = error;
            });

            recomputeActionsEnabledStates();
        }


        function recomputeActionsEnabledStates() {
            if (_this.adding || _this.editing) {
                _this.actions.add.visible = false;
                _this.actions.edit.visible = false;
                _this.actions.save.visible = true;
                _this.actions.trash.visible = false;
                _this.actions.close.visible = true;
            } else {
                _this.actions.add.visible = true;
                _this.actions.edit.visible = true;
                _this.actions.save.visible = false;
                _this.actions.trash.visible = true;
                _this.actions.close.visible = true;
            }

            if (_this.loading || _this.saving) {
                _this.actions.add.disable = true;
                _this.actions.edit.disable = true;
                _this.actions.save.disable = true;
                _this.actions.trash.disable = true;
                _this.actions.close.disable = true;


                return;
            }

            if (_this.adding || _this.editing) {
                _this.actions.add.disable = true;
                _this.actions.edit.disable = true;
                _this.actions.save.disable = false;
                _this.actions.trash.disable = true;
                _this.actions.close.disable = false;

                return;
            }

            if (_this.getSelectedIndex() !== -1) {
                _this.actions.add.disable = false;
                _this.actions.edit.disable = false;
                _this.actions.save.disable = true;
                _this.actions.trash.disable = false;
                _this.actions.close.disable = false;

                return;
            } else {
                _this.actions.add.disable = false;
                _this.actions.edit.disable = true;
                _this.actions.save.disable = true;
                _this.actions.trash.disable = true;
                _this.actions.close.disable = true;
            }

            console.log('_this.actions.edit.disable:', _this.actions.edit.disable);
        }

        // public flags
        this.editing = false;
        this.loading = false;
        this.saving = false;
        this.adding = false;

        // when editing, keep pointer to original item
        this.itemInEdit = null;
        this.itemInEditOriginal = null;

        // actions
        this.add = add;
        this.save = save;
        this.edit = edit;
        this.trash = trash;
        this.close = close;

        // public methods
        this.persistAdd = persistAddDefault;
        this.persistSave = persistSaveDefault;
        this.persistTrash = persistTrashDefault;


        // delegate for convinience
        this.list = sortableSelectableList.list;
        this.selectable = sortableSelectableList.selectable;
        this.sorting = sortableSelectableList.sorting;

        // selection disabled on curtain conditions
        this.toggleIndex = function (i) {
            if (!_this.loading && !_this.saving && !_this.editing && !_this.adding) {
                _this.selectable.toggleIndex(i);
                recomputeActionsEnabledStates();
            }
        }

        this.getSelectedIndex = function() {
            return _this.selectable.getSelectedIndex();
        }

        // make it easier to activate
        var defaultActionsNames = 'add,save,edit,trash,close'.split(',');
        var actions = {};

        // complete actions metadata
        for (var i = 0; i < defaultActionsNames.length; i++) {
            var actionName = defaultActionsNames[i];
            actions[actionName] = new action(actionName, this);
        }

        this.actions = actions;

        recomputeActionsEnabledStates();
    };

    return result;
}]);