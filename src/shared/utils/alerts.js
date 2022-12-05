import { Alert } from "react-native";
/**
 * 
 * Esta funcion  muestra una alerta en caso de que falle algo en la aplicación.
 * 
 * Funcion que recibe 2 parametros,
 * el primero es el texto del error a mostrar en la alerta
 * y el segundo es el callback a ejecutar una vez se acepte el error mostrado en pantalla
 * 
 * @param  {string} error
 * @param  {callback} callback
 */
export const errorAlert = (error, callback) => {
  Alert.alert(
    'ERROR',
    error,
    [
      {
        text: 'Cerrar',
        onPress: () => callback(''),
      },
    ],
    {
      cancelable: false,
    }
  );
};
