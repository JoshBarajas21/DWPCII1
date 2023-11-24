// Actions methods
import log from '../../config/winston';

// Importando el modelo
import ProjectModel from './project.model';

// GET "/project/edit/:id"
const edit = async (req, res) => {
  // Se extrae el ide de los parámetros
  const { id } = req.params;
  // Buscando en la base de datos
  try {
    log.info(`Se inicia la busqueda del proyecto con el id: ${id}`);
    const project = await ProjectModel.findOne({ _id: id }).lean().exec();
    if (project === null) {
      log.info(`No se encontró el proyecto con el id: ${id}`);
      return res
        .status(404)
        .json({ fail: `no se encontro el proyecto con el id: ${id}` });
    }
    // Se manda a renderizar la vista de edicion
    // res.render('project/editView', project);
    log.info(`Proyecto encontrado con el id: ${id}`);
    return res.render('project/editView', { project });
  } catch (error) {
    log.error('Ocurre un error en: metodo "error" de project.controller');
    return res.status(500).json(error);
  }
};

// PUT "/project/edit/:id"
const editPut = async (req, res) => {
  const { id } = req.params;
  // Rescatando la info del formulario
  const { errorData: validationError } = req;
  // En caso de haber error
  // se le informa al cliente
  if (validationError) {
    log.info(`Error de validación del proyecto con id: ${id}`);
    // Se desestructuran los datos de validación
    const { value: project } = validationError;
    // Se extraen los campos que fallaron en la validación
    const errorModel = validationError.inner.reduce((prev, curr) => {
      // Creando una variable temporal para
      // evitar el error "no-param-reassing"
      const workingPrev = prev;
      workingPrev[`${curr.path}`] = curr.message;
      return workingPrev;
    }, {});
    return res.status(422).render('project/editView', { project, errorModel });
  }
  // Si no hay error
  const project = await ProjectModel.findOne({ _id: id });
  if (project === null) {
    log.info(`No se encontro documento para actualizar con id: ${id}`);
    return res
      .status(404)
      .send(`No se encontro documento para actualizar con id: ${id}`);
  }
  // En caso de encontrarse el documento se actualizan los datos
  const { validData: newProject } = req;
  project.name = newProject.name;
  project.description = newProject.description;
  try {
    // Se salvan los cambios
    log.info(`Actualizando proyecto con id: ${id}`);
    await project.save();
    // Generando mensaje FLASH
    req.flash('successMessage', 'Proyecto editado con éxito');
    return res.redirect(`/project/edit/${id}`);
  } catch (error) {
    log.error(`Error al actualizar proyecto con id: ${id}`);
    return res.status(500).json(error);
  }
};

// GET '/user/project/["projects", "dashboard"]'
const showdashboard = async (req, res) => {
  // Consultado todos los proyectos
  const projects = await ProjectModel.find({}).lean().exec();
  // Enviando los proyectos al cliente en JSON
  res.render('project/dashboardView', { projects });
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
    // Creando la instancia de un documento
    // con los valores de 'project'
    const savedProject = await ProjectModel.create(project);
    // Se informa al cliente que se guardo el proyecto
    log.info(`Se carga proyecto ${savedProject}`);
    // Se registra en el log el redireccionamiento
    log.info('Se redirecciona el sistema a /project');
    // Agregando mensaje flash
    req.flash('successMessage', 'Proyecto agregado con exito');
    // Se redirecciona el sistema a la ruta '/project'
    return res.redirect('/project/dashboard');
  } catch (error) {
    log.error(
      'ln 53 project.controller: Error al guardar proyecto en la base de datos',
    );
    return res.status(500).json(error);
  }
};

// DELETE "/project/:id"
const deleteProject = async (req, res) => {
  // Extrayendo el id de los parámetros
  const { id } = req.params;
  // Usando el modelo para borrar el proyecto
  try {
    const result = await ProjectModel.findByIdAndRemove(id);
    // Aregando mensaje flash
    req.flash('successMessage', 'Proyecto borrado con Exito');
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controlador Home
export default {
  showdashboard,
  add,
  addPost,
  edit,
  editPut,
  deleteProject,
};
