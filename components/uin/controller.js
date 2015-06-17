angular.module('egov.ui.uin')
.controller('uinCntrllr', function($scope, $element, $attrs, uinLcl, uinSrvc, $timeout) {

    var hintMsg = uinLcl[$scope.locale].hint, 
        typeText = uinLcl[$scope.locale].idtype;

     if(!$scope.label) 
        if(!$scope.type) $scope.label = uinLcl[$scope.locale].default_title + typeText.other
        else $scope.label = uinLcl[$scope.locale].default_title + typeText[$scope.type];  

    function resetViewState() {
        $scope.state = '';
        $scope.hint = '';
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
                    console.log(data);
                    $scope.state = '';
                    $scope.hint = data.name.firstName +' '+ data.name.middleName +' '+ data.name.lastName;                        
                })
                .error(function (data, status) {
                    $scope.state = 'error';
                    if (status == '404') $scope.hint = "Not found"
                    else scope.hint = "Internal error"    
                });
        } 
    });

});