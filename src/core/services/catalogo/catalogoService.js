import { routes } from "../../../shared/routes";

export const getProduct = (marketId) => {
  return axios.get(`${routes.products}?market=${marketId}`);
};