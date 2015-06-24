angular.module('egov.ui.uin').controller('uinController', 
    function($scope, $element, $attrs, uinService, $rootScope) {

    var idType;

    if($scope.type && ($scope.type === 'bin' || $scope.type === 'iin')) uinService.type = $scope.type
    else $scope.type = 'other';    

    function resetViewState() {
        $scope.state = '';
        $scope.hint = '';
        $scope.info = '';
    };

    function errorState() {
        $scope.state = 'error';
        $scope.hint = 'egovUin.hint.invalid'; 
        return;
    };

    $scope.$watch('value', function(newValue, oldValue) {
        resetViewState();
        idType = uinService.getType(newValue);

        if(newValue && newValue.length > 12) $scope.value = oldValue;

        if(newValue && newValue.length < 12 && !uinService.isNums(newValue)) {
                $scope.state = 'warning';
                $scope.hint = 'egovUin.hint.invalid_chars';
                return;
        }   

        if(newValue.length === 12) {
            if(!uinService.valid(newValue, idType)) return errorState(idType);
            $scope.state = 'disabled';
            $scope.hint = 'egovUin.hint.requesting';
            uinService.requestInfo(newValue, idType);
        } 
    });

    $rootScope.$on( "rest.response:egov.ui.uin:success", 
        function(event, response) { 
            if(idType === 'iin') $scope.info  = response.data.name.firstName +' '+ response.data.name.middleName +' '+ response.data.name.lastName;
            if(idType === 'bin') $scope.info  = response.data.fullName;    
            $scope.state = '';
            $scope.hint = $scope.info ; 
        });

    $rootScope.$on( "rest.response:egov.ui.uin:error", 
        function(event, response) { 
            $scope.state = 'error';
            if (response.status === 404) $scope.hint = 'egovUin.hint.not_found'
            else $scope.hint = 'egovUin.hint.internal_error'  
        });     

});