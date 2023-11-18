// Actions methods
import log from '../../config/winston';

// Importando el modelo
import ProjectModel from './project.model';

// GET '/user/project/["projects", "dashboard"]'
const showdasboard = (req, res) => {
  res.send("🚧 UNDER CONSTRUCTION '/user/project/[projects o dashboard]' 🚧");
};

const add = (req, res) => {
  res.render('project/addView');
};

const addPost = async (req, res) => {
  // Rescatando la info del formulario
  const { errorData: validationError } = req;
  // En caso de haber error
  // se le informa al cliente
  if (validationError) {
    log.info('Se entrega al cliente error de validación de add Project');
    const { value: project } = validationError;
    const errorModel = validationError.inner.reduce((prev, curr) => {
      const workinPrev = prev;
      workinPrev[`${curr.path}`] = curr.message;
      return workinPrev;
    }, {});
    return res.status(422).render('project/addView', { project, errorModel });
  }
  // En caso de que pase la validació se desestructura la información
  // de la peticion
  const { validData: project } = req;
  try {
    // Creando la instancia de un documento con los valores de 'project'
    const savedProject = await ProjectModel.create(project);
    // Se contesta la información del proyecto al cliente
    log.info('Se entrega al cliente información del proyecto cargado');
    return res.status(200).json(savedProject);
  } catch (error) {
    log.error(
      'ln 53 project.controller: Error al guardar proyecto en la base de datos',
    );
    return res.status(500).json(error);
  }
};

// Controlador Home
export default {
  showdasboard,
  add,
  addPost,
};
