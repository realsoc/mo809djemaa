var station = require('config/station');
var socket;
module.exports = function (nSocket) {
	socket = nSocket;


}


	function sendStations(stations){
  	console.log("send stations");
		io.sockets.emit('send:stations', {
      		stations: stations
  		});
	}
  exports.getAndSendStations = function(callback) {
  	console.log("get and send stations");
  	station.getAll(sendStations);
  }