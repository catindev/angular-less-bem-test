angular.module('egov.ui.common',['tenphi.bem'])
.service('egovSettings', [ function () {

    var settings = this;

/*    
    device:      desktop | pod
    font_size:   desktop | desktop-big | pod | pod-big
    contrast:    light | dark
*/
    
    var device = 'desktop',
        font_size = 'desktop',
        contrast = '';

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
}]);