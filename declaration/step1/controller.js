angular.module('declaration').controller('step1Controller', 
	function($rootScope) {

    	$rootScope.debug = true;

        var step1 = this;
        
        step1.model = { value: '', type: 'self' };
        

        step1.chnglcl = function (lang) {
        	$rootScope.$emit('locale.change', lang);
        };

    }
);