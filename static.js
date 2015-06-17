
var express = require('express');
var app = express();
var test_resp = require('./tst_resp.js');

app.use(express.static('assets'));

app.use('/', express.static(__dirname));
app.use('/P40.04', express.static(__dirname));

/* GBDFL responses */
app.get('/P40.04/rest/gbdfl/persons/:uin', test_resp);

app.listen(3000);

console.info('Static: OK');



