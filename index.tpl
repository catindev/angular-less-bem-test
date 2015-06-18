<!doctype html>
<html lang="ru" ng-app="declaration">
<head>
    <meta name="build" content="<% build %>">
    <meta name="version" content="<% javascript %>">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <title ng-bind="'egov:' + dCtrl.locale['ru'].title"></title>
    <link rel="stylesheet" type="text/css" href="assets/vendors/normalize.css/normalize.css">
    <link rel="stylesheet" type="text/css" href="assets/styles.css">
    <link rel="stylesheet" type="text/css" href="assets/fonts/fonts.css">
    <link rel="stylesheet" type="text/css" href="assets/build.css">
    <% css %>
</head>
<body>

    <div class="layout">
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
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
    <!-- <script src="assets/vendors/angular/angular.min.js"></script> -->
    <script src="assets/vendors/angular-route/angular-route.min.js"></script>
    <script src="assets/vendors/angular-bem/angular-bem.js"></script>
    <script src="assets/build.js"></script>
    <% javascript %>
</html>