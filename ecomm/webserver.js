var express = require('express')
  , path = require('path')
  , route = require('./api/route/route.js');


 var app = express();

 //configuration
app.configure(function(){
	//app.use(express.cookieParser());
	//app.use(express.bodyParser());
	app.use(express.static(path.join(__dirname, 'static')));
	app.use(express.favicon(path.join(__dirname , 'static/favicon.ico'))); 
});

app.get("/api/sampleUnivers/:univers",route.getSampleUnivers);
app.get("/api/univers/:univers",route.getUnivers);
app.get("/api/catalog/:univers/:category",route.getCategory);
app.get("/api/product/:id",route.getProduct);

//start up
var port = process.env.PORT || 5004;
app.listen(port, function() {
  console.log("Listening on " + port);
});
