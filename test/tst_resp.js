var fs = require('fs'); 

module.exports = function(request, response){
	setTimeout(function () {
		var data_path ='./test/' + request.params.uin + '.json';
		if(fs.existsSync(data_path)){
			var r = require(data_path);
			response.json(r);
		} else response.status(404).send('Not found');		
	}, 2500);
};