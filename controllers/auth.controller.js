const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //varificar email
    const usuarioDB = await User.findOne({ email });

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        message: "Credenciales no validas",
      });
    }

    //verificar contraseña

    const validPassword = bcrypt.compareSync(password, usuarioDB.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: true,
        message: "credenciales de usuario no validas",
      });
    }

    //generar token

    const token = await generarJWT(
      usuarioDB.id,
      usuarioDB.nombre,
      usuarioDB.email
    );

    return res.status(200).json({
      ok: true,
      message: "Bienvenido",
      nombre: usuarioDB.nombre,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error inesperado",
    });
  }
};

const crearUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    //validar que no exista usuario con el mismo email
    let usuario = await User.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        message: "El email ya se encuentra registrado en la base de datos.",
      });
    }

    usuario = new User(req.body);

    //encriptar contraseña

    const salt = bcrypt.genSaltSync();

    usuario.password = bcrypt.hashSync(password, salt);

    //generar el JWT

    const token = await generarJWT(usuario.id, usuario.nombre, usuario.email);

    //crear usuario en la BD
    await usuario.save();

    return res.status(200).json({
      ok: true,
      message: "Usuario creado exitosamente",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error inesperado... revisar logs",
    });
  }
};


const renewToken = async (req, res) => {
  
  const uid = req.uid;
  const nombre = req.nombre;
  const email = req.email;
  //generar elJWT

  const usuario = await User.findById(uid);


  const token = await generarJWT(uid, nombre, email);
  res.json({
    ok: true,
    uid,
    token,
    usuario,
  });
};

module.exports = {
  login,
  crearUsuario,
  renewToken,
};