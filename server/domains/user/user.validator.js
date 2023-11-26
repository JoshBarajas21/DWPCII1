import * as Yup from 'yup';

// Crear un schema de validación
const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required('Se requiere ingresa nombre'),
  lastname: Yup.string().required('Se requiere ingresa apellido'),
  mail: Yup.string().email().required('Se requiere ingresar un correo valido'),
  password: Yup.string()
    .min(6)
    .required('Se requiere ingresar password de al menos 6 caracteres'),
  cpassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'El password de confirmación no coincide',
  ),
});

const signUpGetter = (req) => {
  // Desestructuramos la informacion
  const { firstName, lastname, mail, password, cpassword } = req.body;
  // Se ingresa el objeto signup
  return {
    firstName,
    lastname,
    mail,
    password,
    cpassword,
  };
};

const signUp = {
  schema: signUpSchema,
  getObject: signUpGetter,
};

export default { signUp };
