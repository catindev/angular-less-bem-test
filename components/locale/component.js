angular.module('egov.ui.i18n',[ 'ngCookies', 'lodash' ])

.service('egovLocale', 
    function ($rootScope, $cookies) {

        var current = '',
            locales = [ 'kk', 'ru', 'en' ],
            cookies = [ 'locale', 'egovLang' ],
            service = this;

        this.get = function (type) { 
            if(type && type === "all") return locales 
            else return current; 
        };
        
        this.set = function (lang) { 
            if (!lang || locales.indexOf(lang) === -1 || lang === 'kz') lang = 'kk';
            lang = lang.toLowerCase();
            if (lang === current) return;
            current = lang;
            $rootScope.$emit('locale.current', lang);
        };

        $rootScope.$on("locale.change", function(event, lang) {
            service.set(lang); 
            $rootScope.$emit('locale.current', lang);                    
        }); 

        if($cookies.get('egovLang')) service.set($cookies.egovLang);        
    }
)

.service('egovTranslate', function (egovLocale, $rootScope, _, i18n_ru, i18n_kk, i18n_en) {

    var self = this,
        locales = { ru: i18n_ru || {}, kk: i18n_kk || {}, en: i18n_en || {} },
        aliases = { };

    this.translate = function (key) {
        if ( !key ) return '';
        
        var ref = locales[ egovLocale.get() ];

        _.each(key.split('.'), function (prop) { if ( ref ) ref = ref[prop]; });

        if ( !_.isString(ref) ) return key;

        if ( ref.indexOf('{') != -1 && ref.indexOf('}') != -1 ) {
            var alias = ref.substring(ref.lastIndexOf('{')+1,ref.lastIndexOf('}')), replace;
            
            if( _.isFunction( aliases[alias] ) ) replace = self.translate( aliases[alias]() )
            else replace = self.translate( aliases[alias] );    
            
            ref = ref.replace( '{' + alias + '}', replace );
        }

        return ref;
    };

    this.alias = function (name, key) { aliases[name] = key; }

    $rootScope.$on("locale.alias", function(event, options) {
        console.info('egov.ui.i18n: new alias', options.name);
        self.alias(options.name, options.key);                  
    }); 

})

.filter('translate', function(egovTranslate) {
    return function(input) {
        return egovTranslate.translate(input);
    };
})

.run(function($rootScope, egovLocale, egovTranslate){
    egovLocale.set('ru');
    console.info('egov.ui.i18n is working');
});