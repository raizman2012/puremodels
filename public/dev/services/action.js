angular.module('ng-puremodels').factory('action', [function () {
        var defaultCssAliases = {
            'add' : 'fa fa-plus'
        };

        var defaultOptions = {
            iconClassesPrefix : 'fa fa-',
            btnClasses : 'btn btn-default',
            btnClassesProcessing : 'btn btn-warning',
            btnClassesFinishSuccess : 'btn btn-success',
            btnClassesFinishFailure : 'btn btn-danger',

            text_processing_suffix : '_processing',
            text_finish_success_suffix : '_success',
            text_finish_failure_suffix : '_failure'

        };

        var res = function (actionName, handler, options) {
            var _this = this;

            if (options === undefined) {
                options = defaultOptions;
                options.cssAliases = defaultCssAliases;
            }

            if (options.cssAliases === undefined) {
                options.cssAliases = defaultCssAliases;
            }

            this.name = actionName;
            this.text = actionName;


            this.visible = true;
            this.processing = false;
            this.finishing = false;

            if (options.cssAliases[actionName] === undefined) {
                this.iconClasses = 'fa fa-' + actionName;
            } else {
                this.iconClasses = options.cssAliases[actionName];
            }


            this.disabled = false;
            this.btnClasses = 'btn btn-default';

            if (angular.isFunction(handler[actionName])) {
                this.invoke = handler[actionName];
            } else {
                this.invoke = function () {
                    this.console.log('empty handler for:' + actionName);
                }
            }

            // public methods
            this.processing = function() {
                _this.disabled = true;
                _this.textOrigin = _this.text;
                _this.btnClassesOrigin = _this.btnClasses;

                _this.text =  _this.text+'_processing';
                _this.btnClasses = 'btn btn-warning';

            }

            this.finishing = function(success) {

                if (success) {
                    _this.text = _this.textOrigin+'_success';
                    _this.btnClasses = 'btn btn-success';
                } else {
                    _this.text = _this.textOrigin+'_failure';
                    _this.btnClasses = 'btn btn-danger';
                }

            }

            this.normal = function() {
                _this.text = _this.textOrigin;
                _this.btnClasses = _this.btnClassesOrigin;
            }
        }
        return res;
    }]
);