angular.module("declaration").run(["$templateCache", function($templateCache) {$templateCache.put("declaration/step1/template.html","\n<div elem=\"declaration-container\" ng-controller=\"step1Cntrllr as step1c\">\n    <div elem=\"input-box\" style=\"display:none;\">\n         <textbox label=\"{{ step1c.title }}\" value=\"step1c.uin\" state=\"{{ step1c.state }}\" hint=\"{{ step1c.uin_model.value }}\">\n        </textbox>               \n    </div>\n\n    <div elem=\"input-box\">\n         <egov-uin label=\"woop\" locale=\"ru\" info=\"step1c.uin_model.info\" value=\"step1c.uin_model.value\">\n        </egov-uin>               \n    </div>\n\n    <div elem=\"input-box\" ng-bind=\"step1c.uin_model.info\">           \n    </div>            \n\n    <div elem=\"actions\">\n        <button block=\"b-button\" ng-disabled=\"!step1c.uin_model.info\" mod=\"{ type: &apos;action&apos;, size: &apos;m&apos; }\">\n            {{ step1c.locale[\'ru\'].go_step2 }}\n        </button>\n    </div>\n</div>        ");}]);