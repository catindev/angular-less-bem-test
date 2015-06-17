var express = require('express');
var app = express();
app.use(express.static('assets'));

app.use('/', express.static(__dirname));

app.use('/P40.04', express.static(__dirname));

app.get('/P40.04/rest/gbdfl/persons/871005350016', function(request, response){
	response.json({"iin":"871005350016","name":{"firstName":"НИКОЛАЙ","lastName":"КРУЛИКОВСКИЙ","middleName":"ВЯЧЕСЛАВОВИЧ"},"gender":"MALE","dateOfBirth":560368800000,"status":"ALIVE","capable":true,"hasActualDocuments":true})
});

app.listen(3000);

console.info('Static: OK');



