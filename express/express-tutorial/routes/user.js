var express = require('express');
var router = express.Router();

router.get('/', (req, res)=>{
    res.send('[user] hello world~!!!');
});

router.post('/user', (req, res)=>{
    console.log(`[user] ${JSON.stringify(req.body, null, 2)}`);
    res.json({
        success:true,
        user: req.body.username
    });
});

router.put('/', (req, res)=>{
    res.status(400).json({message : '[user] hey, you. bad request!'});
});
router.delete('/', (req, res)=>{
    res.send('[user] received a DELETE request');
});

module.exports = router;