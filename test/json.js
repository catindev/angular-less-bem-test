var fs = require('fs'); 

module.exports = function(request, response){
	setTimeout(function () {
		console.log("requesting ", request.params.uin);
		var data_path =  __dirname + '/' + request.params.uin + '.json';
		if(fs.existsSync(data_path)){
			var r = require(data_path);
			response.json(r);
		} else response.status(404).send('Not found');		
	}, 2500);
};