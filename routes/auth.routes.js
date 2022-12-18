const { Router } = require("express");
const { check } = require("express-validator");


const router = Router();

router.get('/',[],(req,res) =>{console.log('prueba')});

module.exports = router;