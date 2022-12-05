export const loginAlert = (username, props) => {
  Alert.alert(
    'Hey!',
    `Bienvenido ${username}`,
    [
      {
        title: 'Aceptar',
        onPress: () => {
          setBtnVisible(false);
          setAiVisible(true);
          setTiEnabled(false);
          setTimeout(() => {
            setBtnVisible(true);
            setAiVisible(false);
            setTiEnabled(true);

            props.navigation.navigate('Home');
          }, 350);
        },
      },
    ],
    {
      cancelable: false,
    }
  );
};

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
