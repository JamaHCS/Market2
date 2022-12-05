import axios from "axios";
import { routes } from "../../../shared/routes";

/**
 * Función que se encarga de realizar la petición a la api externa para realizar un inicio de sesión.
 * Recibe un usuario y contraseña en string y retorna una promesa de la petición hecha con axios.
 * 
 * @param  {string} username
 * @param  {string} password
 */
export const postLogin = (username, password) => {
  return axios.post(routes.login, {
    email: username,
    password: password,
  });
};

/**
 * Funcion que se encarga de realizar una peticion a la api externa donde se hace manda como parametro
 * un nombre, email y contraseña en forma de string y retorna una promesa de la petición hecha con axios.
 * 
 * @param  {strig} nombre
 * @param  {strig} email
 * @param  {strig} contrasena
 */
export const postRegister = (nombre, email, contrasena) => {
  return axios.post(routes.register, {
    name: nombre,
    email: email,
    password: contrasena,
  });
};