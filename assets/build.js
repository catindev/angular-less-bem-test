angular.module('declaration', [ 'ngRoute', 'tenphi.bem', 'egov.ui.textbox', 'egov.ui.uin' ])
.config(function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'declaration/step1/template.html',
            controller: 'step1Cntrllr'
        }).        
    otherwise({ redirectTo: '/' });
})
.controller('declarationCntrllr', [ '$scope', 'declarationLcl', function($scope, declarationLcl) {
	var declaration = this;
	declaration.locale = declarationLcl;
}]);
angular.module("declaration").run(["$templateCache", function($templateCache) {$templateCache.put("declaration/step1/template.html","\n<div elem=\"declaration-container\" ng-controller=\"step1Cntrllr as step1c\">\n    <div elem=\"input-box\" style=\"display:none;\">\n         <textbox label=\"{{ step1c.title }}\" value=\"step1c.uin\" state=\"{{ step1c.state }}\" hint=\"{{ step1c.uin_model.value }}\">\n        </textbox>               \n    </div>\n\n    <div elem=\"input-box\">\n         <egov-uin locale=\"ru\" info=\"step1c.uin_model.info\" value=\"step1c.uin_model.value\">\n        </egov-uin>               \n    </div>\n\n    <div elem=\"input-box\" ng-bind=\"step1c.uin_model.info\">           \n    </div>            \n\n    <div elem=\"actions\">\n        <button block=\"b-button\" ng-disabled=\"!step1c.uin_model.info\" mod=\"{ type: &apos;action&apos;, size: &apos;m&apos; }\">\n            {{ step1c.locale[\'ru\'].go_step2 }}\n        </button>\n    </div>\n</div>        ");}]);
angular.module('declaration', [ 'ngRoute', 'tenphi.bem', 'egov.ui.textbox', 'egov.ui.uin' ])
.config(function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'declaration/step1/template.html',
            controller: 'step1Cntrllr'
        }).        
    otherwise({ redirectTo: '/' });
})
.controller('declarationCntrllr', [ '$scope', 'declarationLcl', function($scope, declarationLcl) {
	var declaration = this;
	declaration.locale = declarationLcl;
}]);
angular.module('declaration').constant('declarationLcl', {
  "ru": {
    "title": "Адресная справка"
  },

  "kz": {
  	"title": "Адресная справка"
  },
  
  "en": {
	"title": "Адресная справка"
  }
});
angular.module('declaration').controller('step1Cntrllr', [ 'step1Lcl', function(step1Lcl){
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
	"go_step2": "Подписать и получить справку"
  },
  
  "en": {
  	"go_step2": "Подписать и получить справку"
  }
});
angular.module("declaration").run(["$templateCache", function($templateCache) {$templateCache.put("components/textbox/textbox.html","<div block=\"b-textbox\">\n\n    <label for=\"textbox_{{eid}}\" block=\"b-label\" mod=\"{ }\">\n    	<span ng-if=\"required === &apos;true&apos;\" elem=\"asteriks\">*</span>\n    	<span elem=\"caption\" mod=\"{ required: required }\" ng-bind=\"label\"></span>\n    </label>\n\n    <input ng-disabled=\"state === &apos;disabled&apos;\" id=\"textbox_{{eid}}\" block=\"b-input-text\" type=\"text\" mod=\"{ state: state }\" ng-model=\"value\">\n\n    <div ng-show=\"hint\" block=\"b-baloon-hint\" mod=\"{ state: state }\">\n        <div elem=\"tail\" mod=\"{ state: state }\"></div>\n        <div elem=\"message\" mod=\"{ state: state }\" ng-bind=\"hint\"></div>\n    </div>       \n</div>	");
$templateCache.put("components/uin/template.html","<div block=\"b-uin\">\n	<textbox label=\"{{ label }}\" value=\"value\" state=\"{{ state }}\" hint=\"{{ hint }}\" required=\"true\">\n	</textbox>               \n</div>	");}]);
angular.module("declaration").service('$bem', ['$settings', function ($settings) {

    var me = this;

    // device:      pod | pep
    // fontSize:    pod-large | pod-largest | pep-large | pep-largest
    // contrast:    black | white

    var _device = null;
    var _fontSize = null;
    var _contrast = null;

    this.getDevice = function () { return _device; }
    this.setDevice = function (device) { _device = device; }
    this.toggleDevice = function (device) { _device = _device == device ? null : device; }

    this.getFontSize = function () { return _fontSize; }
    this.setFotnSize = function (fontSize) { _fontSize = fontSize; }
    this.toggleFontSize = function (fontSize) { _fontSize = _fontSize == fontSize ? null : fontSize; }

    this.getContrast = function () { return _contrast; }
    this.setContrast = function (contrast) { _contrast = contrast; }
    this.toggleContrast = function (contrast) { _contrast = _contrast == contrast ? null : contrast; }

    function initialize() {
        if ($settings.isPod()) {
            me.setDevice('pod');
        } else {
            me.setDevice('pep');
        }
    }

    initialize();

    return this;
}]);
angular.module('declaration').directive('viewMode', ['bemConfig', '$bem', function (bemConfig, $bem) {
    return {
        restrict: 'A',
        require: ['?block', '?elem'],
        link: function (scope, el, attrs, ctrls) {
            var ctrl = ctrls[0] || ctrls[1];
            var currentDevice = null;
            var currentFontSize = null;
            var currentContrast = null;

            if (!ctrl) {
                return;
            }

            var classListSupport = !!document.createElement('div').classList, addClass, removeClass;
            if (classListSupport) {
                addClass = function (el, cls) {
                    el[0].classList.add(cls);
                };

                removeClass = function (el, cls) {
                    el[0].classList.remove(cls);
                };

            } else {
                addClass = function (el, cls) {
                    el.addClass(cls);
                };

                removeClass = function (el, cls) {
                    el.removeClass(cls);
                };
            }

            scope.$watch(function () {
                return $bem.getDevice();
            }, function (modValue) {
                var modName = 'device';
                var className = bemConfig.generateClass(ctrl.blockName, ctrl.elemName, modName, modValue);

                if (currentDevice)
                    removeClass(el, currentDevice);

                if (modValue) {
                    addClass(el, className);
                    currentDevice = className;
                } else {
                    currentDevice = null;
                }
            });

            scope.$watch(function () {
                return $bem.getFontSize();
            }, function (modValue) {
                var modName = 'font-size';
                var className = bemConfig.generateClass(ctrl.blockName, ctrl.elemName, modName, modValue);

                if (currentFontSize)
                    removeClass(el, currentFontSize);

                if (modValue) {
                    addClass(el, className);
                    currentFontSize = className;
                } else {
                    currentFontSize = null;
                }
            });

            scope.$watch(function () {
                return $bem.getContrast();
            }, function (modValue) {
                var modName = 'contrast';
                var className = bemConfig.generateClass(ctrl.blockName, ctrl.elemName, modName, modValue);

                if (currentContrast)
                    removeClass(el, currentContrast);

                if (modValue) {
                    addClass(el, className);
                    currentContrast = className;
                } else {
                    currentContrast = null;
                }
            });
        }
    }
}]);


