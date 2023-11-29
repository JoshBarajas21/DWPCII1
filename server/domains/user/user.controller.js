// Importing Logs
import log from '../../config/winston';
// Importing model
import User from './user.model';

// Actions methods

// GET '/user/login'
const login = (req, res) => {
  // Sirve el formulario de login
  log.info('Se entrega el formulario login');
  res.render('user/login');
};

// GET '/user/logout'
const logout = (req, res) => {
  res.send("🚧 UNDER CONSTRUCTION '/user/logout' 🚧");
};

// GET '/user/register'
const register = (req, res) => {
  log.info('Se entrega formulario de registro');
  res.render('user/register');
};

// POST '/user/register'
const registerPost = async (req, res) => {
  const { validData: userFormData, errorData } = req;
  log.info('Se procesa formulario de registro');
  // Verificando si hay errores
  if (errorData) {
    return res.json(errorData);
  }
  // En caso de no haber errores, se creal al usuario
  try {
    // 1. Se crea una nstancia del modelo User
    // mediante la función create del modelo
    const user = await User.create(userFormData);
    log.info(`Usuario creado: ${JSON.stringify(user)}`);
    // 3. Se contesta al cliente con el usuario creado
    return res.status(200).json(user.toJSON());
  } catch (error) {
    log.error(error);
    return res.json({
      message: error.message,
      name: error.name,
      errors: error.errors,
    });
  }
};

// Controlador Home
export default {
  login,
  logout,
  register,
  registerPost,
};
