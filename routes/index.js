var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/student';
var resultArray = [];

/* GET home page. */
router.get('/', function(req, res, next) {
		mongo.connect(url , function(err , db){
		assert.equal(null , err);
		var cursor = db.collection('info').find();
		cursor.forEach(function(doc , error){
			assert.equal(null , error);
			resultArray.push(doc);
		} , function(error , result){
			assert.equal(null , error);
			db.close();
			res.render('index' , { items : resultArray });
  			resultArray = [];
		});
	});
});


router.post('/insert' , function(req , res , next){
	var item = {
		name: req.body.name,
		roll: req.body.roll,
		age: req.body.age,
		class: req.body.class,
		marks: req.body.marks
	};
	mongo.connect(url , function(err , db){
		assert.equal(null , err);
		db.collection('info').insertOne(item , function(error , result){
			assert.equal(null , error);
			db.close();
			res.redirect('/');
		});
	});
	
});

module.exports = router;