angular.module('egov.ui.textbox', [])
    .directive('textbox', [function () {
        return {
            scope: {
                label: '@',
                value: '=',
                required: '@',
                state: '@',
                hint:'@'
            },
            replace: true,
            templateUrl: 'components/textbox/textbox.html',
            restrict: "E",
            link: function (scope, elem, attrs) { 
                scope.eid = Math.random();
            }
        }
    }]);
angular.module('egov.ui.uin', [ 'egov.ui.textbox' ])
.directive('egovUin', [ 'uinSrvc', function (uinSrvc) {
    return {
        scope: {
            label: '@',
            value: '=',
            type: '@',
            locale: '@',
            info: '='
        },
        templateUrl: 'components/uin/template.html',
        restrict: "E",
        replace: true,
        controller: 'uinCntrllr',
        link: function (scope, elem, attrs) {
            if(scope.type && (scope.type === 'bin' || scope.type === 'iin')) uinSrvc.model.type = scope.type;
        }
    }
}]);
angular.module('egov.ui.uin')
.controller('uinCntrllr', function($scope, $element, $attrs, uinLcl, uinSrvc) {

    var hintMsg = uinLcl[$scope.locale].hint, 
        typeText = uinLcl[$scope.locale].idtype;

     if(!$scope.label) {
        if(!$scope.type) $scope.label = uinLcl[$scope.locale].default_title + typeText.other
        else $scope.label = uinLcl[$scope.locale].default_title + typeText[$scope.type];  
     }

    function resetViewState() {
        $scope.state = '';
        $scope.hint = '';
        $scope.info = '';
    };

    function errorState(type) {
        $scope.state = 'error';
        $scope.hint = hintMsg.invalid + typeText[type];
        return;
    };

    $scope.$watch('value', function(newValue, oldValue) {
        resetViewState();
        var idType = uinSrvc.getType(newValue);

        if(newValue && newValue.length > 12) $scope.value = oldValue;

        if(newValue && newValue.length < 12 && !uinSrvc.isNums(newValue)) {
                $scope.state = 'warning';
                $scope.hint = typeText[idType] + hintMsg.invalid_chars;
                return;
        }   

        if(newValue.length === 12){
            if(!uinSrvc.valid(newValue, idType)) return errorState(idType);

            $scope.state = 'disabled';
            $scope.hint = hintMsg.requesting;

            uinSrvc.requestInfo(newValue, idType)
                .success(function (data) {
                    if(idType === 'iin') $scope.info  = data.name.firstName +' '+ data.name.middleName +' '+ data.name.lastName
                    if(idType === 'bin') $scope.info  = data.fullName;    
                    $scope.state = '';
                    $scope.hint = $scope.info ;                       
                })
                .error(function (data, status) {
                    $scope.state = 'error';
                    if (status == '404') $scope.hint = typeText[idType] + hintMsg.not_found;
                    else $scope.hint = hintMsg.internal_error;    
                });
        } 
    });

});
angular.module('egov.ui.uin')
.constant('uinLcl', {
  "ru": {
    "hint": {
        "invalid": "Введённое значение не является ",
        "invalid_chars": " может состоять только из цифр",
        "not_found": " не найден в Государственной базе данных",
        "internal_error": "Техническая ошибка. Попробуйте отправить запрос позднее",
        "requesting": "Данные проверяются. Подождите",
    },
    "idtype": { "iin": "ИИН", "bin": "БИН", "other": "ИИН или БИН" },
    "default_title": "Введите "
  },
  "kz": {

  },
  "en": {

  }
});
angular.module('egov.ui.uin')
.service('uinSrvc', ['$http', function ($http) {

    var service = this;

    this.model = { type: '' };

    this.resetModel  = function(){
        service.model.value = '';
        service.model.shortInfo = '';
    };

    this.getType = function(value) {
        if (service.model.type) return service.model.type;
        if( value[4] >= 4 && value[4] <= 6 ) return 'bin';
        if( value[4] >= 0 && value[4] <= 3 ) return 'iin';
        return 'other';
    }

    this.isNums = function(value){
        if(!/^[0-9]+$/.test(value)) return false;
        return true;
    };

   this.valid = function (value,type) {
        if (!value || 12 != value.length || !/^\d*$/.test(value) || !service.isNums(value)) return !1;
        var k = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 
            l = [3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2], 
            d = [], b = 0, m = parseInt(value[0] + value[1]), 
            f = parseInt(value[2] + value[3]), e = value[4], g = value[5];
            parseInt(value.substring(6, 10));
            parseInt(value[6]);
        for (var c = 0;12 > c;c++) d[c] = parseInt(value[c]), 11 > c && (b += d[c] * k[c]);
        b %= 11;
        if (10 === b) {
            for (c = b = 0;11 > c;c++) b += d[c] * l[c];
            b %= 11;
        }
        if ("iin" === type) return b == d[11];
        if ("bin" === type) {
            return b == d[11] && 0 <= m && 1 <= f && 12 >= f && (4 == e || 5 == e || 6 == e) && (0 <= g || 3 >= g);
        }
    };

    /* work with REST */

    this.requestInfo = function (uin,type) {
        if(type === 'bin') return $http.get("rest/gbdul/organizations/" + uin)
        else return $http.get("rest/gbdfl/persons/" + uin, {params: {infotype: 'short'}});   
    };

    
}]);