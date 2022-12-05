import AsyncStorage from '@react-native-async-storage/async-storage';
import { routes } from '../../../shared/routes';
import axios from 'axios';
/**
 * Funcion que se encarga de hacer peticion al servicio del codigo de barras escaneado.
 * Manda el header de autorización con el token almacenado en el localStorage.
 * 
 * @param  {string} data
 */
export const getBarcodeProduct = async (data) => {
  const token = await AsyncStorage.getItem('@access_token');

  return axios.get(`${routes.products}?barcode=${data}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

/**
 * Funcion que se encarga de realizar la peticion a la api externa para realizar las ventas.
 * Manda un array con los productos y un parametro market con el id de la relacion usuario-market 
 * almacenada en el localStorage de la aplicacion
 * 
 * @param  {array} array
 * @param  {string} market
 */
export const postSell = async (array, market) => {
  const token = await AsyncStorage.getItem('@access_token');
  
  return axios.post(
    routes.sell,
    {
      sells: array,
      relation_id: market,
    },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
};
