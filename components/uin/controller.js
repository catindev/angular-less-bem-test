angular.module('egov.ui.uin')
.controller('uinCntrllr', function($scope, $element, $attrs, uinLcl, uinSrvc) {

    var uin = this,
        hintMsg = uinLcl[$scope.locale].hint, 
        typeText = uinLcl[$scope.locale].idtype;

    if(!$scope.title) { // default title
        if(!$scope.type) $scope.title = uinLcl[$scope.locale].default_title + typeText.other
        else $scope.title = uinLcl[$scope.locale].default_title + typeText[$scope.type];  
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
        var idType = uinSrvc.getType(newValue);

        if(newValue && newValue.length > 12) $scope.value = oldValue;

        if(newValue && newValue.length < 12 && !uinSrvc.isNums(newValue)) {
                $scope.state = 'warning';
                $scope.hint = typeText[idType] + hintMsg.invalid_chars;
                return;
        }   

        if(newValue.length === 12){
            if(!uinSrvc.valid(newValue, idType)) return errorState(idType);

            $scope.state = 'disabled';
            $scope.hint = hintMsg.requesting;

            uinSrvc.requestInfo(newValue, idType)
                .success(function (data) {
                    if(idType === 'iin') $scope.info  = data.name.firstName +' '+ data.name.middleName +' '+ data.name.lastName
                    if(idType === 'bin') $scope.info  = data.fullName;    
                    $scope.state = '';
                    $scope.hint = $scope.info ;                       
                })
                .error(function (data, status) {
                    $scope.state = 'error';
                    if (status == '404') $scope.hint = typeText[idType] + hintMsg.not_found;
                    else $scope.hint = hintMsg.internal_error;    
                });
        } 
    });

});