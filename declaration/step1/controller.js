angular.module('declaration').controller('step1Cntrllr', [ 'step1Lcl', function(step1Lcl){
    var ctrl = this;
    ctrl.title = "ИИН ребёнка";
    ctrl.uin = "";
    ctrl.state = "";

    ctrl.uin_model = { value: '' };

    ctrl.locale = step1Lcl;
}]);