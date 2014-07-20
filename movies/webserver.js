var express = require('express')
  , path = require('path');


 var app = express();

 //configuration
app.configure(function(){
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.static(path.join(__dirname, 'static')));
	app.use(express.favicon(path.join(__dirname , 'static/favicon.ico'))); 
});

//start up
var port = process.env.PORT || 5005;
app.listen(port, function() {
  console.log("Listening on " + port);
});
