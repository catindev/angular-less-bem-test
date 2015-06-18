angular.module('declaration').controller('step1Cntrllr', [ '$scope', 'step1Lcl', function($scope, step1Lcl){
    var ctrl = this;
    ctrl.title = "ИИН ребёнка";
    ctrl.uin = "";
    ctrl.state = "error";

    ctrl.uin_model = { value: '' };

    ctrl.locale = step1Lcl;
}]);