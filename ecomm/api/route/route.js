var infra = require('../infrastructure/infra');

exports.getUnivers = function(req, res){
	var univers = req.params.univers;
	res.send(infra.loadUnivers(univers));
}

exports.getSampleUnivers = function(req, res){
	var univers = req.params.univers;
	res.send(infra.loadSampleUnivers(univers));
}

exports.getCategory = function(req, res){
	var univers = req.params.univers;
	var category = req.params.category;
	res.send(infra.loadCategory(univers, category));
}

exports.getProduct = function(req, res){
	var pid = req.params.id;
	res.send(infra.loadProduct(pid));
}