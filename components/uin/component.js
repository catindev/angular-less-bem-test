angular.module('egov.ui.uin', [ 'egov.ui.textbox' ])
.directive('egovUin', [ 'uinSrvc', function (uinSrvc) {
    return {
        scope: {
            label: '@',
            value: '=',
            type: '@',
            locale: '@',
            info: '='
        },
        templateUrl: 'components/uin/template.html',
        restrict: "E",
        replace: true,
        controller: 'uinCntrllr',
        link: function (scope, elem, attrs) {
            if(scope.type && (scope.type === 'bin' || scope.type === 'iin')) uinSrvc.model.type = scope.type;
        }
    }
}]);