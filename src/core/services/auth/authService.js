import { routes } from "../../../shared/routes";

export const postLogin = (username, password) => {
  return axios.post(routes.login, {
    email: username,
    password: password,
  });
};

export const postRegister = (nombre, email, contrasena) => {
  return axios.post(routes.register, {
    name: nombre,
    email: email,
    password: contrasena,
  });
};