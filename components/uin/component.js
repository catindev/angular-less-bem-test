angular.module('egov.ui.uin', [ 'egov.ui.textbox' ])

.directive('egovUin', 
    function ($rootScope) {
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
            controller: 'uinController',
            link: function (scope, element, attrs) {
                $rootScope.$emit('locale.alias', {
                    name: 'uinType',
                    key: 'egovUin.idtype.' + ( attrs.type || 'other' )
                });               
            }
        }            
});

