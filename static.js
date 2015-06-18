
var express = require('express');
var app = express();
var test_resp = require('./test/tst_resp.js');

app.use(express.static('assets'));

app.use('/', express.static(__dirname));
app.use('/P:app', express.static(__dirname));

app.get('/P:app/rest/gbdfl/persons/:uin', test_resp);
app.get('/P:app/rest/gbdul/organizations/:uin', test_resp);

app.listen(3000);

console.info('Static: OK');



