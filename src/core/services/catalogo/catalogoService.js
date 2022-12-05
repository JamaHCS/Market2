import { routes } from "../../../shared/routes";
import axios from 'axios';

export const getProduct = (marketId) => {
  return axios.get(`${routes.products}?market=${marketId}`);
};