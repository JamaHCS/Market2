import { routes } from "../../../shared/routes";
import axios from 'axios';

export const getMarket = (email) => {
  return axios.get(`${routes.markets}${email}`);
};

export const searchMarket = (code, email) => {
  return axios.get(`${routes.employees}store/${code}?user=${email}`);
};