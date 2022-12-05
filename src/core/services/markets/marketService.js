import { routes } from "../../../shared/routes";

export const getMarket = (email) => {
  return axios.get(`${routes.markets}${email}`);
};

export const searchMarket = (code, email) => {
  return axios.get(`${routes.employees}store/${code}?user=${email}`);
};