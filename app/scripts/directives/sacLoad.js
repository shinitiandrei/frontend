'use strict';
angular.module('uolsacApp')
    .directive('sacLoad', function() {
    return {
        restrict: 'A',
        scope: {
            loadHandler: '&sacLoad'
        },
        link: function (scope, element) {
            element.on('load', scope.loadHandler);
        }
    };
});
