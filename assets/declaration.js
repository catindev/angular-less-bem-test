angular.module("declaration").run(["$templateCache", function($templateCache) {$templateCache.put("declaration/step1/template.html","\n<div block=\"b-declaration\" ng-controller=\"step1Cntrllr as step1c\">\n    \n    <div elem=\"header\">\n        <h1 elem=\"title\">Адресная справка</h1>\n    </div>\n\n    <div elem=\"input-box\" style=\"display:none;\">\n         <textbox label=\"{{ step1c.title }}\" value=\"step1c.uin\" state=\"{{ step1c.state }}\" hint=\"{{ step1c.uin_model.value }}\">\n        </textbox>               \n    </div>\n\n    <div elem=\"input-box\">\n         <egov-uin label=\"woop\" locale=\"ru\" info=\"step1c.uin_model.info\" value=\"step1c.uin_model.value\">\n        </egov-uin>               \n    </div>\n\n    <div elem=\"input-box\" ng-bind=\"step1c.uin_model.info\">           \n    </div>            \n\n    <div elem=\"actions\">\n        <button block=\"b-button\" ng-disabled=\"!step1c.uin_model.info\" mod=\"{ type: &apos;action&apos;, size: &apos;m&apos; }\">\n            {{ step1c.locale[\'ru\'].go_step2 }}\n        </button>\n    </div>\n                     \n</div>        ");}]);
angular.module('declaration', [ 'ngRoute', 'tenphi.bem', 'egov.ui.textbox', 'egov.ui.uin' ])
.config(function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'declaration/step1/template.html',
            controller: 'step1Cntrllr'
        }).        
    otherwise({ redirectTo: '/' });
}); 
angular.module('declaration').controller('step1Cntrllr', [ '$scope', 'step1Lcl', function($scope, step1Lcl){
    var ctrl = this;
    ctrl.title = "ИИН ребёнка";
    ctrl.uin = "";
    ctrl.state = "";

    ctrl.uin_model = { value: '' };

    ctrl.locale = step1Lcl;
}]);
angular.module('declaration').constant('step1Lcl', {
  "ru": {
    "go_step2": "Подписать и получить справку"
  },
  "kz": {

  },
  "en": {

  }
});