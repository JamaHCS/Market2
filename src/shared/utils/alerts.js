import { Alert } from "react-native";

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
