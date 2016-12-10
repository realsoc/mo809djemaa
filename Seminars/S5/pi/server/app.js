// Setup
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var path = require('path');
/*var session = require('express-session');
var cookieParser = require('cookie-parser')*/
app.set('views', __dirname + '/public/views');
app.set('view engine', 'jade');

// Configuration 
/*app.use( cookieParser() );
app.use(session({
	secret : 'ACHOQUETEMPROBLEMANAO',
	resave : true,
	saveUnitialized : true
}));*/ 
app.use(express.static(path.join(__dirname+'/public')));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// Routes
require('./routes/routes.js')(app);
// Listen 
app.listen(8080);
console.log("App listening on port 8080");
