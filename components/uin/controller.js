angular.module('egov.ui.uin')
.controller('uinCntrllr', function($scope, $element, $attrs, uinLcl, uinSrvc, $rootScope) {

    var hintMsg = uinLcl[$scope.locale].hint, 
        typeText = uinLcl[$scope.locale].idtype,
        idType;

    if(!$scope.uin_title) { 
        if(!$scope.type) $scope.uin_title = uinLcl[$scope.locale].default_title + typeText.other
        else $scope.uin_title = uinLcl[$scope.locale].default_title + typeText[$scope.type];  
    }

    if($scope.type && ($scope.type === 'bin' || $scope.type === 'iin')) uinSrvc.type = $scope.type;

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
        idType = uinSrvc.getType(newValue);

        if(newValue && newValue.length > 12) $scope.value = oldValue;

        if(newValue && newValue.length < 12 && !uinSrvc.isNums(newValue)) {
                $scope.state = 'warning';
                $scope.hint = typeText[idType] + hintMsg.invalid_chars;
                return;
        }   

        if(newValue.length === 12) {
            if(!uinSrvc.valid(newValue, idType)) return errorState(idType);

            $scope.state = 'disabled';
            $scope.hint = hintMsg.requesting;

            uinSrvc.requestInfo(newValue, idType);
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
            if (response.status === 404) $scope.hint = typeText[idType] + hintMsg.not_found;
            else $scope.hint = hintMsg.internal_error;    
        });     

});