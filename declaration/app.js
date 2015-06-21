angular.module('declaration', [ 
    'ngRoute', 
    'tenphi.bem', 
    'egov.ui.rest',
    'egov.ui.textbox', 
    'egov.ui.uin',
    'egov.ui.view_mode'
])


.config(function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'declaration/step1/template.html',
            controller: 'step1Cntrllr'
        }). 
        when('/step2', {
            templateUrl: 'declaration/step1/template.html',
            controller: 'step2Cntrllr'
        }).                
    otherwise({ redirectTo: '/' });
})

.config([ '$compileProvider', function ($compileProvider) {
  // конфигурация услуги
  $compileProvider.debugInfoEnabled(false);
}])

.run([ '$rootScope', function($rootScope){
   $rootScope.debug = false; 
}])

.controller('declarationCntrllr', [ '$scope', 'declarationLcl', function($scope, declarationLcl) {
	var declaration = this;
	declaration.locale = declarationLcl;
}]);