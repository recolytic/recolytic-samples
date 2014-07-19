var express = require('express')
	, path = require('path');

var app = express();

 //configuration

//app.use(express.cookieParser());
//app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'static')));
//app.use(express.favicon(path.join(__dirname , 'favicon.ico'))); 

//start up
var port = process.env.PORT || 5003;
app.listen(port, function() {
	console.log("Ecommerce web server listening on " + port);
});
