angular.module('declaration', [ 
    'ngRoute', 
    'tenphi.bem', 
    'egov.ui.i18n',
    'egov.ui.rest',
    'egov.ui.textbox', 
    'egov.ui.uin',
    'egov.ui.view_mode'
])


.config(function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'declaration/step1/template.html',
            controller: 'step1Controller'
        }). 
        when('/step2', {
            templateUrl: 'declaration/step1/template.html',
            controller: 'step2Controller'
        }).                
        otherwise({ redirectTo: '/' });
})

.controller('declarationController', 
    function ($rootScope) {
	
        var declaration = this;

        $rootScope.$on("locale.current", function(event, lang) {
            console.log('new lang in app is', lang)
        }); 

    }
);