angular.module('egov.ui.rest',[ ])
.factory('egovRest', 
    function ($rootScope, $http) {

        function log(type, content){
            if ($rootScope.debug) console[type](content);
        }

        function _defaults(options) {
            var uri = options.uri || options.url || '';
            return {
                module: options.module || 'declaration',
                method: options.method || 'GET',
                url: '/rest/' + uri,
                params: options.params || {},
                headers: options.headers || {}
            };            
        };

        function _response(module, type, data, status, headers, config) {
            $rootScope.$emit('rest.response:' + module + ':' + type, {
                data: data,
                status: status,
                headers: headers,
                config: config
            });
        };

        $rootScope.$on("rest.request", function(event, options) { 
            options = _defaults(options);
            log('info', 'egov.ui.rest: request from ' + options.module );
            $http(options)
                .success(function (data, status, headers, config) {
                    log('info', 'egov.ui.rest: success for ' + options.module );
                    return _response( options.module, 'success', data, status, headers, config );  
                })
                .error(function (data, status, headers, config) {
                    log('error', 'egov.ui.rest: error for ' + options.module );
                    return _response( options.module, 'error', data, status, headers, config ); 
                });                      
        }); 

        return { };
    }
)
.run([ '$rootScope', 'egovRest', function($rootScope, egovRest){
    console.info('egov.ui.rest is working');
}]);