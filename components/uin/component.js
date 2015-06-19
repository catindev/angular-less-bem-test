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
        controlleras: 'uin'
    }
}]);