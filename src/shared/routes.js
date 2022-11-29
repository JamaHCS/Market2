import { enviroment } from "./enviroments";

export const routes = {
  login: `${enviroment.API_URL}login/`,
  register: `${enviroment.API_URL}register/`,
  markets: `${enviroment.API_URL}markets/`,
  employees: `${enviroment.API_URL}employees/`,
  products: `${enviroment.API_URL}products`,
  sell: `${enviroment.API_URL}sell`,
};