const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/calendar.controller");
const isDate = require("../helpers/isDate");



const router = Router();
router.use(validarJWT);

router.get('/',getEvents);

router.post('/',
[
    check("title","Campo requerdo").notEmpty(),
    check("start","Fecha no valida").custom(isDate),
    check("end","Fecha no valida").custom(isDate),
    validarCampos
],createEvent);

router.put('/',updateEvent);

router.delete('/',deleteEvent);

module.exports = router;