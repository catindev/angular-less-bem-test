angular.module('egov.ui.uin')
.controller('uinCntrllr', function($scope, $element, $attrs, uinLcl, uinSrvc) {

    var hintMsg = uinLcl[$scope.locale].hint, 
        typeText = uinLcl[$scope.locale].idtype;

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
            if(!uinSrvc.valid(newValue)) return errorState(idType);

            $scope.state = 'disabled';
            $scope.hint = hintMsg.requesting;

            /* connct to rest here */
        } 
    });

});