angular.module('egov.ui.textbox', [])
    .directive('textbox', [function () {
        return {
            scope: {
                label: '@',
                value: '=',
                required: '@',
                state: '@',
                hint:'@'
            },
            replace: true,
            templateUrl: 'components/textbox/textbox.html',
            restrict: "E",
            link: function (scope, elem, attrs) { 
                scope.eid = Math.random();
            }
        }
    }]);