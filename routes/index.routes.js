const {index, search} = require('./../controllers/home.controller')

var router = require("express").Router();


router.get('/', index)
router.get('/index', index)
router.get('/home', index)
router.get('/search', search)

module.exports = router;
