angular.module('egov.ui.uin')
.service('uinSrvc', ['$http', function ($http) {

    var service = this;

    this.type = '';

    this.resetModel  = function(){
        service.model.value = '';
        service.model.shortInfo = '';
    };

    this.getType = function(value) {
        if (service.type) return service.type;
        if( value[4] >= 4 && value[4] <= 6 ) return 'bin';
        if( value[4] >= 0 && value[4] <= 3 ) return 'iin';
        return 'other';
    }

    this.isNums = function(value){
        if(!/^[0-9]+$/.test(value)) return false;
        return true;
    };

    this.valid = function (value,type) {
        if (!value || 12 != value.length || !/^\d*$/.test(value) || !service.isNums(value)) return !1;
        var k = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 
            l = [3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2], 
            d = [], b = 0, m = parseInt(value[0] + value[1]), 
            f = parseInt(value[2] + value[3]), e = value[4], g = value[5];
            parseInt(value.substring(6, 10));
            parseInt(value[6]);
        for (var c = 0;12 > c;c++) d[c] = parseInt(value[c]), 11 > c && (b += d[c] * k[c]);
        b %= 11;
        if (10 === b) {
            for (c = b = 0;11 > c;c++) b += d[c] * l[c];
            b %= 11;
        }
        if ("iin" === type) return b == d[11];
        if ("bin" === type) {
            return b == d[11] && 0 <= m && 1 <= f && 12 >= f && (4 == e || 5 == e || 6 == e) && (0 <= g || 3 >= g);
        }
    }; 

    this.requestInfo = function (uin,type) {
        if(type === 'bin') return $http.get("rest/gbdul/organizations/" + uin)
        else return $http.get("rest/gbdfl/persons/" + uin, {params: {infotype: 'short'}});   
    };

}]);