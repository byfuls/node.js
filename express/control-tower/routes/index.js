var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.json({hi:'hello'});
});

router.post('/', function(req, res, next) {
	const id = req.body.id;
	const password = req.body.password;

	console.log(`[back-inf] loggedIn id: ${id}`);
	console.log(`[back-inf] loggedIn password: ${password}`);

	let result = false;
	if(id === 'admin' && password === 'admin123'){
		result = true;
	}else{
		result = false;
	}

	let returnMessage = {
		result: result
	};
	res.json(returnMessage);
});

module.exports = router;
