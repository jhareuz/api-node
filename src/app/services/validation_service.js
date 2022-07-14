import Ajv from 'ajv';
import auth from './../schemas/auth_schemas';
import user from './../schemas/users_schemas';

const configureValidator = schema => (new Ajv({ allErrors: true })).compile(schema);

export default {
  user: {
    create: configureValidator(user.create),
    update: configureValidator(user.update)
  },
  auth: {
    login: configureValidator(auth.login)
  }
};