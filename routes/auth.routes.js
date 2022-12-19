const { Router } = require("express");
const { check } = require("express-validator");
const {
  login,
  renewToken,
  crearUsuario
} = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password es obligatorio, minimo 6 caracteres máximo 20"
    )
      .notEmpty()
      .isLength({ min: 6, max: 20 }),
    validarCampos,
  ],

  login
);

router.post(
  "/new",
  [
    check("name", "Campo nombre es requerido").notEmpty(),
    check("email", "Campo email es requerido").isEmail(),
    check(
      "password",
      "Campo password es requerido, minimo 6 caracteres, máximo 20"
    )
      .notEmpty()
      .isLength({ min: 6, max: 20 }),
    validarCampos,
  ],
  crearUsuario
);

router.get("/renew", [validarJWT], renewToken);

module.exports = router;
