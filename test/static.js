
var express = require('express'),
	app 	= express(),
	json	= require('./json.js');

app.use(express.static('assets'));

//app.get('/', hello);

app.get('/rest/gbdfl/persons/:uin', json);
app.get('/rest/gbdul/organizations/:uin', json);

app.get('/*', express.static( __dirname + '/../' ));

app.listen(3000);

console.info('Declaration Sandbox Test Server');



