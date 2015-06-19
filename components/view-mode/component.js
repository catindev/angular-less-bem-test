angular.module('egov.ui.view_mode', [ 'tenphi.bem' ])

.service('egovViewSettings', [ function () {

/*    
    device:      desktop | pod
    font_size:   desktop | desktop-big | pod | pod-big
    contrast:    light | dark
*/
    
    var device = 'desktop',
        font_size = '',
        contrast = '',
        devices = [ 'pod', 'desktop' ];

    function init() {
    };

    init();
}])

.directive('viewMode', ['bemConfig', 'egovViewSettings', function (bemConfig, egovViewSettings) {
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
}])

.run([ '$rootScope', 'egovViewSettings', function($rootScope, egovViewSettings){ }]);