var https = require('https');
var requestDone = true;
var isNew = true;
var crypto = require('crypto'); 
var station = require('config/station');
//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: 'api.jcdecaux.com',
  path: '/vls/v1/stations?apiKey=a3730260009f0e790b390985baf593e33f13dc5a&contract=Paris'
};
var lastHash ="";

function putInDB(str){
	var i;
	var all = JSON.parse(str);
	var temp;
	var objToDB;
	for(i=0;i<all.length;i++){
		temp = all[i];
		objToDB = {
			"name"	:temp.name,
			"number":temp.number,
			"lat"	:temp.position.lat,
			"lon"	:temp.position.lng,
			"total"	:temp.bike_stands,
			"free"	:temp.available_bike_stands,
			"bike" 	:temp.available_bikes,
			"date" 	:temp.last_update,
			"bonus"	:temp.bonus
		};
		//console.log(objToDB.name);
		station.updateStation(objToDB,function (found) {             
			//console.log(found);
		});
	}
}
function isHashDifferent(hash){
	if(hash.localeCompare(lastHash) == 0){
		return false;
	}else{
		return true;
	}
}
function callback(response) {
  	var str = '';
  	var hash = '';
  	//another chunk of data has been recieved, so append it to `str`
	response.on('data', function (chunk) {
		str += chunk;
    	//console.log("Received chunk");
  	});

  //the whole response has been recieved, so we just print it out here
  	response.on('end', function () {
    	//console.log("DONE");
		hash = crypto.createHash('sha512').update(str).digest("hex");
		if(isHashDifferent(hash)){
			//console.log("new Hash");
			putInDB(str);
			lastHash = hash;
			process.send("update");
		}else{
			// console.log("old hash");
		}
  		requestDone = true;
  	});
}
var recursive = function () {
	// console.log("Start child");
	// process.send("Hello");
	if(requestDone){
		requestDone = false;
		console.log("Starting new request");
		https.request(options, callback).end();
		//console.log("endOfLaço");
	}else{
		// console.log("Waiting for response");
	}
    setTimeout(recursive,400);
}
recursive();
