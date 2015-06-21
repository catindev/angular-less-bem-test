angular.module('declaration')

.controller('step1Cntrllr', [ 'step1Lcl', '$rootScope', function(step1Lcl, $rootScope) {
    
	$rootScope.debug = true;
	
    var step1 = this;
    
    step1.uin_model = { value: '' };

    step1.locale = step1Lcl;
}]);