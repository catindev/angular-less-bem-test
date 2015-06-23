angular.module('declaration').controller('step1Controller', 
	function($rootScope, egovLocale) {

    	$rootScope.debug = true;

        var step1 = this;
        
        step1.uin = { value: '' };

        step1.chnglcl = function () {
        	egovLocale.set('kk');
        };

    }
);