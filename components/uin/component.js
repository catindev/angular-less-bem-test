angular.module('egov.ui.uin', [ 'egov.ui.textbox' ])

.directive('egovUin', 
    function () {
        return {
            scope: {
                title: '@',
                value: '=',
                type: '@',
                info: '='
            },
            templateUrl: 'components/uin/template.html',
            restrict: "E",
            replace: true,
            controller: 'uinController'
        }            
});

