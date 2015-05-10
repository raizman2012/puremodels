'use strict';


angular.module('core').controller('SnippetsController', ['$scope', '$http', 'selectable', 'paging', '$state', '$stateParams', '$location',
    function ($scope, $http, selectable, paging, $state, $stateParams, $location) {


        console.log('$stateParams:', $stateParams);
        $scope.test = 'snippets test';

        $scope.resultViewTypes = new selectable(['list', 'picture-o']);
        $scope.resultViewTypes.selectIndex(0);

        $scope.snippets = {};
        $scope.filteredSnippets = [];
        $scope.tagsSortedByCount = [];
        $scope.selectableTags = undefined;
        $scope.whatIf = {};
        $scope.paging = new paging(0);

        console.log('paging:', $scope.paging);

        function getTagsCountedAndSorted(allSnippets) {

            // need to master underscore.js to understand this.

            var r = _.chain(allSnippets).each(function (value, key) {
                // this create list of values like [ table : { count : 1 }, panel : { count : 1 },... ]
                return value;
            }).reduce(function (result, value0) {

                // count tags, storing result in 'result' object
                // in form { table : 1, panel : 3, .....}
                _.each(value0, function (value1, key1) {

                    if (result[key1] === undefined) {
                        result[key1] = 0;
                    }
                    result[key1]++;
                });


                return result;
            }, {}).map(function (value, key) {
                // transform totals from object to array
                //console.log('value:', value, ' key ', key);
                return {tagName: key, count: value};
            }).sortBy('count').reverse().value(); // sort by count and reverse

            return r;
        }

        function getSamplesByTags(res, tagsToFind) {

            var r = _.chain(res).map(function (value, key) {
                return {
                    fullFilename: key,
                    fileName: cutPathFromFilename(key),
                    tags: _.keys(value)
                }
            }).reduce(function (result, current) {

                var match = _.intersection(current.tags, tagsToFind).length;
                if (match > 0 && match == tagsToFind.length) {
                    result.push(current);
                } else if (tagsToFind.length === 0) {
                    result.push(current);
                }
                return result;
            }, []).value();


            //console.log('getSamplesByTags:', r);
            return r;
        };

        function calculateWhatIf() {
            var selectedTagsNames = _.chain($scope.selectableTags.multiSelectedObjects).map(function (value) {
                return value.tagName;
            }).value();
            console.log('selectedTagsNames:', selectedTagsNames);
            var res = _.reduce($scope.tagsSortedByCount, function (result, current) {
                //console.log(current.tagName);
                var whatIfTags = selectedTagsNames.slice(0);
                whatIfTags.push(current.tagName);
                var rr = getSamplesByTags($scope.snippets, whatIfTags);
                result[current.tagName] = rr.length;
                return result;
            }, {});
            console.log('res:', res);
            return res;
        }

        function cutPathFromFilename(fileName) {
            var lastIndex = fileName.lastIndexOf('/');
            if (lastIndex === -1) return fileName;
            return fileName.substring(lastIndex + 1);
        }

        $scope.selectTag = function (tag) {
            $scope.selectedTags[tag] = true;
        }

        $scope.unselectTag = function (tag) {
            $scope.selectedTags[tag] = false;
        }

        // return snippetId
        $scope.goToSnippet = function (snippetId) {
            return cutPathFromFilename(snippetId).replace('.html', '');
        }

        $scope.load = function () {
            $http.get('/snippets').
                success(function (data, status, headers, config) {

                    $scope.snippets = data;
                    $scope.tagsSortedByCount = getTagsCountedAndSorted($scope.snippets);
                    $scope.selectableTags = new selectable($scope.tagsSortedByCount);

                    $scope.selectableTags.fireChangeMultiSelectionEvent = function () {

                        var selectedTagsNames = _.chain($scope.selectableTags.multiSelectedObjects).map(function (value) {
                            return value.tagName;
                        }).value();

                        $scope.filteredSnippets = getSamplesByTags($scope.snippets, selectedTagsNames);
                        $scope.paging = new paging($scope.filteredSnippets, 10);
                        $scope.whatIf = calculateWhatIf();
                    }

                    var tags = [];
                    if ($stateParams.tags !== undefined) {
                        tags = _.compact($stateParams.tags.split('_'));
                    }

                    // select tags if provided
                    _.each(tags, function (tag) {
                        var index = _.findIndex($scope.selectableTags.list,
                            {tagName: tag});
                        $scope.selectableTags.multiSelect(index);
                    });

                    console.log('tags:', tags);
                    $scope.filteredSnippets = getSamplesByTags($scope.snippets, tags);

                    $scope.paging = new paging($scope.filteredSnippets, 10);
                    $scope.whatIf = calculateWhatIf();

                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log('error data:', data);
                });
        };

        console.log('load...');
        $scope.load();

    }
]);
