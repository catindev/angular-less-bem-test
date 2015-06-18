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