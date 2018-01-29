"use strict";

angular
    .module('directives.auth.item', [])
    .directive('authorItem', function () {
        return {
            restrict: 'E',
            scope: {
                author: "="
            },
            bindController: true,
            templateUrl: 'directives/views/authorItem.html',
            controller: function ($scope, $rootScope, dataService) {
                $scope.openEditModal = function () {
                    $rootScope.$broadcast('OPEN_MODAL', {
                        dialogType: 'EDIT',
                        author: $scope.author
                    })
                }

                $scope.Delete = function () {
                    dataService.deleteAuthor($scope.author.id);
                }
            }
        };
    });