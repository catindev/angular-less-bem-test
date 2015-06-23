angular.module('egov.ui.i18n',[ 'ngCookies', 'lodash' ])

.factory('egovLocale', 
    function ($rootScope, $cookies) {

        var current = '',
            locales = [ 'kk', 'ru', 'en' ],
            cookies = [ 'locale', 'egovLang' ],
            service = {};

        service.get = function (type) { 
            if(type && type === "all") return locales 
            else return current; 
        };
        
        service.set = function (lang) { 
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

        return service;
    }
)

.service('egovTranslate', function (egovLocale, $rootScope, _, i18n_ru, i18n_kk, i18n_en) {

    var self = this,
        locales = { ru: i18n_ru || {}, kk: i18n_kk || {}, en: i18n_en || {} },
        linkedScopes = {},
        aliases = {};

    this.translate = function (key, scope) {
        if (!key) return "";
        
        var ref = locales[egovLocale.get()];

        _.each(key.split('.'), function (prop) {
            //console.log();
            if (ref != null) ref = ref[prop];
        });

        if (!ref || _.isObject(ref)) return key;

        if (ref.indexOf('{') != -1 && ref.indexOf('}') != -1 && !aliases[scope.$id] && !linkedScopes[scope.$id]) {
            var iterScope = scope;
            while (iterScope.$id != '001') {
                var linkScopeId = _.find(_.keys(aliases), function (aliasScopeId) {
                    return iterScope.$id == aliasScopeId;
                });
                if (!linkScopeId) {
                    iterScope = iterScope.$parent;
                } else {
                    linkedScopes[scope.$id] = linkScopeId;
                    break;
                }
            }
        }

        if (scope && (aliases[scope.$id] || aliases[linkedScopes[scope.$id]])) {
            var aliasGroup = aliases[scope.$id] || aliases[linkedScopes[scope.$id]];
            _.each(_.keys(aliasGroup), function (aliasName) {
                if (ref.indexOf('{' + aliasName + '}') != -1) {
                    ref = ref.replaceAll('{' + aliasName + '}', self.translate(aliasGroup[aliasName]()));
                }
            });
        }
        return ref;
    };

    this.alias = function (scope, aliasName, aliasKeyFunction) {
        aliases[scope.$id] = aliases[scope.$id] || {};
        aliases[scope.$id][aliasName] = aliasKeyFunction;
    };

    self.setLocales = function (localizations) {
        _(localizations).forEach(function(localization) {
           setLocale(localization);
        }).value();         
    };

    self.setLocale  = function (localization) {
        for( lang in locales ) {
            locales[lang] = angular.merge(locales[lang], localization[lang], true);
        }   
    };

    $rootScope.$on("locale.set", function(event, options) {
        console.info('egov.ui.i18n: set localization for', options.module);
        setLocale(options.localization);                  
    }); 

    $rootScope.$on("locale.alias", function(event, options) {
        console.info('egov.ui.i18n: new alias', options.name);
        self.alias(options.scope, options.name, options.fn);                  
    }); 

    return self;

})

.filter('translate', function(egovTranslate) {
    return function(input) {
        return egovTranslate.translate(input, this);
    };
})

.run(function($rootScope, egovLocale, egovTranslate){
    egovLocale.set('ru');
    console.info('egov.ui.i18n is working');
});