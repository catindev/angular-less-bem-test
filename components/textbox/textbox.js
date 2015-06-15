angular.module("sandbox").directive('textbox', [function () {
    return {
        scope: {
            label: '@',
            value: '=',
            required: '@',
            state: '@',
            hint:'@'
        },
        templateUrl: 'components/textbox/textbox.html',
        restrict: "E",
        link: function (scope, elem, attrs) { 
            
        }
    }
}]);