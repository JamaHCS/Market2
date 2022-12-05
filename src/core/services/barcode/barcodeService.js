import AsyncStorage from '@react-native-async-storage/async-storage';
import { routes } from '../../../shared/routes';

export const getBarcodeProduct = async (data) => {
  const token = await AsyncStorage.getItem('@access_token');

  return axios.get(`${routes.products}?barcode=${data}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const postSell = (array, market) => {
  return axios.post(routes.sell, {
    sells: array,
    relation_id: market,
  });
};