import * as Yup from 'yup';

// Crear un esquema de validación
const projectSchema = Yup.object().shape({
  name: Yup.string().required('Se requiere nombre de proyecto'),
  description: Yup.string()
    .max(500, 'La descripción no debe tener más de 500 caracteres')
    .required('Se requiere una descripción del proyecto'),
});

// Middleware de extraccion
const getProject = (req) => {
  // Extrayendo datos de  la petición
  const { name, description } = req.body;
  return {
    name,
    description,
  };
};

export default {
  projectSchema,
  getProject,
};
