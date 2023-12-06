// Imortando el DotEnv
import dotenv from 'dotenv';

// Invocación a la función config de
// la instancia dotenv
dotenv.config();

console.log(process.env.PORT);

// Creando objetos de configuración
const defaultConfig = {
  PORT: process.env.PORT || 3000,
  IP: process.env.IP || '0.0.0.0',
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
};

const devConfig = {
  MONGO_URL: process.env.DEV_DATABASE_URL,
};

const testConfig = {
  TESY_VALUE: 200,
};

const prodConfig = {
  MONGO_URL: process.env.PROD_DATABASE_URL,
};

// Creando una función selectora
function getEnvCOnfig(env) {
  switch (env) {
    case 'production':
      return prodConfig;

    case 'development':
      return devConfig;

    case 'test':
      return testConfig;

    default:
      return devConfig;
  }
}

// exportar el objeto de configuración
export default {
  ...defaultConfig,
  ...getEnvCOnfig(process.env.NODE_ENV),
};
