
/**  
 * Module dependencies.  
 */ 
var express  = require('express'); 
var connect = require('connect'); 
var app   = module.exports = express(); 
var port     = process.env.PORT || 8080; 
var cp = require('child_process');
var child = cp.fork('./worker');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);  
var routes = require('./routes');
var socket = require('./routes/socket');
var station = require('config/station');
var stations;


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


// Configuration 
app.use(express.static(__dirname + '/public')); 
app.use(connect.logger('dev')); 
app.use(connect.json()); 
app.use(connect.urlencoded());

// Routes  
  


     // // JSON API
     // app.get('/api/name', api.name);

     // redirect all others to the index (HTML5 history)
     //app.get('*', routes.index);
function setStation(nStations){
  //console.log("Set station /!\\");
  stations = nStations;
  //console.log(JSON.stringify(stations));
	
}
     // Socket.io Communication
    server.listen(8080, "127.0.0.1");
    io.sockets.on('connection', require('./routes/socket'));
     child.on('message', function(m) {
     	console.log("GOGO");
  		// Receive results from child process
  		station.getAll(setStation);
  		io.sockets.emit('send:stations', {
      		stations: stations
  		});
	});
	require('./routes/routes.js')(app);

//app.listen(port);  

console.log('The App runs on port ' + port);

