angular.module('egov.ui.core',['tenphi.bem'])


.service('egovViewSettings', [ function () {

    var settings = this;

/*    
    device:      desktop | pod
    font_size:   desktop | desktop-big | pod | pod-big
    contrast:    light | dark
*/
    
    var device = 'desktop',
        font_size = '',
        contrast = '',
        devices = [ 'pod', 'desktop' ];

    this.device = {
        get: function(){ return device; },
        set: function(val){
            if(val in devices) device = val
            else return false    
        }
    }

    this.font_size = {
        get: function(){ return font_size; },
        set: function(val){ font_size = val; }
    }    

    function initialize() {
        if ($settings.isPod()) {
            me.setDevice('pod');
        } else {
            me.setDevice('pep');
        }
    }

    initialize();
}]);