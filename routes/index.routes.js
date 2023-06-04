const {index} = require('./../controllers/home.controller')

var router = require("express").Router();


router.get('/', index)
router.get('/index', index)
router.get('/home', index)

module.exports = router;
