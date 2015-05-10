angular.module('ng-puremodels').factory('async', ['$timeout', function ($timeout) {
        var res = function () {
            var _this = this;
            var messagesIdCount = 0;
            var hash = {

            };

            function addAndDeleteAfterTimeout(data, timeoutInSec) {
                messagesIdCount++;
                hash[messagesIdCount] = data;
                var id=messagesIdCount;
                $timeout(function(){
                    delete hash[id];
                }, timeoutInSec*1000);

                return id;
            }

            function replace(topicId, data) {
                delete hash[topicId];
                hash[topicId] = {};

                messagesIdCount++;
                var id=messagesIdCount;

                var topicIdP = topicId;

                hash[topicId][id] = data;

                return id;
            }

            function replaceAndDeleteAfterTimeout(topicId, data, timeoutInSec) {
                delete hash[topicId];
                hash[topicId] = {};

                messagesIdCount++;
                var id=messagesIdCount;

                var topicIdP = topicId;

                hash[topicId][id] = data;

                $timeout(function(){
                    delete hash[topicIdP][id];
                    console.log('deleted')
                }, timeoutInSec*1000);

                return id;
            }

            function withBoolean(setter, operation) {
                setter(true);

            }

            this.objectsMap = hash;
            this.addAndDeleteAfterTimeout = addAndDeleteAfterTimeout;
            this.replaceAndDeleteAfterTimeout = replaceAndDeleteAfterTimeout;
            this.replace = replace;
        }
        return res;
    }]
);