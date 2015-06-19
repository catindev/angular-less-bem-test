angular.module('declaration').controller('step1Cntrllr', [ 'step1Lcl', function(step1Lcl) {
    var step1 = this;
    
    step1.uin_model = { value: '' };

    step1.locale = step1Lcl;
}]);