"use strict";

angular
    .module('directives.book.item', [])
    .directive('bookItem', function () {
        return {
            restrict: 'E',
            scope: {
                book: "="
            },
            bindController: true,
            templateUrl: 'directives/views/bookItem.html',
            controller: function ($scope, $rootScope, dataService) {
                $scope.openEditModal = function () {
                    $rootScope.$broadcast('OPEN_MODAL', {
                        dialogType: 'EDIT',
                        book: $scope.book
                    });
                };

                $scope.delete = function () {
                    //dataService.deleteBook($scope.book.id);
                    $rootScope.$broadcast('OPEN_MODAL', {
                        dialogType: 'DELETE',
                        book: $scope.book
                    });
                };
            }
        };
    });