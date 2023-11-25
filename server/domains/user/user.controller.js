// Importing Logs
import log from '../../config/winston';
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

// Controlador Home
export default {
  login,
  logout,
  register,
};
