var express = require('express');
var app = express();
var gbdfl_persons = require('./test/gbdfl_persons.json');

app.use(express.static('assets'));
app.use('/', express.static(__dirname));

app.use('/P40.04', express.static(__dirname));

app.get('/P40.04/rest/gbdfl/persons/871005350016', function(request, response){
	setTimeout(function () {
		response.json(gbdfl_persons);
	}, 2500);
});

app.listen(3000);

console.info('Static: OK');



