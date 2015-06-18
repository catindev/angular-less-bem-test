
var express = require('express');
var app = express();
var test_resp = require('./test/tst_resp.js');

app.use(express.static('assets'));

app.use('/', express.static(__dirname));
app.use('/P40.04', express.static(__dirname));

app.get('/P40.04/rest/gbdfl/persons/:uin', test_resp);
app.get('/P40.04/rest/gbdul/organizations/:uin', test_resp);

app.listen(3000);

console.info('Static: OK');



