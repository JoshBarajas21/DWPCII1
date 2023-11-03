// Actions methods

// GET '/user/project/["projects", "dashboard"]'
const showdasboard = (req, res) => {
  res.send("🚧 UNDER CONSTRUCTION '/user/project/[projects o dashboard]' 🚧");
};

const add = (req, res) => {
  res.render('project/addView');
};

const addPost = (req, res) => {
  // Extrayendo la informacion
  // del formulario
  const { name, description } = req.body;
  // Regresando al cliente la información recabada
  res.status(200).json({
    name,
    description,
  });
};

// Controlador Home
export default {
  showdasboard,
  add,
  addPost,
};
