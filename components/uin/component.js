angular.module('egov.ui.uin', [ 'egov.ui.textbox' ])
.directive('egovUin', [ function () {
    return {
        scope: {
            title: '@',
            value: '=',
            type: '@',
            locale: '@',
            info: '='
        },
        templateUrl: 'components/uin/template.html',
        restrict: "E",
        replace: true,
        controller: 'uinCntrllr'
    }            
}]);