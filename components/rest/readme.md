# egov.ui.rest

Pub/sub-модуль отправки запросов на бэкенд. Обёртка над `$http`. Зависит от `$rootScope`. 

### Подключение

Входит в базовый набор модулей приложения-заявки. Для отдельного использования подключить в зависимости главного модуля `egov.ui.rest`. 

### Как отправить запрос

`$rootScope.$emit('rest.request', settings);`, где `settings` это объект с ключами:

* `module` - название модуля или шага, отправляющего запрос. По умолчанию `declaration`;
* `method` - HTTP-метод;
* `uri` - URI REST-метода. Без `/rest/`. Пример: `gbdfl/persons/871005350016`; 
* `params` - параметры запроса;
* `headers` - заголовки запроса;

### Как получить ответ

Подписаться на ответ: `$rootScope.$on( "rest.response:module:type", function(event, response) { });`, где:

* `module` - название модуля или шага ожидающего ответ;
* `type` - тип ответа: `success` или `error`;

Объект `response` содержит набор свойств как в коллбеке модуля `$http`: data, status, headers, config.

### Roadmap

* Функция заглушек для рестов для прототипирования; 



