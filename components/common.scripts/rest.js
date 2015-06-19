angular.module('egov.ui.rest',[]).factory('egovRest', 
    function ($rootScope, $http, $timeout) {

        $rootScope.$on("rest.request", function(event, data) { 
            console.log("rest request from", data.publisher );
            $timeout(function() {
                $rootScope.$emit('rest.response:' + data.publisher, 'msg');
            }, 1500);            
        }); 

        return { };
    }
);