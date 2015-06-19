angular.module('declaration', [ 'ngRoute', 'tenphi.bem', 'egov.ui.textbox', 'egov.ui.uin' ])


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

.config(['$compileProvider', function ($compileProvider) {
  // disable debug info
  $compileProvider.debugInfoEnabled(false);
}])

.controller('declarationCntrllr', [ '$scope', 'declarationLcl', function($scope, declarationLcl) {
	var declaration = this;
	declaration.locale = declarationLcl;
}]);