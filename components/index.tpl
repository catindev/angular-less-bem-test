<!doctype html>
<html lang="ru" ng-app="declaration">
<head>
<meta name="app" content="<app/>">
<meta name="version" content="<version/>">
<meta name="build" content="<build/>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title ng-bind="'egov:' + dCtrl.locale['ru'].title"></title>
<css/>
</head>
<body>

    <div block="b-layout">
        <div class="header"></div>

        <div class="wrapper">
            <div block="b-declaration" ng-controller="declarationCntrllr as dCtrl">
                <div elem="header">
                    <h1 elem="title" ng-bind="dCtrl.locale['ru'].title"></h1>
                </div>           
                <div ng-view></div>
            </div>
        </div>

        <div class="footer"></div>   
    </div>
 
</body>
<javascript/>
</html>