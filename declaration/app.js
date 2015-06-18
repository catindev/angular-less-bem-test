angular.module('declaration', [ 'ngRoute', 'tenphi.bem', 'egov.ui.textbox', 'egov.ui.uin' ])
.config(function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'declaration/step1/template.html',
            controller: 'step1Cntrllr'
        }).        
    otherwise({ redirectTo: '/' });
}); 