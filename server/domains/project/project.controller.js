// Actions methods

// GET '/user/project/["projects", "dashboard"]'
const projects = (req, res) => {
  res.send("🚧 UNDER CONSTRUCTION '/user/project/[projects o dashboard]' 🚧");
};

const forms = (req, res) => {
  res.render('project/addView');
};

// Controlador Home
export default {
  projects,
  forms,
};
